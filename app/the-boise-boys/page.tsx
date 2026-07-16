import PageHero from '@/components/sections/PageHero';
import Gallery from '@/components/ui/Gallery';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/sections/CtaBand';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import Testimonials from '@/components/ui/Testimonials';
import { site } from '@/lib/site';
import { testimonials } from '@/lib/content/home';
import { pageMeta } from '@/lib/seo';
import data from '@/content/the-boise-boys.json';

export const metadata = pageMeta({
  title: 'The Boise Boys',
  description:
    "Whether you're looking to build new, remodel, buy, or sell, our team is here to help you every step of the way. Explore some of our favorite Boise Boys projects.",
  path: '/the-boise-boys/',
});

const intro = (data.sections as any[])[0]?.paragraphs?.[0] || '';
const images = (data.gallery as string[]).map((src, i) => ({ src, alt: `Boise Boys project photo ${i + 1}` }));

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="HGTV"
        title="The Boise Boys"
        subtitle={intro}
        image={data.hero.image}
      >
        <a href={site.shows.boiseBoys} target="_blank" rel="noopener noreferrer" className="btn-solid">Watch on Discovery +</a>
        <a href={site.shows.outgrown} target="_blank" rel="noopener noreferrer" className="btn-outline">Watch Outgrown</a>
      </PageHero>

      {/* Featured episode + gallery */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">See Our Work</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Some Of Our Favorite Boise Boys Projects</h2>
            <p className="mx-auto mt-5 max-w-xl text-body">
              A look inside Episode 2 — &ldquo;All-In On Boise&apos;s Central Rim&rdquo; — and other transformations from the show.
            </p>
          </Reveal>
          <div className="mt-14">
            <Gallery images={images} columns={4} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-cream/10 bg-panel py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Testimonials</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">From Fans &amp; Clients</h2>
          </Reveal>
          <div className="mt-14">
            <Testimonials items={testimonials} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Inspired By The Show?"
        title="Let's Build Something Together"
        body="Bring the Boise Boys touch to your own home. Start with our design + build questionnaire and let's see if we're a good fit."
        image={images[0]?.src || data.hero.image}
        primary={<a href="/design-and-build-questionnaire/" className="btn-solid">Get Started</a>}
      />

      <BeginJourneyCta />
    </>
  );
}
