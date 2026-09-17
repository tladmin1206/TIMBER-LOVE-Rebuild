/**
 * Margin policy for the assembly engine.
 *
 * Spreadsheet unit costs EXCLUDE Timber and Love's margin (the "25% Design +
 * Build Fee" line in the catalog is the legacy markup and is dropped from the
 * cost build-up, see catalog `isFee`). We convert internal cost to a
 * customer-facing figure with a TRUE GROSS MARGIN, not a markup:
 *
 *     customer = cost / (1 - grossMargin)      // 30% GM -> cost / 0.70
 *
 * A flat divisor over-inflates large projects (a $600k build at /0.70 adds
 * $257k of margin, which prices T+L out of the Boise market). So the effective
 * margin is curved down as internal cost rises, never below `floorMargin`.
 */
export interface MarginPolicy {
  /** Target gross margin on small projects. */
  targetMargin: number;
  /** Lowest gross margin the curve may reach on very large projects. */
  floorMargin: number;
  /** Internal cost at/below which the full target margin applies. */
  fullMarginUpTo: number;
  /** Internal cost at/above which the floor margin applies. */
  floorMarginAt: number;
}

export const DEFAULT_MARGIN: MarginPolicy = {
  targetMargin: 0.3,
  floorMargin: 0.22,
  fullMarginUpTo: 150_000,
  floorMarginAt: 900_000,
};

/** The gross margin that applies at a given internal cost (linear taper). */
export function effectiveMargin(internalCost: number, p: MarginPolicy = DEFAULT_MARGIN): number {
  if (internalCost <= p.fullMarginUpTo) return p.targetMargin;
  if (internalCost >= p.floorMarginAt) return p.floorMargin;
  const t = (internalCost - p.fullMarginUpTo) / (p.floorMarginAt - p.fullMarginUpTo);
  return p.targetMargin + t * (p.floorMargin - p.targetMargin);
}

/** Convert an internal cost to a customer-facing amount via true gross margin. */
export function applyMargin(internalCost: number, p: MarginPolicy = DEFAULT_MARGIN): number {
  const m = effectiveMargin(internalCost, p);
  return internalCost / (1 - m);
}
