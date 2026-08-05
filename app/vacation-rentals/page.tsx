import PageHero from '@/components/sections/PageHero';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
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

      <EditorialSplit
        image="/wp-content/uploads/2025/12/1-Oceanfront-Oahu-vacation-rental-exterior-with-direct-beach-access.png"
        imageAlt="Oceanfront Oahu vacation rental exterior with direct access to a sandy beach and open water"
        eyebrow="Designed Getaways"
        title="From Boise to the Oahu Shore"
        cta="View All Stays"
        href="/stay-with-us/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          Wake up to ocean views in a home shaped by the same hands behind our Treasure Valley builds. Direct
          beach access, wide horizons, and interiors that feel unmistakably ours.
        </p>
        <p>
          It is a getaway and a portfolio piece in one, proof that Timber and Love design travels well beyond
          Boise.
        </p>
      </EditorialSplit>

      <EditorialSplit
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Living-Room-scaled.jpg"
        imageAlt="Living room inside the restored historic Boise firehouse featured on HGTV Boise Boys"
        eyebrow="Stay in a Story"
        title="A Historic Firehouse, Reimagined"
        reverse
        tone="primary"
        ratio="landscape"
      >
        <p>
          Our restored Boise firehouse, featured on HGTV Boise Boys, keeps its original character while living
          like a modern home. Soaring volume, warm materials, and thoughtful detail throughout.
        </p>
        <p>
          It is one of the most distinctive places to stay in the city, and every corner reflects how we work.
        </p>
      </EditorialSplit>

      <FeatureBand
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg"
        eyebrow="Mountain Modern"
        title="The Chalet Awaits"
        body="Wake up to ocean views or mountain air in a home shaped by the same hands behind our Treasure Valley builds."
        align="left"
        height="short"
      />

      <ProofSection />

      <CrossPathways keys={['design-build', 'invest']} />

      <ClosingCta {...closingCta.vacationRentals} />
    </>
  );
}
