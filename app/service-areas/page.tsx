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
import Gallery from '@/components/ui/Gallery';
import ProofSection from '@/components/sections/ProofSection';
import FaqSection from '@/components/sections/FaqSection';
import { faqs } from '@/lib/content/faqs';

export const metadata = pageMeta({
  title: 'Service Areas',
  description:
    'Timber and Love designs, builds, and remodels homes across Boise and the Treasure Valley, including Meridian, Eagle, Nampa, and the surrounding communities.',
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
        subtitle="Timber and Love is a Boise-based design-build team working with homeowners across the Treasure Valley. If your home is nearby, we would love to hear about your project."
        image="/editorial/midcentury-entry.webp"
        height="short"
      >
        <Cta href="/estimate/" variant="primary">Check Your Project</Cta>
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
                <span className="text-sm text-cream">{c}, ID</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm text-text-secondary">
            Not sure if your home is in our area? The quickest way to find out is to start the project estimator, which
            checks your location as part of the first step.
          </p>
        </div>
      </section>

      {/* Breadth of custom homes built across the valley. */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">A Look Across the Valley</p>
            <h2 className="h-section mt-4">Homes We Have Built Around the Treasure Valley</h2>
            <p className="text-lead mt-4">
              Different neighborhoods, different styles, one team. A few of the custom homes and renovations we have
              delivered for families across the region.
            </p>
          </Reveal>
          <div className="mt-12">
            <Gallery
              images={[
                {
                  src: '/projects/promise-ln-5106/5106-promise-ln-exterior-front.jpg',
                  alt: 'Spanish modern custom home with white stucco and arches, built by Timber and Love in the Treasure Valley',
                },
                {
                  src: '/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg',
                  alt: 'Modern farmhouse custom home with board-and-batten siding and black windows in the Treasure Valley',
                },
                {
                  src: '/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg',
                  alt: 'Modern contemporary custom home with a charcoal exterior and butterfly roof in the Treasure Valley',
                },
                {
                  src: '/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Exterior-1-3-scaled.jpg',
                  alt: 'Renovated Central Rim home exterior in a Boise neighborhood, remodeled by Timber and Love',
                },
              ]}
              columns={3}
            />
          </div>
        </div>
      </section>

      {/* Full-bleed photographic statement: our reach across the valley. */}
      <FeatureBand
        image="/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Exterior-1-3-scaled.jpg"
        eyebrow="Rooted in the Valley"
        title="Building Across the Treasure Valley"
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
        imageAlt="Charcoal modern contemporary custom home with a butterfly roof, designed and built by Timber and Love in the Treasure Valley"
        eyebrow="Rooted in the Valley"
        title="Building Across the Treasure Valley"
        cta="Check Your Project"
        href="/estimate/"
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
