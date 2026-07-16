'use client';

import { useEffect, useRef, useState } from 'react';

export default function StatCounter({
  to,
  prefix = '',
  suffix = '+',
  label,
  align = 'center',
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  align?: 'center' | 'left';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
          setValue(to);
          return;
        }
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref} className={align === 'left' ? 'text-left' : 'text-center'}>
      <div className="font-sans text-5xl tracking-brand text-cream sm:text-6xl">
        {prefix}
        {value}
        {suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.18em] text-cream/70 sm:text-sm">{label}</div>
    </div>
  );
}
