/**
 * Mobile swipe row that becomes a grid on wider screens.
 *
 * The pattern was proven inline in ReviewWall and is defined once here so card
 * sections compose rather than re-invent it. Two decisions are load-bearing:
 *
 * - Cards are 82% wide on mobile, so the next card is always partly visible.
 *   That peek is the entire affordance: without it a horizontal row reads as a
 *   clipped grid and visitors never discover the swipe.
 * - Nothing auto-advances and there is no pause control. The row moves only
 *   when the visitor moves it, which is why it needs no reduced-motion branch:
 *   scroll-snap is a scroll behaviour, not an animation.
 *
 * The scrollbar is hidden visually but the container stays a real scroll
 * container, so keyboard scrolling and assistive tech still work.
 */
export default function SwipeRow({
  children,
  cols = 2,
  gap = 'gap-6',
  className = '',
}: {
  children: React.ReactNode;
  /** Column count from the `sm` breakpoint up, where the row becomes a grid. */
  cols?: 2 | 3;
  gap?: string;
  className?: string;
}) {
  const grid = cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <div
      className={`flex snap-x snap-mandatory overflow-x-auto pb-4 ${gap} sm:grid ${grid} sm:overflow-visible sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * One cell of a SwipeRow. Carries the peek width and snap alignment on mobile
 * and releases both once the parent becomes a grid.
 */
export function SwipeItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  // The width must be DEFINITE (`w-`), not a floor (`min-w-`). With only a
  // minimum, a flex item's basis stays content-derived, so a card containing an
  // image resolved to that image's intrinsic width - cards came out thousands
  // of pixels wide and the row scrolled almost endlessly. `min-w-0` lets the
  // content wrap inside that width instead of pushing it back out.
  return (
    <div className={`w-[82%] min-w-0 shrink-0 snap-start sm:w-auto ${className}`}>
      {children}
    </div>
  );
}
