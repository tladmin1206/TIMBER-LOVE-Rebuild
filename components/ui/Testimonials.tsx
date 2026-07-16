'use client';

import { useEffect, useState } from 'react';

export type Testimonial = { quote: string; name: string; role: string };

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <div
      className="relative mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="text-6xl leading-none text-cream/20">&ldquo;</div>
      <div className="relative min-h-[180px] sm:min-h-[150px]">
        {items.map((t, idx) => (
          <blockquote
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            aria-hidden={idx !== i}
          >
            <p className="text-lg leading-relaxed text-cream/90 sm:text-xl">{t.quote}</p>
            <footer className="mt-6">
              <span className="block text-sm uppercase tracking-[0.18em] text-cream">{t.name}</span>
              <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-cream/50">{t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show testimonial ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-cream' : 'w-2 bg-cream/30 hover:bg-cream/60'}`}
          />
        ))}
      </div>
    </div>
  );
}
