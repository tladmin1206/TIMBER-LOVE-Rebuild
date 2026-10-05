'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated statistic with an accurate static fallback.
 *
 * The final value is rendered on the server and before the count-up begins, so
 * the statistic NEVER displays as zero due to hydration, a missing observer, or
 * disabled JavaScript. The count-up runs only once, when scrolled into view,
 * and is skipped entirely under prefers-reduced-motion.
 */
export default function StatCounter({
  to,
  prefix = '',
  suffix = '+',
  label,
  align = 'center',
  size = 'lg',
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  align?: 'center' | 'left';
  size?: 'md' | 'lg';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Animated value shown only while the count-up is running.
  const [value, setValue] = useState(to);
  const [animating, setAnimating] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || label === 'Founded in Boise') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setAnimating(true);
          setValue(0);
          const duration = 1600;
          const start = performance.now();
          const finish = () => setAnimating(false); // falls back to the true value
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
            else finish();
          };
          requestAnimationFrame(tick);
          // Safety net: if rAF is throttled (e.g. the tab is backgrounded mid
          // animation), guarantee the final value is shown.
          window.setTimeout(finish, duration + 400);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, label]);

  // Display the true value unless the count-up is actively running.
  const display = animating ? value : to;

  const figureSize = size === 'md' ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-6xl';

  return (
    <div ref={ref} className={align === 'left' ? 'text-left' : 'text-center'}>
      <div className={`font-sans ${figureSize} tracking-brand text-cream`}>
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.18em] text-cream/70 sm:text-sm">{label}</div>
    </div>
  );
}
