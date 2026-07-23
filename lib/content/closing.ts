import { site } from '@/lib/site';
import type { ClosingCtaProps } from '@/components/sections/ClosingCta';

/**
 * Per-page closing CTA copy.
 *
 * Every non-legal page ends with one of these. Rules the copy follows:
 *  - The primary action names what happens ("Request a Cash Offer"), never
 *    "Get Started" or "Learn More".
 *  - Every entry carries a lower-commitment secondary so visitors who are not
 *    ready today still have somewhere to go — usually the estimator or work.
 *  - The body answers "why now" in one sentence, not a restatement of the page.
 */

const IMG = {
  remodel: '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg',
  kitchen: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Kitchen-1-scaled.jpg',
  living: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Living-Room-1-scaled.jpg',
  exterior: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg',
  realty: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Realty-Background-1-scaled-1.jpg',
  buying: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Home-Buying-Background-2-min.jpg',
  stay: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Stay-With-Us-Background-Image-New-Meadows-1-1.jpg',
  chalet: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg',
  firehouse: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Living-Room-scaled.jpg',
  luke: '/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg',
} as const;

const ESTIMATE = { label: 'Get an Estimate', href: '/estimate/' };
const VIEW_WORK = { label: 'View Our Work', href: '/timber-and-love-gallery/' };

export const closingCta: Record<string, ClosingCtaProps> = {
  about: {
    eyebrow: 'Work With Our Team',
    title: 'Let’s Talk About Your Home',
    body: 'You know who we are and how we work. Tell us what you have in mind and we will tell you honestly whether we are the right fit.',
    image: IMG.luke,
    primary: { label: 'Contact Our Team', href: '/contact/' },
    secondary: VIEW_WORK,
  },

  designBuildGallery: {
    eyebrow: 'From Inspiration to Plan',
    title: 'Build Something Like This',
    body: 'Every project here started with a conversation about a room that was not working. Yours can start the same way.',
    image: IMG.kitchen,
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: ESTIMATE,
  },

  projectDetail: {
    eyebrow: 'Your Project Next',
    title: 'Bring This Level of Detail Home',
    body: 'The same team, process, and standard of finish is available for your remodel or new build in the Boise area.',
    image: IMG.living,
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: ESTIMATE,
  },

  buyOrSell: {
    eyebrow: 'Timber and Love Realty',
    title: 'Make Your Next Move With Us',
    body: 'Buying or selling in the Boise area, you get a team that also designs and builds — so you see a home’s potential, not just its listing.',
    image: IMG.realty,
    primary: { label: 'Buy or Sell a Home', href: site.external.realty, external: true },
    secondary: { label: 'Talk to Our Team', href: '/contact/' },
  },

  sellForCash: {
    eyebrow: 'A Simpler Sale',
    title: 'See What We Would Offer',
    body: 'No listing, no showings, no repairs. Find out what a direct cash offer on your home looks like — there is no obligation to accept it.',
    image: IMG.exterior,
    primary: { label: 'Request a Cash Offer', href: site.external.cashOffers, external: true },
    secondary: { label: 'Compare Selling Options', href: '/buy-or-sell/' },
  },

  invest: {
    eyebrow: 'Investment Opportunities',
    title: 'Invest Alongside Our Team',
    body: 'We invest in the same Boise market we design, build, and sell in. Reach out to see what is currently open.',
    image: IMG.buying,
    primary: { label: 'Explore Investing', href: site.external.invest, external: true },
    secondary: { label: 'Talk to Our Team', href: '/contact/' },
  },

  stayWithUs: {
    eyebrow: 'Stay With Us',
    title: 'Book a Timber and Love Property',
    body: 'Every rental we own was designed and built by our team — the easiest way to experience the work before you commission it.',
    image: IMG.stay,
    primary: { label: 'View Available Stays', href: '/vacation-rentals/' },
    secondary: { label: 'Ask a Question', href: '/contact/' },
  },

  vacationRentals: {
    eyebrow: 'Stay With Us',
    title: 'Find Your Place for the Week',
    body: 'From a Boise firehouse conversion to a mountain chalet, each property is a Timber and Love build you can actually stay in.',
    image: IMG.chalet,
    primary: { label: 'Browse All Properties', href: '/stay-with-us/' },
    secondary: { label: 'Ask a Question', href: '/contact/' },
  },

  ourProcess: {
    eyebrow: 'Now You Know How It Works',
    title: 'Start With a Conversation',
    body: 'The first step is a conversation about your home, your budget, and whether we are the right team for it. Nothing is committed.',
    image: IMG.remodel,
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: ESTIMATE,
  },

  financing: {
    eyebrow: 'Plan the Investment',
    title: 'Know Your Number First',
    body: 'Get a preliminary range for your project in about two minutes, then we can talk through how to structure it.',
    image: IMG.remodel,
    primary: ESTIMATE,
    secondary: { label: 'Talk to Our Team', href: '/contact/' },
  },

  estimate: {
    eyebrow: 'Turn a Range Into a Plan',
    title: 'Let’s Talk Through Your Project',
    body: 'An estimate is a starting point. A conversation about your home, site, and selections is what turns it into a real scope.',
    image: IMG.kitchen,
    primary: { label: 'Start a Project Inquiry', href: '/design-and-build-questionnaire/' },
    secondary: { label: 'See How Financing Works', href: '/financing/' },
  },

  reviews: {
    eyebrow: 'Ready When You Are',
    title: 'Start Your Own Project',
    body: `${site.name} has earned these reviews one home at a time. We would like the chance to earn yours.`,
    image: IMG.living,
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: ESTIMATE,
  },

  serviceAreas: {
    eyebrow: 'Serving the Treasure Valley',
    title: 'Building Throughout the Boise Area',
    body: 'If your home is in or near the Treasure Valley, we can likely help. Tell us where you are and what you are planning.',
    image: IMG.exterior,
    primary: { label: 'Talk to Our Team', href: '/contact/' },
    secondary: ESTIMATE,
  },

  journal: {
    eyebrow: 'Beyond the Reading',
    title: 'Ready to Plan Your Own Project?',
    body: 'Articles can only take you so far. When you want an answer specific to your home, our team is here.',
    image: IMG.firehouse,
    primary: { label: 'Talk to Our Team', href: '/contact/' },
    secondary: ESTIMATE,
  },
};
