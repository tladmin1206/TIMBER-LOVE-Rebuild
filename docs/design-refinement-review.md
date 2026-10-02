# Timber + Love design refinement

Implementation prepared on 2026-10-02. Production publishing remains with the owner in Replit.

## Status

Code and production rendering checks pass. **Responsive visual and interactive sign-off is still pending.** The available review browser cannot reach localhost. The owner authorized a temporary static preview, but the public tunnel could not connect. A separate local BrowserAct/Chrome attempt also failed to start in this environment. No public preview or live deployment was created.

## What changed

- Fully opaque, charcoal desktop mega menus organized into Design + Build, Home + Real Estate, and Our World; direct Work and Watch links. Mobile uses the same information architecture, expandable groups, scroll locking, focus containment, Escape, and focus restoration.
- Following the owner’s correction, all public sections remain within the established black and charcoal palette. Architectural photography, editorial layouts, framed films, and spacing create the visual rhythm. The introduced white and cream backgrounds were removed across the site. Montserrat, uppercase headings, the monochrome brand, and existing conversion flows remain.
- Homepage Luke & Clint introduction; new `/shows/` hub with three verified full-length YouTube selections, click-to-play privacy-enhanced embeds, and direct viewing links. Navigation, footer, and sitemap include the hub.
- HGTV players fit their own 16:9 cards, with uncropped frames and captions outside the video. The official Vimeo SDK confirms playback before hiding the poster, pauses offscreen films, respects reduced motion, and exposes a pause control.
- Service ecosystem and three-step cards have relevant, individually selected background imagery with readable gradients.
- Americana Soul uses the verified photograph of Luke holding the book. Portraits and show artwork use their complete compositions. Article heroes no longer crop portraits behind overlaid titles.
- Repeated generic Casa De Boise marketing images were replaced. Casa De Boise's documentary project gallery remains accurate to that home. Property and project covers intentionally repeat when they identify the same destination.
- Rental gallery mosaic corrected to a four-column, two-row layout. Gallery dialogs contain focus and restore it on close.
- Mobile planner no longer shows the unrelated Invest action. Footer spacing accommodates the mobile bar, and oversized contact-page CTA rows stack until desktop.
- Old Airbnb check-in/check-out dates and tracking were removed from property booking links, preserving each listing ID.

## Photography review

Reviewed 61 photographs sampled across ten professionally edited Americana Soul collections, plus official Luke & Clint and Luke Caldwell photographs. Sources and dimensions of retained optimized WebP files are recorded in `editorial-photography.json`. This was a curated review of those collections, not a claim to have inspected every file in the entire Dropbox archive.

Official reference sites: https://lukeandclint.com, https://lukecaldwell.com/shows, https://lukecaldwell.com/businesses, and the Luke Caldwell about page for the book portrait. Episode selections were verified against the official Luke & Clint website on 2026-10-02.

## Validation completed

- `npm run build`: production build and type validation passed.
- `npm run verify:planner`: existing pricing, calibration, flow, narrative, service, lead-delivery, and typography checks passed. No planner pricing or lead-delivery logic changed.
- Static render audit: 36 public generated pages, including five project pages and the not-found page; 484 image placements. No missing local media, duplicate IDs, missing image alt attributes, missing internal destination routes, or invalid H1 counts found.
- The server-rendered project questionnaire and internal admin pages were checked in source/build, not by submitting forms or accessing live records.
- Vimeo playback was not confirmed in the remote browser: the original live site showed a provider connection warning. The new code retains the poster on playback failure; actual provider playback needs the pending browser check.

## Required visual and interaction pass

The owner supplied a desktop screenshot confirming the unwanted cream treatment; that treatment has been removed from every public route.

At 1440, 1280, 1024, 768, 390, and 375 pixels: scroll every public route from header through footer, check photography and text contrast, inspect all responsive image crops, and verify section cadence. Check desktop menu click/Tab/Escape/outside dismissal; mobile menu scrolling, focus restoration and accordions; all gallery controls; carousel pause; YouTube play/fullscreen/fallback links; Vimeo framing/play/pause/reduced-motion/fallback; planner flow and inquiry validation without submitting real leads. Do not mark this review complete until those checks have been observed.

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
| `/design-and-build/` | 21 | 38 |
| `/estimate/` | 0 | 0 |
| `/financing/` | 10 | 8 |
| `/` | 16 | 42 |
| `/invest/` | 11 | 7 |
| `/investment-planner/` | 8 | 6 |
| `/journal/` | 6 | 12 |
| `/luke-caldwell-boise-community/` | 2 | 5 |
| `/luke-caldwell-faq/` | 2 | 5 |
| `/our-process/` | 11 | 9 |
| `/privacy-policy/` | 0 | 3 |
| `/projects/casa-de-boise/` | 7 | 14 |
| `/projects/promise-lane-contemporary/` | 8 | 32 |
| `/projects/promise-lane-modern-farmhouse/` | 8 | 31 |
| `/projects/promise-lane-spanish-modern/` | 8 | 30 |
| `/projects/the-firehouse/` | 7 | 16 |
| `/reviews/` | 7 | 7 |
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
