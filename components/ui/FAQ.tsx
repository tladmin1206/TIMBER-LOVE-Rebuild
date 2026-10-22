'use client';

import { useId, useState } from 'react';

export type FaqItem = { q: string; a: string };

/**
 * Accordion FAQ.
 *
 * Each trigger is associated with its panel via `aria-controls`/`id` so screen
 * readers can move between a question and its answer. Panels stay in the DOM
 * and are hidden with `hidden` rather than unmounted, which keeps the
 * association valid and leaves the answers findable by in-page search.
 */
export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border-subtle border-y border-border-subtle">
      {items.map((it, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const triggerId = `${uid}-trigger-${i}`;
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-base text-cream sm:text-lg">{it.q}</span>
                <span aria-hidden="true" className="shrink-0 text-xl leading-none text-cream/70">
                  {isOpen ? (
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false"><path d="M2 8h12" /></svg>
                ) : (
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false"><path d="M2 8h12M8 2v12" /></svg>
                )}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
              <p className="pb-6 text-sm leading-relaxed text-body">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
