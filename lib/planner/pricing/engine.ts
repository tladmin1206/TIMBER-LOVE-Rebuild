import type {
  AppliedAdder,
  AppliedMultiplier,
  Estimate,
  ExecutionTrace,
  PlannerAnswers,
  PropertyFacts,
  Range,
} from '../types';
import type { Ruleset } from '../ruleset';
import { assertPublishable } from '../ruleset';
import { SegmentBandBasis, type PricingBasis } from './basis';
import { ageMultiplier, contingencyPct, directAdders, overlayMultipliers, scopeMultiplier, siteMultipliers } from './multipliers';
import { isTooUncertainToPublish, scoreConfidence } from './confidence';
import { buildTransparency } from './transparency';

/**
 * The pricing engine. Spec Part III § 1A.1.
 *
 * Deterministic by construction: no clock, no randomness, no LLM. `now` is
 * injected only so the ruleset staleness check can be evaluated, and it never
 * influences a figure.
 *
 * Steps 3 to 7 below are shared with the Phase 2 assembly engine. Swapping the
 * basis is the whole of the Phase 2 pricing change.
 */
export type EngineOptions = {
  ruleset: Ruleset;
  basis?: PricingBasis;
  now: Date;
  /** When false, the publish gate is bypassed for internal previews only. */
  production?: boolean;
};

export function estimate(
  answers: PlannerAnswers,
  property: PropertyFacts,
  opts: EngineOptions
): Estimate {
  const { ruleset, now, production = true } = opts;
  const basis = opts.basis ?? new SegmentBandBasis();
  const diagnostics: string[] = [];

  const confidence = scoreConfidence({ answers, property, phase1: basis.kind === 'segment-band' });

  // Gate first. An unsigned or uncalibrated table must never produce a figure.
  if (production) {
    const gate = assertPublishable(ruleset, now);
    diagnostics.push(...gate.warnings);
    if (!gate.publishable) {
      return blocked('no-approved-band', confidence, [...diagnostics, ...gate.reasons]);
    }
  }

  // STEP 1 + 2 — basis lookup and scaling to the property.
  const resolved = basis.resolve(ruleset, answers, property);
  if (!resolved) {
    return blocked('no-approved-band', confidence, [
      ...diagnostics,
      `No approved band for ${answers.projectType}.${answers.scopeLevel ?? '?'}.${answers.finishTier ?? '?'}. Spec § 9 rule 4: this project type is not offered rather than falling back to a default.`,
    ]);
  }

  // STEP 3 — condition and context multipliers, applied multiplicatively.
  const multipliers: AppliedMultiplier[] = [
    ageMultiplier(property.yearBuilt),
    scopeMultiplier(answers.scopeLevel),
    ...siteMultipliers(answers, property),
    ...overlayMultipliers(property),
  ].filter((m): m is AppliedMultiplier => m !== null);

  const multiplierProduct = multipliers.reduce((acc, m) => acc * m.value, 1) * ruleset.escalationFactor;
  const adjusted = resolved.scaled * multiplierProduct;

  // STEP 4 — direct adders, kept separate so each can be disclosed on its own.
  const adders: AppliedAdder[] = directAdders(answers, property);
  const adderMid = adders.reduce((acc, a) => acc + (a.amount.low + a.amount.high) / 2, 0);
  const withAdders = adjusted + adderMid;

  // Contingency. Disclosed in the inclusions block, in plain language.
  const contingency = contingencyPct(ruleset, answers, property);
  const expected = withAdders * (1 + contingency);

  // STEP 5 — band width. Confidence may widen the approved spread; it may
  // never narrow the range below what leadership actually approved (§ 1A.4).
  const approvedLow = resolved.approvedBand.low * multiplierProduct + adderMid;
  const approvedHigh = resolved.approvedBand.high * multiplierProduct + adderMid;
  const low = Math.min(approvedLow, expected * (1 - confidence.bandWidth));
  const high = Math.max(approvedHigh, expected * (1 + confidence.bandWidth));
  const mid = expected;

  // § 7.2 — too uncertain to be information.
  if (isTooUncertainToPublish(confidence.score)) {
    return blocked('confidence-too-low', confidence, [
      ...diagnostics,
      `Confidence ${confidence.score} is below the publishing floor of 40.`,
    ]);
  }

  // STEP 6 — guardrails.
  const belowMinimum = mid < ruleset.projectMinimum;

  const threshold = ruleset.overImprovementThreshold[answers.mode];
  const ratio = property.estimatedValue ? mid / property.estimatedValue : null;
  const overImprovement =
    threshold !== undefined && ratio !== null && ratio > threshold && !suppressOverImprovement(answers);

  const trace: ExecutionTrace = {
    basis: basis.kind,
    rulesetVersion: ruleset.version,
    bandLookupKey: resolved.lookupKey,
    approvedBand: resolved.approvedBand,
    sizeFactor: resolved.sizeFactor,
    multipliers,
    adders,
    contingencyPct: contingency,
    steps: [
      `band ${resolved.lookupKey} → ${fmt(resolved.approvedBand.low)}–${fmt(resolved.approvedBand.high)}`,
      `scaled ×${resolved.sizeFactor.toFixed(3)} → ${fmt(resolved.scaled)}`,
      `multipliers ×${multiplierProduct.toFixed(4)} → ${fmt(adjusted)}`,
      `adders +${fmt(adderMid)} → ${fmt(withAdders)}`,
      `contingency ×${(1 + contingency).toFixed(3)} → ${fmt(expected)}`,
      `band ±${(confidence.bandWidth * 100).toFixed(0)}% (floored at approved spread)`,
    ],
  };

  const transparency = buildTransparency({ answers, property, ruleset, trace });

  if (belowMinimum) {
    // § 7.5 — do not show a range. Honest, fast, and it saves the PM a call.
    return {
      outcome: 'below-minimum',
      range: null,
      confidence,
      durationWeeks: null,
      designWeeks: null,
      transparency,
      overImprovement: false,
      overImprovementRatio: ratio,
      belowMinimum: true,
      trace,
      diagnostics: [...diagnostics, `Midpoint ${fmt(mid)} is below the project minimum ${fmt(ruleset.projectMinimum)}.`],
    };
  }

  // STEP 7 — rounding. $187,432 reads as a machine guessing; $185,000 reads as
  // professional judgment.
  const rounded = {
    low: roundBand(low),
    mid: roundBand(mid),
    high: roundBand(high),
  };

  // § 5.5 — sanity bounds. A missing range is recoverable; a wrong one is not.
  const sanity = checkSanity(rounded, confidence.bandWidth, ruleset, answers);
  if (sanity.length) {
    return blocked('sanity-check-failed', confidence, [...diagnostics, ...sanity], trace, transparency);
  }

  const timeline = ruleset.timelines[answers.projectType];

  return {
    outcome: 'ok',
    range: rounded,
    confidence,
    durationWeeks: timeline?.construction ?? null,
    designWeeks: timeline?.design ?? null,
    transparency,
    overImprovement,
    overImprovementRatio: ratio,
    belowMinimum: false,
    trace,
    diagnostics,
  };
}

/**
 * § 5.4 — a forever-home client is allowed to over-improve. The notice is
 * softened rather than removed, so the suppression here only applies when the
 * homeowner has explicitly said this is their forever home and they are not
 * preparing to sell.
 */
function suppressOverImprovement(answers: PlannerAnswers): boolean {
  const goals = answers.goals ?? [];
  return goals.includes('forever_home') && !goals.includes('prepping_to_sell');
}

/** Nearest $5,000 below $250k; nearest $10,000 at or above. */
export function roundBand(v: number): number {
  const step = v >= 250_000 ? 10_000 : 5_000;
  return Math.round(v / step) * step;
}

function checkSanity(
  r: { low: number; mid: number; high: number },
  bandWidth: number,
  ruleset: Ruleset,
  answers: PlannerAnswers
): string[] {
  const errs: string[] = [];
  const floor = ruleset.absoluteFloor[answers.projectType];
  const ceiling = ruleset.absoluteCeiling[answers.projectType];

  if (floor !== undefined && r.mid <= floor) errs.push(`Midpoint ${fmt(r.mid)} is at or below the absolute floor ${fmt(floor)}.`);
  if (ceiling !== undefined && r.mid >= ceiling) errs.push(`Midpoint ${fmt(r.mid)} is at or above the absolute ceiling ${fmt(ceiling)}.`);
  if (!(r.high > r.mid && r.mid > r.low)) errs.push(`Range is not strictly ordered: ${fmt(r.low)} / ${fmt(r.mid)} / ${fmt(r.high)}.`);
  if (bandWidth < 0.1 || bandWidth > 0.4) errs.push(`Band width ${bandWidth} is outside the permitted 0.10 to 0.40.`);

  return errs;
}

function blocked(
  outcome: Estimate['outcome'],
  confidence: Estimate['confidence'],
  diagnostics: string[],
  trace: ExecutionTrace | null = null,
  transparency?: Estimate['transparency']
): Estimate {
  return {
    outcome,
    range: null,
    confidence,
    durationWeeks: null,
    designWeeks: null,
    transparency: transparency ?? { inclusions: [], assumptions: [], exclusions: [], allowances: [], variables: [] },
    overImprovement: false,
    overImprovementRatio: null,
    belowMinimum: false,
    trace,
    diagnostics,
  };
}

function fmt(v: number): string {
  return `$${Math.round(v).toLocaleString('en-US')}`;
}

export function formatRange(r: Range | { low: number; high: number }): string {
  return `${fmt(r.low)} – ${fmt(r.high)}`;
}
