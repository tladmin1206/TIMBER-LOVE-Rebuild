import type {
  Assumption,
  ExecutionTrace,
  Exclusion,
  PlannerAnswers,
  PropertyFacts,
  TransparencyBlocks,
  Variable,
} from '../types';
import type { Ruleset } from '../ruleset';

/**
 * Transparency block generation. Spec Part III § 6.
 *
 * The five blocks are generated from the same execution trace that produced
 * the number. They are never hand-written per project and never written by the
 * LLM. Three consequences follow, and they are the reason it works this way:
 *
 *  - The blocks are always complete and always consistent with the figure.
 *  - Changing a pricing rule automatically updates the disclosure.
 *  - Nobody has to remember to update the exclusions list.
 */

type Input = {
  answers: PlannerAnswers;
  property: PropertyFacts;
  ruleset: Ruleset;
  trace: ExecutionTrace;
};

export function buildTransparency({ answers, property, ruleset, trace }: Input): TransparencyBlocks {
  return {
    inclusions: buildInclusions(answers, trace),
    assumptions: dedupe(buildAssumptions(answers, property, trace)),
    exclusions: buildExclusions(answers, property, ruleset),
    allowances: [],
    variables: buildVariables(answers, property, trace),
  };
}

function buildInclusions(answers: PlannerAnswers, trace: ExecutionTrace) {
  const out = [{ trade: 'Planning', label: 'Design development and construction documents' }];

  if (answers.mode === 'C') {
    out.push({ trade: 'Construction', label: 'Conditioned living space, built to the selected finish level' });
  } else {
    out.push({ trade: 'Construction', label: 'Demolition, framing, and finish work within the affected area' });
  }

  // Contingency is disclosed as an inclusion, in plain language, rather than
  // buried in a percentage nobody reads.
  out.push({
    trade: 'Contingency',
    label: `A planning contingency of ${(trace.contingencyPct * 100).toFixed(0)}%, because opening walls reveals things no one can see beforehand. If we do not use it, you do not pay it.`,
  });

  return out;
}

function buildAssumptions(answers: PlannerAnswers, property: PropertyFacts, trace: ExecutionTrace): Assumption[] {
  const out: Assumption[] = [];

  if (property.finishedSqFt) {
    out.push({
      text: `Your home is approximately ${property.finishedSqFt.toLocaleString('en-US')} square feet.`,
      source: 'property',
      sourceDetail: sourceLabel(property.enrichmentSource),
    });
  }
  if (property.yearBuilt) {
    out.push({
      text: `Your home was built in ${property.yearBuilt}.`,
      source: 'property',
      sourceDetail: sourceLabel(property.enrichmentSource),
    });
  }

  if (answers.scopeLevel === 'reimagine') {
    out.push({ text: 'You are keeping the existing exterior footprint.', source: 'answer' });
  }

  // The pattern that does the trust work: a default, its origin, and what it
  // costs if it turns out to be wrong — flagged when the property suggests risk.
  const panelAtRisk = !!property.yearBuilt && property.yearBuilt < 1985;
  out.push({
    text: 'Your electrical panel has capacity for the added load.',
    source: 'default',
    sourceDetail: panelAtRisk
      ? `Our default for homes built after 1985. Yours was built in ${property.yearBuilt}, so we have flagged this for verification.`
      : 'Our standard assumption for homes of this era.',
    impactIfWrong: { low: 4_000, high: 9_000 },
    flaggedForVerification: panelAtRisk,
  });

  if (answers.mode === 'A' || answers.mode === 'D') {
    out.push({
      text: 'The subfloor is sound and level.',
      source: 'default',
      sourceDetail: 'Standard for this construction era.',
      impactIfWrong: { low: 2_000, high: 6_000 },
      flaggedForVerification: !!property.yearBuilt && property.yearBuilt < 1965,
    });
  }

  // Every multiplier that moved the number explains itself here.
  for (const m of trace.multipliers) {
    if (m.value === 1) continue;
    out.push({ text: m.rationale, source: 'default', sourceDetail: `Applied because of ${describeMultiplier(m.id)}.` });
  }

  if (property.historicReviewRequired) {
    out.push({
      text: 'Exterior changes will go through historic design review.',
      source: 'property',
      sourceDetail: property.historicDistrict
        ? `Your parcel sits in the ${property.historicDistrict} district.`
        : 'Your parcel sits in a designated historic district.',
    });
  }

  return out;
}

function buildExclusions(answers: PlannerAnswers, property: PropertyFacts, ruleset: Ruleset): Exclusion[] {
  const out: Exclusion[] = [
    { text: 'Furnishings and window coverings' },
    { text: 'Utility service upgrades required by the provider', typicalMagnitude: { low: 4_000, high: 9_000 } },
  ];

  if (property.yearBuilt && property.yearBuilt < 1980) {
    // Specific and magnitude-tagged. Vague exclusions protect the contractor
    // and teach the homeowner nothing.
    out.push({
      text: 'Removal of asbestos-containing floor tile or insulation, common in homes of this era',
      typicalMagnitude: { low: 2_500, high: 6_000 },
    });
  }

  if (answers.mode === 'C') {
    out.push(
      { text: 'Land or lot purchase' },
      { text: 'Off-site improvements' },
      { text: 'City impact fees' },
      { text: 'Landscaping beyond the specified allowance' }
    );
    if (!answers.septicRequired) out.push({ text: 'Well or septic, if required' });

    // Only stated once leadership has answered the boundary question in
    // Appendix A § 4. Inventing this figure is exactly the disappointment the
    // spec is trying to prevent.
    const pct = ruleset.newConstruction.excludedCategoriesAddPct;
    if (pct) {
      out.push({
        text: `Together, these commonly add ${Math.round(pct.low * 100)}% to ${Math.round(pct.high * 100)}% on top of the construction range. We would rather you hear that now than later.`,
      });
    }
  }

  return out;
}

function buildVariables(answers: PlannerAnswers, property: PropertyFacts, trace: ExecutionTrace): Variable[] {
  const out: Variable[] = [];

  if (answers.scopeLevel !== 'refresh') {
    out.push({
      text: 'Whether the wall being opened is load-bearing',
      direction: 'increase',
      magnitude: { low: 3_500, high: 12_000 },
    });
  }
  if (property.yearBuilt && property.yearBuilt < 1965) {
    out.push({
      text: 'Condition of original plumbing and wiring once walls are open',
      direction: 'increase',
      magnitude: { low: 5_000, high: 20_000 },
    });
  }
  out.push({ text: 'Final material and fixture selections', direction: 'both' });

  for (const a of trace.adders) {
    out.push({ text: a.rationale, direction: 'increase', magnitude: a.amount });
  }

  return out;
}

function describeMultiplier(id: string): string {
  if (id.startsWith('age.')) return 'the age of your home';
  if (id.startsWith('scope.')) return 'how much of the space is changing';
  if (id.startsWith('site.')) return 'site and access conditions';
  if (id.startsWith('overlay.')) return 'local review requirements';
  return 'your project configuration';
}

function sourceLabel(source: PropertyFacts['enrichmentSource']): string {
  switch (source) {
    case 'MANUAL':
      return 'From what you told us.';
    case 'NONE':
      return 'Estimated, because we could not retrieve records for this property.';
    default:
      return 'From public property records.';
  }
}

/** Assumptions can arrive from several rules; the homeowner sees each once. */
function dedupe(items: Assumption[]): Assumption[] {
  const seen = new Set<string>();
  return items.filter((a) => {
    const k = a.text.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
