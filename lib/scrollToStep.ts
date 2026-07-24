/**
 * Scrolls a form/questionnaire step heading to just below the sticky header.
 *
 * One shared function so every multi-step flow behaves identically: the step
 * heading lands below the header with the same small gap, keyboard focus moves
 * to it (announcing the change to assistive tech without opening the mobile
 * keyboard), and reduced-motion users get an immediate jump instead of a smooth
 * scroll.
 *
 * The offset comes from the same `--header-h` variable the CSS uses, so there
 * is one source of truth for the header height.
 */
export function scrollToStep(el: HTMLElement | null) {
  if (!el || typeof window === 'undefined') return;

  // Runs from a useEffect, i.e. after React has committed the new step's DOM,
  // and getBoundingClientRect below forces a synchronous layout, so the
  // measurement is already accurate: no requestAnimationFrame needed (and rAF
  // would not even fire while the tab is backgrounded).
  //
  // Two things that matter:
  //  - behavior 'instant', not 'auto': 'auto' follows the CSS scroll-behavior,
  //    which is smooth here, and a *pending* smooth scroll is cancelled by the
  //    focus() below. An instant scroll completes synchronously.
  //  - scroll first, then focus. focus({ preventScroll: true }) after a
  //    completed scroll cannot move it, and does not open the mobile keyboard.
  const headerH = readHeaderOffset();
  const top = el.getBoundingClientRect().top + window.scrollY - headerH;
  window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
  el.focus({ preventScroll: true });
}

function readHeaderOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim();
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 88;
}
