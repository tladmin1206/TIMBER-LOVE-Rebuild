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
        image="/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg"
        height="short"
      >
        <Cta href="/estimate/" variant="primary">Check Your Project</Cta>
        <Cta href="/contact/" variant="secondary">Contact Us</Cta>
      </PageHero>

      <TrustBar />

      {/* Communities */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Communities We Serve</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Across the Treasure Valley</h2>
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

      {/* Local knowledge */}
      <section className="border-t border-border-subtle bg-bg-secondary py-20 sm:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Local Knowledge</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">A Team That Knows Boise Homes</h2>
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

      <ClosingCta {...closingCta.serviceAreas} />
    </>
  );
}
