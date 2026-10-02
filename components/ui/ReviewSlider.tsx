'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Stars from '@/components/ui/Stars';
import type { Testimonial } from '@/lib/content/types';

/** A visitor-controlled review rail. Quotes stay still while they are read. */
export default function ReviewSlider({ items }: { items: Testimonial[] }) {
  const id = useId();
  const track = useRef<HTMLUListElement>(null);
  const [bounds, setBounds] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setBounds({
      start: el.scrollLeft < 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [items.length]);

  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({
      left: direction * (el.clientWidth + 24),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <div>
      <ul id={id} ref={track} aria-label="Client reviews" tabIndex={0} className="review-rail grid auto-cols-[100%] grid-flow-col gap-6 overflow-x-auto overscroll-x-contain pb-2 text-left sm:auto-cols-[calc((100%-24px)/2)] xl:auto-cols-[calc((100%-48px)/3)]">
        {items.map((review) => (
          <li key={review.name} className="h-full snap-start">
            <figure className="flex h-full flex-col border border-border-subtle bg-panel/65 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <Stars rating={5} size="sm" />
                <span className="text-[10px] uppercase tracking-[.14em] text-text-muted">Google</span>
              </div>
              <blockquote className="my-6 text-sm leading-7 text-text-secondary">“{review.quote}”</blockquote>
              <figcaption className="mt-auto border-t border-border-subtle pt-5">
                <span className="block text-sm text-cream">{review.name}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[.14em] text-text-muted">{review.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-end gap-3">
        <button type="button" aria-label="Previous reviews" aria-controls={id} disabled={bounds.start} onClick={() => move(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-border-subtle text-cream transition-colors hover:border-cream disabled:cursor-default disabled:opacity-30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
        </button>
        <button type="button" aria-label="Next reviews" aria-controls={id} disabled={bounds.end} onClick={() => move(1)} className="grid h-11 w-11 place-items-center rounded-full border border-border-subtle text-cream transition-colors hover:border-cream disabled:cursor-default disabled:opacity-30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
