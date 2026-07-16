import PageHero from '@/components/sections/PageHero';
import Gallery from '@/components/ui/Gallery';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/sections/CtaBand';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import Link from 'next/link';

export type PropertyContent = {
  hero: { eyebrow?: string; heading: string; subheading?: string; image: string; videoId?: string };
  intro?: string[];
  details?: { location?: string; bookingUrl?: string };
  amenities?: string[];
  sections?: { heading?: string; paragraphs?: string[]; image?: string }[];
  gallery?: string[];
};

export default function PropertyPage({ data }: { data: PropertyContent }) {
  const booking = data.details?.bookingUrl;
  const images = (data.gallery || []).map((src, i) => ({ src, alt: `${data.hero.heading} — photo ${i + 1}` }));

  return (
    <>
      <PageHero
        eyebrow={data.hero.eyebrow || 'Timber and Love Vacation Rental'}
        title={data.hero.heading}
        subtitle={data.hero.subheading}
        image={data.hero.image || images[0]?.src}
        videoId={data.hero.videoId}
      >
        {booking && (
          <a href={booking} target="_blank" rel="noopener noreferrer" className="btn-solid">
            Book Your Stay
          </a>
        )}
        <Link href="/stay-with-us/" className="btn-outline">
          All Rentals
        </Link>
      </PageHero>

      {/* Intro */}
      {data.intro && data.intro.length > 0 && (
        <section className="bg-ink py-16 sm:py-24">
          <div className="container-tl max-w-3xl">
            <Reveal>
              {data.intro.map((p, i) => (
                <p key={i} className="mb-5 text-lg leading-relaxed text-body">
                  {p}
                </p>
              ))}
              {data.details?.location && (
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-cream/70">{data.details.location}</p>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Amenities */}
      {data.amenities && data.amenities.length > 0 && (
        <section className="border-t border-cream/10 bg-panel py-16 sm:py-20">
          <div className="container-tl">
            <Reveal>
              <h2 className="h-display text-2xl sm:text-3xl">Amenities</h2>
              <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 text-body sm:grid-cols-3">
                {data.amenities.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cream/60" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <section className="bg-ink py-16 sm:py-24">
          <div className="container-wide">
            <Reveal className="mb-10 text-center">
              <p className="eyebrow">The Space</p>
              <h2 className="h-display mt-4 text-3xl sm:text-4xl">Take a Look Inside</h2>
            </Reveal>
            <Gallery images={images} columns={3} />
            {booking && (
              <div className="mt-10 text-center">
                <a href={booking} target="_blank" rel="noopener noreferrer" className="btn-solid">
                  Check Availability &amp; Book
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="Plan Your Stay"
        title="Make Yourself At Home"
        body="Book directly through our trusted listing partners, or reach out and our team will help you find the perfect Timber and Love stay."
        image={data.hero.image || images[0]?.src}
        primary={
          booking ? (
            <a href={booking} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Book Now
            </a>
          ) : undefined
        }
        secondary={
          <Link href="/stay-with-us/" className="btn-outline">
            Explore More Rentals
          </Link>
        }
      />

      <BeginJourneyCta />
    </>
  );
}
