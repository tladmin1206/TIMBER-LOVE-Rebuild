/**
 * Structured project case-study records.
 *
 * Only projects that can be CONFIDENTLY identified from real, attributable
 * imagery are included here. Metadata is drawn from verifiable sources (the
 * asset filenames name the HGTV show/episode and property). Nothing is
 * fabricated: where a detail (exact year, budget, client quote, before/after,
 * a specific challenge/solution) is not known, it is simply omitted rather than
 * invented. Project attribution comes from the original property pages and named
 * Timber and Love photography collections.
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
      { src: `${P06}exterior-front.jpg`, alt: 'Spanish modern custom home exterior with white stucco and arched openings, built by Timber + Love' },
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
      { src: `${P06}backyard.jpg`, alt: 'Landscaped backyard of a custom Timber + Love home' },
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
      { src: `${P20}exterior-front.jpg`, alt: 'Modern farmhouse custom home with white board-and-batten siding and steep gables, built by Timber + Love' },
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
      { src: `${P20}backyard.jpg`, alt: 'Backyard of a modern farmhouse built by Timber + Love' },
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
      { src: `${P42}exterior-front.jpg`, alt: 'Contemporary custom home with a butterfly roof and charcoal cladding, built by Timber + Love' },
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
      { src: `${P42}backyard.jpg`, alt: 'Backyard of a contemporary home built by Timber + Love' },
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
      'A historic Boise firehouse reimagined as a distinctive residence, featured on HGTV’s Boise Boys. Original character was preserved alongside a fully modernized interior. It is now a Timber + Love vacation rental.',
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
  {
  "slug": "central-rim",
  "title": "The Central Rim Home",
  "category": "HGTV Home",
  "tags": [
    "hgtv"
  ],
  "location": "Boise, ID",
  "hgtv": "HGTV’s Boise Boys, Season 1 Episode 2",
  "scope": "Residential transformation",
  "summary": "Cedar, stone, and long views shape this Boise home, with a wood-lined living area, a statement fireplace, and a terrace that opens the interior to its setting.",
  "cover": "/projects/central-rim/exterior.webp",
  "gallery": [
    {
      "src": "/projects/central-rim/exterior.webp",
      "alt": "Cedar and stone exterior of the Central Rim home"
    },
    {
      "src": "/projects/central-rim/living.webp",
      "alt": "Open living area with a wood ceiling and fireplace"
    },
    {
      "src": "/projects/central-rim/terrace.webp",
      "alt": "Sliding doors connect the living area to the terrace"
    },
    {
      "src": "/projects/central-rim/lower-level.webp",
      "alt": "Bright lower-level stair hall"
    },
    {
      "src": "/projects/central-rim/bedroom.webp",
      "alt": "Bedroom with a natural wood feature wall"
    },
    {
      "src": "/projects/central-rim/bathroom.webp",
      "alt": "Bathroom with a wood vanity and black fixtures"
    }
  ]
},  {
  "slug": "stucco-in-time",
  "title": "Stucco in Time",
  "category": "HGTV Home",
  "tags": [
    "hgtv"
  ],
  "location": "Boise, ID",
  "hgtv": "HGTV’s Boise Boys, Season 2 Episode 6",
  "scope": "Residential transformation",
  "summary": "Exposed beams, a stone fireplace, and generous windows give this Boise home its open, welcoming character. The kitchen and living spaces share light and views.",
  "cover": "/projects/stucco-in-time/living.webp",
  "gallery": [
    {
      "src": "/projects/stucco-in-time/exterior.webp",
      "alt": "Stucco home exterior with a timber-framed entrance"
    },
    {
      "src": "/projects/stucco-in-time/living.webp",
      "alt": "Living room with exposed beams and a stone fireplace"
    },
    {
      "src": "/projects/stucco-in-time/kitchen.webp",
      "alt": "Kitchen island and white cabinetry with open views"
    },
    {
      "src": "/projects/stucco-in-time/bedroom.webp",
      "alt": "Bedroom with a teal feature wall and large windows"
    },
    {
      "src": "/projects/stucco-in-time/bathroom.webp",
      "alt": "Bathroom with a double vanity and glass shower"
    },
    {
      "src": "/projects/stucco-in-time/terrace.webp",
      "alt": "Glazed rear elevation opening to the terrace"
    }
  ]
},  {
  "slug": "due-for-a-raze",
  "title": "Due for a Raze",
  "category": "HGTV Home",
  "tags": [
    "hgtv"
  ],
  "location": "Boise, ID",
  "hgtv": "HGTV’s Boise Boys, Season 2 Episode 7",
  "scope": "Residential transformation",
  "summary": "A porch-front Boise home with a dramatic double-height interior, a blue kitchen, and layers of natural wood. Upstairs gathering spaces add another place to settle in.",
  "cover": "/projects/due-for-a-raze/exterior.webp",
  "gallery": [
    {
      "src": "/projects/due-for-a-raze/exterior.webp",
      "alt": "Two-story Boise home with a front porch"
    },
    {
      "src": "/projects/due-for-a-raze/living.webp",
      "alt": "Double-height living space with blue kitchen cabinetry"
    },
    {
      "src": "/projects/due-for-a-raze/kitchen.webp",
      "alt": "Kitchen with a copper hood and dark blue cabinetry"
    },
    {
      "src": "/projects/due-for-a-raze/lounge.webp",
      "alt": "Upstairs lounge with built-in storage"
    },
    {
      "src": "/projects/due-for-a-raze/bedroom.webp",
      "alt": "Bedroom with reclaimed wood walls"
    },
    {
      "src": "/projects/due-for-a-raze/bathroom.webp",
      "alt": "Bathroom with patterned floor tiles and a freestanding tub"
    }
  ]
},  {
  "slug": "north-end-gem",
  "title": "The North End Gem",
  "category": "HGTV Home",
  "tags": [
    "hgtv"
  ],
  "location": "Boise, ID",
  "hgtv": "HGTV’s Boise Boys, Season 1 Episode 4",
  "scope": "Residential transformation",
  "summary": "A colorful North End home with a curved porch, original character, and richly layered rooms. Green cabinetry, exposed brick, and a plant-filled sunroom give each space its own identity.",
  "cover": "/projects/north-end-gem/exterior.webp",
  "gallery": [
    {
      "src": "/projects/north-end-gem/exterior.webp",
      "alt": "North End home with a curved porch and teal siding"
    },
    {
      "src": "/projects/north-end-gem/living.webp",
      "alt": "Living room with original wood flooring and fireplace"
    },
    {
      "src": "/projects/north-end-gem/kitchen.webp",
      "alt": "Kitchen with green cabinetry and exposed brick"
    },
    {
      "src": "/projects/north-end-gem/sunroom.webp",
      "alt": "Sunroom with rattan chairs and plants"
    },
    {
      "src": "/projects/north-end-gem/bedroom.webp",
      "alt": "Warm red bedroom with a fireplace"
    },
    {
      "src": "/projects/north-end-gem/bathroom.webp",
      "alt": "Bathroom with a freestanding black tub"
    }
  ]
},  {
  "slug": "the-darla-house",
  "title": "The Darla House",
  "category": "Cottage Renovation",
  "tags": [
    "remodel"
  ],
  "location": "Boise, ID",
  "scope": "Renovation and interior styling",
  "summary": "A North End cottage refreshed for comfortable stays, preserving its familiar character with a bright interior and welcoming living spaces.",
  "cover": "/wp-content/uploads/2026/04/01-Exterior-Front-1024x683.jpg",
  "stayHref": "/the-darla-house/",
  "gallery": [
    {
      "src": "/wp-content/uploads/2026/04/01-Exterior-Front-1024x683.jpg",
      "alt": "The Darla House: front exterior"
    },
    {
      "src": "/wp-content/uploads/2026/04/06-Living-Room-scaled.jpg",
      "alt": "The Darla House: Living Room"
    },
    {
      "src": "/wp-content/uploads/2026/04/14-Kitchen-scaled.jpg",
      "alt": "The Darla House: Kitchen"
    },
    {
      "src": "/wp-content/uploads/2026/04/21-Bedroom-1-scaled.jpg",
      "alt": "The Darla House: Bedroom 1"
    },
    {
      "src": "/wp-content/uploads/2026/04/24-Bathroom-scaled.jpg",
      "alt": "The Darla House: Bathroom"
    },
    {
      "src": "/wp-content/uploads/2026/04/33-Aerial-View-scaled.jpg",
      "alt": "The Darla House: Aerial View"
    }
  ]
},  {
  "slug": "the-chalet",
  "title": "The Chalet",
  "category": "Mountain Retreat",
  "tags": [
    "remodel"
  ],
  "location": "New Meadows, ID",
  "scope": "Renovation and interior styling",
  "summary": "A mountain cabin redesigned and styled by Luke Caldwell and the Timber + Love team, with warm gathering spaces and room to slow down.",
  "cover": "/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg",
  "stayHref": "/timber-and-love-chalet/",
  "gallery": [
    {
      "src": "/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled.jpg",
      "alt": "The Chalet: Exterior Front"
    },
    {
      "src": "/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Back-1-scaled.jpg",
      "alt": "The Chalet: Exterior Back 1"
    },
    {
      "src": "/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Living-Room-1.jpg",
      "alt": "The Chalet: Living Room 1"
    },
    {
      "src": "/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Dining-Room-Living-Room.jpg",
      "alt": "The Chalet: Dining Room Living Room"
    },
    {
      "src": "/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Dining-Room-1.jpg",
      "alt": "The Chalet: Dining Room 1"
    },
    {
      "src": "/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Kitchen.jpg",
      "alt": "The Chalet: Kitchen"
    }
  ]
},  {
  "slug": "kualoa-beach-house",
  "title": "The Kualoa Beach House",
  "category": "Coastal Retreat",
  "tags": [
    "remodel"
  ],
  "location": "Oahu, HI",
  "scope": "Renovation and interior styling",
  "summary": "A renovated oceanfront retreat in Kaʻaʻawa with open views toward Mokoliʻi, a beachside lawn, and bright living spaces beside the Pacific.",
  "cover": "/wp-content/uploads/2025/12/1-Oceanfront-Oahu-vacation-rental-exterior-with-direct-beach-access.png",
  "stayHref": "/chinamans-ocean-front-beach-house/",
  "gallery": [
    {
      "src": "/wp-content/uploads/2025/12/1-Oceanfront-Oahu-vacation-rental-exterior-with-direct-beach-access.png",
      "alt": "The Kualoa Beach House: Oceanfront Oahu vacation rental exterior with direct beach access"
    },
    {
      "src": "/wp-content/uploads/2025/12/7-Oceanfront-Oahu-vacation-rental-exterior-with-direct-beach-access.png",
      "alt": "The Kualoa Beach House: Oceanfront Oahu vacation rental exterior with direct beach access"
    },
    {
      "src": "/wp-content/uploads/2025/12/9-Spacious-living-room-in-Oahu-vacation-rental-with-ocean-views.png",
      "alt": "The Kualoa Beach House: Spacious living room in Oahu vacation rental with ocean views"
    },
    {
      "src": "/wp-content/uploads/2025/12/11-Modern-kitchen-in-Oahu-beach-house-vacation-rental.png",
      "alt": "The Kualoa Beach House: Modern kitchen in Oahu beach house vacation rental"
    },
    {
      "src": "/wp-content/uploads/2025/12/16-Bright-bedroom-with-ocean-view-in-Oahu-Hawaii-vacation-rental.png",
      "alt": "The Kualoa Beach House: Bright bedroom with ocean view in Oahu Hawaii vacation rental"
    },
    {
      "src": "/wp-content/uploads/2025/12/24-Oahu-beachfront-vacation-rental-near-Kualoa-Ranch-and-Chinamans-Hat-scaled.jpg",
      "alt": "The Kualoa Beach House: Oahu beachfront vacation rental near Kualoa Ranch and Chinamans Hat"
    }
  ]
},
];

export type ProjectFilterKey = 'all' | 'new-home' | 'remodel' | 'hgtv';

export const projectFilters: { key: ProjectFilterKey; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'new-home', label: 'Custom Homes' },
  { key: 'remodel', label: 'Renovated Retreats' },
  { key: 'hgtv', label: 'HGTV Homes' },
];

// Editorial collections are distinct. A filmed renovation belongs to HGTV;
// retreat projects form their own collection, without repeating those homes.
export function filterProjects(key: ProjectFilterKey): Project[] {
  if (key === 'all') return [...projects];
  if (key === 'hgtv') return projects.filter((p) => p.tags.includes('hgtv'));
  return projects.filter((p) => p.tags.includes(key) && !p.tags.includes('hgtv'));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Related by project type, scope and setting; at most one Promise Lane home. */
export function relatedProjects(slug: string): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  const score = (p: Project) =>
    p.tags.filter((tag) => current.tags.includes(tag)).length * 8 +
    (p.scope === current.scope ? 4 : 0) + (p.category === current.category ? 4 : 0) +
    (p.style && p.style === current.style ? 3 : 0) + (p.location === current.location ? 1 : 0);
  const candidates = projects.filter((p) => p.slug !== slug)
    .sort((a, b) => score(b) - score(a) || a.slug.localeCompare(b.slug));
  const seen = new Set<string>();
  return candidates.filter((p) => {
    const group = p.slug.startsWith('promise-lane-') ? 'promise-lane' : p.slug;
    if (seen.has(group)) return false;
    seen.add(group);
    return true;
  }).slice(0, 3);
}
