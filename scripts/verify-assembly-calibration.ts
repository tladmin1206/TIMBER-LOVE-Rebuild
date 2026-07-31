/* eslint-disable no-console */
/**
 * Assembly calibration: run the ASSEMBLY basis through the same real Timber and
 * Love closed-project references the band calibration uses, through the full
 * engine (scope + age + site multipliers, adders, contingency), and report how
 * the customer range compares to the price each project actually came in at.
 *
 * Reference data: memory/estimator-reference-pricing.md
 * Run: npx tsx scripts/verify-assembly-calibration.ts
 */
import { CALIBRATED_RULESET } from '../lib/planner/ruleset';
import { estimate } from '../lib/planner/pricing/engine';
import { AssemblyBasis } from '../lib/planner/pricing/assembly/basis';
import type { PlannerAnswers, PropertyFacts } from '../lib/planner/types';

const NOW = new Date('2026-07-28T00:00:00Z');
const fmt = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;
const core = { serviceAreaBand: 'core' as const };

type Ref = { name: string; answers: PlannerAnswers; property: PropertyFacts; realTotal: number; sqft: number };

const refs: Ref[] = [
  {
    name: '750 N Locust · whole-home rebuild · elevated · 2,500sf',
    answers: { mode: 'A', projectType: 'whole-home', scopeLevel: 'rebuild', finishTier: 'elevated', goals: [] },
    property: { ...core, yearBuilt: 1965, finishedSqFt: 2500, enrichmentSource: 'MANUAL' },
    realTotal: 290_307,
    sqft: 2500,
  },
  {
    name: 'Workland · new-construction bespoke · 3,200sf +2-car',
    answers: { mode: 'C', projectType: 'new-construction', finishTier: 'bespoke', targetSqFt: 3200, garageBays: 2 },
    property: { ...core, finishedSqFt: 3200, enrichmentSource: 'NONE', historicReviewRequired: true },
    realTotal: 1_436_125,
    sqft: 3200,
  },
  {
    name: 'Markowich · new-construction elevated · 1,307sf',
    answers: { mode: 'C', projectType: 'new-construction', finishTier: 'elevated', targetSqFt: 1307 },
    property: { ...core, finishedSqFt: 1307, enrichmentSource: 'NONE' },
    realTotal: 530_739,
    sqft: 1307,
  },
  {
    name: 'ADA Master Suite · whole-home rebuild · elevated · 1,800sf (hybrid)',
    answers: { mode: 'A', projectType: 'whole-home', scopeLevel: 'rebuild', finishTier: 'elevated', goals: [] },
    property: { ...core, yearBuilt: 1975, finishedSqFt: 1800, enrichmentSource: 'MANUAL' },
    realTotal: 211_193,
    sqft: 1800,
  },
];

console.log('\nASSEMBLY CALIBRATION vs real closed-project totals\n');
let worst = 0;
for (const r of refs) {
  const e = estimate(r.answers, r.property, { ruleset: CALIBRATED_RULESET, now: NOW, production: false, basis: new AssemblyBasis() });
  if (!e.range) {
    console.log(`  ${r.name}\n    no range: ${e.outcome} — ${e.diagnostics.join('; ')}`);
    continue;
  }
  const { low, mid, high } = e.range;
  const brackets = low <= r.realTotal && r.realTotal <= high;
  const midDelta = ((mid - r.realTotal) / r.realTotal) * 100;
  worst = Math.max(worst, Math.abs(midDelta));
  console.log(
    `  ${brackets ? 'BRACKETS' : 'off     '} ${r.name}\n` +
      `    assembly ${fmt(low)} / ${fmt(mid)} / ${fmt(high)}  ($${Math.round(mid / r.sqft)}/sf)\n` +
      `    real     ${fmt(r.realTotal)}  ($${Math.round(r.realTotal / r.sqft)}/sf)   mid ${midDelta >= 0 ? '+' : ''}${midDelta.toFixed(0)}%\n`
  );
}
console.log(`worst mid deviation: ${worst.toFixed(0)}%\n`);
