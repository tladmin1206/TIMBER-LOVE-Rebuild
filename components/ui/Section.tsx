import Reveal from '@/components/ui/Reveal';

type Rhythm = 'default' | 'tight' | 'feature';
type Background = 'primary' | 'secondary' | 'none';
type Width = 'wide' | 'narrow';

const RHYTHM: Record<Rhythm, string> = {
  default: 'section',
  tight: 'section-tight',
  feature: 'section-feature',
};

const BACKGROUND: Record<Background, string> = {
  primary: 'bg-bg-primary',
  secondary: 'bg-bg-secondary',
  none: '',
};

/**
 * Standard page section.
 *
 * Owns background, vertical rhythm, top divider and container width so pages
 * compose sections rather than re-deriving them. Every section on the site
 * previously set these by hand, which is how ten padding values and seventeen
 * heading sizes accumulated — the primitive is what keeps that from recurring.
 */
export default function Section({
  children,
  rhythm = 'default',
  background = 'primary',
  width = 'wide',
  divider = false,
  className = '',
  ...rest
}: {
  children: React.ReactNode;
  rhythm?: Rhythm;
  background?: Background;
  width?: Width;
  /** Hairline rule along the top edge, for separating same-coloured sections. */
  divider?: boolean;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, 'className'>) {
  const classes = [
    BACKGROUND[background],
    RHYTHM[rhythm],
    divider ? 'border-t border-border-subtle' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...rest}>
      <div className={width === 'wide' ? 'container-wide' : 'container-tl'}>{children}</div>
    </section>
  );
}

/**
 * The eyebrow + heading + lede cluster that opens almost every section.
 *
 * Always renders an H2 at the single section rank, so section headings are the
 * same size on the homepage and on interior pages.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  id,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  id?: string;
  className?: string;
}) {
  const centered = align === 'center';
  const classes = [centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Reveal className={classes}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="h-section mt-4">
        {title}
      </h2>
      {lede && <p className="text-lead mt-5">{lede}</p>}
    </Reveal>
  );
}
