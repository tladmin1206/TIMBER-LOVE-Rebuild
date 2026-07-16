import Link from 'next/link';
import Newsletter from '@/components/forms/Newsletter';
import { site } from '@/lib/site';

const WORDMARK =
  '/wp-content/uploads/2024/03/Timber-And-Love-Logo-White-1-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png';

const navigation: { label: string; href: string; external?: boolean }[] = [
  { label: 'About Us', href: '/the-boise-boys/' },
  { label: 'Design + Build', href: '/design-and-build/' },
  { label: 'Timber and Love Realty', href: site.external.realty, external: true },
  { label: 'Vacation Rentals', href: '/stay-with-us/' },
  { label: 'Cash Home Offers', href: site.external.cashOffers, external: true },
  { label: 'Greenway Community', href: site.external.greenway, external: true },
  { label: 'Invest With Us', href: site.external.invest, external: true },
  { label: "HGTV's Boise Boys", href: site.shows.boiseBoys, external: true },
  { label: 'Outgrown', href: site.shows.outgrown, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORDMARK} alt="Timber and Love" className="h-16 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-body">
            Founded by Luke Caldwell of HGTV&apos;s &ldquo;Boise Boys,&rdquo; Timber and Love specializes in real estate,
            home remodeling, and new builds. Since 2015, we&apos;ve been transforming spaces with innovative design and
            unique craftsmanship, offering full-service solutions for buying, selling, or building your dream home.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Navigation</h3>
          <ul className="mt-6 space-y-3 text-sm text-body">
            {navigation.map((n) => (
              <li key={n.label}>
                <Link
                  href={n.href}
                  {...(n.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="link-underline"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Address / Contact / Partnerships */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Address</h3>
            <p className="mt-6 text-sm leading-relaxed text-body">{site.address.full}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Contact</h3>
            <ul className="mt-6 space-y-3 text-sm text-body">
              <li>
                <a href={site.phoneHref} className="link-underline">Office &mdash; {site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Partnerships</h3>
            <ul className="mt-6 space-y-3 text-sm text-body">
              <li>
                <a href={site.partnerships.phoneHref} className="link-underline">{site.partnerships.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.partnerships.email}`} className="link-underline">{site.partnerships.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Get Notified */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Get Notified</h3>
          <p className="mt-6 text-sm leading-relaxed text-body">
            Stay in the loop with the latest trends and exclusive T+L updates. Subscribe to get curated design
            inspiration in your inbox.
          </p>
          <div className="mt-6">
            <Newsletter />
          </div>
          <div className="mt-6 flex gap-4 text-sm">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-cream/70 transition hover:text-cream">
              Instagram
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-cream/70 transition hover:text-cream">
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Timber and Love. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy/" className="transition hover:text-cream">Privacy Policy</Link>
            <Link href="/terms-conditons/" className="transition hover:text-cream">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
