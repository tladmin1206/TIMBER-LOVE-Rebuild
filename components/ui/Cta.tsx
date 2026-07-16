import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'link';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  link: 'text-sm uppercase tracking-[0.16em] text-cream link-underline',
};

/**
 * Single CTA primitive used across the site. Internal destinations render a
 * Next <Link>; external/affiliated destinations render an <a> with secure rel,
 * an outbound-tracking hook, and a clear "opens an affiliated site" indicator.
 *
 * CTA wording must always describe the action or destination — never a vague
 * "Get Started" / "Begin Your Journey".
 */
export default function Cta({
  href,
  children,
  variant = 'primary',
  external = false,
  newTab = false,
  className = '',
  track,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  newTab?: boolean;
  className?: string;
  track?: string; // analytics event name (data attribute for the Analytics layer)
  ariaLabel?: string;
}) {
  const cls = `${VARIANT_CLASS[variant]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : { rel: 'noopener' })}
        className={cls}
        data-track={track}
        data-external="true"
        aria-label={ariaLabel}
      >
        {children}
        <span aria-hidden="true" className="ml-1 text-[0.75em] opacity-70">
          ↗
        </span>
        <span className="sr-only"> (opens affiliated site{newTab ? ' in a new tab' : ''})</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cls} data-track={track} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
