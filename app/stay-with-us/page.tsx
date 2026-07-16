import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import RentalsGrid from '@/components/sections/RentalsGrid';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';

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
      <section className="bg-bg-primary py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">Our Rentals</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Find Your Perfect Stay</h2>
          </Reveal>
          <RentalsGrid />
        </div>
      </section>

      {/* Rental-appropriate closing CTA */}
      <section className="border-t border-border-subtle bg-bg-secondary py-20 text-center sm:py-24">
        <div className="container-wide max-w-2xl">
          <Reveal>
            <p className="eyebrow">Plan Your Stay</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Not Sure Which Property Fits?</h2>
            <p className="text-lead mt-4">
              Tell us your dates and who is coming, and our team will help you choose the right Timber and Love stay.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta href="/contact/" variant="primary">Need Help Choosing?</Cta>
              <Cta href="/the-firehouse/" variant="secondary">Explore a Property</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
