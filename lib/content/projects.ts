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
// Three custom design-build homes on W. Promise Lane. Optimized project
// photography lives under /public/projects/<slug>/.
const P06 = '/projects/promise-ln-5106/5106-promise-ln-';
const P20 = '/projects/promise-ln-5120/5120-promise-ln-';
const P42 = '/projects/promise-ln-5142/5142-promise-ln-';

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
  /** Editorial case-study fields (custom homes). Grounded in visible design;
   *  omit anything not verifiable. */
  style?: string; // architectural style, e.g. "Spanish Modern"
  designStory?: string; // a paragraph on the design direction
  materials?: string[]; // visible materials + finishes
  features?: string[]; // visible notable features
};

export const projects: Project[] = [
  // TEMP: confirm exact street/city, square footage, bed/bath counts, and
  // completion year for the three Promise Lane homes before adding them to the
  // "At a Glance" cards. Copy below is grounded only in the visible design.
  {
    slug: 'promise-lane-spanish-modern',
    title: 'The Spanish Modern on Promise Lane',
    category: 'Custom Home',
    tags: ['new-home'],
    location: 'Treasure Valley, Idaho',
    scope: 'Design + Build · New Construction',
    style: 'Spanish Modern',
    summary:
      'A ground-up custom home that reinterprets Spanish and Mediterranean architecture through a warm, modern lens: white stucco, arched openings, and light oak paired with dramatic natural stone.',
    designStory:
      'From the arched entry to the barrel of the great room, this home carries a single, considered idea throughout. Soft white plaster and repeated arches set a Mediterranean tone, while light oak cabinetry, honed marble, and blackened steel keep the interiors firmly modern. Designing and building under one roof let every detail resolve cleanly, from the panelled walls to the tucked-in reading niches.',
    materials: ['White stucco exterior', 'Arched steel windows and doors', 'Light rift-oak cabinetry', 'Natural marble counters and backsplashes', 'Wide-plank oak flooring', 'Handmade tile and brass fixtures'],
    features: ['Barrel-vaulted great room', 'Gas fireplace with panelled surround', 'Character powder room with hand-hung wallpaper', 'Primary suite with freestanding tub', 'Covered outdoor living and landscaped yard'],
    cover: `${P06}exterior-front.jpg`,
    featured: true,
    gallery: [
      { src: `${P06}exterior-front.jpg`, alt: 'Spanish modern custom home exterior with white stucco and arched openings, built by Timber and Love' },
      { src: `${P06}exterior-entry.jpg`, alt: 'Arched front entry of a Spanish modern custom home' },
      { src: `${P06}great-room.jpg`, alt: 'Barrel-vaulted great room with panelled walls and a gas fireplace' },
      { src: `${P06}living-room-fireplace.jpg`, alt: 'Living room with modern fireplace and light oak details' },
      { src: `${P06}living-fireplace-detail.jpg`, alt: 'Fireplace and seating detail in a custom Spanish modern home' },
      { src: `${P06}kitchen-range.jpg`, alt: 'Custom kitchen with light oak cabinetry, marble counters, and a professional range' },
      { src: `${P06}kitchen-marble-backsplash.jpg`, alt: 'Kitchen with full-height natural marble backsplash' },
      { src: `${P06}kitchen-dining.jpg`, alt: 'Open kitchen and dining with oak table and arched window' },
      { src: `${P06}kitchen-sink-window.jpg`, alt: 'Kitchen sink beneath a window with marble surround' },
      { src: `${P06}dining-room.jpg`, alt: 'Dining area with oak table and layered rug' },
      { src: `${P06}panel-wall-niche.jpg`, alt: 'Panelled wall with built-in display niche' },
      { src: `${P06}powder-room.jpg`, alt: 'Character powder room with floral wallpaper and a copper vanity' },
      { src: `${P06}powder-room-detail.jpg`, alt: 'Powder room detail with brass fixtures and terracotta wainscot' },
      { src: `${P06}primary-bedroom.jpg`, alt: 'Primary bedroom with panelled walls and warm bedding' },
      { src: `${P06}primary-bedroom-windows.jpg`, alt: 'Primary bedroom with large windows and garden views' },
      { src: `${P06}primary-bath-tub.jpg`, alt: 'Primary bathroom with a freestanding tub and brass fixtures' },
      { src: `${P06}primary-bath.jpg`, alt: 'Primary bathroom vanity with marble and arched mirror' },
      { src: `${P06}bathroom-double-vanity.jpg`, alt: 'Bathroom with double vanity and dark wood cabinetry' },
      { src: `${P06}bathroom-vanity.jpg`, alt: 'Guest bathroom vanity with arched mirror and brass' },
      { src: `${P06}exterior-rear.jpg`, alt: 'Rear exterior of the Spanish modern custom home' },
      { src: `${P06}backyard.jpg`, alt: 'Landscaped backyard of a custom Timber and Love home' },
    ],
  },
  {
    slug: 'promise-lane-modern-farmhouse',
    title: 'The Modern Farmhouse on Promise Lane',
    category: 'Custom Home',
    tags: ['new-home'],
    location: 'Treasure Valley, Idaho',
    scope: 'Design + Build · New Construction',
    style: 'Modern Farmhouse',
    summary:
      'A crisp, ground-up modern farmhouse: white board-and-batten and steep gables outside, soaring light-filled volumes and deep-green millwork accents inside.',
    designStory:
      'This home pairs the familiar warmth of a farmhouse with the discipline of modern proportion. Black-framed windows stack toward double-height ceilings, drawing light deep into the plan, while deep-green panelled millwork and a botanical powder room add moments of quiet drama. As a single design-build team, we tuned the volumes, glazing, and finishes together so the architecture and interiors read as one.',
    materials: ['Board-and-batten siding', 'Black-framed windows and doors', 'Deep-green panelled millwork', 'Natural stone and quartz counters', 'White oak flooring', 'Matte-black and brass hardware'],
    features: ['Double-height great room with fireplace', 'Chef’s kitchen with statement range and hood', 'Botanical powder room with vessel sink', 'Panelled primary suite', 'Covered patio and fenced yard'],
    cover: `${P20}exterior-front.jpg`,
    featured: true,
    gallery: [
      { src: `${P20}exterior-front.jpg`, alt: 'Modern farmhouse custom home with white board-and-batten siding and steep gables, built by Timber and Love' },
      { src: `${P20}exterior-side.jpg`, alt: 'Side exterior of a modern farmhouse custom home with black windows' },
      { src: `${P20}great-room-dining.jpg`, alt: 'Great room and dining with double-height ceilings and black windows' },
      { src: `${P20}open-living.jpg`, alt: 'Open-concept living and dining in a modern farmhouse' },
      { src: `${P20}living-room-double-height.jpg`, alt: 'Double-height living room with fireplace and tall windows' },
      { src: `${P20}kitchen.jpg`, alt: 'Modern farmhouse kitchen with white cabinetry and natural stone' },
      { src: `${P20}kitchen-range-hood.jpg`, alt: 'Kitchen with statement range and custom hood' },
      { src: `${P20}kitchen-detail.jpg`, alt: 'Kitchen detail with stone counters and professional range' },
      { src: `${P20}living-green-panel.jpg`, alt: 'Living area with deep-green panelled accent wall' },
      { src: `${P20}living-fireplace.jpg`, alt: 'Living room fireplace with warm styling' },
      { src: `${P20}living-room-fireplace.jpg`, alt: 'Modern farmhouse living room with fireplace and leather seating' },
      { src: `${P20}great-room-volume.jpg`, alt: 'Great room showing the home’s open volume and stair' },
      { src: `${P20}powder-room.jpg`, alt: 'Powder room with dark botanical wallpaper' },
      { src: `${P20}powder-room-vessel-sink.jpg`, alt: 'Powder room with green vessel sink and botanical wallpaper' },
      { src: `${P20}primary-bedroom.jpg`, alt: 'Primary bedroom with green accent wall and upholstered bed' },
      { src: `${P20}primary-bedroom-detail.jpg`, alt: 'Primary bedroom detail with panelled wall' },
      { src: `${P20}primary-bedroom-panel.jpg`, alt: 'Primary bedroom with blue-green panelled headboard wall' },
      { src: `${P20}primary-bath-vanity.jpg`, alt: 'Primary bathroom with dark double vanity and black fixtures' },
      { src: `${P20}bathroom.jpg`, alt: 'Bathroom with quartz counter and matte-black faucet' },
      { src: `${P20}bathroom-vanity.jpg`, alt: 'Guest bathroom vanity with dark cabinetry' },
      { src: `${P20}exterior-rear.jpg`, alt: 'Rear exterior of the modern farmhouse custom home' },
      { src: `${P20}backyard.jpg`, alt: 'Backyard of a modern farmhouse built by Timber and Love' },
    ],
  },
  {
    slug: 'promise-lane-contemporary',
    title: 'The Contemporary on Promise Lane',
    category: 'Custom Home',
    tags: ['new-home'],
    location: 'Treasure Valley, Idaho',
    scope: 'Design + Build · New Construction',
    style: 'Modern Contemporary',
    summary:
      'A bold, ground-up contemporary home under a sculptural butterfly roof: charcoal cladding and warm wood outside, high-contrast interiors with oxblood millwork and dramatic green marble.',
    designStory:
      'The most architectural of the three, this home leads with a single sweeping roofline and a dark, confident material palette. Inside, oxblood panelled walls, a book-matched green marble kitchen, and a double-sided fireplace create a series of memorable rooms rather than a single open box. Coordinating design and construction as one team made the ambitious rooflines, glazing, and stonework possible without compromise.',
    materials: ['Charcoal exterior cladding with wood soffits', 'Butterfly / shed rooflines', 'Book-matched green marble', 'Oxblood panelled millwork', 'Matte-black and brass fixtures', 'Wide-plank oak flooring'],
    features: ['Sculptural butterfly roofline', 'Book-matched green marble kitchen', 'Double-sided great-room fireplace', 'Oxblood primary suite', 'Moody botanical powder room', 'Covered outdoor living'],
    cover: `${P42}exterior-front.jpg`,
    featured: true,
    gallery: [
      { src: `${P42}exterior-front.jpg`, alt: 'Contemporary custom home with a butterfly roof and charcoal cladding, built by Timber and Love' },
      { src: `${P42}exterior-angle.jpg`, alt: 'Angled exterior of a contemporary custom home with sculptural roofline' },
      { src: `${P42}exterior-entry.jpg`, alt: 'Entry of a modern contemporary custom home with wood soffit' },
      { src: `${P42}kitchen-green-marble.jpg`, alt: 'Contemporary kitchen with book-matched green marble and dark cabinetry' },
      { src: `${P42}kitchen-waterfall-backsplash.jpg`, alt: 'Kitchen with green marble waterfall backsplash and professional range' },
      { src: `${P42}kitchen-range.jpg`, alt: 'Dark contemporary kitchen with green marble and statement range' },
      { src: `${P42}kitchen-detail.jpg`, alt: 'Kitchen detail with green marble slab and black cabinetry' },
      { src: `${P42}kitchen-sink.jpg`, alt: 'Kitchen sink with green marble surround and brass fixtures' },
      { src: `${P42}living-room-fireplace.jpg`, alt: 'Living room with oxblood panelled wall and modern fireplace' },
      { src: `${P42}great-room.jpg`, alt: 'Great room with double-height volume and dramatic contrast' },
      { src: `${P42}living-room-volume.jpg`, alt: 'Contemporary living room showing the home’s open volume' },
      { src: `${P42}living-fireplace-detail.jpg`, alt: 'Fireplace and seating detail in a contemporary home' },
      { src: `${P42}double-sided-fireplace.jpg`, alt: 'Double-sided great-room fireplace' },
      { src: `${P42}powder-room.jpg`, alt: 'Moody powder room with dark botanical wallpaper' },
      { src: `${P42}powder-room-detail.jpg`, alt: 'Powder room detail with burgundy vessel sink and brass fixtures' },
      { src: `${P42}primary-bedroom.jpg`, alt: 'Primary bedroom with oxblood panelled accent wall' },
      { src: `${P42}primary-bedroom-windows.jpg`, alt: 'Primary bedroom with black-framed windows and yard views' },
      { src: `${P42}primary-bedroom-detail.jpg`, alt: 'Primary bedroom detail with panelled wall' },
      { src: `${P42}primary-bath-double-vanity.jpg`, alt: 'Primary bathroom with black double vanity and brass fixtures' },
      { src: `${P42}bathroom-vanity.jpg`, alt: 'Bathroom vanity with black cabinetry and brass' },
      { src: `${P42}bathroom.jpg`, alt: 'Contemporary bathroom with dark vanity and matte-black fixtures' },
      { src: `${P42}exterior-rear.jpg`, alt: 'Rear exterior of the contemporary custom home' },
      { src: `${P42}backyard.jpg`, alt: 'Backyard of a contemporary home built by Timber and Love' },
    ],
  },
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
  { key: 'new-home', label: 'Custom Homes' },
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
