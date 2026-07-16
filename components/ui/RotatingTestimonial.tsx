'use client';

import { useEffect, useState } from 'react';
import type { Testimonial } from '@/components/ui/Testimonials';

/** Centered single testimonial that cross-fades through the list (mirrors the live testimonials block). */
export default function RotatingTestimonial({ items, interval = 6000 }: { items: Testimonial[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((v) => (v + 1) % items.length);
        setShow(true);
      }, 400);
    }, interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  const t = items[i];
  return (
    <div className={`mx-auto max-w-3xl transition-opacity duration-400 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-lg leading-relaxed text-cream/90 sm:text-xl">{t.quote}</p>
      <p className="mt-8 text-base text-cream">{t.name}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/60">{t.role}</p>
    </div>
  );
}
