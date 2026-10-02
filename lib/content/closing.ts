import { site } from '@/lib/site';
import type { ClosingCtaProps } from '@/components/sections/ClosingCta';

/**
 * Per-page closing CTA copy.
 *
 * Every non-legal page ends with one of these. Rules the copy follows:
 *  - The primary action names what happens ("Request a Cash Offer"), never
 *    "Get Started" or "Learn More".
 *  - Every entry carries a lower-commitment secondary so visitors who are not
 *    ready today still have somewhere to go: usually our work or a conversation.
 *  - The body answers "why now" in one sentence, not a restatement of the page.
 */

const START_PROJECT = { label: 'Start a Project', href: '/design-and-build-questionnaire/' };
const VIEW_WORK = { label: 'View Our Work', href: '/timber-and-love-gallery/' };

/** The brand film used behind hero-weight closing CTAs. */
export const CLOSING_VIDEO = { videoId: '927976789', poster: '/video-posters/927976789.jpg' };

export const closingCta: Record<string, ClosingCtaProps> = {
  /** Homepage and other hero-weight pages: video-backed. */
  home: {
    ...CLOSING_VIDEO,
    eyebrow: 'Not Sure Where to Start?',
    title: 'Tell Us About Your Home',
    body: 'Choose the option closest to your goal, or reach out and our team will point you in the right direction.',
    primary: { label: 'Contact Timber and Love', href: '/contact/' },
    secondary: VIEW_WORK,
  },

  designBuild: {
    ...CLOSING_VIDEO,
    eyebrow: 'Design + Build',
    title: 'Start With a Conversation',
    body: 'Tell us about your home, your goals, and your budget. We will tell you honestly whether we are the right team for it.',
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: VIEW_WORK,
  },

  questionnaire: {
    ...CLOSING_VIDEO,
    eyebrow: 'Prefer to Talk First?',
    title: 'We Are Happy to Start There',
    body: 'Send a short inquiry or give us a call. Reach out however suits you.',
    primary: { label: 'Contact Our Team', href: '/contact/' },
    secondary: VIEW_WORK,
  },

  article: {
    ...CLOSING_VIDEO,
    eyebrow: 'From Reading to Planning',
    title: 'Thinking About Your Own Project?',
    body: 'Our team can tell you what this would look like for your home, your site, and your budget.',
    primary: { label: 'Talk to Our Team', href: '/contact/' },
    secondary: VIEW_WORK,
  },

  hgtv: {
    eyebrow: 'Bring the Look Home',
    title: 'Bring Thoughtful Timber and Love Design to Your Home',
    body: 'See how the design you love on screen translates to your own project.',
    image: '/editorial/firehouse-living.webp',
    primary: { label: 'Explore Design + Build', href: '/design-and-build/' },
    secondary: VIEW_WORK,
  },

  about: {
    eyebrow: 'Work With Our Team',
    title: 'Let’s Talk About Your Home',
    body: 'You know who we are and how we work. Tell us what you have in mind and we will tell you honestly whether we are the right fit.',
    image: '/editorial/casetta-entry.webp',
    primary: { label: 'Contact Luke’s Team', href: '/contact/' },
    secondary: VIEW_WORK,
  },

  designBuildGallery: {
    eyebrow: 'From Inspiration to Plan',
    title: 'Build Something Like This',
    body: 'Every project here started with a conversation about a room that was not working. Yours can start the same way.',
    image: '/projects/promise-ln-5142/5142-promise-ln-exterior-angle.jpg',
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: VIEW_WORK,
  },

  projectDetail: {
    eyebrow: 'Your Project Next',
    title: 'Bring This Level of Detail Home',
    body: 'The same team, process, and standard of finish is available for your remodel or new build in the Boise area.',
    image: '/editorial/cottage-kitchen.webp',
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: VIEW_WORK,
  },

  buyOrSell: {
    eyebrow: 'Timber and Love Realty',
    title: 'Make Your Next Move With Us',
    body: 'Buying or selling in the Boise area, you get a team that also designs and builds, so you see a home’s potential, not just its listing.',
    image: '/editorial/midcentury-console.webp',
    primary: { label: 'Buy or Sell a Home', href: site.external.realty, external: true },
    secondary: { label: 'Talk to Our Team', href: '/contact/' },
  },

  sellForCash: {
    eyebrow: 'A Simpler Sale',
    title: 'See What We Would Offer',
    body: 'No listing, no showings, no repairs. Find out what a direct cash offer on your home looks like: there is no obligation to accept it.',
    image: '/editorial/garden-detail.webp',
    primary: { label: 'Request a Cash Offer', href: site.external.cashOffers, external: true },
    secondary: { label: 'Compare Selling Options', href: '/buy-or-sell/' },
  },

  invest: {
    eyebrow: 'Investment Opportunities',
    title: 'Invest Alongside Our Team',
    body: 'We invest in the same Boise market we design, build, and sell in. Reach out to see what is currently open.',
    image: '/editorial/concrete-stair.webp',
    primary: { label: 'Explore Investing', href: site.external.invest, external: true },
    secondary: { label: 'Talk to Our Team', href: '/contact/' },
  },

  stayWithUs: {
    eyebrow: 'Stay With Us',
    title: 'Find Your Next Getaway',
    body: 'Choose the home that fits your trip, explore the details, and check your dates with its booking host.',
    image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Stay-With-Us-Background-Image-New-Meadows-1-1.jpg',
    primary: { label: 'Explore the Properties', href: '#properties' },
    secondary: { label: 'Ask a Question', href: '/contact/' },
  },

  vacationRentals: {
    eyebrow: 'Stay With Us',
    title: 'Find Your Place for the Week',
    body: 'City weekends, mountain mornings, and time by the ocean. Explore our homes and find the right setting for your next trip.',
    image: '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg',
    primary: { label: 'Browse All Properties', href: '/stay-with-us/' },
    secondary: { label: 'Ask a Question', href: '/contact/' },
  },

  ourProcess: {
    eyebrow: 'Now You Know How It Works',
    title: 'Start With a Conversation',
    body: 'The first step is a conversation about your home, your budget, and whether we are the right team for it. Nothing is committed.',
    image: '/editorial/craftsman-dining.webp',
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: VIEW_WORK,
  },

  financing: {
    eyebrow: 'Plan the Investment',
    title: 'Start With a Clear Plan',
    body: 'Tell us about your goals and budget. We will talk through the scope and what to consider before you move forward.',
    image: '/editorial/mountain-window.webp',
    primary: START_PROJECT,
    secondary: { label: 'Talk to Our Team', href: '/contact/' },
  },

  estimate: {
    eyebrow: 'Turn a Range Into a Plan',
    title: 'Let’s Talk Through Your Project',
    body: 'An estimate is a starting point. A conversation about your home, site, and selections is what turns it into a real scope.',
    image: '/editorial/mountain-bath.webp',
    primary: { label: 'Start a Project Inquiry', href: '/design-and-build-questionnaire/' },
    secondary: { label: 'See How Financing Works', href: '/financing/' },
  },

  reviews: {
    surface: 'solid',
    eyebrow: 'Ready When You Are',
    title: 'Start Your Own Project',
    body: `${site.name} has earned these reviews one home at a time. We would like the chance to earn yours.`,
    image: '/editorial/arched-bedroom.webp',
    primary: { label: 'Start a Project', href: '/design-and-build-questionnaire/' },
    secondary: VIEW_WORK,
  },

  serviceAreas: {
    eyebrow: 'Serving the Treasure Valley',
    title: 'Building Throughout the Boise Area',
    body: 'If your home is in or near the Treasure Valley, we can likely help. Tell us where you are and what you are planning.',
    image: '/projects/stucco-in-time/living.webp',
    primary: { label: 'Talk to Our Team', href: '/contact/' },
    secondary: VIEW_WORK,
  },

  journal: {
    surface: 'solid',
    eyebrow: 'Beyond the Reading',
    title: 'Ready to Plan Your Own Project?',
    body: 'Articles can only take you so far. When you want an answer specific to your home, our team is here.',
    image: '/editorial/casetta-kitchen.webp',
    primary: { label: 'Talk to Our Team', href: '/contact/' },
    secondary: VIEW_WORK,
  },
};
