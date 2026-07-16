import Reveal from '@/components/ui/Reveal';

export default function CtaBand({
  eyebrow = 'Unique Design, Quality Service',
  title = 'Schedule a Discovery Call',
  body = 'Tell us about your project, discover our transparent design|build model, and let’s determine if we’re a good fit for each other.',
  image = '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg',
  primary,
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: string;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <Reveal className="container-tl text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-display mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-body">{body}</p>
        {(primary || secondary) && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {primary}
            {secondary}
          </div>
        )}
      </Reveal>
    </section>
  );
}
