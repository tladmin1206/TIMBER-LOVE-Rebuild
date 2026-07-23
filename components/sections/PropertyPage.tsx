import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import PropertyGallery from '@/components/sections/PropertyGallery';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { lodgingSchema, breadcrumbSchema } from '@/lib/schema';
import TrustBar from '@/components/sections/TrustBar';

export type PropertyContent = {
  hero: { eyebrow?: string; heading: string; subheading?: string; image: string; videoId?: string };
  destination?: string;
  intro?: string[];
  /** Professionally edited overview prose (preferred over raw `intro`). */
  overview?: string[];
  details?: { location?: string; bookingUrl?: string };
  /** Verified quick facts. Only fields present are shown. */
  glance?: {
    guests?: string;
    bedrooms?: string;
    beds?: string;
    bathrooms?: string;
    propertyType?: string;
    parking?: string;
    wifi?: string;
  };
  amenities?: string[];
  /** Amenities grouped into categories (preferred over the flat `amenities`). */
  amenityGroups?: { category: string; items: string[] }[];
  sleeping?: string[];
  /** Important guest disclosures (accessibility limits, house rules, safety, etc.). */
  thingsToKnow?: string[];
  sections?: { heading?: string; paragraphs?: string[]; image?: string }[];
  gallery?: string[];
};

// Minimal registry for related-property cross-links (name kept in sync with the
// property JSON hero headings).
const RENTALS = [
  { name: 'The Firehouse', href: '/the-firehouse/', image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Exterior-scaled.jpg', destination: 'Boise, ID' },
  { name: 'The Chalet', href: '/timber-and-love-chalet/', image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg', destination: 'McCall, ID' },
  { name: "Chinaman's Beach House", href: '/chinamans-ocean-front-beach-house/', image: '/wp-content/uploads/2025/12/1-Oceanfront-Oahu-vacation-rental-exterior-with-direct-beach-access.png', destination: 'Oahu, HI' },
  { name: 'The Darla House', href: '/the-darla-house/', image: '/wp-content/uploads/2026/04/01-Exterior-Front-1024x683.jpg', destination: 'Boise, ID' },
];

function bookingHost(url?: string): string {
  if (!url) return 'our booking partner';
  try {
    const h = new URL(url).hostname.replace('www.', '');
    if (h.includes('airbnb')) return 'Airbnb';
    if (h.includes('vacationrentaloahu')) return 'Vacation Rental Oahu';
    return h;
  } catch {
    return 'our booking partner';
  }
}

export default function PropertyPage({ data }: { data: PropertyContent }) {
  const booking = data.details?.bookingUrl;
  const host = bookingHost(booking);
  const overview = data.overview ?? data.intro ?? [];
  const images = (data.gallery || []).map((src, i) => ({ src, alt: `${data.hero.heading} — photo ${i + 1}` }));
  const glanceEntries = Object.entries(data.glance ?? {}).filter(([, v]) => v);
  const self = RENTALS.find((r) => r.name === data.hero.heading);
  const related = RENTALS.filter((r) => r.name !== data.hero.heading).slice(0, 3);
  const amenityList = data.amenityGroups?.flatMap((g) => g.items) ?? data.amenities ?? [];

  const BookButton = ({ className = 'btn-primary' }: { className?: string }) =>
    booking ? (
      <a href={booking} target="_blank" rel="noopener noreferrer" className={className} data-track={`book_${data.hero.heading.replace(/\W+/g, '_').toLowerCase()}`} data-external="true">
        Check Availability
        <span aria-hidden="true" className="ml-1 text-[0.75em] opacity-70">↗</span>
      </a>
    ) : null;

  return (
    <>
      {self && (
        <JsonLd
          schema={[
            lodgingSchema({
              name: data.hero.heading,
              description: (data.overview ?? data.intro ?? [''])[0],
              path: self.href,
              image: data.hero.image,
              region: data.destination?.includes('HI') ? 'HI' : 'ID',
              amenities: amenityList,
            }),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Vacation Rentals', path: '/stay-with-us/' },
              { name: data.hero.heading, path: self.href },
            ]),
          ]}
        />
      )}
      <PageHero
        eyebrow={data.destination || data.hero.eyebrow || 'Vacation Rental'}
        title={data.hero.heading}
        subtitle={data.hero.subheading}
        image={data.hero.image || images[0]?.src}
        videoId={data.hero.videoId}
        height="short"
      >
        <BookButton />
        <Link href="/stay-with-us/" className="btn-secondary">Back to All Stays</Link>
      </PageHero>

      <TrustBar />

      {/* Gallery */}
      {images.length > 0 && (
        <section className="bg-bg-primary pt-10 sm:pt-14">
          <div className="container-wide">
            <PropertyGallery images={images} />
          </div>
        </section>
      )}

      {/* Overview + booking panel */}
      <section className="bg-bg-primary section-tight">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <div>
            {data.destination && <p className="eyebrow">{data.destination}</p>}
            <h2 className="h-section mt-3">{data.hero.heading}</h2>

            {/* At a glance */}
            {glanceEntries.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
                {glanceEntries.map(([k, v]) => (
                  <li key={k} className="flex items-center gap-2">
                    <span className="text-text-muted capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-cream">{v}</span>
                  </li>
                ))}
              </ul>
            )}

            <Reveal className="mt-8 max-w-prose space-y-4">
              {overview.map((p, i) => (
                <p key={i} className="text-lead">{p}</p>
              ))}
            </Reveal>
          </div>

          {/* Sticky booking card (desktop) */}
          <div className="lg:relative">
            <div className="surface-card p-6 lg:sticky lg:top-24">
              <p className="field-label">Book This Stay</p>
              <p className="mt-3 text-sm text-text-secondary">
                Reserve your dates directly on {host}. Availability and pricing are shown at checkout.
              </p>
              {glanceEntries.length > 0 && (
                <dl className="mt-5 space-y-2 text-sm">
                  {glanceEntries.slice(0, 4).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border-subtle pb-2">
                      <dt className="capitalize text-text-muted">{k.replace(/([A-Z])/g, ' $1')}</dt>
                      <dd className="text-right text-cream">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-5">
                <BookButton className="btn-primary w-full" />
              </div>
              <p className="mt-3 text-center text-xs text-text-muted">You will complete booking on {host}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      {(data.amenityGroups?.length || data.amenities?.length) && (
        <section className="border-t border-border-subtle bg-bg-secondary section-tight">
          <div className="container-wide">
            <Reveal className="mb-8">
              <h2 className="h-card">Amenities</h2>
            </Reveal>
            {data.amenityGroups?.length ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {data.amenityGroups.map((g) => (
                  <div key={g.category}>
                    <p className="field-label">{g.category}</p>
                    <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                      {g.items.map((a) => (
                        <li key={a} className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-text-secondary sm:grid-cols-3">
                {data.amenities!.map((a) => (
                  <li key={a} className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{a}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Sleeping arrangements */}
      {data.sleeping && data.sleeping.length > 0 && (
        <section className="bg-bg-primary section-tight">
          <div className="container-wide">
            <Reveal className="mb-8">
              <h2 className="h-card">Sleeping Arrangements</h2>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.sleeping.map((s) => (
                <li key={s} className="surface-card p-5 text-sm text-text-secondary">{s}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Things to Know */}
      {data.thingsToKnow && data.thingsToKnow.length > 0 && (
        <section className="border-t border-border-subtle bg-bg-secondary section-tight">
          <div className="container-tl max-w-3xl">
            <Reveal>
              <h2 className="h-card">Things to Know</h2>
              <ul className="mt-8 space-y-3 text-body">
                {data.thingsToKnow.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-border-subtle pb-3">
                    <span aria-hidden="true" className="mt-0.5 text-accent">!</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related properties */}
      {related.length > 0 && (
        <section className="bg-bg-primary section-tight">
          <div className="container-wide">
            <Reveal className="mb-8">
              <p className="eyebrow">More Stays</p>
              <h2 className="h-section mt-3">Other Timber and Love Rentals</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="group card-interactive block overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.image} alt={`${r.name} in ${r.destination}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="h-card-sm">{r.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-muted">{r.destination}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="Plan Your Stay"
        title="Make Yourself at Home"
        body="Reserve your dates through our booking partner, or reach out and our team will help you find the right Timber and Love stay."
        image={data.hero.image || images[0]?.src}
        primary={<BookButton />}
        secondary={<Link href="/stay-with-us/" className="btn-secondary">Need Help Choosing a Property?</Link>}
      />
    </>
  );
}
