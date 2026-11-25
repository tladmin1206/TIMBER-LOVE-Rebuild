import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
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

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Our Work | Boise Custom Homes and Remodels | Timber + Love",
  description:
    'Timber + Love custom homes, HGTV remodels and vacation homes in Idaho and Hawaii, with photos of each one.',
  path: '/timber-and-love-gallery/',
});

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Our Work', path: '/timber-and-love-gallery/' }])} />
      <PageHero
        eyebrow="Our Work"
        title="Our Work"
        subtitle="Custom homes, HGTV remodels and a few places you can stay. Boise to Oahu."
        image={projects[0]?.cover}
        height="short"
      />

      <TrustBar />

      {/* Curated project case studies */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Featured Projects</p>
            <h2 className="h-section mt-4">Our houses</h2>
            <p className="text-lead mt-4">
              {projects.length} houses so far. New builds, vacation homes and the Boise Boys remodels.
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
        eyebrow="In house"
        title="Designed and built by us"
        body="We design and build everything in house."
        align="left"
        height="short"
      />

      <ProofSection />

      <ClosingCta {...closingCta.designBuildGallery} />
    </>
  );
}
