import VideoBg from '@/components/ui/VideoBg';
import Reveal from '@/components/ui/Reveal';
import ModalButton from '@/components/ui/ModalButton';

/** Shared pre-footer "Begin Your Journey" full-bleed video CTA (appears on every page in the original). */
export default function BeginJourneyCta() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      <VideoBg videoId="927976789" poster="/video-posters/927976789.jpg" overlay="bg-ink/55" />
      <div className="container-wide relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow">Let&apos;s Work Together</p>
          <h2 className="h-display mt-4 text-5xl sm:text-7xl">Begin Your Journey Here</h2>
        </Reveal>
        <div className="lg:text-right">
          <ModalButton modal="connect" className="btn-outline">Get Started</ModalButton>
        </div>
      </div>
    </section>
  );
}
