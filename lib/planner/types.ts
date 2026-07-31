/**
 * Investment Planner: core types.
 *
 * Spec: TL-Investment-Planner-Master-Specification v2.0, Part III.
 *
 * Phase 1 resolves a price from an approved segment band and personalises
 * around it. Phase 2 replaces the band lookup with assembly summation and
 * touches nothing else, so every type here is shared by both bases.
 */

export type Mode = 'A' | 'B' | 'C' | 'D';

// Guest bath is its own type, not a cheaper primary bath. Appendix A prices
// it separately ($38k–$65k against $75k–$125k), and folding the two together
// would roughly double the figure a guest-bath homeowner is shown.
export type ProjectType =
  | 'kitchen'
  | 'bathroom'
  | 'bathroom-guest'
  | 'whole-home'
  | 'new-construction';

export type ScopeLevel = 'refresh' | 'reimagine' | 'rebuild';

export type FinishTier = 'signature' | 'elevated' | 'bespoke';

export type ServiceAreaBand = 'core' | 'extended' | 'outside';

export type Range = { low: number; high: number };

/** Where an assumption came from. Displayed verbatim to the homeowner (§6.2). */
export type AssumptionSource = 'property' | 'answer' | 'default';

export type Assumption = {
  text: string;
  source: AssumptionSource;
  /** Why this default applies, shown after the source label. */
  sourceDetail?: string;
  /** Cost exposure if the assumption turns out to be wrong. */
  impactIfWrong?: Range;
  /** True when property data suggests this default is unusually risky. */
  flaggedForVerification?: boolean;
};

export type Exclusion = {
  text: string;
  typicalMagnitude?: Range;
};

export type Allowance = {
  category: string;
  amount: Range;
  /** "What this typically buys": concrete, not aspirational. */
  buys: string;
};

export type Variable = {
  text: string;
  direction: 'increase' | 'decrease' | 'both';
  magnitude?: Range;
};

export type Inclusion = {
  trade: string;
  label: string;
};

/** The five transparency blocks, generated from the execution trace (§6). */
export type TransparencyBlocks = {
  inclusions: Inclusion[];
  assumptions: Assumption[];
  exclusions: Exclusion[];
  allowances: Allowance[];
  variables: Variable[];
};

export type ConfidenceLabel = 'Strong' | 'Good' | 'Directional' | 'Early';

export type Confidence = {
  score: number;
  label: ConfidenceLabel;
  bandWidth: number;
  /** Inputs answered vs. inputs that carry cost weight, for honest display. */
  inputsUsed: number;
  inputsTotal: number;
  /** Plain-language reasons the score is what it is (§7.3). */
  reasons: string[];
  /** Specific things that would tighten the range: becomes the consult agenda. */
  wouldTighten: string[];
};

/** A single multiplier application, retained so it can be explained (§4). */
export type AppliedMultiplier = {
  id: string;
  value: number;
  /** One sentence, homeowner-facing. Every multiplier must justify itself. */
  rationale: string;
};

export type AppliedAdder = {
  id: string;
  amount: Range;
  rationale: string;
};

/** One catalog line inside an assembly trade (internal only, never shown to a lead). */
export type AssemblyLineSummary = {
  code: string;
  description: string;
  uom: string;
  costType: string;
  unitCost: number;
  qty: number;
  internalCost: number;
};

/** A parent trade with its child line items rolled up (the admin's default view). */
export type AssemblyTradeSummary = {
  division: string;
  internalCost: number;
  customerCost: number;
  lines: AssemblyLineSummary[];
};

/** Full line-item build-up for an assembly-basis estimate. Internal only. */
export type AssemblyBreakdown = {
  internalCost: number;
  customerCost: number;
  margin: number;
  areaSqFt: number;
  trades: AssemblyTradeSummary[];
  warnings: string[];
};

/**
 * Everything the engine did, in order. The transparency blocks and the
 * narrative payload are both derived from this, so they cannot drift out of
 * sync with the number.
 */
export type ExecutionTrace = {
  basis: 'segment-band' | 'assembly';
  rulesetVersion: string;
  bandLookupKey: string;
  approvedBand: Range;
  sizeFactor: number;
  multipliers: AppliedMultiplier[];
  adders: AppliedAdder[];
  contingencyPct: number;
  steps: string[];
  /** Present only for the assembly basis: the internal per-trade line-item build-up. */
  assembly?: AssemblyBreakdown;
};

export type PlannerAnswers = {
  mode: Mode;
  projectType: ProjectType;
  scopeLevel?: ScopeLevel;
  finishTier?: FinishTier;
  /** Goals from the "why now" screen. */
  goals?: string[];
  /** Lifestyle toggles. */
  lifestyle?: string[];
  timeline?: string;
  /** Questions the homeowner answered "not sure" to, by question id. */
  notSure?: string[];

  // Mode C
  targetSqFt?: number;
  garageBays?: number;
  basement?: 'none' | 'unfinished' | 'finished';
  basementSqFt?: number;
  landStatus?: 'owned' | 'under-contract' | 'searching';
  slope?: 'none' | 'moderate' | 'significant' | 'unknown';
  utilitiesAtStreet?: boolean | 'unknown';
  existingStructureToRemove?: boolean;
  septicRequired?: boolean;
  wellRequired?: boolean;
};

export type PropertyFacts = {
  yearBuilt?: number;
  finishedSqFt?: number;
  bedrooms?: number;
  bathrooms?: number;
  lotSizeSqFt?: number;
  stories?: number;
  hasBasement?: boolean;
  estimatedValue?: number;
  zoning?: string;
  parcelId?: string;
  lastSaleDate?: string;
  lastSalePrice?: number;
  jurisdiction?: string;
  historicDistrict?: string;
  historicReviewRequired?: boolean;
  serviceAreaBand: ServiceAreaBand;
  /** NONE means enrichment failed and the homeowner typed what we have. */
  enrichmentSource: 'ATTOM' | 'ESTATED' | 'ASSESSOR' | 'MANUAL' | 'NONE';
  occupiedDuringConstruction?: boolean;
  difficultAccess?: boolean;
};

export type EstimateOutcome =
  | 'ok'
  | 'below-minimum'
  | 'confidence-too-low'
  | 'no-approved-band'
  | 'sanity-check-failed';

export type Estimate = {
  outcome: EstimateOutcome;
  /** Null for every outcome except `ok`. A missing range is recoverable. */
  range: { low: number; mid: number; high: number } | null;
  confidence: Confidence;
  durationWeeks: Range | null;
  designWeeks: Range | null;
  transparency: TransparencyBlocks;
  overImprovement: boolean;
  overImprovementRatio: number | null;
  belowMinimum: boolean;
  trace: ExecutionTrace | null;
  /** Operator-facing reason when the outcome is not `ok`. */
  diagnostics: string[];
};
