/**
 * LLM output validation. Spec Part II § 2.1 and Part III § 10.
 *
 * The pricing engine is deterministic and the LLM never produces a number. It
 * receives the engine's output as structured input and writes prose around it.
 * This module is what enforces that, because a system prompt is a request and
 * this is a guarantee.
 *
 * The rule: extract every currency, percentage, and duration token from the
 * model's output and assert each one appears in the input payload. On any
 * failure, discard the output and fall back to the deterministic template.
 * Fail closed, always, and log every failure, a rising failure rate means the
 * prompt has drifted and needs attention.
 */

export type ValidationFailure = {
  kind: 'currency' | 'percentage' | 'duration';
  token: string;
  reason: string;
};

export type ValidationResult =
  | { ok: true }
  | { ok: false; failures: ValidationFailure[] };

/* --- Token extraction ------------------------------------------------ */

/** $185,000 · $1,234.56 · $250k · $1.2M */
const CURRENCY = /\$\s?\d[\d,]*(?:\.\d+)?\s?(?:[kKmM]\b|million\b|thousand\b)?/g;

/** 12% · 12.5 % · 8 percent */
const PERCENTAGE = /\d+(?:\.\d+)?\s?(?:%|percent\b)/gi;

/**
 * 10 to 16 weeks · 6 weeks · 3 months · 4-8 weeks.
 * Captures each number paired with its unit so "10 to 16 weeks" yields both
 * 10 and 16 rather than a single opaque phrase.
 */
const DURATION = /(\d+)(?:\s*(?:to|\u2013|\u2014|-)\s*(\d+))?\s*(week|month)s?\b/gi;

/** Digits only, so "$185,000" and "185000" compare equal. */
function digitsOf(s: string): string {
  return s.replace(/[^\d.]/g, '').replace(/\.0+$/, '');
}

/**
 * Expands shorthand so "$250k" matches a payload containing "$250,000".
 * Returns every plausible normalisation rather than guessing one.
 */
function currencyForms(token: string): string[] {
  const raw = digitsOf(token);
  const n = Number(raw);
  const forms = new Set<string>([raw]);
  if (Number.isFinite(n)) {
    if (/[kK]|thousand/.test(token)) forms.add(String(n * 1_000));
    if (/[mM]|million/.test(token)) forms.add(String(n * 1_000_000));
  }
  return [...forms];
}

export function extractCurrency(text: string): string[] {
  return text.match(CURRENCY) ?? [];
}

export function extractPercentages(text: string): string[] {
  return text.match(PERCENTAGE) ?? [];
}

export function extractDurations(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(DURATION)) {
    out.push(`${m[1]} ${m[3].toLowerCase()}`);
    if (m[2]) out.push(`${m[2]} ${m[3].toLowerCase()}`);
  }
  return out;
}

/* --- Validation ------------------------------------------------------ */

/**
 * The payload the narrative service is given. All monetary values arrive as
 * pre-formatted strings so the model has no arithmetic to do and no excuse to
 * invent a figure.
 */
export type NarrativePayload = {
  rangeLow: string;
  rangeHigh: string;
  rangeMid: string;
  confidenceLabel: string;
  designWeeks: string;
  constructionWeeks: string;
  contingencyPct: string;
  /** Any other figure the prose is permitted to mention, pre-formatted. */
  additionalFigures?: string[];
};

/** Everything the model is allowed to restate, flattened for comparison. */
function allowedTokens(payload: NarrativePayload) {
  const all = [
    payload.rangeLow,
    payload.rangeHigh,
    payload.rangeMid,
    payload.designWeeks,
    payload.constructionWeeks,
    payload.contingencyPct, ...(payload.additionalFigures ?? []),
  ].join(' ');

  return {
    currency: new Set(extractCurrency(all).flatMap(currencyForms)),
    percentage: new Set(extractPercentages(all).map(digitsOf)),
    duration: new Set(extractDurations(all).map((d) => d.toLowerCase())),
  };
}

/**
 * Validates model output against its input payload.
 *
 * Any figure in the output that is not in the payload is a failure, without
 * exception. There is no tolerance band and no "close enough": the entire
 * point is that the model cannot introduce a number.
 */
export function validateNarrative(output: string, payload: NarrativePayload): ValidationResult {
  const allowed = allowedTokens(payload);
  const failures: ValidationFailure[] = [];

  for (const token of extractCurrency(output)) {
    const forms = currencyForms(token);
    if (!forms.some((f) => allowed.currency.has(f))) {
      failures.push({ kind: 'currency', token, reason: 'Figure does not appear in the engine payload.' });
    }
  }

  for (const token of extractPercentages(output)) {
    if (!allowed.percentage.has(digitsOf(token))) {
      failures.push({ kind: 'percentage', token, reason: 'Percentage does not appear in the engine payload.' });
    }
  }

  for (const token of extractDurations(output)) {
    if (!allowed.duration.has(token.toLowerCase())) {
      failures.push({ kind: 'duration', token, reason: 'Duration does not appear in the engine payload.' });
    }
  }

  return failures.length ? { ok: false, failures } : { ok: true };
}

/**
 * The system prompt. Restates the prohibition in the model's own terms, which
 * reduces the failure rate, but the validator above is what actually enforces
 * it, and this prompt is never the last line of defence.
 */
export const NARRATIVE_SYSTEM_PROMPT = `You write short, warm, plain-language summaries for a design-build firm's planning report.

You are given a structured payload containing figures that have already been calculated. Your job is prose, never arithmetic.

Absolute rules:
- Never state, adjust, estimate, or comment on any dollar figure that is not present verbatim in the payload.
- Never state or adjust any timeline that is not present verbatim in the payload.
- Never add, remove, or modify scope items, assumptions, exclusions, or allowances.
- Never make a claim about return on investment, resale value, or code requirements.
- If you are unsure whether you may state something, leave it out.

Write in British-neutral plain English, second person, no exclamation marks, no sales language. Two short paragraphs at most.`;
