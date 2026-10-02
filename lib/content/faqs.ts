import type { FaqItem } from '@/components/ui/FAQ';

/**
 * Objection-handling FAQs, one set per pathway.
 *
 * These answer the questions that actually stop someone converting: cost,
 * timeline, commitment and "is this for me", and they sit immediately before
 * the closing CTA on each page. Unanswered objections are silent exits.
 *
 * Answers deliberately avoid inventing specifics the business has not
 * confirmed. Where a number would be needed (fees, exact timelines, minimums),
 * the copy defers to the team rather than stating a figure. Anything marked
 * TEMP: below needs business sign-off before launch.
 */

export const faqs: Record<string, FaqItem[]> = {
  sellForCash: [
    {
      q: 'Am I obligated to accept your offer?',
      a: 'No. Requesting an offer costs nothing and commits you to nothing. Plenty of homeowners request one simply to understand what a direct sale would look like alongside a traditional listing, then decide from there.',
    },
    {
      q: 'Do I need to make repairs or clean before you look at it?',
      a: 'No. We buy homes in their existing condition. Deferred maintenance, dated finishes, and repairs you were dreading are the normal case, not a problem. We account for condition in the offer rather than asking you to fix it first.',
    },
    {
      q: 'How is this different from listing with an agent?',
      a: 'A listing usually earns more on paper but involves preparation, showings, buyer financing and a longer, less certain timeline. A direct offer trades some of that value for speed and certainty. Because we also run a realty brokerage, we can walk you honestly through both routes.',
    },
    {
      q: 'What kinds of homes do you buy?',
      a: 'Primarily single-family homes in and around the Treasure Valley. If your property is outside that area or unusual in some way, tell us anyway and we will give you a straight answer about whether we are the right buyer.',
    },
  ],

  buyOrSell: [
    {
      q: 'What makes you different from any other brokerage?',
      a: 'We design and build homes as well as sell them. That means when we walk a property with you, we can tell you what a wall move, an addition or a kitchen reconfiguration would realistically involve, not just what the listing says.',
    },
    {
      q: 'Do I have to use your construction team if I buy through you?',
      a: 'Not at all. The design and build side is available if you want it, and completely optional if you do not. Plenty of clients use us purely as their brokerage.',
    },
    {
      q: 'Can you help me prepare a home before listing it?',
      a: 'Yes. Knowing which improvements return their cost in this market and which do not is one of the more useful things we bring, because we price the work and sell the result.',
    },
  ],

  invest: [
    {
      q: 'What kind of investors do you work with?',
      a: 'People who want exposure to the Boise market with a team that designs, builds, sells and manages in it directly. The specifics of any current opportunity are best discussed on a call, since availability changes.',
    },
    {
      q: 'Do you invest alongside your investors?',
      a: 'Yes. We operate in the same market we invest in, which keeps our interests aligned with the people who invest with us.',
    },
    {
      q: 'What is the first step?',
      a: 'A conversation. We will explain what is currently open, what it would involve, and whether it is a sensible fit for what you are trying to achieve. Nothing is committed at that stage.',
    },
  ],

  stayWithUs: [
    {
      q: 'Where are the homes located?',
      a: 'Choose from Boise and McCall in Idaho, or two oceanfront homes in Kaʻaʻawa on Oahu’s windward coast. Each property page includes its location, photographs, and amenities.',
    },
    {
      q: 'How do I check dates and make a reservation?',
      a: 'Open a property and select Check Availability. Idaho stays link to their Airbnb listings, and the Hawaii homes are reserved through Vacation Rental Oahu. Current rates, availability, and the full booking terms are shown there.',
    },
    {
      q: 'Which Hawaii home fits my group?',
      a: 'The Kualoa Beach House has 3 bedrooms and 2 bathrooms for up to 8 guests. The Caldwell Beach House has 4 bedrooms and 2 bathrooms for up to 11 guests. Both are in Kaʻaʻawa; each is booked separately.',
    },
    {
      q: 'Where can I find house rules and cancellation terms?',
      a: 'Review the individual listing before reserving. Guest limits, check-in times, pet policies, fees, and cancellation terms depend on the property and are confirmed by its booking site.',
    },
  ],

  ourProcess: [
    {
      q: 'What happens after I reach out?',
      a: 'A member of our team reads your inquiry and replies within one business day. From there it is a short conversation about your home, your goals and your budget, so both sides can decide whether it is a good fit before anyone commits.',
    },
    {
      q: 'Do I need to know exactly what I want first?',
      a: 'No. Most people arrive with a room that is not working and a rough sense of budget. Turning that into a defined scope is the work: arriving with it already solved is the exception, not the expectation.',
    },
    {
      q: 'How involved will I be?',
      a: 'As involved as you would like. Some clients want to be part of every selection; others want to approve the direction and let us run. We will agree which of those you are early, so expectations match.',
    },
  ],

  serviceAreas: [
    {
      q: 'Do you work outside Boise itself?',
      a: 'Yes. We work throughout the Treasure Valley, including Meridian, Eagle, Nampa, Caldwell, Kuna, Star, Garden City and Middleton. If you are near the edge of that area, ask. The answer is often yes.',
    },
    {
      q: 'Does location change what a project costs?',
      a: 'It can. Access, lot conditions, and local permitting all affect a build. Those are among the things we confirm before putting real numbers to a scope.',
    },
  ],

  estimate: [
    {
      q: 'Is this a quote?',
      a: 'No. It is a preliminary range based on typical projects of a similar scope. Real pricing requires a property review, design development, selections, engineering and trade input. The estimator exists to tell you whether you are in the right ballpark before you invest time in a conversation.',
    },
    {
      q: 'Why is the range so wide?',
      a: 'Because finish level and existing conditions move costs more than square footage does. The range narrows quickly once we know the specifics of your home.',
    },
    {
      q: 'What if the number is higher than I expected?',
      a: 'That is a common and completely reasonable reaction. Most projects are phased or financed rather than paid all at once, and a conversation about sequencing often makes the same goal achievable.',
    },
  ],
};
