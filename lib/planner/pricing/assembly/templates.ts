import type { FinishTier, ProjectType } from '../../types';
import type { Takeoff } from './dimensions';

/**
 * A scope entry = one logical piece of work, expressed as one or more catalog
 * codes (materials + labor are separate codes in the catalog) plus a quantity
 * function in that code's UOM.
 *
 * Templates express the REIMAGINE baseline scope. The engine's shared
 * scopeMultiplier scales it to refresh (×0.62) / rebuild (×1.42), exactly as
 * the segment-band basis does, so the two bases stay reconcilable and scope is
 * never double-counted. `tiers` limits an entry to specific finish tiers (e.g.
 * a custom vent hood only appears at elevated/bespoke).
 */
export interface ScopeEntry {
  key: string;
  /** Catalog codes this entry bills (M + L pairs, etc.). */
  codes: string[];
  /** Quantity in the code's UOM, from the takeoff. */
  qty: (t: Takeoff) => number;
  /** Restrict to these finish tiers. Default: all. */
  tiers?: FinishTier[];
  note?: string;
}

const ALL: FinishTier[] = ['signature', 'elevated', 'bespoke'];
const MID_UP: FinishTier[] = ['elevated', 'bespoke'];
const TOP: FinishTier[] = ['bespoke'];

/** Design-build team labor hours (PM, design, supervision) — the firm's own time. */
function teamHours(t: Takeoff, perSqFt: number): number {
  return Math.round(t.areaSqFt * perSqFt);
}

const KITCHEN: ScopeEntry[] = [
  // Demolition + protection
  { key: 'demo', codes: ['03-03-04'], qty: (t) => t.areaSqFt },
  { key: 'temp-protection', codes: ['03-02-04'], qty: (t) => t.areaSqFt * 1.5 },
  // Cabinetry + tops
  { key: 'cabinets', codes: ['03-17-01-M', '03-17-01-L'], qty: (t) => t.cabinetLf },
  { key: 'countertops', codes: ['03-17-02-M', '03-17-02-L'], qty: (t) => t.counterLf },
  { key: 'cabinet-hardware', codes: ['03-19-02-M', '03-19-02-L'], qty: (t) => t.cabinetLf },
  { key: 'island-builtins', codes: ['03-17-04-M', '03-17-04-L'], qty: (t) => Math.round(t.cabinetLf * 0.25), tiers: MID_UP },
  // Appliances + wet
  { key: 'appliances', codes: ['03-20-01-M', '03-20-01-L'], qty: () => 1 },
  { key: 'plumbing', codes: ['03-10-03-M', '03-10-03-L'], qty: (t) => t.areaSqFt },
  { key: 'vent-hood', codes: ['03-21-06-M', '03-21-06-L'], qty: () => 1, tiers: MID_UP },
  // Electrical + lighting
  { key: 'electrical', codes: ['03-09-04-M', '03-09-08-L'], qty: (t) => t.areaSqFt },
  { key: 'decorative-lighting', codes: ['03-09-06-M'], qty: (t) => t.areaSqFt, tiers: MID_UP },
  // Surfaces — signature uses LVP, elevated/bespoke step up to hardwood
  { key: 'flooring-lvp', codes: ['03-15-02-M', '03-15-02-L'], qty: (t) => t.areaSqFt, tiers: ['signature'] },
  { key: 'flooring-hardwood', codes: ['03-15-01-M', '03-15-01-L'], qty: (t) => t.areaSqFt, tiers: MID_UP },
  { key: 'backsplash-tile', codes: ['03-16-01-M', '03-16-01-L'], qty: (t) => t.tileSqFt },
  { key: 'drywall-patch', codes: ['03-13-01-M', '03-13-01-L'], qty: (t) => t.wallSqFt * 0.35 },
  { key: 'paint', codes: ['03-14-01-M', '03-14-01-L'], qty: (t) => t.wallSqFt + t.ceilingSqFt },
  { key: 'trim', codes: ['03-18-02-M', '03-18-02-L'], qty: (t) => t.trimLf },
  { key: 'interior-door', codes: ['03-18-01-M', '03-18-01-L'], qty: (t) => t.doorCount },
  { key: 'feature-wall', codes: ['03-18-04-M', '03-18-04-L'], qty: (t) => Math.min(t.wallSqFt * 0.2, 60), tiers: TOP },
  // Site support (duration-driven)
  { key: 'dumpster', codes: ['03-02-06'], qty: (t) => t.durationMonths },
  { key: 'daily-clean', codes: ['03-02-07'], qty: (t) => t.durationMonths },
  { key: 'fit-finish', codes: ['03-23-01-M', '03-23-01-L'], qty: (t) => t.areaSqFt },
  { key: 'final-clean', codes: ['03-23-02'], qty: (t) => t.areaSqFt },
  // Plan / design / admin (permits + drawings scoped to the room)
  { key: 'permits', codes: ['03-01-01'], qty: () => 1 },
  { key: 'as-builts', codes: ['01-00-05'], qty: (t) => t.areaSqFt },
  { key: 'architecture-dd', codes: ['02-00-01'], qty: (t) => t.areaSqFt },
  // Design-build team time (the firm's own labor — PM, design, supervision)
  { key: 'team-labor', codes: ['L-03-00'], qty: (t) => teamHours(t, 0.3) },
];

const BATH: ScopeEntry[] = [
  { key: 'demo', codes: ['03-03-04'], qty: (t) => t.areaSqFt },
  { key: 'temp-protection', codes: ['03-02-04'], qty: (t) => t.areaSqFt * 1.5 },
  // Vanity + top
  { key: 'vanity', codes: ['03-17-03-M', '03-17-03-L'], qty: (t) => t.vanityLf },
  { key: 'vanity-top', codes: ['03-17-02-M', '03-17-02-L'], qty: (t) => t.vanityLf },
  // Plumbing (fixture-dense: rough + set toilet/sink/tub/shower)
  { key: 'plumbing', codes: ['03-10-03-M', '03-10-03-L'], qty: (t) => t.fixtureCount * 42 },
  { key: 'water-heater', codes: ['03-10-01'], qty: () => 1, tiers: MID_UP },
  // Wet surfaces
  { key: 'tile', codes: ['03-16-01-M', '03-16-01-L'], qty: (t) => t.tileSqFt },
  { key: 'waterproofing', codes: ['03-04-04'], qty: (t) => t.tileSqFt * 0.5 },
  { key: 'shower-glass', codes: ['03-19-06-M', '03-19-06-L'], qty: () => 1, tiers: MID_UP },
  { key: 'radiant-floor', codes: ['03-09-02'], qty: () => 1, tiers: TOP },
  // Fixtures + finish hardware
  { key: 'bath-hardware', codes: ['03-19-01-M', '03-19-01-L'], qty: (t) => t.fixtureCount },
  { key: 'mirror', codes: ['03-19-07-M', '03-19-07-L'], qty: () => 1 },
  // Electrical + ventilation
  { key: 'electrical', codes: ['03-09-04-M', '03-09-08-L'], qty: (t) => t.areaSqFt },
  { key: 'decorative-lighting', codes: ['03-09-06-M'], qty: (t) => t.areaSqFt, tiers: MID_UP },
  { key: 'exhaust', codes: ['03-08-02'], qty: () => 1 },
  // Non-wet surfaces
  { key: 'drywall-patch', codes: ['03-13-01-M', '03-13-01-L'], qty: (t) => t.wallSqFt * 0.5 },
  { key: 'paint', codes: ['03-14-01-M', '03-14-01-L'], qty: (t) => t.wallSqFt * 0.5 + t.ceilingSqFt },
  { key: 'trim', codes: ['03-18-02-M', '03-18-02-L'], qty: (t) => t.trimLf },
  { key: 'interior-door', codes: ['03-18-01-M', '03-18-01-L'], qty: () => 1 },
  // Site support
  { key: 'dumpster', codes: ['03-02-06'], qty: (t) => t.durationMonths },
  { key: 'daily-clean', codes: ['03-02-07'], qty: (t) => t.durationMonths },
  { key: 'fit-finish', codes: ['03-23-01-M', '03-23-01-L'], qty: (t) => t.areaSqFt },
  { key: 'final-clean', codes: ['03-23-02'], qty: (t) => t.areaSqFt },
  // Plan / design / admin (bath permit is a fraction of a whole-project permit)
  { key: 'permits', codes: ['03-01-01'], qty: () => 0.35 },
  { key: 'as-builts', codes: ['01-00-05'], qty: (t) => t.areaSqFt },
  { key: 'architecture-dd', codes: ['02-00-01'], qty: (t) => t.areaSqFt },
  { key: 'team-labor', codes: ['L-03-00'], qty: (t) => teamHours(t, 0.42) },
];

// Whole-home REIMAGINE = a FULL renovation of the house: surfaces, kitchen +
// baths, lighting, flooring, and substantial MEP (mechanical replacement at
// elevated/bespoke). Priced from the line-item build-up; band raised to match
// (see ruleset WHOLE_HOME).
const WHOLE_HOME: ScopeEntry[] = [
  { key: 'demo', codes: ['03-03-04'], qty: (t) => t.areaSqFt * 0.6 },
  { key: 'temp-protection', codes: ['03-02-04'], qty: (t) => t.areaSqFt * 0.5 },
  { key: 'framing', codes: ['03-05-02-M', '03-05-02-L'], qty: (t) => t.areaSqFt * 0.15 },
  { key: 'insulation', codes: ['03-12-01-M', '03-12-01-L'], qty: (t) => t.areaSqFt * 0.25 },
  { key: 'drywall', codes: ['03-13-01-M', '03-13-01-L'], qty: (t) => t.wallSqFt * 0.42 },
  // Mechanical replacement only at the top tier; otherwise existing systems stay
  { key: 'hvac', codes: ['03-08-01'], qty: () => 1, tiers: MID_UP },
  { key: 'electrical', codes: ['03-09-04-M', '03-09-08-L'], qty: (t) => t.areaSqFt * 0.7 },
  { key: 'decorative-lighting', codes: ['03-09-06-M'], qty: (t) => t.areaSqFt * 0.5, tiers: MID_UP },
  { key: 'plumbing', codes: ['03-10-03-M', '03-10-03-L'], qty: (t) => t.areaSqFt * 0.55 },
  { key: 'water-heater', codes: ['03-10-01'], qty: () => 1, tiers: MID_UP },
  // Kitchen + baths within the home
  { key: 'cabinets', codes: ['03-17-01-M', '03-17-01-L'], qty: (t) => t.cabinetLf },
  { key: 'countertops', codes: ['03-17-02-M', '03-17-02-L'], qty: (t) => t.counterLf },
  { key: 'cabinet-hardware', codes: ['03-19-02-M', '03-19-02-L'], qty: (t) => t.cabinetLf },
  { key: 'vanities', codes: ['03-17-03-M', '03-17-03-L'], qty: (t) => t.vanityLf },
  { key: 'appliances', codes: ['03-20-01-M', '03-20-01-L'], qty: () => 1 },
  { key: 'vent-hood', codes: ['03-21-06-M', '03-21-06-L'], qty: () => 1, tiers: TOP },
  { key: 'shower-glass', codes: ['03-19-06-M', '03-19-06-L'], qty: (t) => Math.max(1, Math.round(t.fixtureCount / 5)), tiers: MID_UP },
  // Surfaces throughout
  { key: 'flooring', codes: ['03-15-01-M', '03-15-01-L'], qty: (t) => t.areaSqFt * 0.6 },
  { key: 'flooring-tile', codes: ['03-16-01-M', '03-16-01-L'], qty: (t) => t.tileSqFt * 0.6 },
  { key: 'paint', codes: ['03-14-01-M', '03-14-01-L'], qty: (t) => t.wallSqFt + t.ceilingSqFt },
  { key: 'trim', codes: ['03-18-02-M', '03-18-02-L'], qty: (t) => t.trimLf * 0.9 },
  { key: 'interior-doors', codes: ['03-18-01-M', '03-18-01-L'], qty: (t) => Math.round(t.doorCount * 0.75) },
  { key: 'door-hardware', codes: ['03-19-04-M', '03-19-04-L'], qty: (t) => t.doorCount },
  { key: 'stair-railings', codes: ['03-21-01-M', '03-21-01-L'], qty: (t) => Math.round(t.areaSqFt / 200), tiers: TOP },
  { key: 'feature-wall', codes: ['03-18-04-M', '03-18-04-L'], qty: (t) => Math.min(t.wallSqFt * 0.05, 120), tiers: TOP },
  // Site support
  { key: 'dumpster', codes: ['03-02-06'], qty: (t) => t.durationMonths },
  { key: 'daily-clean', codes: ['03-02-07'], qty: (t) => t.durationMonths },
  { key: 'fit-finish', codes: ['03-23-01-M', '03-23-01-L'], qty: (t) => t.areaSqFt },
  { key: 'final-clean', codes: ['03-23-02'], qty: (t) => t.areaSqFt },
  // Plan / design / admin
  { key: 'permits', codes: ['03-01-01'], qty: () => 1 },
  { key: 'as-builts', codes: ['01-00-05'], qty: (t) => t.areaSqFt },
  { key: 'architecture-dd', codes: ['02-00-01'], qty: (t) => t.areaSqFt },
  { key: 'team-labor', codes: ['L-03-00'], qty: (t) => teamHours(t, 0.2) },
];

const NEW_CONSTRUCTION: ScopeEntry[] = [
  // Site + foundation
  { key: 'grading', codes: ['03-03-05'], qty: (t) => t.areaSqFt * 1.4 },
  { key: 'excavation', codes: ['03-04-01'], qty: (t) => t.areaSqFt },
  { key: 'footings', codes: ['03-04-02'], qty: (t) => Math.round(Math.sqrt(t.areaSqFt) * 4.2) },
  { key: 'slab', codes: ['03-04-03'], qty: (t) => t.areaSqFt / (t.homeSqFt > 3200 ? 2 : 1.5) },
  { key: 'waterproofing', codes: ['03-04-04'], qty: (t) => t.areaSqFt * 0.4 },
  // Shell
  { key: 'framing', codes: ['03-05-02-M', '03-05-02-L'], qty: (t) => t.areaSqFt },
  { key: 'trusses', codes: ['03-05-03-M', '03-05-03-L'], qty: (t) => t.areaSqFt / (t.homeSqFt > 3200 ? 2 : 1.5) },
  { key: 'house-wrap', codes: ['03-06-01-M', '03-06-01-L'], qty: (t) => t.wallSqFt },
  { key: 'windows', codes: ['03-07-03-M', '03-07-03-L'], qty: (t) => t.areaSqFt * 0.16 },
  { key: 'exterior-doors', codes: ['03-07-02-M', '03-07-02-L'], qty: (t) => Math.max(2, Math.round(t.areaSqFt / 1500)) },
  { key: 'roofing', codes: ['03-11-01-M', '03-11-01-L'], qty: (t) => t.areaSqFt / (t.homeSqFt > 3200 ? 2 : 1.5) * 1.15 },
  { key: 'gutters', codes: ['03-11-03'], qty: (t) => Math.round(Math.sqrt(t.areaSqFt) * 4) },
  { key: 'siding', codes: ['03-11-06-M', '03-11-06-L'], qty: (t) => t.wallSqFt * 0.8 },
  { key: 'exterior-stone', codes: ['03-11-07-M', '03-11-07-L'], qty: (t) => t.wallSqFt * 0.15, tiers: MID_UP },
  // MEP
  { key: 'hvac', codes: ['03-08-01'], qty: (t) => Math.max(1, Math.round(t.areaSqFt / 2600)) },
  { key: 'electrical', codes: ['03-09-04-M', '03-09-08-L'], qty: (t) => t.areaSqFt },
  { key: 'decorative-lighting', codes: ['03-09-06-M'], qty: (t) => t.areaSqFt, tiers: MID_UP },
  { key: 'data-cabling', codes: ['03-09-01'], qty: (t) => t.areaSqFt },
  { key: 'plumbing', codes: ['03-10-03-M', '03-10-03-L'], qty: (t) => t.areaSqFt },
  { key: 'water-heater', codes: ['03-10-01'], qty: (t) => Math.max(1, Math.round(t.areaSqFt / 3500)) },
  // Insulation + interior shell
  { key: 'insulation', codes: ['03-12-01-M', '03-12-01-L'], qty: (t) => t.areaSqFt * 1.6 },
  { key: 'drywall', codes: ['03-13-01-M', '03-13-01-L'], qty: (t) => t.wallSqFt },
  // Kitchen + baths + millwork
  { key: 'cabinets', codes: ['03-17-01-M', '03-17-01-L'], qty: (t) => t.cabinetLf },
  { key: 'countertops', codes: ['03-17-02-M', '03-17-02-L'], qty: (t) => t.counterLf },
  { key: 'cabinet-hardware', codes: ['03-19-02-M', '03-19-02-L'], qty: (t) => t.cabinetLf },
  { key: 'vanities', codes: ['03-17-03-M', '03-17-03-L'], qty: (t) => t.vanityLf },
  { key: 'built-ins', codes: ['03-17-04-M', '03-17-04-L'], qty: (t) => Math.round(t.cabinetLf * 0.3), tiers: MID_UP },
  { key: 'appliances', codes: ['03-20-01-M', '03-20-01-L'], qty: () => 1 },
  { key: 'vent-hood', codes: ['03-21-06-M', '03-21-06-L'], qty: () => 1, tiers: MID_UP },
  { key: 'shower-glass', codes: ['03-19-06-M', '03-19-06-L'], qty: (t) => Math.max(1, Math.round(t.fixtureCount / 4)) },
  // Finishes
  { key: 'flooring', codes: ['03-15-01-M', '03-15-01-L'], qty: (t) => t.areaSqFt * 0.7 },
  { key: 'flooring-tile', codes: ['03-16-01-M', '03-16-01-L'], qty: (t) => t.tileSqFt },
  { key: 'paint', codes: ['03-14-01-M', '03-14-01-L'], qty: (t) => t.wallSqFt + t.ceilingSqFt },
  { key: 'exterior-paint', codes: ['03-14-02-M', '03-14-02-L'], qty: (t) => t.wallSqFt * 0.8 },
  { key: 'trim', codes: ['03-18-02-M', '03-18-02-L'], qty: (t) => t.trimLf },
  { key: 'interior-doors', codes: ['03-18-01-M', '03-18-01-L'], qty: (t) => t.doorCount },
  { key: 'door-hardware', codes: ['03-19-04-M', '03-19-04-L'], qty: (t) => t.doorCount },
  { key: 'stairs', codes: ['03-21-03-M', '03-21-03-L'], qty: (t) => (t.homeSqFt > 3200 ? 1 : 0) },
  { key: 'railings', codes: ['03-21-01-M', '03-21-01-L'], qty: (t) => Math.round(t.areaSqFt / 150) },
  { key: 'fireplace', codes: ['03-21-05-M', '03-21-05-L'], qty: () => 1, tiers: MID_UP },
  // Site support + landscape base
  { key: 'temp-utilities', codes: ['03-02-01'], qty: (t) => t.durationMonths },
  { key: 'dumpster', codes: ['03-02-06'], qty: (t) => t.durationMonths },
  { key: 'daily-clean', codes: ['03-02-07'], qty: (t) => t.durationMonths },
  { key: 'flatwork', codes: ['03-22-01-M', '03-22-01-L'], qty: (t) => t.areaSqFt * 0.15 },
  { key: 'sod', codes: ['03-22-08-M', '03-22-08-L'], qty: (t) => t.areaSqFt * 0.6 },
  { key: 'fit-finish', codes: ['03-23-01-M', '03-23-01-L'], qty: (t) => t.areaSqFt },
  { key: 'final-clean', codes: ['03-23-02'], qty: (t) => t.areaSqFt },
  // Plan / design / admin
  { key: 'permits', codes: ['03-01-01'], qty: () => 1 },
  { key: 'insurance', codes: ['03-01-02'], qty: (t) => t.durationMonths },
  { key: 'as-builts', codes: ['01-00-05'], qty: (t) => t.areaSqFt },
  { key: 'architecture', codes: ['02-00-01'], qty: (t) => t.areaSqFt },
  { key: 'schematic-mep', codes: ['02-00-02'], qty: () => 1 },
  { key: 'engineering', codes: ['02-00-03'], qty: (t) => Math.round(t.areaSqFt / 60) },
  { key: 'team-labor', codes: ['L-03-00'], qty: (t) => teamHours(t, 0.34) },
];

export const TEMPLATES: Partial<Record<ProjectType, ScopeEntry[]>> = {
  kitchen: KITCHEN,
  bathroom: BATH,
  'bathroom-guest': BATH,
  'whole-home': WHOLE_HOME,
  'new-construction': NEW_CONSTRUCTION,
};

/**
 * Finish-tier multiplier. The catalog "Average Cost" is the ELEVATED (mid) tier,
 * so elevated = 1.0 (catalog as-is) and the other tiers are calculated from it.
 * It scales the QUALITY-DRIVEN costs — materials, subcontractors, fixtures and
 * equipment — because a bespoke project buys pricier finishes, fixtures and
 * trade packages. Pure install LABOR stays tier-neutral (a carpenter's rate is
 * the same regardless of the cabinet grade). Larger tier spread on top of this
 * comes from tier-gated scope (islands, custom hoods, feature walls, etc.).
 */
export const TIER_QUALITY_FACTOR: Record<FinishTier, number> = {
  signature: 0.74,
  elevated: 1.0,
  bespoke: 1.55,
};
