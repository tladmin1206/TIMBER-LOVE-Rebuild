import PageHero from '@/components/sections/PageHero';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import RentalsGrid from '@/components/sections/RentalsGrid';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';

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
        subtitle="Find your next getaway in Boise, McCall, or Oahu. Browse the homes, choose a setting, and check your dates."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Exterior-scaled.jpg"
      >
        <Cta href="/stay-with-us/" variant="primary">View All Stays</Cta>
      </PageHero>

      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Properties</p>
            <h2 className="h-section mt-4">Timber and Love Vacation Rentals</h2>
            <p className="text-lead mt-4">
              From a historic Boise firehouse to two oceanfront homes in Hawaii, find a place that fits your group and your plans.
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
          Choose between two homes in Kaʻaʻawa on Oahu’s windward coast. The Kualoa Beach House welcomes up to eight guests; The Caldwell Beach House has room for eleven.
        </p>
        <p>
          Explore each home’s photographs and amenities, then check your dates directly with Vacation Rental Oahu.
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
          Make it your base for a Boise visit, with plenty of character to come home to at the end of the day.
        </p>
      </EditorialSplit>

      <FeatureBand
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg"
        eyebrow="Mountain Modern"
        title="The Chalet Awaits"
        body="Gather your favorite people for a slower pace and a mountain getaway in McCall."
        align="left"
        height="short"
      />

      <ClosingCta {...closingCta.vacationRentals} />
    </>
  );
}
