/**
 * Shared content shapes.
 *
 * These live here rather than inside a component so content modules and the
 * components that render them can both depend on the type without content
 * importing from the view layer.
 */

/** A verified client review, as rendered by ReviewSlider and ReviewWall. */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};
