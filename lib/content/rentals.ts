import darla from '@/content/the-darla-house.json';
import firehouse from '@/content/the-firehouse.json';
import kualoa from '@/content/chinamans-beach-house.json';
import chalet from '@/content/chalet.json';
import caldwell from '@/content/caldwell-beach-house.json';

export const rentals = [
  { name: firehouse.hero.heading, guests: 6, facts: '3 bedrooms · 2 bathrooms · Sleeps 6', region: 'Idaho', destination: 'Boise, ID', locality: 'Boise', bedrooms: 3, projectHref: '/projects/the-firehouse/', href: '/the-firehouse/', image: firehouse.hero.image, bookingUrl: firehouse.details.bookingUrl, blurb: 'A restored historic firehouse in Boise’s North End, with generous gathering spaces and a story all its own.' },
  { name: chalet.hero.heading, guests: 10, facts: '3 bedrooms · 2 full bathrooms · Sleeps 10', region: 'Idaho', destination: 'New Meadows, near McCall, ID', locality: 'New Meadows', bedrooms: 3, projectHref: '/projects/the-chalet/', href: '/timber-and-love-chalet/', image: chalet.hero.image, bookingUrl: chalet.details.bookingUrl, blurb: 'A welcoming mountain retreat for time together and a change of pace near McCall.' },
  { name: darla.hero.heading, guests: 4, facts: '3 sleeping areas · 1 bathroom · Sleeps 4', region: 'Idaho', destination: 'Boise, ID', locality: 'Boise', projectHref: '/projects/the-darla-house/', href: '/the-darla-house/', image: darla.hero.image, bookingUrl: darla.details.bookingUrl, blurb: 'A bright, inviting North End cottage with original character and a cozy place to unwind.' },
  { name: kualoa.hero.heading, guests: 8, region: 'Hawaii', destination: 'Oahu, HI', locality: 'Kaʻaʻawa', bedrooms: 3, projectHref: '/projects/kualoa-beach-house/', href: '/kualoa-beach-house/', image: kualoa.hero.image, bookingUrl: kualoa.details.bookingUrl, facts: '3 bedrooms · 2 bathrooms · Sleeps 8', blurb: 'A beachfront home in Kaʻaʻawa with a lawn beside the sand and views toward Mokoliʻi.' },
  { name: caldwell.hero.heading, guests: 11, region: 'Hawaii', destination: 'Oahu, HI', locality: 'Kaʻaʻawa', bedrooms: 4, href: '/caldwell-beach-house/', image: caldwell.hero.image, bookingUrl: caldwell.details.bookingUrl, facts: '4 bedrooms · 2 bathrooms · Sleeps 11', blurb: 'An oceanfront retreat with an upper deck, open water views, and the Koʻolau mountains behind it.' },
];
