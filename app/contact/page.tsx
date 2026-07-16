import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import ContactForm from '@/components/forms/ContactForm';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact',
  description:
    'Reach the Timber and Love team in Boise. Pick the option closest to your goal — design and build, buying or selling, cash offers, investing, or a vacation stay — or send a general note.',
  path: '/contact/',
});

// Routing options. Each card points a specific need to the right destination
// so no single questionnaire has to absorb every kind of inquiry.
const paths = [
  {
    title: 'Start a Design + Build Project',
    line: 'Custom homes, additions, and whole-home remodels in the Boise area.',
    href: '/design-and-build-questionnaire/',
    cta: 'Start a Project',
    track: 'contact_designbuild',
  },
  {
    title: 'Buy or Sell Real Estate',
    line: 'Work with Timber and Love Realty on your next move in the local market.',
    href: '/buy-or-sell/',
    cta: 'Buy or Sell a Home',
    track: 'contact_realty',
  },
  {
    title: 'Sell Your Home for Cash',
    line: 'A direct offer for homeowners who want a simpler, faster sale.',
    href: '/sell-for-cash/',
    cta: 'Request a Cash Offer',
    track: 'contact_cash',
  },
  {
    title: 'Invest in Real Estate',
    line: 'Explore investment opportunities and how to get involved.',
    href: '/invest/',
    cta: 'Explore Investing',
    track: 'contact_invest',
  },
  {
    title: 'Vacation Rentals & Stays',
    line: 'Questions about booking a Timber and Love vacation property.',
    href: '/stay-with-us/',
    cta: 'View Vacation Rentals',
    track: 'contact_stay',
  },
  {
    title: 'Media & Partnerships',
    line: 'Appearance requests, brand partnerships, and press inquiries.',
    href: '#press',
    cta: 'Press & Partnerships',
    track: 'contact_press',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="How Can We Help?"
        subtitle="Pick the option closest to your goal and we will point you to the right place, or reach out directly and a member of our team will follow up."
        image="/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg"
      />

      {/* Choose Your Path — route each need to the correct destination */}
      <section className="bg-bg-primary py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Choose Your Path</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Find the Right Starting Point</h2>
            <p className="text-lead mt-5">
              Every inquiry has its own best route. Choose the path that matches what you need and we will
              take it from there.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paths.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="surface-card flex flex-col p-8">
                <h3 className="h-display text-xl">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{p.line}</p>
                <div className="mt-6">
                  <Cta href={p.href} variant="secondary" track={p.track} className="w-full">
                    {p.cta}
                  </Cta>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* General inquiry — form plus primary customer contact details */}
      <section id="general" className="border-t border-border-subtle bg-bg-secondary py-20 sm:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">General Inquiry</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Send Us a Note</h2>
            <p className="text-lead mt-5">
              For general questions, send us a note and a member of our team will get back to you. If you
              already know which path fits, the options above will get you there faster.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="field-label">Call</p>
                <a href={site.phoneHref} className="link-underline mt-2 inline-block text-lg text-cream">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="field-label">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline mt-2 inline-block text-lg text-cream"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="field-label">Visit</p>
                <p className="mt-2 text-lg text-text-secondary">{site.address.full}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90} className="surface-card p-8 sm:p-10">
            <ContactForm source="contact-page" />
          </Reveal>
        </div>
      </section>

      {/* Press & Partnerships — kept separate from customer contact routing */}
      <section id="press" className="border-t border-border-subtle bg-bg-primary py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Press & Partnerships</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Media, Brand & Appearance Inquiries</h2>
            <p className="text-lead mt-5">
              For appearance requests, brand partnerships, and press, reach out to our partnerships contact
              below. This line is dedicated to media and collaboration inquiries.
            </p>
          </Reveal>

          <Reveal delay={90} className="surface-card mx-auto mt-12 max-w-xl p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="field-label">Partnerships Line</p>
                <a
                  href={site.partnerships.phoneHref}
                  className="link-underline mt-2 inline-block text-lg text-cream"
                >
                  {site.partnerships.phone}
                </a>
              </div>
              <div>
                <p className="field-label">Partnerships Email</p>
                <a
                  href={`mailto:${site.partnerships.email}`}
                  className="link-underline mt-2 inline-block text-lg text-cream"
                >
                  {site.partnerships.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
