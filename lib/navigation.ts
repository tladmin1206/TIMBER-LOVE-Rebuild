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
            description: "Custom homes, additions, and considered renovations.",
          },
          {
            label: "Our Work",
            href: "/timber-and-love-gallery/",
            description: "Explore the homes and the details.",
          },
          {
            label: "Our Process",
            href: "/our-process/",
            description: "One connected team, from concept to completion.",
          },
        ],
      },
      {
        title: "Plan Your Project",
        links: [
          {
            label: "Start a Project",
            href: "/design-and-build-questionnaire/",
            description: "Tell us about your home and your goals.",
          },
          {
            label: "Financing",
            href: "/financing/",
            description: "Consider ways to fund your project.",
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
            description: "Local guidance from Timber and Love Realty.",
          },
          {
            label: "Sell for Cash",
            href: "/sell-for-cash/",
            description: "Explore a direct offer through Buy My House.",
          },
          {
            label: "Invest",
            href: "/invest/",
            description: "Learn about real estate opportunities.",
          },
        ],
      },
      {
        title: "Experience the Design",
        links: [
          {
            label: "Stay With Us",
            href: "/stay-with-us/",
            description: "Distinctive stays in Idaho and Hawaii.",
          },
          {
            label: "Compare Vacation Homes",
            href: "/vacation-rentals/",
            description: "Compare destinations, bedrooms, and group size.",
          },
          {
            label: "How It Fits Together",
            href: "/about/#brand-heading",
            description: "Meet the businesses behind Timber and Love.",
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
            description: "The people and point of view behind the work.",
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
            description: "Create something with us.",
          },
          {
            label: "Contact",
            href: "/contact/",
            description: "Start a conversation with our team.",
          },
        ],
      },
    ],
  },
] as const;
