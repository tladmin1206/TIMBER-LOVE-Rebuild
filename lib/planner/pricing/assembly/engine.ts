import type { PlannerAnswers, PropertyFacts } from '../../types';
import { CATALOG_BY_CODE } from './catalog';
import { deriveTakeoff, type Takeoff } from './dimensions';
import { TEMPLATES, TIER_MATERIAL_FACTOR } from './templates';
import { calibrationFactor } from './calibration';
import { DEFAULT_MARGIN, effectiveMargin, type MarginPolicy } from './margin';

/** One catalog code as billed in an assembly (internal only). */
export interface AssemblyLine {
  entryKey: string;
  code: string;
  division: string;
  description: string;
  uom: string;
  costType: string;
  unitCost: number;
  qty: number;
  internalCost: number;
}

/** A parent trade with its children rolled up (the admin's default view). */
export interface TradeRollup {
  division: string;
  internalCost: number;
  customerCost: number;
  lines: AssemblyLine[];
}

export interface AssemblyResult {
  takeoff: Takeoff;
  internalCost: number;
  /** Effective gross margin applied (curved by size). */
  margin: number;
  /** Customer-facing base (before the engine's condition multipliers). */
  customerCost: number;
  trades: TradeRollup[];
  lines: AssemblyLine[];
  warnings: string[];
}

export function computeAssembly(
  answers: PlannerAnswers,
  property: PropertyFacts,
  marginPolicy: MarginPolicy = DEFAULT_MARGIN
): AssemblyResult | null {
  const template = TEMPLATES[answers.projectType];
  const tier = answers.finishTier;
  if (!template || !tier) return null;

  const takeoff = deriveTakeoff(answers, property);
  const cf = calibrationFactor(answers.projectType); // historical adjustment to real actuals
  const lines: AssemblyLine[] = [];
  const warnings: string[] = [];

  for (const entry of template) {
    if (entry.tiers && !entry.tiers.includes(tier)) continue;
    const qty = Math.max(0, Math.round(entry.qty(takeoff) * 100) / 100);
    if (qty <= 0) continue;
    for (const code of entry.codes) {
      const item = CATALOG_BY_CODE[code];
      if (!item) {
        warnings.push(`Missing catalog code ${code} for scope "${entry.key}".`);
        continue;
      }
      if (item.isFee) continue; // 25% fee is the replaced margin
      const tierFactor = item.costType === 'Material' ? TIER_MATERIAL_FACTOR[tier] : 1;
      const unitCost = item.cost * tierFactor * cf;
      const internalCost = unitCost * qty;
      if (internalCost <= 0) continue;
      lines.push({
        entryKey: entry.key,
        code,
        division: item.division,
        description: item.description,
        uom: item.uom,
        costType: item.costType,
        unitCost,
        qty,
        internalCost,
      });
    }
  }

  const internalCost = lines.reduce((s, l) => s + l.internalCost, 0);
  if (internalCost <= 0) return null;

  // Effective margin is a function of TOTAL internal cost, then distributed so
  // each trade's customer amount sums exactly to the project customer amount.
  const margin = effectiveMargin(internalCost, marginPolicy);
  const toCustomer = (cost: number) => cost / (1 - margin);
  const customerCost = toCustomer(internalCost);

  const byDivision = new Map<string, AssemblyLine[]>();
  for (const l of lines) {
    const arr = byDivision.get(l.division) ?? [];
    arr.push(l);
    byDivision.set(l.division, arr);
  }
  const trades: TradeRollup[] = [...byDivision.entries()]
    .map(([division, ls]) => {
      const tc = ls.reduce((s, l) => s + l.internalCost, 0);
      return { division, internalCost: tc, customerCost: toCustomer(tc), lines: ls };
    })
    .sort((a, b) => b.customerCost - a.customerCost);

  return { takeoff, internalCost, margin, customerCost, trades, lines, warnings };
}
