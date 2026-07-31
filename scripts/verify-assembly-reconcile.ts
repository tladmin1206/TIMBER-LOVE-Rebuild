/**
 * Reconciliation: assemble each offered project type / tier at a typical size
 * and compare the customer-facing base against the leadership-approved
 * CALIBRATED_RULESET band. The assembly baseline is the REIMAGINE scope, which
 * is exactly what the flat/per-sqft bands encode, so a healthy engine lands
 * each build-up inside (or very near) its approved band.
 */
import { computeAssembly } from '../lib/planner/pricing/assembly/engine';
import { CALIBRATED_RULESET, lookupBand } from '../lib/planner/ruleset';
import type { FinishTier, PlannerAnswers, ProjectType, PropertyFacts } from '../lib/planner/types';

const fmt = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

const property: PropertyFacts = {
  finishedSqFt: 2400,
  yearBuilt: 1998,
  serviceAreaBand: 'core',
  enrichmentSource: 'MANUAL',
  estimatedValue: 750_000,
};

const CASES: { type: ProjectType; tiers: FinishTier[] }[] = [
  { type: 'kitchen', tiers: ['signature', 'elevated', 'bespoke'] },
];

let flags = 0;
for (const { type, tiers } of CASES) {
  for (const tier of tiers) {
    const answers: PlannerAnswers = { mode: 'A', projectType: type, scopeLevel: 'reimagine', finishTier: tier };
    const a = computeAssembly(answers, property);
    if (!a) {
      console.log(`\n${type}.${tier}: no assembly (template missing)`);
      continue;
    }
    const band = lookupBand(CALIBRATED_RULESET, type, 'reimagine', tier);
    const bandStr = band ? `${fmt(band.low)}–${fmt(band.high)}` : 'no band';
    const inBand = band ? a.customerCost >= band.low && a.customerCost <= band.high : false;
    const near = band ? a.customerCost >= band.low * 0.9 && a.customerCost <= band.high * 1.1 : false;
    const status = inBand ? 'IN BAND' : near ? 'near' : 'OUT OF BAND';
    if (!inBand && !near) flags++;

    console.log(`\n=== ${type} · ${tier} (reimagine) ===`);
    console.log(`  takeoff: ${a.takeoff.areaSqFt} SF · ${a.takeoff.cabinetLf} cab LF · ${a.takeoff.durationMonths} mo`);
    console.log(`  internal cost:  ${fmt(a.internalCost)}`);
    console.log(`  margin applied: ${(a.margin * 100).toFixed(1)}%  ->  customer: ${fmt(a.customerCost)}`);
    console.log(`  approved band:  ${bandStr}   [${status}]`);
    console.log('  per-trade rollup:');
    for (const t of a.trades) {
      console.log(`    ${t.division.padEnd(26)} internal ${fmt(t.internalCost).padStart(10)}  →  customer ${fmt(t.customerCost).padStart(10)}`);
    }
    if (a.warnings.length) console.log('  warnings:', a.warnings);
  }
}
console.log(`\n${flags === 0 ? 'OK — all cases in/near band.' : `${flags} case(s) OUT OF BAND — recalibrate.`}`);
