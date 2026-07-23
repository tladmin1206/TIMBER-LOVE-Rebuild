import type { PlannerAnswers, PropertyFacts, Range } from '../types';
import type { Ruleset } from '../ruleset';
import { lookupBand } from '../ruleset';

/**
 * The pricing basis is the only part of the engine that differs between
 * Phase 1 and Phase 2.
 *
 * Spec § 1A.3: the band lookup occupies exactly the position the assembly
 * summation will occupy later. Steps 3 to 7 of the formula are shared code.
 * When calibration data exists, `AssemblyBasis` implements this same interface
 * and the engine is not forked.
 */
export type BasisResult = {
  /** The approved spread, before any multiplier. Acts as a floor on the range. */
  approvedBand: Range;
  /** The mid value after scaling to the property, before multipliers. */
  scaled: number;
  sizeFactor: number;
  lookupKey: string;
};

export interface PricingBasis {
  readonly kind: 'segment-band' | 'assembly';
  resolve(
    ruleset: Ruleset,
    answers: PlannerAnswers,
    property: PropertyFacts
  ): BasisResult | null;
}

/**
 * Phase 1 basis: resolve an approved band, then scale it to the property.
 *
 * Scaling only applies where the band is expressed per square foot, or where
 * home size deviates materially from the band's stated basis. A kitchen band
 * is a flat figure precisely because a kitchen in a 2,000 sq ft home and one
 * in a 6,000 sq ft home are not proportionally sized (§ 3.2).
 */
export class SegmentBandBasis implements PricingBasis {
  readonly kind = 'segment-band' as const;

  resolve(ruleset: Ruleset, answers: PlannerAnswers, property: PropertyFacts): BasisResult | null {
    const { projectType, scopeLevel, finishTier } = answers;
    if (!scopeLevel || !finishTier) return null;

    const band = lookupBand(ruleset, projectType, scopeLevel, finishTier);
    if (!band) return null;

    const lookupKey = `${projectType}.${scopeLevel}.${finishTier}`;

    if (band.basis === 'per-sqft') {
      // Whole-home bands are per square foot of renovated area. Without a
      // known area there is nothing to scale, and inventing one would be
      // exactly the kind of quiet fabrication rule 4 exists to prevent.
      const area = renovatedArea(answers, property);
      if (!area) return null;
      return {
        approvedBand: { low: band.low * area, high: band.high * area },
        scaled: ((band.low + band.high) / 2) * area,
        sizeFactor: area,
        lookupKey,
      };
    }

    // Flat band. Scale only if the home deviates materially from the basis.
    const sizeFactor = flatSizeFactor(band.basisSqFt, property.finishedSqFt);
    const mid = (band.low + band.high) / 2;
    return {
      approvedBand: { low: band.low * sizeFactor, high: band.high * sizeFactor },
      scaled: mid * sizeFactor,
      sizeFactor,
      lookupKey,
    };
  }
}

/**
 * Deviation from a flat band's basis size, clamped so an unusually large home
 * cannot run the band away from the approved spread. Returns 1 when the band
 * declares no basis size, which is the common case.
 */
function flatSizeFactor(basisSqFt: number | undefined, actualSqFt: number | undefined): number {
  if (!basisSqFt || !actualSqFt) return 1;
  const raw = actualSqFt / basisSqFt;
  // Materiality threshold: ignore deviations inside ±20%.
  if (raw > 0.8 && raw < 1.2) return 1;
  return clamp(raw, 0.75, 1.5);
}

/** Renovated area for per-square-foot bands. */
function renovatedArea(answers: PlannerAnswers, property: PropertyFacts): number | null {
  if (answers.targetSqFt) return answers.targetSqFt;
  if (property.finishedSqFt) return property.finishedSqFt;
  return null;
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}
