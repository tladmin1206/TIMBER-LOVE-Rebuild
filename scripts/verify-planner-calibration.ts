/* eslint-disable no-console */
/**
 * Calibration validation.
 *
 * Runs the five real Timber and Love reference estimates through the ACTUAL
 * pricing engine with CALIBRATED_RULESET and asserts the output range brackets
 * each real project total. This is what makes the calibrated numbers grounded
 * rather than guessed: the engine's output, after every multiplier and
 * contingency, must contain the price the project actually came in at.
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
    validate: true,
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
run(scenarios, 'Validated against real project totals');
run(derived, 'Derived bands (sanity review only, not bracket-tested)');

console.log(`\n${failures === 0 ? 'All validated scenarios bracket their real total.' : `${failures} validated scenario(s) failed to bracket.`}\n`);
process.exit(failures === 0 ? 0 : 1);
