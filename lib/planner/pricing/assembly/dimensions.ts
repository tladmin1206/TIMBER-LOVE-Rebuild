import type { PlannerAnswers, PropertyFacts } from '../../types';

/**
 * Quantity takeoff for the assembly engine.
 *
 * The planner collects whole-home square footage, not room-level dimensions, so
 * the engine derives a defensible takeoff from project type + home size + finish
 * tier. Every field a template can multiply against lives here. When the flow
 * later collects a real measurement (e.g. kitchen sq ft), it overrides the
 * derived default via `answers`/`property` and the rest of the takeoff scales
 * with it. Derivations are calibrated so the assembled cost reconciles to the
 * leadership-approved band (see verify-assembly-reconcile).
 */
export interface Takeoff {
  /** Primary conditioned area the project touches (SF). */
  areaSqFt: number;
  /** Wall area receiving finish (paint/tile), derived from perimeter × height. */
  wallSqFt: number;
  /** Ceiling area (≈ floor area). */
  ceilingSqFt: number;
  /** Cabinetry run (LF). 0 when the room has no cabinetry. */
  cabinetLf: number;
  /** Countertop run (LF). */
  counterLf: number;
  /** Vanity run (LF, baths). */
  vanityLf: number;
  /** Backsplash / wet-wall tile area (SF). */
  tileSqFt: number;
  /** Interior trim run (LF) ≈ perimeter × trim courses. */
  trimLf: number;
  /** Count of plumbing fixtures (sinks, toilets, tubs, showers). */
  fixtureCount: number;
  /** Count of interior doors touched. */
  doorCount: number;
  /** Count of major appliances. */
  applianceCount: number;
  /** Whole home finished area (for whole-home / proportional planning costs). */
  homeSqFt: number;
  /** Estimated construction duration in months (drives MO line items). */
  durationMonths: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Perimeter of a roughly-square room of the given area. */
function perimeter(areaSqFt: number): number {
  const side = Math.sqrt(Math.max(areaSqFt, 1));
  return side * 4;
}

export function deriveTakeoff(answers: PlannerAnswers, property: PropertyFacts): Takeoff {
  const homeSqFt = property.finishedSqFt ?? answers.targetSqFt ?? 2200;
  const wallHeight = 9;

  switch (answers.projectType) {
    case 'kitchen': {
      // Typical Boise kitchen scales gently with home size, clamped to sane bounds.
      const areaSqFt = clamp(Math.round(homeSqFt * 0.09), 120, 320);
      const cabinetLf = clamp(Math.round(areaSqFt / 9.5), 16, 38);
      return {
        areaSqFt,
        wallSqFt: perimeter(areaSqFt) * wallHeight * 0.7, // 30% openings/cabinets
        ceilingSqFt: areaSqFt,
        cabinetLf,
        counterLf: Math.round(cabinetLf * 0.8),
        vanityLf: 0,
        tileSqFt: Math.round(cabinetLf * 4.5), // backsplash ≈ 4.5 SF per cabinet LF
        trimLf: Math.round(perimeter(areaSqFt) * 1.2),
        fixtureCount: 1, // kitchen sink (+ pot filler handled as fixture upgrade)
        doorCount: 1,
        applianceCount: 1, // one appliance *package* line item
        homeSqFt,
        durationMonths: 3,
      };
    }
    case 'bathroom':
    case 'bathroom-guest': {
      const guest = answers.projectType === 'bathroom-guest';
      const areaSqFt = guest ? 45 : clamp(Math.round(homeSqFt * 0.035), 60, 160);
      const vanityLf = guest ? 3 : clamp(Math.round(areaSqFt / 20), 4, 10);
      return {
        areaSqFt,
        wallSqFt: perimeter(areaSqFt) * wallHeight * 0.85,
        ceilingSqFt: areaSqFt,
        cabinetLf: 0,
        counterLf: vanityLf,
        vanityLf,
        tileSqFt: guest ? 60 : Math.round(areaSqFt * 2.2), // floor + wet walls
        trimLf: Math.round(perimeter(areaSqFt) * 1.1),
        fixtureCount: guest ? 3 : 4, // toilet, sink, tub/shower (+ separate shower in primary)
        doorCount: 1,
        applianceCount: 0,
        homeSqFt,
        durationMonths: guest ? 1.5 : 2,
      };
    }
    case 'whole-home': {
      const areaSqFt = homeSqFt;
      const cabinetLf = clamp(Math.round(areaSqFt / 90), 20, 70);
      return {
        areaSqFt,
        wallSqFt: areaSqFt * 2.8, // interior partitions + perimeter, both faces
        ceilingSqFt: areaSqFt,
        cabinetLf,
        counterLf: Math.round(cabinetLf * 0.8),
        vanityLf: clamp(Math.round(areaSqFt / 700), 6, 24),
        tileSqFt: Math.round(areaSqFt * 0.22),
        trimLf: Math.round(areaSqFt * 0.9),
        fixtureCount: clamp(Math.round(areaSqFt / 500), 4, 16),
        doorCount: clamp(Math.round(areaSqFt / 250), 6, 30),
        applianceCount: 1,
        homeSqFt,
        durationMonths: clamp(Math.round(areaSqFt / 350), 5, 12),
      };
    }
    case 'new-construction': {
      const areaSqFt = answers.targetSqFt ?? homeSqFt;
      const cabinetLf = clamp(Math.round(areaSqFt / 80), 24, 80);
      return {
        areaSqFt,
        wallSqFt: areaSqFt * 3.0,
        ceilingSqFt: areaSqFt,
        cabinetLf,
        counterLf: Math.round(cabinetLf * 0.8),
        vanityLf: clamp(Math.round(areaSqFt / 600), 8, 28),
        tileSqFt: Math.round(areaSqFt * 0.25),
        trimLf: Math.round(areaSqFt * 1.0),
        fixtureCount: clamp(Math.round(areaSqFt / 450), 5, 18),
        doorCount: clamp(Math.round(areaSqFt / 220), 8, 32),
        applianceCount: 1,
        homeSqFt: areaSqFt,
        durationMonths: clamp(Math.round(areaSqFt / 300), 10, 16),
      };
    }
  }
}
