import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = pageMeta({
  title: 'Financing Your Project',
  description:
    'Understand how homeowners typically finance a design-build or remodeling project with Timber and Love in Boise. General guidance, not financial advice.',
  path: '/financing/',
  image: '/wp-content/uploads/2024/03/TimberandLoveHomeRemodelingCompany-Design-BuildBackgroundImage-ezgif.com-webp-to-jpg-converter-1.jpg',
});

// General financing approaches homeowners commonly consider. Described at a high
// level only — no rates, lenders, or terms are stated (those are personal and
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
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Ways to Finance</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Common Ways Homeowners Pay for a Project</h2>
            <p className="text-lead mt-4">
              Every situation is different. These are the approaches we see most often, described at a high level to help
              you start the conversation with your lender.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {options.map((o, i) => (
              <Reveal key={o.heading} delay={i * 70} className="surface-card p-7">
                <div className="font-sans text-4xl tracking-brand text-accent/70">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="h-display mt-4 text-xl">{o.heading}</h3>
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
      <section className="border-t border-border-subtle bg-bg-secondary py-20 sm:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Plan With Confidence</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Start With a Realistic Number</h2>
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

      {/* FAQ */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Financing FAQ</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Common Questions</h2>
          </Reveal>
          <div className="mt-12">
            <FAQ items={faq} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-secondary py-20 text-center sm:py-24">
        <div className="container-wide max-w-2xl">
          <Reveal>
            <p className="eyebrow">Ready When You Are</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Let&apos;s Talk Through Your Project</h2>
            <p className="text-lead mt-4">Share a few details and we will help you plan a project that fits your goals and your budget.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
              <Cta href="/contact/" variant="secondary">Contact Us</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
