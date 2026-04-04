export type Section = {
  id: string;
  title: string;
  path: string;
  summary: string;
  points: string[];
  intro: string;
  detailSections: {
    title: string;
    body: string[];
  }[];
};

export const sections: Section[] = [
  {
    id: "about",
    title: "About",
    path: "/about",
    summary: "Senior frontend engineer with 7+ years building high-impact digital products.",
    points: [
      "Owns architecture decisions across UI platforms.",
      "Balances speed, quality, and product impact.",
      "Drives standards for accessibility and performance.",
    ],
    intro:
      "I work at the intersection of product delivery, frontend architecture, and engineering quality. My strongest contribution is taking ambiguous business goals and turning them into reliable user experiences with clear technical direction.",
    detailSections: [
      {
        title: "Engineering Philosophy",
        body: [
          "Frontend engineering should not be reduced to visual implementation. The real leverage comes from system design, performance decisions, accessibility, maintainability, and how clearly the UI can evolve with product needs.",
          "I prefer architectures that make tradeoffs visible. That usually means separating server concerns, client interactivity, state boundaries, and content pipelines so the team can scale without accumulating accidental complexity.",
        ],
      },
      {
        title: "What I Optimize For",
        body: [
          "I optimize for business impact first, but I do it through engineering rigor: faster user journeys, clearer interfaces, safer deployments, lower regression risk, and better long-term maintainability.",
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    path: "/experience",
    summary: "Multi-domain experience across fintech, consumer products, and enterprise platforms.",
    points: [
      "Led critical journeys for acquisition and retention.",
      "Scaled frontend systems with reusable architecture.",
      "Partnered with design, product, and backend teams at scale.",
    ],
    intro:
      "My experience spans product-focused frontend development, platform work, and cross-functional delivery in environments where reliability and user trust matter.",
    detailSections: [
      {
        title: "Cross-Domain Depth",
        body: [
          "I have worked in domains where the frontend is directly tied to business performance, whether that means onboarding funnels, transactional surfaces, internal tooling, or long-lived platform capabilities.",
          "That breadth matters because it trains judgment. The right frontend solution depends heavily on domain constraints, release velocity, and user expectations.",
        ],
      },
      {
        title: "Role Shape",
        body: [
          "Beyond individual feature delivery, I contribute through architecture reviews, delivery planning, mentoring, and by raising the quality bar for the broader frontend surface area.",
        ],
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    path: "/skills",
    summary: "Strong engineering breadth with depth in modern web architecture.",
    points: [
      "React, Next.js, TypeScript, Tailwind CSS.",
      "SSR, CSR, hydration strategy, and performance tuning.",
      "Testing, accessibility, localization, and frontend observability.",
    ],
    intro:
      "My skill set is strongest where product-facing frontend intersects with systems thinking: rendering strategy, platform quality, performance, accessibility, and maintainable UI architecture.",
    detailSections: [
      {
        title: "Core Technical Skills",
        body: [
          "React, Next.js, TypeScript, design systems, advanced state management, component architecture, and browser performance are core areas where I can operate independently at senior level.",
        ],
      },
      {
        title: "Quality and Scale",
        body: [
          "I treat testing strategy, accessibility, internationalization, observability, and deployment quality as part of frontend engineering rather than follow-up concerns.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    path: "/projects",
    summary: "Case-study-first portfolio projects with measurable outcomes.",
    points: [
      "Highlight constraints, tradeoffs, and architecture.",
      "Show KPIs: performance, conversion, reliability.",
      "Emphasize ownership and decision quality.",
    ],
    intro:
      "Projects are the strongest part of a senior portfolio when they show why certain decisions were made, not just what was built.",
    detailSections: [
      {
        title: "Case Study Format",
        body: [
          "Each project page should document the problem, scale, technical constraints, architecture, tradeoffs, measurable results, and the exact role I played in moving the outcome forward.",
        ],
      },
      {
        title: "Signal Over Surface",
        body: [
          "I would rather show fewer projects with better engineering detail than a long gallery of shallow descriptions. Senior interviewers look for judgment, leverage, and clarity.",
        ],
      },
    ],
  },
  {
    id: "accomplishments",
    title: "Awards & Accomplishments",
    path: "/accomplishments",
    summary: "Recognitions, awards, and measurable leadership impact across organizations.",
    points: [
      "Formal awards for technical excellence and platform impact.",
      "Recognitions across Brightly, Paytm, and Perfios.",
      "Leadership outcomes backed by measurable delivery improvements.",
    ],
    intro:
      "Accomplishments matter most when they demonstrate repeatable impact: raising standards, improving team output, and reducing delivery risk at scale.",
    detailSections: [
      {
        title: "Leadership Through Systems",
        body: [
          "I see leadership as creating leverage for the team: better abstractions, better defaults, better review standards, and better feedback loops in production.",
        ],
      },
      {
        title: "Examples of Impact",
        body: [
          "This section is where to document mentoring, architectural direction, quality improvements, incident prevention, platform initiatives, or any change that made teams faster and safer over time.",
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
    summary: "Open to senior/staff frontend roles, consulting, and architecture discussions.",
    points: [
      "Recruiter friendly with concise project proof points.",
      "Engineering deep-dive conversations welcome.",
      "Clear CTA for collaboration and hiring.",
    ],
    intro:
      "The contact experience should be simple and intentional: enough context for recruiters, and enough signal for engineering leaders who want to start from technical depth.",
    detailSections: [
      {
        title: "Best Entry Points",
        body: [
          "This page should include a direct professional email path, LinkedIn, GitHub, and optionally a calendar or a structured contact form depending on how open you want inbound traffic to be.",
        ],
      },
      {
        title: "Messaging Strategy",
        body: [
          "The content here should clearly state what kinds of conversations you are open to: full-time roles, consulting, frontend architecture reviews, and product-platform discussions.",
        ],
      },
    ],
  },
];

export function getSectionById(id: string) {
  return sections.find((section) => section.id === id);
}
