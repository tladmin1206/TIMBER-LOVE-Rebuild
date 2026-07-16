import {
  costPerSqft,
  finishMultiplier,
  scopeAllowance,
  serviceAllowance,
  conditionMultiplier,
  CONTINGENCY,
  minimumProject,
  MAX_RANGE_CEILING,
  sizeBands,
  serviceArea,
  projectCategories,
  type Range,
  type ProjectCategory,
  type FinishLevel,
  type SizeBand,
} from './config';

export type EstimatorAnswers = {
  category?: ProjectCategory;
  city?: string;
  zip?: string;
  owns?: string;
  occupied?: boolean;
  size?: SizeBand;
  scope?: string[];
  finish?: FinishLevel;
  conditions?: string[];
  services?: string[];
  timing?: string;
  investment?: string;
  details?: string;
};

export type ResultScenario = 'likely-fit' | 'possible-fit' | 'below-range' | 'outside-area' | 'insufficient';

export type EstimateResult = {
  scenario: ResultScenario;
  range: Range | null;
  designRange: Range | null;
  constructionRange: Range | null;
  contingencyNote: string;
  factors: string[];
  exclusions: string[];
  confidence: 'low' | 'medium' | 'high';
  nextStep: string;
};

const clampMoney = (n: number) => Math.max(0, Math.min(n, MAX_RANGE_CEILING));

/** Round to a homeowner-friendly figure (nearest $5k under $1M, else $25k). */
function roundFriendly(n: number): number {
  if (n <= 0) return 0;
  const step = n < 1_000_000 ? 5000 : 25000;
  return Math.round(n / step) * step;
}

function addRange(a: Range, b: Range): Range {
  return { low: a.low + b.low, high: a.high + b.high };
}
function scaleRange(a: Range, f: number): Range {
  return { low: a.low * f, high: a.high * f };
}

/** Ensure a range is finite, non-negative, correctly ordered, and capped. */
function sanitize(r: Range): Range {
  let low = Number.isFinite(r.low) ? clampMoney(r.low) : 0;
  let high = Number.isFinite(r.high) ? clampMoney(r.high) : 0;
  if (high < low) [low, high] = [high, low];
  return { low, high };
}

export function isInServiceArea(answers: EstimatorAnswers): boolean {
  const zip = (answers.zip || '').trim();
  const city = (answers.city || '').trim().toLowerCase();
  if (zip) return serviceArea.zipPrefixes.some((p) => zip.startsWith(p));
  if (city) return serviceArea.cities.includes(city);
  return true; // unknown location is not treated as out-of-area
}

/**
 * Deterministic estimate. Returns a broad, responsible RANGE — never an exact
 * figure. Guards guarantee no negative, reversed, NaN, or $0 output ever
 * reaches the UI; on any inconsistency the scenario degrades gracefully.
 */
export function calculateEstimate(answers: EstimatorAnswers): EstimateResult {
  const factors: string[] = [];
  const exclusions = [
    'Land or lot purchase',
    'Furniture, decor, and appliances beyond noted allowances',
    'Unforeseen conditions discovered after demolition',
    'Off-site improvements and impact fees',
  ];

  // Out-of-area short-circuit.
  if (!isInServiceArea(answers)) {
    return {
      scenario: 'outside-area',
      range: null,
      designRange: null,
      constructionRange: null,
      contingencyNote: '',
      factors,
      exclusions,
      confidence: 'low',
      nextStep: 'Send a general inquiry so our team can confirm whether we can help with your location.',
    };
  }

  const category = answers.category;
  const size = answers.size;
  const finish = answers.finish;

  // Count how many core inputs are known to gauge confidence / sufficiency.
  const known = [category && category !== 'not-sure', size && size !== 'not-sure', finish].filter(Boolean).length;

  const sizeBand = sizeBands.find((s) => s.key === size);
  const midSqft = sizeBand?.midSqft ?? null;

  // Without a category or usable size we cannot form a base range.
  if (!category || category === 'not-sure' || midSqft === null) {
    return {
      scenario: 'insufficient',
      range: null,
      designRange: null,
      constructionRange: null,
      contingencyNote: '',
      factors,
      exclusions,
      confidence: 'low',
      nextStep: 'Tell us a bit more about your project scope and size, or send it to our team for a closer look.',
    };
  }

  // 1) Base range = cost/sqft * size.
  const perSqft = costPerSqft[category];
  let range: Range = { low: perSqft.low * midSqft, high: perSqft.high * midSqft };
  const catLabel = projectCategories.find((c) => c.key === category)?.label ?? 'project';
  factors.push(`${catLabel} at roughly ${midSqft.toLocaleString()} sq ft`);

  // 2) Finish level multiplier.
  if (finish) {
    range = scaleRange(range, finishMultiplier[finish]);
    factors.push('Selected finish level');
  }

  // 3) Scope-item allowances (flat additions).
  const scope = answers.scope ?? [];
  let scopeAdds = 0;
  for (const s of scope) {
    const a = scopeAllowance[s];
    if (a) {
      range = addRange(range, a);
      scopeAdds++;
    }
  }
  if (scopeAdds) factors.push(`${scopeAdds} selected scope item${scopeAdds > 1 ? 's' : ''}`);

  // 4) Design & professional services.
  const services = answers.services ?? [];
  const designRangeParts: Range[] = [];
  for (const s of services) {
    const a = serviceAllowance[s];
    if (a) designRangeParts.push(a);
  }
  const designRange = designRangeParts.length
    ? sanitize(designRangeParts.reduce(addRange, { low: 0, high: 0 }))
    : null;
  if (designRange) {
    range = addRange(range, designRange);
    factors.push('Design and preconstruction services');
  }

  // 5) Existing conditions / complexity / access (multiplicative).
  const conditions = answers.conditions ?? [];
  let condMult = 1;
  for (const c of conditions) condMult *= conditionMultiplier[c] ?? 1;
  if (answers.occupied) condMult *= conditionMultiplier['occupied'];
  if (condMult !== 1) {
    range = scaleRange(range, condMult);
    factors.push('Existing conditions and complexity');
  }

  // 6) Contingency band.
  range = {
    low: range.low * (1 + CONTINGENCY.low),
    high: range.high * (1 + CONTINGENCY.high),
  };
  const contingencyNote = `Includes a ${Math.round(CONTINGENCY.low * 100)}–${Math.round(
    CONTINGENCY.high * 100
  )}% contingency for the unknowns typical of a project like this.`;

  // 7) Minimum project threshold (floor).
  const min = minimumProject[category];
  let belowMinimum = false;
  if (min && range.high < min) belowMinimum = true;
  if (min && range.low < min) range.low = min;

  // 8) Sanitize + round.
  range = sanitize(range);
  const rounded: Range = { low: roundFriendly(range.low), high: roundFriendly(range.high) };
  const safeRange = sanitize(rounded);
  if (safeRange.low === 0 && safeRange.high === 0) {
    return {
      scenario: 'insufficient',
      range: null,
      designRange: null,
      constructionRange: null,
      contingencyNote: '',
      factors,
      exclusions,
      confidence: 'low',
      nextStep: 'We could not form a reliable range from these answers. Send your project to our team for review.',
    };
  }

  // Construction portion (total minus design services, for transparency).
  const constructionRange = designRange
    ? sanitize({ low: safeRange.low - designRange.high, high: safeRange.high - designRange.low })
    : safeRange;

  const confidence: EstimateResult['confidence'] = known >= 3 ? 'high' : known === 2 ? 'medium' : 'low';

  const scenario: ResultScenario = belowMinimum ? 'below-range' : known >= 2 ? 'likely-fit' : 'possible-fit';

  return {
    scenario,
    range: safeRange,
    designRange,
    constructionRange,
    contingencyNote,
    factors,
    exclusions,
    confidence,
    nextStep:
      scenario === 'below-range'
        ? 'Adjusting the scope, finish level, or timing may change the result. Our team can talk through options.'
        : 'Continue to a project inquiry and our team will review your details and follow up.',
  };
}

/** Format a range as a homeowner-friendly string. */
export function formatRange(r: Range | null): string {
  if (!r) return '—';
  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;
  return `${fmt(r.low)} to ${fmt(r.high)}`;
}
