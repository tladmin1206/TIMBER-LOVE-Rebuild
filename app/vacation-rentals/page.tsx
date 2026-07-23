import PageHero from '@/components/sections/PageHero';
import RentalsGrid from '@/components/sections/RentalsGrid';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import TrustBar from '@/components/sections/TrustBar';
import ProofSection from '@/components/sections/ProofSection';
import CrossPathways from '@/components/sections/CrossPathways';

export const metadata = pageMeta({
  title: 'Vacation Rentals',
  description: 'Stay in distinctive Timber and Love homes in Boise, McCall, and Oahu.',
  path: '/vacation-rentals/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Stay With Us"
        title="Distinctive Homes. Memorable Places to Stay."
        subtitle="Our vacation rentals feature Timber and Love design in Boise, McCall, and Oahu. Book a stay and experience our work firsthand."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Exterior-scaled.jpg"
      >
        <Cta href="/stay-with-us/" variant="primary">View All Stays</Cta>
      </PageHero>

      <TrustBar />
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Properties</p>
            <h2 className="h-section mt-4">Timber and Love Vacation Rentals</h2>
            <p className="text-lead mt-4">
              Each property is designed and cared for by our team, so a stay is the easiest way to experience the
              Timber and Love aesthetic in person.
            </p>
          </Reveal>
          <div className="mt-16">
            <RentalsGrid />
          </div>
        </div>
      </section>

      <ProofSection />

      <CrossPathways keys={['design-build', 'invest']} />

      <ClosingCta {...closingCta.vacationRentals} />
    </>
  );
}
