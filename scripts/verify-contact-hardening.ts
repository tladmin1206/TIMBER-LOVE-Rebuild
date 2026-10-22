/**
 * Local-only tests for contact form hardening: Turnstile verification, the
 * per-IP rate limit, the email-failure alert, and the legacy category 301s.
 * Never reaches Cloudflare, Resend or HubSpot: every request is intercepted.
 */
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';
import { _resetRateLimitMemory, checkRateLimit, CONTACT_LIMIT, CONTACT_WINDOW_MS } from '../lib/security/rate-limit';
import nextConfig from '../next.config.mjs';

type Seen = { url: string; body: string };
const VALID = { firstName: 'QA', email: 'qa@example.com', message: 'Local verification only.', page: '/contact/' };
let ipSeq = 1;
const req = (value: Record<string, unknown> = VALID, ip = `10.9.0.${ipSeq++}`) =>
  new Request('http://localhost/api/contact/', { method: 'POST', body: JSON.stringify(value), headers: { 'x-forwarded-for': ip } });

function intercept(seen: Seen[], o: { turnstileOk?: boolean; emailOk?: boolean; alertOk?: boolean; crmOk?: boolean } = {}) {
  return (async (url: string | URL | Request, init: RequestInit = {}) => {
    const href = String(url);
    const body = typeof init.body === 'string' ? init.body : init.body ? String(init.body) : '';
    seen.push({ url: href, body });
    if (href.includes('challenges.cloudflare.com')) return new Response(JSON.stringify({ success: o.turnstileOk !== false, 'error-codes': o.turnstileOk === false ? ['invalid-input-response'] : [] }), { status: 200 });
    if (href.includes('api.hubapi.com')) {
      if (o.crmOk === false) return new Response('{}', { status: 500 });
      if (href.includes('/contacts/batch/upsert')) return new Response(JSON.stringify({ results: [{ id: 'hs-1' }] }), { status: 200 });
      return new Response(JSON.stringify({ id: 'n-1' }), { status: 201 });
    }
    const isAlert = JSON.parse(body || '{}').subject?.startsWith('ALERT:');
    const ok = isAlert ? o.alertOk !== false : o.emailOk !== false;
    return ok ? new Response(JSON.stringify({ id: 'm-1' }), { status: 200 }) : new Response('{"message":"refused"}', { status: 403 });
  }) as unknown as typeof fetch;
}
const cf = (s: Seen[]) => s.filter((x) => x.url.includes('challenges.cloudflare.com'));
const mail = (s: Seen[]) => s.filter((x) => x.url.includes('api.resend.com'));
const alerts = (s: Seen[]) => mail(s).filter((x) => JSON.parse(x.body).subject.startsWith('ALERT:'));

async function main() {
  const realFetch = globalThis.fetch;
  const env = { ...process.env };
  const realError = console.error;
  const errors: string[] = [];
  try {
    process.env.RESEND_API_KEY = 'test-only';
    process.env.LEAD_TO_EMAIL = 'team@example.com';
    process.env.LEAD_FROM_EMAIL = 'website@example.com';
    process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
    delete process.env.DATABASE_URL;

    // TURNSTILE
    // 1. Secret unset: verification skipped, submission succeeds, Cloudflare never called.
    delete process.env.TURNSTILE_SECRET_KEY;
    let seen: Seen[] = [];
    globalThis.fetch = intercept(seen);
    assert.equal((await POST(req())).status, 200, 'No Turnstile secret means skip, not block');
    assert.equal(cf(seen).length, 0);

    // 2. Secret set, token missing: fail closed with 403, no channel reached.
    process.env.TURNSTILE_SECRET_KEY = 'test-secret';
    seen = []; globalThis.fetch = intercept(seen);
    let res = await POST(req());
    assert.equal(res.status, 403, 'Missing token fails closed when the secret is set');
    assert.equal(mail(seen).length + cf(seen).length, 0);

    // 3. Secret set, Cloudflare rejects the token: 403, no lead email.
    seen = []; globalThis.fetch = intercept(seen, { turnstileOk: false });
    res = await POST(req({ ...VALID, 'cf-turnstile-response': 'bad' }));
    assert.equal(res.status, 403);
    assert.equal(cf(seen).length, 1);
    assert.equal(mail(seen).length, 0);

    // 4. Secret set, token valid: passes, secret and token sent server-side.
    seen = []; globalThis.fetch = intercept(seen);
    res = await POST(req({ ...VALID, 'cf-turnstile-response': 'good' }));
    assert.equal(res.status, 200);
    const verifyBody = new URLSearchParams(cf(seen)[0].body);
    assert.equal(verifyBody.get('secret'), 'test-secret');
    assert.equal(verifyBody.get('response'), 'good');
    assert.equal(mail(seen).length, 1, 'Valid token reaches lead capture');

    // 5. Cloudflare unreachable: fail closed.
    globalThis.fetch = (async (u: string) => { if (String(u).includes('cloudflare')) throw new Error('down'); return new Response('{}'); }) as unknown as typeof fetch;
    assert.equal((await POST(req({ ...VALID, 'cf-turnstile-response': 'good' }))).status, 403);
    delete process.env.TURNSTILE_SECRET_KEY;

    // RATE LIMIT
    // 6. Five per IP per window, sixth is 429 with Retry-After; other IPs unaffected.
    _resetRateLimitMemory();
    seen = []; globalThis.fetch = intercept(seen);
    for (let i = 0; i < CONTACT_LIMIT; i++) assert.equal((await POST(req(VALID, '203.0.113.7'))).status, 200, `request ${i + 1} allowed`);
    res = await POST(req(VALID, '203.0.113.7'));
    assert.equal(res.status, 429, 'Sixth request in the window is rate limited');
    assert.ok(Number(res.headers.get('Retry-After')) > 0);
    assert.equal(mail(seen).length, CONTACT_LIMIT, 'Rate-limited request reaches no channel');
    assert.equal((await POST(req(VALID, '203.0.113.8'))).status, 200, 'Another IP is unaffected');
    // 7. Window expiry frees the IP (memory backend).
    const t0 = 1_000_000;
    for (let i = 0; i < CONTACT_LIMIT; i++) assert.ok((await checkRateLimit('198.51.100.1', { now: t0 })).allowed);
    assert.equal((await checkRateLimit('198.51.100.1', { now: t0 + 1 })).allowed, false);
    assert.ok((await checkRateLimit('198.51.100.1', { now: t0 + CONTACT_WINDOW_MS + 1 })).allowed, 'Window expiry frees the IP');

    // EMAIL FAILURE ALERT
    // 8. Lead email fails, CRM keeps it: one alert to admin@timberandlove.com by default; visitor still sees 200.
    delete process.env.ALERT_EMAIL;
    seen = []; globalThis.fetch = intercept(seen, { emailOk: false });
    res = await POST(req());
    assert.equal(res.status, 200, 'Visitor experience unchanged');
    assert.equal((await res.json()).ok, true);
    assert.equal(alerts(seen).length, 1, 'Exactly one fallback alert');
    assert.deepEqual(JSON.parse(alerts(seen)[0].body).to, 'admin@timberandlove.com');

    // 9. ALERT_EMAIL overrides the default.
    process.env.ALERT_EMAIL = 'ops@example.com';
    seen = []; globalThis.fetch = intercept(seen, { emailOk: false });
    await POST(req());
    assert.equal(JSON.parse(alerts(seen)[0].body).to, 'ops@example.com');

    // 10. Alert also fails: loud log, visitor still 200.
    console.error = (...a: unknown[]) => { errors.push(String(a[0])); };
    seen = []; globalThis.fetch = intercept(seen, { emailOk: false, alertOk: false });
    res = await POST(req());
    console.error = realError;
    assert.equal(res.status, 200);
    assert.ok(errors.some((e) => e.includes('[LEAD_ALERT_FAILED]')), 'Double failure is logged loudly');

    // 11. Lead email succeeds: no alert.
    seen = []; globalThis.fetch = intercept(seen);
    await POST(req());
    assert.equal(alerts(seen).length, 0);

    // 12. Nothing kept it (email and CRM down, no DB): still 503, no alert.
    seen = []; globalThis.fetch = intercept(seen, { emailOk: false, crmOk: false });
    assert.equal((await POST(req())).status, 503);
    assert.equal(alerts(seen).length, 0, 'No alert when the lead was not kept anywhere');

    // REDIRECTS
    const redirects = await (nextConfig as { redirects: () => Promise<Array<{ source: string; destination: string; statusCode?: number }>> }).redirects();
    const find = (s: string) => redirects.find((r) => r.source === s);
    assert.equal(find('/category/boise-boys')?.destination, '/the-boise-boys/');
    assert.equal(find('/category/boise-boys')?.statusCode, 301);
    assert.equal(find('/category/uncategorized')?.destination, '/journal/');
    assert.equal(find('/category/uncategorized')?.statusCode, 301);

    console.log('Contact hardening checks passed: Turnstile skip, fail-closed and verify; per-IP 429 and window expiry; email-failure alert default, override, double failure and no-alert cases; legacy category 301s.');
  } finally {
    console.error = realError;
    globalThis.fetch = realFetch;
    process.env = env;
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
