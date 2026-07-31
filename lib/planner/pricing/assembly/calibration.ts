import type { ProjectType } from '../../types';

/**
 * Per-project-type calibration to REAL closed-project actuals
 * (memory/estimator-reference-pricing.md, verify-assembly-calibration).
 *
 * The catalog unit costs and quantity model produce a defensible line-item
 * build-up, but only project TOTALS are known from closed jobs, not per-trade
 * actuals. This factor is the standard historical-adjustment lever: it scales
 * the whole build-up for a type so its total matches what projects of that type
 * actually come in at, while preserving the relative per-trade proportions.
 *
 * 1.0 = catalog build-up as-is. Re-tune here as more jobs close.
 *
 * Tuned:
 *  - new-construction 0.78: Workland ($1.44M/3,200sf, bespoke) and Markowich
 *    ($531k/1,307sf, elevated) both ran +28% before this factor. Now within +2%.
 *  - whole-home: intentionally NOT calibrated to 750 N Locust ($290k/2,500sf =
 *    $116/sf, a lean gut). By direction, whole-home represents a FULLER
 *    renovation and keeps its raised band (~$213-320/sf at rebuild). Re-tune
 *    when 2-3 more representative whole-home closeouts are available.
 *  - kitchen / bathroom / guest-bath: no standalone real closeout totals exist;
 *    anchored to the leadership-approved bands (verify-assembly-reconcile).
 */
export const CALIBRATION_FACTOR: Partial<Record<ProjectType, number>> = {
  'new-construction': 0.78,
};

export function calibrationFactor(type: ProjectType): number {
  return CALIBRATION_FACTOR[type] ?? 1;
}
