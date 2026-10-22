import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import Link from 'next/link';
import { projects } from '@/lib/content/projects';
import ProofSection from '@/components/sections/ProofSection';
import FaqSection from '@/components/sections/FaqSection';
import { faqs } from '@/lib/content/faqs';

export const metadata = pageMeta({
  title: 'Service Areas',
  description:
    'Timber + Love designs, builds, and remodels homes across Boise and the Treasure Valley, including Meridian, Eagle, Nampa, and the surrounding communities.',
  path: '/service-areas/',
});

// Treasure Valley communities Timber and Love serves. Kept honest: these are
// the communities in the design-build service area, not per-city project claims.
const communities = [
  'Boise',
  'Meridian',
  'Eagle',
  'Nampa',
  'Caldwell',
  'Kuna',
  'Star',
  'Garden City',
  'Middleton',
];

const areaProjectSlugs = ['promise-lane-spanish-modern', 'central-rim', 'north-end-gem', 'stucco-in-time', 'due-for-a-raze', 'the-firehouse'];
const areaProjects = areaProjectSlugs.flatMap((slug) => projects.filter((project) => project.slug === slug));

export default function Page() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Service Areas', path: '/service-areas/' },
        ])}
      />

      <PageHero
        eyebrow="Where We Work"
        title="Serving Boise & the Treasure Valley"
        subtitle="Timber + Love is a Boise-based design-build team working with homeowners across the Treasure Valley. If your home is nearby, we would love to hear about your project."
        image="/editorial/midcentury-entry.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Check Your Project</Cta>
        <Cta href="/contact/" variant="secondary">Contact Us</Cta>
      </PageHero>

      <TrustBar />

      {/* Communities */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Communities We Serve</p>
            <h2 className="h-section mt-4">Across the Treasure Valley</h2>
            <p className="text-lead mt-4">
              Based in Boise since {site.founded}, our team knows the neighborhoods, the housing stock, and the way this
              market builds. We work with homeowners throughout the surrounding communities.
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {communities.map((c) => (
              <li key={c} className="surface-card flex items-center gap-3 p-5">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="min-w-0 text-sm text-cream">{c}, ID</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm text-text-secondary">
            Not sure if your home is in our area? Share your location and a few details about your project.
            Our team will confirm how we can help.
          </p>
        </div>
      </section>

      {/* Breadth of custom homes built across the valley. */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">A Look Across the Valley</p>
            <h2 className="h-section mt-4">Different Homes. Distinctive Character.</h2>
            <p className="text-lead mt-4">
              Six individual homes, from a new custom build to Boise renovations with character and history. Open a project to explore its photographs and story.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areaProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}/`} className="group card-interactive block overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.cover} alt={project.gallery[0]?.alt || project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="eyebrow !text-[10px]">{project.location}</p>
                  <h3 className="h-card-sm mt-3">{project.title}</h3>
                  <span className="mt-4 inline-block text-xs uppercase tracking-[.14em] text-text-secondary">View the Home →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed photographic statement: our reach across the valley. */}
      <FeatureBand
        image="/projects/due-for-a-raze/living.webp"
        eyebrow="A Place to Call Home"
        title="Designed for Life in Idaho"
        body="From Boise's historic neighborhoods to new homes along the foothills, we build where our clients live."
        align="left"
        height="short"
      />

      {/* Local knowledge */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Local Knowledge</p>
            <h2 className="h-section mt-4">A Team That Knows Boise Homes</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead">
              From historic North End remodels to new construction on the edge of the foothills, we have spent years
              working with the kinds of homes and permitting that make the Treasure Valley distinct. That local
              perspective shows up in more realistic plans, budgets, and timelines.
            </p>
          </Reveal>
        </div>
      </section>

      <EditorialSplit
        image="/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg"
        imageAlt="Charcoal modern contemporary custom home with a butterfly roof, designed and built by Timber + Love in the Treasure Valley"
        eyebrow="Rooted in the Valley"
        title="Building Across the Treasure Valley"
        cta="Check Your Project"
        href="/design-and-build-questionnaire/"
        reverse
        tone="primary"
        ratio="landscape"
      >
        <p>
          Whether your home sits in an established Boise neighborhood or on a new lot near the foothills, we bring the
          same design-build team to the table. One group of designers and builders, from the first sketch through the
          final walkthrough.
        </p>
        <p>
          That continuity is what lets us plan realistically for the sites, styles, and permitting that make each
          Treasure Valley community its own.
        </p>
      </EditorialSplit>

      <ProofSection />

      <FaqSection items={faqs.serviceAreas} />

      <ClosingCta {...closingCta.serviceAreas} />
    </>
  );
}
