import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Buy or Sell a Home in Boise',
  description:
    'Buy or sell a home in Boise with Timber and Love Realty. Local market experience for buyers and sellers, with listings and support on our affiliated real estate site.',
  path: '/buy-or-sell/',
  image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Realty-Background-1-scaled-1.jpg',
});

const sections = [
  {
    eyebrow: 'Buying',
    heading: 'Find a Home That Fits Your Life',
    body: 'Buying a home is a big decision, and it helps to have people who know the area well. Timber and Love Realty works with buyers across Boise to search current listings, compare neighborhoods, and understand what a home is really offering. You set the pace, and the team keeps the details organized so you can make a confident choice.',
  },
  {
    eyebrow: 'Selling',
    heading: 'Sell With Local Guidance',
    body: 'When it is time to sell, presentation and pricing matter. Timber and Love Realty helps sellers prepare a home for the market, position it for the right buyers, and manage the process through to closing. You get straightforward advice grounded in what is actually happening in the Boise market.',
  },
  {
    eyebrow: 'Local Market Experience',
    heading: 'People Who Know Boise',
    body: 'Timber and Love has been part of the Boise community since 2015, and that local perspective carries into every real estate conversation. Buyers and sellers benefit from a team that understands the neighborhoods, the housing stock, and the way this market moves.',
  },
  {
    eyebrow: 'Who It Serves',
    heading: 'Buyers and Sellers Across the Treasure Valley',
    body: 'Whether you are searching for your first home, moving up, or listing a property you have loved for years, Timber and Love Realty works with people at many stages. The goal is the same each time: clear communication and real estate support you can trust.',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Buy or Sell"
        title="Buy or Sell a Home in Boise"
        subtitle="Timber and Love Realty helps people buy and sell homes across Boise, backed by local market experience and a team that knows the area."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Realty-Background-1-scaled-1.jpg"
      >
        <Cta href={site.external.realty} external newTab track="realty_browse">
          Browse Homes
        </Cta>
        <Cta href={site.external.realty} variant="secondary" external newTab track="realty_sell">
          Sell a Home
        </Cta>
      </PageHero>

      {/* What visitors will find on the linked site */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What You Will Find</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Continue to Timber and Love Realty</h2>
            <p className="text-lead mt-5">
              Timber and Love Realty is our affiliated real estate site. There you can browse current listings, learn
              about buying and selling in Boise, and connect with the team directly. This page introduces the site so
              you know what to expect before you head over.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Buying / Selling / Local / Who it serves */}
      <section className="bg-bg-secondary py-20 sm:py-28">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2">
            {sections.map((s, i) => (
              <Reveal key={s.eyebrow} delay={i * 80} className="surface-card p-8">
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="h-display mt-3 text-xl">{s.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Primary external CTA with affiliated-site note */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Visit the Site</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Ready to Look at Homes?</h2>
            <p className="text-lead mt-5">
              Start browsing listings or begin a conversation about selling. You will continue to Timber and Love
              Realty, our affiliated real estate site, in a new tab.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Cta href={site.external.realty} external newTab track="realty_visit">
                Visit Timber and Love Realty
              </Cta>
            </div>
            <p className="mt-5 text-xs text-text-muted">
              Timber and Love Realty is an affiliated Timber and Love site. It opens in a new tab so this page stays
              open behind it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Not the right path? */}
      <section className="border-t border-border-subtle bg-bg-secondary py-16 sm:py-20">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Not the Right Path?</p>
            <h2 className="h-display mt-4 text-2xl sm:text-3xl">We Can Point You in the Right Direction</h2>
            <p className="text-lead mt-5">
              If buying or selling is not quite what you had in mind, reach out and we will help you find the right
              part of Timber and Love.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta href="/contact/" variant="secondary" track="buy_sell_contact">
                Contact Us
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
