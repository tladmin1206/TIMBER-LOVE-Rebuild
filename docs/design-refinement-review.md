# Timber + Love design refinement

Implementation prepared on 2026-10-02. Production publishing remains with the owner in Replit.

## Status

The production build and contact-delivery tests pass. All 34 public content routes were rendered and checked in local Chrome at 1440 and 390 pixels, then checked again at 768 and 320 pixels. The final small-phone/tablet pass found no missing images or unintended horizontal overflow. Intentional swipe galleries remain scrollable. Production publishing remains with the owner in Replit.

This is a responsive implementation review, not a claim that every possible browser, viewport, media-provider condition, or future content change has been verified. No live lead was submitted; actual inbox receipt is a post-publication check.

## What changed

- Fully opaque, charcoal desktop mega menus organized into Design + Build, Home + Real Estate, and About; direct Work and Watch links. Mobile uses the same information architecture, expandable groups, scroll locking, focus containment, Escape, and focus restoration.
- Following the owner’s correction, all public sections remain within the established black and charcoal palette. Architectural photography, editorial layouts, framed films, and spacing create the visual rhythm. The introduced white and cream backgrounds were removed across the site. Montserrat, uppercase headings, the monochrome brand, and existing conversion flows remain.
- Homepage Luke and Clint introduction; new `/shows/` hub with three verified full-length YouTube selections, click-to-play privacy-enhanced embeds, and direct viewing links. Navigation, footer, and sitemap include the hub.
- HGTV players fit their own 16:9 cards, with uncropped frames and captions outside the video. The official Vimeo SDK confirms playback before hiding the poster, pauses offscreen films, respects reduced motion, with no visible “Pause film” controls.
- Service ecosystem and three-step cards have relevant, individually selected background imagery with readable gradients.
- Americana Soul uses the verified photograph of Luke holding the book. Portraits and show artwork use their complete compositions. Article heroes no longer crop portraits behind overlaid titles.
- Repeated generic Casa De Boise marketing images were replaced. Casa De Boise's documentary project gallery remains accurate to that home. Property and project covers intentionally repeat when they identify the same destination.
- Rental gallery mosaic corrected to a four-column, two-row layout. Gallery dialogs contain focus and restore it on close.
- The Investment Planner is hidden from all public navigation and CTAs. Its routes redirect to the short project inquiry, its APIs return 404, and retired URLs are absent from the sitemap. Footer spacing accommodates the mobile bar, and oversized CTA rows stack until desktop.
- Old Airbnb check-in/check-out dates and tracking were removed from property booking links, preserving each listing ID.

## Photography review

Reviewed 61 photographs sampled across ten professionally edited Americana Soul collections, plus official Luke and Clint and Luke Caldwell photographs. Sources and dimensions of retained optimized WebP files are recorded in `editorial-photography.json`. This was a curated review of those collections, not a claim to have inspected every file in the entire Dropbox archive.

Official reference sites: https://lukeandclint.com, https://lukecaldwell.com/shows, https://lukecaldwell.com/businesses, and the Luke Caldwell about page for the book portrait. Episode selections were verified against the official Luke and Clint website on 2026-10-02.

## Follow-up corrections

- Restored the full-background film and responsive gradient overlay in the homepage Our Values section. The preceding Luke and Clint section retains its solid charcoal background and contained artwork; the following project invitation now has a solid black background. No full-background images or videos adjoin the values film.
- Renamed the shared desktop and mobile “Our World” navigation group to “About” for clearer wayfinding.
- Rebuilt the homepage testimonial section on black, with the film in its own uncropped 16:9 frame and readable review cards below it. A complete centered Luke Caldwell section and trust strip separate the preceding photography from the testimonials.
- Enlarged Luke’s full portrait and placed it to the left of the copy on desktop, with a centered stacked layout on phones.
- Removed all visible background-film pause controls while retaining reduced-motion and playback-failure fallbacks.
- Standardized the show name to “Luke and Clint” in copy, metadata, navigation, and documentation.
- Replaced the unrelated decorative-horn photograph in both the mega menu and the craft feature with actual Timber and Love architecture.
- Replaced the moving review marquee with a visitor-controlled, swipeable rail and previous/next buttons.
- Related-service cards now stack fully on phones; journal metadata wraps; adjacent closing photo bands on Journal and Reviews now have black closing sections.
- Replaced the eight-step project questionnaire with a short, labeled lead form modeled on the existing public site's form. Moved the contact form ahead of the service-routing cards. Corrected header clearance on the new inquiry page.
- Repaired false-success lead handling, field validation, provider timeouts, retry deduplication, success focus, and modal focus containment. See `lead-capture.md` for configuration and test boundaries.
- Saved three official 1280 × 720 Luke and Clint episode thumbnails locally after the remote thumbnail host failed in the review browser.

## Additional owner review on 2026-10-02

- The Watch page opens with the official Luke and Clint artwork. The jumping photograph now accompanies the HGTV story further down that page, with its full composition preserved.
- Added The Caldwell Beach House to both rental indexes, with its own property page, seven gallery photographs, verified capacity, and a property-specific direct booking link. Reviewed all 29 photographs in the public listing before selecting eight images, including the cover.
- Updated the existing Oahu listing to its current name, The Kualoa Beach House, and its own direct booking destination. Kept its established Timber and Love URL intact.
- Grouped the five rentals by Idaho and Hawaii. Full cards stack on phones so every property can be discovered without horizontal scrolling.
- Removed design/build testimonials and service promotions from the rental journey. Stay With Us now has guest-focused copy, booking FAQs, and a relevant closing invitation; the shared property pages no longer show contractor reviews or design/build promotions.
- Removed the entire repetitive Details & Inspiration section from Our Work and updated the page introduction. The closing invitation now uses a real Promise Lane home exterior instead of the hallway detail.
- Property facts and booking destinations were checked against https://vacationrentaloahu.co/properties and the two property booking pages on 2026-10-02. Rates and availability remain on the booking site.

## Portfolio and complete episode follow-up — October 2, 2026

- Expanded the portfolio from five to twelve distinct homes. Reviewed 69 episode-specific photographs from Timber and Love’s original media collection and selected 24 photographs for four additional HGTV projects. Added the Darla House, Chalet, and Kualoa retreat projects using their own existing property photography.
- The three portfolio collections are deliberately separate: three Custom Homes, three Renovated Retreats, and six HGTV Homes. The complete collection interleaves styles and locations instead of opening with three Promise Lane neighbors.
- Rebuilt the Service Areas portfolio section as six captioned home cards with complete desktop rows. Replaced its hardware-detail closing background with an authentic, finished Stucco in Time interior.
- Imported all 31 records from the official public catalog at https://lukecaldwell.com/api/tv-episodes, used by https://lukecaldwell.com/shows, on October 2, 2026: Boise Boys season 1 (7), season 2 (13), the Father’s Day special (1), and Outgrown season 1 (10).
- Every episode has its own locally optimized artwork, title, synopsis, original air date, and exact episode-specific Apple TV viewing URL from the source. All 31 source images were visually reviewed and have distinct file hashes. Images are contained at their natural composition so no additional crop removes faces.
- The complete catalog is rendered on the Shows page with show and season anchor navigation. Shared HGTV cards and the HGTV story page now lead directly to the relevant catalog. The three existing Luke and Clint YouTube videos remain playable inline. No public embeddable full-episode URL is supplied for the HGTV entries; the catalog links to their official viewing options rather than inventing an embed.

## Verification

- Production build and TypeScript checks passed.
- Contact API and existing email-delivery checks passed using mocked delivery only.
- Mobile browser form checks passed for required fields, error-state value retention, successful confirmation/focus, and stable retry IDs.
- Final production server: old planner URLs return HTTP 307 to the inquiry form, and retired planner APIs return 404.
- Final static rendering: 43 pages including the not-found page; 582 image placements; no missing local assets, missing image alt attributes, duplicate IDs, broken internal destination routes, or invalid H1 counts. The two redirect pages are excluded from page-content checks.
- The initial responsive audit covered all 34 original public content routes at 1440, 390, 768, and 320 pixels. Photographs, shared page templates, section rhythm, forms, and navigation were reviewed from the rendered output.
- Desktop mega-menu opacity and architectural image, mobile accordion/scroll locking/Escape/focus restoration, gallery next/Escape/focus restoration, and review-rail navigation passed browser checks. YouTube click-to-play creates the correct privacy-enhanced embed, and all local episode previews load.
- HGTV frames are correctly sized at 16:9 with readable captions outside the films. Local playback verification remains dependent on Vimeo availability; the player keeps its visible poster until playback is confirmed.
- Follow-up checks covered the changed homepage, Shows, rental indexes, both Hawaii properties, portfolio, and Service Areas at 1440, 768, 390, and 320 pixels, plus all seven new portfolio pages at desktop and phone widths. No horizontal overflow remained. All 31 episode images loaded at every width; episode links are unique and exactly match the official catalog; all 31 Apple TV URLs returned HTTP 200 in a read-only link check. Portfolio filters returned 12 / 3 / 3 / 6 projects with disjoint themed collections. All 63 new image files decode successfully.
- No live submission, CRM mutation, account login, or production publication was performed.

## Rendered route inventory

| Route | Sections | Image placements |
| --- | ---: | ---: |
| `/_not-found/` | 1 | 3 |
| `/about/` | 15 | 15 |
| `/boise-boys-are-back/` | 2 | 7 |
| `/building-boise-new-show-announcement/` | 2 | 5 |
| `/buy-or-sell/` | 13 | 8 |
| `/caldwell-beach-house/` | 7 | 13 |
| `/chinamans-ocean-front-beach-house/` | 7 | 13 |
| `/contact/` | 7 | 5 |
| `/design-and-build-questionnaire/` | 2 | 4 |
| `/design-and-build/` | 21 | 38 |
| `/financing/` | 10 | 8 |
| `/` | 16 | 41 |
| `/invest/` | 11 | 7 |
| `/journal/` | 6 | 11 |
| `/luke-caldwell-boise-community/` | 2 | 5 |
| `/luke-caldwell-faq/` | 2 | 5 |
| `/our-process/` | 11 | 9 |
| `/privacy-policy/` | 0 | 3 |
| `/projects/casa-de-boise/` | 7 | 13 |
| `/projects/central-rim/` | 7 | 14 |
| `/projects/due-for-a-raze/` | 7 | 14 |
| `/projects/kualoa-beach-house/` | 7 | 14 |
| `/projects/north-end-gem/` | 7 | 14 |
| `/projects/promise-lane-contemporary/` | 8 | 31 |
| `/projects/promise-lane-modern-farmhouse/` | 8 | 30 |
| `/projects/promise-lane-spanish-modern/` | 8 | 29 |
| `/projects/stucco-in-time/` | 7 | 14 |
| `/projects/the-chalet/` | 7 | 14 |
| `/projects/the-darla-house/` | 7 | 14 |
| `/projects/the-firehouse/` | 7 | 15 |
| `/reviews/` | 7 | 6 |
| `/sell-for-cash/` | 11 | 7 |
| `/service-areas/` | 10 | 13 |
| `/shows/` | 8 | 42 |
| `/stay-with-us/` | 6 | 17 |
| `/terms-and-conditions/` | 0 | 3 |
| `/the-boise-boys/` | 9 | 15 |
| `/the-darla-house/` | 8 | 13 |
| `/the-firehouse/` | 8 | 13 |
| `/timber-and-love-chalet/` | 7 | 13 |
| `/timber-and-love-gallery/` | 6 | 6 |
| `/timber-love-story-boise/` | 2 | 5 |
| `/vacation-rentals/` | 6 | 13 |
