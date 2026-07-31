import { dbEnabled, prisma } from '@/lib/db';
import { CALIBRATED_RULESET } from '@/lib/planner/ruleset';
import type { Estimate, PlannerAnswers, PropertyFacts } from '@/lib/planner/types';
import type { PlannerContact } from '@/lib/planner/submission';

/**
 * Persist a completed planner submission: Contact + Session + Property +
 * Estimate (+ Answers). Fire-and-forget from the estimate route, wrapped so a
 * DB outage never blocks the results screen or the email/CRM delivery.
 *
 * The internal line-item breakdown lives on Estimate.lineItems (flagged
 * internal-only in the schema); the homeowner-facing range and transparency
 * blocks live in their own columns. Nothing here is exposed to the lead.
 */
export async function persistEstimate(
  contact: PlannerContact,
  answers: PlannerAnswers,
  property: PropertyFacts,
  result: Estimate,
  meta: { sessionId: string; device?: string; utm?: Record<string, string | undefined> }
): Promise<{ persisted: boolean; reason?: string }> {
  if (!dbEnabled) return { persisted: false, reason: 'no-database' };
  if (!contact.email || !contact.firstName || !contact.lastName) return { persisted: false, reason: 'incomplete-contact' };

  try {
    const tr = result.trace;
    const range = result.range;

    await prisma.$transaction(async (tx) => {
      const dbContact = await tx.contact.upsert({
        where: { email: contact.email! },
        create: { firstName: contact.firstName!, lastName: contact.lastName!, email: contact.email!, phoneE164: contact.phone ?? null },
        update: { firstName: contact.firstName!, lastName: contact.lastName!, phoneE164: contact.phone ?? null },
      });

      const session = await tx.session.create({
        data: {
          id: meta.sessionId,
          mode: answers.mode,
          status: 'COMPLETED',
          completedAt: new Date(),
          lastScreen: 'results',
          device: meta.device ?? 'unknown',
          utmSource: meta.utm?.source,
          utmMedium: meta.utm?.medium,
          utmCampaign: meta.utm?.campaign,
          contactId: dbContact.id,
        },
      });

      await tx.property.create({
        data: {
          sessionId: session.id,
          formattedAddress: contact.address ?? '',
          serviceAreaBand: property.serviceAreaBand,
          enrichmentSource: property.enrichmentSource,
          yearBuilt: property.yearBuilt ?? null,
          finishedSqFt: property.finishedSqFt ?? null,
          bedrooms: property.bedrooms ?? null,
          bathrooms: property.bathrooms ?? null,
          lotSizeSqFt: property.lotSizeSqFt ?? null,
          stories: property.stories ?? null,
          hasBasement: property.hasBasement ?? null,
          estimatedValue: property.estimatedValue ?? null,
          zoning: property.zoning ?? null,
          jurisdiction: property.jurisdiction ?? null,
          historicReviewReq: property.historicReviewRequired ?? false,
        },
      });

      await tx.estimate.create({
        data: {
          sessionId: session.id,
          rulesetVersion: tr?.rulesetVersion ?? CALIBRATED_RULESET.version,
          rulesetSnapshot: { version: tr?.rulesetVersion ?? CALIBRATED_RULESET.version },
          mode: answers.mode,
          projectTypes: [answers.projectType],
          scopeLevel: answers.scopeLevel ?? null,
          finishTier: answers.finishTier ?? null,
          basis: tr?.basis === 'assembly' ? 'ASSEMBLY' : 'SEGMENT_BAND',
          // Internal-only per-trade line-item build-up.
          lineItems: (tr?.assembly ?? undefined) as object | undefined,
          baseCost: tr?.assembly?.internalCost ?? null,
          multipliersApplied: (tr?.multipliers ?? []) as unknown as object,
          feesApplied: tr?.assembly ? { grossMargin: tr.assembly.margin } : undefined,
          rangeLow: range?.low ?? null,
          rangeMid: range?.mid ?? null,
          rangeHigh: range?.high ?? null,
          confidenceScore: result.confidence.score,
          confidenceLabel: result.confidence.label,
          bandWidthPct: result.confidence.bandWidth,
          durationWeeksLow: result.durationWeeks?.low ?? null,
          durationWeeksHigh: result.durationWeeks?.high ?? null,
          designWeeksLow: result.designWeeks?.low ?? null,
          designWeeksHigh: result.designWeeks?.high ?? null,
          inclusions: result.transparency.inclusions as unknown as object,
          assumptions: result.transparency.assumptions as unknown as object,
          exclusions: result.transparency.exclusions as unknown as object,
          allowances: result.transparency.allowances as unknown as object,
          variables: result.transparency.variables as unknown as object,
          outcome: result.outcome,
          overImprovement: result.overImprovement,
          belowMinimum: result.belowMinimum,
        },
      });

      // Store each answer for the "which questions confuse people" analysis.
      const notSure = new Set(answers.notSure ?? []);
      const entries = Object.entries(answers).filter(([k]) => k !== 'notSure');
      for (const [questionId, value] of entries) {
        await tx.answer.create({
          data: { sessionId: session.id, questionId, value: value as object, wasNotSure: notSure.has(questionId) },
        });
      }
    });

    return { persisted: true };
  } catch (e) {
    console.error('[planner] persistEstimate failed (non-blocking)', e);
    return { persisted: false, reason: 'db-error' };
  }
}
