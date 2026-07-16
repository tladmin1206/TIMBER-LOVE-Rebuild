import { Suspense } from 'react';
import PageHero from '@/components/sections/PageHero';
import Gallery from '@/components/ui/Gallery';
import ProjectGrid from '@/components/gallery/ProjectGrid';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';
import { projects } from '@/lib/content/projects';
import gallery from '@/content/gallery.json';

export const metadata = pageMeta({
  title: 'Our Work',
  description:
    'A curated portfolio of Timber and Love design and build projects in Boise, plus design inspiration behind our work.',
  path: '/timber-and-love-gallery/',
});

// Unattributed design images, presented clearly as inspiration (not projects).
const inspiration = (gallery.gallery as string[]).map((src, i) => ({
  src,
  alt: `Timber and Love design inspiration ${i + 1}`,
}));

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Projects and Inspiration"
        subtitle="A curated look at Timber and Love projects in Boise, alongside the design details that inspire our work."
        image={projects[0]?.cover}
        height="short"
      />

      {/* Curated project case studies */}
      <section className="bg-bg-primary py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Featured Projects</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Selected Work</h2>
            <p className="text-lead mt-4">
              Real Timber and Love projects, including transformations documented on HGTV’s Boise Boys.
            </p>
          </Reveal>
          <div className="mt-10">
            <Suspense fallback={<div className="min-h-[400px]" />}>
              <ProjectGrid />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Design inspiration — clearly separated from completed projects */}
      <section className="border-t border-border-subtle bg-bg-secondary py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Design Inspiration</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Details &amp; Inspiration</h2>
            <p className="text-lead mt-4">
              A collection of design details and inspiration that shape our point of view. These images illustrate style
              and direction rather than specific completed projects.
            </p>
          </Reveal>
          <Gallery images={inspiration} columns={4} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-primary py-20 text-center sm:py-24">
        <div className="container-wide max-w-2xl">
          <Reveal>
            <p className="eyebrow">Start a Conversation</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Have a Project in Mind?</h2>
            <p className="text-lead mt-4">
              Tell us about your home and goals, and our team will follow up about next steps.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
              <Cta href="/estimate/" variant="secondary">Estimate Your Project</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
