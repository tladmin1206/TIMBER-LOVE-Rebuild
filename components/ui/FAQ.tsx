'use client';

import { useState } from 'react';

export type FaqItem = { q: string; a: string };

/** Accordion FAQ (mirrors the live Elementor toggle list). */
export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-cream/10 border-y border-border-subtle">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base text-cream sm:text-lg">{it.q}</span>
              <span className="shrink-0 text-xl leading-none text-cream/70">{isOpen ? '–' : '+'}</span>
            </button>
            {isOpen && <p className="pb-6 text-sm leading-relaxed text-body">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
