/**
 * Lead delivery by email.
 *
 * Shared by the contact forms and the planner gate so there is one place where
 * "did this lead actually reach a human" is decided.
 *
 * The previous implementation awaited the Resend call and ignored its response,
 * which meant an expired key, an unverified sending domain, or a rate limit all
 * looked exactly like success. Resend returns 403 for an unverified `from`
 * domain — the single most common first-run failure — so that silence was the
 * difference between "configured" and "working".
 */

export type LeadEmail = {
  subject: string;
  text: string;
  /** Where replies should go — the homeowner, not the site. */
  replyTo?: string;
};

export type DeliveryResult =
  | { delivered: true; id?: string }
  | { delivered: false; reason: string; attempts: number }
  | { delivered: false; reason: 'not-configured'; attempts: 0 };

export function isEmailConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL);
}

const MAX_ATTEMPTS = 3;

/** Client errors will not fix themselves; retrying them wastes time and quota. */
function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
}

export async function sendLeadEmail(mail: LeadEmail): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { delivered: false, reason: 'not-configured', attempts: 0 };
  }

  let lastReason = 'unknown';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
          subject: mail.subject,
          text: mail.text,
        }),
      });

      if (res.ok) {
        const json = (await res.json().catch(() => ({}))) as { id?: string };
        return { delivered: true, id: json.id };
      }

      const detail = await res.text().catch(() => '');
      lastReason = `HTTP ${res.status}${detail ? ` — ${detail.slice(0, 200)}` : ''}`;

      if (!isRetryable(res.status)) {
        // A distinctive marker so this is findable in a log search. An
        // undelivered lead is a lost job, and it should not look like noise.
        console.error('[LEAD_DELIVERY_FAILED]', { reason: lastReason, attempts: attempt, retryable: false });
        return { delivered: false, reason: lastReason, attempts: attempt };
      }
    } catch (e) {
      lastReason = e instanceof Error ? e.message : 'network error';
    }

    if (attempt < MAX_ATTEMPTS) await sleep(2 ** attempt * 300);
  }

  console.error('[LEAD_DELIVERY_FAILED]', { reason: lastReason, attempts: MAX_ATTEMPTS, retryable: true });
  return { delivered: false, reason: lastReason, attempts: MAX_ATTEMPTS };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
