import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';

export const metadata = pageMeta({
  title: 'Sell Your Home for Cash',
  description:
    'Explore a direct home offer through Buy My House, an affiliated Timber and Love site. Learn who a cash sale suits and how the process works before you continue.',
  path: '/sell-for-cash/',
  image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Home-Buying-Background-2-min.jpg',
});

const steps = [
  {
    num: '01',
    heading: 'Share Your Property',
    body: 'You start by telling Buy My House about the home, including its location and condition. This gives the team the basic information they need to review your property.',
  },
  {
    num: '02',
    heading: 'The Team Reviews It',
    body: 'Buy My House looks over the details you provide and follows up to learn more about the home and your situation.',
  },
  {
    num: '03',
    heading: 'You Talk Through Options',
    body: 'From there, you can discuss whether a direct sale makes sense for you. There is no obligation to move forward, and you stay in control of the decision.',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Sell for Cash"
        title="Sell Your Home for Cash"
        subtitle="A direct home offer can be a simpler path for homeowners who want to sell without listing on the open market. Here is who it suits and how it works."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Home-Buying-Background-2-min.jpg"
      >
        <Cta href={site.external.cashOffers} external newTab track="cash_request">
          Request a Cash Offer
        </Cta>
      </PageHero>

      <TrustBar />

      {/* Who it is for */}
      <section className="bg-bg-primary section">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="eyebrow">Who It Is For</p>
            <h2 className="h-section mt-4">A Simpler Way to Sell</h2>
            <p className="text-lead mt-5">
              A direct home offer can suit people who value a straightforward process over the traditional listing
              route. That might be an owner facing a move on a tight timeline, someone with a property that needs work,
              or a homeowner who simply prefers to skip showings and open houses. If any of that sounds like you, it is
              worth a look.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How the process works */}
      <section className="bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How It Works</p>
            <h2 className="h-section mt-4">A High-Level Look at the Process</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 90} className="surface-card p-8">
                <div className="font-sans text-4xl tracking-brand text-accent/70">{s.num}</div>
                <h3 className="h-card-sm mt-4">{s.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What happens after clicking + external note */}
      <section className="bg-bg-primary section">
        <div className="container-wide max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">What Happens Next</p>
            <h2 className="h-section mt-4">Continue to Buy My House</h2>
            <p className="text-lead mt-5">
              When you request a cash offer, you continue to Buy My House at buymyhouse.co, an affiliated Timber and
              Love site. There you can share details about your home and start a conversation with their team. Nothing
              is decided by clicking through, and you are never committed to a sale.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta href={site.external.cashOffers} external newTab track="cash_request">
                Request a Cash Offer
              </Cta>
            </div>
            <p className="mt-5 text-xs text-text-muted">
              Buy My House (buymyhouse.co) is an affiliated Timber and Love site. It opens in a new tab so this page
              stays open behind it.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta {...closingCta.sellForCash} />
    </>
  );
}
