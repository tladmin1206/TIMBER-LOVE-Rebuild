import type { Estimate, PlannerAnswers, PropertyFacts } from './types';

/**
 * One place that turns a completed planner submission into text.
 *
 * The homeowner's confirmation email, the internal project-manager brief, and
 * the CRM payload are all built from this module against the same estimate, so
 * the results screen, both emails, and GoHighLevel cannot drift apart. The
 * homeowner-facing copy is range-only: it never itemizes a cost or exposes
 * project management, overhead, or margin. The internal copy carries the full
 * detail (assumptions, allowances, flags) for the team.
 */

export type PlannerContact = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  /** From the property lookup / address screen. */
  address?: string;
  /** 'email' | 'phone' | 'text', collected at the gate. */
  preferredContact?: string;
  /** Free-text notes the homeowner added. */
  notes?: string;
};

const money = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;
const title = (s?: string) => (s ? s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '-');

function rangeLine(estimate: Estimate): string {
  return estimate.range
    ? `${money(estimate.range.low)} to ${money(estimate.range.high)} (typical ${money(estimate.range.mid)})`
    : `No range produced (${estimate.outcome})`;
}

/** The selections both audiences see, so the two copies always agree. */
function selectionLines(answers: PlannerAnswers, property: PropertyFacts): string[] {
  const lines = [
    `Project type: ${title(answers.projectType)}`,
    `Scope: ${title(answers.scopeLevel)}`,
    `Finish level: ${title(answers.finishTier)}`,
  ];
  if (answers.targetSqFt) lines.push(`Target size: ${answers.targetSqFt.toLocaleString('en-US')} sq ft`);
  if (property.finishedSqFt) lines.push(`Home size: ${property.finishedSqFt.toLocaleString('en-US')} sq ft`);
  if (property.yearBuilt) lines.push(`Year built: ${property.yearBuilt}`);
  if (answers.goals?.length) lines.push(`Goals: ${answers.goals.map(title).join(', ')}`);
  return lines;
}

const DISCLAIMER =
  'This is a planning range for initial planning only. It is not a proposal, bid, contract, or guaranteed project price. ' +
  'We cannot determine the actual cost until we have walked the property, evaluated existing conditions, discussed your goals, ' +
  'confirmed the full scope, reviewed measurements, plans, materials, and finish selections, identified any structural, ' +
  'mechanical, permitting, or site requirements, and received applicable subcontractor and supplier pricing.';

const NEXT_STEPS =
  'Use this range to understand the likely level of investment, check it against your budget, and prepare for a first ' +
  'conversation with our team. The best next step is to book a design consultation or project walkthrough.';

/**
 * The homeowner's confirmation email. Range-only, mirrors the results screen:
 * range, selections, what is assumed / included / not included, disclaimers,
 * and next steps. No dollar figure other than the total range.
 */
export function leadConfirmationEmail(
  contact: PlannerContact,
  answers: PlannerAnswers,
  property: PropertyFacts,
  estimate: Estimate
): { subject: string; text: string } {
  const name = contact.firstName?.trim() || 'there';
  const t = estimate.transparency;
  const lines = [
    `Hi ${name},`,
    '',
    'Thank you for using the Timber and Love Design + Build Investment Planner. Here is your personalized planning range and project summary.',
    '',
    'YOUR PLANNING INVESTMENT RANGE',
    rangeLine(estimate),
    `Confidence: ${estimate.confidence.label}`,
    '',
    'YOUR PROJECT',
    ...selectionLines(answers, property),
  ];
  if (contact.address) lines.push(`Address: ${contact.address}`);

  if (t.inclusions.length) {
    lines.push('', 'WHAT THIS RANGE INCLUDES', ...t.inclusions.map((i) => `- ${i.label}`));
  }
  if (t.assumptions.length) {
    lines.push('', 'WHAT WE ASSUMED', ...t.assumptions.map((a) => `- ${a.text}`));
  }
  if (t.exclusions.length) {
    lines.push('', 'WHAT THIS RANGE DOES NOT INCLUDE', ...t.exclusions.map((x) => `- ${x.text}`));
  }
  if (estimate.designWeeks && estimate.durationWeeks) {
    lines.push(
      '',
      'TIMELINE',
      `Design and planning: ${estimate.designWeeks.low} to ${estimate.designWeeks.high} weeks`,
      `Construction: ${estimate.durationWeeks.low} to ${estimate.durationWeeks.high} weeks`
    );
  }
  lines.push('', 'WHAT HAPPENS NEXT', NEXT_STEPS, '', 'IMPORTANT', DISCLAIMER, '', 'Timber and Love');

  return {
    subject: `Your Timber and Love planning range: ${title(answers.projectType)}`,
    text: lines.join('\n'),
  };
}

/**
 * The internal project-manager brief. Everything the team needs to act:
 * complete contact, every selection, the range and assumptions, the things the
 * homeowner was unsure about (the call agenda), and the submission time. This
 * is the copy that carries the full detail the homeowner never sees.
 */
export function internalBriefEmail(
  contact: PlannerContact,
  answers: PlannerAnswers,
  property: PropertyFacts,
  estimate: Estimate,
  meta: { submittedAt: string; source?: string; reportUrl?: string }
): { subject: string; text: string } {
  const name = `${contact.firstName ?? ''} ${contact.lastName ?? ''}`.trim() || 'Unnamed';
  const lines = [
    `PLANNER SUBMISSION: ${name}`,
    `Submitted: ${meta.submittedAt}`,
    meta.source ? `Source: ${meta.source}` : '',
    '',
    'RANGE',
    rangeLine(estimate),
    `Confidence: ${estimate.confidence.label} (${estimate.confidence.score})`,
    estimate.overImprovement ? 'FLAG: high relative to property value - raise gently.' : '',
    '',
    'CONTACT',
    `Email: ${contact.email ?? '-'}`,
    `Phone: ${contact.phone ?? '-'}`,
    `Preferred contact: ${title(contact.preferredContact) || '-'}`,
    `Address: ${contact.address ?? property.jurisdiction ?? '-'}`,
    '',
    'PROJECT',
    ...selectionLines(answers, property),
    `Service area: ${property.serviceAreaBand}`,
    `Property data source: ${property.enrichmentSource}`,
    contact.notes ? `Notes: ${contact.notes}` : '',
    '',
    'UNSURE ABOUT (call agenda):',
    ...(answers.notSure?.length ? answers.notSure.map((q) => `  - ${q}`) : ['  - nothing flagged']),
  ];

  if (estimate.transparency.assumptions.length) {
    lines.push('', 'ASSUMPTIONS:');
    for (const a of estimate.transparency.assumptions) {
      const impact = a.impactIfWrong ? ` (impact if wrong ${money(a.impactIfWrong.low)}-${money(a.impactIfWrong.high)})` : '';
      lines.push(`  - ${a.text}${a.flaggedForVerification ? ' [FLAGGED]' : ''}${impact}`);
    }
  }
  if (estimate.transparency.allowances.length) {
    lines.push('', 'ALLOWANCES (internal):');
    for (const al of estimate.transparency.allowances) {
      lines.push(`  - ${al.category}: ${money(al.amount.low)}-${money(al.amount.high)} (${al.buys})`);
    }
  }

  // The full cost derivation for the team. This is the complete breakdown
  // behind the range: the base band, every multiplier and why it applied, the
  // flat adders, and contingency. The homeowner never sees any of this; their
  // copy is range-only.
  const tr = estimate.trace;
  if (tr) {
    lines.push('', 'COST BREAKDOWN (internal only, do not share with the lead):');
    lines.push(`  Basis: ${tr.basis} / ruleset ${tr.rulesetVersion}`);
    lines.push(`  Band: ${tr.bandLookupKey}  ${money(tr.approvedBand.low)}-${money(tr.approvedBand.high)}`);
    lines.push(`  Size factor: x${tr.sizeFactor.toLocaleString('en-US')}`);
    if (tr.multipliers.length) {
      lines.push('  Multipliers:');
      for (const m of tr.multipliers) lines.push(`    - ${m.id}: x${m.value} (${m.rationale})`);
    }
    if (tr.adders.length) {
      lines.push('  Adders:');
      for (const a of tr.adders) lines.push(`    - ${a.id}: ${money(a.amount.low)}-${money(a.amount.high)} (${a.rationale})`);
    }
    lines.push(`  Contingency: ${Math.round(tr.contingencyPct * 100)}%`);
    if (tr.steps.length) {
      lines.push('  Derivation:');
      for (const s of tr.steps) lines.push(`    - ${s}`);
    }
    // Assembly basis: per-trade rollup (children calculated behind the scenes,
    // shown here as parent-trade totals for the PM).
    if (tr.assembly) {
      const asm = tr.assembly;
      lines.push('', `  PER-TRADE BREAKDOWN (assembly · ${Math.round(asm.margin * 100)}% gross margin on ${money(asm.internalCost)} internal):`);
      for (const t of asm.trades) {
        lines.push(`    ${t.division.padEnd(26)} internal ${money(t.internalCost).padStart(10)}   customer ${money(t.customerCost).padStart(10)}`);
      }
      if (asm.warnings.length) lines.push(`    ! warnings: ${asm.warnings.join('; ')}`);
    }
    lines.push(`  Final range: ${rangeLine(estimate)}`);
  }

  if (meta.reportUrl) lines.push('', `Report: ${meta.reportUrl}`);

  return { subject: `Planner lead: ${name} - ${title(answers.projectType)}`, text: lines.filter(Boolean).join('\n') };
}

/** Complete machine-readable payload for the CRM notes field. */
export function fullPayloadJson(
  contact: PlannerContact,
  answers: PlannerAnswers,
  property: PropertyFacts,
  estimate: Estimate,
  meta: { submittedAt: string; source?: string }
): string {
  return JSON.stringify(
    {
      submittedAt: meta.submittedAt,
      source: meta.source ?? null,
      contact,
      answers,
      property,
      range: estimate.range,
      confidence: estimate.confidence,
      outcome: estimate.outcome,
      transparency: estimate.transparency,
      flags: { overImprovement: estimate.overImprovement, belowMinimum: estimate.belowMinimum },
      rulesetVersion: estimate.trace?.rulesetVersion ?? null,
      // Full internal cost breakdown for the team; never surfaced to the lead.
      costBreakdown: estimate.trace,
    },
    null,
    2
  );
}
