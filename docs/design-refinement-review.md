# Timber + Love design refinement

Implementation prepared on 2026-10-02. Production publishing remains with the owner in Replit.

## Status

The production build and contact-delivery tests pass. All 34 public content routes were rendered and checked in local Chrome at 1440 and 390 pixels, then checked again at 768 and 320 pixels. The final small-phone/tablet pass found no missing images or unintended horizontal overflow. Intentional swipe galleries remain scrollable. Production publishing remains with the owner in Replit.

This is a responsive implementation review, not a claim that every possible browser, viewport, media-provider condition, or future content change has been verified. No live lead was submitted; actual inbox receipt is a post-publication check.

## What changed

- Fully opaque, charcoal desktop mega menus organized into Design + Build, Home + Real Estate, and Our World; direct Work and Watch links. Mobile uses the same information architecture, expandable groups, scroll locking, focus containment, Escape, and focus restoration.
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

- Rebuilt the homepage testimonial section on black, with the film in its own uncropped 16:9 frame and readable review cards below it. A complete centered Luke Caldwell section and trust strip separate the preceding photography from the testimonials.
- Centered the Luke portrait, heading, copy, social links, and CTA.
- Removed all visible background-film pause controls while retaining reduced-motion and playback-failure fallbacks.
- Standardized the show name to “Luke and Clint” in copy, metadata, navigation, and documentation.
- Replaced the unrelated decorative-horn photograph in both the mega menu and the craft feature with actual Timber and Love architecture.
- Replaced the moving review marquee with a visitor-controlled, swipeable rail and previous/next buttons.
- Related-service cards now stack fully on phones; journal metadata wraps; adjacent closing photo bands on Journal and Reviews now have black closing sections.
- Replaced the eight-step project questionnaire with a short, labeled lead form modeled on the existing public site's form. Moved the contact form ahead of the service-routing cards. Corrected header clearance on the new inquiry page.
- Repaired false-success lead handling, field validation, provider timeouts, retry deduplication, success focus, and modal focus containment. See `lead-capture.md` for configuration and test boundaries.
- Saved three official 1280 × 720 Luke and Clint episode thumbnails locally after the remote thumbnail host failed in the review browser.

## Verification

- Production build and TypeScript checks passed.
- Contact API and existing email-delivery checks passed using mocked delivery only.
- Mobile browser form checks passed for required fields, error-state value retention, successful confirmation/focus, and stable retry IDs.
- Final production server: old planner URLs return HTTP 307 to the inquiry form, and retired planner APIs return 404.
- Static rendering: 35 pages including the not-found page; 480 image placements; no missing local assets, missing image alt attributes, duplicate IDs, broken internal destination routes, or invalid H1 counts. The two redirect pages are excluded from page-content checks.
- Responsive checks cover all 34 public content routes at 1440, 390, 768, and 320 pixels. Photographs, shared page templates, section rhythm, forms, and navigation were reviewed from the rendered output.
- Desktop mega-menu opacity and architectural image, mobile accordion/scroll locking/Escape/focus restoration, gallery next/Escape/focus restoration, and review-rail navigation passed browser checks. YouTube click-to-play creates the correct privacy-enhanced embed, and all local episode previews load.
- HGTV frames are correctly sized at 16:9 with readable captions outside the films. Local playback verification remains dependent on Vimeo availability; the player keeps its visible poster until playback is confirmed.
- No live submission, CRM mutation, account login, or production publication was performed.

## Rendered route inventory

| Route | Sections | Image placements |
| --- | ---: | ---: |
| `/_not-found/` | 1 | 3 |
| `/about/` | 15 | 15 |
| `/boise-boys-are-back/` | 2 | 7 |
| `/building-boise-new-show-announcement/` | 2 | 5 |
| `/buy-or-sell/` | 13 | 8 |
| `/chinamans-ocean-front-beach-house/` | 9 | 13 |
| `/contact/` | 7 | 5 |
| `/design-and-build-questionnaire/` | 2 | 4 |
| `/design-and-build/` | 21 | 38 |
| `/financing/` | 10 | 8 |
| `/` | 16 | 42 |
| `/invest/` | 11 | 7 |
| `/journal/` | 6 | 11 |
| `/luke-caldwell-boise-community/` | 2 | 5 |
| `/luke-caldwell-faq/` | 2 | 5 |
| `/our-process/` | 11 | 9 |
| `/privacy-policy/` | 0 | 3 |
| `/projects/casa-de-boise/` | 7 | 14 |
| `/projects/promise-lane-contemporary/` | 8 | 32 |
| `/projects/promise-lane-modern-farmhouse/` | 8 | 31 |
| `/projects/promise-lane-spanish-modern/` | 8 | 30 |
| `/projects/the-firehouse/` | 7 | 16 |
| `/reviews/` | 7 | 6 |
| `/sell-for-cash/` | 11 | 7 |
| `/service-areas/` | 10 | 11 |
| `/shows/` | 6 | 10 |
| `/stay-with-us/` | 10 | 17 |
| `/terms-and-conditions/` | 0 | 3 |
| `/the-boise-boys/` | 9 | 11 |
| `/the-darla-house/` | 10 | 13 |
| `/the-firehouse/` | 10 | 13 |
| `/timber-and-love-chalet/` | 9 | 13 |
| `/timber-and-love-gallery/` | 7 | 48 |
| `/timber-love-story-boise/` | 2 | 5 |
| `/vacation-rentals/` | 9 | 12 |
