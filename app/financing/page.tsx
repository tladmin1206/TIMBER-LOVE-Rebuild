import PhotoCard from '@/components/ui/PhotoCard';
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
import EditorialSplit from '@/components/sections/EditorialSplit';

export const metadata = pageMeta({
  title: 'Financing Your Project',
  description:
    'Understand how homeowners typically finance a design-build or remodeling project with Timber + Love in Boise. General guidance, not financial advice.',
  path: '/financing/',
  image: '/editorial/estate-breakfast.webp',
});

// General financing approaches homeowners commonly consider. Described at a high
// level only: no rates, lenders, or terms are stated (those are personal and
// change). TEMP: if Timber and Love establishes specific lending partners or
// programs, add them here with approved details.
const options = [
  {
    heading: 'Cash or Savings', image: '/projects/promise-ln-5106/5106-promise-ln-kitchen-dining.jpg',
    body: 'Some homeowners fund a project directly. This keeps things simple and avoids interest, though it ties up available cash.',
  },
  {
    heading: 'Home Equity (HELOC or Loan)', image: '/projects/stucco-in-time/living.webp',
    body: 'Many homeowners tap the equity they have already built. A line of credit or a fixed home-equity loan can spread a project across time.',
  },
  {
    heading: 'Renovation Loans', image: '/projects/north-end-gem/kitchen.webp',
    body: 'Renovation-specific loans are designed for remodels and can fold the project cost into a new or refinanced mortgage.',
  },
  {
    heading: 'Construction Loans', image: '/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg',
    body: 'For new builds and larger additions, construction financing funds the work in stages and often converts to a standard mortgage at completion.',
  },
];

const faq = [
  {
    q: 'Does Timber + Love provide financing?',
    a: 'Timber + Love is a design-build and real estate company, not a lender. We help you understand how a project is typically financed and plan a realistic budget, then you work directly with your bank, credit union, or a lender of your choice.',
  },
  {
    q: 'When should I think about financing?',
    a: 'Early. Understanding your budget and financing approach up front helps us design a project that fits, which is exactly what the initial consultation is for.',
  },
  {
    q: 'Can I get an idea of cost before I talk to a lender?',
    a: 'Start by talking with our team about your goals, scope, and budget. We can help you understand what needs to be defined before you discuss financing with your lender.',
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
        image="/editorial/craftsman-dining.webp"
        imageMobile="/editorial/estate-breakfast.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Start a Project</Cta>
        <Cta href="/our-process/" variant="secondary">Our Process</Cta>
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
              <Reveal key={o.heading} delay={i * 70} className="h-full">
                <PhotoCard image={o.image}>
                <div className="font-sans text-4xl tracking-brand text-cream/80">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="h-card mt-4">{o.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{o.body}</p>
                </PhotoCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-text-muted">
            Timber + Love is not a lender or financial advisor. This information is general and educational. Rates,
            terms, and eligibility vary, so confirm the details that apply to you with a qualified professional.
          </p>
        </div>
      </section>

      {/* How it fits the process */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Plan With Confidence</p>
            <h2 className="h-section mt-4">Start With a Realistic Number</h2>
            <p className="text-lead mt-4">
              A clear scope makes every financing conversation easier. Tell us about your home and your goals,
              and we can discuss your priorities and the budget you have in mind.
            </p>
            <div className="cta-row mt-7">
              <Cta href="/design-and-build-questionnaire/" variant="primary">Start a Project</Cta>
              <Cta href="/design-and-build/" variant="secondary">Explore Design + Build</Cta>
            </div>
          </Reveal>
          <Reveal delay={100} className="surface-card p-8">
            <p className="field-label">A Simple Order of Operations</p>
            <ol className="mt-5 space-y-4 text-sm text-text-secondary">
              <li className="flex gap-3"><span className="text-accent">1.</span> Share your project goals and the budget you have in mind.</li>
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
        imageAlt="Spanish modern custom kitchen with a marble backsplash and professional range, built by Timber + Love"
        eyebrow="Worth Planning For"
        title="A Well-Built Home, Within Reach"
        cta="Start a Project"
        href="/design-and-build-questionnaire/"
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
