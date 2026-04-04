export type Skill = {
  name: string;
  logo?: string;
};

export type SkillCategory = {
  title: string;
  subtitle: string;
  tone: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Frontend Technologies",
    subtitle: "Language, styling, tooling, and build-chain expertise",
    tone: "#0f766e",
    skills: [
      { name: "JavaScript", logo: "javascript" },
      { name: "TypeScript", logo: "typescript" },
      { name: "HTML", logo: "html5" },
      { name: "CSS", logo: "css" },
      { name: "SCSS", logo: "sass" },
      { name: "Web Components", logo: "webcomponents.org" },
      { name: "Lit", logo: "lit" },
      { name: "Stencil", logo: "stencil" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Material UI", logo: "mui" },
      { name: "Bootstrap", logo: "bootstrap" },
      { name: "Jest", logo: "jest" },
      { name: "Vitest", logo: "vitest" },
      { name: "Webpack", logo: "webpack" },
      { name: "Vite", logo: "vite" },
      { name: "Module Federation", logo: "webpack" },
      { name: "Parcel", logo: "parcel" },
      { name: "Babel", logo: "babel" },
      { name: "Lighthouse", logo: "lighthouse" },
      { name: "jQuery", logo: "jquery" },
      { name: "npm", logo: "npm" },
      { name: "pnpm", logo: "pnpm" },
      { name: "Yarn", logo: "yarn" },
    ],
  },
  {
    title: "Frameworks and State Management",
    subtitle: "UI architecture and scalable state patterns",
    tone: "#2563eb",
    skills: [
      { name: "React JS", logo: "react" },
      { name: "Redux", logo: "redux" },
      { name: "Vue JS", logo: "vuedotjs" },
      { name: "Pinia", logo: "pinia" },
      { name: "Vuex", logo: "vuedotjs" },
      { name: "Microfrontends", logo: "single-spa" },
      { name: "Next JS", logo: "nextdotjs" },
    ],
  },
  {
    title: "Full-stack Support",
    subtitle: "Backend integration and platform-level collaboration",
    tone: "#9333ea",
    skills: [
      { name: "Node JS", logo: "nodedotjs" },
      { name: "Express JS", logo: "express" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "REST APIs", logo: "openapiinitiative" },
      { name: "Firebase", logo: "firebase" },
      { name: "Java", logo: "openjdk" },
      { name: "Spring Boot", logo: "springboot" },
      { name: "VBA", logo: "microsoftoffice" },
      { name: "AWS S3", logo: "amazons3" },
      { name: "GraphQL (Apollo Client)", logo: "apollographql" },
    ],
  },
  {
    title: "Monitoring and Analytics",
    subtitle: "Reliability, observability, and product telemetry",
    tone: "#b45309",
    skills: [
      { name: "Sentry", logo: "sentry" },
      { name: "MS Clarity", logo: "microsoft" },
      { name: "Kibana", logo: "kibana" },
      { name: "Datadog", logo: "datadog" },
      { name: "Google Analytics Events", logo: "googleanalytics" },
    ],
  },
  {
    title: "Web Accessibility",
    subtitle: "Inclusive design and assistive technology workflows",
    tone: "#be123c",
    skills: [
      { name: "WCAG 2.1", logo: "w3c" },
      { name: "ARIA", logo: "w3c" },
      { name: "NVDA", logo: "windows" },
      { name: "Voice Over", logo: "apple" },
      { name: "System Narrator", logo: "microsoft" },
      { name: "axe-core", logo: "deque" },
    ],
  },
];
