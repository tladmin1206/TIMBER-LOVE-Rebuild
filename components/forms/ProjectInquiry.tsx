'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Spinner from '@/components/ui/Spinner';
import { scrollToStep } from '@/lib/scrollToStep';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FieldError, RadioList, ChipRow } from '@/components/forms/primitives';

const STORAGE_KEY = 'tl-inquiry-v1';
const MAX_FILE_MB = 10;
const MAX_FILES = 8;
const ACCEPT = 'image/png,image/jpeg,image/webp,application/pdf';

const PROJECT_TYPES = [
  'Whole-home remodel',
  'Kitchen or main living areas',
  'Addition',
  'New custom home',
  'New construction',
  'Residential development',
  'Other',
];
const HOME_SIZES = ['Under 1,000 sq ft', '1,000 to 2,000 sq ft', '2,000 to 3,000 sq ft', 'More than 3,000 sq ft', 'Not sure'];
const TIMING = ['As soon as practical', 'Within 3 to 6 months', 'Within 6 to 12 months', 'More than 12 months away', 'Just researching'];
const INVESTMENT = ['Under $75,000', '$75,000 to $150,000', '$150,000 to $300,000', '$300,000 to $600,000', 'More than $600,000', 'Prefer not to say', 'I need help understanding what is realistic'];
const CONTACT_METHODS = ['Email', 'Phone', 'Text'];

type FileMeta = { name: string; size: number; type: string; previewUrl?: string };
type Answers = {
  projectType?: string;
  address?: string;
  city?: string;
  zip?: string;
  owns?: string;
  occupied?: boolean;
  homeSize?: string;
  goals?: string;
  details?: string;
  timing?: string;
  investment?: string;
  financing?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  contactMethod?: string;
  bestTime?: string;
  consent?: boolean;
};

type StepId = 'type' | 'location' | 'goals' | 'timing' | 'investment' | 'contact' | 'files' | 'review';
const STEPS: { id: StepId; title: string }[] = [
  { id: 'type', title: 'Project Type' },
  { id: 'location', title: 'Property & Location' },
  { id: 'goals', title: 'Project Goals' },
  { id: 'timing', title: 'Timing' },
  { id: 'investment', title: 'Investment' },
  { id: 'contact', title: 'Contact Information' },
  { id: 'files', title: 'Photos & Plans' },
  { id: 'review', title: 'Review & Submit' },
];

const emailValid = (e?: string) => !!e && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

export default function ProjectInquiry() {
  const searchParams = useSearchParams();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const hydrated = useRef(false);

  // Restore progress + apply any estimator handoff params.
  useEffect(() => {
    let restored: Answers = {};
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) restored = JSON.parse(raw);
    } catch {
      /* ignore */
    }
    // Estimator handoff (do not re-ask what we already know).
    const cat = searchParams.get('category');
    const size = searchParams.get('size');
    const city = searchParams.get('city');
    const timing = searchParams.get('timing');
    const range = searchParams.get('range');
    if (cat && !restored.projectType) restored.projectType = mapCategory(cat);
    if (size && !restored.homeSize) restored.homeSize = mapSize(size);
    if (city && !restored.city) restored.city = city;
    if (timing && !restored.timing) restored.timing = timing;
    if (range && !restored.details) {
      const [lo, hi] = range.split('-').map((n) => parseInt(n, 10));
      if (Number.isFinite(lo) && Number.isFinite(hi)) restored.details = `Preliminary estimate range: $${lo.toLocaleString()} to $${hi.toLocaleString()}.`;
    }
    setAnswers(restored);
    hydrated.current = true;
  }, [searchParams]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  // Each step scrolls its heading clear of the sticky header, then takes focus.
  useEffect(() => {
    scrollToStep(headingRef.current);
  }, [stepIndex, status]);

  const step = STEPS[stepIndex];
  const set = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const validateStep = (id: StepId): Record<string, string> => {
    const e: Record<string, string> = {};
    if (id === 'type' && !answers.projectType) e.projectType = 'Please choose a project type.';
    if (id === 'contact') {
      if (!answers.firstName?.trim()) e.firstName = 'Please enter your first name.';
      if (!emailValid(answers.email)) e.email = 'Please enter a valid email address.';
    }
    if (id === 'review' && !answers.consent) e.consent = 'Please confirm to continue.';
    return e;
  };

  const goNext = () => {
    const e = validateStep(step.id);
    setErrors(e);
    if (Object.keys(e).length) {
      // Move focus to the first errored field.
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };
  const goBack = () => {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
  };
  const goTo = (i: number) => {
    setErrors({});
    setStepIndex(i);
  };

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const next: FileMeta[] = [...files];
    const rejected: string[] = [];
    Array.from(list).forEach((f) => {
      if (next.length >= MAX_FILES) return;
      if (!ACCEPT.split(',').includes(f.type)) {
        rejected.push(`${f.name} (unsupported type)`);
        return;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        rejected.push(`${f.name} (over ${MAX_FILE_MB}MB)`);
        return;
      }
      next.push({ name: f.name, size: f.size, type: f.type, previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined });
    });
    setFiles(next);
    setErrors((prev) => ({ ...prev, files: rejected.length ? `Skipped: ${rejected.join(', ')}` : '' }));
  };
  const removeFile = (name: string) =>
    setFiles((prev) => {
      const target = prev.find((f) => f.name === name);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.name !== name);
    });

  const summaryText = useMemo(() => buildSummary(answers, files), [answers, files]);

  const submit = async () => {
    const e = validateStep('review');
    setErrors(e);
    if (Object.keys(e).length) return;
    if (status === 'submitting') return; // prevent duplicate submits
    setStatus('submitting');
    setSubmitError('');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: answers.firstName,
          lastName: answers.lastName,
          email: answers.email,
          phone: answers.phone,
          source: 'design-build-questionnaire',
          message: summaryText,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      (window as any).gtag?.('event', 'inquiry_submitted', { event_category: 'form', source: 'design-build-questionnaire' });
    } catch {
      setStatus('error');
      setSubmitError('Something went wrong sending your inquiry. Please try again, or call (208) 995-9516.');
    }
  };

  if (status === 'success') {
    return <SuccessScreen headingRef={headingRef} answers={answers} />;
  }

  const progress = Math.round((stepIndex / (STEPS.length - 1)) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-text-muted">
        <span>Step {stepIndex + 1} of {STEPS.length}</span>
        <span>{step.title}</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded bg-surface" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="w-full">
          <h2 ref={headingRef} tabIndex={-1} className="h-card outline-none">
            {stepTitle(step.id)}
          </h2>
        </legend>

        <div className="mt-6">
          {step.id === 'type' && (
            <>
              <RadioList name="projectType" options={PROJECT_TYPES} value={answers.projectType} onChange={(v) => set({ projectType: v })} error={errors.projectType} />
              <FieldError id="projectType-error" msg={errors.projectType} />
            </>
          )}

          {step.id === 'location' && (
            <div className="space-y-4">
              <TextField label="Property address (optional)" value={answers.address} onChange={(v) => set({ address: v })} autoComplete="street-address" />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="City" value={answers.city} onChange={(v) => set({ city: v })} autoComplete="address-level2" />
                <TextField label="ZIP code" value={answers.zip} onChange={(v) => set({ zip: v })} autoComplete="postal-code" />
              </div>
              <ChipRow label="Do you currently own the property?" options={['Yes', 'No', 'Under contract']} value={answers.owns} onChange={(v) => set({ owns: v })} />
              <Checkbox label="The home is occupied" checked={!!answers.occupied} onChange={(c) => set({ occupied: c })} />
              <ChipRow label="Approximate home size" options={HOME_SIZES} value={answers.homeSize} onChange={(v) => set({ homeSize: v })} />
            </div>
          )}

          {step.id === 'goals' && (
            <div className="space-y-4">
              <TextArea label="What would you like to change or accomplish?" value={answers.goals} onChange={(v) => set({ goals: v })} />
              <TextArea label="Anything else we should know? (optional)" value={answers.details} onChange={(v) => set({ details: v })} />
            </div>
          )}

          {step.id === 'timing' && <RadioList name="timing" options={TIMING} value={answers.timing} onChange={(v) => set({ timing: v })} />}

          {step.id === 'investment' && (
            <>
              <p className="mb-4 text-sm text-text-secondary">This helps us align on scope. It does not lock you into a budget.</p>
              <RadioList name="investment" options={INVESTMENT} value={answers.investment} onChange={(v) => set({ investment: v })} />
              <Checkbox label="I would like to learn about financing options" checked={!!answers.financing} onChange={(c) => set({ financing: c })} />
            </>
          )}

          {step.id === 'contact' && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="First name" required value={answers.firstName} onChange={(v) => set({ firstName: v })} error={errors.firstName} autoComplete="given-name" />
                <TextField label="Last name" value={answers.lastName} onChange={(v) => set({ lastName: v })} autoComplete="family-name" />
              </div>
              <TextField label="Email" required type="email" value={answers.email} onChange={(v) => set({ email: v })} error={errors.email} autoComplete="email" />
              <TextField label="Phone" type="tel" value={answers.phone} onChange={(v) => set({ phone: v })} autoComplete="tel" />
              <ChipRow label="Preferred contact method" options={CONTACT_METHODS} value={answers.contactMethod} onChange={(v) => set({ contactMethod: v })} />
              <TextField label="Best time to reach you (optional)" value={answers.bestTime} onChange={(v) => set({ bestTime: v })} />
            </div>
          )}

          {step.id === 'files' && (
            <FileStep files={files} onFiles={onFiles} onRemove={removeFile} error={errors.files} />
          )}

          {step.id === 'review' && (
            <ReviewStep answers={answers} files={files} onEdit={goTo} consent={!!answers.consent} onConsent={(c) => set({ consent: c })} consentError={errors.consent} />
          )}
        </div>
      </fieldset>

      {status === 'error' && <p className="mt-6 field-error" role="alert">{submitError}</p>}

      <div className="sticky bottom-16 z-10 mt-10 flex items-center justify-between gap-4 border-t border-border-subtle bg-bg-primary/95 py-4 backdrop-blur xl:bottom-0">
        <button onClick={goBack} disabled={stepIndex === 0} className="btn-secondary disabled:opacity-40">Back</button>
        {step.id === 'review' ? (
          <button
            onClick={submit}
            disabled={status === 'submitting'}
            aria-busy={status === 'submitting'}
            className="btn-primary"
            data-track="inquiry_submit"
          >
            {status === 'submitting' && <Spinner />}
            {status === 'submitting' ? 'Sending…' : 'Submit Inquiry'}
          </button>
        ) : (
          <button onClick={goNext} className="btn-primary" data-track={`inquiry_step_${step.id}`}>Continue</button>
        )}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function mapCategory(cat: string): string {
  const m: Record<string, string> = {
    'whole-home-remodel': 'Whole-home remodel',
    'kitchen-living-remodel': 'Kitchen or main living areas',
    'primary-suite-remodel': 'Whole-home remodel',
    addition: 'Addition',
    'custom-home': 'New custom home',
    'new-construction': 'New construction',
  };
  return m[cat] || 'Other';
}
function mapSize(size: string): string {
  const m: Record<string, string> = {
    'under-500': 'Under 1,000 sq ft',
    '500-1000': 'Under 1,000 sq ft',
    '1001-2000': '1,000 to 2,000 sq ft',
    '2001-3000': '2,000 to 3,000 sq ft',
    'over-3000': 'More than 3,000 sq ft',
    'not-sure': 'Not sure',
  };
  return m[size] || 'Not sure';
}

function stepTitle(id: StepId): string {
  const m: Record<StepId, string> = {
    type: 'What type of project are you considering?',
    location: 'Where is the property?',
    goals: 'Tell us about your goals',
    timing: 'When would you like to begin?',
    investment: 'What investment range are you considering?',
    contact: 'How can we reach you?',
    files: 'Share photos or plans (optional)',
    review: 'Review and submit',
  };
  return m[id];
}

function buildSummary(a: Answers, files: FileMeta[]): string {
  const lines = [
    `Project type: ${a.projectType || '-'}`,
    `Location: ${[a.address, a.city, a.zip].filter(Boolean).join(', ') || '-'}`,
    `Owns property: ${a.owns || '-'}${a.occupied ? ' (occupied)' : ''}`,
    `Home size: ${a.homeSize || '-'}`,
    `Goals: ${a.goals || '-'}`,
    a.details ? `Details: ${a.details}` : '',
    `Timing: ${a.timing || '-'}`,
    `Investment: ${a.investment || '-'}${a.financing ? ' (interested in financing)' : ''}`,
    `Preferred contact: ${a.contactMethod || '-'}${a.bestTime ? `, best time ${a.bestTime}` : ''}`,
    files.length ? `Attachments the client will share: ${files.map((f) => f.name).join(', ')}` : '',
  ];
  return lines.filter(Boolean).join('\n');
}

/* ---------- field primitives ---------- */

function TextField({ label, value, onChange, required, type = 'text', error, autoComplete }: { label: string; value?: string; onChange: (v: string) => void; required?: boolean; type?: string; error?: string; autoComplete?: string }) {
  const id = label.replace(/\W+/g, '-').toLowerCase();
  return (
    <label className="block">
      <span className="field-label mb-2">{label}{required && <span aria-hidden="true" className="text-accent"> *</span>}</span>
      <input
        id={id}
        type={type}
        className="field-input"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
      />
      {error && <span id={`${id}-error`} className="field-error mt-1 block">{error}</span>}
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="field-label mb-2">{label}</span>
      <textarea className="field-input min-h-[110px]" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (c: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm text-text-secondary">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function FileStep({ files, onFiles, onRemove, error }: { files: FileMeta[]; onFiles: (l: FileList | null) => void; onRemove: (name: string) => void; error?: string }) {
  return (
    <div>
      <p className="text-sm text-text-secondary">Photos, plans, inspiration, or property documents help us understand your project. This step is optional.</p>
      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center border border-dashed border-border-subtle p-8 text-center transition-colors hover:border-cream">
        <input type="file" accept={ACCEPT} multiple className="sr-only" onChange={(e) => { onFiles(e.target.files); e.currentTarget.value = ''; }} />
        <span className="text-sm text-cream">Choose files</span>
        <span className="mt-1 text-xs text-text-muted">JPG, PNG, WEBP, or PDF · up to {MAX_FILE_MB}MB each · {MAX_FILES} max</span>
      </label>
      {error && <p className="field-error mt-2" role="alert">{error}</p>}
      {files.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {files.map((f) => (
            <li key={f.name} className="flex items-center gap-3 border border-border-subtle p-2 text-sm">
              {f.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.previewUrl} alt="" className="h-10 w-10 shrink-0 object-cover" />
              ) : (
                <span className="grid h-10 w-10 shrink-0 place-items-center bg-surface text-xs text-text-muted">PDF</span>
              )}
              <span className="min-w-0 flex-1 truncate text-text-secondary">{f.name}</span>
              <button type="button" onClick={() => onRemove(f.name)} aria-label={`Remove ${f.name}`} className="text-text-muted hover:text-cream">×</button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xs text-text-muted">Your files stay on this page. After you submit, our team will follow up to collect them securely.</p>
    </div>
  );
}

function ReviewStep({ answers, files, onEdit, consent, onConsent, consentError }: { answers: Answers; files: FileMeta[]; onEdit: (i: number) => void; consent: boolean; onConsent: (c: boolean) => void; consentError?: string }) {
  const rows: { label: string; value: string; step: number }[] = [
    { label: 'Project type', value: answers.projectType || '-', step: 0 },
    { label: 'Location', value: [answers.address, answers.city, answers.zip].filter(Boolean).join(', ') || '-', step: 1 },
    { label: 'Home size', value: answers.homeSize || '-', step: 1 },
    { label: 'Goals', value: answers.goals || '-', step: 2 },
    { label: 'Timing', value: answers.timing || '-', step: 3 },
    { label: 'Investment', value: answers.investment || '-', step: 4 },
    { label: 'Contact', value: [`${answers.firstName || ''} ${answers.lastName || ''}`.trim(), answers.email, answers.phone].filter(Boolean).join(' · ') || '-', step: 5 },
    { label: 'Attachments', value: files.length ? files.map((f) => f.name).join(', ') : 'None', step: 6 },
  ];
  return (
    <div>
      <dl className="divide-y divide-border-subtle border-y border-border-subtle">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-4 py-3 text-sm">
            <dt className="w-32 shrink-0 text-text-muted">{r.label}</dt>
            <dd className="min-w-0 flex-1 text-text-secondary">{r.value}</dd>
            <button type="button" onClick={() => onEdit(r.step)} className="shrink-0 text-xs uppercase tracking-[0.12em] text-accent link-underline">Edit</button>
          </div>
        ))}
      </dl>
      <label className="mt-6 flex items-start gap-3 text-sm text-text-secondary">
        <input type="checkbox" checked={consent} onChange={(e) => onConsent(e.target.checked)} aria-required aria-invalid={!!consentError} className="mt-1" />
        <span>I agree to be contacted by Timber and Love about my project and understand this is not a service agreement.</span>
      </label>
      {consentError && <p className="field-error mt-2" role="alert">{consentError}</p>}
    </div>
  );
}

function SuccessScreen({ headingRef, answers }: { headingRef: React.RefObject<HTMLHeadingElement>; answers: Answers }) {
  return (
    <div className="mx-auto max-w-2xl text-center" aria-live="polite">
      <p className="eyebrow">Inquiry Received</p>
      <h2 ref={headingRef} tabIndex={-1} className="h-section mt-4 outline-none">Thank You{answers.firstName ? `, ${answers.firstName}` : ''}</h2>
      <p className="text-lead mt-5">
        We have received your project details. A member of our team will review them and follow up
        {answers.contactMethod ? ` by ${answers.contactMethod.toLowerCase()}` : ''} about next steps.
      </p>
      <div className="mx-auto mt-8 max-w-md surface-card p-6 text-left text-sm text-text-secondary">
        <p className="field-label mb-3">What you can do next</p>
        <ul className="space-y-2">
          <li>· Gather any photos, plans, or inspiration you would like to share.</li>
          <li>· Think through your priorities and must-haves.</li>
          <li>· Browse our recent work for ideas.</li>
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/timber-and-love-gallery/" className="btn-secondary">View Our Projects</Link>
        <Link href="/design-and-build/" className="btn-secondary">Explore Design + Build</Link>
      </div>
    </div>
  );
}
