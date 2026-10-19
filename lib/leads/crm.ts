import { toE164 } from '@/lib/planner/crm/ghl';

/**
 * GHL upsert for a plain website inquiry.
 *
 * Separate from `syncToGhl`, which requires planner answers, a property and an
 * estimate. A contact-form inquiry has none of those, and manufacturing empty
 * ones to reuse that function would push meaningless fields into the CRM.
 * Both hit the same `/contacts/upsert` endpoint and share `toE164`.
 *
 * Upsert is keyed on email by GHL itself, so a retry updates the existing
 * contact rather than creating a duplicate.
 */

export type CrmResult =
  | { status: 'sent'; contactId: string }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; reason: string; attempts: number };

export function isCrmConfigured(): boolean {
  return !!(process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID);
}

const MAX_ATTEMPTS = 3;
const TIMEOUT_MS = 8000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Client errors will not fix themselves; retrying them wastes time and quota. */
function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
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

export async function upsertInquiryContact(lead: InquiryLead): Promise<CrmResult> {
  if (!isCrmConfigured()) {
    return { status: 'skipped', reason: 'GHL_API_TOKEN or GHL_LOCATION_ID is not set.' };
  }

  const tags = ['website-inquiry'];
  if (lead.service) tags.push(`interest:${lead.service.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}`);
  if (lead.source) tags.push(`source:${lead.source.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}`);

  const body = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName: lead.firstName,
    lastName: lead.lastName || '',
    email: lead.email,
    phone: lead.phone ? toE164(lead.phone) : '',
    tags,
    // The message is the lead. It goes in notes whole rather than being
    // truncated into a custom field.
    notes: [
      lead.message,
      '',
      `Interest: ${lead.service || 'General inquiry'}`,
      `Source: ${lead.source || 'website'}`,
      `Page: ${lead.page || 'Not provided'}`,
    ].join('\n'),
  };

  let lastReason = 'unknown';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (res.ok) {
        const json = (await res.json().catch(() => ({}))) as { contact?: { id?: string } };
        return { status: 'sent', contactId: json.contact?.id ?? 'unknown' };
      }
      lastReason = `HTTP ${res.status}`;
      if (!isRetryable(res.status)) break;
    } catch (e) {
      lastReason = e instanceof Error ? e.message : 'network error';
    }

    if (attempt < MAX_ATTEMPTS) await sleep(2 ** attempt * 250);
  }

  return { status: 'failed', reason: lastReason, attempts: MAX_ATTEMPTS };
}
