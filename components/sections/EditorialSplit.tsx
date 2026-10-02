import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

/**
 * Editorial image + text section. A large project photo beside a column of copy,
 * alternating sides down the page. This is the workhorse for making a content
 * page image-forward: it turns a plain text block into a premium, magazine-style
 * layout without the full-bleed weight of a FeatureBand.
 */
export default function EditorialSplit({
  image,
  imageAlt,
  eyebrow,
  title,
  children,
  cta,
  href,
  reverse = false,
  tone = 'primary',
  ratio = 'landscape',
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  cta?: string;
  href?: string;
  /** Place the image on the right instead of the left. Alternate down the page. */
  reverse?: boolean;
  tone?: 'primary' | 'secondary';
  ratio?: 'landscape' | 'portrait' | 'square' | 'natural';
}) {
  const aspect = ratio === 'natural' ? '' : ratio === 'portrait' ? 'aspect-[4/5]' : ratio === 'square' ? 'aspect-square' : 'aspect-[4/3]';
  return (
    <section className={`border-t border-border-subtle section ${tone === 'secondary' ? 'section-paper bg-bg-secondary' : 'bg-bg-primary'}`}>
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reverse ? 'lg:order-2' : ''}>
          <div className={`relative overflow-hidden ${aspect}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt} loading="lazy" className={ratio === 'natural' ? 'h-auto w-full' : 'h-full w-full object-cover'} />
          </div>
        </Reveal>
        <Reveal delay={100} className={reverse ? 'lg:order-1' : ''}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="h-section mt-4">{title}</h2>
          <div className="text-lead mt-5 space-y-4 [&_p]:text-lead">{children}</div>
          {cta && href && (
            <Link href={href} className="btn-secondary mt-8 inline-flex">
              {cta}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
