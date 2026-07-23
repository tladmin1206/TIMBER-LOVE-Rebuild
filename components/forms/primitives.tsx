'use client';

/**
 * Shared form primitives for the estimator and the project inquiry.
 *
 * Both flows previously implemented these independently and had already
 * drifted, so the site's two highest-intent surfaces did not feel like the same
 * product. The selected-state treatment in particular is defined once here:  * it is the whole affordance for these controls.
 */

/**
 * Selected / focus treatment shared by every option control.
 *
 * The selected state is driven from React state rather than Tailwind's
 * `peer-checked:` variant. The variant approach silently lost the cascade to
 * the base `border-border-subtle`: selected options rendered identically to
 * unselected ones, so the entire affordance was invisible on both the estimator
 * and the project inquiry. Resolving classes here keeps the state explicit and
 * immune to utility-ordering changes.
 */
const OPTION_BASE = 'transition-colors border';
const OPTION_OFF = 'border-border-subtle';
const OPTION_ON = 'border-accent bg-accent-soft';
const OPTION_FOCUS =
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-focus';

function optionClass(selected: boolean, extra = '') {
  return `${OPTION_BASE} ${selected ? OPTION_ON : OPTION_OFF} ${OPTION_FOCUS} ${extra}`.trim();
}

export function FieldError({ id, msg }: { id?: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="field-error mt-2" role="alert">
      {msg}
    </p>
  );
}

/** Labelled field wrapper. */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

/** A single radio rendered as a selectable card. */
export function RadioCard({
  name,
  checked,
  onChange,
  ariaLabel,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        className="peer sr-only"
      />
      <span className={optionClass(checked, "block p-4")}>{children}</span>
    </label>
  );
}

/** A radiogroup over plain string options. */
export function RadioList({
  name,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: {
  name: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  error?: string;
  /** 1 for a stacked column, 2 for a two-up grid from `sm` upward. */
  columns?: 1 | 2;
}) {
  return (
    <div role="radiogroup" aria-invalid={!!error} className={`grid gap-2 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {options.map((o) => (
        <RadioCard key={o} name={name} ariaLabel={o} checked={value === o} onChange={() => onChange(o)}>
          <span className="text-sm text-cream">{o}</span>
        </RadioCard>
      ))}
    </div>
  );
}

/** A horizontal row of single-select chips. */
export function ChipRow({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div>
      {label && <span className="field-label mb-2 block">{label}</span>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={`border px-4 py-2 text-sm transition-colors ${
              value === o
                ? 'border-accent bg-accent-soft text-cream'
                : 'border-border-subtle text-text-secondary hover:border-cream'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A multi-select grid of checkboxes. */
export function CheckGroup({
  options,
  selected,
  onToggle,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const on = selected.includes(o.value);
        return (
          <label key={o.value} className="cursor-pointer">
            <input
              type="checkbox"
              checked={on}
              onChange={() => onToggle(o.value)}
              aria-label={o.label}
              className="peer sr-only"
            />
            <span className={optionClass(on, `flex items-center gap-3 p-3 text-sm ${on ? 'text-cream' : 'text-text-secondary'}`)}>
              <span
                aria-hidden="true"
                className={`grid h-4 w-4 place-items-center border ${
                  on ? 'border-cream bg-cream text-ink' : 'border-border-subtle'
                }`}
              >
                {on ? '✓' : ''}
              </span>
              {o.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
