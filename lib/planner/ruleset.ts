import type { FinishTier, ProjectType, Range, ScopeLevel } from './types';

/**
 * Versioned pricing ruleset.
 *
 * Spec Part III § 9. Four rules the engine enforces, in order of how badly
 * each one bites if ignored:
 *
 *  1. A band table must carry a sign-off date and a named approver. Without
 *     both, production mode is refused.
 *  2. A table older than six months warns the internal team. It does not fail
 *     for the homeowner.
 *  3. Every estimate records the version that produced it, so a report issued
 *     in March is reproducible in September.
 *  4. A project type with no approved band is not offered. It never falls back
 *     to a default.
 *
 * Rule 4 is the one that matters most. The failure mode being designed against
 * is a project type quietly shipping on developer placeholder data because
 * nobody noticed the band was missing.
 */

export type Band = Range & {
  /** Per-square-foot bands scale with the renovated area; flat bands do not. */
  basis: 'flat' | 'per-sqft';
  /** Home size the flat band assumes, used to scale materially different homes. */
  basisSqFt?: number;
};

export type BandTable = {
  [type in ProjectType]?: {
    [scope in ScopeLevel]?: Partial<Record<FinishTier, Band>>;
  };
};

export type SignOff = {
  approver: string;
  role: string;
  /** ISO date. Absence of this field is what blocks production. */
  date: string;
};

export type Ruleset = {
  version: string;
  effectiveDate: string;
  /**
   * Null until Appendix A is corrected and signed. The engine refuses to
   * produce a homeowner-facing figure while this is null: see `assertPublishable`.
   */
  signOff: SignOff | null;
  /**
   * True while any value in the table is a placeholder authored without access
   * to Timber and Love job costing. Independent of sign-off: a table can be
   * signed and still contain a value someone forgot to correct.
   */
  containsUncalibratedValues: boolean;
  bands: BandTable;
  projectMinimum: number;
  overImprovementThreshold: Partial<Record<'A' | 'B' | 'C' | 'D', number>>;
  absoluteFloor: Partial<Record<ProjectType, number>>;
  absoluteCeiling: Partial<Record<ProjectType, number>>;
  contingency: { mode: string; scope?: ScopeLevel; pct: number }[];
  escalationFactor: number;
  timelines: Record<ProjectType, { design: Range; construction: Range }>;
  newConstruction: {
    conditionedPerSqFt: Partial<Record<FinishTier, Range>>;
    basementFinished: Range;
    basementUnfinished: Range;
    garagePerBay: Range;
    coveredOutdoorPerSqFt: Range;
    /** What the per-sq-ft figure includes. Drives Mode C exclusions (§5.3). */
    boundary: Record<string, boolean>;
    /** What the excluded categories typically add, as a fraction. */
    excludedCategoriesAddPct: Range | null;
  };
};

/**
 * DRAFT ruleset: Appendix A, transcribed verbatim.
 *
 * Every figure below is a placeholder written by an outside party with no
 * access to Timber and Love job costing. The specification says they are
 * "deliberately wide and almost certainly wrong", and they exist so someone
 * with real estimating knowledge can correct a filled-in table in twenty
 * minutes rather than build one from scratch in a day.
 *
 * `signOff: null` and `containsUncalibratedValues: true` together guarantee
 * these numbers cannot reach a homeowner. Do not set either field to make a
 * test pass: correct Appendix A and transcribe the signed values instead.
 */
export const DRAFT_RULESET: Ruleset = {
  version: '2026.07.0-draft',
  effectiveDate: '2026-07-01',
  signOff: null,
  containsUncalibratedValues: true,

  bands: {
    kitchen: {
      refresh: {
        signature: { low: 65_000, high: 110_000, basis: 'flat' },
        elevated: { low: 85_000, high: 145_000, basis: 'flat' },
      },
      reimagine: {
        signature: { low: 110_000, high: 175_000, basis: 'flat' },
        elevated: { low: 140_000, high: 230_000, basis: 'flat' },
        bespoke: { low: 210_000, high: 350_000, basis: 'flat' },
      },
      rebuild: {
        elevated: { low: 185_000, high: 310_000, basis: 'flat' },
        bespoke: { low: 280_000, high: 475_000, basis: 'flat' },
      },
    },
    bathroom: {
      refresh: {
        elevated: { low: 45_000, high: 75_000, basis: 'flat' },
      },
      reimagine: {
        elevated: { low: 75_000, high: 125_000, basis: 'flat' },
        bespoke: { low: 110_000, high: 195_000, basis: 'flat' },
      },
      rebuild: {
        bespoke: { low: 150_000, high: 265_000, basis: 'flat' },
      },
    },
    'bathroom-guest': {
      reimagine: {
        elevated: { low: 38_000, high: 65_000, basis: 'flat' },
      },
    },
    'whole-home': {
      refresh: {
        signature: { low: 95, high: 150, basis: 'per-sqft' },
      },
      reimagine: {
        elevated: { low: 185, high: 300, basis: 'per-sqft' },
        bespoke: { low: 290, high: 475, basis: 'per-sqft' },
      },
      rebuild: {
        bespoke: { low: 375, high: 600, basis: 'per-sqft' },
      },
    },
  },

  // Business decision: Timber and Love does not turn work away on size alone,
  // so there is no project floor. Zero disables the guardrail rather than
  // removing it, the code path is retained so a minimum can be reinstated by
  // changing this one number.
  //
  // This also resolved a contradiction in the draft sheet, which priced a guest
  // bath at $38k-$65k and a bathroom refresh at $45k-$75k while setting a $75k
  // floor, so both options declined every homeowner who chose them.
  projectMinimum: 0,

  // Mode A 0.25, Mode B 0.35, disabled for C and D (§5.4).
  overImprovementThreshold: { A: 0.25, B: 0.35 },

  absoluteFloor: {
    kitchen: 25_000,
    bathroom: 15_000,
    'bathroom-guest': 10_000,
    'whole-home': 50_000,
    'new-construction': 200_000,
  },
  absoluteCeiling: {
    kitchen: 900_000,
    bathroom: 500_000,
    'bathroom-guest': 250_000,
    'whole-home': 4_000_000,
    'new-construction': 8_000_000,
  },

  contingency: [
    { mode: 'A', scope: 'refresh', pct: 0.05 },
    { mode: 'A', scope: 'reimagine', pct: 0.08 },
    { mode: 'A', scope: 'rebuild', pct: 0.12 },
    { mode: 'B', pct: 0.1 },
    { mode: 'C', pct: 0.07 },
    { mode: 'D', pct: 0.1 },
  ],

  escalationFactor: 1.0,

  timelines: {
    kitchen: { design: { low: 6, high: 10 }, construction: { low: 10, high: 16 } },
    bathroom: { design: { low: 4, high: 8 }, construction: { low: 6, high: 10 } },
    'bathroom-guest': { design: { low: 4, high: 8 }, construction: { low: 6, high: 10 } },
    'whole-home': { design: { low: 10, high: 20 }, construction: { low: 20, high: 40 } },
    'new-construction': { design: { low: 16, high: 28 }, construction: { low: 40, high: 64 } },
  },

  newConstruction: {
    conditionedPerSqFt: {
      signature: { low: 275, high: 350 },
      elevated: { low: 340, high: 450 },
      bespoke: { low: 440, high: 625 },
    },
    basementFinished: { low: 150, high: 225 },
    basementUnfinished: { low: 70, high: 110 },
    garagePerBay: { low: 32_000, high: 55_000 },
    coveredOutdoorPerSqFt: { low: 110, high: 190 },
    // Every boundary answer is unanswered until Appendix A § 4 is completed.
    // Nothing may be presented as included until these are set deliberately.
    boundary: {},
    excludedCategoriesAddPct: null,
  },
};

/**
 * CALIBRATED ruleset, grounded in five real Timber and Love estimates
 * (see memory: estimator-reference-pricing). NOT yet wired into the app: the
 * estimate route still imports DRAFT_RULESET so nothing reaches a homeowner
 * until these numbers are reviewed and the route is switched over deliberately.
 *
 * Calibration method, validated by scripts/verify-planner-calibration.ts:
 *  - Bands vary by FINISH TIER only. The engine multiplies by scope
 *    (refresh 0.62 / reimagine 1.0 / rebuild 1.42), so encoding scope in the
 *    band values too would double-count it. Each offered scope therefore points
 *    at the same tier band, and the scope multiplier does the differentiation.
 *  - Whole-home and new-construction bands are per square foot and are
 *    validated to bracket the real project totals (750 N Locust $290k/2,500sf;
 *    Workland $1.44M/~3,200sf; Markowich ADU $531k).
 *  - Kitchen and bathroom bands are DERIVED (not validated against a standalone
 *    total, which the references don't contain) by allocating each room its
 *    share of demo, MEP, flooring, finishes and overhead from the whole-home
 *    line items. They carry wider spreads to reflect that lower confidence.
 *  - Every band already contains loaded labor, project management, general
 *    conditions, permits, insurance and margin, because the source estimates
 *    do. The planner shows a total range only, so none of that is itemized.
 *
 * TODO before or shortly after go-live:
 *  - new-construction `signature` is unvalidated (no basic-new-home reference).
 *  - A detached shop / pole barn is an accessory building (~$158/sqft
 *    unconditioned), not a conditioned residence; it needs its own project
 *    type before it can be offered.
 */
// Whole-home band RAISED 2026-07-31 by direction: the planner's whole-home now
// represents a FULL renovation, not the lighter scope the original five estimates
// captured (e.g. 750 N Locust $290k/2,500sf = $116/sqft sits at the signature
// low edge here). Bracketed to the line-item assembly build-up
// (verify-assembly-reconcile: signature ~$162, elevated ~$195, bespoke ~$235/sqft).
// NEEDS LEADERSHIP RE-SIGN-OFF before it drives homeowner-facing figures.
const WHOLE_HOME = {
  signature: { low: 115, high: 180, basis: 'per-sqft' as const },
  elevated: { low: 150, high: 225, basis: 'per-sqft' as const },
  bespoke: { low: 195, high: 290, basis: 'per-sqft' as const },
};
const KITCHEN = {
  signature: { low: 48_000, high: 74_000, basis: 'flat' as const },
  elevated: { low: 70_000, high: 102_000, basis: 'flat' as const },
  bespoke: { low: 125_000, high: 190_000, basis: 'flat' as const },
};
const BATH = {
  signature: { low: 19_000, high: 29_000, basis: 'flat' as const },
  elevated: { low: 27_000, high: 40_000, basis: 'flat' as const },
  bespoke: { low: 44_000, high: 64_000, basis: 'flat' as const },
};
const GUEST_BATH = {
  signature: { low: 13_000, high: 21_000, basis: 'flat' as const },
  elevated: { low: 18_000, high: 27_000, basis: 'flat' as const },
};

export const CALIBRATED_RULESET: Ruleset = {
  ...DRAFT_RULESET,
  version: '2026.07.2-calibrated',
  effectiveDate: '2026-07-28',
  // Signed so the engine will price it in tests and once the route is switched.
  // Replace approver/role with the real pricing owner at go-live if different.
  signOff: { approver: 'Timber and Love', role: 'Owner, Pricing', date: '2026-07-28' },
  containsUncalibratedValues: false,

  bands: {
    kitchen: {
      refresh: { signature: KITCHEN.signature, elevated: KITCHEN.elevated },
      reimagine: { signature: KITCHEN.signature, elevated: KITCHEN.elevated, bespoke: KITCHEN.bespoke },
      rebuild: { elevated: KITCHEN.elevated, bespoke: KITCHEN.bespoke },
    },
    bathroom: {
      refresh: { signature: BATH.signature, elevated: BATH.elevated },
      reimagine: { signature: BATH.signature, elevated: BATH.elevated, bespoke: BATH.bespoke },
      rebuild: { bespoke: BATH.bespoke },
    },
    'bathroom-guest': {
      refresh: { signature: GUEST_BATH.signature, elevated: GUEST_BATH.elevated },
      reimagine: { signature: GUEST_BATH.signature, elevated: GUEST_BATH.elevated },
    },
    'whole-home': {
      refresh: { signature: WHOLE_HOME.signature, elevated: WHOLE_HOME.elevated },
      reimagine: { signature: WHOLE_HOME.signature, elevated: WHOLE_HOME.elevated, bespoke: WHOLE_HOME.bespoke },
      rebuild: { elevated: WHOLE_HOME.elevated, bespoke: WHOLE_HOME.bespoke },
    },
  },

  newConstruction: {
    ...DRAFT_RULESET.newConstruction,
    conditionedPerSqFt: {
      // No basic-new-home reference exists, so signature is modeled from the
      // tier structure: a new build is ~55-60% finish-independent shell and
      // systems and ~40-45% tier-dependent finishes. Holding the shell and
      // stepping the finish portion down one tier from elevated lands an
      // entry-level custom home (TL quality, not tract) near $280-350/sf,
      // which sits below the ADU (small homes cost more per sq ft).
      signature: { low: 245, high: 325 },
      elevated: { low: 300, high: 400 }, // Markowich ADU ~$531k brackets here.
      bespoke: { low: 340, high: 455 }, // Workland ~$1.44M/3,200sf brackets here.
    },
  },
};

export type PublishGate =
  | { publishable: true; warnings: string[] }
  | { publishable: false; reasons: string[]; warnings: string[] };

const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 182;

/**
 * Decides whether a ruleset may produce homeowner-facing figures.
 *
 * `now` is injected rather than read from the clock so the decision is
 * deterministic and testable.
 */
export function assertPublishable(ruleset: Ruleset, now: Date): PublishGate {
  const reasons: string[] = [];
  const warnings: string[] = [];

  if (!ruleset.signOff) {
    reasons.push(
      'Band table carries no sign-off. Appendix A must be corrected and signed by the owner of pricing at Timber and Love before any figure is published.'
    );
  } else {
    if (!ruleset.signOff.approver?.trim()) reasons.push('Sign-off is missing a named approver.');
    if (!ruleset.signOff.date?.trim()) reasons.push('Sign-off is missing a date.');

    if (ruleset.signOff.date) {
      const signed = new Date(ruleset.signOff.date);
      if (Number.isNaN(signed.getTime())) {
        reasons.push(`Sign-off date "${ruleset.signOff.date}" is not a valid date.`);
      } else if (now.getTime() - signed.getTime() > SIX_MONTHS_MS) {
        // Rule 2: internal warning, never a customer-facing failure.
        warnings.push(
          `Band table was signed on ${ruleset.signOff.date}, more than six months ago. Spec requires review at least every six months.`
        );
      }
    }
  }

  if (ruleset.containsUncalibratedValues) {
    reasons.push(
      'Ruleset is flagged as containing uncalibrated placeholder values. The engine refuses production mode with any uncalibrated value in the execution path.'
    );
  }

  return reasons.length ? { publishable: false, reasons, warnings } : { publishable: true, warnings };
}

/**
 * Rule 4: a project type with no approved band is not offered at all.
 * Returns the band, or null: never a default.
 */
export function lookupBand(
  ruleset: Ruleset,
  projectType: ProjectType,
  scopeLevel: ScopeLevel,
  finishTier: FinishTier
): Band | null {
  return ruleset.bands[projectType]?.[scopeLevel]?.[finishTier] ?? null;
}

/** Project types that can currently be offered in the planner (rule 4). */
export function offerableProjectTypes(ruleset: Ruleset): ProjectType[] {
  const all: ProjectType[] = ['kitchen', 'bathroom', 'bathroom-guest', 'whole-home', 'new-construction'];
  return all.filter((t) => {
    if (t === 'new-construction') {
      return Object.keys(ruleset.newConstruction.conditionedPerSqFt).length > 0;
    }
    const scopes = ruleset.bands[t];
    return !!scopes && Object.values(scopes).some((tiers) => tiers && Object.keys(tiers).length > 0);
  });
}
