import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import PhotoCard from '@/components/ui/PhotoCard';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import ContactForm from '@/components/forms/ContactForm';
import WhatHappensNext from '@/components/sections/WhatHappensNext';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Contact Timber + Love | Boise Design-Build and Real Estate",
  description: "Contact Timber + Love in Boise at (208) 995-9516 or 3024 W Fairview Ave. Choose design-build, real estate, a cash offer or a vacation stay and we will reply.",
  path: '/contact/',
});

// Routing options. Each card points a specific need to the right destination
// so no single questionnaire has to absorb every kind of inquiry.
const paths = [
  {
    title: 'Design or Build a House',
    image: '/projects/promise-ln-5106/5106-promise-ln-exterior-entry.jpg',
    contain: false,
    line: 'Custom homes, additions, and whole-home remodels in the Boise area.',
    href: '/design-and-build-questionnaire/',
    cta: 'Tell Us About Your House',
    track: 'contact_designbuild',
  },
  {
    title: 'Buy or Sell Real Estate',
    image: '/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg',
    contain: false,
    line: 'Buy or sell with Timber + Love Realty.',
    href: site.external.realty,
    cta: 'Buy or Sell a Home',
    track: 'contact_realty',
  },
  {
    title: 'Sell Your Home for Cash',
    image: '/projects/north-end-gem/exterior.webp',
    contain: false,
    line: 'A straight cash offer if you need to sell fast.',
    href: site.external.cashOffers,
    cta: 'Request a Cash Offer',
    track: 'contact_cash',
  },
  {
    title: 'Invest in Real Estate',
    image: '/projects/promise-ln-5142/5142-promise-ln-exterior-angle.jpg',
    contain: false,
    line: 'Read about investing and how to get involved.',
    href: site.external.invest,
    cta: 'See Investing',
    track: 'contact_invest',
  },
  {
    title: 'Vacation Rentals & Stays',
    image: '/rentals/caldwell/01-rooftop-deck-mokolii-view.webp',
    contain: false,
    line: 'Questions about booking a Timber + Love vacation property.',
    href: '/stay-with-us/',
    cta: 'View Vacation Rentals',
    track: 'contact_stay',
  },
  {
    title: 'Media & Partnerships',
    image: '/editorial/luke-clint-studio.webp',
    contain: true,
    line: 'Appearance requests, brand partnerships, and press inquiries.',
    href: '#press',
    cta: 'Press & Partnerships',
    track: 'contact_press',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])} />
      <PageHero
        eyebrow="Contact"
        title="How Can We Help?"
        subtitle="Pick what fits closest and we'll point you the right way. Or send a note and someone on the team will write back."
        image="/editorial/mountain-living.webp"
        imageMobile="/editorial/casetta-living.webp"
        height="short"
      >
        <Cta href="/design-and-build-questionnaire/" variant="primary">Tell Us About Your House</Cta>
        <Cta href="#general" variant="secondary">Send Us a Note</Cta>
      </PageHero>


      {/* General inquiry: form plus primary customer contact details */}
      <section id="general" className="scroll-mt-24 section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Let’s Connect</p>
            <h2 className="h-section mt-4">Send Us a Note</h2>
            <p className="text-lead mt-5">
              Tell us what you have in mind, from a new house to your next move. We&apos;ll get you to the right person.
            </p>

            <a href="#contact-paths" className="link-underline mt-6 inline-flex min-h-11 items-center text-sm">Find a specific service →</a>
            <div className="mt-8 space-y-6">
              <div>
                <p className="field-label">Call</p>
                <a href={site.phoneHref} className="mt-1 inline-flex min-h-11 items-center text-lg text-cream underline-offset-4 hover:underline">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="field-label">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-flex min-h-11 items-center text-lg text-cream underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="field-label">Visit</p>
                <address className="mt-2 text-lg not-italic text-text-secondary">
                  {site.gbpName}
                  <br />
                  {site.address.full}
                </address>
                <p className="mt-2 text-sm text-text-muted">{site.hours.label}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90} className="surface-card p-8 sm:p-10">
            <ContactForm source="contact-page" />
          </Reveal>
        </div>
      </section>


      {/* Choose Your Path: route each need to the correct destination */}
      <section id="contact-paths" className="bg-bg-primary section scroll-mt-24">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pick one</p>
            <h2 className="h-section mt-4">What do you need?</h2>
            <p className="text-lead mt-5">
              Choose what matches and we&apos;ll take it from there.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paths.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="h-full">
                <PhotoCard image={p.image} contain={p.contain} imagePosition={p.contain ? "center top" : "center"}>
                <h3 className="h-card">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{p.line}</p>
                <div className="mt-6">
                  <Cta href={p.href} external={p.href.startsWith("https:")} newTab={p.href.startsWith("https:")} variant="secondary" track={p.track} className="w-full">
                    {p.cta}
                  </Cta>
                </div>
                </PhotoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Abandonment recovery: sets expectations and offers two lower-commitment
          alternatives for visitors who scrolled past the form without sending it. */}
      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What Happens Next</p>
            <h2 className="h-section mt-4">No Pressure, No Obligation</h2>
            <p className="text-lead mt-5">
              Reaching out does not commit you to anything. Here is exactly what to expect.
            </p>
          </Reveal>

          <div className="mt-14">
            <WhatHappensNext steps={[
              { step: '01', title: 'Someone reads it', body: 'A real person on the team reads what you wrote.', image: '/editorial/team-studio.webp', position: 'center 82%' },
              { step: '02', title: 'The right person writes back', body: 'We pass it to whoever handles that kind of work.', image: '/editorial/luke-denim.webp', position: 'center 30%' },
              { step: '03', title: 'You decide what\'s next', body: 'Get your questions answered, then decide how you want to go from here.', image: '/projects/promise-ln-5106/5106-promise-ln-great-room.jpg' },
            ]} />
          </div>

          <Reveal delay={120} className="surface-card mt-10 flex flex-col items-center gap-6 p-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h3 className="h-card">Not ready to talk yet?</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                Look through our finished houses first. We&apos;re here when you&apos;re ready.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Cta href="/timber-and-love-gallery/" variant="primary" track="contact_recovery_work">View Our Work</Cta>
              <a href={site.phoneHref} className="btn-secondary" data-track="contact_recovery_call">
                Call {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Press & Partnerships: kept separate from customer contact routing */}
      <section id="press" className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Press & Partnerships</p>
            <h2 className="h-section mt-4">Media, Brand & Appearance Inquiries</h2>
            <p className="text-lead mt-5">
              For appearance requests, brand partnerships, and press, send a note through the form on this page.
            </p>
            <div className="mt-8">
              <Cta href="#general" variant="primary">Send Us a Note</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
