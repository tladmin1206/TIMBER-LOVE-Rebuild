export const navigationGroups = [
  {
    id: "design",
    label: "Design + Build",
    image: "/projects/promise-ln-5142/5142-promise-ln-great-room.jpg",
    feature: "Thoughtful from the first sketch.",
    featureHref: "/design-and-build/",
    columns: [
      {
        title: "Make a Home",
        links: [
          {
            label: "Design + Build",
            href: "/design-and-build/",
            description: "Custom homes, additions and renovations.",
          },
          {
            label: "Our Work",
            href: "/timber-and-love-gallery/",
            description: "See the houses.",
          },
          {
            label: "Our Process",
            href: "/our-process/",
            description: "How a job goes, start to finish.",
          },
        ],
      },
      {
        title: "Plan Your Project",
        links: [
          {
            label: "Tell Us About Your House",
            href: "/design-and-build-questionnaire/",
            description: "Tell us about your house and what you want it to feel like.",
          },
          {
            label: "Financing",
            href: "/financing/",
            description: "How people pay for a remodel.",
          },
          {
            label: "Service Areas",
            href: "/service-areas/",
            description: "At home in Boise and the Treasure Valley.",
          },
        ],
      },
    ],
  },
  {
    id: "home",
    label: "Home + Real Estate",
    image: "/editorial/cottage-entry.webp",
    feature: "One brand. More ways to feel at home.",
    featureHref: "/about/#brand-heading",
    columns: [
      {
        title: "Your Next Move",
        links: [
          {
            label: "Buy or Sell",
            href: "/buy-or-sell/",
            description: "Local guidance from Timber + Love Realty.",
          },
          {
            label: "Sell for Cash",
            href: "/sell-for-cash/",
            description: "A straight cash offer through Buy My House.",
          },
          {
            label: "Invest",
            href: "/invest/",
            description: "Learn about real estate opportunities.",
          },
        ],
      },
      {
        title: "Stay With Us",
        links: [
          {
            label: "Stay With Us",
            href: "/stay-with-us/",
            description: "Our vacation homes in Boise, McCall and Oahu.",
          },
          {
            label: "Compare Vacation Homes",
            href: "/vacation-rentals/",
            description: "Compare destinations, bedrooms, and group size.",
          },
          {
            label: "How It Fits Together",
            href: "/about/#brand-heading",
            description: "Meet the businesses behind Timber + Love.",
          },
        ],
      },
    ],
  },
  {
    id: "story",
    label: "About",
    image: "/editorial/team-studio.webp",
    feature: "Rooted in Boise. Built with love.",
    featureHref: "/about/",
    columns: [
      {
        title: "Get to Know Us",
        links: [
          {
            label: "Our Story",
            href: "/about/",
            description: "Who we are and how this got started.",
          },
          {
            label: "Client Stories",
            href: "/reviews/",
            description: "Hear from the people we work with.",
          },
          {
            label: "Journal",
            href: "/journal/",
            description: "Ideas, stories, and life in Boise.",
          },
        ],
      },
      {
        title: "Beyond the Build",
        links: [
          {
            label: "Shows + Watch",
            href: "/shows/",
            description: "Luke and Clint, Boise Boys, and Outgrown.",
          },
          {
            label: "Americana Soul",
            href: "/about/#americana-soul",
            description: "Luke Caldwell’s book on homes with intention.",
          },
          {
            label: "Press + Partnerships",
            href: "/contact/#press",
            description: "Press, appearances and brand partnerships.",
          },
          {
            label: "Contact",
            href: "/contact/",
            description: "Talk to the team.",
          },
        ],
      },
    ],
  },
] as const;
