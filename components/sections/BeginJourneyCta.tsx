import Link from 'next/link';
import VideoBg from '@/components/ui/VideoBg';
import Reveal from '@/components/ui/Reveal';

/**
 * Shared pre-footer CTA. Uses descriptive wording (not a vague "Begin Your
 * Journey" / "Get Started") and routes to the contact hub so visitors can pick
 * the path closest to their goal.
 */
export default function BeginJourneyCta() {
  return (
    <section className="relative flex min-h-[52vh] items-center overflow-hidden">
      <VideoBg videoId="927976789" poster="/video-posters/927976789.jpg" overlay="bg-ink/70" />
      <div className="container-wide relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow">Not Sure Where to Start?</p>
          <h2 className="h-section mt-4">Tell Us About Your Home</h2>
          <p className="text-lead mt-4 max-w-md">
            Choose the option closest to your goal, or reach out and our team will point you in the right direction.
          </p>
        </Reveal>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href="/contact/" className="btn-primary">Contact Timber and Love</Link>
          <Link href="/design-and-build-questionnaire/" className="btn-secondary">Start a Project</Link>
        </div>
      </div>
    </section>
  );
}
