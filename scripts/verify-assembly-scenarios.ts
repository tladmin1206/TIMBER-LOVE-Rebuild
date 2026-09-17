/**
 * Scenario suite: min / typical / complex projects per type. Asserts the
 * assembly is internally consistent and behaves monotonically:
 *  - per-trade customer amounts sum to the project total (rollup integrity)
 *  - finish tiers are strictly ordered (signature < elevated < bespoke)
 *  - larger / older / harder inputs never cost less than smaller / newer ones
 *  - margin sits in the policy band and no catalog codes are missing
 * Exits non-zero on any failure so it can gate CI alongside verify:planner.
 */
import { computeAssembly } from '../lib/planner/pricing/assembly/engine';
import { effectiveMargin } from '../lib/planner/pricing/assembly/margin';
import type { FinishTier, PlannerAnswers, ProjectType, PropertyFacts } from '../lib/planner/types';

const fmt = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;
let failures = 0;
const check = (cond: boolean, msg: string) => {
  if (!cond) {
    failures++;
    console.log(`  FAIL: ${msg}`);
  }
};

type Scn = { label: string; property: PropertyFacts; sqft?: number };
const base = (o: Partial<PropertyFacts>): PropertyFacts => ({ serviceAreaBand: 'core', enrichmentSource: 'MANUAL', ...o });

const SCENARIOS: Record<ProjectType, Scn[]> = {
  kitchen: [
    { label: 'min (small newer home)', property: base({ finishedSqFt: 1400, yearBuilt: 2015 }) },
    { label: 'typical', property: base({ finishedSqFt: 2400, yearBuilt: 1998 }) },
    { label: 'complex (large old home)', property: base({ finishedSqFt: 4200, yearBuilt: 1930, occupiedDuringConstruction: true }) },
  ],
  bathroom: [
    { label: 'min', property: base({ finishedSqFt: 1400, yearBuilt: 2015 }) },
    { label: 'typical', property: base({ finishedSqFt: 2400, yearBuilt: 1998 }) },
    { label: 'complex', property: base({ finishedSqFt: 4200, yearBuilt: 1930 }) },
  ],
  'bathroom-guest': [
    { label: 'typical', property: base({ finishedSqFt: 2400, yearBuilt: 1998 }) },
  ],
  'whole-home': [
    { label: 'min (small)', property: base({ finishedSqFt: 1500, yearBuilt: 2010 }) },
    { label: 'typical', property: base({ finishedSqFt: 2600, yearBuilt: 1995 }) },
    { label: 'complex (large old)', property: base({ finishedSqFt: 4800, yearBuilt: 1925 }) },
  ],
  'new-construction': [
    { label: 'min', property: base({ finishedSqFt: 1800 }), sqft: 1800 },
    { label: 'typical', property: base({ finishedSqFt: 3000 }), sqft: 3000 },
    { label: 'complex (large)', property: base({ finishedSqFt: 6000 }), sqft: 6000 },
  ],
};

const TIERS: FinishTier[] = ['signature', 'elevated', 'bespoke'];

for (const [type, scns] of Object.entries(SCENARIOS) as [ProjectType, Scn[]][]) {
  console.log(`\n### ${type}`);
  for (const scn of scns) {
    const mode = type === 'new-construction' ? 'C' : 'A';
    const results = TIERS.map((tier) => {
      const answers: PlannerAnswers = { mode, projectType: type, scopeLevel: 'reimagine', finishTier: tier, ...(scn.sqft ? { targetSqFt: scn.sqft } : {}) };
      return { tier, a: computeAssembly(answers, scn.property) };
    }).filter((r) => r.a);

    if (!results.length) {
      check(false, `${type} ${scn.label}: produced no assembly`);
      continue;
    }
    const costs: string[] = [];
    for (const { tier, a } of results) {
      if (!a) continue;
      // rollup integrity: trade customer amounts sum to the project total (±$2)
      const tradeSum = a.trades.reduce((s, t) => s + t.customerCost, 0);
      check(Math.abs(tradeSum - a.customerCost) < 2, `${type} ${scn.label} ${tier}: trade rollup ${fmt(tradeSum)} != total ${fmt(a.customerCost)}`);
      // margin within policy
      const m = effectiveMargin(a.internalCost);
      check(a.margin >= 0.22 - 1e-9 && a.margin <= 0.3 + 1e-9 && Math.abs(a.margin - m) < 1e-9, `${type} ${scn.label} ${tier}: margin ${a.margin} out of policy`);
      // no missing catalog codes
      check(a.warnings.length === 0, `${type} ${scn.label} ${tier}: warnings ${JSON.stringify(a.warnings)}`);
      check(a.customerCost > 0, `${type} ${scn.label} ${tier}: non-positive customer cost`);
      costs.push(`${tier} ${fmt(a.customerCost)}`);
    }
    // tier monotonicity
    for (let i = 1; i < results.length; i++) {
      check((results[i].a!.customerCost) > (results[i - 1].a!.customerCost), `${type} ${scn.label}: ${results[i].tier} not > ${results[i - 1].tier}`);
    }
    console.log(`  ${scn.label.padEnd(26)} ${costs.join('  ·  ')}`);
  }

  // size monotonicity at elevated: bigger project never cheaper
  const el = SCENARIOS[type].map((scn) => {
    const mode = type === 'new-construction' ? 'C' : 'A';
    const answers: PlannerAnswers = { mode, projectType: type, scopeLevel: 'reimagine', finishTier: 'elevated', ...(scn.sqft ? { targetSqFt: scn.sqft } : {}) };
    return computeAssembly(answers, scn.property)?.customerCost ?? 0;
  });
  for (let i = 1; i < el.length; i++) check(el[i] >= el[i - 1], `${type}: size monotonicity broken (${fmt(el[i])} < ${fmt(el[i - 1])})`);
}

console.log(`\n${failures === 0 ? 'OK: all scenario assertions passed.' : `${failures} assertion(s) FAILED.`}`);
process.exit(failures === 0 ? 0 : 1);
