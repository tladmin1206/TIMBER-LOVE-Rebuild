import PageHero from '@/components/sections/PageHero';
import RentalsGrid from '@/components/sections/RentalsGrid';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';

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
      <section className="bg-bg-primary py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our Properties</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Timber and Love Vacation Rentals</h2>
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

      {/* Rental-appropriate closing CTA (no construction questionnaire). */}
      <section className="bg-bg-secondary py-20 text-center sm:py-24">
        <div className="container-wide max-w-2xl">
          <Reveal>
            <p className="eyebrow">Plan Your Stay</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Find the Right Property</h2>
            <p className="text-lead mt-4">
              Compare our homes and check availability for your dates. Have a question about a property? Our team is
              happy to help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta href="/stay-with-us/" variant="primary">View More Stays</Cta>
              <Cta href="/contact/" variant="secondary">Need Help Choosing?</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
