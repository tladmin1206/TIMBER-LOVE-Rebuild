# Lead capture

Updated October 2, 2026. The owner pulls main into Replit and republishes.

## Design and build inquiries

The dedicated `/design-and-build-questionnaire/` page and Work With Us dialog embed the **same live questionnaire** used at [timberandlove.com/design-and-build-questionnaire](https://timberandlove.com/design-and-build-questionnaire/):

`https://leads.timberandlove.com/forms/combined?transparent=true&logo=false`

`logo=false` asks the form to omit its own logo, because the site header already carries the brand mark. A form version that honours it reports `logo: false` in its resize messages; until then the embed crops the logo band instead (see `LOGO_CROP` in `components/forms/DesignBuildQuestionnaire.tsx`). The open-in-new-window link uses the standalone `/forms/combined`, which has its own dark background.

This preserves the original contact fields, project-type choices, conditional remodel/addition/new-home questions, property and planning details, budget and timing, acknowledgments, optional SMS consent, and lead routing. The original application owns validation, submission, confirmation, and consultation scheduling. These inquiries do not go through this repository's short contact endpoint.

`components/forms/DesignBuildQuestionnaire.tsx` is shared by both entry points. Its iframe has an accessible title, a direct-open fallback, and a loading-delay notice with a phone alternative. It accepts resize messages only from the exact lead-service origin and the mounted iframe's window; malformed and out-of-range heights are ignored. The reported height is used without extra padding to avoid resize loops. Modal focus handling includes the iframe.

The hosted application currently posts its submission confirmation to `https://timberandlove.com` and `https://www.timberandlove.com`. Consequently, the Replit preview can display and submit the form, but its parent page does not receive that conversion message. The new listener reports `generate_lead` only after an accepted submission message, deduplicates the submission ID, excludes personal details, and respects DNT/GPC. Cross-domain funnel instrumentation on additional parent domains requires a corresponding allowlist change in the separately hosted lead application. Do not infer successful capture from iframe load, a button click, or resizing.

## General inquiries

The Contact page and Connect dialog retain the short form: first name, last name, email, phone, optional service interest, and message. First name, valid email, and message are required. The notification includes service interest, originating form, and page path.

`POST /api/contact/` uses Resend with `RESEND_API_KEY`, `LEAD_TO_EMAIL`, and `LEAD_FROM_EMAIL`. An earlier read-only Replit inspection confirmed all three were present in app and production configuration. No secret values were exposed or changed.

The endpoint reports success only after provider acceptance. Missing configuration or provider failure returns 503. Invalid and oversized payloads are rejected. A honeypot suppresses spam delivery. Private lead details are not logged as a substitute for capture. The configured verified sender is used, with reply-to set to the visitor. Provider calls have a five-second timeout and retry transient errors. Stable idempotency keys deduplicate retries. Validation and delivery failures preserve form fields; successful confirmation receives focus.

## Retired planner

Both `/investment-planner/` and `/estimate/` temporarily redirect to the project questionnaire. Public navigation and the sitemap omit the planner; address and estimate APIs return 404. The pricing engine remains in the repository for future use.

## Verification boundaries

- Production build and TypeScript checks pass.
- The source reference page's iframe URL and the public hosted questionnaire were inspected. Its welcome and initial required-name step loaded in the cloud review browser. No live submission was made.
- The local review browser does not trust the lead host's certificate chain. That browser limitation was not bypassed. Local receiver tests use synthetic window messages and do not create leads.
- Existing `scripts/verify-contact-form.ts` and `scripts/verify-lead-delivery.ts` cover the separate general-contact pipeline with mocked delivery. Run with `node --import tsx scripts/verify-contact-form.ts` and `node --import tsx scripts/verify-lead-delivery.ts`.
- Actual inbox/CRM receipt, scheduling completion, and attribution remain an owner-controlled post-publication check. Use a clearly labeled test inquiry and confirm both the hosted questionnaire and the general contact form reach the expected team.
- A cross-origin iframe's inner keyboard events are controlled by the hosted application. The surrounding dialog has a labeled close button and focus containment; Escape pressed inside the hosted form cannot be assumed to reach the parent.

## October 5, 2026 implementation verification

- Replit read-only inspection confirmed `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, and `LEAD_TO_EMAIL` exist in the rebuild's development and production settings. Secret values were not read or copied. Presence is not proof of valid credentials or inbox delivery.
- Contact now emits a non-PII `CONTACT_PROVIDER_ACCEPTED` log with the provider message ID. Existing validation, honeypot, idempotency, failure and retry tests pass. No real inquiry was sent during this pass.
- General-contact analytics distinguish form start, unconfirmed delivery error, and provider-accepted inquiry. Outbound clicks and booking handoffs are never counted as completed leads or bookings.
- The original questionnaire remains unchanged and embedded from `https://leads.timberandlove.com/forms/combined?transparent=true`.
- Located its integration source in `webiq1206/TL-Lead-Dashboard-v2`. A separate two-file patch adds the exact `https://timberandlove.replit.app` parent origin to successful-submission notifications. It does not add a wildcard, expose contact data, change the form, or relax receiving-origin checks. All five existing analytics/bridge tests pass with the third origin.
- The questionnaire patch must be pulled and republished from its own Replit app, separately from this website.
- Actual inbox/CRM receipt, the final scheduling step, qualified-lead conversion, and booking completion remain production checks. No completed delivery or conversion uplift is claimed from mocked tests or provider configuration.
