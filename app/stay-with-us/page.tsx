import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import Gallery from '@/components/ui/Gallery';
import RentalsGrid from '@/components/sections/RentalsGrid';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import ProofSection from '@/components/sections/ProofSection';
import CrossPathways from '@/components/sections/CrossPathways';
import FaqSection from '@/components/sections/FaqSection';
import { faqs } from '@/lib/content/faqs';

export const metadata = pageMeta({
  title: 'Stay With Us',
  description:
    'Book a stay in one of our beautifully designed Timber and Love vacation rentals, from a historic Boise firehouse to an oceanfront Oahu beach house.',
  path: '/stay-with-us/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Vacation Rentals"
        title="Stay With Us"
        subtitle="Experience the Timber and Love aesthetic firsthand. Each of our short-term rentals is thoughtfully designed for an unforgettable, comfortable stay."
        videoId="928750123"
        image="/video-posters/928750123.jpg"
      />
      <TrustBar />
      <section className="bg-bg-primary section">
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
        imageAlt="Front exterior of the Timber and Love Chalet, a mountain-modern vacation rental designed and built by the studio"
        eyebrow="Stay With Us"
        title="Sleep Inside a Home We Designed"
        cta="See Our Work"
        href="/timber-and-love-gallery/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          Every rental began as a Timber and Love project. The same eye for proportion, light, and material
          that shapes our custom homes shapes the room you wake up in.
        </p>
        <p>
          A stay is the easiest way to feel our design in person, from the millwork to the way morning sun
          moves across the floors.
        </p>
      </EditorialSplit>

      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">A Look Inside</p>
            <h2 className="h-section mt-4">From the Boise Foothills to the Oahu Shore</h2>
            <p className="text-lead mt-4">
              Distinctive settings, one design sensibility. Every stay carries the Timber and Love aesthetic.
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
                src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg',
                alt: 'Front exterior of the Casa De Boise remodel featured on HGTV Boise Boys',
              },
              {
                src: '/wp-content/uploads/2025/12/10-Spacious-living-room-in-Oahu-vacation-rental-with-ocean-views.png',
                alt: 'Spacious living room with ocean views inside the Oahu beach house rental',
              },
              {
                src: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Back-scaled.jpg',
                alt: 'Rear exterior of the Timber and Love Chalet vacation rental',
              },
            ]}
            columns={3}
          />
        </div>
      </section>

      <FeatureBand
        image="/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Living-Room-1-scaled.jpg"
        eyebrow="Designed to Be Lived In"
        title="Comfort That Comes From Craft"
        body="Every rental is a Timber and Love project, so a stay is the easiest way to feel our design in person."
        align="left"
        height="short"
      />

      <ProofSection />

      <CrossPathways keys={['design-build', 'invest']} />

      <FaqSection items={faqs.stayWithUs} />

      <ClosingCta {...closingCta.stayWithUs} />
    </>
  );
}
