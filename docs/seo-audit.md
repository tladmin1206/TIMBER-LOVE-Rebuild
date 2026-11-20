# Timber + Love SEO, AEO and GEO Audit

Audit date: 2026-11-20. Standard: the Organic and AI Search Visibility skill (SEO / GEO / AEO Page and Site Standards), Part 1 checklist on every page, Part 2 site workflow, Part 3 growth layer where it fits a local service site.

Codebase audited: `main` at `8e3b510` (Next.js 15 rebuild), built with `npm run build` and served with `npm start`. Published preview: https://timberandlove.replit.app. Production domain https://timberandlove.com still serves the old WordPress site, so the rebuild has not been indexed yet. This is a pre-launch audit: anything that only matters once the domain cuts over is marked **Cutover**.

---

## Implementation status (2026-11-20)

Shipped in the follow-up pull request. Verified on a production build with the no-JS crawler, `tsc`, ESLint, the repo's verify scripts, and Lighthouse.

| Item | Status | Result |
|---|---|---|
| S-3 legal pages out of sitemap, S-5 real `lastmod` | Done | Sitemap lists 40 indexable URLs, one fixed content date |
| S-4 gallery grid server-rendered | Done | No-JS gallery HTML now has all 12 project links |
| Legacy redirects (`/design-build`, old Rank Math sitemaps) | Done | Single 301 hop each |
| Kualoa slug | Done | `/chinamans-ocean-front-beach-house/` 301s to `/kualoa-beach-house/`; links, sitemap and share card updated |
| Admin login metadata | Done | Own title, `noindex, nofollow`, no canonical. The layout no longer sets a sitewide canonical, so 404 and admin pages never claim the homepage |
| T-1, T-2 titles and descriptions | Done | All 40 search pages: titles 46 to 62 characters, keyword first; descriptions 132 to 166 |
| H1 rewrites, homepage first sentence | Done | 9 H1s rewritten; homepage H1 is "Timber + Love: Luxury Custom Homes and Remodels in Boise" |
| T-3 footer headings, T-4 duplicate headings | Done | Zero headings in the footer; rental H2 reads "About ..."; article duplicate H2s removed; "FOR IMMEDIATE RELEASE" is a label |
| C-1, C-2, C-3 unsupported claims | Done | "Leading", "Premier", "prominent", "renowned", "one of the most respected" and every "over 20 years" removed (none has a source in the facts file) |
| C-4 Boise Boys opening copy | Done | New intro plus a visible three-question FAQ with FAQPage data |
| C-6 rental alt text | Done | Built from the photo file names ("The Firehouse: kitchen") instead of "photo 2" |
| E-1 Person, E-2 FAQPage, E-3 dark logo, E-5 breadcrumbs, E-6 article dates and byline, E-7 lodging locality and occupancy, E-8 service area, Shows TVSeries | Done | Validated in the crawl: every page has the expected types |
| A-9 `/llms.txt`, A-10 named AI crawlers | Done | Generated from the content files at build time |
| K-2 phone taps | Done | `call_click` event on every `tel:` link sitewide |
| P-3 homepage keyboard focus | Done | Root cause: the partners slider passed `inert=""`, which React 19 ignores. Lighthouse accessibility on `/` is now 100 |
| P-1 project page performance | Rechecked | 95 on a rerun (82 earlier was lab variance on this machine). No change made |
| Section 5 internal links | Done | Weakest page now has 2 linking pages besides navigation; every rental links its renovation story and all four other homes |
| K-C3 `/vacation-rentals/` | Kept, not merged | Search Console data is needed first. Retitled, given breadcrumbs, and linked from every rental page |
| K-C6 2024 announcement | Done | Dated note linking to the 2026 announcement |

Still blocked, and why:

- **C-5 reviews page content**: `clientReviews` is empty on purpose (no verified client reviews are in the repo). Add real, attributed reviews to `lib/content/home.ts` and they render on `/reviews/` and `/design-and-build/` automatically.
- **E-4 extra `sameAs` profiles and Luke's profiles**: only lukecaldwell.com is listed for Luke. Add his Instagram, IMDb or HGTV pages to `personSchema` once confirmed.
- **Google Business Profile**: the profile link supplied on 2026-11-20 is now the map link, the Google reviews link, and a `sameAs` entry on the Organization and LocalBusiness data. The profile's own contents (categories, hours, website URL) could not be read from here: the share link host is blocked in this environment.
- **NAP and hours (done 2026-11-20)**: from the Google Business Profile screenshots: "Timber and Love", 3024 W Fairview Ave, Boise, ID 83702, (208) 995-9516, Monday to Friday 9 AM to 5 PM. Structured data now uses "Timber and Love" as the name ("Timber + Love" as `alternateName`) plus `openingHoursSpecification`; the footer and contact page show name, address and hours together. The profile's 5.0 rating (50 reviews) is not marked up, because the reviews are not on the page.
- **SPF and DMARC, keyword volumes, K-C4 and K-C6 merge decisions**: need GBP, DNS and Search Console access.
- **S-1 and S-2**: run at cutover (verify indexable headers; delete `NEXT_PUBLIC_SHARE_IMAGE_ORIGIN`).
- **"Over 20 years"**: removed rather than guessed. If Luke confirms it, add it to `docs/content-facts.json` with a source and it can go back.

---

## 1. Coverage summary

| Item | Result |
|---|---|
| URLs inventoried | 57 (42 sitemap pages, 15 legacy, utility and system URLs) |
| URLs given complete page-level review | **42 of 42** sitemap pages (40 search-targeted, 2 legal pages) |
| URLs given mechanical review only | 15 (redirects, admin, 404, system files); reason in section 1.3 |
| Orphan pages (zero inlinks) | 0 |
| Weakly linked pages (linked from 3 or fewer pages) | 14 (section 5 fixes all of them) |
| Pages in repo but missing from sitemap | 0 public pages (admin excluded on purpose) |
| Legacy WordPress URLs without a working destination | 3 (`/design-build`, `/sitemap_index.xml`, child sitemaps) |
| Near-duplicate pages (70 percent or more shared text) | 0. Highest overlap is 32 percent, between project case studies sharing a template |
| Site mode | **Local** (physical Boise address, Treasure Valley service area, home services). Vacation rental pages are local to Boise, New Meadows and Oahu. |

### 1.1 Sources cross-checked

| Source | Status | Notes |
|---|---|---|
| Live crawl (no-JS, from every sitemap URL, following every internal link) | Done | Playwright with JavaScript disabled, so findings reflect raw server HTML |
| Rendered crawl (JS on, 390 px mobile) | Done on 4 interactive pages | Found one client-only section (gallery grid) |
| New XML sitemap `/sitemap.xml` | Done | 42 URLs |
| Old WordPress sitemaps (`sitemap_index.xml`, post, page, category, elementskit) | Done | 22 URLs, all mapped (section 1.2) |
| Repository routes (`app/**/page.tsx`, `lib/content/projects.ts`) | Done | 35 route files, 12 project slugs |
| Google index (`site:timberandlove.com` web search) | Done | Found one extra indexed legacy URL: `http://www.timberandlove.com/design-build` |
| Google Search Console | **Blocked** | Not connected to this session. No query, click or position data |
| GA4 conversions by landing page | **Blocked** | Not connected |
| Ahrefs or Similarweb (volume, backlinks, competitors) | **Blocked** | Requires paid credits; not spent without your approval |
| DNS (SPF, DMARC) | **Blocked** | DNS lookup tools are not reachable from this environment |
| Lighthouse (mobile lab) | Done on 5 template samples | Section 2.6 |

Because search and analytics data are blocked, every keyword below is chosen from intent, page purpose, the existing indexed titles, and a live SERP read. Each one must be validated against Search Console within 28 days of cutover (action A-30) before any new page is created for it. This follows Principle 0: no new pages are proposed as definite work, only as candidates.

### 1.2 URL inventory

Legend for "Search": **Yes** = should rank, **Nav** = indexable but navigational or transactional, **No** = should not appear in search.

| URL | Type | Purpose | Search | Old WP URL | Sitemap | Status |
|---|---|---|---|---|---|---|
| `/` | Home | Brand, entry to all services | Yes | Yes | Yes | 200 |
| `/design-and-build/` | Service hub (money page) | Design-build for custom homes and remodels | Yes | Yes | Yes | 200 |
| `/our-process/` | Service support | How design-build works, step by step | Yes | No | Yes | 200 |
| `/service-areas/` | Local hub | Treasure Valley coverage | Yes | No | Yes | 200 |
| `/design-and-build-questionnaire/` | Conversion | Lead questionnaire (iframe) | Nav | Yes | Yes | 200 |
| `/financing/` | Informational | How homeowners pay for a project | Yes | No | Yes | 200 |
| `/reviews/` | Trust | Points to Google reviews | Yes | No | Yes | 200 |
| `/journal/` | Blog hub | Lists articles | Nav | No | Yes | 200 |
| `/buy-or-sell/` | Bridge | Hands off to timberandloverealty.com | Yes | No | Yes | 200 |
| `/sell-for-cash/` | Bridge | Hands off to buymyhouse.co | Yes | No | Yes | 200 |
| `/invest/` | Bridge | Hands off to the realty invest page | Yes | No | Yes | 200 |
| `/about/` | Entity | Company and Luke Caldwell | Yes | No | Yes | 200 |
| `/contact/` | Conversion | Contact form and routing | Nav | No | Yes | 200 |
| `/timber-and-love-gallery/` | Portfolio hub | All project case studies | Yes | Yes | Yes | 200 |
| `/shows/` | Media hub | Episode catalog and watch links | Yes | No | Yes | 200 |
| `/the-boise-boys/` | Media | Homes from HGTV's Boise Boys | Yes | Yes | Yes | 200 |
| `/stay-with-us/` | Rental hub | All five vacation homes | Yes | Yes | Yes | 200 |
| `/vacation-rentals/` | Rental tool | Compare and filter rentals | Yes (see C-3) | Yes | Yes | 200 |
| `/the-darla-house/` | Rental | North End cottage | Yes | Yes | Yes | 200 |
| `/the-firehouse/` | Rental | HGTV firehouse apartment | Yes | Yes | Yes | 200 |
| `/chinamans-ocean-front-beach-house/` | Rental | Kualoa Beach House, Oahu | Yes | Yes | Yes | 200 |
| `/caldwell-beach-house/` | Rental | Ka'a'awa, Oahu | Yes | No | Yes | 200 |
| `/timber-and-love-chalet/` | Rental | Cabin near McCall | Yes | Yes | Yes | 200 |
| `/timber-love-story-boise/` | Article | Company origin story | Yes | Yes | Yes | 200 |
| `/luke-caldwell-faq/` | Article (Q and A) | Questions about Luke Caldwell | Yes | Yes | Yes | 200 |
| `/luke-caldwell-boise-community/` | Article | Community involvement | Yes | Yes | Yes | 200 |
| `/building-boise-new-show-announcement/` | Article (press) | 2026 show announcement | Yes | Yes | Yes | 200 |
| `/boise-boys-are-back/` | Article (press) | 2024 show return | Yes | Yes | Yes | 200 |
| `/projects/promise-lane-spanish-modern/` | Case study | New construction | Yes | No | Yes | 200 |
| `/projects/promise-lane-modern-farmhouse/` | Case study | New construction | Yes | No | Yes | 200 |
| `/projects/promise-lane-contemporary/` | Case study | New construction | Yes | No | Yes | 200 |
| `/projects/casa-de-boise/` | Case study | HGTV whole-home remodel | Yes | No | Yes | 200 |
| `/projects/the-firehouse/` | Case study | HGTV historic remodel | Yes | No | Yes | 200 |
| `/projects/central-rim/` | Case study | HGTV remodel | Yes | No | Yes | 200 |
| `/projects/stucco-in-time/` | Case study | HGTV remodel | Yes | No | Yes | 200 |
| `/projects/due-for-a-raze/` | Case study | HGTV remodel | Yes | No | Yes | 200 |
| `/projects/north-end-gem/` | Case study | HGTV remodel | Yes | No | Yes | 200 |
| `/projects/the-darla-house/` | Case study | Rental renovation | Yes | No | Yes | 200 |
| `/projects/the-chalet/` | Case study | Rental renovation | Yes | No | Yes | 200 |
| `/projects/kualoa-beach-house/` | Case study | Rental renovation | Yes | No | Yes | 200 |
| `/privacy-policy/` | Legal | Privacy | No (noindex, follow) | Yes | **Yes (fail)** | 200 |
| `/terms-and-conditions/` | Legal | Terms | No (noindex, follow) | Renamed | **Yes (fail)** | 200 |

Legacy, utility and system URLs (mechanical review):

| URL | Result | Verdict |
|---|---|---|
| `/terms-conditons/` (old misspelled WP slug) | 301 to `/terms-and-conditions/` | Pass |
| `/category/uncategorized/` | 301 to `/journal/` | Pass |
| `/category/boise-boys/` | 301 to `/the-boise-boys/` | Pass |
| `/?elementskit_template=...` (2 old WP template URLs) | 200 homepage, canonical `/` | Pass (canonical consolidates) |
| `/design-build` (indexed on Google today) | 308 to `/design-build/`, then **404** | **Fail**, see A-3 |
| `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml` | **404** | **Fail**, see A-4 (submitted in Search Console today) |
| `/estimate/`, `/investment-planner/` | **307** (temporary) to questionnaire | Fail if permanent, see A-14 |
| `/admin/login/` | 200, X-Robots-Tag noindex, robots.txt disallow, but **homepage title, homepage description, canonical to `/` and meta robots `index`** | **Fail**, see A-13 |
| `/admin/estimates/`, `/admin/estimator/` | 307 to login, noindex | Pass |
| `/api/*` | Disallowed in robots.txt | Pass |
| `/og/*` | Share images, not pages | Pass (excluded) |
| Any unknown path (e.g. `/does-not-exist/`) | 404 with noindex | Pass (true 404, no soft 404) |
| `/llms.txt` | **404** | **Fail**, see A-9 |

### 1.3 Exclusions

- 15 legacy, admin, API, image and system URLs got mechanical checks only. They are not content and should not rank.
- `/og/*` routes are share images rendered for Open Graph; they are not pages.
- `leads.timberandlove.com` (questionnaire app) is a separate host and out of scope except where it is embedded.
- Affiliated sites (timberandloverealty.com, buymyhouse.co, lukecaldwell.com, lukeandclint.com) are out of scope; they matter only for cannibalization decisions.

---

## 2. Sitewide findings

Severity: **Blocker** (stops indexing or loses existing rankings), **Critical**, **High**, **Medium**, **Low**.

### 2.1 What already works (preserve)

- Every page is server-rendered: the H1, body copy and key facts are in the raw HTML (no-JS crawl), except one gallery section (S-4).
- Every page has exactly one H1, a unique title, a self-referencing absolute canonical on `https://timberandlove.com`, Open Graph and Twitter tags, and a branded share image.
- Organization, WebSite and LocalBusiness plus GeneralContractor JSON-LD with full NAP, geo, nine `areaServed` cities, founding date and founder sits on every page. NAP is identical everywhere.
- Every FAQPage schema (8 pages) matches visible on-page questions exactly (35 of 35 questions verified visible).
- All old WordPress URLs keep their exact slugs and trailing slashes, which protects existing rankings.
- Staging and preview hosts send `X-Robots-Tag: noindex, nofollow`; the production apex and www do not (verified by sending `Host: timberandlove.com`).
- No image is missing an `alt` attribute. Decorative images use empty alt correctly.
- Stats were already audited for proof (`docs/content-facts.json`). Unverified counters were removed earlier.
- Analytics (GA4, Meta Pixel, Clarity) carry over the live IDs; `generate_lead`, `form_start`, booking hand-off and outbound clicks are tracked.
- Lighthouse accessibility is 96 to 100 and CLS is 0 on every sampled template.

### 2.2 Indexing and migration

| ID | Severity | Finding | Evidence | Exact correction | Verify |
|---|---|---|---|---|---|
| S-1 | Blocker (Cutover) | The rebuild is noindexed on every host except the production apex and www. That is correct now, but the cutover must be checked the minute DNS moves. | `curl -sI https://timberandlove.replit.app/` returns `x-robots-tag: noindex, nofollow` | No change before cutover. After cutover run `npm run check:indexable` against `https://timberandlove.com` and confirm no `X-Robots-Tag` on public pages and `noindex` on `/admin/`. | `curl -sI https://timberandlove.com/ \| grep -i x-robots` returns nothing |
| S-2 | Critical (Cutover) | `NEXT_PUBLIC_SHARE_IMAGE_ORIGIN` points share images at `timberandlove.replit.app`. After cutover every `og:image` would point at the staging host. | Set during the OG work | Delete the variable in the Replit deployment secrets after cutover, then republish. | `og:image` on `/` starts with `https://timberandlove.com/og/` |
| S-3 | High | The sitemap lists two URLs that are `noindex` (`/privacy-policy/`, `/terms-and-conditions/`). Sitemaps must list only indexable 200 URLs. | `app/sitemap.ts` lines for both; pages send `noindex, follow` | Remove both entries from `paths` in `app/sitemap.ts`. | `curl -s /sitemap.xml \| grep -c privacy` returns 0 |
| S-4 | High | The project grid on `/timber-and-love-gallery/` is client-only. Raw HTML has 114 words and **zero** links to project pages; with JS it has 612 words and 12 project links. The main portfolio hub passes no crawlable links to the case studies. | No-JS vs JS crawl. `ProjectGrid` sits in `<Suspense>` and reads search params, so Next renders only the fallback on the server. | Render the full grid on the server (all 12 cards as plain `<a>` links) and apply the filter on the client by hiding cards; or put the static card list inside the Suspense fallback. | No-JS fetch of the gallery shows 12 `href="/projects/..."` links |
| S-5 | Medium | `lastModified` in the sitemap is the build time for every URL, so every deploy claims every page changed. Google learns to ignore it. | `app/sitemap.ts` uses `new Date()` | Use a real per-page date (content file date, article `date`, or a fixed date per page updated by hand). | Two deploys with no content change produce identical `lastmod` values |

### 2.3 Metadata and headings (template fixes)

| ID | Severity | Finding | Affected URLs | Exact correction | Verify |
|---|---|---|---|---|---|
| T-1 | High | Titles are a bare page name plus ` - Timber + Love` ("Reviews - Timber + Love", "Our Work - Timber + Love"). Most carry no search term, no benefit and no location. | 34 of 40 search pages (all except the six already keyword-led: `/design-and-build/`, `/buy-or-sell/`, `/sell-for-cash/`, `/invest/`, `/financing/`, `/our-process/`) | Use `absoluteTitle` with the `Keyword \| Benefit \| Brand` form. Exact titles per URL are in section 4. | Every `<title>` is 50 to 62 characters and starts with its primary keyword |
| T-2 | Medium | 18 of 42 meta descriptions fall outside 120 to 165 characters (target about 150 to 160). The worst are listed here. | Long: `/` 192, `/about/` 200, `/contact/` 181, `/the-darla-house/` 185, `/the-firehouse/` 197, `/chinamans-ocean-front-beach-house/` 176, `/timber-and-love-chalet/` 173, `/projects/the-firehouse/` 211, `/projects/promise-lane-spanish-modern/` 190. Short: `/reviews/` 104, `/design-and-build/` 112, `/luke-caldwell-faq/` 115 | Replacement descriptions in section 4. | Length check script over the crawl |
| T-3 | Medium | Footer column labels ("What We Do", "Company", "Shows & Media", "Stay in the Loop", "Visit", "Call", "Email") are H3 tags on every page. They pollute every page's outline and create skipped levels after a page's last H2. | All 42 pages plus the 404 page | In `components/layout/Footer.tsx` change those `<h3>` to `<p>` (keep the classes). | `document.querySelectorAll('footer h1,footer h2,footer h3').length === 0` |
| T-4 | Medium | Rental and article templates repeat the H1 as an H2 directly below it. | `/the-darla-house/`, `/the-firehouse/`, `/chinamans-ocean-front-beach-house/`, `/caldwell-beach-house/`, `/timber-and-love-chalet/`, `/luke-caldwell-faq/`, `/building-boise-new-show-announcement/` | Rentals: change the second heading to a descriptive H2 ("About The Firehouse", etc.). Articles: delete the duplicate H2 that came over from WordPress. Change "FOR IMMEDIATE RELEASE" from H2 to a small `<p>` label. | One heading per text in the outline |
| T-5 | Low | Article title tags are the full headline plus brand (63 to 100 characters), so Google truncates them. | The five journal articles | Keep the long H1; set a shorter `title` (section 4). | Title length 50 to 62 |

### 2.4 Structured data and entity (GEO)

| ID | Severity | Finding | Exact correction | Verify |
|---|---|---|---|---|
| E-1 | High | No Person entity for Luke Caldwell, the main reason people search for this brand. The founder is a bare name. Web results for "Luke Caldwell" mix him with the Esterlyn band singer, so an explicit entity matters. | Add a `Person` node `@id: https://timberandlove.com/#luke-caldwell` with `name`, `jobTitle: "Founder"`, `worksFor` the organization, `image`, and `sameAs` (lukecaldwell.com, his Instagram, IMDb and HGTV talent pages, the Amazon author page for *Americana Soul*). Only add profiles the business confirms. Point `founder` and every Article `author` at this `@id`. Output on `/about/` and `/luke-caldwell-faq/`. | Rich Results Test shows a Person with sameAs |
| E-2 | High | `/luke-caldwell-faq/` has eight visible question-and-answer pairs but only `Article` schema. | Add `FAQPage` with the eight visible questions and answers, word for word. | Validator shows FAQPage with 8 questions |
| E-3 | Medium | Organization `logo` is a **white** PNG. Google shows it on white backgrounds, so it is invisible in knowledge panels and results. | Point `logo` at a dark-on-transparent or dark-on-white logo, at least 112 by 112 px. | Logo URL renders visibly on white |
| E-4 | Medium | `sameAs` lists only Instagram and Facebook. | Add every confirmed owned company profile: Google Business Profile (maps URL), Houzz, LinkedIn, YouTube if the company owns a channel. Do not add affiliated businesses as sameAs. | JSON-LD review |
| E-5 | Medium | BreadcrumbList is missing on 16 pages while other pages have it. | Add it to `/buy-or-sell/`, `/sell-for-cash/`, `/invest/`, `/about/`, `/contact/`, `/timber-and-love-gallery/`, `/shows/`, `/the-boise-boys/`, `/stay-with-us/`, `/vacation-rentals/`, `/design-and-build-questionnaire/`, and all five articles (Home > Journal > Article). | Every non-home page outputs BreadcrumbList |
| E-6 | Medium | Article schema uses the Organization as author, has no `dateModified`, and pages show no visible byline or date. | Add a visible byline ("By Luke Caldwell" or "Timber + Love team", whichever is true) and date to `ArticlePage.tsx`; set `author` to the Person `@id` when Luke is the author; add `dateModified`. | Visible byline matches schema |
| E-7 | Low | LodgingBusiness on rentals has only region and country. | Add `addressLocality` (Boise; New Meadows; Kaʻaʻawa) and `containsPlace` with `Accommodation` `occupancy` and `numberOfBedrooms` from `content-facts.json`. Do not add ratings or prices (owned by booking hosts). | Validator, no warnings on address |
| E-8 | Low | Service schema on `/design-and-build/` says `areaServed: Boise` only, while LocalBusiness lists nine cities. | Reuse the same nine-city array. | JSON-LD review |

### 2.5 AI crawler access and llms.txt

| ID | Severity | Finding | Exact correction | Verify |
|---|---|---|---|---|
| A-9 | High | `/llms.txt` returns 404. | Add `app/llms.txt/route.ts` that builds a plain-text summary at build time from `lib/site.ts`, `pathways`, `projects`, `rentals` and `journalPosts`: who Timber + Love is, services, service area, NAP, Luke Caldwell, and links to the 15 key pages. | `curl /llms.txt` returns 200 text/plain |
| A-10 | Medium | `robots.txt` has only a `*` block. AI crawlers are allowed by default, but the standard requires named blocks so an accidental future `*` rule cannot remove them. | In `app/robots.ts` add rules for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Google-Extended, CCBot with `allow: '/'` and the same `/api/`, `/admin/` disallows. | `curl /robots.txt` lists each user agent |

### 2.6 Performance, mobile and accessibility

Lighthouse 12, mobile emulation, local production server (lab data, no CDN):

| URL (template) | Performance | Accessibility | Best practices | LCP | CLS | TBT |
|---|---|---|---|---|---|---|
| `/` | 93 | 96 | 96 | 2.9 s | 0 | 150 ms |
| `/design-and-build/` (service) | 91 | 100 | 96 | 2.7 s | 0 | 290 ms |
| `/projects/casa-de-boise/` (case study) | **82** | 100 | 96 | 2.9 s | 0 | **540 ms** |
| `/the-firehouse/` (rental) | 92 | 100 | 96 | 3.1 s | 0 | 140 ms |
| `/luke-caldwell-faq/` (article) | 98 | 100 | 96 | 2.5 s | 0 | 60 ms |

Lighthouse SEO scored 69 only because of the staging `noindex` header (`is-crawlable`), which is expected and disappears on production.

| ID | Severity | Finding | Exact correction | Verify |
|---|---|---|---|---|
| P-1 | Medium | Project template TBT 540 ms and performance 82, below the 95 target. Likely the 12 to 30 image gallery hydrating at once. | Lazy-hydrate the gallery lightbox (load the dialog code on first click) and keep below-fold images `loading="lazy"`. | Lighthouse mobile at or above 90 on `/projects/casa-de-boise/` |
| P-2 | Low | LCP 2.5 to 3.1 s in lab on every template (target under 2.5 s). | Preload the hero rendition in `PageHero` (`fetchPriority="high"` on the hero image only) and confirm the hero serves the 828 px rendition on phones. | Field LCP in Search Console Core Web Vitals after 28 days |
| P-3 | Low | Homepage `aria-hidden-focus`: a focusable element sits inside an `aria-hidden` container (the decorative marquee or duplicated logo strip). | Add `tabIndex={-1}` or `inert` to links inside the hidden duplicate. | Lighthouse accessibility 100 on `/` |
| M-1 | Pass | No horizontal overflow at 390 px. Full route mobile QA was completed in the design pass; this audit rechecked 4 interactive pages. | None | |

### 2.7 Content, claims and E-E-A-T

| ID | Severity | Finding | URL | Exact correction |
|---|---|---|---|---|
| C-1 | High | Unsupported superlative in the homepage's first sentence: "Treasure Valley's Leading Luxury Design + Build Firm". No source in `content-facts.json`. | `/` | Replace with "Luxury Custom Homes and Remodels in Boise, Designed and Built by One Team". |
| C-2 | High | "Premier" in the sitewide default title and OG title ("Boise's Premier Home Services") is an unsupported claim and vague. | `app/layout.tsx` default, `/` | Use the homepage title in section 4. |
| C-3 | Medium | "Over 20 years" and "one of the most respected" appear in articles and are not in the facts file. | `/luke-caldwell-faq/`, `/luke-caldwell-boise-community/`, `/timber-love-story-boise/` | Confirm "over 20 years" with Luke and add it to `content-facts.json` with a source, or change to a dated fact ("since 2015, Timber + Love has..."). Delete "one of the most respected". |
| C-4 | Medium | `/the-boise-boys/` opens with generic WordPress-era copy ("Whether you're looking to build new, remodel, buy, or sell...") that is not about the show. | `/the-boise-boys/` | New first paragraph in section 4. |
| C-5 | Medium | `/reviews/` has 111 words and no review content; it only links to Google. It cannot rank for "Timber + Love reviews" and gives AI systems nothing to quote. | `/reviews/` | Add 4 to 6 real attributed review excerpts already on the site or on Google (with the reviewer's first name and date), the Google review link, and a line stating where reviews live. No aggregate rating unless it is pulled live with a date. |
| C-6 | Low | Rental gallery images use alt text "The Firehouse: photo 2" through "photo 12". | All 5 rental pages | Describe each image ("Firehouse living room with original brick and red fire pole"). Source captions from `lib/content/rentals.ts`. |

### 2.8 Conversion tracking

| ID | Severity | Finding | Exact correction | Verify |
|---|---|---|---|---|
| K-1 | Pass (corrected) | First draft said questionnaire completions were untracked. They are tracked: the lead app posts `timber:lead-submitted` after the server stores the lead, and `DesignBuildQuestionnaire.tsx` sends `generate_lead` to GA4. | None. Confirm `generate_lead` is marked a key event in GA4. | GA4 DebugView on a test submission |
| K-2 | Medium | Phone taps are not tracked. `tel:` links have no `data-track`. | Add `data-track="call_click"` to every `site.phoneHref` link (Header, Footer, MobileBottomBar, ProjectSummary). | GA4 DebugView shows `call_click` |
| K-3 | Low | No "How did you hear about us?" field, so AI and podcast referrals cannot be measured. | Add an optional field to Form 3 and the contact form. | Field stored on the lead |

### 2.9 Local SEO

- NAP in crawlable text in the footer of every page, click-to-call present: **Pass**.
- LocalBusiness subtype `GeneralContractor` with geo, map and areaServed: **Pass**.
- Google Business Profile completeness, categories, and whether it links to `timberandlove.com/design-and-build/` or the homepage: **Blocked** (no GBP access). After cutover set the GBP website to `https://timberandlove.com/` and add service links to `/design-and-build/`.
- Service area pages: there is one `/service-areas/` page and no city pages. **Pass**: do not create city pages unless each has its own local projects, photos and reviews (doorway risk).
- Opening hours missing from LocalBusiness and the site: **Blocked** (need hours from the business). Add `openingHoursSpecification` once confirmed.

---

## 3. Keyword map

One primary keyphrase per search-targeted URL. Volume and current position are **blocked** (no Search Console or paid tool). Intent was read from the live SERP: "Boise design build" style queries return directories (Houzz, Angi) and local firms, so a strong local service page can compete. Branded queries ("Luke Caldwell", "Boise Boys") return news and the old site.

### 3.1 Map

| URL | Primary keyphrase | Intent | Secondary and long-tail (where to add) |
|---|---|---|---|
| `/` | Timber + Love | Navigational, brand | "Luke Caldwell design build" (H2 "Led by Luke Caldwell"), "HGTV Boise Boys builder" (hero copy) |
| `/design-and-build/` | design-build Boise | Commercial | luxury home remodel Boise (H3 Whole-Home Remodels), custom home builder Boise (H3 Custom Homes), home addition Boise (H3 Home Additions), kitchen remodel Boise (H3 Kitchens), historic home renovation Boise (H3 Historic Restorations), "how much does a design-build remodel cost in Boise" (new FAQ, only if the business can state a real range) |
| `/our-process/` | design-build process | Informational, commercial | "what to expect during a home remodel" (intro answer), "how long does a custom home take to build in Boise" (FAQ), "design-build vs general contractor" (new FAQ) |
| `/service-areas/` | design-build Treasure Valley | Commercial, local | remodeling contractor Meridian, Eagle custom home builder, Nampa remodel (H2 city paragraphs with real local projects only) |
| `/design-and-build-questionnaire/` | start a design-build project | Transactional | "custom home consultation Boise" |
| `/financing/` | how to finance a home remodel | Informational | HELOC for remodel, construction loan for custom home Idaho, renovation loan (existing H3s) |
| `/reviews/` | Timber + Love reviews | Navigational, trust | "is Timber + Love legit", "Luke Caldwell builder reviews" |
| `/journal/` | Timber + Love journal | Navigational | none |
| `/buy-or-sell/` | Timber + Love Realty | Navigational | "Luke Caldwell realtor Boise" |
| `/sell-for-cash/` | sell my house for cash Boise | Transactional | "cash home buyers Boise", "sell house as-is Boise" (see cannibalization K-C4) |
| `/invest/` | Boise real estate investment | Commercial | "invest with Luke Caldwell" |
| `/about/` | about Timber + Love | Navigational, entity | "Timber + Love founded 2015", "who owns Timber + Love" (first paragraph) |
| `/contact/` | contact Timber + Love | Navigational | "Timber + Love phone number", "Timber + Love address" |
| `/timber-and-love-gallery/` | Boise custom home portfolio | Commercial | "Boise Boys houses photos", "luxury remodel before and after Boise" |
| `/shows/` | Boise Boys episodes | Informational | "where to watch Boise Boys", "Outgrown HGTV", "Luke and Clint YouTube" |
| `/the-boise-boys/` | Boise Boys homes | Informational, commercial | "Boise Boys HGTV", "Boise Boys houses for sale or rent", "who are the Boise Boys" (FAQ) |
| `/stay-with-us/` | Timber + Love vacation rentals | Commercial | "HGTV vacation rental Boise", "Boise Boys Airbnb" |
| `/vacation-rentals/` | (consolidate, see K-C3) | | |
| `/the-firehouse/` | Firehouse vacation rental Boise | Commercial | "Boise Boys Firehouse Airbnb", "North End Boise rental" |
| `/the-darla-house/` | North End Boise cottage rental | Commercial | "Boise vacation rental for families" |
| `/timber-and-love-chalet/` | cabin rental near McCall | Commercial | "New Meadows cabin rental", "McCall cabin for 10 guests" |
| `/chinamans-ocean-front-beach-house/` | Kualoa beach house rental | Commercial | "oceanfront rental Oahu North Shore", "Kualoa Ranch vacation rental" |
| `/caldwell-beach-house/` | Kaaawa beach house rental | Commercial | "Oahu beach house for 11 guests" |
| `/timber-love-story-boise/` | Timber + Love story | Informational | "how Timber + Love started" |
| `/luke-caldwell-faq/` | Luke Caldwell | Informational, entity | "who is Luke Caldwell", "Luke Caldwell HGTV", "Luke Caldwell net worth" (do not answer unless sourced), "is Luke Caldwell still on TV" |
| `/luke-caldwell-boise-community/` | Luke Caldwell Boise community | Informational | "Luke Caldwell charity" |
| `/building-boise-new-show-announcement/` | Luke and Clint new show | News | "Building Boise series", "Boise Boys reunion" |
| `/boise-boys-are-back/` | Boise Boys are back | News | "Boise Boys new show 2024" |
| `/projects/promise-lane-spanish-modern/` | Spanish modern custom home Idaho | Commercial, inspiration | "white stucco arched home" |
| `/projects/promise-lane-modern-farmhouse/` | modern farmhouse custom home Idaho | Commercial | "board and batten modern farmhouse" |
| `/projects/promise-lane-contemporary/` | butterfly roof contemporary home | Commercial | "contemporary custom home Idaho" |
| `/projects/casa-de-boise/` | Casa De Boise Boise Boys | Informational | "Boise Boys Casa de Boise episode" |
| `/projects/the-firehouse/` | Boise firehouse renovation | Informational | "Boise Boys firehouse episode" |
| `/projects/central-rim/` | Central Rim Boise home remodel | Informational | "All-In on Boise's Central Rim" |
| `/projects/stucco-in-time/` | Stucco in Time Boise Boys | Informational | |
| `/projects/due-for-a-raze/` | Due for a Raze Boise Boys | Informational | |
| `/projects/north-end-gem/` | North End Boise home remodel | Commercial | "historic North End renovation" |
| `/projects/the-darla-house/` | Darla House renovation | Informational | |
| `/projects/the-chalet/` | New Meadows cabin renovation | Informational | |
| `/projects/kualoa-beach-house/` | Kualoa beach house renovation | Informational | |

### 3.2 Cannibalization decisions

| ID | Competing URLs | Primary URL | What the others cover | Change |
|---|---|---|---|---|
| K-C1 | `/` and `/design-and-build/` both target "design build Boise" (homepage H2 "A Luxury Design + Build Firm", both describe custom homes and remodels) | `/design-and-build/` | Homepage owns the brand and Luke Caldwell; it introduces services and sends "design-build" intent to the hub with the anchor "design-build in Boise". | Homepage title drops "design build" as its lead term (section 4); homepage links to `/design-and-build/` with that anchor. |
| K-C2 | `/the-firehouse/` and `/projects/the-firehouse/` share the title "The Firehouse - Timber + Love". Same for Darla House and Kualoa (rental vs project). | Rental page for "rental" and "stay" intent; project page for "renovation" intent | Project pages tell the renovation story; rental pages handle booking. | New titles in section 4 split the intent. Each rental page links to its project page ("see how we renovated it") and vice versa. |
| K-C3 | `/stay-with-us/` and `/vacation-rentals/` both list all five rentals. `/vacation-rentals/` has only one inlink. | `/stay-with-us/` | The comparison filter becomes a section of `/stay-with-us/` (`#compare`). | **Approval required**: move `RentalComparison` into `/stay-with-us/`, then 301 `/vacation-rentals/` to `/stay-with-us/#compare` and remove it from the sitemap. Check Search Console first: if `/vacation-rentals/` gets clicks for "vacation rentals Boise", keep it and instead make it the single list page. |
| K-C4 | `/buy-or-sell/`, `/sell-for-cash/`, `/invest/` vs the affiliated domains that carry the actual service (timberandloverealty.com, buymyhouse.co). | The affiliated domain for generic terms | These pages own the branded bridge query ("Timber + Love Realty", "Timber + Love cash offer"). | **Blocked** until we see which domain ranks. If the affiliate site ranks for "sell my house for cash Boise", change this page's primary to "Timber + Love cash home offer" so the two do not compete. |
| K-C5 | `/shows/` and `/the-boise-boys/` both describe the show and its homes. | `/shows/` for episodes and watching; `/the-boise-boys/` for the homes and the firm behind them | | Titles and first paragraphs split as in section 4; each links to the other once. |
| K-C6 | `/boise-boys-are-back/` (2024) and `/building-boise-new-show-announcement/` (2026) announce the same return; both now say the show is "Luke and Clint". | Keep both for now (both are indexed on the old site and may hold press links) | 2024 post is history; 2026 post is current news. | Add a dated note at the top of the 2024 post linking to the 2026 post. Revisit after 90 days of Search Console data; merge only with approval. |
| K-C7 | `/about/` and `/luke-caldwell-faq/` both answer "who is Luke Caldwell". | `/luke-caldwell-faq/` for the person; `/about/` for the company | | `/about/` links to the FAQ with anchor "frequently asked questions about Luke Caldwell". |

### 3.3 New page candidates (not approved work)

Only build after Search Console shows impressions and a SERP read passes the four-question filter. Each needs real project photos and facts.

| Candidate URL | Keyword | Evidence needed |
|---|---|---|
| `/design-and-build/custom-homes/` | custom home builder Boise | Impressions on custom-home queries for `/design-and-build/` |
| `/design-and-build/whole-home-remodels/` | whole home remodel Boise | Same |
| `/design-and-build/historic-home-renovation/` | historic home renovation Boise | Same, plus the North End projects as proof |
| `/design-and-build/kitchen-remodel/` | kitchen remodel Boise | Same |

---

## 4. Individual page findings

Check codes, in this order on every page: **St** status 200, **Ix** indexable on production (staging noindex is expected), **Cn** self canonical, **Sm** in sitemap, **Ti** title, **Md** meta description, **H1** single keyword H1, **Hd** heading order, **Ab** answer block in the opening, **Sd** structured data, **Im** images and alt, **Ln** internal links in and out, **Ct** primary CTA, **Mo** mobile, **Pf** performance. Values: P passed, F failed, B blocked, N not run. Template issues (T-x, E-x) apply as listed in section 2 and are not repeated here.

### Home `/`
St P · Ix P · Cn P · Sm P · Ti F · Md F · H1 F · Hd F (T-3) · Ab F · Sd P · Im P · Ln P · Ct P · Mo P · Pf P (93)
- Title (69 chars, unsupported "Premier"). New title: `Timber + Love | Boise Design-Build by HGTV's Luke Caldwell`
- Meta (192). New meta: `Timber + Love is a Boise design-build firm led by HGTV's Luke Caldwell. Custom homes and luxury remodels, designed and built by one team. Start here.`
- H1 is only the brand ("Timber + Love"). New H1: `Timber + Love: Luxury Custom Homes and Remodels in Boise` (keep the wordmark visual; the H1 text can sit visually under it).
- Opening line C-1. New first sentence: `Timber + Love is a Boise design-build firm that designs and builds custom homes and luxury remodels, led by Luke Caldwell of HGTV's Boise Boys.`
- Add the anchor "design-build in Boise" to `/design-and-build/` (K-C1) and a contextual link to `/reviews/` beside the CTA.
- Preserve: project-led layout, the three-step "Get Started" block, the single questionnaire CTA.

### Design + Build `/design-and-build/`
St P · Ix P · Cn P · Sm P · Ti P · Md F · H1 F · Hd F (T-3) · Ab P · Sd P (Service, FAQPage, Breadcrumb) · Im P · Ln F · Ct P · Mo P · Pf P (91)
- Title is acceptable; stronger: `Boise Design-Build | Custom Homes and Remodels | Timber + Love`
- Meta (112). New meta: `Design-build in Boise for custom homes, whole-home remodels, kitchens and additions. One team designs and builds your home, led by Luke Caldwell. Start now.`
- H1 "Your Home. Thoughtfully Designed. Beautifully Built." has no keyword. New H1: `Design-Build in Boise, From First Sketch to Final Walkthrough`
- First sentence: `Timber + Love is a design-build firm in Boise that designs and builds custom homes and remodels under one roof.`
- Links out missing: add contextual links to `/service-areas/` (anchor "homes across the Treasure Valley"), `/financing/` (anchor "how clients pay for a project"), and the two weakly linked projects `/projects/promise-lane-modern-farmhouse/`, `/projects/promise-lane-contemporary/`.
- Preserve: FAQ block and schema, the service-type H3 list.

### Our Process `/our-process/`
St P · Ix P · Cn P · Sm P · Ti P · Md P · H1 F · Hd F (T-3; two H3s repeat "Concept Development", "Design Development") · Ab P · Sd P · Im P · Ln P · Ct P · Mo P · Pf N (template)
- Title: `Design-Build Process | What Happens and When | Timber + Love`
- H1: `Our Design-Build Process, Step by Step`
- Rename the duplicate photo-section H3s to captions ("Concept sketches", "Selections in progress") or `<p>`.
- Add FAQ "What is the difference between design-build and hiring an architect and a contractor separately?" with a 50-word answer from the team.
- Add link to `/financing/` in the "Pricing & Construction Planning" step.

### Service Areas `/service-areas/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 F · Hd F (T-3) · Ab P · Sd P · Im P · Ln F (zero contextual inlinks) · Ct P · Mo P · Pf N
- Title: `Treasure Valley Design-Build | Boise to Eagle | Timber + Love`
- H1: `Design-Build Across Boise and the Treasure Valley`
- Local substance: for each city named, add one real project or neighborhood fact; if none exists for a city, mention it in the list only. Do not create city pages.
- Inlinks to add: from `/design-and-build/` and `/about/`.

### Questionnaire `/design-and-build-questionnaire/`
St P · Ix P · Cn P · Sm P · Ti P · Md P · H1 P · Hd F (T-3) · Ab P · Sd F (E-5) · Im P · Ln P (61 inlinks) · Ct P · Mo P · Pf N
- Form is an iframe on another host, so its questions are not page content. That is acceptable for a transactional page.
- K-1 conversion tracking. Add a one-line expectation under the H1 if the team can commit: "We reply within one business day." (only if true).
- Preserve: "What Happens Next" three steps.

### Financing `/financing/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 F · Hd F (T-3) · Ab F · Sd P · Im P · Ln F (zero contextual inlinks) · Ct P · Mo P · Pf N
- Title: `How to Finance a Remodel or Custom Home | Timber + Love`
- H1: `How to Finance a Remodel or Custom Home in Boise`
- Answer block (first 50 words): `Most Boise homeowners pay for a remodel or custom home with savings, a home equity loan or HELOC, a renovation loan, or a construction loan. The right choice depends on your equity, timeline and project size. Talk to a lender early, and use a realistic project budget.`
- Inlinks from `/our-process/` and `/design-and-build/`.

### Reviews `/reviews/`
St P · Ix P · Cn P · Sm P · Ti F · Md F · H1 P · Hd F (T-3) · Ab F · Sd F (no Review data, correct until reviews are on page) · Im P · Ln F · Ct P · Mo P · Pf N
- Thin (111 words), C-5.
- Title: `Timber + Love Reviews | Boise Design-Build Clients`
- Meta: `Read Timber + Love reviews from Boise homeowners on custom homes and remodels, see the homes behind them, and leave your own review on Google.` (verify 150 to 160 after edits)
- Inlinks from `/` and `/design-and-build/` near the CTA.

### Journal `/journal/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 P · Hd F (T-3) · Ab P · Sd P · Im P · Ln P · Ct P · Mo P · Pf N
- Title: `Journal | Luke Caldwell and Timber + Love News`
- Preserve: card list linking every article (the only inlink for each article today).

### Buy or Sell `/buy-or-sell/`
St P · Ix P · Cn P · Sm P · Ti P · Md P · H1 P · Hd F (T-3; two H2s "Find a Home That Fits Your Life") · Ab P · Sd F (E-5) · Im P · Ln P · Ct P · Mo P · Pf N
- Duplicate H2 and H3 text "Find a Home That Fits Your Life": rename the H3 to "Buy".
- Title: `Timber + Love Realty | Buy or Sell a Home in Boise` (K-C4)

### Sell for Cash `/sell-for-cash/`
St P · Ix P · Cn P · Sm P · Ti P · Md P · H1 P · Hd F (T-3) · Ab P · Sd F (E-5) · Im P · Ln P · Ct P · Mo P · Pf N
- Keyword blocked on K-C4. If kept: title `Sell Your House for Cash in Boise | Timber + Love`, H1 `Sell Your Boise Home for Cash`.

### Invest `/invest/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 F · Hd F (T-3) · Ab F · Sd F (E-5) · Im P · Ln F (no contextual inlinks except About) · Ct P · Mo P · Pf N
- Title: `Boise Real Estate Investment | With Timber + Love`
- H1: `Invest in Boise Real Estate`
- Answer block: say plainly who the investment information is for and what happens on the affiliated site, in two sentences. Do not state returns.

### About `/about/`
St P · Ix P · Cn P · Sm P · Ti F · Md F (200) · H1 F · Hd F (T-3) · Ab P · Sd F (E-1) · Im P · Ln P · Ct P · Mo P · Pf N
- Title: `About Timber + Love | Boise Design-Build Since 2015`
- Meta: `Timber + Love is a Boise design-build and real estate brand founded in 2015 and led by Luke Caldwell of HGTV's Boise Boys. Meet the team and our story.`
- H1: `About Timber + Love: One Boise Team for Every Stage of Home`
- Add Person schema (E-1) and contextual links to all three entity articles (K-C7).

### Contact `/contact/`
St P · Ix P · Cn P · Sm P · Ti F · Md F (181) · H1 P · Hd F (T-3) · Ab P · Sd F (E-5) · Im P · Ln P · Ct P · Mo P · Pf N
- Title: `Contact Timber + Love | Boise Design-Build and Real Estate`
- Meta: `Contact Timber + Love in Boise at (208) 995-9516 or 3024 W Fairview Ave. Choose design-build, real estate, a cash offer or a vacation stay and we will reply.`
- K-2 call tracking.

### Gallery `/timber-and-love-gallery/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 F · Hd F (T-3) · Ab P · Sd F (E-5) · Im P · Ln **F (S-4)** · Ct P · Mo P · Pf N
- S-4 is the most important internal-linking fix on the site.
- Title: `Our Work | Boise Custom Homes and Remodels | Timber + Love`
- H1: `Our Work: Custom Homes and Remodels With a Story`

### Shows `/shows/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 F · Hd F (T-3) · Ab P · Sd F (E-5; no TVSeries data) · Im P · Ln P · Ct P · Mo P · Pf N
- Title: `Boise Boys Episodes and Where to Watch | Timber + Love`
- H1 "Good Homes.Great Stories." has no keyword and renders without a space in raw text. New H1: `Boise Boys, Outgrown and Luke and Clint: Every Episode`
- Add `TVSeries` JSON-LD for Boise Boys and Outgrown (name, actor Person refs, `sameAs` to the HGTV and discovery+ pages already linked).
- Add links to the two show announcement posts.
- Preserve: 1,298-word server-rendered episode catalog with watch links.

### The Boise Boys `/the-boise-boys/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 P · Hd F (T-3) · Ab F (C-4) · Sd F (E-5) · Im P · Ln P · Ct P · Mo P · Pf N
- Title: `Boise Boys Homes | HGTV Renovations in Boise | Timber + Love`
- New first paragraph: `The Boise Boys are Luke Caldwell and Clint Robertson, whose HGTV series followed their renovations of Boise homes. Timber + Love is Luke's design-build firm, and these are the homes from the show, with photos and the story behind each one.`
- Add FAQ "Who are the Boise Boys?" and "Can you stay in a Boise Boys home?" (answer: The Firehouse, link to `/the-firehouse/`).

### Stay With Us `/stay-with-us/`
St P · Ix P · Cn P · Sm P · Ti F · Md P · H1 P · Hd P · Ab P · Sd F (E-5) · Im P · Ln P · Ct P · Mo P · Pf N
- Title: `Vacation Rentals in Boise, McCall and Oahu | Timber + Love`
- K-C3 consolidation.

### Compare Vacation Homes `/vacation-rentals/`
St P · Ix P · Cn P · Sm P · Ti P · Md P · H1 P · Hd F (T-3) · Ab P · Sd F (E-5) · Im P · Ln F (1 inlink) · Ct P · Mo P · Pf N
- Disposition: **consolidate** into `/stay-with-us/` (K-C3, approval required).

### Rental pages (template)
`/the-firehouse/`, `/the-darla-house/`, `/timber-and-love-chalet/`, `/chinamans-ocean-front-beach-house/`, `/caldwell-beach-house/`
St P · Ix P · Cn P · Sm P · Ti F (K-C2) · Md F (4 of 5 long) · H1 P · Hd F (T-3, T-4) · Ab P · Sd P (LodgingBusiness, Breadcrumb; E-7) · Im F (C-6) · Ln F (no link to the matching project page) · Ct P (booking hand-off tracked) · Mo P · Pf P (92)

| URL | New title | New meta |
|---|---|---|
| `/the-firehouse/` | `The Firehouse Boise Rental \| As Seen on HGTV \| Timber + Love` | `Stay in The Firehouse, a historic North End Boise firehouse renovated on HGTV's Boise Boys. Sleeps 6 with 3 bedrooms and 2 baths. Check dates and book.` |
| `/the-darla-house/` | `Darla House \| North End Boise Cottage Rental \| Timber + Love` | `The Darla House is a bright North End Boise cottage for up to 4 guests, renovated by the Timber + Love team. See photos, amenities and check your dates.` |
| `/timber-and-love-chalet/` | `Cabin Rental Near McCall \| The Chalet by Timber + Love` | `The Chalet is a cabin rental in New Meadows near McCall, styled by Luke Caldwell of HGTV's Boise Boys. Sleeps 10 with 3 bedrooms. Check dates and book.` |
| `/chinamans-ocean-front-beach-house/` | `Kualoa Beach House \| Oceanfront Oahu Rental \| Timber + Love` | `The Kualoa Beach House is an oceanfront Oahu rental between Kualoa Ranch and the Pacific, sleeping 8 with 3 bedrooms. See photos and check your dates.` |
| `/caldwell-beach-house/` | `Caldwell Beach House \| Ka'a'awa Oahu Rental \| Timber + Love` | `The Caldwell Beach House in Ka'a'awa, Oahu sleeps 11 with 4 bedrooms and 2 baths, with ocean and mountain views. See photos and check availability.` |

- Kualoa slug: the URL still says "chinamans", a place name the site itself retired (the island is now called Mokoliʻi). Keep it for now (indexed, possible links). **Approval required** option: 301 to `/kualoa-beach-house/` at cutover, when every URL is being re-crawled anyway, and update the sitemap and all internal links.
- Add "See how we renovated it" linking to `/projects/the-firehouse/`, `/projects/the-darla-house/`, `/projects/the-chalet/`, `/projects/kualoa-beach-house/` from each matching rental.
- `/caldwell-beach-house/` has only three linking pages: include it in every rental's "Other rentals" block (show all four others instead of three).

### Journal articles (template)
St P · Ix P · Cn P · Sm P · Ti F (T-5) · Md P · H1 P · Hd F (T-3, T-4) · Ab P · Sd F (E-6) · Im P · Ln F (only inlink is `/journal/`) · Ct P · Mo P · Pf P (98)

| URL | New title | Extra fixes |
|---|---|---|
| `/timber-love-story-boise/` | `The Timber + Love Story \| Why Luke Caldwell Built It` | Meta says "prominent Boise design + build company" (claim); replace with "how Luke Caldwell started Timber + Love in Boise in 2015". Inlink from `/about/`. |
| `/luke-caldwell-faq/` | `Luke Caldwell FAQ \| HGTV Boise Boys Designer \| Timber + Love` | E-1, E-2, C-3. Meta (115): `Who is Luke Caldwell? Answers about the HGTV Boise Boys designer, his Timber + Love design-build firm, his design philosophy and what he is working on now.` Link to lukecaldwell.com. Inlinks from `/about/`, `/the-boise-boys/`. |
| `/luke-caldwell-boise-community/` | `Luke Caldwell in the Boise Community \| Timber + Love` | C-3. Inlink from `/about/`. |
| `/building-boise-new-show-announcement/` | `Luke and Clint Reunite for Building Boise \| Timber + Love` | T-4. Inlink from `/shows/`. |
| `/boise-boys-are-back/` | `The Boise Boys Are Back \| Luke and Clint's New Show` | K-C6 dated note at top. Inlink from `/shows/`. |

### Project case studies (template)
All 12 `/projects/*/`
St P · Ix P · Cn P · Sm P · Ti F · Md F (2 long) · H1 P · Hd F (T-3) · Ab P · Sd F (Breadcrumb only; acceptable) · Im P (descriptive alt) · Ln F (5 pages have 1 to 3 inlinks) · Ct P · Mo P · Pf **F (82)**
- Text overlap between case studies is 30 to 32 percent (shared template sections), under the 70 percent duplicate threshold. Each has 215 to 263 words of body copy. Disposition: **keep and improve**. Add one factual line per project from the business (scope, year, square feet, or the problem solved) when available; do not invent.
- P-1 performance.
- Weakly linked: `promise-lane-modern-farmhouse` (1), `the-darla-house` (2), `the-chalet` (2), `kualoa-beach-house` (2), `promise-lane-contemporary` (3), `the-firehouse` (3). S-4 plus the rental reverse links fix all six.

| URL | New title |
|---|---|
| `/projects/promise-lane-spanish-modern/` | `Spanish Modern Custom Home in Idaho \| Timber + Love` |
| `/projects/promise-lane-modern-farmhouse/` | `Modern Farmhouse Custom Home in Idaho \| Timber + Love` |
| `/projects/promise-lane-contemporary/` | `Butterfly Roof Contemporary Home in Idaho \| Timber + Love` |
| `/projects/casa-de-boise/` | `Casa De Boise \| Whole-Home Remodel on HGTV \| Timber + Love` |
| `/projects/the-firehouse/` | `Firehouse Renovation in Boise \| Boise Boys \| Timber + Love` |
| `/projects/central-rim/` | `Central Rim Home Remodel in Boise \| Timber + Love` |
| `/projects/stucco-in-time/` | `Stucco in Time \| Boise Boys Home Remodel \| Timber + Love` |
| `/projects/due-for-a-raze/` | `Due for a Raze \| Boise Boys Home Remodel \| Timber + Love` |
| `/projects/north-end-gem/` | `North End Gem \| Historic Boise Home Remodel \| Timber + Love` |
| `/projects/the-darla-house/` | `Darla House Cottage Renovation in Boise \| Timber + Love` |
| `/projects/the-chalet/` | `Chalet Cabin Renovation in New Meadows \| Timber + Love` |
| `/projects/kualoa-beach-house/` | `Kualoa Beach House Renovation on Oahu \| Timber + Love` |

Shorten the two long metas: `/projects/the-firehouse/` (211) and `/projects/promise-lane-spanish-modern/` (190) to the first sentence plus "See the photos."

### Legal pages `/privacy-policy/`, `/terms-and-conditions/`
St P · Ix P (intentionally noindex, follow) · Cn P · Sm **F (S-3)** · rest N (not search-targeted)
- Terms meta is 42 characters; harmless while noindexed.

---

## 5. Internal links to add

| Source URL | Destination URL | Anchor text |
|---|---|---|
| `/` | `/design-and-build/` | design-build in Boise |
| `/` | `/reviews/` | read what our clients say |
| `/design-and-build/` | `/service-areas/` | homes across the Treasure Valley |
| `/design-and-build/` | `/financing/` | how clients pay for a project |
| `/design-and-build/` | `/projects/promise-lane-modern-farmhouse/` | modern farmhouse on Promise Lane |
| `/design-and-build/` | `/projects/promise-lane-contemporary/` | contemporary home with a butterfly roof |
| `/design-and-build/` | `/reviews/` | client reviews |
| `/our-process/` | `/financing/` | financing options |
| `/about/` | `/service-areas/` | where we work |
| `/about/` | `/timber-love-story-boise/` | the full Timber + Love story |
| `/about/` | `/luke-caldwell-faq/` | frequently asked questions about Luke Caldwell |
| `/about/` | `/luke-caldwell-boise-community/` | how Luke gives back in Boise |
| `/the-boise-boys/` | `/luke-caldwell-faq/` | Luke Caldwell |
| `/the-boise-boys/` | `/the-firehouse/` | stay in The Firehouse |
| `/shows/` | `/building-boise-new-show-announcement/` | the Building Boise announcement |
| `/shows/` | `/boise-boys-are-back/` | when the Boise Boys came back |
| `/shows/` | `/the-boise-boys/` | the homes from the show |
| `/the-boise-boys/` | `/shows/` | every Boise Boys episode |
| `/timber-and-love-gallery/` | all 12 `/projects/*/` | project names (S-4, server-rendered) |
| `/the-firehouse/` | `/projects/the-firehouse/` | see how we renovated the Firehouse |
| `/the-darla-house/` | `/projects/the-darla-house/` | see the Darla House renovation |
| `/timber-and-love-chalet/` | `/projects/the-chalet/` | see the Chalet renovation |
| `/chinamans-ocean-front-beach-house/` | `/projects/kualoa-beach-house/` | see the Kualoa renovation |
| each rental | `/caldwell-beach-house/` | The Caldwell Beach House |
| `/boise-boys-are-back/` | `/building-boise-new-show-announcement/` | the 2026 Building Boise announcement |

Rules: at most five in-body links into money pages per donor; one exact-match anchor per target per round.

---

## 6. Prioritized action plan

Ordered by what most improves relevant visibility, qualified traffic and leads. "Approval" means you decide before it ships.

### Phase 0: before or at domain cutover (protects existing rankings)

| # | Action | IDs | Effort | Approval |
|---|---|---|---|---|
| A-1 | Verify production hosts are indexable and admin is not, immediately after DNS moves | S-1 | 10 min | No |
| A-2 | Remove `NEXT_PUBLIC_SHARE_IMAGE_ORIGIN`, republish | S-2 | 5 min | No |
| A-3 | 301 `/design-build` and `/design-build/` to `/design-and-build/` in `next.config.mjs` (one hop) | Inventory | 5 min | No |
| A-4 | 301 `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml`, `/category-sitemap.xml` to `/sitemap.xml`; then in Search Console remove the old sitemap and submit `/sitemap.xml` | Inventory | 15 min | No |
| A-5 | Remove legal pages from the sitemap; use real `lastmod` dates | S-3, S-5 | 20 min | No |
| A-6 | Server-render the gallery project grid | S-4 | 1 to 2 h | No |
| A-7 | Fix `/admin/login/` metadata: `robots: noindex`, own title, no canonical | Inventory | 10 min | No |
| A-8 | Decide the Kualoa slug and `/vacation-rentals/` consolidation now, so redirects ship with the cutover instead of later | K-C3, Kualoa | 1 h | **Yes** |

### Phase 1: first two weeks after cutover (highest leverage on rankings and leads)

| # | Action | IDs | Effort |
|---|---|---|---|
| A-9 | Add `/llms.txt` and named AI crawler blocks | A-9, A-10 | 1 h |
| A-10 | Track questionnaire submissions and phone taps as GA4 key events | K-1, K-2 | 2 h (both repos) |
| A-11 | Rewrite titles, metas and H1s on the money and entity pages: `/`, `/design-and-build/`, `/service-areas/`, `/our-process/`, `/financing/`, `/about/`, `/the-boise-boys/`, `/shows/`, `/luke-caldwell-faq/` | T-1, T-2, section 4 | 2 h |
| A-12 | Remove unsupported claims and confirm "over 20 years" | C-1, C-2, C-3 | 30 min plus Luke's answer |
| A-13 | Person entity, FAQPage on the Luke FAQ, dark logo, sameAs, breadcrumbs everywhere | E-1 to E-5 | 2 h |
| A-14 | Make `/estimate` and `/investment-planner` permanent (308) if the planner is retired | Inventory | 5 min |
| A-15 | Add the internal links in section 5 | Section 5 | 1 h |
| A-16 | Footer headings to `<p>`; remove duplicate H1/H2 on rentals and articles | T-3, T-4 | 30 min |

### Phase 2: weeks 3 to 6

| # | Action | IDs | Effort |
|---|---|---|---|
| A-20 | Remaining titles and metas (rentals, projects, articles, utility pages) | Section 4 | 1 h |
| A-21 | Reviews page with real attributed review excerpts | C-5 | 1 h plus review selection |
| A-22 | Rental alt text and LodgingBusiness locality and occupancy | C-6, E-7 | 1 h |
| A-23 | Project template performance (lazy gallery hydration, hero preload) | P-1, P-2 | 2 h |
| A-24 | Article bylines and dates | E-6 | 30 min |
| A-25 | Shows TVSeries schema | Shows | 30 min |

### Phase 3: day 28 onward (data driven)

| # | Action | Trigger |
|---|---|---|
| A-30 | Pull 28 days of Search Console data; validate every keyword in section 3; run the striking-distance and CTR-under-1-percent checks | 28 days after cutover |
| A-31 | Decide K-C4 (bridge pages vs affiliated domains) and K-C6 (announcement posts) | A-30 data |
| A-32 | Build any new service subpage from section 3.3 only where queries show demand | A-30 data and SERP read |
| A-33 | Google Business Profile: website URL, services linked to `/design-and-build/`, hours added to schema | GBP access |
| A-34 | Confirm SPF and DMARC records for `timberandlove.com` | DNS access |

### Verification after each phase

1. `npm run build && npm start`, then rerun the audit crawler (no-JS) and compare: title and meta lengths, one H1, no footer headings, sitemap equals indexable 200 URLs, zero 404s on internal links.
2. Rich Results Test on `/`, `/design-and-build/`, `/luke-caldwell-faq/`, `/the-firehouse/`, one project page.
3. `curl -sI` the legacy URLs in section 1.2 and confirm a single 301 hop to a 200.
4. Lighthouse mobile on the five template samples.
5. Search Console URL Inspection on the homepage, `/design-and-build/` and the gallery after cutover; request indexing.
6. Day 14, 28 and 45: compare clicks and positions per changed page against the first 28-day baseline; roll back any title change that drops its primary query more than 3 positions for 14 days.

---

## 7. Check status totals

| Check | Passed | Failed | Blocked | Not run |
|---|---|---|---|---|
| Status, canonical, single H1, alt present, server-rendered H1 | 42 | 0 | 0 | 0 |
| Indexable on production | 42 (verified by host header) | 0 | 0 | 0 |
| Sitemap correctness | 40 | 2 | 0 | 0 |
| Title meets standard | 6 | 34 | 0 | 2 (legal) |
| Meta description length (120 to 165) | 24 | 18 | 0 | 0 |
| Keyword in H1 | 31 | 9 | 0 | 2 (legal) |
| Heading outline clean | 0 | 42 (footer H3s, T-3) | 0 | 0 |
| Structured data valid and matching | 42 parse cleanly; FAQ matches 8 of 8 | 16 missing breadcrumbs, 1 missing FAQPage | 0 | 0 |
| Internal links (linked from more than 3 pages, crawlable) | 28 | 14 | 0 | 0 |
| Lighthouse | 4 at or above 90 | 1 (82) | 0 | 37 (template covered) |
| Keyword demand and positions | 0 | 0 | 40 | 0 |
| GBP, SPF, DMARC, field Core Web Vitals | 0 | 0 | all | 0 |
