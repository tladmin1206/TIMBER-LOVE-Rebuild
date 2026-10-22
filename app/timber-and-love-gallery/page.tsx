import { Suspense } from 'react';
import PageHero from '@/components/sections/PageHero';
import ProjectGrid from '@/components/gallery/ProjectGrid';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';
import { projects } from '@/lib/content/projects';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import FeatureBand from '@/components/sections/FeatureBand';
import TrustBar from '@/components/sections/TrustBar';
import ProofSection from '@/components/sections/ProofSection';

export const metadata = pageMeta({
  title: 'Our Work',
  description:
    'Explore Timber + Love custom homes, HGTV transformations, and renovated retreats in Idaho and Hawaii, with photographs and the story behind each project.',
  path: '/timber-and-love-gallery/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Homes With a Story"
        subtitle="Custom homes, HGTV transformations, and distinctive retreats. Explore the variety of our work, from Boise to the Pacific."
        image={projects[0]?.cover}
        height="short"
      />

      <TrustBar />

      {/* Curated project case studies */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Featured Projects</p>
            <h2 className="h-section mt-4">Selected Work</h2>
            <p className="text-lead mt-4">
              {projects.length} distinct homes, each with its own character. Explore new construction, renovated retreats, and the homes featured on HGTV’s Boise Boys.
            </p>
          </Reveal>
          <div className="mt-10">
            <Suspense fallback={<div className="min-h-[400px]" />}>
              <ProjectGrid />
            </Suspense>
          </div>
        </div>
      </section>

      {/* A photographic transition from the projects to client stories. */}
      <FeatureBand
        image="/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Main-Living-Space-1-scaled.jpg"
        eyebrow="Designed and Built by Us"
        title="Where the Details Live"
        body="Every project is fully custom, designed and built in house from the first concept to the final detail."
        align="left"
        height="short"
      />

      <ProofSection />

      <ClosingCta {...closingCta.designBuildGallery} />
    </>
  );
}
