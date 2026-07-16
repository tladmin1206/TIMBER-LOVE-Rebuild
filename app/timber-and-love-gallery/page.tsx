import PageHero from '@/components/sections/PageHero';
import Gallery from '@/components/ui/Gallery';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import { pageMeta } from '@/lib/seo';
import data from '@/content/gallery.json';

export const metadata = pageMeta({
  title: 'Timber and Love Gallery',
  description:
    "Whether you're looking to build new, remodel, buy, or sell, our team is here to help you every step of the way. Browse our gallery of design and build projects.",
  path: '/timber-and-love-gallery/',
});

const images = (data.gallery as string[]).map((src, i) => ({ src, alt: `Timber and Love project ${i + 1}` }));

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Gallery"
        subtitle="A collection of the spaces, details, and design inspiration behind Timber and Love."
        image={images[0]?.src}
        height="short"
      />
      <section className="bg-ink py-16 sm:py-24">
        <div className="container-wide">
          <Gallery images={images} columns={4} />
        </div>
      </section>
      <BeginJourneyCta />
    </>
  );
}
