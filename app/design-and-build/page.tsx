import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import Gallery from '@/components/ui/Gallery';
import VideoBg from '@/components/ui/VideoBg';
import ReviewWall from '@/components/sections/ReviewWall';
import FAQ from '@/components/ui/FAQ';
import PressStrip from '@/components/sections/PressStrip';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import { pageMeta } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { clientReviews } from '@/lib/content/home';
import data from '@/content/design-and-build.json';
import faq from '@/content/design-and-build-faq.json';
import TrustBar from '@/components/sections/TrustBar';

// Accurate, consolidated design + build categories. The prior content pulled
// mismatched descriptions from the extracted WordPress copy (e.g. "New Builds"
// described as "Strategic layout designs"); these descriptions match their
// headings. Developer/commercial work (subdivisions, multifamily) is handled as
// a separate Development track, not a consumer-facing remodel category.
const serviceCategories = [
  { heading: 'Whole-Home Remodels', body: 'Comprehensive renovations that rework layout, systems, and finishes across an entire home.' },
  { heading: 'Kitchens & Living Spaces', body: 'Focused remodels of the rooms where daily life happens, from kitchens to primary living areas.' },
  { heading: 'Home Additions', body: 'Thoughtfully integrated additions that expand living space while matching your home’s existing character.' },
  { heading: 'Custom Homes', body: 'One-of-a-kind new homes designed and built from the ground up around how you live.' },
  { heading: 'New Construction', body: 'Ground-up residential construction with design and build coordinated under one in-house team.' },
  { heading: 'Historic Restorations', body: 'Careful updates to older Boise homes that preserve original character while modernizing for daily life.' },
];

const processPhases = [
  {
    num: '01',
    title: 'Concept Development',
    videoId: '966721424',
    poster: '/video-posters/966721424.jpg',
    body: 'We begin by fully understanding your needs and your home’s current layout. Our architect drafts detailed as-builts to set the groundwork for modifications. We conduct thorough inspections for safety and compliance, and gather crucial information, assessing your investment and relevant city codes to prepare effectively for your project.',
  },
  {
    num: '02',
    title: 'Design + Construction Development',
    videoId: '966728565',
    poster: '/video-posters/966728565.jpg',
    body: 'Our team fine-tunes architectural plans to match construction standards. Luke and his team select materials and fixtures that combine beauty and functionality. In a ‘Design First Look’ presentation, you’ll review and approve these selections with Luke, making sure they align perfectly with your vision before moving forward.',
  },
  {
    num: '03',
    title: 'Design + Construction Execution',
    videoId: '966901133',
    poster: '/video-posters/966901133.jpg',
    body: 'We submit the plans to permitting to secure all necessary construction approvals, and strategically source and procure materials, focusing on cost-effective options. Our team strictly oversees construction, ensuring subcontractors meet deadlines while also conducting thorough quality checks to address any issues and guarantee successful project completion.',
  },
];

export const metadata = pageMeta({
  title: 'Design + Build',
  description:
    'Explore our comprehensive design + build services that redefine spaces and reflect unique style and personality.',
  path: '/design-and-build/',
  image:
    '/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg',
});

type Section = { heading?: string; paragraphs?: string[]; image?: string };

// Pick named sections out of the extracted content, de-duplicating by heading
// (Elementor renders separate desktop/mobile copies of some blocks).
function pick(headings: string[]): Section[] {
  const all = (data.sections as Section[]).filter((s) => s.heading && headings.includes(s.heading.trim()));
  const seen = new Set<string>();
  return all.filter((s) => {
    const k = s.heading!.trim();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const intro = (data.sections as Section[])[0]?.paragraphs?.[0] || '';
const differentiators = pick(['In-House Team', 'Streamlined Processes', 'Personalized Service']);
const values = pick(['Integrity', 'Quality', 'Community', 'CLIENT-FOCUSED']);
const galleryImgs = (data.gallery as string[]).map((src, i) => ({ src, alt: `Timber and Love design and build project ${i + 1}` }));

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: 'Design + Build',
            description: 'Custom homes, additions, and whole-home renovations from one connected in-house design and construction team in Boise.',
            path: '/design-and-build/',
            serviceType: 'Design-build residential construction',
          }),
          faqSchema(faq as { q: string; a: string }[]),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Design + Build', path: '/design-and-build/' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Design | Build"
        title="Timber and Love Design + Build"
        subtitle={intro}
        videoId="928472719"
        image="/video-posters/928472719.jpg"
      >
        <Link href="/design-and-build-questionnaire/" className="btn-primary">Start Your Project</Link>
        <Link href="/timber-and-love-gallery/" className="btn-secondary">View Design + Build Projects</Link>
      </PageHero>

      <TrustBar />

      <PressStrip />

      {/* Estimator promo */}
      <section className="border-y border-border-subtle bg-bg-secondary section-tight">
        <div className="container-wide grid gap-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Explore Your Investment Range</p>
            <h2 className="h-section mt-3">See a Preliminary Estimate</h2>
            <p className="text-lead mt-4">
              Answer a few quick questions to see a realistic investment range for your project before you reach out. It
              is a helpful starting point, not a formal quote.
            </p>
          </Reveal>
          <div className="lg:text-right">
            <Link href="/estimate/" className="btn-primary" data-track="dbpage_estimator">Estimate Your Project</Link>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Timber and Love</p>
            <h2 className="h-section mt-4">One Team, From Concept to Completion</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {differentiators.map((s, i) => (
              <Reveal key={s.heading} delay={i * 90} className="surface-card p-8">
                <h3 className="h-card">{s.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-body">{s.paragraphs?.[0]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services we offer */}
      <section className="border-t border-border-subtle bg-surface section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What We Build</p>
            <h2 className="h-section mt-4">Design + Build Services</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((s, i) => (
              <Reveal key={s.heading} delay={i * 70} className="surface-card p-7">
                <div className="font-sans text-4xl tracking-brand text-accent/70">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="h-card-sm mt-4">{s.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{s.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-sm text-text-muted">
            Working on a subdivision, multifamily, or other development project?{' '}
            <Link href="/contact/" className="text-cream link-underline">Contact our team about development work</Link>.
          </p>
        </div>
      </section>

      {/* Process — 3 phases over background videos */}
      <section className="bg-bg-primary pt-20 text-center sm:pt-28">
        <div className="container-wide max-w-2xl">
          <Reveal>
            <p className="eyebrow">Our Design + Build Process</p>
            <h2 className="h-section mt-4">How We Work</h2>
            <p className="mt-6">
              <Link href="/our-process/" className="text-sm uppercase tracking-[0.16em] text-cream link-underline">See the Full Step-by-Step Process →</Link>
            </p>
          </Reveal>
        </div>
      </section>
      {processPhases.map((p, i) => (
        <section key={p.num} className="relative flex min-h-[60vh] items-center overflow-hidden">
          <VideoBg videoId={p.videoId} poster={p.poster} overlay="bg-ink/70" />
          <div className="container-wide relative z-10">
            <Reveal className="max-w-xl">
              <div className="font-sans text-5xl tracking-brand text-accent/70">{p.num}</div>
              <h3 className="h-section mt-4">{p.title}</h3>
              <p className="mt-5 text-body">{p.body}</p>
              {i === processPhases.length - 1 && (
                <Link href="/design-and-build-questionnaire/" className="btn-secondary mt-8">Start the Questionnaire</Link>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      {/* Values — full-bleed video background + left header + grid */}
      <section className="relative overflow-hidden section-feature">
        <VideoBg videoId="967110133" poster="/video-posters/967110133.jpg" overlay="bg-ink/75" />
        <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">What Drives Us</p>
            <h2 className="h-section mt-4">Our Values</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((s, i) => (
              <Reveal key={s.heading} delay={i * 80} className="surface-card-glass p-6">
                <h3 className="h-card-sm capitalize">{s.heading?.toLowerCase()}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">{s.paragraphs?.[0]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryImgs.length > 0 && (
        <section className="bg-bg-primary section">
          <div className="container-wide">
            <Reveal className="mb-10">
              <p className="eyebrow">Our Work</p>
              <h2 className="h-section mt-4">Design + Build Gallery</h2>
            </Reveal>
            <Gallery images={galleryImgs} columns={4} />
          </div>
        </section>
      )}

      {/* Testimonials — premium review wall with real, attributed reviews */}
      <ReviewWall reviews={clientReviews} eyebrow="Testimonials" heading="Trusted by Boise Homeowners" background="bg-bg-primary" moreHref="/reviews/" />

      {/* FAQ */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">FAQs</p>
            <h2 className="h-section mt-4">Frequently Asked Questions</h2>
          </Reveal>
          <div className="mt-12">
            <FAQ items={faq} />
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-bg-primary pb-24 text-center">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-cream/90">
              With one in-house team handling design and construction, your project stays coordinated from first concept
              through final walkthrough. Tell us about your home and we will explain the next step and what to expect.
            </p>
            <Link href="/design-and-build-questionnaire/" className="btn-primary mt-10 inline-flex">Tell Us About Your Project</Link>
          </Reveal>
        </div>
      </section>

      <ClosingCta {...closingCta.designBuild} />
    </>
  );
}
