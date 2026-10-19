import { toE164 } from '@/lib/leads/phone';

/**
 * HubSpot capture for a website inquiry: upsert the Contact, then attach the
 * message as a Note on that contact's timeline.
 *
 * Uses a Private App access token against the CRM v3 API. Two calls, in order,
 * because the note needs the contact id to associate to.
 *
 * The contact write uses `batch/upsert` with `idProperty: email` rather than a
 * create-then-handle-409 dance. HubSpot resolves the existing record itself, so
 * a homeowner who enquires twice updates one contact instead of creating a
 * duplicate for the sales team to merge later.
 *
 * Only standard properties are written (email, firstname, lastname, phone).
 * Everything else, the message and the context around it, goes in the Note.
 * That is deliberate until the portal's custom property names are confirmed:
 * writing to a guessed internal name either errors or, worse, silently lands
 * data in the wrong field. PROPERTY MAPPING below is the one place to change
 * when those names are known.
 */

const API = 'https://api.hubapi.com';
const MAX_ATTEMPTS = 3;
const TIMEOUT_MS = 8000;

/**
 * HubSpot-defined association type for Note -> Contact. Association type ids
 * are fixed per object pair; this is not a portal-specific value.
 */
const NOTE_TO_CONTACT = 202;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Client errors will not fix themselves; retrying them wastes time and quota. */
function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
}

export type CrmResult =
  | { status: 'sent'; contactId: string }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; reason: string; attempts: number };

export function isCrmConfigured(): boolean {
  return !!process.env.HUBSPOT_ACCESS_TOKEN;
}

export type InquiryLead = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  source?: string;
  page?: string;
};

/**
 * PROPERTY MAPPING. Standard HubSpot contact properties only.
 *
 * To send `service`, `source` or `page` to custom properties, add them here
 * using their INTERNAL names (HubSpot settings > Properties, not the display
 * label). They stay in the note either way, so adding a mapping never loses
 * the context, it just makes it filterable.
 */
function contactProperties(lead: InquiryLead): Record<string, string> {
  const props: Record<string, string> = {
    email: lead.email,
    firstname: lead.firstName,
  };
  if (lead.lastName) props.lastname = lead.lastName;
  if (lead.phone) props.phone = toE164(lead.phone);
  return props;
}

function noteBody(lead: InquiryLead): string {
  // Plain text with light breaks: HubSpot renders hs_note_body as HTML, so
  // newlines alone would collapse into one paragraph on the timeline.
  const lines = [
    '<strong>Website inquiry</strong>',
    '',
    escapeHtml(lead.message),
    '',
    `Interest: ${escapeHtml(lead.service || 'General inquiry')}`,
    `Source: ${escapeHtml(lead.source || 'website')}`,
    `Page: ${escapeHtml(lead.page || 'Not provided')}`,
  ];
  if (lead.phone) lines.push(`Phone as submitted: ${escapeHtml(lead.phone)}`);
  return lines.join('<br>');
}

/** The message is homeowner input landing in a rendered HTML field. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function hubspotFetch(path: string, body: unknown): Promise<{ ok: true; json: any } | { ok: false; reason: string; retryable: boolean }> {
  try {
    const res = await fetch(`${API}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return { ok: true, json: await res.json().catch(() => ({})) };
    return { ok: false, reason: `HTTP ${res.status}`, retryable: isRetryable(res.status) };
  } catch (e) {
    // Network and timeout failures are worth another go.
    return { ok: false, reason: e instanceof Error ? e.message : 'network error', retryable: true };
  }
}

async function withRetry(path: string, body: unknown): Promise<{ ok: true; json: any } | { ok: false; reason: string; attempts: number }> {
  let lastReason = 'unknown';
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await hubspotFetch(path, body);
    if (res.ok) return res;
    lastReason = res.reason;
    if (!res.retryable) break;
    if (attempt < MAX_ATTEMPTS) await sleep(2 ** attempt * 250);
  }
  return { ok: false, reason: lastReason, attempts: MAX_ATTEMPTS };
}

export async function upsertInquiryContact(lead: InquiryLead): Promise<CrmResult> {
  if (!isCrmConfigured()) {
    return { status: 'skipped', reason: 'HUBSPOT_ACCESS_TOKEN is not set.' };
  }

  const upsert = await withRetry('/crm/v3/objects/contacts/batch/upsert', {
    inputs: [{ idProperty: 'email', id: lead.email, properties: contactProperties(lead) }],
  });

  if (!upsert.ok) {
    return { status: 'failed', reason: upsert.reason, attempts: upsert.attempts };
  }

  const contactId: string | undefined = upsert.json?.results?.[0]?.id;
  if (!contactId) {
    return { status: 'failed', reason: 'upsert returned no contact id', attempts: 1 };
  }

  // The contact is the durable capture; the note is context on top of it. A
  // note failure is reported but must not discard a contact that was written,
  // so this returns `sent` with the id either way and lets the caller log it.
  const note = await withRetry('/crm/v3/objects/notes', {
    properties: {
      hs_note_body: noteBody(lead),
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: { id: contactId },
        types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: NOTE_TO_CONTACT }],
      },
    ],
  });

  if (!note.ok) {
    console.error('[HUBSPOT_NOTE_FAILED]', { reason: note.reason, contactId });
  }

  return { status: 'sent', contactId };
}
