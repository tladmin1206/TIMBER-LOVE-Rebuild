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

/* ------------------------------------------------------------------ *
 * On-brand HTML email building blocks
 *
 * Email clients are a hostile rendering target: no <style> reliability, no flex,
 * spotty web fonts. So everything here is table-based with inline styles and
 * web-safe font stacks, and every dynamic value is escaped. The look mirrors the
 * site: a near-black header and footer, a cream wordmark, and a light, readable
 * body with a serif for the numbers that matter.
 * ------------------------------------------------------------------ */

const esc = (s?: string | number | null) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const EM = {
  ink: '#0B0B0C',
  cream: '#FAFAFA',
  paper: '#ffffff',
  soft: '#f4f2ee',
  panel: '#f7f5f2',
  text: '#1c1b1a',
  muted: '#7c766e',
  line: '#e7e3dc',
};
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function emailShell(body: string, preheader: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>Timber and Love</title></head>
<body style="margin:0;padding:0;background:${EM.soft};-webkit-text-size-adjust:100%;">
<span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${EM.soft};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${EM.paper};border:1px solid ${EM.line};">
<tr><td align="center" style="background:${EM.ink};padding:26px 32px;">
<span style="font-family:${SERIF};font-size:23px;line-height:1;letter-spacing:6px;color:${EM.cream};text-transform:uppercase;">Timber&nbsp;&#43;&nbsp;Love</span>
</td></tr>
<tr><td style="padding:34px 32px;font-family:${SANS};color:${EM.text};font-size:15px;line-height:1.6;">${body}</td></tr>
<tr><td align="center" style="background:${EM.ink};padding:22px 32px;">
<span style="font-family:${SANS};font-size:11px;letter-spacing:1.5px;color:#8b857c;">Timber and Love &nbsp;&middot;&nbsp; Design &#43; Build &nbsp;&middot;&nbsp; Boise, Idaho</span>
</td></tr>
</table></td></tr></table></body></html>`;
}

function emHeading(text: string): string {
  return `<div style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${EM.muted};font-weight:700;margin:0 0 12px;">${esc(text)}</div>`;
}

function emSpacer(px = 28): string {
  return `<div style="line-height:${px}px;height:${px}px;">&nbsp;</div>`;
}

function emRangeHero(estimate: Estimate): string {
  const inner = estimate.range
    ? `<div style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${EM.muted};font-weight:700;">Planning Investment Range</div>
       <div style="font-family:${SERIF};font-size:34px;line-height:1.1;color:${EM.ink};margin-top:10px;">${money(estimate.range.low)} <span style="color:${EM.muted};font-size:22px;">to</span> ${money(estimate.range.high)}</div>
       <div style="font-family:${SANS};font-size:13px;color:${EM.muted};margin-top:10px;">Typical ${money(estimate.range.mid)} &nbsp;&middot;&nbsp; Confidence: ${esc(estimate.confidence.label)}</div>`
    : `<div style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${EM.muted};font-weight:700;">Planning Investment Range</div>
       <div style="font-family:${SERIF};font-size:24px;color:${EM.ink};margin-top:8px;">A conversation, not a number yet</div>
       <div style="font-family:${SANS};font-size:13px;color:${EM.muted};margin-top:6px;">This project is best scoped with our team (${esc(estimate.outcome)}).</div>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background:${EM.panel};border:1px solid ${EM.line};padding:30px 24px;text-align:center;">${inner}</td></tr></table>`;
}

function emKvTable(rows: Array<[string, string | undefined]>): string {
  const trs = rows
    .filter(([, v]) => v && v !== '-')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid ${EM.line};font-family:${SANS};font-size:13px;color:${EM.muted};width:40%;vertical-align:top;">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid ${EM.line};font-family:${SANS};font-size:14px;color:${EM.text};vertical-align:top;">${esc(v)}</td></tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${EM.line};">${trs}</table>`;
}

/** Bullet list. Items are treated as trusted pre-escaped HTML fragments. */
function emBullets(items: string[]): string {
  if (!items.length) return '';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;font-family:${SANS};font-size:14px;color:${EM.text};line-height:1.55;vertical-align:top;"><span style="color:${EM.muted};">&bull;</span>&nbsp;&nbsp;${i}</td></tr>`
    )
    .join('')}</table>`;
}

function emFmtWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

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
): { subject: string; text: string; html: string } {
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

  const projRows: Array<[string, string | undefined]> = [
    ['Project type', title(answers.projectType)],
    ['Scope', answers.scopeLevel ? title(answers.scopeLevel) : undefined],
    ['Finish level', title(answers.finishTier)],
    ['Target size', answers.targetSqFt ? `${answers.targetSqFt.toLocaleString('en-US')} sq ft` : undefined],
    ['Home size', property.finishedSqFt ? `${property.finishedSqFt.toLocaleString('en-US')} sq ft` : undefined],
    ['Year built', property.yearBuilt ? String(property.yearBuilt) : undefined],
    ['Address', contact.address],
  ];
  const timelineHtml =
    estimate.designWeeks && estimate.durationWeeks
      ? emHeading('Timeline') +
        emKvTable([
          ['Design & planning', `${estimate.designWeeks.low} to ${estimate.designWeeks.high} weeks`],
          ['Construction', `${estimate.durationWeeks.low} to ${estimate.durationWeeks.high} weeks`],
        ])
      : '';

  const body = [
    `<div style="font-family:${SERIF};font-size:27px;line-height:1.15;color:${EM.ink};margin:0 0 6px;">Hi ${esc(name)},</div>`,
    `<p style="margin:0 0 22px;font-family:${SANS};font-size:15px;line-height:1.65;color:${EM.text};">Thank you for using our Design ${'&#43;'} Build Investment Planner. Here is your personalized planning range and project summary.</p>`,
    emRangeHero(estimate),
    emSpacer(),
    emHeading('Your project'),
    emKvTable(projRows),
    t.inclusions.length ? emSpacer() + emHeading('What this range includes') + emBullets(t.inclusions.map((i) => esc(i.label))) : '',
    t.assumptions.length ? emSpacer() + emHeading('What we assumed') + emBullets(t.assumptions.map((a) => esc(a.text))) : '',
    t.exclusions.length ? emSpacer() + emHeading('What this range does not include') + emBullets(t.exclusions.map((x) => esc(x.text))) : '',
    timelineHtml ? emSpacer() + timelineHtml : '',
    emSpacer(),
    emHeading('What happens next'),
    `<p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.65;color:${EM.text};">${esc(NEXT_STEPS)}</p>`,
    emSpacer(),
    `<div style="border-top:1px solid ${EM.line};padding-top:16px;font-family:${SANS};font-size:11px;line-height:1.6;color:${EM.muted};">${esc(DISCLAIMER)}</div>`,
    emSpacer(18),
    `<div style="font-family:${SERIF};font-size:17px;color:${EM.ink};">Warmly,<br>The Timber and Love Team</div>`,
  ].join('');

  const preheader = estimate.range
    ? `${money(estimate.range.low)} to ${money(estimate.range.high)} planning range and your project summary inside.`
    : 'Your project summary and next steps inside.';

  return {
    subject: `Your Timber and Love planning range: ${title(answers.projectType)}`,
    text: lines.join('\n'),
    html: emailShell(body, preheader),
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
): { subject: string; text: string; html: string } {
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
      lines.push('', `  PER-TRADE BREAKDOWN (assembly · ${Math.round(asm.margin * 100)}% margin on non-labor, labor at cost · ${money(asm.internalCost)} internal):`);
      for (const t of asm.trades) {
        lines.push(`    ${t.division.padEnd(26)} internal ${money(t.internalCost).padStart(10)}   customer ${money(t.customerCost).padStart(10)}`);
      }
      if (asm.warnings.length) lines.push(`    ! warnings: ${asm.warnings.join('; ')}`);
    }
    lines.push(`  Final range: ${rangeLine(estimate)}`);
  }

  if (meta.reportUrl) lines.push('', `Report: ${meta.reportUrl}`);

  // ---- On-brand HTML version ----
  const flagHtml = estimate.overImprovement
    ? `<div style="margin-top:16px;border:1px solid ${EM.ink};background:${EM.panel};padding:12px 16px;font-family:${SANS};font-size:13px;color:${EM.ink};"><strong>Flag:</strong> range is high relative to property value. Raise gently in conversation.</div>`
    : '';

  const contactRows: Array<[string, string | undefined]> = [
    ['Email', contact.email],
    ['Phone', contact.phone],
    ['Preferred contact', contact.preferredContact ? title(contact.preferredContact) : undefined],
    ['Address', contact.address ?? property.jurisdiction],
  ];
  const projectRows: Array<[string, string | undefined]> = [
    ['Project type', title(answers.projectType)],
    ['Scope', answers.scopeLevel ? title(answers.scopeLevel) : undefined],
    ['Finish level', title(answers.finishTier)],
    ['Target size', answers.targetSqFt ? `${answers.targetSqFt.toLocaleString('en-US')} sq ft` : undefined],
    ['Home size', property.finishedSqFt ? `${property.finishedSqFt.toLocaleString('en-US')} sq ft` : undefined],
    ['Year built', property.yearBuilt ? String(property.yearBuilt) : undefined],
    ['Service area', property.serviceAreaBand],
    ['Property data', property.enrichmentSource],
    ['Notes', contact.notes],
  ];
  const agenda = answers.notSure?.length ? answers.notSure.map((q) => esc(q)) : ['Nothing flagged.'];
  const assumptionItems = estimate.transparency.assumptions.map((a) => {
    const impact = a.impactIfWrong
      ? ` <span style="color:${EM.muted};">(impact if wrong ${money(a.impactIfWrong.low)}&ndash;${money(a.impactIfWrong.high)})</span>`
      : '';
    const flagged = a.flaggedForVerification ? ` <span style="color:${EM.ink};font-weight:700;">[flagged]</span>` : '';
    return `${esc(a.text)}${flagged}${impact}`;
  });
  const allowanceItems = estimate.transparency.allowances.map(
    (al) => `${esc(al.category)}: ${money(al.amount.low)}&ndash;${money(al.amount.high)} <span style="color:${EM.muted};">(${esc(al.buys)})</span>`
  );

  let breakdownHtml = '';
  const trH = estimate.trace;
  if (trH) {
    let tradesHtml = '';
    if (trH.assembly) {
      const asm = trH.assembly;
      const rows = asm.trades
        .map(
          (t) =>
            `<tr><td style="padding:7px 10px;border-bottom:1px solid ${EM.line};font-family:${SANS};font-size:12px;color:${EM.text};">${esc(t.division)}</td><td align="right" style="padding:7px 10px;border-bottom:1px solid ${EM.line};font-family:${SANS};font-size:12px;color:${EM.muted};">${money(t.internalCost)}</td><td align="right" style="padding:7px 10px;border-bottom:1px solid ${EM.line};font-family:${SANS};font-size:12px;color:${EM.text};font-weight:700;">${money(t.customerCost)}</td></tr>`
        )
        .join('');
      tradesHtml = `<div style="font-family:${SANS};font-size:11px;color:${EM.muted};margin:16px 0 8px;">Per-trade breakdown &middot; ${Math.round(asm.margin * 100)}% margin on non-labor &middot; labor passed at cost &middot; ${money(asm.internalCost)} internal</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${EM.line};border-collapse:collapse;"><tr style="background:${EM.ink};"><td style="padding:7px 10px;font-family:${SANS};font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${EM.cream};">Trade</td><td align="right" style="padding:7px 10px;font-family:${SANS};font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#b7b1a8;">Internal</td><td align="right" style="padding:7px 10px;font-family:${SANS};font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${EM.cream};">Customer</td></tr>${rows}</table>`;
    }
    breakdownHtml =
      emSpacer() +
      `<div style="border:1px solid ${EM.line};background:${EM.panel};padding:20px;"><div style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${EM.muted};font-weight:700;">Cost breakdown &middot; internal only</div><div style="font-family:${SANS};font-size:11px;color:${EM.muted};margin:4px 0 14px;">Do not share with the lead.</div>` +
      emKvTable([
        ['Basis', `${trH.basis} / ruleset ${trH.rulesetVersion}`],
        ['Band', `${trH.bandLookupKey}  ${money(trH.approvedBand.low)}–${money(trH.approvedBand.high)}`],
        ['Size factor', `×${trH.sizeFactor.toLocaleString('en-US')}`],
        ['Contingency', `${Math.round(trH.contingencyPct * 100)}%`],
      ]) +
      tradesHtml +
      `</div>`;
  }

  const body = [
    `<div style="font-family:${SERIF};font-size:27px;line-height:1.15;color:${EM.ink};margin:0 0 4px;">New planner lead</div>`,
    `<div style="font-family:${SANS};font-size:13px;color:${EM.muted};margin:0 0 22px;">${esc(name)} &nbsp;&middot;&nbsp; ${esc(title(answers.projectType))} &nbsp;&middot;&nbsp; ${esc(emFmtWhen(meta.submittedAt))}${meta.source ? ` &nbsp;&middot;&nbsp; ${esc(meta.source)}` : ''}</div>`,
    emRangeHero(estimate),
    flagHtml,
    emSpacer(),
    emHeading('Contact'),
    emKvTable(contactRows),
    emSpacer(),
    emHeading('Project'),
    emKvTable(projectRows),
    emSpacer(),
    emHeading('Call agenda: what they were unsure about'),
    emBullets(agenda),
    assumptionItems.length ? emSpacer() + emHeading('Assumptions') + emBullets(assumptionItems) : '',
    allowanceItems.length ? emSpacer() + emHeading('Allowances (internal)') + emBullets(allowanceItems) : '',
    breakdownHtml,
    meta.reportUrl ? emSpacer() + `<a href="${esc(meta.reportUrl)}" style="font-family:${SANS};font-size:14px;color:${EM.ink};font-weight:600;">View full report &rarr;</a>` : '',
  ].join('');

  const preheader = estimate.range
    ? `${name}: ${money(estimate.range.low)} to ${money(estimate.range.high)} planning range.`
    : `${name}: routed to a conversation (${estimate.outcome}).`;

  return {
    subject: `Planner lead: ${name} - ${title(answers.projectType)}`,
    text: lines.filter(Boolean).join('\n'),
    html: emailShell(body, preheader),
  };
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
