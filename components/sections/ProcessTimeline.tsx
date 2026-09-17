'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/ui/Reveal';

export type ProcessPhase = {
  title: string;
  body: string;
  receive?: string; // what the client has at the end of this phase
};

/**
 * Vertical process timeline. A connecting hairline with accent-numbered nodes
 * gives a clear, premium sense of "here is exactly what happens next", the
 * question that most often stalls a design-build inquiry.
 *
 * On desktop the phase list is pinned beside the steps. Eight phases is more
 * than a reader holds in their head, so partway down the old single column the
 * useful question stopped being "what does this phase involve" and became "how
 * much of this is left" - which the page could not answer without scrolling
 * back. The rail answers it continuously and doubles as jump navigation. Below
 * `lg` it is dropped rather than restyled: a narrow screen has no room to pin
 * anything without stealing the content's width, so the single column remains
 * the mobile design.
 */
export default function ProcessTimeline({ phases }: { phases: ProcessPhase[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    if (!steps.length) return;

    // A band across the upper-middle of the viewport. Whichever step occupies
    // it is the one being read; tracking every intersecting step and taking the
    // topmost keeps the rail stable when a short phase and a tall one overlap
    // the band together.
    const inBand = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.step);
          if (Number.isNaN(i)) continue;
          if (e.isIntersecting) inBand.add(i);
          else inBand.delete(i);
        }
        if (inBand.size) setActive(Math.min(...inBand));
      },
      { rootMargin: '-25% 0px -55% 0px' }
    );
    steps.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [phases.length]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Pinned phase rail (desktop only). Mirrors the steps rather than adding
          content, so it is hidden from assistive tech: a screen reader gets the
          real list once, below. */}
      <aside className="hidden lg:col-span-4 lg:block" aria-hidden="true">
        <div className="sticky" style={{ top: 'calc(var(--header-h, 88px) + 2.5rem)' }}>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
            Phase <span className="tabular-nums text-cream">{pad(active + 1)}</span>
            <span className="text-text-muted/70"> of {pad(phases.length)}</span>
          </p>
          <p className="h-card mt-3 text-cream">{phases[active]?.title}</p>

          <ol className="mt-8 space-y-0.5 border-l border-border-subtle">
            {phases.map((p, i) => {
              const on = i === active;
              const seen = i < active;
              return (
                <li key={p.title}>
                  <a
                    href={`#phase-${i + 1}`}
                    tabIndex={-1}
                    className={`-ml-px flex items-baseline gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-300 ${
                      on
                        ? 'border-cream text-cream'
                        : `border-transparent hover:text-cream ${seen ? 'text-text-secondary' : 'text-text-muted'}`
                    }`}
                  >
                    <span className="text-[0.7rem] tabular-nums tracking-[0.1em] opacity-70">{pad(i + 1)}</span>
                    <span className="leading-snug">{p.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </aside>

      <ol ref={listRef} className="relative lg:col-span-8">
        {/* connecting line */}
        <span aria-hidden="true" className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-border-subtle sm:left-7" />
        {phases.map((p, i) => (
          <Reveal
            as="li"
            key={p.title}
            id={`phase-${i + 1}`}
            data-step={i}
            delay={i * 60}
            className="relative flex scroll-mt-32 gap-5 pb-10 last:pb-0 sm:gap-8"
          >
            <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-primary text-sm text-accent sm:h-14 sm:w-14">
              {pad(i + 1)}
            </span>
            <div className="pt-1.5 sm:pt-2.5">
              <h3 className="h-card-sm sm:text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.body}</p>
              {p.receive && (
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-text-muted">
                  <span className="text-accent">You leave with:</span> {p.receive}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
