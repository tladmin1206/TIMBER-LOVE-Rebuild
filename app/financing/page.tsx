import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import ProofSection from '@/components/sections/ProofSection';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';

export const metadata = pageMeta({
  title: 'Financing Your Project',
  description:
    'Understand how homeowners typically finance a design-build or remodeling project with Timber and Love in Boise. General guidance, not financial advice.',
  path: '/financing/',
  image: '/wp-content/uploads/2024/03/TimberandLoveHomeRemodelingCompany-Design-BuildBackgroundImage-ezgif.com-webp-to-jpg-converter-1.jpg',
});

// General financing approaches homeowners commonly consider. Described at a high
// level only: no rates, lenders, or terms are stated (those are personal and
// change). TEMP: if Timber and Love establishes specific lending partners or
// programs, add them here with approved details.
const options = [
  {
    heading: 'Cash or Savings',
    body: 'Some homeowners fund a project directly. This keeps things simple and avoids interest, though it ties up available cash.',
  },
  {
    heading: 'Home Equity (HELOC or Loan)',
    body: 'Many homeowners tap the equity they have already built. A line of credit or a fixed home-equity loan can spread a project across time.',
  },
  {
    heading: 'Renovation Loans',
    body: 'Renovation-specific loans are designed for remodels and can fold the project cost into a new or refinanced mortgage.',
  },
  {
    heading: 'Construction Loans',
    body: 'For new builds and larger additions, construction financing funds the work in stages and often converts to a standard mortgage at completion.',
  },
];

const faq = [
  {
    q: 'Does Timber and Love provide financing?',
    a: 'Timber and Love is a design-build and real estate company, not a lender. We help you understand how a project is typically financed and plan a realistic budget, then you work directly with your bank, credit union, or a lender of your choice.',
  },
  {
    q: 'When should I think about financing?',
    a: 'Early. Understanding your budget and financing approach up front helps us design a project that fits, which is exactly what the preliminary estimator and the initial consultation are for.',
  },
  {
    q: 'Can I get an idea of cost before I talk to a lender?',
    a: 'Yes. Our project estimator gives you a preliminary investment range in a couple of minutes, so you can walk into a financing conversation with a realistic number in mind.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. This page is general information to help you plan. Rates, terms, and eligibility vary by person and lender, so please confirm the specifics with a qualified financial professional.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          faqSchema(faq),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Design + Build', path: '/design-and-build/' },
            { name: 'Financing', path: '/financing/' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Financing"
        title="Financing Your Project"
        subtitle="A remodel or new build is a meaningful investment. Here is a plain-language look at how homeowners typically pay for one, so you can plan with confidence."
        image="/wp-content/uploads/2024/03/TimberandLoveHomeRemodelingCompany-Design-BuildBackgroundImage-ezgif.com-webp-to-jpg-converter-1.jpg"
        height="short"
      >
        <Cta href="/estimate/" variant="primary">Estimate Your Project</Cta>
        <Cta href="/design-and-build-questionnaire/" variant="secondary">Talk to Our Team</Cta>
      </PageHero>

      <TrustBar />

      {/* Ways to finance */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Ways to Finance</p>
            <h2 className="h-section mt-4">Common Ways Homeowners Pay for a Project</h2>
            <p className="text-lead mt-4">
              Every situation is different. These are the approaches we see most often, described at a high level to help
              you start the conversation with your lender.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {options.map((o, i) => (
              <Reveal key={o.heading} delay={i * 70} className="surface-card p-7">
                <div className="font-sans text-4xl tracking-brand text-accent/70">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="h-card mt-4">{o.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{o.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-text-muted">
            Timber and Love is not a lender or financial advisor. This information is general and educational. Rates,
            terms, and eligibility vary, so confirm the details that apply to you with a qualified professional.
          </p>
        </div>
      </section>

      {/* How it fits the process */}
      <section className="border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Plan With Confidence</p>
            <h2 className="h-section mt-4">Start With a Realistic Number</h2>
            <p className="text-lead mt-4">
              Knowing a preliminary range early makes every financing conversation easier. Use our estimator to get a
              range in about two minutes, then bring that number to your lender or to us.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Cta href="/estimate/" variant="primary">Estimate Your Project</Cta>
              <Cta href="/design-and-build/" variant="secondary">Explore Design + Build</Cta>
            </div>
          </Reveal>
          <Reveal delay={100} className="surface-card p-8">
            <p className="field-label">A Simple Order of Operations</p>
            <ol className="mt-5 space-y-4 text-sm text-text-secondary">
              <li className="flex gap-3"><span className="text-accent">1.</span> Get a preliminary range with the estimator.</li>
              <li className="flex gap-3"><span className="text-accent">2.</span> Talk with us about scope, priorities, and timing.</li>
              <li className="flex gap-3"><span className="text-accent">3.</span> Confirm your financing approach with your lender.</li>
              <li className="flex gap-3"><span className="text-accent">4.</span> Move into design with a budget you are confident in.</li>
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Editorial split: financing exists to make craftsmanship like this attainable */}
      <EditorialSplit
        image="/projects/promise-ln-5106/5106-promise-ln-kitchen-range.jpg"
        imageAlt="Spanish modern custom kitchen with a marble backsplash and professional range, built by Timber and Love"
        eyebrow="Worth Planning For"
        title="A Well-Built Home, Within Reach"
        cta="Estimate Your Project"
        href="/estimate/"
        tone="primary"
        ratio="landscape"
      >
        <p>
          Financing is not the goal. The home is. A kitchen finished to this level, with real materials and careful
          detailing, is exactly the kind of result a clear budget is meant to make attainable.
        </p>
        <p>
          When you know your range up front, you can plan for the finishes that matter to you instead of guessing, and
          the project stays grounded in what you are comfortable spending.
        </p>
      </EditorialSplit>

      {/* Editorial split: the everyday spaces a plan pays for */}
      <EditorialSplit
        image="/projects/promise-ln-5120/5120-promise-ln-great-room-dining.jpg"
        imageAlt="Open great room and dining space in a modern farmhouse with black windows, built by Timber and Love"
        eyebrow="The Payoff of Planning"
        title="Rooms You Will Actually Live In"
        cta="Explore Design + Build"
        href="/design-and-build/"
        reverse
        tone="secondary"
        ratio="landscape"
      >
        <p>
          A smart financing plan is what turns a great room like this from a someday idea into a place your family
          gathers. The everyday spaces are where the investment shows up most.
        </p>
        <p>
          Start with a realistic number, decide how you want to fund it, and move into design knowing the home on the
          other side is one you can afford to enjoy.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement before the FAQ and closing ask */}
      <FeatureBand
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Kitchen-1-scaled.jpg"
        eyebrow="Plan With Confidence"
        title="Make the Dream Attainable"
        body="A clear budget turns a someday project into a real plan. Start with a realistic range, then bring it to the table."
        cta="Plan Your Project"
        href="/investment-planner/"
        height="short"
      />

      {/* FAQ */}
      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Financing FAQ</p>
            <h2 className="h-section mt-4">Common Questions</h2>
          </Reveal>
          <div className="mt-12">
            <FAQ items={faq} />
          </div>
        </div>
      </section>

      <ProofSection />

      <ClosingCta {...closingCta.financing} />
    </>
  );
}
