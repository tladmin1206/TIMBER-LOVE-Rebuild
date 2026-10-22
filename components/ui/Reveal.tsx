'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Slide content in once it scrolls into view (respects reduced-motion).
 *
 * Transform only, never opacity: content that starts at opacity 0 is not
 * painted for LCP until hydration plus the observer reveal it, which cost
 * 1.2 to 1.8 s of render delay on mobile (ADA-NS-04). Text is visible in the
 * server HTML from the first paint.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  /**
   * Remaining props pass through to the rendered element, so a caller can put
   * an `id`, a `data-*` hook, or ARIA attributes on the revealed element
   * itself. Without this a caller that needed one had to wrap or nest an extra
   * element purely to hang the attribute on, which changed the layout the
   * reveal was applied to.
   */
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => setShown(true);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // No observer support, reduced motion, or a page that is not being
    // displayed: reveal immediately. The hidden-document case is the important
    // one: a backgrounded tab delivers no intersection callbacks at all, so
    // waiting for one left every revealed element stuck at `opacity-0` and
    // rendered the whole page blank once the visitor came back to it. The
    // entrance animation is worth nothing to someone who is not looking; the
    // content is worth everything.
    if (reduce || typeof IntersectionObserver === 'undefined' || document.visibilityState === 'hidden') {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);

    // Safety net, matching StatCounter: if no callback has arrived by now the
    // observer is not going to deliver one, and content must never depend on
    // an animation hook to become visible.
    const failOpen = window.setTimeout(reveal, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failOpen);
    };
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      {...rest}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0' : 'translate-y-6'
      } ${className}`}
    >
      {children}
    </Comp>
  );
}
