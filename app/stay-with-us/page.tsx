import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import FeatureBand from '@/components/sections/FeatureBand';
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

      <FeatureBand
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg"
        eyebrow="Stay With Us"
        title="Sleep Inside a Home We Designed"
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
