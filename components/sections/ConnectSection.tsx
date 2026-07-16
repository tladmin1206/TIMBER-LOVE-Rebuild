import Link from 'next/link';
import { site } from '@/lib/site';
import ContactForm from '@/components/forms/ContactForm';
import Newsletter from '@/components/forms/Newsletter';
import Reveal from '@/components/ui/Reveal';

export default function ConnectSection() {
  return (
    <section id="connect" className="border-t border-cream/10 bg-ink py-20 sm:py-28">
      <div className="container-wide grid gap-14 lg:grid-cols-2">
        {/* Left: contact form */}
        <Reveal>
          <p className="eyebrow">Connect With Us</p>
          <h2 className="h-display mt-4 text-3xl sm:text-4xl">Begin Your Journey Here</h2>
          <p className="mt-4 max-w-md text-body">
            Tell us about your project, discover our transparent design|build model, and let&apos;s determine if we&apos;re a
            good fit for each other.
          </p>
          <div className="mt-8 max-w-md">
            <ContactForm source="home-connect" />
          </div>
        </Reveal>

        {/* Right: details */}
        <Reveal delay={120} className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              <li><Link href="/design-and-build/" className="link-underline">Design + Build</Link></li>
              <li><a href={site.external.realty} target="_blank" rel="noopener noreferrer" className="link-underline">Realty</a></li>
              <li><Link href="/stay-with-us/" className="link-underline">Vacation Rentals</Link></li>
              <li><a href={site.external.cashOffers} target="_blank" rel="noopener noreferrer" className="link-underline">Cash Home Offers</a></li>
              <li><Link href="/timber-and-love-gallery/" className="link-underline">Gallery</Link></li>
              <li><Link href="/the-boise-boys/" className="link-underline">The Boise Boys</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Address</h3>
            <p className="mt-4 text-sm text-body">{site.address.full}</p>
            <h3 className="mt-8 text-sm uppercase tracking-[0.18em] text-cream">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              <li><a href={site.phoneHref} className="link-underline">Office — {site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Partnerships</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              <li><a href={site.partnerships.phoneHref} className="link-underline">{site.partnerships.phone}</a></li>
              <li><a href={`mailto:${site.partnerships.email}`} className="link-underline">{site.partnerships.email}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Get Notified</h3>
            <p className="mt-4 text-sm text-body">
              Stay in the loop with the latest trends and exclusive T+L updates.
            </p>
            <div className="mt-4">
              <Newsletter />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
