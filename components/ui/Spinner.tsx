/**
 * Inline loading indicator for buttons and pending states.
 *
 * Always paired with text (never the only signal): the global reduced-motion
 * rule freezes the rotation, so a spinner alone would read as a static dot to
 * the people who most need the state spelled out. `aria-hidden` for the same
 * reason: the accompanying label carries the meaning.
 */
export default function Spinner({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-3.5 w-3.5 shrink-0 animate-spin rounded-full border border-current border-r-transparent align-[-0.15em] opacity-80 ${className}`}
    />
  );
}
