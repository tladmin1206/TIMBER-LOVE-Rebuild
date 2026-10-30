# Timber and Love: full-site design, UX, and CRO audit

October 2, 2026. Review of the current Git repository prepared for the owner to pull into Replit. This is an implementation and heuristic review, not a measured conversion study. Production has not been republished.

## Overall assessment

The brand direction is strong. The most useful improvements are clearer journeys, tighter editing, stronger service-specific proof, and more deliberate media placement. A new visual identity is unnecessary. Preserve Montserrat, black and charcoal surfaces, generous typography, authentic homes, and the existing film treatment. No white or cream section backgrounds were introduced.

The site serves several different intentions. A project prospect needs qualification and confidence; a guest needs property details and availability; a viewer needs a playable episode; a seller needs the correct offer or brokerage destination. Each journey should have its own primary action. A construction inquiry is not the appropriate conversion for every visitor.

## Changes included with this audit

| Issue observed | Improvement implemented | Why it matters |
| --- | --- | --- |
| Six Contact routing cards were plain and visually interchangeable | Relevant photographs on all six cards, with consistent dark reading gradients | Makes the services easier to distinguish without sacrificing legibility |
| Similar plain service/process cards appeared elsewhere | Shared photographic treatment across Design + Build, financing options, real estate, cash-sale steps, investing, related services, and next-step cards | Gives each subject visual context while preserving one design system |
| Work With Us used a different, short inquiry form | Both the questionnaire page and Work With Us dialog now embed the existing hosted Timber and Love questionnaire | Preserves the requested fields, conditional steps, validation, and lead workflow |
| Contact placed the generic form before the service choice | Service routing comes first, with separate hero shortcuts to the general form | Helps visitors reach the right team; direct general-contact links still bypass the cards |
| Contact inserted a promotional home section between the form and follow-up expectations | Removed that interruption and made the follow-up copy appropriate to general inquiries | Keeps the contact journey focused and avoids treating every inquiry as a remodel |
| Design + Build ended with three successive project invitations | Removed two redundant closing sections | FAQ now leads to one clear closing action |
| Financing repeated the same aspirational message in three consecutive sections | Kept one architectural editorial section and removed two repetitions | Funding information and FAQs arrive sooner |
| Reviews repeated the rating in three adjacent areas and repeated the closing pitch | Retained the rating with the actual review wall; removed redundant bands | Visitors get to the reviews sooner |
| About repeated Luke's introduction late in the page | Removed the second founder profile | Retains the full early portrait and biography without retelling the introduction |
| Journal had consecutive closing promotions | Removed the extra photo promotion | Restores a cleaner transition from stories to one invitation |
| A cash-offer CTA led to general Contact | It now leads to the same cash-offer destination as the other cash CTAs | Removes an unnecessary routing step |
| The portfolio's closing secondary action linked back to the portfolio itself | Changed it to Our Process | Gives interested visitors a useful next step |
| Rental indexes sent visitors to another index to browse the same homes | Added in-page property and regional anchors; added missing Firehouse and Chalet exploration links | Reduces loops and makes each photographed property actionable |
| Mobile property booking returned visitors to the listing index; Caldwell was unrecognized | All five properties now use their exact booking URL in the mobile bar | Preserves the visitor's selected property through the handoff |
| Mobile actions were generic on supporting design pages and Watch | Design pages lead to Start Project; Watch has show-specific navigation | Matches the next action to the page's intent |
| Sales actions remained pinned while reading legal pages | Removed the mobile conversion bar on those pages | Gives policy content an uninterrupted reading area |

Forms, review quotations, FAQs, and detailed factual information retain plain reading surfaces where photography would reduce usability. Decorative card photography is hidden from assistive technology because the adjacent heading supplies its meaning. Photographs containing people use contained compositions in the new cards.

## Prioritized next improvements

### Priority 1: resolve before the production-domain cutover

1. **Confirm both lead pipelines end to end.** The design/build questionnaire is owned by `leads.timberandlove.com`; general inquiries use this app's Resend endpoint. Confirm one clearly labeled test inquiry in each intended inbox/CRM and complete the scheduling handoff. The review did not send a real lead or email. See [lead-capture.md](lead-capture.md).
2. **Give legacy media a permanent origin.** `next.config.mjs` currently proxies `/wp-content/` to `https://timberandlove.com` unless `ASSET_ORIGIN` is set. This works while the original WordPress site serves those files. Before pointing that domain to this app, move the assets or set a verified, separate media origin. Otherwise the proxy can point back to itself.
3. **Verify public proof figures.** The source still marks homepage experience, sales volume, home count, and HGTV count as requiring business confirmation. The `35+ HGTV Episodes` statistic also needs reconciliation with the 31 entries supplied by the reference catalog. Google rating/count are static. Confirm scope and freshness; do not silently manufacture updated numbers.
4. **Confirm attribution across domains.** The hosted questionnaire posts its submission event only to the production Timber and Love origins. Replit's parent page will not receive that event. A submission count on the preview therefore cannot be inferred from parent-page analytics. Coordinate allowed origins and reporting in the lead application before using funnel reports to judge CRO.

### Priority 2: highest-value content and flow work

| Proposal | Pages | Rationale and boundary |
| --- | --- | --- |
| Make the main design service page substantially shorter | Design + Build | It still has 19 top-level sections. Keep services, representative work, a concise process, proof, FAQ, and one close. Merge the craft/materials repetitions and condense the three detailed process panels. Preserve the strongest film rather than adding more background media. |
| Match proof to the service being considered | Buy or Sell, Sell for Cash, Invest, project pages | Shared homeowner reviews provide broad brand reassurance but do not establish cash-sale speed, investor outcomes, or a specific project result. Use verified service-specific quotes and label each relationship accurately. Do not invent testimonials or imply investment returns. |
| Turn galleries into stronger case studies | All 12 project pages | Add an approved brief, design challenge, response, and outcome. Include dates, scale, or budget only when confirmed and appropriate to publish. Relate those facts to the images visitors are seeing. |
| Improve related-project relevance | All project pages | The current selector takes the first three distinct homes in the registry, so many pages recommend the same homes. Rank by shared scope/style, then diversify the location or collection. Preserve the existing exclusion of the current home and repeated Promise Lane neighbors. |
| Tighten the homepage conversion sequence | Home | The brand story, portfolio, shows, values, process, and book all have a role, but the page is long. Test moving the three-step explanation closer to the first project invitation and reducing repeated project prompts. Keep solid sections directly above and below the restored Values film. |
| Clarify the two rental indexes | Stay With Us, Vacation Rentals, mega menu | Both display the same five homes. Consider making Stay With Us the narrative entry and Vacation Rentals a compact comparison view with destination and verified capacity. Decide URL/canonical strategy from search data before redirecting either established route. |
| Add comparable booking facts | Rental indexes and three Idaho properties | Oahu cards show capacity; Idaho cards do not yet provide the same comparable facts. Confirm guests, bedrooms, bathrooms, parking, and accessibility information, then apply one facts layout. Keep live pricing and date availability on the booking provider. |
| Reduce the Watch page's scroll burden while keeping every episode available | Shows | Retain the complete 31-record HGTV catalog and inline Luke and Clint players. Consider a show/season filter with a clear result count and shareable selection. Keep direct episode links and a visible route back to the full collection. |
| Give historical show stories a current next step | Two show announcement articles | Preserve their original dates and historical titles; add a short, clearly labeled update linking to the current Luke and Clint episodes. The shared construction CTA is too abrupt for a visitor who came to watch. |
| Simplify general-contact length further if visitors struggle | Contact | Measure whether the six-card router delays genuine general inquiries. The hero's Send a General Inquiry shortcut provides a direct path now. Test a compact service selector before changing the visual cards again. |

### Priority 3: refinement and maintenance

- Use specific button labels tied to the destination. Keep one dominant action per section, with a lower-commitment alternative only when useful. Avoid sending the same visitor through another general landing page when a selected destination is known.
- Preserve full faces and heads. The new people cards use `object-contain`; portraits, show artwork, and episode artwork should remain composition-safe. Validate any replacement photograph at the actual slot ratio, including narrow phones. Automated checks cannot certify every face crop.
- Continue reducing decorative image reuse. Shared property covers and project thumbnails are useful identifiers; repeating a generic closing interior across many unrelated pages is less useful. Maintain an image-usage inventory when adding photography, and avoid taking several new images from one house simply because they match in color.
- Keep long paragraphs off photographs. New photo cards have a visible photographic opening and an increasingly opaque dark lower area. Long forms, quotes, FAQs, and legal copy work better on black/charcoal.
- Keep video framed when its content matters. HGTV clips use contained 16:9 frames and captions outside them. Full-background films should alternate with solid editorial sections. Preserve reduced-motion behavior and visible fallback posters; no Pause film buttons were added.
- Use measured mobile performance to choose media work. Review image transfer sizes, responsive variants, and below-fold player loading on the deployed domain. This audit did not run a controlled Lighthouse/Core Web Vitals benchmark, so it does not assign an unsupported performance score.
- Review the source and date of every testimonial, metric, rental fact, and show link periodically. A polished page loses trust quickly when its facts are stale.

## CRO measurement plan

Treat clicks, leads, qualified opportunities, and bookings as different events. No conversion uplift is claimed from these changes.

| Journey | Useful sequence to measure | Primary outcome | Guardrail |
| --- | --- | --- | --- |
| Design/build | Landing → work/process → questionnaire start → completed questionnaire → team qualification | Qualified project inquiries per eligible visit | Lead quality, abandonment by step, duplicate submissions, response time |
| General contact | Contact arrival → service choice or form start → accepted submission | Successfully delivered, correctly routed inquiries | Delivery failures, repeat attempts, misrouted services |
| Realty/cash/invest | Service page → selected affiliated destination → downstream inquiry | Qualified inquiry at the receiving business | Distinguish an outbound click from a completed inquiry |
| Vacation stays | Index → property → availability handoff → provider booking | Completed booking when provider reporting is available | Property-specific handoff, date availability, returning visitors |
| Watch | Show selection → episode play → meaningful viewing → optional portfolio visit | Successful viewing/engagement | No forced construction lead gate |
| Journal/About | Read → relevant next page → later inquiry or viewing | Assisted engagement | Avoid assessing every reader as an immediate sales lead |

First establish event integrity and a baseline split by device, source, and intent. Then test one major change at a time. Highest-priority experiments: shorter Design + Build flow, earlier process clarity on Home, and relevant proof before service handoff. Define sample requirements from actual traffic and baseline conversion, and judge qualified outcomes rather than a short-lived increase in button clicks.

## Review method and boundaries

The route review covers all 42 public content pages, their ordered sections, shared navigation/footer, primary actions, and page-to-page transitions. The static build also includes the not-found page. Admin screens and the retired planner are not public conversion journeys.

Rendered checks cover 1440, 768, 390, and 320 pixel viewports. Each content page was loaded in Chrome and scrolled through its sections to inspect horizontal overflow, image loading, H1 count, same-page anchors, and mobile action destinations. Static checks cover local assets, alt attributes, duplicate IDs, internal routes, and cross-page hash targets. Changed layouts and representative shared templates receive additional screenshot review. This is not an assertion that every section was manually inspected in every browser or that every possible responsive crop is flawless.

The live reference questionnaire was inspected without submitting it. Its embedded application remains independently hosted. Browser-level resize/fallback tests are separate from actual lead delivery. No live lead, booking, email, production deployment, or account mutation was performed during this audit.

## Page-by-page decisions

The following inventory records the primary goal, recommended flow, and remaining opportunity for every public content route. The ordered section ledger afterward makes the current implementation reviewable section by section.

| Page | Primary goal | Recommended flow | Decision / next improvement |
| --- | --- | --- | --- |
| `/about/` | Build trust and route to the appropriate service | Origin → business ecosystem → people → design point of view → shows/book → contact | The duplicate founder profile is removed. Keep the business cards close to the origin story. Combine overlapping design/philosophy sections in a future editorial pass. |
| `/boise-boys-are-back/` | Read a historical show announcement and find current viewing | Dated article → current viewing update → related work | Preserve the historical account; add a current Luke and Clint watch link near the article end. The generic construction close is a secondary route for this audience. |
| `/building-boise-new-show-announcement/` | Understand the original announcement and discover the current show | Dated release → clearly labeled current-name update → current episodes | The historical Building Boise title should remain dated. Add a current Luke and Clint note rather than silently rewriting the original release as if it were published today. |
| `/buy-or-sell/` | Qualified handoff to Timber and Love Realty | Choose buying or selling → explain service → relevant proof → handoff → alternative path/FAQ | Both hero choices currently reach the same Realty homepage. Ask the receiving business for verified buyer/seller deep links; retain clear affiliation disclosure. |
| `/caldwell-beach-house/` | Book The Caldwell Beach House | Hero/availability → photo gallery → overview/facts → amenities/sleeping → practical notes → alternatives → availability | Keep the 11-guest capacity and four-bedroom facts prominent. The mobile button now goes to Caldwell availability, not a generic rental page. |
| `/chinamans-ocean-front-beach-house/` | Book The Kualoa Beach House | Hero/availability → photo gallery → overview/facts → amenities/sleeping → practical notes → alternatives → availability | Use the current Kualoa name while preserving the established URL. The mobile button now goes directly to Kualoa availability; keep the eight-guest comparison clear. |
| `/contact/` | Correctly routed inquiry | Service choice or direct general-form shortcut → form/contact details → next steps → press contact | Six photo cards now identify the paths; the generic form remains accessible directly. Removed the unrelated promotional interlude and generalized the follow-up expectations. |
| `/design-and-build-questionnaire/` | Completed original project questionnaire | Brief introduction → original hosted form → expectation setting | The exact existing questionnaire is embedded. Preserve its conditional qualification fields. Test mobile completion and scheduling on the deployed domain before judging form length. |
| `/design-and-build/` | Qualified project inquiry | Fit/services → diverse work → concise process → team/proof → FAQ → questionnaire | The close now has one invitation. Further compress repeated craft and process explanations; retain the services and project evidence. New photo-card grids remain readable at tablet widths. |
| `/financing/` | Help a project prospect prepare a realistic scope conversation | Funding overview → options → scope/budget sequence → brief inspiration → FAQ → inquiry | Two repeated inspiration blocks are removed. Keep the information general; do not introduce unverified rates, lender partnerships, or approval promises. |
| `/` | Qualified design inquiry, with clear secondary service discovery | Positioning → representative work → team/proof → process → media/story → inquiry | Keep the strong brand opening and Values film. Test bringing process clarity earlier; avoid adding another promotional section. Confirm the four headline metrics. |
| `/invest/` | Informed inquiry through the investment destination | Purpose/audience → process and information available → disclosure → relevant proof → handoff | Photographs add context, but construction quality is not evidence of financial results. Ask the business for approved opportunity details and investor-specific proof; preserve disclosures. |
| `/journal/` | Discover and read useful stories | Introduction → featured story → article grid → related work → one invitation | The extra closing promotion is removed. Keep dates and categories visible. Add topic filtering only when the article library is large enough to require it. |
| `/luke-caldwell-boise-community/` | Understand local involvement | Dated story → relevant About/community context → optional contact | Keep the article readable and the portrait uncropped. A related community or About link fits the reading intent better than relying only on a construction CTA. |
| `/luke-caldwell-faq/` | Answer questions about Luke | Article introduction → scannable question groups → About/Watch/Contact | The question headings help scanning. Add a concise contents list if the page grows; connect show-related answers to the Watch hub and retain factual review dates. |
| `/our-process/` | Understand commitments and start an appropriate project | Summary → phase navigator → phase detail → proof → FAQ → inquiry | The phase anchors provide useful orientation. Shorten repeated supporting editorials before the final ask; add approved deliverables and decision responsibilities to phases rather than more imagery. |
| `/privacy-policy/` | Read the policy and find a relevant contact | Policy title → readable sections → contact details | Retain the plain dark reading surface. The mobile sales bar is removed. Content accuracy and legal adequacy are outside this design audit. |
| `/projects/casa-de-boise/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Keep this home’s documentary gallery accurate even though its old generic marketing reuse has been removed. Add a verified remodel challenge and resolution. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/central-rim/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | The expanded gallery provides a distinct HGTV example. Add an approved brief and connect it to its specific episode when the relationship is confirmed. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/due-for-a-raze/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Explain the transformation in a short approved before/after narrative. Keep this home visually separate from the other HGTV properties. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/kualoa-beach-house/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Keep the rental cross-link, but make the portfolio purpose clear: renovation and interior styling. Avoid implying a Boise project inquiry is the way to book the stay. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/north-end-gem/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Use the existing exterior, sunroom, and interior variety to explain retained character. Add verified project context rather than generic craft claims. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/promise-lane-contemporary/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | The architecture, materials, and feature lists already support a case study. Add verified scale/year and choose related work beyond the default first registry entries. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/promise-lane-modern-farmhouse/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Keep its green millwork and farmhouse identity distinct from the neighboring custom homes. Add approved scope/outcomes and more relevant related projects. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/promise-lane-spanish-modern/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Preserve the arches, barrel-vaulted room, and consistent material story. Confirm factual project details before extending the at-a-glance information. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/stucco-in-time/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Retain its own exterior, terrace, and living-room imagery. Add the specific design problem and result; avoid recycling this home as unrelated service proof. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/the-chalet/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Keep design evidence and the McCall stay link together. Clarify approved renovation scope rather than treating it as a new-build case study. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/the-darla-house/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | Retain its cottage character and direct stay cross-link. Add verified renovation context and recommend other character-home projects. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/projects/the-firehouse/` | Evaluate project fit and start an inquiry | Project hero → scope/location → design story where available → gallery → related projects → proof → inquiry | The historical story is the differentiator. Keep the stay link secondary to the design story and add approved restoration challenges or before images if available. Shared improvement: replace generic proof with attributable project evidence where available. |
| `/reviews/` | Evaluate credible experiences and explore the work | Short introduction → rating with attributed reviews → relevant homes → inquiry | Duplicate rating strips and a repeated photo pitch are removed. Keep the review wall as the primary evidence and link to its external source. Verify the static count. |
| `/sell-for-cash/` | Property-specific cash-offer inquiry | Who it suits → process → what happens next → service-specific proof → FAQ → offer | Every offer CTA now reaches Buy My House consistently. Keep the alternative brokerage path subordinate to the main decision; do not imply an offer or sale is guaranteed. |
| `/service-areas/` | Confirm geographic fit | Coverage → representative local work → how to check a project → proof/FAQ → inquiry | The six varied home cards give context. Keep location claims accurate; consider a simple city list or map if visitors still cannot determine whether their property is served. |
| `/shows/` | Discover and watch relevant shows | Show choice → Luke and Clint players → HGTV context → complete season catalogs → optional design discovery | All episodes remain available. Mobile now offers direct show anchors. Next improvement is a clear show/season selector to reduce scrolling without duplicating or omitting entries. |
| `/stay-with-us/` | Select a property and check availability | Destination/property choice → atmosphere → practical FAQs → property selection | The hero and mobile bar now lead directly to the property groups. Keep the page guest-focused. Reduce Firehouse repetition in the inspiration gallery when more approved Darla imagery is available. |
| `/terms-and-conditions/` | Read terms and find related policy information | Terms title → readable sections → related policy/contact | Retain established canonical spelling and old-URL redirects. The mobile sales bar is removed. This review makes no legal-content certification. |
| `/the-boise-boys/` | Understand the HGTV story and find episodes | Show introduction → project examples → behind-the-scenes context → viewers/client proof → watch/design choices | Keep fan commentary distinct from client evidence. Mobile now points to viewing. Consider merging the two testimonial sections to prevent a long interruption before the next action. |
| `/the-darla-house/` | Book The Darla House | Hero/availability → photo gallery → overview/facts → amenities/sleeping → practical notes → alternatives → availability | Keep the sleeping arrangements easy to scan. Confirm comparable capacity/bedroom facts before adding them to the index; mobile availability now reaches its specific Airbnb listing. |
| `/the-firehouse/` | Book The Firehouse | Hero/availability → photo gallery → overview/facts → amenities/sleeping → practical notes → alternatives → availability | Keep the second-floor/stairs information visible before the booking handoff. Mobile availability now reaches the correct Firehouse listing; do not replace guest information with contractor proof. |
| `/timber-and-love-chalet/` | Book The Chalet | Hero/availability → photo gallery → overview/facts → amenities/sleeping → practical notes → alternatives → availability | Lead with the McCall setting and verified amenities. Add comparable capacity and bedroom information when confirmed; mobile availability now reaches the exact Chalet listing. |
| `/timber-and-love-gallery/` | Find relevant work and move toward a project | Introduction → clear collection filters → project exploration → proof → inquiry/process | The closing secondary link now advances to Our Process. Keep the 12-home collection and distinct 3/3/6 filtered groups. Make project scope easier to compare before adding more tiles. |
| `/timber-love-story-boise/` | Understand how the businesses fit together | Brand story → service explanation → relevant pathway | Use the article to deepen the main About page, not repeat it verbatim. Add contextual business links where the story introduces each service. |
| `/vacation-rentals/` | Compare the five stays | All properties → destination comparison → selected property stories → availability route | Local property anchors replace index-to-index loops; Firehouse and Chalet stories now have direct links. Develop this as the compact comparison view if both index URLs remain. |

## Ordered section ledger

This is the current built order, not a proposed new design. Every numbered item was included in the flow review. Repeated shared components inherit the decisions below; route-specific recommendations appear in the preceding table.

- **Hero/introduction:** retain a clear page purpose, intentional crop, and a destination-specific primary action. Avoid requiring a sales CTA on pure reading or policy pages.
- **Trust/press/stat strips:** retain only when they support the page's purpose. Verify facts; avoid consecutive blocks making the same claim.
- **Service/process photo cards:** retain relevant imagery and a dark text area. Keep reading width, full faces, complete headings, and a clear action where the card is navigational.
- **Editorial imagery/films:** retain the strongest examples; merge repeated arguments. Keep full-background films separated by solid sections. A framed image or film can add variety within a dark section.
- **Portfolio/gallery:** preserve property identity and collection distinctions; provide descriptive labels and working controls. Add verified case-study context before simply increasing image count.
- **Reviews/proof:** use attributed, service-relevant evidence; keep fan commentary separate. Do not dress ordinary brand praise as proof of financial or booking outcomes.
- **FAQs/practical information:** retain a plain reading surface and answers that resolve objections before the final action.
- **Closing invitation:** one clear primary destination, with an appropriate secondary route. Avoid repeating the immediately preceding invitation.
- **Article/policy body:** preserve reading hierarchy and factual context; prefer relevant onward links to repeated sales interruptions.

### `/about/`

1. One Team for Every Stage of Home
2. Google review trust strip
3. [Historical and unverified, noted 2026-10-29: legacy live-site stats quoted for reference only; the homes and sales figures have no verified source and are removed from the rebuild.] 15 + Years Experience 100 + Homes Remodeled $ 250 + Million Sold 35 + HGTV Episodes
4. Founded in Boise in 2015
5. Why One Brand Includes Multiple Home and Real Estate Services
6. One Team, From First Sketch to Final Detail
7. Luke Caldwell
8. Warm, Modern, and True to the House
9. A Story Documented on Screen
10. A Partnership Boise Watched Grow
11. Rooms That Feel Collected, Not Staged
12. Americana Soul
13. Working With Us on a Story or Project
14. Let’s Talk About Your Home

### `/boise-boys-are-back/`

1. The Boise Boys are Back
2. Google review trust strip
3. The Wait Is Over
4. Thinking About Your Own Project?

### `/building-boise-new-show-announcement/`

1. Luke Caldwell and Clint Robertson Reunite for Building Boise: A New Independent Series
2. Google review trust strip
3. FOR IMMEDIATE RELEASE / Luke Caldwell and Clint Robertson Reunite for Building Boise: A New Independent Series
4. Thinking About Your Own Project?

### `/buy-or-sell/`

1. Buy or Sell a Home in Boise
2. Google review trust strip
3. ★ ★ ★ ★ ★ “ Mira DiMaggio was our realtor for a recent purchase of a house in Boise. She was wonderful in just abou…
4. Continue to Timber and Love Realty
5. Find a Home That Fits Your Life / Sell With Local Guidance / People Who Know Boise
6. Find a Home That Fits Your Life
7. Position Your Home to Sell
8. Local Guidance, Start to Finish
9. Ready to Look at Homes?
10. What Boise Homeowners Say
11. One Team, Every Stage of Home
12. Before You Reach Out
13. Make Your Next Move With Us

### `/caldwell-beach-house/`

1. The Caldwell Beach House
2. Show All 7 Photos
3. The Caldwell Beach House
4. Amenities
5. Things to Know
6. Other Timber and Love Rentals
7. Make Yourself at Home

### `/chinamans-ocean-front-beach-house/`

1. The Kualoa Beach House
2. Show All 25 Photos
3. The Kualoa Beach House
4. Amenities
5. Things to Know
6. Other Timber and Love Rentals
7. Make Yourself at Home

### `/contact/`

1. How Can We Help?
2. Find the Right Starting Point
3. Send Us a Note
4. No Pressure, No Obligation
5. Media, Brand & Appearance Inquiries

### `/design-and-build-questionnaire/`

1. Tell Us About Your Project
2. What Happens Next

### `/design-and-build/`

1. Timber and Love Design + Build
2. Google review trust strip
3. [Historical and unverified, noted 2026-10-29: legacy live-site stats quoted for reference only; the homes and sales figures have no verified source and are removed from the rebuild.] 15 + Years Experience 100 + Homes Remodeled $ 250 + Million Sold 35 + HGTV Episodes
4. Start With a Conversation
5. One Team, From Concept to Completion
6. Design and Build, Resolved Together
7. Design + Build Services
8. Three Homes, Designed and Built From the Ground Up
9. Materials Chosen for How They Wear
10. Craft You Can Feel in Every Detail
11. How We Work
12. Concept Development
13. Design + Construction Development
14. Design + Construction Execution
15. Our Values
16. Design + Build Gallery
17. Trusted by Boise Homeowners
18. Frequently Asked Questions
19. Start With a Conversation

### `/financing/`

1. Financing Your Project
2. Google review trust strip
3. Common Ways Homeowners Pay for a Project
4. Start With a Realistic Number
5. A Well-Built Home, Within Reach
6. Common Questions
7. What Boise Homeowners Say
8. Start With a Clear Plan

### `/`

1. Timber and Love
2. As Featured On
3. A Luxury Design + Build Firm
4. Custom Homes and Luxury Remodels
5. Designed and Built Under One Roof
6. Led by Luke Caldwell
7. Google review trust strip
8. See What Others Are Saying
9. Custom Homes, Designed and Built as One Team
10. Boise Boys + Outgrown
11. Luke and Clint
12. Our Values
13. Let's Design Something Worth Building
14. Get Started In 3 Simple Steps
15. Americana Soul / Partnership Opportunities
16. Tell Us About Your Home

### `/invest/`

1. Invest in Real Estate
2. Google review trust strip
3. What to Expect
4. Value You Can Stand In Front Of
5. Build Value That Lasts
6. Explore the Details
7. Disclaimer The information provided here and on the affiliated site is general in nature and is offered for educati…
8. What Boise Homeowners Say
9. One Team, Every Stage of Home
10. Before You Reach Out
11. Invest Alongside Our Team

### `/journal/`

1. Stories From Timber and Love
2. Google review trust strip
3. The Real Story Behind Timber + Love: What We’ve Built and Why It Matters
4. Details Worth Writing About
5. Ready to Plan Your Own Project?

### `/luke-caldwell-boise-community/`

1. Building Boise, Paying It Forward: How Luke Caldwell Reinvests in the Community
2. Google review trust strip
3. Boise, Idaho. For Luke Caldwell, it’s more than just a home; it’s the foundation of everything he’s built. With ove…
4. Thinking About Your Own Project?

### `/luke-caldwell-faq/`

1. About Luke Caldwell: Frequently Asked Questions
2. Google review trust strip
3. About Luke Caldwell: Frequently Asked Questions
4. Thinking About Your Own Project?

### `/our-process/`

1. One Team, One Clear Process
2. Google review trust strip
3. Why One Team Makes the Difference
4. What Happens, and When
5. It Starts With How You Want to Live
6. Where Drawings Become Structure
7. The Difference Is in the Last Ten Percent
8. The Whole Journey, One Team
9. What Boise Homeowners Say
10. Before You Reach Out
11. Start With a Conversation

### `/privacy-policy/`

1. Privacy Policy and 12 topic headings

### `/projects/casa-de-boise/`

1. Casa De Boise
2. Google review trust strip
3. Whole-home remodel in Boise, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/central-rim/`

1. The Central Rim Home
2. Google review trust strip
3. Residential transformation in Boise, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/due-for-a-raze/`

1. Due for a Raze
2. Google review trust strip
3. Residential transformation in Boise, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/kualoa-beach-house/`

1. The Kualoa Beach House
2. Google review trust strip
3. Renovation and interior styling in Oahu, HI
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/north-end-gem/`

1. The North End Gem
2. Google review trust strip
3. Residential transformation in Boise, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/promise-lane-contemporary/`

1. The Contemporary on Promise Lane
2. Google review trust strip
3. Design + Build · New Construction in Treasure Valley, Idaho
4. A Cohesive Point of View
5. Take a Look Inside
6. Related Projects
7. What Boise Homeowners Say
8. Bring This Level of Detail Home

### `/projects/promise-lane-modern-farmhouse/`

1. The Modern Farmhouse on Promise Lane
2. Google review trust strip
3. Design + Build · New Construction in Treasure Valley, Idaho
4. A Cohesive Point of View
5. Take a Look Inside
6. Related Projects
7. What Boise Homeowners Say
8. Bring This Level of Detail Home

### `/projects/promise-lane-spanish-modern/`

1. The Spanish Modern on Promise Lane
2. Google review trust strip
3. Design + Build · New Construction in Treasure Valley, Idaho
4. A Cohesive Point of View
5. Take a Look Inside
6. Related Projects
7. What Boise Homeowners Say
8. Bring This Level of Detail Home

### `/projects/stucco-in-time/`

1. Stucco in Time
2. Google review trust strip
3. Residential transformation in Boise, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/the-chalet/`

1. The Chalet
2. Google review trust strip
3. Renovation and interior styling in McCall, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/the-darla-house/`

1. The Darla House
2. Google review trust strip
3. Renovation and interior styling in Boise, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/projects/the-firehouse/`

1. The Firehouse
2. Google review trust strip
3. Historic remodel in Boise, ID
4. Take a Look Inside
5. Related Projects
6. What Boise Homeowners Say
7. Bring This Level of Detail Home

### `/reviews/`

1. Trusted by Boise Homeowners
2. What Our Clients Say
3. The Homes People Love to Live In
4. Start Your Own Project

### `/sell-for-cash/`

1. Sell Your Home for Cash
2. Google review trust strip
3. A Simpler Way to Sell
4. A High-Level Look at the Process
5. A Path That Fits Your Situation
6. Sell Quickly, On Your Terms
7. Continue to Buy My House
8. What Boise Homeowners Say
9. One Team, Every Stage of Home
10. Before You Reach Out
11. See What We Would Offer

### `/service-areas/`

1. Serving Boise & the Treasure Valley
2. Google review trust strip
3. Across the Treasure Valley
4. Different Homes. Distinctive Character.
5. Designed for Life in Idaho
6. A Team That Knows Boise Homes
7. Building Across the Treasure Valley
8. What Boise Homeowners Say
9. Before You Reach Out
10. Building Throughout the Boise Area

### `/shows/`

1. Good Homes. Great Stories. / Luke and Clint
2. A Few Places to Begin
3. From Boise to Your Screen
4. Boise Boys + Outgrown
5. Boise Boys
6. Outgrown
7. Inspired by Something You Saw?
8. Bring Thoughtful Timber and Love Design to Your Home

### `/stay-with-us/`

1. Stay With Us
2. Find Your Perfect Stay
3. Make Time for McCall
4. From the Boise Foothills to the Oahu Shore
5. Before You Book
6. Find Your Next Getaway

### `/terms-and-conditions/`

1. Terms and Conditions and 11 topic headings

### `/the-boise-boys/`

1. The Boise Boys
2. Google review trust strip
3. Boise Homes, on National Television
4. From the Show
5. Inside The Firehouse
6. The Same Care, Off Camera
7. What Our Clients Say
8. What Viewers Say
9. Bring Thoughtful Timber and Love Design to Your Home

### `/the-darla-house/`

1. The Darla House
2. Show All 33 Photos
3. The Darla House
4. Amenities
5. Sleeping Arrangements
6. Things to Know
7. Other Timber and Love Rentals
8. Make Yourself at Home

### `/the-firehouse/`

1. The Firehouse
2. Show All 15 Photos
3. The Firehouse
4. Amenities
5. Sleeping Arrangements
6. Things to Know
7. Other Timber and Love Rentals
8. Make Yourself at Home

### `/timber-and-love-chalet/`

1. The Chalet
2. Show All 28 Photos
3. The Chalet
4. Amenities
5. Things to Know
6. Other Timber and Love Rentals
7. Make Yourself at Home

### `/timber-and-love-gallery/`

1. Homes With a Story
2. Google review trust strip
3. Selected Work
4. Where the Details Live
5. What Boise Homeowners Say
6. Build Something Like This

### `/timber-love-story-boise/`

1. The Real Story Behind Timber + Love: What We’ve Built and Why It Matters
2. Google review trust strip
3. Every successful venture has a compelling origin story, and Timber + Love is no exception. For Luke Caldwell and hi…
4. Thinking About Your Own Project?

### `/vacation-rentals/`

1. Distinctive Homes. Memorable Places to Stay.
2. Timber and Love Vacation Rentals
3. From Boise to the Oahu Shore
4. A Historic Firehouse, Reimagined
5. The Chalet Awaits
6. Find Your Place for the Week

## Shared experience review

| Element | Keep / refine |
| --- | --- |
| Desktop mega menu | Keep the opaque charcoal panels, three understandable groups, concise descriptions, and architecture-led feature images. Consider removing the redundant second rental-index link after the index strategy is decided. Add current-page indication as a future wayfinding refinement. |
| Mobile menu | Keep expanded groups, visible close action, scroll containment, focus restoration, and touch-sized controls. Maintain the same labels and destinations as desktop. |
| Mobile action bar | Now follows design, viewing, and property-booking intent. Hidden on the questionnaire, legal, retired-planner, and admin routes. Continue checking safe-area/footer clearance as content changes. |
| Footer | Keep service routing and separate customer/partnership contact details. Verify newsletter expectations and actual delivery independently; do not add an unconnected signup as decoration. |
| Buttons and links | Keep the established primary/secondary hierarchy and visible focus. Cash-offer, rental, and portfolio loops were corrected. Use the shared outbound treatment for affiliated feature CTAs. |
| Motion and video | Retain reduced-motion support and fallback posters. No Pause film controls. Provider playback is conditional on network/provider availability, not just player sizing. |
| Gallery and review controls | Preserve visitor control, keyboard access, focus restoration, and swipe behavior. Do not reintroduce an automatically moving review marquee. |
| Typography and contrast | Keep Montserrat and the dark palette. The changed cards use strong lower gradients. Tablet heading clipping found during screenshot review was corrected by widening the column breakpoint and allowing safe wrapping. The mobile H1 clamp was also corrected for long titles at 320 pixels. |
| Forms and dialogs | The questionnaire uses the original lead application; the general form keeps visible labels and retained values on error. Both paths need verified delivery after publication. Cross-origin keyboard behavior belongs partly to the hosted form. |

## Verification results

Final results and specific test boundaries are recorded in [the responsive audit evidence](qa/2026-10-02-site-audit.json). The main checks are a passing production build, 42 public content routes at four widths, 43 static documents including not-found, internal destination/anchor checks, and focused review of the changed cards and form wrapper. Responsive layout checks supplement visual review; they do not replace composition judgment or live funnel measurement.

Implementation notes in the earlier [design-refinement-review.md](design-refinement-review.md) describe prior iterations. This document and [lead-capture.md](lead-capture.md) supersede their older short-questionnaire and Contact-order descriptions.

- Production build, TypeScript, and whitespace checks passed.
- All 42 content routes passed the layout check at 1440, 768, 390, and 320 pixels: no document overflow, broken loaded images, invalid H1 counts, or missing same-page targets.
- Final checks across all 42 routes at 320 pixels found no internally clipped headings after correcting the long Contemporary project title. Seven pages with the revised photo-card components also passed focused text-clipping checks at all four widths.
- Static checks covered 43 documents and 616 image placements, with no missing local files, absent alt attributes, duplicate IDs, missing internal routes, or broken cross-page anchors.
- All 31 HGTV episode images were explicitly loaded and decoded; the earlier lazy-loading pending entries were resolved.
- The form wrapper passed trusted-origin/source validation, malformed-height rejection, valid resize, loading fallback, conversion deduplication, and privacy-signal checks using synthetic local messages. The mobile Work With Us dialog used the same questionnaire URL, contained its content, locked background scrolling, closed successfully, and restored focus.
- General-contact API and delivery tests passed with a mocked provider. No live inquiry or email was sent.
