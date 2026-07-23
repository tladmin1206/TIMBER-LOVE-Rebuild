import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';

export const metadata = pageMeta({
  title: 'Invest in Real Estate',
  description:
    'Learn about real estate investment information available through Timber and Love Realty, an affiliated Timber and Love site, and who it is intended for.',
  path: '/invest/',
  image:
    '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg',
});

const sections = [
  {
    eyebrow: 'What Is Available',
    heading: 'Information and Opportunities',
    body: 'The affiliated site shares real estate investment information along with opportunities to invest alongside the Timber and Love team. It is a place to learn how the group approaches real estate investment and to see whether it lines up with what you are looking for.',
  },
  {
    eyebrow: 'Who It Is For',
    heading: 'People Considering Real Estate Investment',
    body: 'This information is intended for people who are exploring real estate as part of their broader plans and want to understand the options before making any commitment. It is a starting point for a conversation, not a decision you make on the spot.',
  },
  {
    eyebrow: 'What Happens Next',
    heading: 'You Continue to the Affiliated Site',
    body: 'When you choose to explore, you continue to Timber and Love Realty, an affiliated Timber and Love site, where you can read more and reach out to the team. Clicking through starts the conversation and commits you to nothing.',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Invest"
        title="Invest in Real Estate"
        subtitle="Learn about real estate investment information and opportunities available through Timber and Love, and see whether they fit what you are looking for."
        image="/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg"
      >
        <Cta href={site.external.invest} external newTab track="invest_explore">
          Explore Investment Opportunities
        </Cta>
      </PageHero>

      <TrustBar />

      {/* What is available / who it is for / what happens next */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Before You Continue</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">What to Expect</h2>
            <p className="text-lead mt-5">
              This page introduces the affiliated site so you know what you are stepping into. Here is what is
              available, who it is intended for, and what happens when you head over.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {sections.map((s, i) => (
              <Reveal key={s.eyebrow} delay={i * 90} className="surface-card p-8">
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="h-display mt-3 text-lg">{s.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Primary external CTA + affiliated-site note */}
      <section className="bg-bg-secondary py-20 sm:py-28">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">Take a Look</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Explore the Details</h2>
            <p className="text-lead mt-5">
              Read more about how Timber and Love approaches real estate investment and reach out with your questions.
              You will continue to Timber and Love Realty, our affiliated site, in a new tab.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta href={site.external.invest} external newTab track="invest_explore">
                Explore Investment Opportunities
              </Cta>
            </div>
            <p className="mt-5 text-xs text-text-muted">
              This link opens Timber and Love Realty, an affiliated Timber and Love site, in a new tab so this page
              stays open behind it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Financial disclaimer */}
      <section className="bg-bg-primary py-12 sm:py-16">
        <div className="container-wide max-w-3xl">
          <Reveal className="surface-card p-8">
            <p className="eyebrow">Disclaimer</p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              The information provided here and on the affiliated site is general in nature and is offered for
              educational purposes only. It is not financial, investment, tax, or legal advice, and it is not a
              recommendation to buy or sell any asset. No returns or outcomes are promised or guaranteed. All
              investments carry risk. Please consult a qualified professional before making any financial decision.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta {...closingCta.invest} />
    </>
  );
}
