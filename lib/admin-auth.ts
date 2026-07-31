/**
 * Admin session auth. A signed, HTTP-only cookie stands in for a login session:
 * the login route sets it after checking the password, and middleware verifies
 * it on every /admin and /api/admin request. No tokens in URLs.
 *
 * Uses Web Crypto (HMAC-SHA256) so the same code runs in Edge middleware and
 * Node route handlers. The secret is ADMIN_SESSION_SECRET, falling back to
 * ADMIN_PASSWORD so a single secret is enough to get started.
 */
export const ADMIN_COOKIE = 'tl_admin';
const PAYLOAD = 'admin-session-v1';

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

function b64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** The cookie value proving a valid admin session (empty when unconfigured). */
export async function sessionToken(): Promise<string> {
  const s = secret();
  if (!s) return '';
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(s), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(PAYLOAD));
  return b64url(new Uint8Array(sig));
}

/** Constant-time-ish check that a cookie value is a valid session. */
export async function isValidSession(token?: string | null): Promise<boolean> {
  if (!token || !secret()) return false;
  const expected = await sessionToken();
  return expected.length > 0 && token === expected;
}

/** Whether admin auth is configured at all. */
export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

/** Validate submitted login credentials against the configured admin. */
export function checkCredentials(email: string | undefined, password: string | undefined): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || !password) return false;
  if (password !== pw) return false;
  const expectedEmail = process.env.ADMIN_EMAIL;
  if (expectedEmail && (email || '').trim().toLowerCase() !== expectedEmail.trim().toLowerCase()) return false;
  return true;
}
