import type { AppliedAdder, AppliedMultiplier, PlannerAnswers, PropertyFacts } from '../types';
import type { Ruleset } from '../ruleset';

/**
 * Multipliers and adders. Spec Part III § 4 and § 5.
 *
 * Every multiplier carries the one-sentence rationale it will be shown with,
 * because it appears in the assumptions block. A multiplier that cannot be
 * justified to a homeowner in one sentence does not belong here.
 */

/** § 4.1: home age drives systems risk more than any other property fact. */
export function ageMultiplier(yearBuilt?: number): AppliedMultiplier | null {
  if (!yearBuilt) return null;
  if (yearBuilt >= 2005)
    return { id: 'age.2005plus', value: 1.0, rationale: 'Current systems and framing standards.' };
  if (yearBuilt >= 1985)
    return { id: 'age.1985-2004', value: 1.04, rationale: 'Minor updates are typical once walls are opened.' };
  if (yearBuilt >= 1965)
    return { id: 'age.1965-1984', value: 1.1, rationale: 'Wiring, insulation, and plumbing often need updating.' };
  if (yearBuilt >= 1945)
    return { id: 'age.1945-1964', value: 1.18, rationale: 'Original systems, plaster, and possible galvanized supply.' };
  return {
    id: 'age.pre1945',
    value: 1.26,
    rationale: 'Original construction, potential abatement, and non-standard framing.',
  };
}

/** § 4.2, the largest single driver in Mode A. */
export function scopeMultiplier(scope?: string): AppliedMultiplier | null {
  switch (scope) {
    case 'refresh':
      return { id: 'scope.refresh', value: 0.62, rationale: 'Finishes only, with no layout, plumbing, or electrical changes.' };
    case 'reimagine':
      return { id: 'scope.reimagine', value: 1.0, rationale: 'A new layout inside the existing footprint.' };
    case 'rebuild':
      return { id: 'scope.rebuild', value: 1.42, rationale: 'Structural changes, with walls removed or moved.' };
    default:
      return null;
  }
}

/** § 4.4: site and access. */
export function siteMultipliers(answers: PlannerAnswers, property: PropertyFacts): AppliedMultiplier[] {
  const out: AppliedMultiplier[] = [];

  if (property.occupiedDuringConstruction && (answers.mode === 'A' || answers.mode === 'D')) {
    out.push({
      id: 'site.occupied',
      value: 1.06,
      rationale: 'Living in the home during construction requires dust control, phasing, and daily cleanup.',
    });
  }
  if (property.difficultAccess) {
    out.push({
      id: 'site.access',
      value: 1.08,
      rationale: 'A narrow lot, steep drive, or alley-only access slows material handling.',
    });
  }
  if ((property.stories ?? 1) > 1 && answers.mode === 'A') {
    out.push({ id: 'site.upperFloor', value: 1.04, rationale: 'Work above the ground floor adds material handling.' });
  }
  if (answers.mode === 'C' && answers.slope === 'significant') {
    out.push({ id: 'site.slope', value: 1.2, rationale: 'A significantly sloped lot increases excavation and foundation work.' });
  } else if (answers.mode === 'C' && answers.slope === 'moderate') {
    out.push({ id: 'site.slope.moderate', value: 1.08, rationale: 'Moderate slope adds excavation and foundation work.' });
  }

  return out;
}

/** § 4.5: jurisdiction and overlay. */
export function overlayMultipliers(property: PropertyFacts): AppliedMultiplier[] {
  const out: AppliedMultiplier[] = [];

  if (property.historicReviewRequired) {
    out.push({
      id: 'overlay.historic',
      value: 1.06,
      rationale: 'Exterior changes in a historic district go through design review, which shapes materials and timing.',
    });
  }
  if (property.serviceAreaBand === 'extended') {
    out.push({
      id: 'overlay.extendedArea',
      value: 1.03,
      rationale: 'Your property sits beyond our core service area, which adds travel and logistics.',
    });
  }

  return out;
}

/** § 5: flat adders, disclosed individually rather than folded into the rate. */
export function directAdders(answers: PlannerAnswers, property: PropertyFacts): AppliedAdder[] {
  const out: AppliedAdder[] = [];

  if (property.yearBuilt && property.yearBuilt < 1978) {
    out.push({
      id: 'adder.leadSafe',
      amount: { low: 1_500, high: 4_500 },
      rationale: 'Homes built before 1978 require lead-safe work practices.',
    });
  }
  if (property.yearBuilt && property.yearBuilt < 1985) {
    out.push({
      id: 'adder.panelAllowance',
      amount: { low: 4_000, high: 9_000 },
      rationale: 'An electrical panel of this era often needs capacity added for the new load.',
    });
  }
  if (answers.mode === 'C' && answers.septicRequired) {
    out.push({ id: 'adder.septic', amount: { low: 18_000, high: 45_000 }, rationale: 'The site requires a septic system.' });
  }
  if (answers.mode === 'C' && answers.wellRequired) {
    out.push({ id: 'adder.well', amount: { low: 15_000, high: 40_000 }, rationale: 'The site requires a well.' });
  }
  if (answers.mode === 'C' && answers.existingStructureToRemove) {
    out.push({
      id: 'adder.demo',
      amount: { low: 12_000, high: 35_000 },
      rationale: 'An existing structure on the lot has to be removed before building.',
    });
  }

  return out;
}

/** § 5.2: contingency varies by mode and scope, and is disclosed, not buried. */
export function contingencyPct(ruleset: Ruleset, answers: PlannerAnswers, property: PropertyFacts): number {
  const exact = ruleset.contingency.find((c) => c.mode === answers.mode && c.scope === answers.scopeLevel);
  const modeOnly = ruleset.contingency.find((c) => c.mode === answers.mode && !c.scope);
  let pct = exact?.pct ?? modeOnly?.pct ?? 0.08;

  // Pre-1965 homes carry an additional allowance regardless of scope.
  if (property.yearBuilt && property.yearBuilt < 1965) pct += 0.03;

  return pct;
}
