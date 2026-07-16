/** Accessible star rating. Renders full/half stars in the brand accent color. */
export default function Stars({ rating = 5, size = 'sm' }: { rating?: number; size?: 'sm' | 'md' | 'lg' }) {
  const cls = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm';
  const frac = rating - Math.floor(rating);
  // Convention: round a high fraction up to a full star (4.9 -> five full stars).
  const full = frac >= 0.75 ? Math.ceil(rating) : Math.floor(rating);
  const half = frac >= 0.25 && frac < 0.75;
  return (
    <span className={`inline-flex items-center gap-0.5 text-accent ${cls}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <span key={i} aria-hidden="true" className="relative leading-none">
            <span className={filled ? 'text-accent' : 'text-border-subtle'}>★</span>
            {isHalf && <span className="absolute inset-0 overflow-hidden text-accent" style={{ width: '50%' }}>★</span>}
          </span>
        );
      })}
    </span>
  );
}
