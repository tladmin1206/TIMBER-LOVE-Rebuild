import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import Estimator from '@/components/estimator/Estimator';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Design + Build Project Estimator',
  description:
    'Answer a few questions to see a preliminary investment range for your Boise design and build project. Not a quote, just a helpful starting point.',
  path: '/estimate/',
  image: '/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Design + Build"
        title="Estimate Your Project"
        subtitle="Answer a few questions to see a preliminary investment range before you submit a full project inquiry. It takes a couple of minutes and needs no construction knowledge."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg"
        height="short"
      />
      <TrustBar />
      <section className="bg-bg-primary section-tight">
        <div className="container-tl">
          <Estimator />
        </div>
      </section>

      <ClosingCta {...closingCta.estimate} />
    </>
  );
}
