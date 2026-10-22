/**
 * Local-only tests for the multi-channel lead fallback. Never reaches Resend
 * or HubSpot: every request is intercepted and routed by hostname.
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
  // A fresh client IP per request so the per-IP rate limit does not interfere
  // with these channel checks (rate limiting has its own test file).
  new Request('http://localhost/api/contact/', { method: 'POST', body: JSON.stringify(value), headers: { 'x-forwarded-for': `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` } });

/** Route by host so each channel can be made to pass or fail independently. */
function intercept(seen: Seen[], opts: { emailOk: boolean; crmOk: boolean }) {
  return (async (url: string | URL | Request, options: RequestInit) => {
    const href = String(url);
    seen.push({ url: href, options });
    if (href.includes('api.hubapi.com')) {
      if (!opts.crmOk) return new Response('{"message":"crm down"}', { status: 500 });
      // The contact upsert returns the id the note then associates to.
      if (href.includes('/contacts/batch/upsert')) {
        return new Response(JSON.stringify({ results: [{ id: 'hs-123' }] }), { status: 200 });
      }
      return new Response(JSON.stringify({ id: 'note-1' }), { status: 201 });
    }
    return opts.emailOk
      ? new Response(JSON.stringify({ id: 'mail-1' }), { status: 200 })
      : new Response('{"message":"unverified sender"}', { status: 403 });
  }) as unknown as typeof fetch;
}

const crmCalls = (seen: Seen[]) => seen.filter((s) => s.url.includes('api.hubapi.com'));
const contactCalls = (seen: Seen[]) => crmCalls(seen).filter((s) => s.url.includes('/contacts/batch/upsert'));
const noteCalls = (seen: Seen[]) => crmCalls(seen).filter((s) => s.url.includes('/objects/notes'));
const mailCalls = (seen: Seen[]) => seen.filter((s) => !s.url.includes('api.hubapi.com'));

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
    process.env.HUBSPOT_ACCESS_TOKEN = 'test-token';
    let seen: Seen[] = [];
    globalThis.fetch = intercept(seen, { emailOk: false, crmOk: true });
    let res = await POST(request());
    assert.equal(res.status, 200, 'CRM capture alone must report success when mail is down');
    assert.equal((await res.json()).ok, true);
    assert.equal(contactCalls(seen).length, 1, 'Contact upsert happens exactly once on success');
    assert.equal(noteCalls(seen).length, 1, 'The note is written once, after the contact');

    // The contact write has to carry the lead, deduped on email.
    const upsert = JSON.parse(String(contactCalls(seen)[0].options.body));
    const input = upsert.inputs[0];
    assert.equal(input.idProperty, 'email', 'Upsert dedupes on email rather than creating duplicates');
    assert.equal(input.id, VALID.email);
    assert.equal(input.properties.email, VALID.email);
    assert.equal(input.properties.firstname, VALID.firstName);
    assert.equal(input.properties.lastname, VALID.lastName);
    assert.equal(input.properties.phone, '+12085550100', 'Phone is normalised to E.164 for HubSpot');
    assert.ok(contactCalls(seen)[0].options.signal, 'CRM request is bounded by a timeout');

    // The message is the lead. It must reach the timeline, associated to the
    // contact the upsert just returned.
    const note = JSON.parse(String(noteCalls(seen)[0].options.body));
    assert.ok(String(note.properties.hs_note_body).includes(VALID.message), 'The message itself reaches HubSpot');
    assert.ok(String(note.properties.hs_note_body).includes(VALID.service), 'Interest is kept as context');
    assert.ok(String(note.properties.hs_note_body).includes(VALID.page), 'Originating page is kept as context');
    assert.equal(note.associations[0].to.id, 'hs-123', 'Note associates to the upserted contact');
    assert.equal(note.associations[0].types[0].associationTypeId, 202, 'Note-to-contact association type');
    assert.ok(note.properties.hs_timestamp, 'Note carries a timestamp');

    // Homeowner text lands in a field HubSpot renders as HTML.
    seen.length = 0;
    await POST(request({ ...VALID, message: 'Quote for <script>alert(1)</script> & deck' }));
    const escaped = JSON.parse(String(noteCalls(seen)[0].options.body)).properties.hs_note_body;
    assert.ok(!escaped.includes('<script>'), 'Submitted HTML is escaped before reaching the timeline');
    assert.ok(escaped.includes('&amp;'), 'Ampersands are escaped rather than dropped');

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
    delete process.env.HUBSPOT_ACCESS_TOKEN;
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
