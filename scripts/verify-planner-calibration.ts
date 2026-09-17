/* eslint-disable no-console */
/**
 * Calibration validation.
 *
 * Runs the real Timber and Love reference estimates through the ACTUAL pricing
 * engine with CALIBRATED_RULESET. For every scenario marked `validate`, the
 * output range must bracket the real project total. This is what makes those
 * numbers grounded rather than guessed: the engine's output, after every
 * multiplier and contingency, must contain the price the project actually came
 * in at.
 *
 * The whole-home references are no longer among them. Commit 65771cb redefined
 * whole-home as a FULL renovation and raised the band by direction, so the
 * remodel references - which captured a lighter scope at ~$116/sqft - describe
 * a different product than the band now prices. They still print, because the
 * delta is worth seeing, but they no longer assert. The whole-home band is
 * validated against the line-item assembly build-up instead, in
 * scripts/verify-assembly-reconcile.ts.
 *
 * What still asserts here is new construction, where the references and the
 * bands describe the same thing.
 *
 * Reference data: memory/estimator-reference-pricing.md
 * Run: npx tsx scripts/verify-planner-calibration.ts
 */
import { CALIBRATED_RULESET } from '../lib/planner/ruleset';
import { estimate } from '../lib/planner/pricing/engine';
import type { PlannerAnswers, PropertyFacts } from '../lib/planner/types';

const NOW = new Date('2026-07-28T00:00:00Z');
const RULESET = CALIBRATED_RULESET;

let failures = 0;
function fmt(v: number) {
  return `$${Math.round(v).toLocaleString('en-US')}`;
}

type Scenario = {
  name: string;
  answers: PlannerAnswers;
  property: PropertyFacts;
  realTotal: number;
  /** true = assert the range brackets realTotal; false = print only. */
  validate: boolean;
  note?: string;
};

const core: Pick<PropertyFacts, 'serviceAreaBand'> = { serviceAreaBand: 'core' };

const scenarios: Scenario[] = [
  {
    name: '750 N Locust - whole-home gut remodel, 2,500 sf',
    answers: { mode: 'A', projectType: 'whole-home', scopeLevel: 'rebuild', finishTier: 'elevated', goals: [] },
    property: { ...core, yearBuilt: 1965, finishedSqFt: 2500, enrichmentSource: 'MANUAL', occupiedDuringConstruction: false },
    realTotal: 290_307,
    // Informational since 65771cb, which redefined the planner's whole-home as
    // a FULL renovation by direction and raised the band to match. This
    // reference captures the lighter scope of the original five estimates
    // ($116/sqft), so it can no longer bracket a band that deliberately models
    // something heavier, and the assertion is unsatisfiable at this project's
    // real scope: a gut remodel is `rebuild`, and the band floor of $115/sqft
    // times the 1.42 rebuild multiplier is already $163/sqft before age and
    // escalation. Nothing here is tuned to make it pass - the inputs still
    // describe the project as it was.
    //
    // Do NOT lower the WHOLE_HOME band to close this gap: that would undo a
    // deliberate pricing decision and make the planner under-quote full
    // renovations. The whole-home band's validation basis moved with that
    // commit, from bracketing historical totals to bracketing the line-item
    // assembly build-up, which scripts/verify-assembly-reconcile.ts checks.
    // Restoring a real bracket test here needs a reference project actually
    // built at full-renovation scope.
    validate: false,
    note: 'lighter scope than the redefined whole-home band (see 65771cb); band now validated by verify-assembly-reconcile',
  },
  {
    name: 'Workland - new custom MCM home, ~3,200 sf (high-end)',
    answers: { mode: 'C', projectType: 'new-construction', finishTier: 'bespoke', targetSqFt: 3200, garageBays: 2 },
    property: { ...core, enrichmentSource: 'NONE', historicReviewRequired: true },
    realTotal: 1_436_125,
    validate: true,
    note: 'garage added on top of conditioned shell',
  },
  {
    name: 'Markowich - new Shop + ADU, ~1,307 sf footprint',
    answers: { mode: 'C', projectType: 'new-construction', finishTier: 'elevated', targetSqFt: 1307 },
    property: { ...core, enrichmentSource: 'NONE' },
    realTotal: 530_739,
    validate: true,
    note: 'ADU conditioned area approximated by footprint',
  },
  {
    name: 'ADA Master Suite - hybrid remodel + addition + ADA kitchen + patio',
    answers: { mode: 'A', projectType: 'whole-home', scopeLevel: 'rebuild', finishTier: 'elevated', goals: [] },
    property: { ...core, yearBuilt: 1975, finishedSqFt: 1800, enrichmentSource: 'MANUAL' },
    realTotal: 211_193,
    validate: false,
    note: 'hybrid scope (addition + ADA kitchen + patio); informational only',
  },
];

// Derived kitchen/bath scenarios: printed for sanity review, not bracket-tested
// (the references contain no standalone kitchen or bath total).
const derived: Scenario[] = [
  {
    name: 'New home - signature (entry-level custom), 2,400 sf (modeled)',
    answers: { mode: 'C', projectType: 'new-construction', finishTier: 'signature', targetSqFt: 2400, garageBays: 2 },
    property: { ...core, enrichmentSource: 'NONE' },
    realTotal: 2400 * 310,
    validate: false,
    note: 'no basic-new-home reference; modeled from tier structure (~$280-350/sf)',
  },
  {
    name: 'Kitchen - reimagine, elevated (derived)',
    answers: { mode: 'A', projectType: 'kitchen', scopeLevel: 'reimagine', finishTier: 'elevated', goals: [] },
    property: { ...core, yearBuilt: 1975, finishedSqFt: 2200, enrichmentSource: 'MANUAL' },
    realTotal: 100_000,
    validate: false,
    note: 'derived from 750 Locust kitchen scope + allocated trades',
  },
  {
    name: 'Primary bath - reimagine, elevated (derived)',
    answers: { mode: 'A', projectType: 'bathroom', scopeLevel: 'reimagine', finishTier: 'elevated', goals: [] },
    property: { ...core, yearBuilt: 1975, finishedSqFt: 2200, enrichmentSource: 'MANUAL' },
    realTotal: 45_000,
    validate: false,
    note: 'derived from ADA master bath scope, minus ADA premium',
  },
  {
    name: 'Guest bath - reimagine, elevated (derived)',
    answers: { mode: 'A', projectType: 'bathroom-guest', scopeLevel: 'reimagine', finishTier: 'elevated', goals: [] },
    property: { ...core, yearBuilt: 1975, finishedSqFt: 2200, enrichmentSource: 'MANUAL' },
    realTotal: 28_000,
    validate: false,
  },
];

function run(list: Scenario[], header: string) {
  console.log(`\n${header}`);
  for (const s of list) {
    const e = estimate(s.answers, s.property, { ruleset: RULESET, now: NOW });
    if (!e.range) {
      console.log(`  FAIL  ${s.name}\n        no range produced: ${e.outcome} - ${e.diagnostics.join('; ')}`);
      if (s.validate) failures += 1;
      continue;
    }
    const { low, mid, high } = e.range;
    const brackets = low <= s.realTotal && s.realTotal <= high;
    const midDelta = ((mid - s.realTotal) / s.realTotal) * 100;
    const tag = s.validate ? (brackets ? 'PASS' : 'FAIL') : 'INFO';
    if (s.validate && !brackets) failures += 1;
    console.log(
      `  ${tag}  ${s.name}\n        range ${fmt(low)} / ${fmt(mid)} / ${fmt(high)}` +
        `   real ${fmt(s.realTotal)}  (mid ${midDelta >= 0 ? '+' : ''}${midDelta.toFixed(0)}%)` +
        (s.note ? `\n        note: ${s.note}` : '')
    );
  }
}

console.log('\nCALIBRATION VALIDATION - reference totals through the real engine');
run(scenarios, 'Reference projects (PASS/FAIL asserts a bracket; INFO prints only)');
run(derived, 'Derived bands (sanity review only, not bracket-tested)');

console.log(`\n${failures === 0 ? 'All validated scenarios bracket their real total.' : `${failures} validated scenario(s) failed to bracket.`}\n`);
process.exit(failures === 0 ? 0 : 1);
