import { NextResponse } from 'next/server';
import { estimate } from '@/lib/planner/pricing/engine';
import { CALIBRATED_RULESET } from '@/lib/planner/ruleset';
import type { PlannerAnswers, PropertyFacts } from '@/lib/planner/types';
import { isPlannerPreview } from '@/lib/planner/preview';
import { generateNarrative } from '@/lib/planner/narrative/generate';
import { sendLeadEmail } from '@/lib/leads/email';
import { syncToGhl } from '@/lib/planner/crm/ghl';
import { internalBriefEmail, leadConfirmationEmail, fullPayloadJson, type PlannerContact } from '@/lib/planner/submission';
import { randomUUID } from 'node:crypto';

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

type Contact = PlannerContact;

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
 * Delivers a completed planner submission three ways from one shared summary,
 * so the results screen, both emails, and the CRM always agree:
 *   1. an internal project-manager brief (full detail),
 *   2. the homeowner's confirmation copy (range-only, no itemization), and
 *   3. a GoHighLevel contact upsert with the complete payload.
 *
 * None of these block the results screen (the caller does not await this), and
 * each degrades to a logged no-op when its provider is not configured, so a
 * missing key never looks like success and never loses the results view.
 */
async function deliverPlannerLead(
  contact: Contact,
  answers: PlannerAnswers,
  property: PropertyFacts,
  result: ReturnType<typeof estimate>
) {
  const submittedAt = new Date().toISOString();
  const sessionId = randomUUID();

  // 1. Internal brief to the team (always attempted).
  const internal = internalBriefEmail(contact, answers, property, result, { submittedAt, source: 'investment-planner' });
  const internalDelivery = await sendLeadEmail({ subject: internal.subject, text: internal.text, replyTo: contact.email });
  if (!internalDelivery.delivered && internalDelivery.reason !== 'not-configured') {
    console.error('[planner] INTERNAL LEAD NOT DELIVERED: follow up manually', { contact: contact.email, delivery: internalDelivery });
  }

  // 2. Confirmation copy to the homeowner (only if we have their address, and
  //    only when a range was produced: we never email a non-range as a result).
  if (contact.email && result.outcome === 'ok') {
    const confirm = leadConfirmationEmail(contact, answers, property, result);
    const confirmDelivery = await sendLeadEmail({ subject: confirm.subject, text: confirm.text, to: contact.email });
    if (!confirmDelivery.delivered && confirmDelivery.reason !== 'not-configured') {
      console.error('[planner] LEAD CONFIRMATION NOT SENT', { contact: contact.email, delivery: confirmDelivery });
    }
  }

  // 3. CRM upsert with the complete payload in the notes field.
  if (contact.firstName && contact.lastName && contact.email && contact.phone) {
    const sync = await syncToGhl({
      contact: { firstName: contact.firstName, lastName: contact.lastName, email: contact.email, phone: contact.phone },
      answers,
      property,
      estimate: result,
      sessionId,
      fullPayloadJson: fullPayloadJson(contact, answers, property, result, { submittedAt, source: 'investment-planner' }),
      city: contact.address,
    });
    if (sync.status === 'failed') {
      console.error('[planner] CRM SYNC FAILED: follow up manually', { contact: contact.email, sync });
    }
  }
}
