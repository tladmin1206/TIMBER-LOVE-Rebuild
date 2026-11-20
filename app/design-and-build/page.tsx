import JsonLd from '@/components/JsonLd';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import SiteImage from '@/components/ui/SiteImage';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import StatStrip from '@/components/sections/StatStrip';
import EditorialSplit from '@/components/sections/EditorialSplit';
import PhotoCard from '@/components/ui/PhotoCard';
import ReviewWall from '@/components/sections/ReviewWall';
import FAQ from '@/components/ui/FAQ';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import { clientReviews, processSteps } from '@/lib/content/home';
import { projects } from '@/lib/content/projects';
import { pageMeta } from '@/lib/seo';
import faq from '@/content/design-and-build-faq.json';
const serviceCategories = [
  { heading: 'Whole-Home Remodels', image: '/projects/stucco-in-time/living.webp', body: 'Comprehensive renovations that rework layout, systems, and finishes across an entire home.' },
  { heading: 'Kitchens & Living Spaces', image: '/projects/north-end-gem/kitchen.webp', body: 'Focused remodels of the rooms where daily life happens, from kitchens to primary living areas.' },
  { heading: 'Home Additions', image: '/projects/due-for-a-raze/exterior.webp', body: 'Thoughtfully integrated additions that expand living space while matching your home’s existing character.' },
  { heading: 'Custom Homes', image: '/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg', body: 'One-of-a-kind new homes designed and built from the ground up around how you live.' },
  { heading: 'New Construction', image: '/projects/promise-ln-5142/5142-promise-ln-exterior-angle.jpg', body: 'Ground-up residential construction with design and build coordinated under one in-house team.' },
  { heading: 'Historic Restorations', image: '/projects/north-end-gem/living.webp', body: 'Careful updates to older Boise homes that preserve original character while modernizing for daily life.' },
];

export const metadata = pageMeta({
  title: "Boise Design-Build | Custom Homes and Remodels | Timber + Love",
  absoluteTitle: true,
  description: "Design-build in Boise for custom homes, whole-home remodels, kitchens and additions. One team designs and builds your home, led by Luke Caldwell. Start now.",
  path: '/design-and-build/',
});
const selected = ['promise-lane-spanish-modern', 'stucco-in-time', 'north-end-gem'].map((slug) => projects.find((p) => p.slug === slug)!);

export default function Page() {
  return <>
    <JsonLd schema={[
      serviceSchema({ name: 'Design-Build in Boise', description: 'Custom homes, whole-home remodels, kitchens, additions, and historic renovations in Boise and the Treasure Valley, designed and built by one team.', path: '/design-and-build/', serviceType: 'Design-build construction' }),
      faqSchema(faq),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Design + Build', path: '/design-and-build/' }]),
    ]} />
    <PageHero eyebrow="Timber + Love" title="Design-Build in Boise, From First Sketch to Final Walkthrough" subtitle="Timber + Love is a design-build firm in Boise that designs and builds custom homes and remodels under one roof." image="/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg" imageMobile="/editorial/cedar-hall.webp" videoId="928472719">
      <Link href="/design-and-build-questionnaire/" className="btn-primary" data-track="design_start">Start a Project</Link>
      <a href="#selected-work" className="btn-secondary">Explore Our Work</a>
    </PageHero>
    <TrustBar />
    <section className="bg-bg-primary section">
      <div className="container-wide grid gap-10 lg:grid-cols-2">
        <div><p className="eyebrow">One Connected Team</p><h2 className="h-section mt-4">From How You Live to the Last Detail</h2></div>
        <div className="space-y-5 text-lead"><p>Your home should reflect the way you want to live. We bring the architecture, interiors, and construction together so each decision belongs to a coherent whole.</p><p>We work with homeowners in <Link href="/service-areas/" className="link-underline">homes across the Treasure Valley</Link>. Start by sharing your goals, location, and investment range. Our team will review your project, talk through fit and next steps, and explain <Link href="/financing/" className="link-underline">how clients pay for a project</Link>.</p><Link href="/our-process/" className="link-underline inline-flex min-h-11 items-center text-sm">Meet the Process →</Link></div>
      </div>
    </section>
    <section className="section-tonal section" id="services">
      <div className="container-wide"><p className="eyebrow">Ways We Can Help</p><h2 className="h-section mt-4">A New Beginning for Your Home</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{serviceCategories.map((service) => <PhotoCard key={service.heading} image={service.image}><h3 className="h-card-sm">{service.heading}</h3><p className="mt-4 text-sm leading-relaxed text-text-secondary">{service.body}</p></PhotoCard>)}</div>
      </div>
    </section>
    <section id="selected-work" className="bg-bg-primary section scroll-mt-24">
      <div className="container-wide"><p className="eyebrow">The Work</p><h2 className="h-section mt-4">Individual Homes. A Shared Standard.</h2>
        <div className="mt-12 grid gap-7 lg:grid-cols-3">{selected.map((project) => <Link key={project.slug} href={`/projects/${project.slug}/`} className="group card-interactive overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}<SiteImage sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={project.cover} alt={project.gallery[0].alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div className="p-6"><p className="eyebrow">{project.category}</p><h3 className="h-card-sm mt-3">{project.title}</h3><p className="mt-4 text-sm text-text-secondary">Explore This Home →</p></div>
        </Link>)}</div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-secondary">New construction ranges from the <Link href="/projects/promise-lane-modern-farmhouse/" className="link-underline">modern farmhouse on Promise Lane</Link> to a <Link href="/projects/promise-lane-contemporary/" className="link-underline">contemporary home with a butterfly roof</Link>. Homeowners share their experience in our <Link href="/reviews/" className="link-underline">client reviews</Link>.</p>
        <Link href="/timber-and-love-gallery/" className="btn-secondary mt-8">View the Full Portfolio</Link>
      </div>
    </section>
    <EditorialSplit image="/editorial/oak-vanity.webp" imageAlt="Oak vanity with a stone top and matte black fixtures in a Timber + Love home" eyebrow="Materials and Craft" title="The Details You Live With" tone="secondary" ratio="landscape">
      <p>Warm materials, thoughtful proportions, and considered finishes give a home its character. We resolve those choices together, from the layout of a room to the way its smallest details meet.</p>
      <p>The same team carries that design intent through construction, with coordinated selections and regular conversations as your home takes shape.</p>
    </EditorialSplit>
    <section className="bg-bg-primary section"><div className="container-wide"><p className="eyebrow">Your Next Steps</p><h2 className="h-section mt-4">A Clear Way Forward</h2>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">{processSteps.map((step) => <PhotoCard key={step.num} image={step.image}><p className="eyebrow">{step.num}</p><h3 className="h-card-sm mt-3">{step.title}</h3><p className="mt-4 text-sm leading-relaxed text-text-secondary">{step.body}</p></PhotoCard>)}</div>
      <Link href="/our-process/" className="btn-secondary mt-8">See Every Phase and Watch the Films</Link>
    </div></section>
    <StatStrip />
    <ReviewWall reviews={clientReviews.filter((review) => review.role !== 'Real Estate Client').slice(0, 3)} moreHref="/reviews/" />
    <section className="bg-bg-primary section"><div className="container-wide max-w-4xl"><p className="eyebrow">Before You Begin</p><h2 className="h-section mt-4 mb-10">Your Questions, Answered</h2><FAQ items={faq} /></div></section>
    <ClosingCta {...closingCta.designBuild} />
  </>;
}
