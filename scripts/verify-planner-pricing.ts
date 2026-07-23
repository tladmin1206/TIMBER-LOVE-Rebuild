/* eslint-disable no-console */
/**
 * Pricing-integrity checks from the spec's acceptance criteria (Part II § 14).
 *
 * Run: npx tsx scripts/verify-planner-pricing.ts
 *
 * These assert the properties that make the engine defensible rather than
 * merely functional — determinism, the sign-off gate, guardrails, and the
 * refusal to invent a band.
 */
import { DRAFT_RULESET, assertPublishable, offerableProjectTypes, type Ruleset } from '../lib/planner/ruleset';
import { estimate } from '../lib/planner/pricing/engine';
import type { PlannerAnswers, PropertyFacts } from '../lib/planner/types';

const NOW = new Date('2026-07-23T00:00:00Z');

let failures = 0;
function check(name: string, cond: boolean, detail = '') {
  if (cond) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

/** A signed copy of the draft table, used only to exercise the engine. */
function signedFixture(): Ruleset {
  return {
    ...DRAFT_RULESET,
    version: '2026.07.1-test-fixture',
    signOff: { approver: 'TEST FIXTURE', role: 'test', date: '2026-07-01' },
    containsUncalibratedValues: false,
  };
}

const answers: PlannerAnswers = {
  mode: 'A',
  projectType: 'kitchen',
  scopeLevel: 'reimagine',
  finishTier: 'elevated',
  goals: ['function'],
  notSure: [],
};

const property: PropertyFacts = {
  yearBuilt: 1961,
  finishedSqFt: 2340,
  estimatedValue: 620_000,
  serviceAreaBand: 'core',
  enrichmentSource: 'ATTOM',
  occupiedDuringConstruction: true,
};

console.log('\nSign-off gate (§ 9)');
{
  const gate = assertPublishable(DRAFT_RULESET, NOW);
  check('draft ruleset is refused for publication', gate.publishable === false);
  if (!gate.publishable) {
    check(
      'refusal cites the missing sign-off',
      gate.reasons.some((r) => /sign-off/i.test(r))
    );
    check(
      'refusal cites the uncalibrated values',
      gate.reasons.some((r) => /uncalibrated/i.test(r))
    );
  }

  const stale: Ruleset = { ...signedFixture(), signOff: { approver: 'X', role: 'y', date: '2025-01-01' } };
  const staleGate = assertPublishable(stale, NOW);
  check('a stale but signed table still publishes', staleGate.publishable === true);
  check('a stale table warns internally', staleGate.warnings.length > 0);
}

console.log('\nEngine refuses to price on the draft table');
{
  const e = estimate(answers, property, { ruleset: DRAFT_RULESET, now: NOW });
  check('outcome is blocked', e.outcome === 'no-approved-band');
  check('no range is produced', e.range === null);
}

console.log('\nDeterminism (§ 14: identical inputs, 100 consecutive runs)');
{
  const ruleset = signedFixture();
  const first = estimate(answers, property, { ruleset, now: NOW });
  let identical = true;
  for (let i = 0; i < 100; i++) {
    const next = estimate(answers, property, { ruleset, now: NOW });
    if (JSON.stringify(next) !== JSON.stringify(first)) {
      identical = false;
      break;
    }
  }
  check('100 consecutive runs produce identical output', identical);
  check('a range was actually produced', first.range !== null, first.diagnostics.join('; '));
  if (first.range) {
    console.log(
      `        range: $${first.range.low.toLocaleString()} / $${first.range.mid.toLocaleString()} / $${first.range.high.toLocaleString()}  (${first.confidence.label}, ${first.confidence.score})`
    );
  }
}

console.log('\nRounding (§ 1A.1 step 7)');
{
  const ruleset = signedFixture();
  const e = estimate(answers, property, { ruleset, now: NOW });
  if (e.range) {
    const ok = [e.range.low, e.range.mid, e.range.high].every((v) =>
      v >= 250_000 ? v % 10_000 === 0 : v % 5_000 === 0
    );
    check('every figure lands on the correct rounding step', ok);
  }
}

console.log('\nPhase 1 confidence cap (§ 1A.4)');
{
  const ruleset = signedFixture();
  const perfect: PropertyFacts = { ...property, enrichmentSource: 'ATTOM' };
  const e = estimate({ ...answers, notSure: [] }, perfect, { ruleset, now: NOW });
  check('label never reads Strong on a segment-band estimate', e.confidence.label !== 'Strong');
}

console.log('\nApproved spread is a floor on the range (§ 1A.4)');
{
  const ruleset = signedFixture();
  const e = estimate(answers, property, { ruleset, now: NOW });
  if (e.range && e.trace) {
    // The displayed range must be at least as wide as the approved band once
    // the same multipliers have been applied to both.
    const spread = e.range.high - e.range.low;
    const approvedSpread = e.trace.approvedBand.high - e.trace.approvedBand.low;
    check('displayed spread is not narrower than the approved spread', spread >= approvedSpread * 0.99,
      `displayed ${spread}, approved ${approvedSpread}`);
  }
}

console.log('\nGuardrails (§ 5)');
{
  const ruleset = signedFixture();

  // Below minimum: force it by raising the minimum above any producible mid.
  const highMinimum: Ruleset = { ...ruleset, projectMinimum: 10_000_000 };
  const low = estimate(answers, property, { ruleset: highMinimum, now: NOW });
  check('below-minimum outcome is returned', low.outcome === 'below-minimum', `outcome ${low.outcome}`);
  check('below-minimum suppresses the range entirely', low.range === null);
  check('below-minimum still returns disclosure for the PM', low.trace !== null);

  // Over-improvement: a large project against a modest property value.
  const over = estimate(
    { ...answers, scopeLevel: 'rebuild', finishTier: 'bespoke' },
    { ...property, estimatedValue: 300_000 },
    { ruleset, now: NOW }
  );
  check('over-improvement is flagged', over.overImprovement === true, `ratio ${over.overImprovementRatio}`);

  // Forever-home clients are allowed to over-improve (§ 5.4).
  const forever = estimate(
    { ...answers, scopeLevel: 'rebuild', finishTier: 'bespoke', goals: ['forever_home'] },
    { ...property, estimatedValue: 300_000 },
    { ruleset, now: NOW }
  );
  check('over-improvement notice is suppressed for a forever home', forever.overImprovement === false);
}

console.log('\nRule 4: no band, no offer');
{
  const ruleset = signedFixture();
  // kitchen.refresh.bespoke is deliberately absent from Appendix A.
  const e = estimate({ ...answers, scopeLevel: 'refresh', finishTier: 'bespoke' }, property, { ruleset, now: NOW });
  check('missing band produces no range rather than a default', e.range === null && e.outcome === 'no-approved-band');

  const offerable = offerableProjectTypes(DRAFT_RULESET);
  check('new-construction is offerable from the Mode C table', offerable.includes('new-construction'));

  // Removing every band for a type must remove it from the offer list, rather
  // than leaving it to fall through to a default.
  const noBath: Ruleset = { ...DRAFT_RULESET, bands: { ...DRAFT_RULESET.bands, bathroom: {} } };
  check('a type stripped of its bands is no longer offered', !offerableProjectTypes(noBath).includes('bathroom'));
  check('stripping one type does not affect the others', offerableProjectTypes(noBath).includes('kitchen'));
  console.log(`        offerable: ${offerable.join(', ')}`);
}

console.log('\nTransparency is generated, not authored (§ 6)');
{
  const ruleset = signedFixture();
  const e = estimate(answers, property, { ruleset, now: NOW });
  const t = e.transparency;
  check('assumptions are present', t.assumptions.length > 0);
  check('at least one assumption cites a source', t.assumptions.every((a) => !!a.source));
  check(
    'the panel assumption is flagged on a pre-1985 home',
    t.assumptions.some((a) => /electrical panel/i.test(a.text) && a.flaggedForVerification === true)
  );
  check(
    'an era-specific exclusion carries a magnitude',
    t.exclusions.some((x) => /asbestos/i.test(x.text) && !!x.typicalMagnitude)
  );
  check('contingency is disclosed as an inclusion', t.inclusions.some((i) => /contingency/i.test(i.label)));
}

console.log('\nMode C boundary honesty');
{
  const ruleset = signedFixture();
  const c = estimate(
    { mode: 'C', projectType: 'new-construction', scopeLevel: 'reimagine', finishTier: 'elevated', targetSqFt: 3000 },
    { serviceAreaBand: 'core', enrichmentSource: 'NONE' },
    { ruleset, now: NOW }
  );
  const stated = c.transparency.exclusions.some((x) => /commonly add/i.test(x.text));
  check('excluded-category magnitude is NOT stated while Appendix A § 4 is blank', stated === false);
}

console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) failed.`}\n`);
process.exit(failures === 0 ? 0 : 1);
