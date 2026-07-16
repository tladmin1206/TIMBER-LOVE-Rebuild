/**
 * Estimator pricing configuration.
 *
 * ⚠️ TEMP — PLACEHOLDER PRICING, REQUIRES BUSINESS APPROVAL BEFORE PUBLIC LAUNCH.
 * Every number below is an unconfirmed placeholder used only to build and prove
 * the estimator framework. Nothing here is a bid, quote, or approved figure.
 * Set `PRICING_APPROVED = true` ONLY after the business signs off on the real
 * numbers; until then the UI labels all results as unconfirmed placeholders.
 *
 * The engine is fully data-driven: authorized staff can later edit these values
 * (or move them to a database / admin panel) without touching the interface.
 */

export const PRICING_APPROVED = false;

// Currency ranges are expressed in whole US dollars.
export type Range = { low: number; high: number };

export type ProjectCategory =
  | 'whole-home-remodel'
  | 'kitchen-living-remodel'
  | 'primary-suite-remodel'
  | 'addition'
  | 'custom-home'
  | 'new-construction'
  | 'not-sure';

export type FinishLevel = 'thoughtful-essentials' | 'elevated' | 'premium-custom' | 'architectural-statement';

export type SizeBand = 'under-500' | '500-1000' | '1001-2000' | '2001-3000' | 'over-3000' | 'not-sure';

/** Categories the business currently accepts. `not-sure` routes to guidance. */
export const projectCategories: { key: ProjectCategory; label: string; kind: 'remodel' | 'build' | 'unknown' }[] = [
  { key: 'whole-home-remodel', label: 'Whole-home remodel', kind: 'remodel' },
  { key: 'kitchen-living-remodel', label: 'Kitchen or main living areas', kind: 'remodel' },
  { key: 'primary-suite-remodel', label: 'Primary suite remodel', kind: 'remodel' },
  { key: 'addition', label: 'Home addition', kind: 'remodel' },
  { key: 'custom-home', label: 'New custom home', kind: 'build' },
  { key: 'new-construction', label: 'New construction', kind: 'build' },
  { key: 'not-sure', label: 'Not sure yet', kind: 'unknown' },
];

export const finishLevels: { key: FinishLevel; label: string; blurb: string }[] = [
  { key: 'thoughtful-essentials', label: 'Thoughtful Essentials', blurb: 'Quality, durable materials with a controlled selection range and limited custom detailing.' },
  { key: 'elevated', label: 'Elevated', blurb: 'Higher-grade cabinetry, fixtures, surfaces, lighting, and more design flexibility.' },
  { key: 'premium-custom', label: 'Premium Custom', blurb: 'Custom cabinetry, specialty materials, detailed millwork, premium fixtures, and highly personalized design.' },
  { key: 'architectural-statement', label: 'Architectural Statement', blurb: 'One-of-a-kind detailing, specialty fabrication, luxury materials, advanced systems, and extensive customization.' },
];

export const sizeBands: { key: SizeBand; label: string; midSqft: number | null }[] = [
  { key: 'under-500', label: 'Under 500 sq ft', midSqft: 400 },
  { key: '500-1000', label: '500 to 1,000 sq ft', midSqft: 750 },
  { key: '1001-2000', label: '1,001 to 2,000 sq ft', midSqft: 1500 },
  { key: '2001-3000', label: '2,001 to 3,000 sq ft', midSqft: 2500 },
  { key: 'over-3000', label: 'More than 3,000 sq ft', midSqft: 3500 },
  { key: 'not-sure', label: 'Not sure', midSqft: null },
];

/**
 * TEMP placeholder cost-per-square-foot ranges by category. These drive the
 * base range together with the selected size band. Confirm with the business.
 */
export const costPerSqft: Record<ProjectCategory, Range> = {
  'whole-home-remodel': { low: 200, high: 425 },
  'kitchen-living-remodel': { low: 250, high: 550 },
  'primary-suite-remodel': { low: 200, high: 450 },
  addition: { low: 300, high: 600 },
  'custom-home': { low: 350, high: 700 },
  'new-construction': { low: 300, high: 600 },
  'not-sure': { low: 200, high: 550 },
};

/** Finish-level multipliers applied to the base range. TEMP. */
export const finishMultiplier: Record<FinishLevel, number> = {
  'thoughtful-essentials': 0.9,
  elevated: 1.0,
  'premium-custom': 1.25,
  'architectural-statement': 1.55,
};

/**
 * Scope-item allowances (flat additions, TEMP). Keyed by the scope option value
 * shown in the wizard. Absent keys contribute nothing.
 */
export const scopeAllowance: Record<string, Range> = {
  'structural-changes': { low: 15000, high: 60000 },
  'wall-removal': { low: 6000, high: 25000 },
  'kitchen-relocation': { low: 10000, high: 35000 },
  'bathroom-relocation': { low: 8000, high: 28000 },
  'new-cabinetry': { low: 12000, high: 45000 },
  'new-countertops': { low: 4000, high: 18000 },
  'electrical-updates': { low: 5000, high: 22000 },
  'plumbing-updates': { low: 5000, high: 24000 },
  'hvac-changes': { low: 8000, high: 30000 },
  'windows-doors': { low: 8000, high: 40000 },
  roofing: { low: 10000, high: 35000 },
  'exterior-changes': { low: 10000, high: 50000 },
  'custom-millwork': { low: 8000, high: 40000 },
  fireplace: { low: 4000, high: 20000 },
  'lighting-design': { low: 4000, high: 18000 },
  'outdoor-living': { low: 12000, high: 60000 },
  landscaping: { low: 8000, high: 45000 },
  'pool-spa': { low: 45000, high: 150000 },
  'smart-home': { low: 5000, high: 30000 },
  'energy-efficiency': { low: 6000, high: 30000 },
};

/** Design & professional-service allowances (flat additions, TEMP). */
export const serviceAllowance: Record<string, Range> = {
  'architectural-design': { low: 8000, high: 45000 },
  'interior-design': { low: 6000, high: 35000 },
  'space-planning': { low: 3000, high: 15000 },
  'permit-coordination': { low: 2000, high: 12000 },
  'engineering-coordination': { low: 4000, high: 20000 },
};

/**
 * Multiplicative adjustments for existing conditions / complexity / access.
 * Applied to the running range. TEMP.
 */
export const conditionMultiplier: Record<string, number> = {
  'structural-concerns': 1.12,
  'water-damage': 1.08,
  'electrical-panel': 1.05,
  'plumbing-replacement': 1.07,
  'foundation-concerns': 1.15,
  'asbestos-lead': 1.1,
  'historic-home': 1.12,
  'difficult-access': 1.08,
  'steep-lot': 1.1,
  occupied: 1.05,
};

/** Contingency band added on top of the adjusted range. TEMP. */
export const CONTINGENCY = { low: 0.08, high: 0.15 };

/** Minimum project thresholds by category (floor for the low end). TEMP. */
export const minimumProject: Partial<Record<ProjectCategory, number>> = {
  'whole-home-remodel': 120000,
  'kitchen-living-remodel': 45000,
  'primary-suite-remodel': 40000,
  addition: 90000,
  'custom-home': 600000,
  'new-construction': 450000,
};

/** Safeguard: never present a high end beyond this absolute ceiling. TEMP. */
export const MAX_RANGE_CEILING = 6000000;

/**
 * Approved service area (ZIP prefixes / cities). Outside these, the estimator
 * responds respectfully and offers a general inquiry. TEMP: confirm real area.
 */
export const serviceArea = {
  // Treasure Valley ZIP prefixes (Boise / Meridian / Eagle / Nampa / etc.).
  zipPrefixes: ['836', '837'],
  cities: ['boise', 'meridian', 'eagle', 'nampa', 'caldwell', 'kuna', 'star', 'garden city', 'middleton'],
};

/** Approved investment/comfort ranges shown in the wizard (labels only). TEMP. */
export const investmentRanges = [
  'Under $75,000',
  '$75,000 to $150,000',
  '$150,000 to $300,000',
  '$300,000 to $600,000',
  '$600,000 to $1,000,000',
  'More than $1,000,000',
  'Prefer not to say',
  'I need help understanding what is realistic',
];
