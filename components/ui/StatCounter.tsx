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
  text,
  align = 'center',
  size = 'lg',
}: {
  /** Numeric value to count up to. Omit when `text` is given. */
  to?: number;
  /** Static, non-numeric figure (no count-up). Takes precedence over `to`. */
  text?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  align?: 'center' | 'left';
  size?: 'md' | 'lg';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Animated value shown only while the count-up is running.
  const [value, setValue] = useState(to ?? 0);
  const [animating, setAnimating] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || text !== undefined || to === undefined || label === 'Founded in Boise') return;
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
            setValue(Math.round(eased * (to ?? 0)));
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
  }, [to, label, text]);

  // Display the true value unless the count-up is actively running.
  const display = animating ? value : to ?? 0;

  const isText = text !== undefined;
  // Text figures sit one size step below numeric ones and balance their lines
  // so a short token such as "+" never ends up alone at a line end.
  const figureSize = isText
    ? size === 'md'
      ? 'text-2xl sm:text-3xl text-balance'
      : 'text-3xl sm:text-5xl text-balance'
    : size === 'md'
      ? 'text-3xl sm:text-4xl'
      : 'text-4xl sm:text-6xl';

  return (
    <div ref={ref} className={align === 'left' ? 'text-left' : 'text-center'}>
      {isText ? (
        <div className={`font-sans ${figureSize} tracking-brand text-cream`}>{text}</div>
      ) : (
        <div className={`font-sans ${figureSize} tracking-brand text-cream`}>
          {/* Screen readers get the final value once; the animating count is hidden from them. */}
          <span className="sr-only">{`${prefix}${to ?? 0}${suffix}`}</span>
          <span aria-hidden="true">
            {prefix}
            {display}
            {suffix}
          </span>
        </div>
      )}
      <div className="mt-2.5 text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-cream/70 sm:mt-3 sm:text-xs">{label}</div>
    </div>
  );
}
