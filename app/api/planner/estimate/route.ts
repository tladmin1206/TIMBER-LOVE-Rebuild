import { NextResponse } from 'next/server';
import { estimate } from '@/lib/planner/pricing/engine';
import { DRAFT_RULESET } from '@/lib/planner/ruleset';
import type { PlannerAnswers, PropertyFacts } from '@/lib/planner/types';
import { isPlannerPreview } from '@/lib/planner/preview';

/**
 * Estimate endpoint.
 *
 * The engine runs here rather than in the browser for two reasons. The band
 * table is commercially sensitive — the spec accepts that published *ranges*
 * are visible to competitors (§ 15), which is not the same as shipping the
 * whole approved table in a JS bundle. And keeping it server-side means the
 * sign-off gate cannot be stepped around by editing client state.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  answers: PlannerAnswers;
  property: PropertyFacts;
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
  // before sign-off. It never makes a figure publishable — the response is
  // flagged and the UI labels every number as placeholder pricing.
  const preview = isPlannerPreview();
  const result = estimate(body.answers, property, {
    ruleset: DRAFT_RULESET,
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

  return NextResponse.json({
    ...safe,
    preview,
    // The trace is retained for the report and reconciliation, but only the
    // homeowner-facing parts of it are exposed.
    rulesetVersion: trace?.rulesetVersion ?? null,
  });
}
