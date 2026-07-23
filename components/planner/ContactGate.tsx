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
};

type Errors = Partial<Record<keyof ContactDetails, string>>;

export default function ContactGate({
  onSubmit,
  submitting,
}: {
  onSubmit: (c: ContactDetails) => void;
  submitting: boolean;
}) {
  const [values, setValues] = useState<ContactDetails>({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: keyof ContactDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
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

    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(values);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
      {/* The preview: real shape, obscured digits. */}
      <div aria-hidden="true" className="surface-card select-none p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Planning Investment Range</p>
        <p className="mt-4 blur-[7px]">
          <span className="stat-figure">$000,000</span>
          <span className="mx-3 text-2xl text-text-muted">—</span>
          <span className="stat-figure">$000,000</span>
        </p>
        <p className="mt-6 blur-[5px] text-sm text-text-secondary">Typical for this project: $000,000</p>
        <div className="mt-6 flex items-center gap-2">
          <span className="text-cream">●●●○</span>
          <span className="blur-[4px] text-sm text-text-secondary">Confidence: Good</span>
        </div>
        <p className="mt-6 blur-[5px] text-sm text-text-secondary">Estimated duration: 00 to 00 weeks</p>
      </div>

      <div>
        <h2 className="h-section">Your planning report is ready.</h2>
        <p className="text-lead mt-5 max-w-md">
          We will send a copy you can keep, share with your partner, and bring to your consultation.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" name="firstName" value={values.firstName} onChange={set('firstName')} error={errors.firstName} autoComplete="given-name" />
            <Field label="Last name" name="lastName" value={values.lastName} onChange={set('lastName')} error={errors.lastName} autoComplete="family-name" />
          </div>
          <Field label="Email" name="email" type="email" value={values.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={set('phone')}
            error={errors.phone}
            autoComplete="tel"
            hint="So your project manager can reach you if you would like to talk it through."
          />

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Preparing your report…' : 'Show my planning report'}
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
