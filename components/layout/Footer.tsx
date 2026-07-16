import Link from 'next/link';
import Newsletter from '@/components/forms/Newsletter';
import { site, pathways } from '@/lib/site';

const WORDMARK =
  '/wp-content/uploads/2024/03/Timber-And-Love-Logo-White-1-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png';

const company: { label: string; href: string; external?: boolean }[] = [
  { label: 'Our Story', href: '/about/' },
  { label: 'Our Work', href: '/timber-and-love-gallery/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Press & Partnerships', href: '/contact/#press' },
];

const mediaLinks: { label: string; href: string; external?: boolean }[] = [
  { label: 'HGTV: The Boise Boys', href: '/the-boise-boys/' },
  { label: "Boise Boys on Discovery+", href: site.shows.boiseBoys, external: true },
  { label: 'Outgrown on Discovery+', href: site.shows.outgrown, external: true },
  { label: 'Americana Soul (Book)', href: '/about/#americana-soul' },
];

function FooterLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="link-underline"
    >
      {label}
      {external && <span aria-hidden="true" className="ml-0.5 text-[0.7em] opacity-70">↗</span>}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-ink">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORDMARK} alt="Timber and Love" className="h-14 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-secondary">
            One trusted Boise team for every stage of home and real estate. Design, build, buy, sell, invest, and stay,
            led by Luke Caldwell of HGTV&apos;s Boise Boys.
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Instagram</a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition hover:text-cream">Facebook</a>
          </div>
        </div>

        {/* Service pathways */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.18em] text-cream">What We Do</h3>
          <ul className="mt-6 space-y-3 text-sm text-text-secondary">
            {pathways.map((p) => (
              <li key={p.key}>
                <FooterLink label={p.label} href={p.href} external={p.external} />
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-sm uppercase tracking-[0.18em] text-cream">Company</h3>
          <ul className="mt-6 space-y-3 text-sm text-text-secondary">
            {company.map((n) => (
              <li key={n.label}><FooterLink {...n} /></li>
            ))}
          </ul>
        </div>

        {/* HGTV / media + contact */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">HGTV &amp; Media</h3>
            <ul className="mt-6 space-y-3 text-sm text-text-secondary">
              {mediaLinks.map((n) => (
                <li key={n.label}><FooterLink {...n} /></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Contact</h3>
            <ul className="mt-6 space-y-3 text-sm text-text-secondary">
              <li><a href={site.phoneHref} className="link-underline">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></li>
              <li className="not-italic leading-relaxed">{site.address.full}</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.18em] text-cream">Stay in the Loop</h3>
          <p className="mt-6 text-sm leading-relaxed text-text-secondary">
            Get occasional design inspiration and Timber and Love updates in your inbox.
          </p>
          <div className="mt-6">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-5 text-xs text-text-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Timber and Love. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy/" className="transition hover:text-cream">Privacy Policy</Link>
            <Link href="/terms-and-conditions/" className="transition hover:text-cream">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
