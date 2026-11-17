import SiteImage from '@/components/ui/SiteImage';
import Link from 'next/link';
import VideoBg from '@/components/ui/VideoBg';
import Reveal from '@/components/ui/Reveal';

export type ClosingAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type ClosingCtaProps = {
  eyebrow: string;
  title: string;
  body: string;
  /** The conversion action. Always rendered as the primary (white) button. */
  primary: ClosingAction;
  /**
   * Lower-commitment alternative. Every closing CTA should offer one so
   * visitors who are not ready today still have something to say yes to.
   */
  secondary?: ClosingAction;
  /** Image mode is the default; video is reserved for hero-weight pages. */
  videoId?: string;
  poster?: string;
  image?: string;
  surface?: 'image' | 'solid';
};

const DEFAULT_IMAGE =
  '/editorial/cedar-kitchen.webp';

function Action({ action, variant }: { action: ClosingAction; variant: 'primary' | 'secondary' }) {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-secondary btn-on-media';

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={cls} data-external="true">
        {action.label}
        <span aria-hidden="true" className="ml-1 text-[0.75em] opacity-70">↗</span>
        <span className="sr-only"> (opens affiliated site in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={action.href} className={cls}>
      {action.label}
    </Link>
  );
}

/**
 * The single closing CTA used at the foot of every non-legal page.
 *
 * One layout, two background modes, so the conversion moment looks and behaves
 * identically everywhere while still letting hero-weight pages carry video.
 * Copy and destinations are page-specific and live in `lib/content/closing.ts`.
 */
export default function ClosingCta({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  videoId,
  poster,
  image = DEFAULT_IMAGE,
  surface = 'image',
}: ClosingCtaProps) {
  return (
    <section className="media-card relative isolate flex min-h-[30rem] items-end overflow-hidden bg-ink section lg:min-h-[56vh] lg:items-center">
      {surface === 'solid' ? null : videoId ? (
        <VideoBg
          videoId={videoId}
          poster={poster || image}
          overlay="bg-gradient-to-t from-ink via-ink/80 to-ink/45 lg:bg-gradient-to-r lg:from-ink lg:via-ink/80 lg:to-ink/40"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <SiteImage sizes="100vw" src={image} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/45 lg:bg-gradient-to-r lg:from-ink lg:via-ink/80 lg:to-ink/40" />
        </>
      )}

      <div className="container-wide relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-section mt-4 text-cream">{title}</h2>
          <p className="text-lead mt-5 max-w-xl">{body}</p>
        </Reveal>
        <Reveal delay={100} className="cta-row lg:justify-end">
          <Action action={primary} variant="primary" />
          {secondary && <Action action={secondary} variant="secondary" />}
        </Reveal>
      </div>
    </section>
  );
}
