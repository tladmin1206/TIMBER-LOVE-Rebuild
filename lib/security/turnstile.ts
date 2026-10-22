/**
 * Cloudflare Turnstile server-side verification.
 *
 * Policy:
 *   - TURNSTILE_SECRET_KEY set: every submission must carry a token that
 *     Cloudflare accepts. Missing, invalid, or unverifiable tokens fail closed.
 *   - TURNSTILE_SECRET_KEY unset: verification is skipped with a warning, in
 *     development and production alike, so the form keeps working until the
 *     keys are configured. Production logs the skip as an error so it is seen.
 */
export type TurnstileResult =
  | { ok: true; skipped: boolean }
  | { ok: false; reason: string };

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
let warned = false;

export function isTurnstileConfigured(): boolean {
  return !!process.env.TURNSTILE_SECRET_KEY;
}

export async function verifyTurnstile(token: unknown, ip?: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (!warned) {
      warned = true;
      const log = process.env.NODE_ENV === 'production' ? console.error : console.warn;
      log('[TURNSTILE_SKIPPED] TURNSTILE_SECRET_KEY is not set; contact form spam check is off.');
    }
    return { ok: true, skipped: true };
  }
  if (typeof token !== 'string' || !token || token.length > 2048) return { ok: false, reason: 'missing-token' };

  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body: form, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return { ok: false, reason: `siteverify HTTP ${res.status}` };
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; 'error-codes'?: string[] };
    return json.success === true ? { ok: true, skipped: false } : { ok: false, reason: (json['error-codes'] || ['rejected']).join(',') };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : 'siteverify error' };
  }
}

/** Test hook. */
export function _resetTurnstileWarning() { warned = false; }
