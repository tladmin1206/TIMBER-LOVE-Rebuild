import type { Testimonial } from '@/lib/content/types';

// Matches the original homepage: 967117381 is the full-bleed background hero
// video (warm interior), and 953577619 is the inline "Designing Beauty" player
// that sits in a section below the hero.
export const heroVideoId = '967117381'; // Vimeo: hero background video
export const heroVideoPoster = '/video-posters/967117381.jpg';
export const introVideoId = '953577619'; // Vimeo: inline "Designing Beauty" player
export const introVideoPoster = '/video-posters/953577619.jpg';

// Full-bleed background videos used across homepage sections (Vimeo ids + local poster frames).
export const sectionVideos = {
  values: { id: '927639866', poster: '/video-posters/927639866.jpg' },
  testimonials: { id: '928451971', poster: '/video-posters/928451971.jpg' },
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

// Hero statistics, the brand's established figures from the original live site.
// TEMP: confirm exact current values with the business before launch.
export const stats = [
  { to: 15, prefix: '', suffix: '+', label: 'Years Experience' },
  { to: 100, prefix: '', suffix: '+', label: 'Homes Remodeled' },
  { to: 250, prefix: '$', suffix: '+', label: 'Million Sold' },
  { to: 35, prefix: '', suffix: '+', label: 'HGTV Episodes' },
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
    logoAlt: 'Timber and Love Design + Build',
    bg: '/wp-content/uploads/2024/03/TimberandLoveHomeRemodelingCompany-Design-BuildBackgroundImage-ezgif.com-webp-to-jpg-converter-1.jpg',
    cta: 'Learn More',
    href: '/design-and-build/',
  },
  {
    key: 'realty',
    logo: '/wp-content/uploads/2024/03/Timber-and-Love-Entity-Logos-Timber-and-Love-Realty-1.png',
    logoAlt: 'Timber and Love Realty',
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
    cta: 'Explore Design + Build',
  },
  {
    title: 'Buy or Sell',
    body: 'Real estate guidance through Timber and Love Realty, with local Boise market experience.',
    href: '/buy-or-sell/',
    cta: 'Buy or Sell a Home',
  },
  {
    title: 'Vacation Rentals',
    body: 'Distinctive Timber and Love stays in Boise, McCall, and Oahu.',
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
    body: 'Honesty and transparency are at the heart of everything we do. We ensure our clients are always informed and confident in our work. Our commitment to integrity builds trust and strong relationships with everyone we work with, from clients to partners and the community.',
  },
  {
    title: 'Quality',
    body: 'We strive to deliver exceptional quality with every project. Whether a build or remodel, our clients benefit from our meticulous attention to detail and dedication to high standards. We take pride in our work, ensuring visions are realized with excellence and precision.',
  },
  {
    title: 'Community',
    body: 'Our strong community ties drive us to make a meaningful difference. We focus on building lasting relationships and addressing local needs, ensuring our efforts contribute to the growth and well-being of our neighborhoods. Together, we create spaces where everyone can thrive.',
  },
  {
    title: 'Client-Focused',
    body: 'Our client’s needs and visions are our priority and at the heart of everything we do. Through attentive listening and clear communication, we strive to ensure smooth, positive experiences that make clients feel appreciated and respected every step of the way.',
  },
];

export const processSteps = [
  {
    num: '01',
    title: 'Consultation',
    image: '/video-posters/966728565.jpg',
    body: 'Tell us how you live, what you love, and what needs to change. We listen, explore the possibilities, and establish the right starting point.',
  },
  {
    num: '02',
    title: 'Collaboration',
    image: '/editorial/casetta-shelves.webp',
    body: 'Work with our designers to shape the layout, materials, and details. Together, we create a clear plan that balances your vision and investment.',
  },
  {
    num: '03',
    title: 'Execution',
    image: '/video-posters/966901133.jpg',
    body: 'Our team coordinates the build, keeps you informed, and follows through on the details, from the first day on site to your final walkthrough.',
  },
];

export const mission =
  'At Timber and Love, our mission is to transform spaces, communities, and lives through innovative and high-quality design and construction. We strive to exceed our clients’ expectations by collaborating closely with them and delivering exceptional results through our processes and systems, integrity, and attention to detail. We are committed to making a positive impact on the community and being a leader in the industry through hard work, creativity, and a dedication to excellence.';

export const testimonials: Testimonial[] = [
  { name: 'Derrick N.', role: 'Remodel Client', quote: 'Timber and Love is a great company and they do great work! Because my wife works for Luke and Clint (and absolutely loves it!) I have been able to check out a few of the homes that they have renovated and I am impressed by the quality and attention they give to the homes, as well as the customers.' },
  { name: 'Randy T.', role: 'Boise Boys Fan', quote: 'We have not personally had experience with Timber and Love Construction, but we are devoted fans of the Boise boys program on HGTV. We love the interaction between Clint and Luke. They work so well together and are a kick to watch.' },
  { name: 'Caleb R.', role: 'Remodel Client', quote: 'Luke and Clint and the whole crew at Timber and Love are some of the most amazing people I’ve ever met. You can really see and feel the love that goes into the homes that they transform. They really are making Boise a more beautiful place.' },
  { name: 'Jean U.', role: 'Boise Boys Fan', quote: 'I love the designs and the building Boise Boys do on their homes. We live a little over 500 miles north west of Boise, and I would love to have Luke design our house in mid century modern.' },
  { name: 'Richard M.', role: 'Boise Boys Fan', quote: '“Boise Boys” best viewing ever offered by HGTV. Love those guys!' },
  { name: 'Greg R.', role: 'Trade Partner', quote: 'Great company in Boise doing amazing work to turn old homes into beautiful new ones.' },
  { name: 'Lara A.', role: 'Remodel Client', quote: 'Highly Recommend this team of trustworthy and reliable contractors. Looking forward to more great stories!' },
  { name: 'Danika L.', role: 'Trade Partner', quote: 'Amazing company. Very respectable people and incredible work!' },
  { name: 'Jace L.', role: 'Remodel Client', quote: 'Incredible work!! With an incredible heart behind what they do!' },
];

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
export const googleReviews = { rating: 4.9, count: 53, url: 'https://g.page/r/CRGHjvpIySGwEB0/review' };

/**
 * Verified, source-attributed customer reviews used as conversion proof (real
 * current Google reviews). Fan comments are surfaced separately as commentary.
 */
export const clientReviews: Testimonial[] = [
  {
    name: 'Akbar Pirani',
    role: 'Design + Build Client',
    quote: 'Our family had outgrown our space completely and we were torn between moving or trying a major renovation. They showed us a vision for our current layout that we never thought was possible. They knocked out walls and added these gorgeous vaulted ceilings that completely resolved our space issues.',
  },
  {
    name: 'Tracy Macglad',
    role: 'Remodel Client',
    quote: 'I was so worried our older house would lose its classic character during the remodel, but they blended the original charm with clean modern lines perfectly. Honestly, my kitchen looks like a work of art now and I couldn’t be happier.',
  },
  {
    name: 'Jackie Miller',
    role: 'Design + Build Client',
    quote: 'Highly recommend! They are very professional and responsive. Their construction is exceptional quality. They take great pride in their work and it shows. I can’t say enough great things about this company.',
  },
  {
    name: 'Justin Armuth',
    role: 'Design + Build Client',
    quote: 'If you’re looking for a construction company that prioritizes quality, excels in remodels, and brings strong design insight to the table, I highly recommend them. We would absolutely work with them again.',
  },
  {
    name: 'Eric Smith',
    role: 'Real Estate Client',
    quote: 'Mira DiMaggio was our realtor for a recent purchase of a house in Boise. She was wonderful in just about every way. I could not recommend her more highly.',
  },
];

/** Boise Boys fan commentary: clearly labeled as viewer comments, never as client proof. */
export const fanComments: Testimonial[] = [
  { name: 'Randy T.', quote: 'We are devoted fans of the Boise Boys program on HGTV. We love the interaction between Clint and Luke. They work so well together and are a kick to watch.', role: 'Boise Boys Viewer' },
  { name: 'Richard M.', quote: '“Boise Boys”: best viewing ever offered by HGTV. Love those guys!', role: 'Boise Boys Viewer' },
  { name: 'Jean U.', quote: 'I love the designs and the builds the Boise Boys do on their homes. I would love to have Luke design a mid-century modern house for us.', role: 'Boise Boys Viewer' },
];

/** "One Brand, More Ways to Help": how a customer might move between services. */
export const brandEcosystem = [
  'Buy a property and remodel it with our design + build team',
  'Remodel a home before you sell it',
  'Explore real estate investment opportunities',
  'Experience Timber and Love design firsthand through a vacation stay',
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
