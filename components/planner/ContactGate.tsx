'use client';

import { useState } from 'react';

/**
 * The contact gate. Spec Part II § 6.
 *
 * Placed after the last question and before any figure, per the requirement.
 * The design intent is that it reads as a delivery rather than a paywall: the
 * blurred preview shows the real shape of the answer with the digits obscured,
 * because showing that the answer exists and is one tap away is what converts.
 * A generic lock icon does the opposite.
 */

export type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** How the homeowner would rather hear back. Defaults to email. */
  preferredContact: string;
  /** Optional free-text detail the homeowner wants the team to have. */
  notes: string;
  /** Project address. Prefilled from the flow's lookup, or asked here when the
   *  flow never captured one (new construction / land). */
  address: string;
};

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'phone' | 'address', string>>;

export default function ContactGate({
  onSubmit,
  submitting,
  pricingLive = false,
  knownAddress,
  addressRequired = true,
}: {
  onSubmit: (c: ContactDetails) => void;
  submitting: boolean;
  /** Whether an approved range exists to reveal. Drives the promise made here. */
  pricingLive?: boolean;
  /** Address already captured earlier in the flow, if any. When set, the gate
   *  confirms it instead of asking again. */
  knownAddress?: string;
  /** Whether the address is mandatory. True for every project type except a new
   *  build, where there is often no address yet. */
  addressRequired?: boolean;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [values, setValues] = useState<ContactDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    notes: '',
    address: knownAddress ?? '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: keyof ContactDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  function validate(v: ContactDetails): Errors {
    const errs: Errors = {};
    if (!v.firstName.trim()) errs.firstName = 'Please add your first name.';
    if (!v.lastName.trim()) errs.lastName = 'Please add your last name.';

    // Forgiving on format, strict on shape. A typo'd email is a lost lead.
    if (!v.email.trim()) errs.email = 'Please add your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errs.email = 'That email address looks incomplete.';

    // Accept any format; normalisation to E.164 happens server-side.
    const digits = v.phone.replace(/\D/g, '');
    if (!digits) errs.phone = 'Please add a phone number.';
    else if (digits.length < 10) errs.phone = 'That number looks too short.';

    // Address is mandatory for every project type except a new build. If the
    // flow already captured it we confirm rather than re-ask.
    if (addressRequired && !knownAddress && !v.address.trim()) errs.address = 'Please add the project address.';

    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(values);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
      {/* The preview: real shape, obscured digits. Compact on mobile (secondary
          lines hidden) so the form and its button stay above the fold. Sticks
          near the top on desktop so it aligns with the heading rather than
          floating in the middle of the taller form column. */}
      <div aria-hidden="true" className="surface-card select-none p-5 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
        {!pricingLive ? (
          <PreviewSummary />
        ) : (
        <>
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Planning Investment Range</p>
        <p className="mt-3 blur-[7px] sm:mt-4">
          <span className="stat-figure">$000,000</span>
          <span className="mx-3 text-2xl text-text-muted">-</span>
          <span className="stat-figure">$000,000</span>
        </p>
        <div className="mt-4 flex items-center gap-2 sm:mt-6">
          <span className="text-cream">●●●○</span>
          <span className="blur-[4px] text-sm text-text-secondary">Confidence: Good</span>
        </div>
        <p className="mt-6 hidden blur-[5px] text-sm text-text-secondary sm:block">Estimated duration: 00 to 00 weeks</p>
        </>
        )}
      </div>

      <div>
        <h2 className="h-card sm:h-section">{pricingLive ? 'Your planning range is ready.' : 'Your project summary is ready.'}</h2>
        <p className="mt-3 max-w-md text-sm text-text-secondary sm:text-lead sm:mt-5">
          {pricingLive
            ? 'Where should we send it? One email with your report, and a call only if you ask.'
            : 'We will send a copy you can keep, and a member of our team will follow up with your investment range.'}
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3.5">
          {knownAddress ? (
            <div className="border border-border-subtle bg-surface/40 px-4 py-2.5">
              <p className="field-label">Project address</p>
              <p className="mt-0.5 text-sm text-cream">{knownAddress}</p>
            </div>
          ) : (
            <Field
              label={addressRequired ? 'Project address' : 'Project location (optional)'}
              name="address"
              value={values.address}
              onChange={set('address')}
              error={errors.address}
              autoComplete="street-address"
            />
          )}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="First name" name="firstName" value={values.firstName} onChange={set('firstName')} error={errors.firstName} autoComplete="given-name" />
            <Field label="Last name" name="lastName" value={values.lastName} onChange={set('lastName')} error={errors.lastName} autoComplete="family-name" />
          </div>
          <Field label="Email" name="email" type="email" value={values.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          <Field label="Phone" name="phone" type="tel" value={values.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />

          <fieldset>
            <legend className="field-label">Preferred contact method</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
                { value: 'text', label: 'Text' },
              ].map((o) => {
                const active = values.preferredContact === o.value;
                return (
                  <label
                    key={o.value}
                    className={`cursor-pointer border px-3 py-2.5 text-center text-sm transition-colors ${active ? 'border-cream bg-cream text-ink' : 'border-border-subtle text-cream hover:border-cream/60'}`}
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={o.value}
                      checked={active}
                      onChange={set('preferredContact')}
                      className="sr-only"
                    />
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Notes stay collapsed so the submit button is always in view; the
              homeowner can expand them without leaving the step. */}
          {showNotes ? (
            <div>
              <label htmlFor="gate-notes" className="field-label">
                Anything else? <span className="text-text-muted">(optional)</span>
              </label>
              <textarea
                id="gate-notes"
                name="notes"
                rows={2}
                value={values.notes}
                onChange={set('notes')}
                placeholder="Priorities, must-haves, questions, timing"
                className="field-input mt-2 resize-none"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowNotes(true)}
              className="link-underline text-sm text-text-muted"
            >
              + Add a note (optional)
            </button>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Preparing…' : pricingLive ? 'See my planning range' : 'Show my project summary'}
          </button>

          {/* A statement, not a checkbox that blocks submission. */}
          <p className="text-center text-xs leading-relaxed text-text-muted">
            We do not sell your information. One email with your report, and a call only if you ask for one.
          </p>
        </form>
      </div>
    </div>
  );
}

/** Shown when no figure is coming: previews the summary, promises nothing false. */
function PreviewSummary() {
  return (
    <>
      <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Your Project Summary</p>
      <ul className="mt-5 space-y-3 text-sm text-text-secondary">
        <li>· What we understand about your project</li>
        <li>· The questions worth settling</li>
        <li>· What happens next, and when</li>
      </ul>
      <p className="mt-6 text-sm text-text-muted">Your investment range comes from your project manager.</p>
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
}) {
  const id = `gate-${name}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className="field-input mt-2"
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
