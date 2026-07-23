import type { Estimate, PlannerAnswers } from '../types';
import { NARRATIVE_SYSTEM_PROMPT, validateNarrative, type NarrativePayload } from './validate';

/**
 * Narrative generation. Spec Part II § 2.1, Part III § 10.
 *
 * The deterministic template is the product's real narrative. The model is an
 * optional improvement on its phrasing, and it is discarded the moment it
 * introduces a figure it was not given. That ordering matters: the template is
 * not a degraded fallback, it is the guaranteed floor.
 */

export type NarrativeResult = {
  summary: string;
  source: 'template' | 'llm';
  /** Populated when a model response was rejected, for the drift log. */
  rejected?: { reason: string; tokens: string[] };
};

export function buildPayload(estimate: Estimate): NarrativePayload | null {
  if (!estimate.range || !estimate.designWeeks || !estimate.durationWeeks) return null;
  return {
    rangeLow: money(estimate.range.low),
    rangeHigh: money(estimate.range.high),
    rangeMid: money(estimate.range.mid),
    confidenceLabel: estimate.confidence.label,
    designWeeks: `${estimate.designWeeks.low} to ${estimate.designWeeks.high} weeks`,
    constructionWeeks: `${estimate.durationWeeks.low} to ${estimate.durationWeeks.high} weeks`,
    contingencyPct: `${Math.round((estimate.trace?.contingencyPct ?? 0) * 100)}%`,
  };
}

/**
 * The deterministic summary. Contains only figures drawn from the estimate, so
 * it is correct by construction and needs no validation pass.
 */
export function templateNarrative(estimate: Estimate, answers: PlannerAnswers): string {
  if (!estimate.range) {
    return 'We need a short conversation before we can put a range on this project honestly. Everything you told us is saved and will be with our team when they call.';
  }

  const p = buildPayload(estimate)!;
  const what = describeProject(answers);

  const first = `Based on what you have told us, ${what} in the Boise area typically falls between ${p.rangeLow} and ${p.rangeHigh}, with most projects of this scope landing near ${p.rangeMid}. That is a planning range rather than a quote, and it reflects the same reasoning a project manager would walk you through on a first call.`;

  // "An 11%" but "A 5%": spoken aloud, the article follows the digit.
  const article = /^(8|11|18)/.test(p.contingencyPct) ? 'An' : 'A';
  const second = `Allow ${p.designWeeks} for design and planning before construction begins, and ${p.constructionWeeks} for the construction itself. ${article} ${p.contingencyPct} planning contingency is included, because opening up an existing home reveals things nobody can see beforehand. If we do not use it, you do not pay it.`;

  return `${first}\n\n${second}`;
}

function describeProject(a: PlannerAnswers): string {
  const scope =
    a.scopeLevel === 'refresh'
      ? 'a finishes-level refresh'
      : a.scopeLevel === 'rebuild'
        ? 'a structural rebuild'
        : 'a full reimagining';
  const type =
    a.projectType === 'kitchen'
      ? 'of a kitchen'
      : a.projectType === 'bathroom'
        ? 'of a bathroom'
        : a.projectType === 'whole-home'
          ? 'of a whole home'
          : 'of a new build';
  return `${scope} ${type}`;
}

/**
 * Produces the narrative, preferring the model and falling back on any doubt.
 *
 * `callModel` is injected so this is testable without a key and so the
 * transport can change without touching the guarantee. When it is absent: no
 * API key configured, the template is used directly, which is a supported
 * state rather than an error.
 */
export async function generateNarrative(
  estimate: Estimate,
  answers: PlannerAnswers,
  callModel?: (system: string, payload: NarrativePayload) => Promise<string>
): Promise<NarrativeResult> {
  const template = templateNarrative(estimate, answers);
  const payload = buildPayload(estimate);
  if (!callModel || !payload) return { summary: template, source: 'template' };

  let raw: string;
  try {
    raw = await callModel(NARRATIVE_SYSTEM_PROMPT, payload);
  } catch {
    return { summary: template, source: 'template', rejected: { reason: 'model call failed', tokens: [] } };
  }

  const verdict = validateNarrative(raw, payload);
  if (!verdict.ok) {
    // Log every rejection. A rising rate means the prompt has drifted.
    console.warn('[planner] narrative rejected', verdict.failures);
    return {
      summary: template,
      source: 'template',
      rejected: {
        reason: 'output contained figures absent from the payload',
        tokens: verdict.failures.map((f) => f.token),
      },
    };
  }

  return { summary: raw.trim(), source: 'llm' };
}

function money(v: number): string {
  return `$${Math.round(v).toLocaleString('en-US')}`;
}
