import type { Testimonial } from '@/components/ui/Testimonials';

export const heroVideoId = '953577619'; // Vimeo
export const introVideoId = '967117381'; // Vimeo — inline "Designing Beauty" player
export const introVideoPoster = '/wp-content/uploads/2024/06/timber-and-love-intro-video.jpg';

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

// Rotating sub-headline under "Timber and Love" (mirrors the live hero).
export const heroRotating = [
  'Design + Build Firm',
  'New Construction',
  'Realty Firm',
  'Property Management',
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

// Full-bleed service promo blocks (edge-to-edge media + brand logo + CTA) — matches the live homepage.
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

export const services = [
  {
    title: 'Design | Build',
    body: 'Premier Design|Build services transforming visions into stunning, functional living spaces.',
    href: '/design-and-build/',
    cta: 'Learn More',
  },
  {
    title: 'Real Estate',
    body: 'Navigate the real estate market with our experienced, client-focused buying and selling guidance.',
    href: 'https://timberandloverealty.com/',
    cta: 'Learn More',
    external: true,
  },
  {
    title: 'Property Management',
    body: 'Simplified property management solutions ensuring peace of mind for homeowners and tenants alike.',
    href: '/stay-with-us/',
    cta: 'Learn More',
  },
  {
    title: 'Cash Home Offers',
    body: 'Fast, fair cash offers for homes in any condition, making selling hassle-free.',
    href: 'https://buymyhouse.co/',
    cta: 'Get Offer',
    external: true,
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
    body: 'We start with a detailed session to understand your goals and vision. We listen closely, ask the necessary questions, and capture your requirements to tailor our approach specifically to your unique and specific needs.',
  },
  {
    num: '02',
    title: 'Collaboration',
    body: 'After the consultation, we dive into collaborative brainstorming. Our team works closely with you, combining creativity to craft a tailored plan. Your input is vital, and together we create a plan that exceeds expectations.',
  },
  {
    num: '03',
    title: 'Execution',
    body: 'Following consultation and collaboration, it’s time to execute. Whether it’s construction, remodeling, or property transactions, we manage every detail and bring your vision to life ensuring to exceed your expectations.',
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

// Favorite Boise Boys projects gallery (Casa De Boise + Central Rim highlights)
export const favoriteProjects = [
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg', alt: 'Casa De Boise — Front Exterior' },
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Living-Room-1-scaled.jpg', alt: 'Casa De Boise — Living Room' },
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Dining-Room-2-scaled.jpg', alt: 'Casa De Boise — Dining Room' },
  { src: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Office-1-scaled.jpg', alt: 'Casa De Boise — Office' },
  { src: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Kitchen-1-scaled.jpg', alt: 'The Firehouse — Kitchen' },
  { src: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Living-Room-scaled.jpg', alt: 'The Firehouse — Living Room' },
];
