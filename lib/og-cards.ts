import { projects } from '@/lib/content/projects';
import { rentals } from '@/lib/content/rentals';
import { journalPosts } from '@/lib/content/journal';

/**
 * Social sharing cards.
 *
 * Every public page has a 1200x630 card: its own photograph, the Timber + Love
 * mark, a short label, and the page's headline in the brand typeface. This
 * file is the one place that says what each card shows. The image itself is
 * drawn by app/og/[[...slug]]/route.tsx and prerendered at build time.
 *
 * Project, rental, and journal cards are derived from their content, so a new
 * project or article gets a card without touching this file. A page that is
 * not listed still gets a card: the default brand card with its title.
 */
export type OgCard = {
  /** Small uppercase label above the headline. */
  eyebrow: string;
  /** Headline. Kept short: it is set large. */
  title: string;
  /** Photograph, as a path under public/. */
  image: string;
  /** Where to anchor the crop when the photograph is trimmed to fit. */
  position?: 'centre' | 'top' | 'bottom' | 'left' | 'right';
};

const DEFAULT_IMAGE = '/editorial/estate-hearth.webp';

const HOME: OgCard = {
  eyebrow: 'Design + Build · Boise, Idaho',
  title: 'Timber + Love',
  image: DEFAULT_IMAGE,
};

const PAGES: Record<string, OgCard> = {
  '/about/': { eyebrow: 'Our Story', title: 'One Team for Every Stage of Home', image: '/editorial/estate-living.webp' },
  '/design-and-build/': { eyebrow: 'Design + Build', title: 'Thoughtfully Designed. Beautifully Built.', image: '/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg' },
  '/our-process/': { eyebrow: 'Our Process', title: 'One Team, One Clear Process', image: '/editorial/concrete-entry.webp' },
  '/timber-and-love-gallery/': { eyebrow: 'Our Work', title: 'Homes With a Story', image: '/projects/promise-ln-5106/5106-promise-ln-exterior-front.jpg' },
  '/contact/': { eyebrow: 'Contact', title: 'How Can We Help?', image: '/editorial/mountain-living.webp' },
  '/reviews/': { eyebrow: 'Reviews', title: 'What Boise homeowners say', image: '/editorial/cottage-fireplace.webp' },
  '/financing/': { eyebrow: 'Financing', title: 'Financing Your Project', image: '/editorial/craftsman-dining.webp' },
  '/service-areas/': { eyebrow: 'Where We Work', title: 'Serving Boise & the Treasure Valley', image: '/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg' },
  '/stay-with-us/': { eyebrow: 'Vacation Rentals', title: 'Stay With Us', image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg' },
  '/vacation-rentals/': { eyebrow: 'Vacation Rentals', title: 'Compare Vacation Homes', image: '/rentals/caldwell/27-hammock-mokolii.webp' },
  '/shows/': { eyebrow: 'Timber + Love · On Screen', title: 'Good Homes. Great Stories.', image: '/editorial/luke-clint-jump.webp' },
  '/the-boise-boys/': { eyebrow: 'As Seen on HGTV', title: 'The Boise Boys', image: '/wp-content/uploads/2024/05/Timber-and-Love-Boise-Home-Remodeling-Boise-Boys-Season-1-Episode-2-All-in-On-Boises-Central-Rim-Exterior-1-3-scaled.jpg' },
  '/journal/': { eyebrow: 'Journal', title: 'Stories From Timber + Love', image: '/editorial/collected-details.webp' },
  '/buy-or-sell/': { eyebrow: 'Timber + Love Realty', title: 'Buy or Sell a Home in Boise', image: '/projects/due-for-a-raze/exterior.webp' },
  '/sell-for-cash/': { eyebrow: 'Sell for Cash', title: 'Sell Your Home for Cash', image: '/projects/north-end-gem/exterior.webp' },
  '/invest/': { eyebrow: 'Invest', title: 'Invest in Real Estate', image: '/editorial/estate-exterior.webp' },
  '/design-and-build-questionnaire/': { eyebrow: 'Your House', title: 'Tell Us About Your House', image: '/projects/promise-ln-5120/5120-promise-ln-kitchen.jpg' },
  '/privacy-policy/': { eyebrow: 'Timber + Love', title: 'Privacy Policy', image: '/editorial/cedar-kitchen.webp' },
  '/terms-and-conditions/': { eyebrow: 'Timber + Love', title: 'Terms and Conditions', image: '/editorial/cedar-kitchen.webp' },
};

/**
 * Photographs that work better on a card than the one the page itself leads
 * with: the copy sits on the left of a card, so a subject on the left edge, a
 * photograph with its own lettering, or a tall frame needs a different choice
 * or a different crop anchor.
 */
const RENTAL_PHOTO: Record<string, Partial<OgCard>> = {
  '/caldwell-beach-house/': { image: '/rentals/caldwell/01-rooftop-deck-mokolii-view.webp' },
  '/kualoa-beach-house/': { position: 'bottom' },
};
const PROJECT_PHOTO: Record<string, Partial<OgCard>> = {
  'kualoa-beach-house': { position: 'bottom' },
};
const JOURNAL_PHOTO: Record<string, Partial<OgCard>> = {
  '/building-boise-new-show-announcement/': { image: '/editorial/luke-clint-studio.webp' },
  '/boise-boys-are-back/': { image: '/wp-content/uploads/2024/04/Boise-Boys-Luke-Caldwell-and-Clint-Robertson-1-1024x633.jpg', position: 'centre' },
};

/** Every card, keyed by the page path it belongs to (leading and trailing slash). */
export const ogCards: Record<string, OgCard> = {
  '/': HOME,
  ...PAGES,
  ...Object.fromEntries(
    projects.map((p) => [`/projects/${p.slug}/`, { eyebrow: p.category, title: p.title, image: p.cover, ...PROJECT_PHOTO[p.slug] } satisfies OgCard]),
  ),
  ...Object.fromEntries(
    rentals.map((r) => [r.href, { eyebrow: `Vacation Rental · ${r.destination}`, title: r.name, image: r.image, ...RENTAL_PHOTO[r.href] } satisfies OgCard]),
  ),
  ...Object.fromEntries(
    journalPosts.map((p) => [p.href, { eyebrow: `Journal · ${p.tag}`, title: p.title, image: p.image, position: 'top', ...JOURNAL_PHOTO[p.href] } satisfies OgCard]),
  ),
};

/** The card for a page path, or the default brand card when the page has none. */
export function ogCardFor(path: string): OgCard {
  return ogCards[path] ?? HOME;
}

/**
 * Address of the share image for a page path: "/about/" becomes "/og/about/".
 *
 * Relative by default, so it resolves against the production address. Until
 * that domain points at this site, previews fetched for a link on another
 * host (the replit.app address, say) would look for the image on production
 * and find nothing. Setting NEXT_PUBLIC_SHARE_IMAGE_ORIGIN to the host that is
 * actually serving the site makes previews work in the meantime.
 */
export function ogImagePath(path: string): string {
  const origin = (process.env.NEXT_PUBLIC_SHARE_IMAGE_ORIGIN || '').replace(/\/$/, '');
  return `${origin}${path === '/' ? '/og/' : `/og${path}`}`;
}
