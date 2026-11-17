import NavLink from '@/components/ui/NavLink';
import Link from 'next/link';
import { CookieSettingsButton } from '@/components/Analytics';
import Newsletter from '@/components/forms/Newsletter';
import Stars from '@/components/ui/Stars';
import { site, pathways } from '@/lib/site';
import { googleReviews } from '@/lib/content/home';

const WORDMARK =
  '/wp-content/uploads/2024/03/Timber-And-Love-Logo-White-1-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png';

type Item = { label: string; href: string; external?: boolean };

// Services people can start with, grouped with financing since it supports them.
const services: Item[] = [
  ...pathways,
  { label: 'Financing', href: '/financing/' },
];

const company: Item[] = [
  { label: 'Our Story', href: '/about/' },
  { label: 'Our Process', href: '/our-process/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Our Work', href: '/timber-and-love-gallery/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'Contact', href: '/contact/' },
];

const mediaLinks: Item[] = [
  { label: 'Shows + Watch', href: '/shows/' },
  { label: 'Luke and Clint on YouTube', href: 'https://www.youtube.com/@lukeandclint', external: true },
  { label: 'HGTV: The Boise Boys', href: '/the-boise-boys/' },
  { label: 'Boise Boys on Discovery+', href: site.shows.boiseBoys, external: true },
  { label: 'Outgrown on Discovery+', href: site.shows.outgrown, external: true },
  { label: 'Americana Soul (Book)', href: '/about/#americana-soul' },
  { label: 'Press & Partnerships', href: '/contact/#press' },
];

function FooterLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  return (
    <NavLink
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      // inline-block + vertical padding lifts the tap target to a comfortable
      // height on touch; list gaps alone left these well under 44px.
      className="link-underline inline-flex min-h-11 items-center py-1.5"
    >
      {label}
      {external && <span aria-hidden="true" className="ml-0.5 text-[0.7em] opacity-70">↗</span>}
    </NavLink>
  );
}

export default function Footer() {
  const columns: { heading: string; items: Item[] }[] = [
    { heading: 'What We Do', items: services },
    { heading: 'Company', items: company },
    { heading: 'Shows & Media', items: mediaLinks },
  ];

  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      {/* Row 1: brand identity on the left, link columns + newsletter on the right. */}
      <div className="container-wide grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORDMARK} alt="Timber + Love" className="h-14 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-secondary">
            One trusted Boise team for every stage of home and real estate. Design, build, buy, sell, invest, and stay,
            led by Luke Caldwell of HGTV&apos;s Boise Boys.
          </p>
          <div className="mt-4 flex gap-6 text-xs uppercase tracking-[0.16em]">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-text-secondary transition-colors hover:text-cream">Instagram</a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-text-secondary transition-colors hover:text-cream">Facebook</a>
          </div>
          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track="footer_reviews"
            className="mt-3 inline-flex min-h-11 items-center gap-2 border border-border-subtle px-4 text-xs text-text-secondary transition-colors hover:border-cream/40 hover:text-cream"
          >
            <span className="uppercase tracking-[0.14em]">Read Google Reviews</span>
          </a>
        </div>

        {/* Phones: the two short columns sit side by side and the longer
            media column runs full width beneath, which halves the scroll.
            From lg the wrapper dissolves and each column joins the 12-col grid. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:contents">
        {columns.map((col, i) => (
          <nav key={col.heading} aria-label={col.heading} className={`lg:col-span-2 ${i === 2 ? 'col-span-2' : ''}`}>
            <h3 className="text-xs uppercase tracking-[0.18em] text-cream sm:text-sm">{col.heading}</h3>
            <ul className="mt-4 text-sm text-text-secondary sm:mt-6">
              {col.items.map((n) => (
                /* Props are passed explicitly rather than spread: `services`
                   includes the pathway objects, which carry their own `key`
                   field, and spreading it made React read that as the element
                   key and warn on every render. */
                <li key={n.label}>
                  <FooterLink label={n.label} href={n.href} external={n.external} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs uppercase tracking-[0.18em] text-cream sm:text-sm">Stay in the Loop</h3>
          <p className="mt-4 text-sm sm:mt-6 leading-relaxed text-text-secondary">
            Get occasional design inspiration and Timber + Love updates in your inbox.
          </p>
          <div className="mt-5">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Row 2: contact details as a clean labeled band. */}
      <div className="border-t border-border-subtle">
        <div className="container-wide grid gap-7 py-10 sm:grid-cols-3 sm:gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-text-muted">Visit</h3>
            <p className="mt-3 text-sm not-italic leading-relaxed text-text-secondary">{site.address.full}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-text-muted">Call</h3>
            <p className="mt-1 text-sm"><a href={site.phoneHref} className="inline-flex min-h-11 items-center text-text-secondary transition-colors hover:text-cream">{site.phone}</a></p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] text-text-muted">Email</h3>
            <p className="mt-1 text-sm"><a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all text-text-secondary transition-colors hover:text-cream">{site.email}</a></p>
          </div>
        </div>
      </div>

      {/* Bottom bar: legal on the left, copyright + credit on the right. */}
      <div className="border-t border-border-subtle">
        <div className="container-wide flex flex-col-reverse items-start justify-between gap-3 py-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 [&>*]:inline-flex [&>*]:min-h-11 [&>*]:items-center [&>*]:whitespace-nowrap [&>*]:!text-[11px] [&>*]:!tracking-[0.12em]">
            <Link href="/privacy-policy/" className="uppercase tracking-[0.14em] transition-colors hover:text-cream">Privacy Policy</Link>
            <Link href="/terms-and-conditions/" className="uppercase tracking-[0.14em] transition-colors hover:text-cream">Terms</Link>
            <CookieSettingsButton />
          </div>
          <p className="leading-relaxed sm:text-right">
            &copy; {new Date().getFullYear()} Timber + Love. All rights reserved.
            <span className="mx-2 text-border-subtle" aria-hidden="true">&middot;</span>
            Made with <span aria-hidden="true">🤍</span><span className="sr-only">love</span> by{' '}
            <a
              href="https://webiq.co"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.14em] text-text-secondary underline-offset-2 transition hover:text-cream hover:underline"
            >
              WEB IQ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
