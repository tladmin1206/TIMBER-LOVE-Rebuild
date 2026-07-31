import type { PlannerAnswers, PropertyFacts } from '../../types';
import type { Ruleset } from '../../ruleset';
import type { BasisResult, PricingBasis } from '../basis';
import { computeAssembly, type AssemblyResult } from './engine';
import type { MarginPolicy } from './margin';

/**
 * Phase 2 basis: build the customer-facing base from the line-item catalog
 * instead of an approved band, then hand it to the shared engine steps
 * (multipliers, adders, contingency, confidence band, guardrails) exactly as
 * the segment-band basis does.
 *
 * The assembly expresses the REIMAGINE-level scope; the engine's scopeMultiplier
 * scales it to refresh/rebuild, so the two bases stay reconcilable and scope is
 * never double-counted.
 *
 * The full per-trade breakdown is stashed on `lastResult` so the API route can
 * persist it to `Estimate.lineItems` (internal only) and render the admin view,
 * without widening the shared `BasisResult` contract.
 */
export class AssemblyBasis implements PricingBasis {
  readonly kind = 'assembly' as const;
  lastResult: AssemblyResult | null = null;

  constructor(private readonly marginPolicy?: MarginPolicy) {}

  resolve(_ruleset: Ruleset, answers: PlannerAnswers, property: PropertyFacts): BasisResult | null {
    const a = computeAssembly(answers, property, this.marginPolicy);
    this.lastResult = a;
    if (!a) return null;

    // Inherent spread of a catalog build-up before confidence widening. The
    // engine floors the published range at this band, then confidence may widen
    // it further; it can never narrow below this.
    const approvedBand = { low: a.customerCost * 0.92, high: a.customerCost * 1.12 };

    return {
      approvedBand,
      scaled: a.customerCost,
      sizeFactor: a.takeoff.areaSqFt,
      lookupKey: `${answers.projectType}.assembly.${answers.finishTier}`,
      assembly: {
        internalCost: a.internalCost,
        customerCost: a.customerCost,
        margin: a.margin,
        areaSqFt: a.takeoff.areaSqFt,
        warnings: a.warnings,
        trades: a.trades.map((t) => ({
          division: t.division,
          internalCost: t.internalCost,
          customerCost: t.customerCost,
          lines: t.lines.map((l) => ({
            code: l.code,
            description: l.description,
            uom: l.uom,
            costType: l.costType,
            unitCost: l.unitCost,
            qty: l.qty,
            internalCost: l.internalCost,
          })),
        })),
      },
    };
  }
}
