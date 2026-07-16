/**
 * Structured project case-study records.
 *
 * Only projects that can be CONFIDENTLY identified from real, attributable
 * imagery are included here. Metadata is drawn from verifiable sources (the
 * asset filenames name the HGTV show/episode and property). Nothing is
 * fabricated: where a detail (exact year, budget, client quote, before/after,
 * a specific challenge/solution) is not known, it is simply omitted rather than
 * invented. Unattributed design images live in the separate "inspiration"
 * collection on the gallery, never as project case studies.
 *
 * TEMP: confirm scope wording and add exact years / additional projects as the
 * business verifies them.
 */

const CASA = '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-';
const FIRE = '/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-';

export type ProjectTag = 'remodel' | 'hgtv' | 'historic' | 'new-home';

export type Project = {
  slug: string;
  title: string;
  category: string; // display category (e.g. "Whole-Home Remodel")
  tags: ProjectTag[]; // used for gallery filters
  location: string;
  hgtv?: string; // verified HGTV reference, when applicable
  scope: string;
  summary: string;
  cover: string;
  gallery: { src: string; alt: string }[];
  featured?: boolean;
  /** Optional cross-link to a related vacation stay (e.g. the Firehouse). */
  stayHref?: string;
};

export const projects: Project[] = [
  {
    slug: 'casa-de-boise',
    title: 'Casa De Boise',
    category: 'Whole-Home Remodel',
    tags: ['remodel', 'hgtv'],
    location: 'Boise, ID',
    hgtv: "HGTV's Boise Boys, Season 2 Episode 9",
    scope: 'Whole-home remodel',
    summary:
      'A whole-home remodel in Boise featured on HGTV’s Boise Boys, with reimagined living, kitchen, dining, and work spaces carried by a warm, modern point of view.',
    cover: `${CASA}Front-Exterior-scaled.jpg`,
    featured: true,
    gallery: [
      { src: `${CASA}Front-Exterior-scaled.jpg`, alt: 'Casa De Boise front exterior' },
      { src: `${CASA}Living-Room-1-scaled.jpg`, alt: 'Casa De Boise living room' },
      { src: `${CASA}Kitchen-1-scaled.jpg`, alt: 'Casa De Boise kitchen' },
      { src: `${CASA}Dining-Room-2-scaled.jpg`, alt: 'Casa De Boise dining room' },
      { src: `${CASA}Office-1-scaled.jpg`, alt: 'Casa De Boise home office' },
    ],
  },
  {
    slug: 'the-firehouse',
    title: 'The Firehouse',
    category: 'Historic Remodel',
    tags: ['remodel', 'hgtv', 'historic'],
    location: 'Boise, ID',
    hgtv: "HGTV's Boise Boys",
    scope: 'Historic remodel',
    summary:
      'A historic Boise firehouse reimagined as a distinctive residence, featured on HGTV’s Boise Boys. Original character was preserved alongside a fully modernized interior. It is now a Timber and Love vacation rental.',
    cover: `${FIRE}Exterior-scaled.jpg`,
    featured: true,
    stayHref: '/the-firehouse/',
    gallery: [
      { src: `${FIRE}Exterior-scaled.jpg`, alt: 'The Firehouse exterior' },
      { src: `${FIRE}Living-Room-scaled.jpg`, alt: 'The Firehouse living room' },
      { src: `${FIRE}Kitchen-1-scaled.jpg`, alt: 'The Firehouse kitchen' },
      { src: `${FIRE}Kitchen-3-scaled.jpg`, alt: 'The Firehouse kitchen detail' },
      { src: `${FIRE}Master-Bed-scaled.jpg`, alt: 'The Firehouse primary bedroom' },
      { src: `${FIRE}Master-Bath-1-scaled.jpg`, alt: 'The Firehouse primary bath' },
      { src: `${FIRE}Downstairs-scaled.jpg`, alt: 'The Firehouse lower level' },
    ],
  },
];

export const projectFilters: { key: 'all' | ProjectTag; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'remodel', label: 'Remodels' },
  { key: 'hgtv', label: 'HGTV Projects' },
  { key: 'historic', label: 'Historic' },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Related projects for a detail page (everything except the current slug). */
export function relatedProjects(slug: string): Project[] {
  return projects.filter((p) => p.slug !== slug);
}
