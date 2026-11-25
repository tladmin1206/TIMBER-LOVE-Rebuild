import SiteImage from '@/components/ui/SiteImage';
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
import Link from 'next/link';
import { projects } from '@/lib/content/projects';
import ProofSection from '@/components/sections/ProofSection';
import FaqSection from '@/components/sections/FaqSection';
import { faqs } from '@/lib/content/faqs';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Treasure Valley Design-Build | Boise to Eagle | Timber + Love",
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
        title="Design-Build Across Boise and the Treasure Valley"
        subtitle="Timber + Love is a Boise-based design-build team working with homeowners across the Treasure Valley. If your house is nearby, we'd like to hear about it."
        image="/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg"
        imageMobile="/editorial/midcentury-entry.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Tell Us About Your House</Cta>
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
              We&apos;ve worked out of Boise since {site.founded} and know the neighborhoods and the houses in them. We work with homeowners in the surrounding communities too.
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
            Not sure if your house is in our area? Tell us where it is and what you have in mind, and we&apos;ll tell you.
          </p>
        </div>
      </section>

      {/* Breadth of custom homes built across the valley. */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Around the valley</p>
            <h2 className="h-section mt-4">A few of our houses</h2>
            <p className="text-lead mt-4">
              A few of our houses, from a new build to old Boise homes with some history.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areaProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}/`} className="group card-interactive block overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <SiteImage sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={project.cover} alt={project.gallery[0]?.alt || project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="eyebrow !text-[10px]">{project.location}</p>
                  <h3 className="h-card-sm mt-3">{project.title}</h3>
                  <span className="mt-4 inline-block text-xs uppercase tracking-[.14em] text-text-secondary">See the house →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed photographic statement: our reach across the valley. */}
      <FeatureBand
        image="/projects/due-for-a-raze/living.webp"
        eyebrow="Where we build"
        title="From the North End to the foothills"
        body="We build where our clients live."
        align="left"
        height="short"
      />

      {/* Local knowledge */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Local Knowledge</p>
            <h2 className="h-section mt-4">We know Boise houses</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead">
              We know the older North End houses, the new lots near the foothills and how permits go here. That keeps plans, budgets and schedules honest.
            </p>
          </Reveal>
        </div>
      </section>


      <ProofSection />

      <FaqSection items={faqs.serviceAreas} />

      <ClosingCta {...closingCta.serviceAreas} />
    </>
  );
}
