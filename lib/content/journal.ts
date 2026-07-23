/**
 * Journal (blog) index, the existing editorial articles, surfaced as a hub for
 * SEO and engagement. Sorted newest-first at read time. Titles, dates, images,
 * and excerpts mirror each article's own content (nothing invented).
 */
export type JournalPost = {
  title: string;
  href: string;
  date: string; // ISO
  image: string;
  excerpt: string;
  tag: string;
};

const posts: JournalPost[] = [
  {
    title: 'The Real Story Behind Timber + Love: What We’ve Built and Why It Matters',
    href: '/timber-love-story-boise/',
    date: '2026-04-14',
    image: '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1200-x-630-px.jpg',
    excerpt: 'Every venture has an origin story. Here is how Timber and Love grew from a hands-on real estate and renovation practice into one connected home and real estate brand.',
    tag: 'Brand Story',
  },
  {
    title: 'About Luke Caldwell: Frequently Asked Questions',
    href: '/luke-caldwell-faq/',
    date: '2026-04-13',
    image: '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1200-x-630-px.jpg',
    excerpt: 'The most common questions about Luke Caldwell, the designer and builder behind Timber and Love and HGTV’s Boise Boys.',
    tag: 'People',
  },
  {
    title: 'Luke Caldwell and Clint Robertson Reunite for Building Boise',
    href: '/building-boise-new-show-announcement/',
    date: '2026-04-12',
    image: '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1200-x-630-px.jpg',
    excerpt: 'Luke Caldwell and Clint Robertson team up again for Building Boise, a new independent series. Here is what to expect.',
    tag: 'News',
  },
  {
    title: 'Building Boise, Paying It Forward: How Luke Caldwell Reinvests in the Community',
    href: '/luke-caldwell-boise-community/',
    date: '2026-04-11',
    image: '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1200-x-630-px.jpg',
    excerpt: 'For Luke Caldwell, Boise is more than a place to build. A look at how Timber and Love reinvests in the community it calls home.',
    tag: 'Community',
  },
  {
    title: 'The Boise Boys Are Back',
    href: '/boise-boys-are-back/',
    date: '2024-08-14',
    image: '/wp-content/uploads/2024/04/Boise-Boys-Luke-Caldwell-and-Clint-Robertson-1-1024x633.jpg',
    excerpt: 'Luke and Clint are teaming up again with design tips, home tutorials, and new transformations. Here is the inside scoop.',
    tag: 'News',
  },
];

/** Posts sorted newest-first. */
export const journalPosts: JournalPost[] = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
