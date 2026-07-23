import type { Estimate, PlannerAnswers, PropertyFacts } from '../types';

/**
 * GoHighLevel integration. Spec Part II § 9.
 *
 * API v2 rather than an inbound webhook, for contact upsert control, stage
 * control on the opportunity, error visibility, and retry. A repeat visitor
 * must not create a duplicate contact.
 *
 * Two design rules from the spec drive everything here. Twenty promoted fields
 * only, the ones that drive automation, filtering, or a project manager's
 * first ten seconds: with the complete payload in a single searchable notes
 * field rather than ninety custom fields nobody can maintain. And the push
 * never blocks the results screen: it is queued, retried, and its failures are
 * surfaced internally.
 */

export type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

/** § 9.2, the twenty promoted fields. */
export function customFields(
  answers: PlannerAnswers,
  property: PropertyFacts,
  estimate: Estimate,
  extras: { sessionId: string; reportUrl?: string; budgetReaction?: string }
): Record<string, string | number | null> {
  return {
    planner_mode: answers.mode,
    planner_project_type: answers.projectType,
    planner_range_low: estimate.range?.low ?? null,
    planner_range_mid: estimate.range?.mid ?? null,
    planner_range_high: estimate.range?.high ?? null,
    planner_confidence: estimate.confidence.label,
    planner_scope_level: answers.scopeLevel ?? '',
    planner_finish_tier: answers.finishTier ?? '',
    planner_timeline: answers.timeline ?? '',
    planner_property_address: property.jurisdiction ?? '',
    planner_year_built: property.yearBuilt ?? null,
    planner_home_sqft: property.finishedSqFt ?? null,
    planner_property_value: property.estimatedValue ?? null,
    planner_service_area: property.serviceAreaBand,
    planner_jurisdiction: property.jurisdiction ?? '',
    planner_historic_flag: property.historicReviewRequired ? 'yes' : 'no',
    planner_primary_goal: answers.goals?.[0] ?? '',
    planner_budget_reaction: extras.budgetReaction ?? '',
    planner_report_url: extras.reportUrl ?? '',
    planner_session_id: extras.sessionId,
  };
}

/** § 9.3: tags drive workflow entry. */
export function tagsFor(answers: PlannerAnswers, property: PropertyFacts, estimate: Estimate): string[] {
  const tags = [
    'planner-submitted',
    `mode-${answers.mode.toLowerCase()}`,
    `type-${answers.projectType}`,
    `area-${property.serviceAreaBand}`,
  ];
  if (answers.finishTier) tags.push(`tier-${answers.finishTier}`);
  if (answers.timeline) tags.push(`timeline-${answers.timeline}`);

  const mid = estimate.range?.mid;
  if (mid !== undefined) {
    tags.push(
      mid < 100_000 ? 'band-under-100k' : mid < 250_000 ? 'band-100-250k' : mid < 500_000 ? 'band-250-500k' : 'band-500k-plus'
    );
  }

  if (estimate.overImprovement) tags.push('flag-over-improvement');
  if (estimate.belowMinimum) tags.push('flag-below-minimum');
  if (property.historicReviewRequired) tags.push('flag-historic');

  return tags;
}

/** § 9.4: opportunity naming and value. */
export function opportunityFor(
  contact: ContactDetails,
  answers: PlannerAnswers,
  estimate: Estimate,
  city: string
) {
  return {
    name: `${contact.lastName}: ${answers.projectType}: ${city || 'Boise'}`,
    monetaryValue: estimate.range?.mid ?? 0,
    pipeline: 'Design-Build',
    stage: 'Planner Submitted',
  };
}

export type SyncResult =
  | { status: 'sent'; contactId: string }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; reason: string; attempts: number };

export function isConfigured(): boolean {
  return !!(process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID);
}

/**
 * Pushes a submission to GHL with bounded retry.
 *
 * The caller must not await this before rendering results. A CRM outage is an
 * internal problem, and making the homeowner wait for it: or worse, showing
 * them an error because of it: turns an ops issue into a lost lead.
 */
export async function syncToGhl(payload: {
  contact: ContactDetails;
  answers: PlannerAnswers;
  property: PropertyFacts;
  estimate: Estimate;
  sessionId: string;
  fullPayloadJson: string;
  city?: string;
  reportUrl?: string;
  budgetReaction?: string;
}): Promise<SyncResult> {
  if (!isConfigured()) {
    return { status: 'skipped', reason: 'GHL_API_TOKEN or GHL_LOCATION_ID is not set.' };
  }

  const body = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName: payload.contact.firstName,
    lastName: payload.contact.lastName,
    email: payload.contact.email,
    phone: toE164(payload.contact.phone),
    tags: tagsFor(payload.answers, payload.property, payload.estimate),
    customFields: customFields(payload.answers, payload.property, payload.estimate, {
      sessionId: payload.sessionId,
      reportUrl: payload.reportUrl,
      budgetReaction: payload.budgetReaction,
    }),
    // § 9.2: everything else lands here: searchable, complete, no field sprawl.
    notes: payload.fullPayloadJson,
  };

  const MAX_ATTEMPTS = 3;
  let lastReason = 'unknown';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const json = (await res.json()) as { contact?: { id?: string } };
        return { status: 'sent', contactId: json.contact?.id ?? 'unknown' };
      }
      lastReason = `HTTP ${res.status}`;
    } catch (e) {
      lastReason = e instanceof Error ? e.message : 'network error';
    }

    // Exponential backoff between attempts.
    if (attempt < MAX_ATTEMPTS) await sleep(2 ** attempt * 250);
  }

  console.error('[planner] GHL sync failed', { reason: lastReason, sessionId: payload.sessionId });
  return { status: 'failed', reason: lastReason, attempts: MAX_ATTEMPTS };
}

/** Accept any format from the homeowner; normalise here (§ 6.3). */
export function toE164(raw: string, defaultCountry = '1'): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `+${defaultCountry}${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
