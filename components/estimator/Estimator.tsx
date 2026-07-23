'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  projectCategories,
  finishLevels,
  sizeBands,
  investmentRanges,
  PRICING_APPROVED,
} from '@/lib/estimator/config';
import { calculateEstimate, formatRange, type EstimatorAnswers } from '@/lib/estimator/calculate';
import { Field, RadioCard, CheckGroup, RadioList, ChipRow } from '@/components/forms/primitives';

const STORAGE_KEY = 'tl-estimator-v1';

/** The estimator presents its option lists stacked rather than two-up. */
function RadioListCol(props: { options: string[]; value?: string; onChange: (v: string) => void }) {
  return <RadioList name="col" columns={1} {...props} />;
}

const REMODEL_SCOPE: { value: string; label: string }[] = [
  { value: 'structural-changes', label: 'Structural changes' },
  { value: 'wall-removal', label: 'Wall removal' },
  { value: 'kitchen-relocation', label: 'Kitchen relocation' },
  { value: 'bathroom-relocation', label: 'Bathroom relocation' },
  { value: 'new-cabinetry', label: 'New cabinetry' },
  { value: 'new-countertops', label: 'New countertops' },
  { value: 'electrical-updates', label: 'Electrical updates' },
  { value: 'plumbing-updates', label: 'Plumbing updates' },
  { value: 'hvac-changes', label: 'HVAC changes' },
  { value: 'windows-doors', label: 'Windows and exterior doors' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'exterior-changes', label: 'Exterior changes' },
  { value: 'custom-millwork', label: 'Custom millwork' },
  { value: 'fireplace', label: 'Fireplace' },
  { value: 'lighting-design', label: 'Lighting design' },
];

const BUILD_SCOPE: { value: string; label: string }[] = [
  { value: 'custom-millwork', label: 'Specialty millwork' },
  { value: 'new-cabinetry', label: 'Custom cabinetry' },
  { value: 'outdoor-living', label: 'Outdoor living' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'pool-spa', label: 'Pool or spa' },
  { value: 'smart-home', label: 'Smart-home systems' },
  { value: 'energy-efficiency', label: 'Energy-efficiency upgrades' },
  { value: 'lighting-design', label: 'Lighting design' },
];

const CONDITIONS: { value: string; label: string }[] = [
  { value: 'structural-concerns', label: 'Known structural concerns' },
  { value: 'water-damage', label: 'Water damage' },
  { value: 'electrical-panel', label: 'Electrical panel updates' },
  { value: 'plumbing-replacement', label: 'Plumbing replacement' },
  { value: 'foundation-concerns', label: 'Foundation concerns' },
  { value: 'asbestos-lead', label: 'Asbestos or lead concerns' },
  { value: 'historic-home', label: 'Historic-home conditions' },
  { value: 'difficult-access', label: 'Difficult site access' },
  { value: 'steep-lot', label: 'Steep or constrained lot' },
];

const SERVICES: { value: string; label: string }[] = [
  { value: 'architectural-design', label: 'Full architectural design' },
  { value: 'interior-design', label: 'Interior design' },
  { value: 'space-planning', label: 'Space planning' },
  { value: 'permit-coordination', label: 'Permit coordination' },
  { value: 'engineering-coordination', label: 'Engineering coordination' },
];

const TIMING = ['As soon as practical', 'Within 3 months', 'Within 3 to 6 months', 'Within 6 to 12 months', 'More than 12 months away', 'Just researching'];

type StepId = 'category' | 'location' | 'size' | 'scope' | 'finish' | 'conditions' | 'services' | 'timing' | 'investment' | 'details' | 'result';

const STEPS: { id: StepId; title: string }[] = [
  { id: 'category', title: 'Project Type' },
  { id: 'location', title: 'Property Location' },
  { id: 'size', title: 'Project Size' },
  { id: 'scope', title: 'Project Scope' },
  { id: 'finish', title: 'Finish Level' },
  { id: 'conditions', title: 'Existing Conditions' },
  { id: 'services', title: 'Design Services' },
  { id: 'timing', title: 'Timing' },
  { id: 'investment', title: 'Investment Comfort' },
  { id: 'details', title: 'Project Details' },
  { id: 'result', title: 'Your Preliminary Range' },
];

export default function Estimator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<EstimatorAnswers>({});
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const hydrated = useRef(false);

  // Restore any saved progress on mount (session-preserving).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  // Persist answers as they change.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  // Move focus to the step heading on navigation (accessible step changes).
  useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  const step = STEPS[stepIndex];
  const isBuild = useMemo(
    () => projectCategories.find((c) => c.key === answers.category)?.kind === 'build',
    [answers.category]
  );

  const set = (patch: Partial<EstimatorAnswers>) => setAnswers((a) => ({ ...a, ...patch }));
  const toggle = (key: 'scope' | 'conditions' | 'services', value: string) =>
    setAnswers((a) => {
      const cur = new Set(a[key] ?? []);
      cur.has(value) ? cur.delete(value) : cur.add(value);
      return { ...a, [key]: Array.from(cur) };
    });

  // Per-step "can continue" gate.
  const canContinue = (() => {
    switch (step.id) {
      case 'category':
        return !!answers.category;
      case 'location':
        return !!(answers.city || answers.zip);
      case 'size':
        return !!answers.size;
      case 'finish':
        return !!answers.finish;
      default:
        return true; // optional steps
    }
  })();

  const result = useMemo(() => (step.id === 'result' ? calculateEstimate(answers) : null), [step.id, answers]);
  const progress = Math.round((stepIndex / (STEPS.length - 1)) * 100);

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));
  const restart = () => {
    setAnswers({});
    setStepIndex(0);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  // Carry answers into the project inquiry (handoff, no re-asking).
  const inquiryHref = useMemo(() => {
    const p = new URLSearchParams();
    if (answers.category) p.set('category', answers.category);
    if (answers.size) p.set('size', answers.size);
    if (answers.finish) p.set('finish', answers.finish);
    if (answers.city) p.set('city', answers.city);
    if (answers.timing) p.set('timing', answers.timing);
    if (result?.range) p.set('range', `${result.range.low}-${result.range.high}`);
    return `/design-and-build-questionnaire/?${p.toString()}`;
  }, [answers, result]);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-text-muted">
        <span>
          Step {Math.min(stepIndex + 1, STEPS.length)} of {STEPS.length}
        </span>
        <span>{step.title}</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded bg-surface" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-8" aria-live="polite">
        <fieldset className="border-0 p-0">
          <legend className="w-full">
            <h2 ref={headingRef} tabIndex={-1} className="h-card outline-none">
              {stepTitle(step.id, answers)}
            </h2>
          </legend>

          <div className="mt-6">
            {step.id === 'category' && (
              <CardGroup
                name="category"
                options={projectCategories.map((c) => ({ value: c.key, label: c.label }))}
                selected={answers.category}
                onSelect={(v) => set({ category: v as EstimatorAnswers['category'] })}
              />
            )}

            {step.id === 'location' && (
              <div className="space-y-4">
                <Field label="City">
                  <input className="field-input" aria-label="City" value={answers.city ?? ''} onChange={(e) => set({ city: e.target.value })} autoComplete="address-level2" />
                </Field>
                <Field label="ZIP code">
                  <input className="field-input" aria-label="ZIP code" inputMode="numeric" value={answers.zip ?? ''} onChange={(e) => set({ zip: e.target.value })} autoComplete="postal-code" />
                </Field>
                <Field label="Do you currently own the property?">
                  <ChipRow options={['Yes', 'No', 'Under contract']} value={answers.owns} onChange={(v) => set({ owns: v })} />
                </Field>
                <label className="flex items-center gap-3 text-sm text-text-secondary">
                  <input type="checkbox" checked={!!answers.occupied} onChange={(e) => set({ occupied: e.target.checked })} />
                  The home is occupied during the project
                </label>
              </div>
            )}

            {step.id === 'size' && (
              <CardGroup
                name="size"
                options={sizeBands.map((s) => ({ value: s.key, label: s.label }))}
                selected={answers.size}
                onSelect={(v) => set({ size: v as EstimatorAnswers['size'] })}
              />
            )}

            {step.id === 'scope' && (
              <CheckGroup options={isBuild ? BUILD_SCOPE : REMODEL_SCOPE} selected={answers.scope ?? []} onToggle={(v) => toggle('scope', v)} />
            )}

            {step.id === 'finish' && (
              <div className="grid gap-3">
                {finishLevels.map((f) => (
                  <RadioCard key={f.key} name="finish" ariaLabel={f.label} checked={answers.finish === f.key} onChange={() => set({ finish: f.key })}>
                    <span className="block text-sm tracking-[0.1em] text-cream">{f.label}</span>
                    <span className="mt-1 block text-xs leading-snug text-text-muted">{f.blurb}</span>
                  </RadioCard>
                ))}
              </div>
            )}

            {step.id === 'conditions' && (
              <CheckGroup
                options={[...CONDITIONS, { value: 'not-sure', label: 'Not sure' }]}
                selected={answers.conditions ?? []}
                onToggle={(v) => toggle('conditions', v)}
              />
            )}

            {step.id === 'services' && (
              <CheckGroup
                options={[...SERVICES, { value: 'not-sure', label: 'Not sure' }]}
                selected={answers.services ?? []}
                onToggle={(v) => toggle('services', v)}
              />
            )}

            {step.id === 'timing' && <RadioListCol options={TIMING} value={answers.timing} onChange={(v) => set({ timing: v })} />}

            {step.id === 'investment' && (
              <>
                <p className="mb-4 text-sm text-text-secondary">
                  This helps us compare your goals with the likely project scope. It does not lock you into a budget or
                  create a formal estimate.
                </p>
                <RadioListCol options={investmentRanges} value={answers.investment} onChange={(v) => set({ investment: v })} />
              </>
            )}

            {step.id === 'details' && (
              <Field label="Anything else about your goals? (optional)">
                <textarea className="field-input min-h-[120px]" value={answers.details ?? ''} onChange={(e) => set({ details: e.target.value })} />
              </Field>
            )}

            {step.id === 'result' && result && (
              <ResultView result={result} answers={answers} inquiryHref={inquiryHref} onRestart={restart} onBack={goBack} />
            )}
          </div>
        </fieldset>
      </div>

      {/* Navigation (hidden on the result step, which has its own actions) */}
      {step.id !== 'result' && (
        <div className="sticky bottom-16 z-10 mt-10 flex items-center justify-between gap-4 border-t border-border-subtle bg-bg-primary/95 py-4 backdrop-blur xl:bottom-0">
          <button onClick={goBack} disabled={stepIndex === 0} className="btn-secondary disabled:opacity-40">
            Back
          </button>
          <button onClick={goNext} disabled={!canContinue} className="btn-primary disabled:opacity-40" data-track={`estimator_step_${step.id}`}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

function stepTitle(id: StepId, a: EstimatorAnswers): string {
  switch (id) {
    case 'category':
      return 'What type of project are you considering?';
    case 'location':
      return 'Where is the property?';
    case 'size':
      return 'About how large is the project?';
    case 'scope':
      return 'What does the project involve?';
    case 'finish':
      return 'Which finish level fits your expectations?';
    case 'conditions':
      return 'Any known existing conditions?';
    case 'services':
      return 'Which services do you expect us to provide?';
    case 'timing':
      return 'When would you ideally like to begin?';
    case 'investment':
      return 'What investment range are you considering?';
    case 'details':
      return 'Tell us a little more';
    case 'result':
      return 'Your Preliminary Project Range';
    default:
      return '';
  }
}

/* ---------- Presentational sub-components ---------- */

function CardGroup({
  name,
  options,
  selected,
  onSelect,
}: {
  name: string;
  options: { value: string; label: string }[];
  selected?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => (
        <RadioCard key={o.value} name={name} ariaLabel={o.label} checked={selected === o.value} onChange={() => onSelect(o.value)}>
          <span className="text-sm tracking-[0.08em] text-cream">{o.label}</span>
        </RadioCard>
      ))}
    </div>
  );
}

function ResultView({
  result,
  answers,
  inquiryHref,
  onRestart,
  onBack,
}: {
  result: ReturnType<typeof calculateEstimate>;
  answers: EstimatorAnswers;
  inquiryHref: string;
  onRestart: () => void;
  onBack: () => void;
}) {
  const { scenario, range } = result;

  if (scenario === 'outside-area' || scenario === 'insufficient') {
    return (
      <div className="surface-card p-6 text-center" aria-live="polite">
        <p className="text-lead">
          {scenario === 'outside-area'
            ? 'Your location may be outside our current service area.'
            : 'We could not generate a reliable range from the information provided.'}
        </p>
        <p className="mt-3 text-sm text-text-secondary">{result.nextStep}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact/" className="btn-primary" data-track="estimator_general_inquiry">Send a General Inquiry</Link>
          <button onClick={onBack} className="btn-secondary">Adjust My Answers</button>
        </div>
      </div>
    );
  }

  return (
    <div aria-live="polite">
      {!PRICING_APPROVED && (
        <p className="mb-4 border border-error/40 bg-error/10 px-4 py-3 text-xs uppercase tracking-[0.12em] text-error">
          Preliminary placeholder pricing, pending business confirmation before launch.
        </p>
      )}

      <div className="surface-card p-6 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Your preliminary project range</p>
        <p className="mt-3 text-3xl text-cream sm:text-4xl">{formatRange(range)}</p>
        <p className="mt-3 text-sm text-text-secondary">{result.contingencyNote}</p>
        {result.designRange && (
          <p className="mt-2 text-xs text-text-muted">
            Estimated design and preconstruction: {formatRange(result.designRange)} · Construction:{' '}
            {formatRange(result.constructionRange)}
          </p>
        )}
        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-muted">Confidence: {result.confidence}</p>
      </div>

      {result.factors.length > 0 && (
        <div className="mt-6">
          <p className="field-label">Major factors influencing the range</p>
          <ul className="mt-3 grid gap-2 text-sm text-text-secondary sm:grid-cols-2">
            {result.factors.map((f) => (
              <li key={f} className="flex items-start gap-2"><span aria-hidden="true" className="text-accent">·</span>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <p className="field-label">What this range may not include</p>
        <ul className="mt-3 space-y-1 text-sm text-text-muted">
          {result.exclusions.map((e) => (
            <li key={e}>· {e}</li>
          ))}
        </ul>
      </div>

      <p className="mt-6 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-muted">
        This range is based on the details you provided and typical projects of a similar scope. It is not a proposal,
        bid, appraisal, or guaranteed price. Final pricing requires a property review, design development, selections,
        engineering, trade input, and confirmation of existing conditions.
      </p>

      {/* The most common reaction to a range is "that is more than I expected".
          Financing answers that objection, so it belongs here rather than only
          on a page the visitor has to go looking for. */}
      <div className="surface-card mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="h-card-sm">More Than You Expected?</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
            Most projects are phased or financed. See how homeowners structure an investment like this one.
          </p>
        </div>
        <Link href="/financing/" className="btn-secondary shrink-0" data-track="estimator_financing">
          See Financing Options
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={inquiryHref} className="btn-primary" data-track="estimator_continue_inquiry">
          Continue to Project Inquiry
        </Link>
        <button onClick={() => window.print()} className="btn-secondary" data-track="estimator_print">
          Print Summary
        </button>
        <button onClick={onRestart} className="text-sm uppercase tracking-[0.14em] text-text-muted link-underline">
          Start Over
        </button>
      </div>
    </div>
  );
}
