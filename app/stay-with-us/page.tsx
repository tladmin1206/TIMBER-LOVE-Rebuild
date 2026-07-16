import PageHero from '@/components/sections/PageHero';
import RentalsGrid from '@/components/sections/RentalsGrid';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Stay With Us',
  description:
    'Book a stay in one of our beautifully designed Timber and Love vacation rentals — from a historic Boise firehouse to an oceanfront Oahu beach house.',
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
      <section className="bg-ink py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">Our Rentals</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Find Your Perfect Stay</h2>
          </Reveal>
          <RentalsGrid />
        </div>
      </section>
      <BeginJourneyCta />
    </>
  );
}
