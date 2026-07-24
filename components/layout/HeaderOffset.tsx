'use client';

import { useEffect } from 'react';

/**
 * Publishes the sticky header's real, live height as the `--header-h` CSS
 * variable, plus a small breathing gap.
 *
 * One measured value drives the whole scroll-offset system: `scroll-padding-top`
 * in globals.css consumes it, so anchor jumps, the skip link, keyboard focus,
 * and every form-step transition land below the header rather than behind it.
 *
 * The header changes height on scroll (it condenses) and across breakpoints, so
 * the value is measured rather than hardcoded, and re-measured whenever the
 * header resizes. That is what keeps the offset correct at any zoom, text size,
 * or viewport without a single magic number scattered through the code.
 */
export default function HeaderOffset() {
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const GAP = 12;
    const apply = () => {
      document.documentElement.style.setProperty('--header-h', `${Math.round(header.getBoundingClientRect().height) + GAP}px`);
    };

    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(header);
    // The header condenses on scroll, which ResizeObserver catches, but a resize
    // listener covers breakpoint changes that swap its layout wholesale.
    window.addEventListener('resize', apply, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  return null;
}
