import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import Reveal from '@/components/ui/Reveal';
import Gallery from '@/components/ui/Gallery';
import VideoBg from '@/components/ui/VideoBg';
import InlineVideo from '@/components/ui/InlineVideo';
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
import StatStrip from '@/components/sections/StatStrip';

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
    poster: '/editorial/concrete-entry.webp',
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
const galleryImgs = [
  { src: '/editorial/cedar-fireplace.webp', alt: 'A cedar-clad fireplace and black hearth in an Industrial Modern home' },
  { src: '/editorial/casetta-window.webp', alt: 'A sunlit La Casetta reading nook with collected textures' },
  { src: '/editorial/midcentury-art.webp', alt: 'Layered color and vintage details in a Mid Century Modern home' },
  { src: '/editorial/craftsman-bath.webp', alt: 'A freestanding bath and original character in a Classic Craftsman home' },
];

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

      <StatStrip />

      <PressStrip />

      {/* Estimator promo */}
      <section className="section-tonal border-y border-border-subtle bg-bg-secondary section-tight">
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
      <section className="border-t border-border-subtle bg-bg-primary section">
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

      {/* Editorial: one team under one roof, with a flagship custom home great room */}
      <EditorialSplit
        image="/projects/promise-ln-5106/5106-promise-ln-great-room.jpg"
        imageAlt="Barrel-vaulted great room with white oak and marble in a Spanish modern custom home by Timber and Love"
        eyebrow="One Team, One Roof"
        title="Design and Build, Resolved Together"
        cta="See Our Work"
        href="/timber-and-love-gallery/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          Because our designers and builders share one table, the vision that starts on paper is the home that gets
          built. Feasibility, materials, and craft are considered together from the first meeting, not handed off
          between separate firms.
        </p>
        <p>
          This is a fully custom home we designed and built from the ground up, resolved detail by detail by a single
          in-house team.
        </p>
      </EditorialSplit>

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

      {/* Gallery: three custom homes we designed and built, front elevations */}
      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Custom Homes</p>
            <h2 className="h-section mt-4">Three Homes, Designed and Built From the Ground Up</h2>
            <p className="text-lead mt-5">
              Each of these Promise Lane residences was drawn and constructed by our in-house team, from a Spanish
              modern to a modern farmhouse to a contemporary with a butterfly roof.
            </p>
          </Reveal>
          <div className="mt-12">
            <Gallery
              images={[
                { src: '/projects/promise-ln-5106/5106-promise-ln-exterior-front.jpg', alt: 'Front elevation of a white stucco Spanish modern custom home with arches, built by Timber and Love' },
                { src: '/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg', alt: 'Front elevation of a board-and-batten modern farmhouse with black windows, built by Timber and Love' },
                { src: '/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg', alt: 'Front elevation of a charcoal modern contemporary custom home with a butterfly roof, built by Timber and Love' },
              ]}
              columns={3}
            />
          </div>
        </div>
      </section>

      {/* Editorial: craftsmanship and materials, with a green marble kitchen */}
      <EditorialSplit
        image="/projects/promise-ln-5142/5142-promise-ln-kitchen-green-marble.jpg"
        imageAlt="Kitchen with green marble waterfall island and custom cabinetry in a modern contemporary home by Timber and Love"
        eyebrow="Built to Last"
        title="Materials Chosen for How They Wear"
        tone="secondary"
        ratio="landscape"
        reverse
      >
        <p>
          We select stone, wood, and hardware for how they hold up over years of daily life, not just how they
          photograph on day one. The green marble, custom cabinetry, and integrated fixtures in this kitchen were
          specified and installed to a single quality standard.
        </p>
        <p>
          From the first cut to the final finish, the same team holds that standard, so the craft you can feel is
          consistent across every room.
        </p>
      </EditorialSplit>

      {/* Full-bleed photographic statement: craft and quality. */}
      <FeatureBand
        image="/editorial/natural-materials.webp"
        eyebrow="Built to Last"
        title="Craft You Can Feel in Every Detail"
        body="We choose materials for how they wear over years, and we hold quality standards from the first cut to the final finish."
        align="left"
        height="short"
      />

      {/* Process: 3 phases over background videos */}
      <section className="border-t border-border-subtle bg-bg-primary pt-20 text-center sm:pt-28">
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
        <section key={p.num} className={`section ${i % 2 === 0 ? 'section-tonal' : 'bg-bg-primary'}`}>
          <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 ? 'lg:order-2' : ''}><InlineVideo videoId={p.videoId} poster={p.poster} title={p.title} /></div>
            <div><p className="eyebrow">Phase {p.num}</p><h3 className="h-section mt-4">{p.title}</h3><p className="text-lead mt-5">{p.body}</p>{i === 2 && <Link href="/design-and-build-questionnaire/" className="btn-secondary mt-7">Start the Questionnaire</Link>}</div>
          </div>
        </section>
      ))}

      {/* Values: full-bleed video background + left header + grid */}
      <section className="relative overflow-hidden section-feature">
        <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">What Drives Us</p>
            <h2 className="h-section mt-4">Our Values</h2>
            <div className="relative mt-8 aspect-video overflow-hidden"><VideoBg videoId="967110133" poster="/video-posters/967110133.jpg" overlay="" fit="contain" /></div>
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
        <section className="section-tonal border-t border-border-subtle section">
          <div className="container-wide">
            <Reveal className="mb-10">
              <p className="eyebrow">Our Work</p>
              <h2 className="h-section mt-4">Design + Build Gallery</h2>
            </Reveal>
            <Gallery images={galleryImgs} columns={4} />
          </div>
        </section>
      )}

      {/* Testimonials: premium review wall with real, attributed reviews */}
      <ReviewWall reviews={clientReviews} eyebrow="Testimonials" heading="Trusted by Boise Homeowners" background="bg-bg-primary" moreHref="/reviews/" />

      {/* FAQ */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
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

      {/* Full-bleed photographic statement: one team, one process, before the ask. */}
      <FeatureBand
        image="/editorial/firehouse-sink.webp"
        eyebrow="One Team, One Roof"
        title="Design and Build, Under One Roof"
        body="Our designers and builders work side by side, so your project stays coordinated from concept to completion."
        cta="Plan Your Project"
        href="/investment-planner/"
        align="left"
        height="short"
      />

      {/* Closing statement */}
      <section className="section-tonal border-t border-border-subtle py-16 text-center">
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
