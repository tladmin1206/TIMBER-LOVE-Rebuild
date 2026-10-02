# Lead capture

The public Investment Planner is retired as of 2026-10-02. Both `/investment-planner/` and `/estimate/` temporarily redirect to `/design-and-build-questionnaire/`. No public navigation, sitemap entry, or CTA advertises the planner. Address and estimate APIs return 404. The pricing engine remains in the repository for future use.

The project inquiry, contact page, and contact dialogs use the same short form: first name, last name, email, phone, optional service interest, and message. It follows the existing timberandlove.com form structure. First name, valid email, and message are required. The form sends the service interest, originating form, and page path to the team with the inquiry.

## Delivery

`POST /api/contact/` uses the existing Resend integration and `RESEND_API_KEY`, `LEAD_TO_EMAIL`, and `LEAD_FROM_EMAIL`. Replit's read-only inspection confirmed all three are present in the app and production configuration. No secret values were exposed or changed.

The endpoint reports success only after Resend accepts the message. Missing configuration and provider failures return 503. Invalid payloads return 400/422, excessive payloads return 413, and the spam honeypot suppresses delivery. Private lead details are not written to console logs as a substitute for capture.

The sender is the configured verified address; replies go to the visitor. Provider calls have a five-second timeout and retry transient errors. A stable idempotency key prevents duplicate notifications when a visitor retries an interrupted request. Validation and delivery errors preserve the form fields. Success moves focus to the confirmation.

## Verification

- `npx tsx scripts/verify-contact-form.ts`: local API tests for validation, honeypot, recipient, reply-to, all inquiry fields, identical retry payloads, idempotency key, timeout, unconfigured delivery, provider rejection, and retired planner endpoints.
- `npx tsx scripts/verify-lead-delivery.ts`: existing provider success/failure/retry checks.
- Browser check: native required-field validation, retained values after a simulated failure, successful confirmation and focus, and reuse of the submission ID on retry.
- Production server check: both old URLs return HTTP 307 to the inquiry page; the address endpoint returns 404; the sitemap omits both retired URLs.

No real lead or test email was sent. API tests mock the mail provider, and browser tests mock the local form transport. Actual inbox receipt remains a post-publication check after the owner pulls and republishes in Replit.
