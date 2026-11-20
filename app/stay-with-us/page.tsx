import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/sections/PageHero';
import EditorialSplit from '@/components/sections/EditorialSplit';
import Gallery from '@/components/ui/Gallery';
import RentalsGrid from '@/components/sections/RentalsGrid';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import { pageMeta } from '@/lib/seo';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import FaqSection from '@/components/sections/FaqSection';
import { faqs } from '@/lib/content/faqs';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Vacation Rentals in Boise, McCall and Oahu | Timber + Love",
  description:
    'Find your next getaway in Boise, McCall, or Oahu, including The Kualoa Beach House and The Caldwell Beach House. Explore photos and check availability.',
  path: '/stay-with-us/',
});

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Vacation Rentals', path: '/stay-with-us/' }])} />
      <PageHero
        eyebrow="Vacation Rentals"
        title="Stay With Us"
        subtitle="A weekend in Boise, a mountain escape, or mornings beside the Pacific. Find a Timber + Love home for your next getaway."
        videoId="928750123"
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg"
      >
        <Cta href="#properties">Explore the Properties</Cta>
        <Cta href="/vacation-rentals/" variant="secondary">Compare Homes and Group Sizes</Cta>
      </PageHero>
      <section id="properties" className="bg-bg-primary section scroll-mt-24">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">Our Rentals</p>
            <h2 className="h-section mt-4">Find Your Perfect Stay</h2>
          </Reveal>
          <RentalsGrid />
        </div>
      </section>

      <EditorialSplit
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg"
        imageAlt="Front exterior of the Timber + Love Chalet, a mountain-modern vacation rental designed and built by the studio"
        eyebrow="Mountain Getaway"
        title="Mountain Time, Near McCall"
        cta="Explore the Chalet"
        href="/timber-and-love-chalet/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          Settle into the Chalet for a change of pace in Idaho’s mountains. Gather with your favorite people,
          head out to explore, and come back to a home of your own for the evening.
        </p>
        <p>
          Browse the rooms, amenities, and details to see whether it is the right fit for your trip.
        </p>
      </EditorialSplit>

      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">A Look Inside</p>
            <h2 className="h-section mt-4">From the Boise Foothills to the Oahu Shore</h2>
            <p className="text-lead mt-4">
              Find a setting that feels like your kind of getaway, from a historic city stay to a home beside the water.
            </p>
          </Reveal>
          <Gallery
            images={[
              {
                src: '/wp-content/uploads/2025/12/1-Oceanfront-Oahu-vacation-rental-exterior-with-direct-beach-access.png',
                alt: 'Oceanfront Oahu vacation rental with direct beach access and open ocean views',
              },
              {
                src: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Exterior-scaled.jpg',
                alt: 'Exterior of the restored historic Boise firehouse featured on HGTV Boise Boys',
              },
              {
                src: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Living-Room-scaled.jpg',
                alt: 'Living room inside the historic Boise firehouse vacation rental',
              },
              {
                src: '/editorial/firehouse-bedroom.webp',
                alt: 'Bedroom with black framed windows and layered textiles at The Firehouse',
              },
              {
                src: '/rentals/caldwell/27-hammock-mokolii.webp',
                alt: 'Hammock beside the water at The Caldwell Beach House with Mokoliʻi in the distance',
              },
              {
                src: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Back-scaled.jpg',
                alt: 'Rear exterior of the Timber + Love Chalet vacation rental',
              },
            ]}
            columns={3}
          />
        </div>
      </section>

      <FaqSection items={faqs.stayWithUs} title="Before You Book" background="section-tonal" />

      <ClosingCta {...closingCta.stayWithUs} />
    </>
  );
}
