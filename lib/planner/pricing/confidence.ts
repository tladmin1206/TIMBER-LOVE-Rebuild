import type { Confidence, ConfidenceLabel, PlannerAnswers, PropertyFacts } from '../types';

/**
 * Confidence scoring. Spec Part III § 7.
 *
 * Confidence is computed from input completeness and data quality. It is not a
 * mood, and it states *why* it is what it is, which is itself the trust signal.
 *
 * Phase 1 caps the label at "Good" (§ 1A.4): no Phase 1 estimate is backed by
 * statistical fit against completed projects, so none of them may display
 * "Strong".
 */

/** Questions whose answers materially move cost. "Not sure" costs more here. */
const COST_DRIVING_QUESTIONS = new Set([
  'scopeLevel',
  'finishTier',
  'targetSqFt',
  'slope',
  'utilitiesAtStreet',
  'basement',
]);

export type ConfidenceInput = {
  answers: PlannerAnswers;
  property: PropertyFacts;
  /** Phase 1 always true; Phase 2 sets false once a type clears calibration. */
  phase1: boolean;
  /** Closed jobs backing this project type. Phase 1 is zero by definition. */
  calibrationJobs?: number;
};

export function scoreConfidence(input: ConfidenceInput): Confidence {
  const { answers, property, phase1, calibrationJobs = 0 } = input;
  const reasons: string[] = [];
  const wouldTighten: string[] = [];
  let score = 100;

  const penalise = (points: number, reason: string, tighten?: string) => {
    score -= points;
    reasons.push(reason);
    if (tighten) wouldTighten.push(tighten);
  };

  if (property.enrichmentSource === 'NONE') {
    penalise(25, 'We could not retrieve public records for this property.', 'Confirming your home’s age and size');
  } else if (property.enrichmentSource === 'MANUAL') {
    penalise(10, 'Property details were entered by hand rather than from records.');
  }

  const notSure = answers.notSure ?? [];
  let costDriving = 0;
  for (const q of notSure) {
    if (COST_DRIVING_QUESTIONS.has(q)) {
      costDriving += 1;
      score -= 6;
    } else {
      score -= 2;
    }
  }
  if (costDriving > 0) {
    reasons.push(
      `${costDriving} question${costDriving > 1 ? 's' : ''} that materially affect${costDriving > 1 ? '' : 's'} cost ${costDriving > 1 ? 'were' : 'was'} answered "not sure".`
    );
    wouldTighten.push('Settling the questions you were unsure about');
  }

  if (!answers.scopeLevel) {
    penalise(12, 'How much you are changing has not been confirmed.', 'Confirming how much of the space is changing');
  }

  if (answers.mode === 'C') {
    if (answers.landStatus === 'searching') {
      penalise(20, 'No specific lot has been identified yet.', 'Identifying the lot');
    }
    if (answers.slope === 'unknown' || answers.utilitiesAtStreet === 'unknown') {
      penalise(10, 'Slope or utility availability at the site is not yet known.', 'Confirming site slope and utility connections');
    }
  }

  if (property.yearBuilt && property.yearBuilt < 1965 && notSure.length > 0) {
    penalise(
      8,
      'Homes of this era vary widely in condition, and we do not yet have detail on yours.',
      'A walkthrough of existing conditions'
    );
  }

  if (calibrationJobs > 0 && calibrationJobs < 8) {
    penalise(10, 'We have limited completed-project history for this specific project type.');
  }

  if (property.serviceAreaBand === 'outside') {
    penalise(5, 'The property sits outside our core service area.');
  }

  score = Math.max(0, Math.min(100, score));

  let label = labelFor(score);
  // § 1A.4, a Phase 1 estimate can never present itself as statistically fit.
  if (phase1 && label === 'Strong') {
    label = 'Good';
    reasons.push(
      'This range reflects what Timber and Love projects of this scope typically run, rather than a statistical fit against completed projects.'
    );
  }

  const inputsTotal = 8;
  const inputsUsed = Math.max(0, inputsTotal - notSure.length - (property.enrichmentSource === 'NONE' ? 2 : 0));

  return {
    score,
    label,
    bandWidth: bandWidthFor(label),
    inputsUsed: Math.min(inputsUsed, inputsTotal),
    inputsTotal,
    reasons,
    wouldTighten,
  };
}

function labelFor(score: number): ConfidenceLabel {
  if (score >= 85) return 'Strong';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Directional';
  return 'Early';
}

/** § 7.2: band width is derived from confidence, never chosen for comfort. */
export function bandWidthFor(label: ConfidenceLabel): number {
  switch (label) {
    case 'Strong':
      return 0.12;
    case 'Good':
      return 0.18;
    case 'Directional':
      return 0.25;
    case 'Early':
      return 0.35;
  }
}

/**
 * § 7.2: below 40, no range is shown at all. A ±35% band on a $400,000
 * project spans $260,000 to $540,000, which is not information.
 */
export function isTooUncertainToPublish(score: number): boolean {
  return score < 40;
}
