import { NextResponse } from 'next/server';
import { estimate } from '@/lib/planner/pricing/engine';
import { AssemblyBasis } from '@/lib/planner/pricing/assembly/basis';
import { CALIBRATED_RULESET } from '@/lib/planner/ruleset';
import type { PlannerAnswers, PropertyFacts } from '@/lib/planner/types';

/**
 * INTERNAL admin endpoint. Runs the assembly engine and returns the FULL
 * result including the per-trade line-item breakdown and execution trace:
 * everything the homeowner never sees. Gated by ADMIN_TOKEN because it exposes
 * internal unit costs and margins.
 *
 * This computes live and touches no database, so it works before persistence
 * is wired. Once the DB lands, the same breakdown is what gets stored on
 * Estimate.lineItems.
 *
 * Auth is enforced by middleware (valid admin session required); this handler
 * assumes the caller is already an authenticated admin.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: { answers: PlannerAnswers; property: PropertyFacts };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }
  if (!body?.answers?.projectType || !body?.answers?.finishTier) {
    return NextResponse.json({ error: 'projectType and finishTier are required.' }, { status: 400 });
  }

  const property: PropertyFacts = {
    ...body.property,
    serviceAreaBand: body.property?.serviceAreaBand ?? 'core',
    enrichmentSource: body.property?.enrichmentSource ?? 'MANUAL',
  };

  // production:false bypasses the sign-off gate: this is an internal preview,
  // never a homeowner-facing figure.
  const result = estimate(body.answers, property, {
    ruleset: CALIBRATED_RULESET,
    now: new Date(),
    production: false,
    basis: new AssemblyBasis(),
  });

  // Full internal payload: trace + assembly breakdown included on purpose.
  return NextResponse.json({
    outcome: result.outcome,
    range: result.range,
    confidence: result.confidence,
    durationWeeks: result.durationWeeks,
    designWeeks: result.designWeeks,
    trace: result.trace,
    diagnostics: result.diagnostics,
  });
}
