// Verifies the GA4 questionnaire events: once-per-page start, step 1, submit,
// required params, no PII keys, and a safe no-op when gtag is absent.
import assert from 'node:assert/strict';

const calls: unknown[][] = [];
const g = globalThis as any;
g.window = { location: { pathname: '/design-and-build-questionnaire/' }, innerWidth: 390 };
Object.defineProperty(g, 'navigator', { value: { userAgent: 'Mozilla/5.0 (iPhone) Mobile', doNotTrack: '0' }, configurable: true });

(async () => {
  const m = await import('../lib/questionnaireAnalytics');
  // gtag absent: must not throw.
  m.trackQuestionnaireSubmit('x');
  g.window.gtag = (...a: unknown[]) => calls.push(a);
  m.trackQuestionnaireStart('general_contact');
  m.trackQuestionnaireStart('general_contact');
  m.trackQuestionnaireSubmit('general_contact');
  const names = calls.map((c) => c[1]);
  assert.deepEqual(names, ['questionnaire_start', 'questionnaire_step', 'questionnaire_submit']);
  for (const c of calls) {
    const p = c[2] as Record<string, unknown>;
    assert.equal(p.form_id, 'general_contact');
    assert.equal(p.page_path, '/design-and-build-questionnaire/');
    assert.equal(p.source_page, '/design-and-build-questionnaire/');
    assert.equal(p.device_category, 'mobile');
    for (const k of Object.keys(p)) assert.ok(!/name|email|phone|message|address/i.test(k), `PII-like key ${k}`);
  }
  assert.equal((calls[1][2] as any).step_number, 1);
  console.log('  PASS  questionnaire GA4 events');
})();
