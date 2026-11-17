import SiteImage from '@/components/ui/SiteImage';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';

/**
 * Full-bleed photographic statement band. A big project photo, a directional
 * gradient so the type stays legible, and a short line of copy. Used to break
 * the page's dark text sections with real imagery and give the scroll rhythm.
 */
export default function FeatureBand({
  image,
  eyebrow,
  title,
  body,
  cta,
  href,
  align = 'left',
  height = 'tall',
}: {
  image: string;
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: string;
  href?: string;
  align?: 'left' | 'center';
  height?: 'tall' | 'short';
}) {
  const gradient =
    align === 'center'
      ? 'bg-gradient-to-t from-ink/85 via-ink/50 to-ink/60'
      : // Phones: copy sits on a floor of ink at the bottom so the photograph
        // is clear above it. Wide screens: copy sits left, image clear right.
        'bg-gradient-to-t from-ink via-ink/75 via-[45%] to-ink/5 to-[85%] lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/55 lg:via-[50%] lg:to-ink/10 lg:to-100%';
  return (
    <section className={`media-card relative isolate flex overflow-hidden ${align === 'center' ? 'items-center py-20 sm:py-28' : 'items-end pb-14 pt-56 sm:pb-20 lg:items-center lg:py-28'} ${height === 'tall' ? 'min-h-[34rem] lg:min-h-[70vh]' : 'min-h-[28rem] lg:min-h-[52vh]'}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <SiteImage sizes="100vw" src={image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className={`absolute inset-0 -z-10 ${gradient}`} />
      <div className="container-wide">
        <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="h-section mt-4">{title}</h2>
          {body && <p className="text-lead mt-5">{body}</p>}
          {cta && href && (
            <Cta href={href} external={/^https?:/.test(href)} className="mt-8 flex w-full sm:inline-flex sm:w-auto">
              {cta}
            </Cta>
          )}
        </Reveal>
      </div>
    </section>
  );
}
