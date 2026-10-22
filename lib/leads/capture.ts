import { dbEnabled, prisma } from '@/lib/db';
import { sendLeadEmail } from '@/lib/leads/email';
import { isCrmConfigured, upsertInquiryContact, type InquiryLead } from '@/lib/leads/crm';

/**
 * Capture a website inquiry across every configured channel.
 *
 * The rule this enforces: an inquiry is kept if ANY channel kept it.
 *
 * Previously the contact route sent one email and, if the provider refused,
 * returned 503 and dropped the lead on the floor. That made an expired Resend
 * key or an unverified sending domain indistinguishable from someone deciding
 * not to get in touch, and it was the live site's only lead path. The planner
 * it replaced wrote to a database and a CRM as well; the route that actually
 * takes enquiries had the least redundancy of the three.
 *
 * Channels run concurrently rather than in sequence. Sequential capture would
 * add every timeout together while a homeowner waits on a spinner, and a slow
 * CRM is not a reason to delay the email that a person is actually watching.
 *
 * Durability is not the same as notification, and the difference is the point:
 *
 *   - `kept` means the inquiry survives this request. The database row or the
 *     CRM contact is enough; both outlive the process.
 *   - `notified` means a human has been told. Only email does that today.
 *
 * Kept but not notified is a success for the homeowner and a task for the
 * team: the lead is safe, and `Inquiry.notified = false` is the queue to work
 * through once mail is flowing again. Returning an error there would tell
 * someone their inquiry failed when it is sitting safely in the CRM, and they
 * would send it twice or not at all.
 *
 * With nothing configured there is no durable store and no inbox, so nothing
 * can be kept. That still fails loudly. A console line is not a lead inbox.
 */

export type CaptureResult = {
  /** The inquiry survives this request in at least one durable place. */
  kept: boolean;
  /** A human has been told, i.e. the mail provider accepted it. */
  notified: boolean;
  channels: {
    db: 'written' | 'skipped' | 'failed';
    crm: 'sent' | 'skipped' | 'failed';
    email: 'delivered' | 'skipped' | 'failed';
  };
  crmContactId?: string;
  /** Fallback alert to ALERT_EMAIL when the lead email failed but the lead was kept. */
  alert?: 'not-needed' | 'sent' | 'failed';
  /** Per-channel detail for logs. Never contains the lead's own details. */
  reasons: Record<string, string>;
};

export const DEFAULT_ALERT_EMAIL = 'admin@timberandlove.com';

export type CaptureInput = InquiryLead & { submissionId?: string };

export async function captureInquiry(lead: CaptureInput): Promise<CaptureResult> {
  const name = `${lead.firstName} ${lead.lastName ?? ''}`.trim();
  const idempotencyKey = lead.submissionId ? `contact/${lead.submissionId}` : undefined;

  const [crm, email] = await Promise.all([
    upsertInquiryContact(lead).catch((e) => ({
      status: 'failed' as const,
      reason: e instanceof Error ? e.message : 'crm threw',
      attempts: 0,
    })),
    sendLeadEmail({
      subject: `Website inquiry: ${name.replace(/[\r\n]/g, ' ')}`,
      replyTo: lead.email,
      idempotencyKey,
      text: [
        `Name: ${name}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone || 'Not provided'}`,
        `Interest: ${lead.service || 'General inquiry'}`,
        `Source: ${lead.source || 'website'}`,
        `Page: ${lead.page || 'Not provided'}`,
        '',
        lead.message,
      ].join('\n'),
    }).catch((e) => ({
      delivered: false as const,
      reason: e instanceof Error ? e.message : 'email threw',
      attempts: 0,
    })),
  ]);

  const reasons: Record<string, string> = {};
  if (crm.status !== 'sent') reasons.crm = crm.reason;
  if (!email.delivered) reasons.email = email.reason;

  // The database write records the delivery outcomes, so it runs after the
  // other two rather than alongside them. It is also the one channel that can
  // store WHY the others failed, which is what makes the row recoverable.
  const db = await persistInquiry(lead, {
    notified: email.delivered,
    emailStatus: email.delivered ? 'delivered' : `failed: ${email.reason}`,
    crmStatus: crm.status === 'sent' ? 'sent' : `${crm.status}: ${crm.reason}`,
    crmContactId: crm.status === 'sent' ? crm.contactId : undefined,
  });
  if (db.status === 'failed') reasons.db = db.reason;

  // Email failed but the lead is safe in the CRM or the database: nobody has
  // been told. Try one separate alert to ALERT_EMAIL; if that also fails, log
  // loudly and flag the row so the recovery queue shows it.
  let alert: CaptureResult['alert'] = 'not-needed';
  if (!email.delivered && email.reason !== 'not-configured' && (crm.status === 'sent' || db.status === 'written')) {
    const sent = await sendLeadEmail({
      to: process.env.ALERT_EMAIL || DEFAULT_ALERT_EMAIL,
      subject: `ALERT: website inquiry not emailed (${name.replace(/[\r\n]/g, ' ')})`,
      idempotencyKey: idempotencyKey ? `alert/${idempotencyKey}` : undefined,
      text: [
        'A website inquiry was saved but the normal lead email failed.',
        `Saved in: ${[crm.status === 'sent' ? 'HubSpot' : '', db.status === 'written' ? 'database (Inquiry, notified = false)' : ''].filter(Boolean).join(' and ')}`,
        `Email failure: ${email.reason}`,
        '',
        `Name: ${name}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone || 'Not provided'}`,
        `Page: ${lead.page || 'Not provided'}`,
        '',
        'Check RESEND_API_KEY, LEAD_TO_EMAIL and LEAD_FROM_EMAIL, then follow up with this person.',
      ].join('\n'),
    }).catch((e) => ({ delivered: false as const, reason: e instanceof Error ? e.message : 'alert threw', attempts: 0 }));
    if (sent.delivered) {
      alert = 'sent';
    } else {
      alert = 'failed';
      reasons.alert = sent.reason;
      console.error('[LEAD_ALERT_FAILED] !!! Inquiry kept but NOBODY was notified. Lead email and fallback alert both failed. Work the Inquiry queue (notified = false).', { crm: crm.status, db: db.status, reason: sent.reason });
      if (db.status === 'written' && db.id) {
        await prisma.inquiry.update({ where: { id: db.id }, data: { emailStatus: `failed: ${email.reason}`.slice(0, 900) + ' | ALERT_FAILED' } }).catch((e) => {
          console.error('[LEAD_ALERT_FLAG_FAILED]', e instanceof Error ? e.message : 'db flag failed');
        });
      }
    }
  }

  return {
    alert,
    kept: db.status === 'written' || crm.status === 'sent' || email.delivered,
    notified: email.delivered,
    channels: { db: db.status, crm: crm.status, email: email.delivered ? 'delivered' : emailChannel(email.reason) },
    crmContactId: crm.status === 'sent' ? crm.contactId : undefined,
    reasons,
  };
}

/** `not-configured` is a deployment state, not a fault. Keep them apart. */
function emailChannel(reason: string): 'skipped' | 'failed' {
  return reason === 'not-configured' ? 'skipped' : 'failed';
}

async function persistInquiry(
  lead: CaptureInput,
  delivery: { notified: boolean; emailStatus: string; crmStatus: string; crmContactId?: string }
): Promise<{ status: 'written' | 'skipped' | 'failed'; reason: string; id?: string }> {
  if (!dbEnabled) return { status: 'skipped', reason: 'no-database' };

  const data = {
    firstName: lead.firstName,
    lastName: lead.lastName || null,
    email: lead.email,
    phone: lead.phone || null,
    service: lead.service || null,
    message: lead.message,
    source: lead.source || null,
    page: lead.page || null,
    notified: delivery.notified,
    notifiedAt: delivery.notified ? new Date() : null,
    emailStatus: delivery.emailStatus,
    crmStatus: delivery.crmStatus,
    crmContactId: delivery.crmContactId ?? null,
  };

  try {
    // Keyed on submissionId so a retry after a failed delivery updates the
    // same row. Without one there is nothing to match on, so take the create.
    if (lead.submissionId) {
      const row = await prisma.inquiry.upsert({
        where: { submissionId: lead.submissionId },
        create: { ...data, submissionId: lead.submissionId },
        update: data,
        select: { id: true },
      });
      return { status: 'written', reason: '', id: row.id };
    }
    const row = await prisma.inquiry.create({ data, select: { id: true } });
    return { status: 'written', reason: '', id: row.id };
  } catch (e) {
    return { status: 'failed', reason: e instanceof Error ? e.message : 'db write failed' };
  }
}

/** Whether any durable store is configured at all. Useful for health checks. */
export function isCaptureConfigured(): boolean {
  return dbEnabled || isCrmConfigured();
}
