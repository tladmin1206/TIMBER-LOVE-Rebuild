/**
 * Central site configuration — navigation, contact details, social links.
 * Mirrors the live timberandlove.com header/footer link structure exactly so
 * internal linking and outbound destinations are preserved 1:1.
 */

export const site = {
  name: 'Timber and Love',
  legalName: 'Timber and Love',
  url: 'https://timberandlove.com',
  description:
    "Timber and Love, founded by HGTV's Boise Boys, offers personalized building, remodeling, buying, renting, and selling services in Boise since 2015.",
  phone: '(208) 995-9516',
  phoneHref: 'tel:+12089959516',
  email: 'connect@timberandlove.com',
  address: {
    street: '3024 W Fairview Ave',
    city: 'Boise',
    region: 'ID',
    postalCode: '83702',
    full: '3024 W Fairview Ave, Boise, ID 83702',
  },
  geo: { lat: '43.619900', lng: '-116.227162' },
  map: 'https://share.google/Ga7dguR36OVrALLlH',
  partnerships: { phone: '(310) 990-6549', phoneHref: 'tel:+13109906549', email: 'brian@emmllc.com' },
  social: {
    instagram: 'https://www.instagram.com/timberandlove/',
    facebook: 'https://www.facebook.com/timberandlove/',
  },
  book: {
    title: 'Americana Soul',
    amazon: 'https://www.amazon.com/Americana-Soul-Designed-Comfort-Intention/dp/1982187409',
  },
  shows: {
    boiseBoys: 'https://www.discoveryplus.com/show/boise-boys',
    outgrown: 'https://www.discoveryplus.com/show/outgrown-us',
  },
  external: {
    realty: 'https://timberandloverealty.com/',
    invest: 'https://timberandloverealty.com/invest-with-us/',
    greenway: 'https://timberandloverealty.com/greenway/',
    cashOffers: 'https://buymyhouse.co/',
  },
} as const;

export type NavItem = {
  label: string;
  href?: string;
  external?: boolean;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  {
    label: 'What We Do',
    children: [
      { label: 'Design + Build', href: '/design-and-build/' },
      { label: 'Timber and Love Realty', href: site.external.realty, external: true },
      { label: 'Vacation Rentals', href: '/stay-with-us/' },
      { label: 'Cash Home Offers', href: site.external.cashOffers, external: true },
    ],
  },
  {
    label: 'Work With Us',
    children: [
      { label: 'Let’s Work Together', href: '/design-and-build-questionnaire/' },
      { label: 'Invest With Us', href: site.external.invest, external: true },
    ],
  },
  {
    label: 'HGTV Shows',
    children: [
      { label: 'Boise Boys', href: site.shows.boiseBoys, external: true },
      { label: 'Outgrown', href: site.shows.outgrown, external: true },
    ],
  },
  { label: 'Gallery', href: '/timber-and-love-gallery/' },
];
