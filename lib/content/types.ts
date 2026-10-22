/**
 * Shared content shapes.
 *
 * These live here rather than inside a component so content modules and the
 * components that render them can both depend on the type without content
 * importing from the view layer.
 */

/**
 * A verified client review, as rendered by ReviewSlider and ReviewWall.
 * `kind` is a nominal tag. TypeScript is structural, so without it a fan
 * comment (same quote/name/role shape) could be passed to ReviewSlider.
 */
export type Testimonial = {
  kind: 'client';
  quote: string;
  name: string;
  role: string;
};

/**
 * A viewer comment about the Boise Boys shows. Deliberately NOT a Testimonial:
 * fan comments are never client reviews, never rendered by ReviewSlider or
 * ReviewWall, never placed on a design and build or other sales page, and
 * never emitted as Review schema (Hank ruling on ADA-NS-09, 2026-10-22).
 */
export type FanComment = {
  kind: 'fan';
  quote: string;
  name: string;
  role: 'Boise Boys Viewer';
};
