'use client';

import { useId } from 'react';
import type { Screen } from '@/lib/planner/flow/screens';
import AddressAutocomplete from '@/components/planner/AddressAutocomplete';
import type { AddressSuggestion } from '@/lib/planner/property/freeLookup';

/**
 * Renders one screen of the planner.
 *
 * Selected state is derived from React state rather than Tailwind's
 * `peer-checked` variant, for the reason documented in
 * components/forms/primitives.tsx: the variant lost the cascade to the base
 * border utility and selection became invisible.
 *
 * There is no dropdown branch here, and there is no input kind that would
 * produce one (§ 5.1 rule 5).
 */

const OPTION_BASE = 'block h-full w-full text-left transition-colors border p-4 min-h-[52px]';
const OPTION_OFF = 'border-border-subtle hover:border-cream/50';
const OPTION_ON = 'border-accent bg-accent-soft';

export type ScreenValue = unknown;

export default function ScreenRenderer({
  screen,
  value,
  isNotSure,
  onChange,
  onNotSure,
  onAddressSelect,
  found,
}: {
  screen: Screen;
  value: ScreenValue;
  isNotSure: boolean;
  onChange: (v: ScreenValue) => void;
  onNotSure: () => void;
  /** Fires when a suggestion is chosen, so the parent can look the parcel up. */
  onAddressSelect?: (s: AddressSuggestion) => void;
  /** What public records returned, shown on the confirmation screen. */
  found?: FoundProperty;
}) {
  const groupId = useId();

  return (
    <div>
      <h2 className="h-card sm:h-section">{screen.question}</h2>
      {screen.help && <p className="mt-3 max-w-xl text-sm text-text-secondary sm:text-lead sm:mt-4">{screen.help}</p>}

      <div className="mt-6 sm:mt-8">
        {(screen.kind === 'cards' || screen.kind === 'image-cards') && (
          <fieldset className="border-0 p-0">
            <legend className="sr-only">{screen.question}</legend>
            <div className={screen.kind === 'image-cards' ? 'grid gap-4 sm:auto-rows-fr sm:grid-cols-2' : 'grid auto-rows-fr gap-3'}>
              {screen.choices?.map((c) => {
                const on = value === c.value;
                return (
                  <label key={c.value} className="h-full cursor-pointer">
                    <input
                      type="radio"
                      name={`${groupId}-${screen.id}`}
                      className="peer sr-only"
                      checked={on}
                      onChange={() => onChange(c.value)}
                      aria-label={c.label}
                    />
                    <span
                      className={`block ${OPTION_BASE} ${on ? OPTION_ON : OPTION_OFF} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-focus`}
                    >
                      <span className="block text-base text-cream">{c.label}</span>
                      {c.blurb && (
                        <span className="mt-2 block text-sm leading-relaxed text-text-secondary">{c.blurb}</span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {screen.kind === 'toggles' && (
          <fieldset className="border-0 p-0">
            <legend className="sr-only">{screen.question}</legend>
            <div className="grid auto-rows-fr grid-cols-2 gap-2.5">
              {screen.choices?.map((c) => {
                const selected = Array.isArray(value) ? (value as string[]) : [];
                const on = selected.includes(c.value);
                const atLimit = !!screen.maxSelections && selected.length >= screen.maxSelections && !on;
                return (
                  <label key={c.value} className={`h-full ${atLimit ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={on}
                      disabled={atLimit}
                      onChange={() =>
                        onChange(on ? selected.filter((v) => v !== c.value) : [...selected, c.value])
                      }
                      aria-label={c.label}
                    />
                    <span
                      className={`flex items-center gap-3 ${OPTION_BASE} ${on ? OPTION_ON : OPTION_OFF} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-focus`}
                    >
                      <span
                        aria-hidden="true"
                        className={`grid h-5 w-5 shrink-0 place-items-center border text-xs ${
                          on ? 'border-cream bg-cream text-ink' : 'border-border-subtle'
                        }`}
                      >
                        {on ? '✓' : ''}
                      </span>
                      <span className="text-base text-cream">{c.label}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            {screen.maxSelections && (
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-text-muted">
                Choose up to {screen.maxSelections}
              </p>
            )}
          </fieldset>
        )}

        {screen.kind === 'slider' && screen.slider && (
          <div className="surface-card p-8">
            <p className="text-center">
              <span className="stat-figure">
                {typeof value === 'number' ? value.toLocaleString('en-US') : '-'}
              </span>
              <span className="ml-2 text-lg text-text-secondary">{screen.slider.unit}</span>
            </p>
            <input
              type="range"
              min={screen.slider.min}
              max={screen.slider.max}
              step={screen.slider.step}
              value={typeof value === 'number' ? value : Math.round((screen.slider.min + screen.slider.max) / 2)}
              onChange={(e) => onChange(Number(e.target.value))}
              aria-label={screen.question}
              className="mt-8 w-full accent-cream"
            />
            <div className="mt-2 flex justify-between text-xs text-text-muted">
              <span>{screen.slider.min.toLocaleString('en-US')}</span>
              <span>{screen.slider.max.toLocaleString('en-US')}</span>
            </div>
            {screen.slider.reference && (
              <p className="mt-6 text-center text-sm text-text-secondary">{screen.slider.reference}</p>
            )}
          </div>
        )}

        {/* § 4.4: confirmation, not entry. Where enrichment has returned
            something the homeowner confirms a card; where it has not, they get
            a compact three-field fallback. Enrichment failure never blocks. */}
        {screen.kind === 'confirmation' && (
          <PropertyConfirmation value={value as PropertyDraft | undefined} onChange={onChange} found={found} />
        )}

        {screen.kind === 'address' && (
          <>
            <AddressAutocomplete
              value={typeof value === 'string' ? value : ''}
              onChange={onChange}
              onSelect={(s) => onAddressSelect?.(s)}
            />
            {screen.noLotOption && (
              <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                No lot yet? Continue without one and we will plan from your target size. Want help finding the
                right one?{' '}
                <a href="/buy-or-sell/" className="link-underline text-cream">
                  Connect with our realty team
                </a>
                .
              </p>
            )}
          </>
        )}
      </div>

      {/* § 5.1 rule 4: never block progress on uncertainty. */}
      {screen.notSure && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onNotSure}
            aria-pressed={isNotSure}
            className={`link-underline text-sm ${isNotSure ? 'text-cream' : 'text-text-muted hover:text-cream'}`}
          >
            {screen.notSure.label}
          </button>
          {isNotSure && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary" role="status">
              No problem: {lowerFirst(screen.notSure.appliesDefault)} We will add this to the questions for your
              consultation.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export type PropertyDraft = {
  yearBuilt?: number;
  finishedSqFt?: number;
  /** True once the homeowner has confirmed or corrected the details. */
  confirmed: boolean;
};

/** What public records established, if anything. */
export type FoundProperty = {
  matchedAddress?: string;
  lotSizeSqFt?: number;
  zoning?: string;
  estimatedValue?: number;
  historicDistrict?: string;
  source?: string;
};

const SQ_FT_PER_ACRE = 43_560;

/**
 * § 4.4: confirmation, not entry.
 *
 * Whatever public records establish is shown as a card to confirm. The two
 * facts no free source publishes: year built and finished area: are asked
 * for plainly, because guessing them would quietly distort the estimate.
 */
function PropertyConfirmation({
  value,
  onChange,
  found,
}: {
  value: PropertyDraft | undefined;
  onChange: (v: PropertyDraft) => void;
  found?: FoundProperty;
}) {
  const draft: PropertyDraft = value ?? { confirmed: false };

  const setField = (k: 'yearBuilt' | 'finishedSqFt') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.target.value === '' ? undefined : Number(e.target.value);
    onChange({ ...draft, [k]: Number.isFinite(n as number) ? n : undefined, confirmed: true });
  };

  const facts = [
    found?.lotSizeSqFt ? `${(found.lotSizeSqFt / SQ_FT_PER_ACRE).toFixed(2)} acre lot` : null,
    found?.zoning ? `Zoned ${found.zoning}` : null,
    found?.estimatedValue ? `Assessed at $${found.estimatedValue.toLocaleString('en-US')}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="surface-card p-8">
      {facts.length > 0 ? (
        <>
          <p className="field-label">From public records</p>
          {found?.matchedAddress && <p className="mt-3 text-lg text-cream">{found.matchedAddress}</p>}
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-secondary">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {found?.historicDistrict && (
            <p className="mt-4 text-sm leading-relaxed text-cream">
              Your home sits in the {found.historicDistrict} historic district. Exterior changes go through design
              review, which we build into the timeline. We handle that process routinely.
            </p>
          )}
          <p className="mt-6 text-sm leading-relaxed text-text-secondary">
            Two details we could not pull automatically for this address. Confirm or adjust them. Approximate is
            fine: we widen the range rather than block you.
          </p>
        </>
      ) : (
        <p className="text-sm leading-relaxed text-text-secondary">
          We could not find a public record for this address, so these two details are all we need from you. They are
          the only typing in the whole planner.
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <NumberField label="Year built" value={draft.yearBuilt} onChange={setField('yearBuilt')} placeholder="1961" />
        <NumberField
          label="Approximate square feet"
          value={draft.finishedSqFt}
          onChange={setField('finishedSqFt')}
          placeholder="2340"
        />
      </div>

      <button type="button" onClick={() => onChange({ ...draft, confirmed: true })} className="btn-secondary mt-8">
        {draft.confirmed ? 'Details confirmed' : 'These look right'}
      </button>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  const id = `prop-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="field-input mt-2"
      />
    </div>
  );
}
