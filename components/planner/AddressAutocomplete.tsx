'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { AddressSuggestion } from '@/lib/planner/property/freeLookup';

/**
 * Address field with type-ahead suggestions.
 *
 * Implemented as a combobox rather than a plain input so it is operable from
 * the keyboard alone: arrow keys move through options, Enter selects, Escape
 * dismisses. Suggestions are requested from our own endpoint after a short
 * pause in typing, and the field stays fully usable if that request fails: a
 * homeowner can always type their address and continue.
 */
export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  label = 'Property address',
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (s: AddressSuggestion) => void;
  label?: string;
}) {
  const id = useId();
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  // Set while applying a selection, so choosing an option does not immediately
  // trigger a fresh search for the text we just filled in.
  const justSelected = useRef(false);

  useEffect(() => {
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }
    if (value.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/planner/address/?q=${encodeURIComponent(value)}`, {
          signal: controller.signal,
        });
        const data = (await res.json()) as { suggestions?: AddressSuggestion[] };
        setSuggestions(data.suggestions ?? []);
        setOpen((data.suggestions ?? []).length > 0);
        setActive(-1);
      } catch {
        // Offline, slow, or upstream trouble. Typing still works.
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [value]);

  // Dismiss when focus or the pointer leaves the combobox.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  function choose(s: AddressSuggestion) {
    justSelected.current = true;
    onChange(s.label);
    setOpen(false);
    setSuggestions([]);
    setActive(-1);
    onSelect(s);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      choose(suggestions[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const listId = `${id}-list`;

  return (
    <div ref={boxRef} className="relative">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Start typing your address"
        className="field-input mt-2"
      />

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Address suggestions"
          className="absolute z-20 mt-1 w-full overflow-hidden border border-border-subtle bg-surface shadow-xl"
        >
          {suggestions.map((s, i) => (
            <li key={s.label} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                // Mouse-down fires before the input's blur, so the click lands.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(s)}
                onMouseEnter={() => setActive(i)}
                className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                  i === active ? 'bg-accent-soft text-cream' : 'text-text-secondary hover:text-cream'
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 text-sm text-text-muted" aria-live="polite">
        {loading ? 'Looking up addresses…' : 'Choose your address and we will fill in what public records show.'}
      </p>
    </div>
  );
}
