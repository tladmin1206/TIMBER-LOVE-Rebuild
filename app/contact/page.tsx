import PhotoCard from '@/components/ui/PhotoCard';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import ContactForm from '@/components/forms/ContactForm';
import WhatHappensNext from '@/components/sections/WhatHappensNext';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact',
  description:
    'Reach the Timber and Love team in Boise. Pick the option closest to your goal: design and build, buying or selling, cash offers, investing, or a vacation stay: or send a general note.',
  path: '/contact/',
});

// Routing options. Each card points a specific need to the right destination
// so no single questionnaire has to absorb every kind of inquiry.
const paths = [
  {
    title: 'Start a Design + Build Project',
    image: '/projects/promise-ln-5106/5106-promise-ln-exterior-entry.jpg',
    contain: false,
    line: 'Custom homes, additions, and whole-home remodels in the Boise area.',
    href: '/design-and-build-questionnaire/',
    cta: 'Start a Project',
    track: 'contact_designbuild',
  },
  {
    title: 'Buy or Sell Real Estate',
    image: '/projects/stucco-in-time/terrace.webp',
    contain: false,
    line: 'Work with Timber and Love Realty on your next move in the local market.',
    href: '/buy-or-sell/',
    cta: 'Buy or Sell a Home',
    track: 'contact_realty',
  },
  {
    title: 'Sell Your Home for Cash',
    image: '/projects/north-end-gem/exterior.webp',
    contain: false,
    line: 'A direct offer for homeowners who want a simpler, faster sale.',
    href: '/sell-for-cash/',
    cta: 'Request a Cash Offer',
    track: 'contact_cash',
  },
  {
    title: 'Invest in Real Estate',
    image: '/projects/promise-ln-5142/5142-promise-ln-exterior-rear.jpg',
    contain: false,
    line: 'Explore investment opportunities and how to get involved.',
    href: '/invest/',
    cta: 'Explore Investing',
    track: 'contact_invest',
  },
  {
    title: 'Vacation Rentals & Stays',
    image: '/rentals/caldwell/01-rooftop-deck-mokolii-view.webp',
    contain: false,
    line: 'Questions about booking a Timber and Love vacation property.',
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
      <PageHero
        eyebrow="Contact"
        title="How Can We Help?"
        subtitle="Pick the option closest to your goal and we will point you to the right place, or reach out directly and a member of our team will follow up."
        image="/editorial/casetta-living.webp"
      >
        <Cta href="#contact-paths" variant="primary">Find the Right Service</Cta>
        <Cta href="#general" variant="secondary">Send a General Inquiry</Cta>
      </PageHero>


      {/* Choose Your Path: route each need to the correct destination */}
      <section id="contact-paths" className="bg-bg-primary section scroll-mt-24">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Choose Your Path</p>
            <h2 className="h-section mt-4">Find the Right Starting Point</h2>
            <p className="text-lead mt-5">
              Every inquiry has its own best route. Choose the path that matches what you need and we will
              take it from there.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paths.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="h-full">
                <PhotoCard image={p.image} contain={p.contain} imagePosition={p.contain ? "center top" : "center"}>
                <h3 className="h-card">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{p.line}</p>
                <div className="mt-6">
                  <Cta href={p.href} variant="secondary" track={p.track} className="w-full">
                    {p.cta}
                  </Cta>
                </div>
                </PhotoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* General inquiry: form plus primary customer contact details */}
      <section id="general" className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Let’s Connect</p>
            <h2 className="h-section mt-4">Send Us a Note</h2>
            <p className="text-lead mt-5">
              Tell us what you have in mind. From a new home to your next move, our team will connect you
              with the right people.
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
              { step: '01', title: 'We Read Your Note', body: 'Your message gives our team the context to understand what you need.', image: '/video-posters/966721424.jpg' },
              { step: '02', title: 'The Right Team Responds', body: 'We connect your inquiry with the people who handle that service.', image: '/video-posters/928451971.jpg', contain: true },
              { step: '03', title: 'Choose Your Next Step', body: 'Get answers to your questions and decide how you would like to continue.', image: '/projects/promise-ln-5106/5106-promise-ln-great-room.jpg' },
            ]} />
          </div>

          <Reveal delay={120} className="surface-card mt-10 flex flex-col items-center gap-6 p-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h3 className="h-card">Not Ready to Talk Yet?</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                Explore our completed homes and find inspiration for your own. We are here whenever you are ready.
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
