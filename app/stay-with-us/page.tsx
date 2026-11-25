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
    'Vacation homes in Boise, McCall and Oahu, including The Kualoa Beach House and The Caldwell Beach House. See photos and check availability.',
  path: '/stay-with-us/',
});

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Vacation Rentals', path: '/stay-with-us/' }])} />
      <PageHero
        eyebrow="Vacation Rentals"
        title="Stay With Us"
        subtitle="A weekend in Boise, a few days in the mountains, or mornings beside the Pacific. Pick a Timber + Love home for your next trip."
        videoId="928750123"
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg"
      >
        <Cta href="#properties">See the Houses</Cta>
        <Cta href="/vacation-rentals/" variant="secondary">Compare Homes and Group Sizes</Cta>
      </PageHero>
      <section id="properties" className="bg-bg-primary section scroll-mt-24">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">Our vacation homes</p>
            <h2 className="h-section mt-4">Pick a house</h2>
          </Reveal>
          <RentalsGrid />
        </div>
      </section>

      <EditorialSplit
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg"
        imageAlt="Front exterior of the Timber + Love Chalet, a mountain-modern vacation rental designed and built by the studio"
        eyebrow="The Chalet"
        title="Mountain time, near McCall"
        cta="See the Chalet"
        href="/timber-and-love-chalet/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          A hot tub, room for ten, and a big table to sit around.
        </p>
        <p>
          See the rooms and amenities and check your dates.
        </p>
      </EditorialSplit>

      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">A Look Inside</p>
            <h2 className="h-section mt-4">Boise, McCall or Oahu</h2>
            <p className="text-lead mt-4">
              Pick a place, then pick a house.
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
