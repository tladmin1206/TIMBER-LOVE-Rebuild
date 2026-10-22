import type { Mode, PlannerAnswers } from '../types';

/**
 * Screen and question definitions. Spec Part II §§ 3 and 5.
 *
 * Screens are data, not components, for two reasons. The nine-screen ceiling
 * and the "every question has a not-sure path" rule become properties that can
 * be asserted rather than intentions that can rot, and a mode is a different
 * sequence over the same runtime rather than a different code path.
 *
 * Note the input kinds below: there is deliberately no `dropdown`. Spec § 5.1
 * rule 5 forbids dropdowns on mobile, and the cheapest way to enforce that
 * forever is to make one unrepresentable.
 */

export type InputKind =
  | 'cards' // text cards, one choice
  | 'image-cards' // photography-forward cards, one choice
  | 'toggles' // multi-select icons
  | 'slider'
  | 'address'
  | 'confirmation'; // the prefilled property card

export type Choice = {
  value: string;
  label: string;
  /** Plain-language description of what this choice actually means. */
  blurb?: string;
  /** Real Timber and Love project photography. Never stock (§ 5.1 rule 10). */
  image?: string;
};

/**
 * The "not sure" path. Required on every question that asks the homeowner to
 * decide something (§ 5.1 rule 4). Uncertainty is the state most homeowners
 * are actually in, and punishing it is what makes calculators feel hostile.
 */
export type NotSurePath = {
  label: string;
  /** The documented default applied when the homeowner cannot answer. */
  appliesDefault: string;
  /** Added to the consultation agenda, turning uncertainty into a question. */
  consultationQuestion: string;
};

export type Screen = {
  id: string;
  /** Asked in homeowner language, never industry language. */
  question: string;
  help?: string;
  kind: InputKind;
  /** Key written on PlannerAnswers. */
  field: string;
  choices?: Choice[];
  slider?: { min: number; max: number; step: number; unit: string; reference?: string };
  maxSelections?: number;
  /** Absent only for screens that ask nothing (address, confirmation). */
  notSure?: NotSurePath;
  /** Materially moves the number; a "not sure" here costs more confidence. */
  costDriving?: boolean;
  /** Included only when this predicate passes. */
  when?: (a: PlannerAnswers) => boolean;
  /** Address screens only: offer a "no lot yet" skip + realty-team handoff. */
  noLotOption?: boolean;
};

/* ------------------------------------------------------------------ *
 * Shared opening screens
 * ------------------------------------------------------------------ */

export const MODE_ROUTER: Screen = {
  id: 'mode',
  question: 'What are you planning?',
  kind: 'cards',
  field: 'mode',
  choices: [
    { value: 'A', label: 'Reimagine my home', blurb: 'A kitchen, a bathroom, or more than one room.' },
    { value: 'B', label: 'Add on to my home', blurb: 'More square footage than you have today.' },
    { value: 'C', label: 'Build a new home', blurb: 'On a lot you own, or one you are still looking for.' },
    { value: 'D', label: 'Improve a property for resale or rental', blurb: 'Preparing to sell, rent, or host.' },
    { value: 'unsure', label: 'I’m not sure yet', blurb: 'Two quick questions and we will point you the right way.' },
  ],
};

/**
 * The disambiguation pair. Two answers resolve the mode deterministically, so
 * "not sure" costs the homeowner ten seconds rather than routing them wrongly.
 */
export const DISAMBIGUATE: Screen[] = [
  {
    id: 'own-property',
    question: 'Do you own the property today?',
    kind: 'cards',
    field: 'ownsProperty',
    when: (a) => (a as Record<string, unknown>).mode === 'unsure',
    choices: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'Not yet' },
    ],
  },
  {
    id: 'adding-sqft',
    question: 'Will you be adding square footage?',
    kind: 'cards',
    field: 'addingSqFt',
    when: (a) => (a as Record<string, unknown>).mode === 'unsure',
    choices: [
      { value: 'yes', label: 'Yes, adding space' },
      { value: 'no', label: 'No, working with what’s there' },
      { value: 'unsure', label: 'I’m not sure' },
    ],
  },
];

export const ADDRESS: Screen = {
  id: 'address',
  question: 'Where is the home?',
  help: 'We use public property records to fill in the details, so you do not have to.',
  kind: 'address',
  field: 'address',
};

export const ADDRESS_BUILD: Screen = {
  id: 'address',
  question: 'Where will you build?',
  help: 'If you already have a lot, we will pull what public records show. No lot yet is completely fine.',
  kind: 'address',
  field: 'address',
  noLotOption: true,
};

export const PROPERTY_CONFIRM: Screen = {
  id: 'property-confirm',
  question: 'We found your home.',
  help: 'Check this over. If anything is off, you can correct it.',
  kind: 'confirmation',
  field: 'propertyConfirmed',
};

/* ------------------------------------------------------------------ *
 * Mode A: Renovate
 * ------------------------------------------------------------------ */

const SPACE: Screen = {
  id: 'space',
  question: 'Which space are you reimagining?',
  kind: 'image-cards',
  field: 'projectType',
  costDriving: true,
  choices: [
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bathroom', label: 'Primary bath' },
    { value: 'bathroom-guest', label: 'Guest or hall bath' },
    { value: 'multiple', label: 'More than one space' },
    { value: 'whole-home', label: 'The whole home' },
  ],
  notSure: {
    label: 'More than one, or not decided',
    appliesDefault: 'We plan for a kitchen, the most common starting point, and widen the range.',
    consultationQuestion: 'Which spaces are actually in scope?',
  },
};

const SCOPE_LEVEL: Screen = {
  id: 'scopeLevel',
  question: 'How much are you changing?',
  help: 'This affects the investment more than anything else you will tell us.',
  kind: 'image-cards',
  field: 'scopeLevel',
  costDriving: true,
  choices: [
    { value: 'refresh', label: 'Refresh', blurb: 'New finishes. The layout stays as it is.' },
    { value: 'reimagine', label: 'Reimagine', blurb: 'A new layout inside the same footprint. Plumbing and electrical move.' },
    { value: 'rebuild', label: 'Rebuild', blurb: 'Walls come down or move. The space is structurally different.' },
  ],
  notSure: {
    label: 'I’m not sure yet',
    appliesDefault: 'We plan for a Reimagine, the most common scope.',
    consultationQuestion: 'How much of the existing layout do you want to keep?',
  },
};

const FINISH_TIER: Screen = {
  id: 'finishTier',
  question: 'What level of finish are you imagining?',
  kind: 'image-cards',
  field: 'finishTier',
  costDriving: true,
  choices: [
    { value: 'signature', label: 'Signature', blurb: 'Well-made, durable, quietly designed.' },
    { value: 'elevated', label: 'Elevated', blurb: 'Custom cabinetry, stone, considered detail throughout.' },
    { value: 'bespoke', label: 'Bespoke', blurb: 'Fully custom, specialty materials, no standard parts.' },
  ],
  notSure: {
    label: 'Help me decide',
    appliesDefault: 'We plan for Elevated, where most Timber + Love projects land.',
    consultationQuestion: 'Which finish level fits your goals and budget?',
  },
};

/* ------------------------------------------------------------------ *
 * Mode B: Expand (appended for hybrids, § 3.2)
 * ------------------------------------------------------------------ */

export const FOOTPRINT_SCREENS: Screen[] = [
  {
    id: 'additionType',
    question: 'What are you adding?',
    kind: 'image-cards',
    field: 'additionType',
    costDriving: true,
    choices: [
      { value: 'room', label: 'A room' },
      { value: 'primary-suite', label: 'A primary suite' },
      { value: 'living', label: 'Living space' },
      { value: 'adu', label: 'An ADU' },
      { value: 'outdoor', label: 'Covered outdoor living' },
    ],
    notSure: {
      label: 'I’m not sure yet',
      appliesDefault: 'We plan for a single-room addition.',
      consultationQuestion: 'What does the added space need to do?',
    },
  },
  {
    id: 'additionSqFt',
    question: 'Roughly how much square footage?',
    kind: 'slider',
    field: 'additionSqFt',
    costDriving: true,
    slider: { min: 100, max: 1500, step: 50, unit: 'sq ft', reference: 'A typical bedroom is about 150 sq ft.' },
    notSure: {
      label: 'I don’t know yet',
      appliesDefault: 'We plan for about 400 sq ft.',
      consultationQuestion: 'How much space do you actually need?',
    },
  },
  {
    id: 'additionPlacement',
    question: 'Single story, or over an existing space?',
    kind: 'cards',
    field: 'additionPlacement',
    costDriving: true,
    choices: [
      { value: 'single-story', label: 'On the ground' },
      { value: 'over-existing', label: 'Over an existing space' },
    ],
    notSure: {
      label: 'Not sure',
      appliesDefault: 'We plan for a ground-level addition.',
      consultationQuestion: 'Is building up or out the better option for this lot?',
    },
  },
];

/* ------------------------------------------------------------------ *
 * Mode C: Build
 * ------------------------------------------------------------------ */

const SITE: Screen = {
  id: 'site',
  question: 'About the site',
  kind: 'toggles',
  field: 'siteFactors',
  costDriving: true,
  choices: [
    { value: 'utilities', label: 'Utilities are at the street' },
    { value: 'slope', label: 'The lot slopes significantly' },
    { value: 'existing-structure', label: 'There’s a structure to remove' },
  ],
  notSure: {
    label: 'I don’t know these yet',
    appliesDefault: 'We plan for utilities at the street and a level lot, and flag both for verification.',
    consultationQuestion: 'What are the site conditions: utilities, slope, and anything to remove?',
  },
};

const BUILD_SIZE: Screen = {
  id: 'targetSqFt',
  question: 'How big, roughly?',
  kind: 'slider',
  field: 'targetSqFt',
  costDriving: true,
  slider: { min: 1800, max: 6500, step: 100, unit: 'sq ft', reference: 'A typical four-bedroom home is around 2,600 sq ft.' },
  notSure: {
    label: 'Still deciding',
    appliesDefault: 'We plan for about 2,800 sq ft.',
    consultationQuestion: 'How much space does the household actually need?',
  },
};

const BUILD_CONTENTS: Screen = {
  id: 'buildContents',
  question: 'What’s in it?',
  kind: 'toggles',
  field: 'buildContents',
  costDriving: true,
  choices: [
    { value: 'two-story', label: 'Two stories' },
    { value: 'garage-2', label: 'Two-car garage' },
    { value: 'garage-3', label: 'Three-car garage' },
    { value: 'basement-unfinished', label: 'Unfinished basement' },
    { value: 'basement-finished', label: 'Finished basement' },
    { value: 'shop-adu', label: 'Shop or ADU' },
    { value: 'primary-main', label: 'Primary suite on the main floor' },
  ],
  notSure: {
    label: 'Not decided yet',
    appliesDefault: 'We plan for a single story with a two-car garage and no basement.',
    consultationQuestion: 'What does the program need to include?',
  },
};

/* ------------------------------------------------------------------ *
 * Mode D: Position
 * ------------------------------------------------------------------ */

const D_GOAL: Screen = {
  id: 'positionGoal',
  question: 'What’s the goal?',
  kind: 'cards',
  field: 'positionGoal',
  costDriving: true,
  choices: [
    { value: 'max-resale', label: 'Maximum resale value' },
    { value: 'rent-ready', label: 'Rent-ready' },
    { value: 'str-ready', label: 'Short-term rental ready' },
    { value: 'flip', label: 'Flip' },
  ],
  notSure: {
    label: 'Still deciding',
    appliesDefault: 'We plan for maximum resale value.',
    consultationQuestion: 'What is the exit plan for this property?',
  },
};

const D_CONDITION: Screen = {
  id: 'condition',
  question: 'What condition is it in today?',
  kind: 'image-cards',
  field: 'condition',
  costDriving: true,
  choices: [
    { value: 'move-in', label: 'Move-in ready, dated' },
    { value: 'tired', label: 'Tired but sound' },
    { value: 'rough', label: 'Rough' },
    { value: 'distressed', label: 'Distressed' },
  ],
  notSure: {
    label: 'Hard to say',
    appliesDefault: 'We plan for tired but sound.',
    consultationQuestion: 'What condition is the property actually in?',
  },
};

/**
 * Mode D is the one mode where asking budget directly is appropriate and
 * expected (§ 5.5). Everywhere else the planner's job is to tell the homeowner
 * the number, not ask for it.
 */
const D_CEILING: Screen = {
  id: 'budgetCeiling',
  question: 'What’s your budget ceiling?',
  kind: 'cards',
  field: 'budgetCeiling',
  choices: [
    { value: 'under-75k', label: 'Under $75,000' },
    { value: '75-150k', label: '$75,000 to $150,000' },
    { value: '150-300k', label: '$150,000 to $300,000' },
    { value: 'over-300k', label: 'Over $300,000' },
  ],
  notSure: {
    label: 'Depends on the return',
    appliesDefault: 'We rank scope by return rather than against a ceiling.',
    consultationQuestion: 'What investment level makes sense against your expected resale?',
  },
};

/* ------------------------------------------------------------------ *
 * Mode sequences
 * ------------------------------------------------------------------ */

export const MODE_SCREENS: Record<Mode, Screen[]> = {
  // Only pricing-relevant questions. Timeline, "why now", and lifestyle were
  // removed on purpose: they never move the number, and every extra screen is
  // friction between a homeowner and their range. Fewest questions, most
  // accurate range.
  A: [MODE_ROUTER, ADDRESS, PROPERTY_CONFIRM, SPACE, SCOPE_LEVEL, FINISH_TIER],
  B: [MODE_ROUTER, ADDRESS, PROPERTY_CONFIRM, ...FOOTPRINT_SCREENS, FINISH_TIER],
  C: [MODE_ROUTER, ADDRESS_BUILD, SITE, BUILD_SIZE, BUILD_CONTENTS, FINISH_TIER],
  D: [MODE_ROUTER, ADDRESS, PROPERTY_CONFIRM, D_GOAL, D_CONDITION, D_CEILING, SCOPE_LEVEL, FINISH_TIER],
};

/** § 5.1 rule 1: nine screens maximum before the contact gate. */
export const SCREEN_CEILING = 9;
