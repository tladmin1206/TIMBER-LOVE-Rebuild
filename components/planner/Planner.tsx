'use client';

import { useEffect, useRef, useState } from 'react';
import ScreenRenderer from '@/components/planner/ScreenRenderer';
import ContactGate, { type ContactDetails } from '@/components/planner/ContactGate';
import Results from '@/components/planner/Results';
import {
  answer,
  answerNotSure,
  consultationQuestions,
  emptyFlow,
  HYBRID_MESSAGE,
  progress,
  screensFor,
  type FlowState,
} from '@/lib/planner/flow/graph';
import type { Estimate, PlannerAnswers, PropertyFacts } from '@/lib/planner/types';

type Stage = 'questions' | 'gate' | 'results';

/**
 * Planner runtime. Spec Part II § 5.
 *
 * Holds the flow state, walks the derived screen sequence, gates on contact,
 * then renders results. Position is a plain index into a sequence recomputed
 * from the answers, which is what keeps back navigation lossless.
 */
export default function Planner() {
  const [flow, setFlow] = useState<FlowState>(emptyFlow);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>('questions');
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hybridNotice, setHybridNotice] = useState(false);

  const headingRef = useRef<HTMLDivElement | null>(null);
  const wasHybrid = useRef(false);

  const screens = screensFor(flow);
  const screen = screens[Math.min(index, screens.length - 1)];
  const { current, total } = progress(flow, index);

  // Move focus to the new screen so the flow is usable without a mouse.
  useEffect(() => {
    headingRef.current?.focus();
  }, [index, stage]);

  // § 3.2 — a hybrid branch changes the total, and that change is explained
  // rather than silently animating the progress number.
  useEffect(() => {
    if (flow.hybrid && !wasHybrid.current) {
      wasHybrid.current = true;
      setHybridNotice(true);
    }
  }, [flow.hybrid]);

  const value = flow.values[screen?.field ?? ''];
  const isNotSure = flow.notSure.includes(screen?.id ?? '');
  const canAdvance = value !== undefined || isNotSure || screen?.kind === 'address';

  function next() {
    setHybridNotice(false);
    if (index < screens.length - 1) setIndex(index + 1);
    else setStage('gate');
  }

  function back() {
    setHybridNotice(false);
    if (stage === 'gate') {
      setStage('questions');
      setIndex(screens.length - 1);
      return;
    }
    setIndex(Math.max(0, index - 1));
  }

  async function submit(contact: ContactDetails) {
    setSubmitting(true);
    setError(null);
    try {
      const answers = toAnswers(flow);
      const property = toProperty(flow);
      // Trailing slash matters: the site sets `trailingSlash: true`, so the
      // bare path 308-redirects and costs an extra round trip on submission.
      const res = await fetch('/api/planner/estimate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, property, contact }),
      });
      if (!res.ok) throw new Error('Request failed');
      setEstimate((await res.json()) as Estimate);
      setStage('results');
    } catch {
      setError(
        'We could not prepare your report just now. Please try again, or call us and we will walk you through it.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (stage === 'results' && estimate) {
    return (
      <div ref={headingRef} tabIndex={-1} className="outline-none">
        <Results estimate={estimate} consultationQuestions={consultationQuestions(flow)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* § 5.1 rule 6 — honest progress. */}
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-text-muted">
        <span>{stage === 'gate' ? 'Last step' : `${current} of ${total}`}</span>
        {stage === 'questions' && screen?.costDriving && <span>Affects your range</span>}
      </div>
      <div
        className="mt-3 h-1 w-full overflow-hidden bg-surface"
        role="progressbar"
        aria-valuenow={stage === 'gate' ? total : current}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${((stage === 'gate' ? total : current) / total) * 100}%` }}
        />
      </div>

      {hybridNotice && (
        <p className="alert mt-6" role="status">
          {HYBRID_MESSAGE}
        </p>
      )}

      <div ref={headingRef} tabIndex={-1} className="mt-10 outline-none">
        {stage === 'questions' && screen && (
          <ScreenRenderer
            screen={screen}
            value={value}
            isNotSure={isNotSure}
            onChange={(v) => setFlow(answer(flow, screen.id, screen.field, v))}
            onNotSure={() => setFlow(answerNotSure(flow, screen))}
          />
        )}

        {stage === 'gate' && <ContactGate onSubmit={submit} submitting={submitting} />}
      </div>

      {error && (
        <p className="field-error mt-6" role="alert">
          {error}
        </p>
      )}

      {stage === 'questions' && (
        <div className="mt-12 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={back}
            disabled={index === 0}
            className="link-underline text-sm text-text-muted disabled:invisible"
          >
            Back
          </button>
          <button type="button" onClick={next} disabled={!canAdvance} className="btn-primary disabled:opacity-50">
            {index === screens.length - 1 ? 'See my range' : 'Continue'}
          </button>
        </div>
      )}

      {stage === 'gate' && (
        <div className="mt-8">
          <button type="button" onClick={back} className="link-underline text-sm text-text-muted">
            Back
          </button>
        </div>
      )}
    </div>
  );
}

/** Map flow values onto the engine's answer shape. */
function toAnswers(flow: FlowState): PlannerAnswers {
  const v = flow.values as Record<string, unknown>;
  const rawType = String(v.projectType ?? '');
  return {
    mode: (v.mode as PlannerAnswers['mode']) ?? 'A',
    // Guest baths and multi-space projects have no band of their own; they are
    // normalised to the nearest type that does, and the engine widens the range.
    projectType: rawType === 'bathroom-guest' ? 'bathroom' : rawType === 'multiple' ? 'whole-home' : (rawType as PlannerAnswers['projectType']),
    scopeLevel: v.scopeLevel as PlannerAnswers['scopeLevel'],
    finishTier: v.finishTier as PlannerAnswers['finishTier'],
    goals: (v.goals as string[]) ?? [],
    lifestyle: (v.lifestyle as string[]) ?? [],
    timeline: v.timeline as string | undefined,
    notSure: flow.notSure,
    targetSqFt: v.targetSqFt as number | undefined,
  };
}

function toProperty(flow: FlowState): PropertyFacts {
  const v = flow.values as Record<string, unknown>;
  const site = (v.siteFactors as string[]) ?? [];
  const draft = v.propertyConfirmed as
    | { yearBuilt?: number; finishedSqFt?: number; bedrooms?: number; source?: string }
    | undefined;

  return {
    serviceAreaBand: 'core',
    // Enrichment is not wired yet, so anything we hold came from the homeowner.
    // Saying MANUAL rather than claiming a record source keeps the assumptions
    // block honest about where each figure came from.
    enrichmentSource: draft?.yearBuilt || draft?.finishedSqFt ? 'MANUAL' : 'NONE',
    yearBuilt: draft?.yearBuilt,
    finishedSqFt: draft?.finishedSqFt,
    bedrooms: draft?.bedrooms,
    occupiedDuringConstruction: true,
    difficultAccess: false,
    stories: 1,
    slope: undefined,
    ...(site.includes('slope') ? { difficultAccess: true } : {}),
  } as PropertyFacts;
}
