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
