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
  { heading: 'Whole-Home Remodels', image: '/projects/stucco-in-time/living.webp', body: 'We redo the layout, the systems and the finishes, top to bottom.' },
  { heading: 'Kitchens & Living Spaces', image: '/projects/north-end-gem/kitchen.webp', body: 'Kitchens and the rooms where everyone ends up.' },
  { heading: 'Home Additions', image: '/projects/due-for-a-raze/exterior.webp', body: 'More room that looks like it was always part of the house.' },
  { heading: 'Custom Homes', image: '/projects/promise-ln-5120/5120-promise-ln-exterior-front.jpg', body: 'A new home drawn around your family, from the lot up.' },
  { heading: 'New Construction', image: '/projects/promise-ln-5142/5142-promise-ln-exterior-angle.jpg', body: 'Ground-up residential construction with design and build coordinated under one in-house team.' },
  { heading: 'Historic Restorations', image: '/projects/north-end-gem/living.webp', body: 'Older Boise houses, updated without losing what made them worth saving.' },
];

export const metadata = pageMeta({
  title: "Boise Design-Build | Custom Homes and Remodels | Timber + Love",
  absoluteTitle: true,
  description: "Design-build in Boise for custom homes, whole-home remodels, kitchens and additions. One team designs and builds, led by Luke Caldwell. Tell us about your house.",
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
    <PageHero eyebrow="Timber + Love" title="Design-Build in Boise, From First Sketch to Final Walkthrough" subtitle="We design and build custom homes and remodels in Boise. Same team, start to finish." image="/projects/promise-ln-5142/5142-promise-ln-exterior-front.jpg" imageMobile="/editorial/cedar-hall.webp" videoId="928472719">
      <Link href="/design-and-build-questionnaire/" className="btn-primary" data-track="design_start">Tell Us About Your House</Link>
      <a href="#selected-work" className="btn-secondary">See Our Work</a>
    </PageHero>
    <TrustBar />
    <section className="bg-bg-primary section">
      <div className="container-wide grid gap-10 lg:grid-cols-2">
        <div><p className="eyebrow">One Connected Team</p><h2 className="h-section mt-4">Start with how your family lives</h2></div>
        <div className="space-y-5 text-lead"><p>Who cooks? Who works from home? Where do the coats go? We draw the house around the answers.</p><p>We work with homeowners <Link href="/service-areas/" className="link-underline">across the Treasure Valley</Link>. Tell us what you want to do, where the house is and roughly what you&apos;d like to spend. We&apos;ll tell you if it&apos;s a fit and what comes next, and we&apos;ll walk you through <Link href="/financing/" className="link-underline">how people pay for a project</Link>.</p><Link href="/our-process/" className="link-underline inline-flex min-h-11 items-center text-sm">See how a job goes →</Link></div>
      </div>
    </section>
    <section className="section-tonal section" id="services">
      <div className="container-wide"><p className="eyebrow">Ways We Can Help</p><h2 className="h-section mt-4">What we build</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{serviceCategories.map((service) => <PhotoCard key={service.heading} image={service.image}><h3 className="h-card-sm">{service.heading}</h3><p className="mt-4 text-sm leading-relaxed text-text-secondary">{service.body}</p></PhotoCard>)}</div>
      </div>
    </section>
    <section id="selected-work" className="bg-bg-primary section scroll-mt-24">
      <div className="container-wide"><p className="eyebrow">The Work</p><h2 className="h-section mt-4">Three of our favorites</h2>
        <div className="mt-12 grid gap-7 lg:grid-cols-3">{selected.map((project) => <Link key={project.slug} href={`/projects/${project.slug}/`} className="group card-interactive overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}<SiteImage sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={project.cover} alt={project.gallery[0].alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div className="p-6"><p className="eyebrow">{project.category}</p><h3 className="h-card-sm mt-3">{project.title}</h3><p className="mt-4 text-sm text-text-secondary">See this house →</p></div>
        </Link>)}</div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-secondary">New construction ranges from the <Link href="/projects/promise-lane-modern-farmhouse/" className="link-underline">modern farmhouse on Promise Lane</Link> to a <Link href="/projects/promise-lane-contemporary/" className="link-underline">contemporary home with a butterfly roof</Link>. Homeowners share their experience in our <Link href="/reviews/" className="link-underline">client reviews</Link>.</p>
        <Link href="/timber-and-love-gallery/" className="btn-secondary mt-8">See the Houses</Link>
      </div>
    </section>
    <EditorialSplit image="/editorial/oak-vanity.webp" imageAlt="Oak vanity with a stone top and matte black fixtures in a Timber + Love home" eyebrow="Materials and Craft" title="Details you live with" tone="secondary" ratio="landscape">
      <p>The materials, the proportions and the finishes are what give a house its character. We work those out with you, from the layout of a room to how the trim meets the wall.</p>
      <p>The people who drew it are the people building it, so the details don&apos;t get lost.</p>
    </EditorialSplit>
    <section className="bg-bg-primary section"><div className="container-wide"><p className="eyebrow">Your Next Steps</p><h2 className="h-section mt-4">How a job starts</h2>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">{processSteps.map((step) => <PhotoCard key={step.num} image={step.image}><p className="eyebrow">{step.num}</p><h3 className="h-card-sm mt-3">{step.title}</h3><p className="mt-4 text-sm leading-relaxed text-text-secondary">{step.body}</p></PhotoCard>)}</div>
      <Link href="/our-process/" className="btn-secondary mt-8">See Every Step and Watch the Films</Link>
    </div></section>
    <StatStrip />
    <ReviewWall reviews={clientReviews.filter((review) => review.role !== 'Real Estate Client').slice(0, 3)} moreHref="/reviews/" />
    <section className="bg-bg-primary section"><div className="container-wide max-w-4xl"><p className="eyebrow">Before You Begin</p><h2 className="h-section mt-4 mb-10">Your Questions, Answered</h2><FAQ items={faq} /></div></section>
    <ClosingCta {...closingCta.designBuild} />
  </>;
}
