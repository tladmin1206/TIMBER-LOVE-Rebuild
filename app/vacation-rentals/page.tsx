import PageHero from '@/components/sections/PageHero';
import RentalsGrid from '@/components/sections/RentalsGrid';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Vacation Rentals',
  description: 'We manage a portfolio of premium short-term rentals across Boise and beyond.',
  path: '/vacation-rentals/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Property Management"
        title="Vacation Rentals"
        subtitle="We manage a portfolio of premium short-term rentals across Boise and beyond — designed, built, and cared for by the Timber and Love team."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Exterior-scaled.jpg"
      />
      <section className="bg-ink py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <h2 className="h-display text-3xl sm:text-5xl">Our Vacation Rentals</h2>
            <p className="mt-6 text-body">
              We manage a portfolio of premium short-term rentals across Boise and beyond — designed, built, and cared
              for by the Timber and Love team.
            </p>
          </Reveal>
          <Reveal className="mb-10 mt-16">
            <p className="eyebrow">Boise Properties</p>
          </Reveal>
          <RentalsGrid />
        </div>
      </section>
      <BeginJourneyCta />
    </>
  );
}
