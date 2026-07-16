import { site } from './site';

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const LOGO = `${site.url}/wp-content/uploads/2024/03/Timber-And-Love-Logo-White-1-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png`;
const DEFAULT_IMAGE = `${site.url}/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: 'US',
};

/** Site-wide Organization node (referenced by other schema via @id). */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: site.name,
  url: `${site.url}/`,
  logo: LOGO,
  image: DEFAULT_IMAGE,
  description: site.description,
  foundingDate: String(site.founded),
  founder: { '@type': 'Person', name: 'Luke Caldwell' },
  telephone: site.phone,
  email: site.email,
  address: postalAddress,
  sameAs: [site.social.instagram, site.social.facebook],
};

/** Site-wide WebSite node. */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${site.url}/`,
  name: site.name,
  publisher: { '@id': ORG_ID },
};

/** LocalBusiness (design + build / general contractor) node. */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'GeneralContractor'],
  '@id': `${site.url}/#localbusiness`,
  name: site.name,
  url: `${site.url}/`,
  telephone: site.phone,
  image: DEFAULT_IMAGE,
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.map,
  areaServed: { '@type': 'City', name: 'Boise' },
  parentOrganization: { '@id': ORG_ID },
  sameAs: [site.social.instagram, site.social.facebook],
};

/** BreadcrumbList from an ordered list of { name, path } crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

/** Service node offered by the organization. */
export function serviceSchema(opts: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType || opts.name,
    url: `${site.url}${opts.path}`,
    areaServed: { '@type': 'City', name: 'Boise' },
    provider: { '@id': ORG_ID },
  };
}

/** FAQPage from question/answer pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** LodgingBusiness / vacation rental node for a property. */
export function lodgingSchema(opts: { name: string; description: string; path: string; image?: string; region?: string; amenities?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    ...(opts.image ? { image: opts.image.startsWith('http') ? opts.image : `${site.url}${opts.image}` } : {}),
    ...(opts.region ? { address: { '@type': 'PostalAddress', addressRegion: opts.region, addressCountry: 'US' } } : {}),
    ...(opts.amenities?.length
      ? { amenityFeature: opts.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a })) }
      : {}),
    brand: { '@id': ORG_ID },
  };
}
