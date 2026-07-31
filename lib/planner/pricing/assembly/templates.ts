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

export const TEMPLATES: Partial<Record<ProjectType, ScopeEntry[]>> = {
  kitchen: KITCHEN,
  // bathroom, bathroom-guest, whole-home, new-construction — next phase.
};

/** Material-cost multiplier by finish tier (labor/subs are tier-neutral). */
export const TIER_MATERIAL_FACTOR: Record<FinishTier, number> = {
  signature: 0.75,
  elevated: 1.0,
  bespoke: 1.7,
};
