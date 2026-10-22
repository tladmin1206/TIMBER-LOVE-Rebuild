/** Local-only delivery tests. Never send to Resend or a real inbox. */
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';
import { GET as addressGet, POST as addressPost } from '../app/api/planner/address/route';
import { POST as estimate } from '../app/api/planner/estimate/route';

async function main() {
  const realFetch = globalThis.fetch;
  let requests: RequestInit[] = [];
  const valid = { firstName: 'QA', lastName: 'Test', email: 'qa@example.com', phone: '2085550100', service: 'Design + Build', message: 'Local verification only.', source: 'design-build-inquiry', page: '/design-and-build-questionnaire/', submissionId: '12345678-1234-4234-8234-123456789abc' };
  const request = (value: unknown) => new Request('http://localhost/api/contact/', { method: 'POST', body: JSON.stringify(value), headers: { 'x-forwarded-for': `10.1.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` } });
  try {
    delete process.env.RESEND_API_KEY;
    assert.equal((await POST(request(valid))).status, 503, 'Missing email settings must not report success');
    process.env.RESEND_API_KEY = 'test-only';
    process.env.LEAD_TO_EMAIL = 'team@example.com';
    process.env.LEAD_FROM_EMAIL = 'website@example.com';
    globalThis.fetch = (async (_url, options) => { requests.push(options!); return new Response(JSON.stringify({ id: 'local-test' }), { status: 200 }); }) as typeof fetch;
    for (const value of [null, [], { ...valid, firstName: 123 }, { ...valid, email: 'invalid' }, { ...valid, message: '' }, { ...valid, message: 'x'.repeat(5001) }]) {
      assert.ok((await POST(request(value))).status >= 400, 'Invalid payload rejected');
    }
    assert.equal(requests.length, 0, 'Invalid leads never reach provider');
    assert.equal((await POST(request({ ...valid, company_website: 'bot.example' }))).status, 200);
    assert.equal(requests.length, 0, 'Honeypot must not send mail');
    assert.equal((await POST(request(valid))).status, 200);
    assert.equal((await POST(request(valid))).status, 200);
    const mail = JSON.parse(String(requests[0].body));
    assert.equal(mail.to, 'team@example.com');
    assert.equal(mail.reply_to, valid.email);
    for (const value of [valid.phone, valid.service, valid.message, valid.source, valid.page]) assert.ok(mail.text.includes(value));
    assert.equal(new Headers(requests[0].headers).get('Idempotency-Key'), `contact/${valid.submissionId}`);
    assert.equal(requests[0].body, requests[1].body, 'Retries must have identical bodies for provider deduplication');
    assert.ok(requests[0].signal, 'Provider request is bounded by a timeout');
    globalThis.fetch = (async () => new Response('{"message":"unverified sender"}', { status: 403 })) as typeof fetch;
    const failed = await POST(request(valid));
    assert.equal(failed.status, 503);
    assert.equal((await failed.json()).ok, false, 'Provider errors must not report success');
    for (const handler of [addressGet, addressPost, estimate]) assert.equal((await handler(request({}))).status, 404, 'Retired planner APIs must be unavailable');
    console.log('Contact API checks passed: validation, honeypot, destination, reply-to, complete lead fields, idempotency, timeout, missing settings, provider failure, and hidden planner APIs.');
  } finally { globalThis.fetch = realFetch; }
}
main().catch(e => { console.error(e); process.exit(1); });
