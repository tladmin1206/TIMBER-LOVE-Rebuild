import ReviewSlider from '@/components/ui/ReviewSlider';
import { fanComments } from '@/lib/content/home';
import type { FanComment, Testimonial } from '@/lib/content/types';

type NotAssignable<A, B> = [A] extends [B] ? never : true;

const fanCommentIsNotAClientReview: NotAssignable<FanComment, Testimonial> = true;
const fanListIsNotAClientReviewList: NotAssignable<typeof fanComments, Testimonial[]> = true;

void fanCommentIsNotAClientReview;
void fanListIsNotAClientReviewList;

/** Kept so `tsc` fails if fan comments ever become assignable to ReviewSlider. */
export function fanCommentsCannotReachReviewSlider() {
  return (
    // @ts-expect-error Fan comments are not client reviews, so ReviewSlider must reject them.
    <ReviewSlider items={fanComments} />
  );
}
