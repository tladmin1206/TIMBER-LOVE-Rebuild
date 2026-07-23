/* eslint-disable no-console */
/**
 * Lead delivery checks.
 *
 * These matter more than most: an undelivered lead is a lost job, and the
 * previous implementation could not tell delivery from failure because it never
 * read the response. Resend answers 403 for an unverified sending domain, which
 * is the most common first-run mistake and used to look exactly like success.
 *
 * Run: npx tsx scripts/verify-lead-delivery.ts
 */
import { sendLeadEmail, isEmailConfigured } from '../lib/leads/email';

let failures = 0;
function check(name: string, cond: boolean, detail = '') {
  if (cond) console.log(`  PASS  ${name}`);
  else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

const realFetch = globalThis.fetch;
let calls = 0;

function stubFetch(handler: (attempt: number) => { status: number; body?: string }) {
  calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    const { status, body } = handler(calls);
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => (body ? JSON.parse(body) : {}),
      text: async () => body ?? '',
    } as Response;
  }) as typeof fetch;
}

const MAIL = { subject: 'test', text: 'body', replyTo: 'homeowner@example.com' };

(async () => {
  console.log('\nConfiguration');
  {
    const saved = { ...process.env };
    delete process.env.RESEND_API_KEY;
    check('reports unconfigured when the key is absent', isEmailConfigured() === false);

    const r = await sendLeadEmail(MAIL);
    check('unconfigured send returns not-configured rather than throwing',
      r.delivered === false && r.reason === 'not-configured');
    Object.assign(process.env, saved);
  }

  // From here on, pretend the environment is configured.
  process.env.RESEND_API_KEY = 'test-key';
  process.env.LEAD_TO_EMAIL = 'leads@example.com';
  process.env.LEAD_FROM_EMAIL = 'site@example.com';
  check('reports configured when all three are set', isEmailConfigured() === true);

  console.log('\nSuccess path');
  {
    stubFetch(() => ({ status: 200, body: '{"id":"msg_123"}' }));
    const r = await sendLeadEmail(MAIL);
    check('a 200 is reported as delivered', r.delivered === true);
    check('the provider message id is captured', r.delivered === true && r.id === 'msg_123');
    check('no retry on success', calls === 1, `${calls} calls`);
  }

  console.log('\nFailures that used to look like success');
  {
    // The unverified-sending-domain case.
    stubFetch(() => ({ status: 403, body: '{"message":"domain is not verified"}' }));
    const forbidden = await sendLeadEmail(MAIL);
    check('a 403 is reported as NOT delivered', forbidden.delivered === false);
    check('the reason names the status', forbidden.delivered === false && /403/.test(forbidden.reason));
    check('a client error is not retried', calls === 1, `${calls} calls`);

    stubFetch(() => ({ status: 401, body: 'unauthorized' }));
    const unauthorized = await sendLeadEmail(MAIL);
    check('an expired key is reported as NOT delivered', unauthorized.delivered === false);
    check('an expired key is not retried', calls === 1, `${calls} calls`);

    stubFetch(() => ({ status: 422, body: 'invalid from address' }));
    const unprocessable = await sendLeadEmail(MAIL);
    check('a 422 is reported as NOT delivered', unprocessable.delivered === false);
  }

  console.log('\nTransient failures are retried');
  {
    stubFetch((n) => (n < 3 ? { status: 500, body: 'upstream' } : { status: 200, body: '{"id":"m"}' }));
    const recovered = await sendLeadEmail(MAIL);
    check('a 500 is retried and can succeed', recovered.delivered === true);
    check('it took the expected number of attempts', calls === 3, `${calls} calls`);

    stubFetch(() => ({ status: 429, body: 'slow down' }));
    const rateLimited = await sendLeadEmail(MAIL);
    check('a rate limit is retried', calls === 3, `${calls} calls`);
    check('exhausted retries report failure', rateLimited.delivered === false);
    check('the attempt count is reported', rateLimited.delivered === false && rateLimited.attempts === 3);
  }

  console.log('\nNetwork errors');
  {
    calls = 0;
    globalThis.fetch = (async () => {
      calls += 1;
      throw new Error('ECONNRESET');
    }) as typeof fetch;
    const r = await sendLeadEmail(MAIL);
    check('a network error does not throw out of sendLeadEmail', r.delivered === false);
    check('a network error is retried', calls === 3, `${calls} calls`);
  }

  globalThis.fetch = realFetch;
  console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) failed.`}\n`);
  process.exit(failures === 0 ? 0 : 1);
})();
