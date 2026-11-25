import type { FanComment, Testimonial } from '@/lib/content/types';
import { site } from '@/lib/site';

// Matches the original homepage: 967117381 is the full-bleed background hero
// video (warm interior), and 953577619 is the inline "Designing Beauty" player
// that sits in a section below the hero.
export const heroVideoId = '967117381'; // Vimeo: hero background video
export const heroVideoPoster = '/video-posters/967117381.jpg';
export const introVideoId = '953577619'; // Vimeo: former inline "Designing Beauty" player (kept for reference)
// Inline "Who We Are" film: self-hosted drone clip of the Boise homes with the
// foreground lot edited to lawn (Jared 11/25). Muted, continuous loop.
export const introFilm = {
  sources: {
    webm1080: '/videos/timber-and-love-custom-homes-boise.webm',
    mp41080: '/videos/timber-and-love-custom-homes-boise.mp4',
    webm720: '/videos/timber-and-love-custom-homes-boise-720p.webm',
    mp4720: '/videos/timber-and-love-custom-homes-boise-720p.mp4',
  },
  poster: '/videos/timber-and-love-custom-homes-boise-poster.jpg',
  // Accessible name and tooltip for the film (videos have no alt attribute).
  label: 'Aerial view of new custom homes on a Boise street, built by Timber + Love design-build',
  title: 'Timber + Love custom homes in Boise, Idaho',
  // VideoObject structured data fields.
  name: 'Timber + Love custom homes in Boise, Idaho',
  description:
    'A drone flyover of new custom homes on a Boise, Idaho street. Timber + Love is a Boise design-build firm founded in 2015 by Luke Caldwell of HGTV\'s Boise Boys, building custom homes and high-end remodels.',
  uploadDate: '2026-11-25',
  duration: 'PT36S',
};
export const introVideoPoster = introFilm.poster;

// Full-bleed background videos used across homepage sections (Vimeo ids + local poster frames).
export const sectionVideos = {
  // Stills are sharp photographs: the Vimeo frame grabs are 640px wide and
  // blur at full bleed, and the still is what remains if a film cannot play.
  values: { id: '927639866', poster: '/editorial/mountain-kitchen.webp' },
  finalCta: { id: '927976789', poster: '/video-posters/927976789.jpg' },
};

export const hgtvShows = [
  { title: 'Boise Boys', videoId: '925598945', poster: '/video-posters/925598945.jpg' },
  { title: 'Outgrown', videoId: '925603188', poster: '/video-posters/925603188.jpg' },
];

// Rotating sub-headline under "Timber and Love" (matches the original hero's
// service line; property management removed).
export const heroRotating = [
  'Design + Build Firm',
  'New Construction',
  'Realty Firm',
  'Vacation Rentals',
  'Cash Home Offers',
];

// Cross-fading hero background slideshow (Casa De Boise project photos).
export const heroSlideshow = [
  '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg',
  '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Living-Room-1-scaled.jpg',
  '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Kitchen-1-scaled.jpg',
  '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Dining-Room-2-scaled.jpg',
];

// Primary brand/realty sources verified 2026-10-05. See docs/content-facts.json.
export const stats = [
  { to: 2015, prefix: '', suffix: '', label: 'Founded in Boise' },
  { to: 100, prefix: '', suffix: '+', label: 'Homes Restored' },
  { to: 250, prefix: '$', suffix: 'M+', label: 'Realty Closed Sales' },
  { to: 2, prefix: '', suffix: '', label: 'HGTV Series' },
];

export const pressLogos = [
  { name: 'Dwell Magazine', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-Dwell-Magazine-qlhvlacitlrmqd9siwjftcz4lc220y3h4jcryq455s.png' },
  { name: 'Discovery+', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-Discovery-plus-qlhvl9eomrqcerb5oe4t8v7nzy6ot8zqsepahg5jc0.png' },
  { name: 'HGTV', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-HGTV-qlhvlbad0fsx1z8fdey2duql6pxf8n77go09g02qzk.png' },
  { name: 'HBO Max', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-HBO-Max-qlhvlacitlrmqd9siwjftcz4lc220y3h4jcryq455s.png' },
  { name: 'People Magazine', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-People-Magazine-qlhvlc8779u7dl727xcoyci1s3ssgcaxssnqxa1ctc.png' },
  { name: 'Food Network', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-Food-Network-2-qls7f1hir3usnrpu4gwnd0fni5dootm0hv8s5wxa1s.png' },
  { name: 'LA Times', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-LA-Times-qlhvlc8779u7dl727xcoyci1s3ssgcaxssnqxa1ctc.png' },
  { name: 'Realtor.com', file: 'Timber-and-Love-Design-Build-Firm-in-Boise-Premier-Home-Remodel-Company-As-Seen-On-Realtor.com_-qlhvlc8779u7dl727xcoyci1s3ssgcaxssnqxa1ctc.png' },
  { name: 'Airbnb', file: 'Airbnb-Logo-white-1-qmf5w6n7nznyl3m7nxgn9erdbpx9kgj0695ipbn4f4.png' },
].map((l) => ({ alt: `As seen on ${l.name}`, src: `/wp-content/uploads/elementor/thumbs/${l.file}` }));

// Full-bleed service promo blocks (edge-to-edge media + brand logo + CTA): matches the live homepage.
export const servicePromos = [
  {
    key: 'design-build',
    logo: '/wp-content/uploads/2024/03/Timber-and-Love-Entity-Logos-Timber-and-Love-Design-Build-1.png',
    logoAlt: 'Timber + Love Design + Build',
    bg: '/wp-content/uploads/2024/03/TimberandLoveHomeRemodelingCompany-Design-BuildBackgroundImage-ezgif.com-webp-to-jpg-converter-1.jpg',
    cta: 'Learn More',
    href: '/design-and-build/',
  },
  {
    key: 'realty',
    logo: '/wp-content/uploads/2024/03/Timber-and-Love-Entity-Logos-Timber-and-Love-Realty-1.png',
    logoAlt: 'Timber + Love Realty',
    bg: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Realty-Background-1-scaled-1.jpg',
    cta: 'Buy or Sell',
    href: 'https://timberandloverealty.com/',
    external: true,
  },
  {
    key: 'stay',
    logo: '/wp-content/uploads/2024/03/Timber-and-Love-Entity-Logos-Stay-With-Us.png',
    logoAlt: 'Stay With Us',
    bg: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Stay-With-Us-Background-Image-New-Meadows-1-1.jpg',
    cta: 'Book a Stay',
    href: '/stay-with-us/',
  },
  {
    key: 'buymyhouse',
    logo: '/wp-content/uploads/2024/03/Timber-and-Love-Entity-Logos-Buy-My-House.png',
    logoAlt: 'Buy My House',
    bg: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Home-Buying-Background-2-min.jpg',
    cta: 'Get Offer',
    href: 'https://buymyhouse.co/',
    external: true,
  },
];

// Legacy service list retained for any remaining references. Property management
// has been removed, it is not an offered service.
export const services = [
  {
    title: 'Design + Build',
    body: 'Custom homes, additions, and whole-home renovations from one connected in-house team.',
    href: '/design-and-build/',
    cta: 'See Design + Build',
  },
  {
    title: 'Buy or Sell',
    body: 'Real estate guidance through Timber + Love Realty, with local Boise market experience.',
    href: '/buy-or-sell/',
    cta: 'Buy or Sell a Home',
  },
  {
    title: 'Vacation Rentals',
    body: 'Our vacation homes in Boise, McCall and Oahu.',
    href: '/stay-with-us/',
    cta: 'View Vacation Rentals',
  },
  {
    title: 'Sell for Cash',
    body: 'A simpler, direct home-offer path for homeowners who want to sell without listing.',
    href: '/sell-for-cash/',
    cta: 'Request a Cash Offer',
  },
];

export const values = [
  {
    title: 'Integrity',
    body: 'We tell you what it costs and what we\'d do. If we\'re not the right fit, we\'ll say so.',
  },
  {
    title: 'Quality',
    body: 'We take pride in the work, from the framing to the last piece of trim. Build it right and make it look like it belongs.',
  },
  {
    title: 'Community',
    body: 'Boise is where we work, and we care about the neighborhoods we build in.',
  },
  {
    title: 'Your house, your call',
    body: 'We ask a lot of questions. You decide how involved you want to be.',
  },
];

export const processSteps = [
  {
    num: '01',
    title: 'Talk',
    image: '/editorial/estate-living.webp',
    body: 'Tell us how you live and what\'s bothering you about the house. We listen first.',
  },
  {
    num: '02',
    title: 'Plan',
    image: '/editorial/collected-details.webp',
    body: 'You and our designers work out the layout, the materials and the details. You end up with a plan and a price you can both stand behind.',
  },
  {
    num: '03',
    title: 'Build',
    image: '/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg',
    body: 'We build it, we keep you posted, and we walk the finished house with you.',
  },
];

export const mission =
  'We do honest work on people\'s homes in Boise, and we tell you straight if we\'re not the right fit.';

/**
 * Curated featured projects for the homepage "Featured Work" section. These are
 * real Boise Boys projects with imagery in the repo. Outcome summaries are kept
 * general and truthful: TEMP: confirm exact scope/location details with the
 * business, and expand into full case-study pages under /timber-and-love-gallery/.
 */
export const featuredProjects = [
  {
    slug: 'casa-de-boise',
    name: 'Casa De Boise',
    location: 'Boise, ID',
    type: 'Whole-Home Remodel',
    summary: 'A full transformation featured on HGTV’s Boise Boys, with reimagined living, kitchen, and dining spaces in a warm, modern point of view.',
    cover: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg',
    href: '/projects/casa-de-boise/',
  },
  {
    slug: 'the-firehouse',
    name: 'The Firehouse',
    location: 'Boise, ID',
    type: 'Historic Remodel',
    summary: 'A historic Boise property carefully restored and reimagined for modern living while preserving its original character.',
    cover: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Kitchen-1-scaled.jpg',
    href: '/projects/the-firehouse/',
  },
];

/**
 * Differentiated, outcome-focused reasons to choose Timber and Love. Each point
 * is paired with a specific, tangible explanation: not generic claims about
 * integrity or quality.
 */
export const whyReasons = [
  {
    title: 'One Connected Team',
    body: 'Design and construction live under one roof, so you have a single point of contact from first concept through final walkthrough.',
  },
  {
    title: 'Design With a Point of View',
    body: 'Led by Luke Caldwell, our work carries a distinct, warm, and modern aesthetic, the same sensibility behind the book Americana Soul.',
  },
  {
    title: 'Local Knowledge',
    body: 'We know Boise homes, neighborhoods, permitting, and the Treasure Valley market because we build, buy, and sell here every day.',
  },
  {
    title: 'Proven on Real Projects',
    body: 'Our work has been documented across multiple seasons of HGTV’s Boise Boys and Outgrown, featuring real homes and real results.',
  },
  {
    title: 'Multiple Ways to Help',
    body: 'Whether you want to remodel, buy, sell, take a direct cash offer, invest, or book a stay, one team can guide the whole journey.',
  },
];

/**
 * Aggregate review rating, pulled from the business's Google / public review
 * profile. TEMP: refresh periodically; confirm the exact live count.
 */
export const googleReviews = { url: site.map };

/**
 * Client quotes stay off the site until each one has a source we can point at.
 * The previous set had no review URL and matched unverified directory copy, so
 * it is not rendered. Add an item only with kind: 'client' and a real source.
 * Fan comments are a separate type and stay on /the-boise-boys/.
 */
export const clientReviews: Testimonial[] = [];

/** Boise Boys fan comments: labelled as fan comments only, never as client proof, never as Review schema. */
export const fanComments: FanComment[] = [
  { kind: 'fan', name: 'Richard M.', quote: '“Boise Boys”: best viewing ever offered by HGTV. Love those guys!', role: 'Boise Boys Viewer' },
  { kind: 'fan', name: 'Jean U.', quote: 'I love the designs and the builds the Boise Boys do on their homes. I would love to have Luke design a mid-century modern house for us.', role: 'Boise Boys Viewer' },
];

/** "One Brand, More Ways to Help": how a customer might move between services. */
export const brandEcosystem = [
  'Buy a property and remodel it with our design + build team',
  'Remodel a home before you sell it',
  'Look at real estate investment opportunities',
  'Experience Timber + Love design firsthand through a vacation stay',
];

// Favorite Boise Boys projects gallery. Two genuine HGTV Boise Boys homes,
// curated from the site's media library: Casa De Boise (Season 2, Episode 9),
// bright and Mediterranean, and The Firehouse, a moody industrial-historic
// conversion. Both project sets were reviewed image by image; the strongest,
// most varied rooms (exteriors, kitchens, living, dining, bed, bath) are here.
export const favoriteProjects = [
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg', alt: "Casa De Boise, an HGTV Boise Boys renovation: front exterior" },
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Kitchen-5-scaled.jpg', alt: "Casa De Boise, an HGTV Boise Boys renovation: kitchen" },
  { src: '/wp-content/uploads/2024/06/The-Firehouse-in-Boise-ID-by-Timber-and-Love-Realty-Boise-Boys1-scaled.jpg', alt: "The Firehouse, an HGTV Boise Boys renovation: living room" },
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Living-Room-1-scaled.jpg', alt: "Casa De Boise, an HGTV Boise Boys renovation: living room" },
  { src: '/wp-content/uploads/2024/06/The-Firehouse-in-Boise-ID-by-Timber-and-Love-Realty-Boise-Boys11-scaled.jpg', alt: "The Firehouse, an HGTV Boise Boys renovation: kitchen" },
  { src: '/wp-content/uploads/2024/06/The-Firehouse-in-Boise-ID-by-Timber-and-Love-Realty-Boise-Boys8-scaled.jpg', alt: "The Firehouse, an HGTV Boise Boys renovation: bedroom" },
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Dining-Room-1-scaled.jpg', alt: "Casa De Boise, an HGTV Boise Boys renovation: dining room" },
  { src: '/wp-content/uploads/2024/06/The-Firehouse-in-Boise-ID-by-Timber-and-Love-Realty-Boise-Boys9-scaled.jpg', alt: "The Firehouse, an HGTV Boise Boys renovation: bathroom" },
  { src: '/wp-content/uploads/2024/06/The-Firehouse-in-Boise-ID-by-Timber-and-Love-Realty-Boise-Boys-scaled.jpg', alt: "The Firehouse, an HGTV Boise Boys renovation: dining area" },
];
