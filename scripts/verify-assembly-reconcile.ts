/**
 * Reconciliation: assemble each offered project type / tier at a typical size
 * and compare the customer-facing base against the leadership-approved
 * CALIBRATED_RULESET band (flat for kitchen/bath, per-sqft for whole-home /
 * new-construction). The assembly baseline is the REIMAGINE scope, exactly what
 * the bands encode, so a healthy engine lands each build-up inside its band.
 */
import { computeAssembly } from '../lib/planner/pricing/assembly/engine';
import { CALIBRATED_RULESET, lookupBand } from '../lib/planner/ruleset';
import type { FinishTier, PlannerAnswers, ProjectType, PropertyFacts } from '../lib/planner/types';

const fmt = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

const RENO_HOME: PropertyFacts = {
  finishedSqFt: 2400,
  yearBuilt: 1998,
  serviceAreaBand: 'core',
  enrichmentSource: 'MANUAL',
  estimatedValue: 750_000,
};

const CASES: { type: ProjectType; tiers: FinishTier[]; sqft?: number }[] = [
  { type: 'kitchen', tiers: ['signature', 'elevated', 'bespoke'] },
  { type: 'bathroom', tiers: ['signature', 'elevated', 'bespoke'] },
  { type: 'bathroom-guest', tiers: ['signature', 'elevated'] },
  { type: 'whole-home', tiers: ['signature', 'elevated', 'bespoke'] },
  { type: 'new-construction', tiers: ['signature', 'elevated', 'bespoke'], sqft: 3000 },
];

/** Band bounds in dollars for a type/tier/size (resolves per-sqft + new-construction). */
function bandDollars(type: ProjectType, tier: FinishTier, area: number): { low: number; high: number } | null {
  if (type === 'new-construction') {
    const p = CALIBRATED_RULESET.newConstruction.conditionedPerSqFt[tier];
    return p ? { low: p.low * area, high: p.high * area } : null;
  }
  const band = lookupBand(CALIBRATED_RULESET, type, 'reimagine', tier);
  if (!band) return null;
  return band.basis === 'per-sqft' ? { low: band.low * area, high: band.high * area } : { low: band.low, high: band.high };
}

let flags = 0;
let total = 0;
for (const { type, tiers, sqft } of CASES) {
  for (const tier of tiers) {
    total++;
    const answers: PlannerAnswers = {
      mode: type === 'new-construction' ? 'C' : 'A',
      projectType: type,
      scopeLevel: 'reimagine',
      finishTier: tier,
      ...(sqft ? { targetSqFt: sqft } : {}),
    };
    const property = type === 'new-construction' ? { ...RENO_HOME, finishedSqFt: sqft } : RENO_HOME;
    const a = computeAssembly(answers, property);
    if (!a) {
      console.log(`\n${type}.${tier}: NO ASSEMBLY (template missing)`);
      flags++;
      continue;
    }
    const area = type === 'new-construction' ? sqft! : type.startsWith('whole') ? a.takeoff.areaSqFt : a.takeoff.areaSqFt;
    const bd = bandDollars(type, tier, type.startsWith('whole') || type === 'new-construction' ? a.takeoff.homeSqFt : area);
    const inBand = bd ? a.customerCost >= bd.low && a.customerCost <= bd.high : false;
    const near = bd ? a.customerCost >= bd.low * 0.9 && a.customerCost <= bd.high * 1.1 : false;
    const status = inBand ? 'IN BAND' : near ? 'near' : 'OUT OF BAND';
    if (!inBand && !near) flags++;
    const perSqft = type.startsWith('whole') || type === 'new-construction' ? `  ($${Math.round(a.customerCost / a.takeoff.homeSqFt)}/sqft)` : '';
    console.log(
      `${(type + ' · ' + tier).padEnd(34)} internal ${fmt(a.internalCost).padStart(10)}  cust ${fmt(a.customerCost).padStart(10)}${perSqft}` +
        `   band ${bd ? fmt(bd.low) + '–' + fmt(bd.high) : 'n/a'}  [${status}]`
    );
  }
}
console.log(`\n${flags === 0 ? `OK — all ${total} cases in/near band.` : `${flags}/${total} cases OUT OF BAND — recalibrate.`}`);
