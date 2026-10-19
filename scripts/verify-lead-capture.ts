/**
 * Local-only tests for the multi-channel lead fallback. Never reaches Resend
 * or GHL: every request is intercepted and routed by hostname.
 *
 * What matters here is the case the old single-channel route got wrong: mail
 * is down, the CRM takes the inquiry, and the homeowner is told it went
 * through, because it did. Asserting the 503 paths is not enough, since a
 * route that always 503s would pass those.
 */
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';

type Seen = { url: string; options: RequestInit };

const VALID = {
  firstName: 'QA',
  lastName: 'Test',
  email: 'qa@example.com',
  phone: '2085550100',
  service: 'Design + Build',
  message: 'Local verification only.',
  source: 'design-build-inquiry',
  page: '/design-and-build-questionnaire/',
  submissionId: '12345678-1234-4234-8234-123456789abc',
};

const request = (value: unknown = VALID) =>
  new Request('http://localhost/api/contact/', { method: 'POST', body: JSON.stringify(value) });

/** Route by host so each channel can be made to pass or fail independently. */
function intercept(seen: Seen[], opts: { emailOk: boolean; crmOk: boolean }) {
  return (async (url: string | URL | Request, options: RequestInit) => {
    const href = String(url);
    seen.push({ url: href, options });
    if (href.includes('leadconnectorhq.com')) {
      return opts.crmOk
        ? new Response(JSON.stringify({ contact: { id: 'ghl-123' } }), { status: 200 })
        : new Response('{"message":"crm down"}', { status: 500 });
    }
    return opts.emailOk
      ? new Response(JSON.stringify({ id: 'mail-1' }), { status: 200 })
      : new Response('{"message":"unverified sender"}', { status: 403 });
  }) as unknown as typeof fetch;
}

const crmCalls = (seen: Seen[]) => seen.filter((s) => s.url.includes('leadconnectorhq.com'));
const mailCalls = (seen: Seen[]) => seen.filter((s) => !s.url.includes('leadconnectorhq.com'));

async function main() {
  const realFetch = globalThis.fetch;
  const env = { ...process.env };

  try {
    process.env.RESEND_API_KEY = 'test-only';
    process.env.LEAD_TO_EMAIL = 'team@example.com';
    process.env.LEAD_FROM_EMAIL = 'website@example.com';

    // 1. THE CASE THIS WORK EXISTS FOR. Mail refuses, CRM accepts: the inquiry
    //    is kept, so the homeowner is told it succeeded rather than being asked
    //    to send a message that is already safe in the CRM.
    process.env.GHL_API_TOKEN = 'test-token';
    process.env.GHL_LOCATION_ID = 'test-location';
    let seen: Seen[] = [];
    globalThis.fetch = intercept(seen, { emailOk: false, crmOk: true });
    let res = await POST(request());
    assert.equal(res.status, 200, 'CRM capture alone must report success when mail is down');
    assert.equal((await res.json()).ok, true);
    assert.equal(crmCalls(seen).length, 1, 'CRM is attempted exactly once on success');

    // The CRM has to receive the lead itself, not just a ping.
    const crmBody = JSON.parse(String(crmCalls(seen)[0].options.body));
    assert.equal(crmBody.email, VALID.email);
    assert.equal(crmBody.firstName, VALID.firstName);
    assert.equal(crmBody.phone, '+12085550100', 'Phone is normalised to E.164 for the CRM');
    assert.ok(String(crmBody.notes).includes(VALID.message), 'The message itself reaches the CRM');
    assert.ok(crmBody.tags.includes('website-inquiry'));
    assert.ok(crmCalls(seen)[0].options.signal, 'CRM request is bounded by a timeout');

    // 2. Both channels down and no database: nothing kept it, so it must fail
    //    loudly. A fallback that silently swallows is worse than none.
    seen = [];
    globalThis.fetch = intercept(seen, { emailOk: false, crmOk: false });
    res = await POST(request());
    assert.equal(res.status, 503, 'Total failure must not report success');
    assert.equal((await res.json()).ok, false);
    assert.equal(res.headers.get('Retry-After'), '30');
    assert.ok(crmCalls(seen).length > 1, 'CRM retries a 500 rather than giving up once');

    // 3. Mail works, CRM down: still a success, and still only one email.
    seen = [];
    globalThis.fetch = intercept(seen, { emailOk: true, crmOk: false });
    res = await POST(request());
    assert.equal(res.status, 200, 'Email alone is sufficient');
    assert.equal(mailCalls(seen).length, 1, 'A failing CRM must not cause duplicate emails');

    // 4. Unconfigured CRM is skipped silently, not retried as a failure.
    delete process.env.GHL_API_TOKEN;
    delete process.env.GHL_LOCATION_ID;
    seen = [];
    globalThis.fetch = intercept(seen, { emailOk: true, crmOk: true });
    res = await POST(request());
    assert.equal(res.status, 200);
    assert.equal(crmCalls(seen).length, 0, 'An unconfigured CRM is never called');

    // 5. Honeypot still short-circuits before any channel runs.
    seen = [];
    globalThis.fetch = intercept(seen, { emailOk: true, crmOk: true });
    res = await POST(request({ ...VALID, company_website: 'bot.example' }));
    assert.equal(res.status, 200);
    assert.equal(seen.length, 0, 'Honeypot submissions reach no channel at all');

    // 6. Validation still runs before capture, so junk never reaches a channel.
    seen = [];
    globalThis.fetch = intercept(seen, { emailOk: true, crmOk: true });
    for (const bad of [{ ...VALID, email: 'invalid' }, { ...VALID, message: '' }]) {
      assert.ok((await POST(request(bad))).status >= 400);
    }
    assert.equal(seen.length, 0, 'Invalid leads reach no channel');

    console.log(
      'Lead capture checks passed: CRM fallback keeps the lead when mail fails, ' +
        'total failure still 503s, no duplicate sends, unconfigured channels skipped, ' +
        'honeypot and validation short-circuit before any channel.'
    );
  } finally {
    globalThis.fetch = realFetch;
    process.env = env;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
