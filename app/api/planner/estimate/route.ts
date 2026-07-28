import { NextResponse } from 'next/server';
import { estimate } from '@/lib/planner/pricing/engine';
import { CALIBRATED_RULESET } from '@/lib/planner/ruleset';
import type { PlannerAnswers, PropertyFacts } from '@/lib/planner/types';
import { isPlannerPreview } from '@/lib/planner/preview';
import { generateNarrative } from '@/lib/planner/narrative/generate';
import { sendLeadEmail } from '@/lib/leads/email';

/**
 * Estimate endpoint.
 *
 * The engine runs here rather than in the browser for two reasons. The band
 * table is commercially sensitive, the spec accepts that published *ranges*
 * are visible to competitors (§ 15), which is not the same as shipping the
 * whole approved table in a JS bundle. And keeping it server-side means the
 * sign-off gate cannot be stepped around by editing client state.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Contact = { firstName?: string; lastName?: string; email?: string; phone?: string };

type Body = {
  answers: PlannerAnswers;
  property: PropertyFacts;
  contact?: Contact;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  if (!body?.answers?.mode || !body?.answers?.projectType) {
    return NextResponse.json({ error: 'A mode and project type are required.' }, { status: 400 });
  }

  // Defaults apply only where the client omitted a value, so a missing field
  // degrades to the conservative option rather than to undefined.
  const property: PropertyFacts = {
    ...body.property,
    serviceAreaBand: body.property?.serviceAreaBand ?? 'core',
    enrichmentSource: body.property?.enrichmentSource ?? 'NONE',
  };

  // Preview bypasses the publish gate so the flow can be walked and timed
  // before sign-off. It never makes a figure publishable, the response is
  // flagged and the UI labels every number as placeholder pricing.
  const preview = isPlannerPreview();
  const result = estimate(body.answers, property, {
    ruleset: CALIBRATED_RULESET,
    now: new Date(),
    production: !preview,
  });

  // Diagnostics explain *why* a range was withheld and name the internal
  // reason. That belongs in the server log and the PM brief, never in the
  // homeowner's payload.
  const { diagnostics, trace, ...safe } = result;
  if (result.outcome !== 'ok') {
    console.warn('[planner] estimate withheld', { outcome: result.outcome, diagnostics });
  }

  // Narrative is generated after the figure, never alongside it. With no
  // model configured this returns the deterministic template, which is a
  // supported state rather than a degraded one.
  const narrative = await generateNarrative(result, body.answers);

  // The gate collects a contact before any figure is shown, which makes every
  // completed planner session a lead, and the richest one on the site, since
  // it carries nine answers plus a property profile. Delivered here rather than
  // by the client so it cannot be lost to a closed tab.
  //
  // Deliberately not awaited: § 9.1 requires that delivery failure never block
  // the results screen.
  if (body.contact?.email) {
    void deliverPlannerLead(body.contact, body.answers, property, result);
  }

  return NextResponse.json({
    ...safe,
    preview,
    narrative: narrative.summary,
    narrativeSource: narrative.source,
    // The trace is retained for the report and reconciliation, but only the
    // homeowner-facing parts of it are exposed.
    rulesetVersion: trace?.rulesetVersion ?? null,
  });
}

/**
 * Sends the planner lead. Composed as a project manager's brief rather than a
 * field dump: the range and confidence first, then the answers, then whatever
 * the homeowner was unsure about, which is the agenda for the first call.
 */
async function deliverPlannerLead(
  contact: Contact,
  answers: PlannerAnswers,
  property: PropertyFacts,
  result: ReturnType<typeof estimate>
) {
  const name = `${contact.firstName ?? ''} ${contact.lastName ?? ''}`.trim() || 'Unnamed';
  const range = result.range
    ? `$${result.range.low.toLocaleString('en-US')} – $${result.range.high.toLocaleString('en-US')} (typical $${result.range.mid.toLocaleString('en-US')})`
    : `No range produced: ${result.outcome}`;

  const lines = [
    `PLANNER SUBMISSION: ${name}`,
    '',
    `Range:       ${range}`,
    `Confidence:  ${result.confidence.label} (${result.confidence.score})`,
    `Project:     ${answers.projectType} · ${answers.scopeLevel ?? '-'} · ${answers.finishTier ?? '-'}`,
    `Timeline:    ${answers.timeline ?? '-'}`,
    `Service area: ${property.serviceAreaBand}`,
    '',
    `Email:  ${contact.email}`,
    `Phone:  ${contact.phone ?? '-'}`,
    '',
    `Property: ${property.yearBuilt ?? 'year unknown'}, ${property.finishedSqFt ? `${property.finishedSqFt.toLocaleString('en-US')} sq ft` : 'size unknown'} (${property.enrichmentSource})`,
    `Goals: ${(answers.goals ?? []).join(', ') || '-'}`,
    result.overImprovement ? 'FLAG: estimate is high relative to property value: raise gently.' : '',
    '',
    'Unsure about:', ...(answers.notSure?.length ? answers.notSure.map((q) => `  · ${q}`) : ['  · nothing flagged']),
    '',
    'Assumptions flagged for verification:', ...result.transparency.assumptions
      .filter((a) => a.flaggedForVerification)
      .map((a) => `  · ${a.text}${a.impactIfWrong ? ` (±$${a.impactIfWrong.low.toLocaleString('en-US')}–$${a.impactIfWrong.high.toLocaleString('en-US')})` : ''}`),
  ].filter(Boolean);

  const delivery = await sendLeadEmail({
    subject: `Planner lead: ${name}: ${answers.projectType}`,
    replyTo: contact.email,
    text: lines.join('\n'),
  });

  if (!delivery.delivered && delivery.reason !== 'not-configured') {
    console.error('[planner] LEAD NOT DELIVERED: follow up manually', { contact: contact.email, delivery });
  }
}
