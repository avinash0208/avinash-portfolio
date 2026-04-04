export type ExperienceRole = {
  title: string;
  impactChips?: string[];
  achievements: string[];
};

export type ExperienceItem = {
  company: string;
  companyLogo: string;
  location: string;
  period: string;
  roles: ExperienceRole[];
  accent: string;
};

export const experienceTimeline: ExperienceItem[] = [
  {
    company: "Brightly Software",
    companyLogo: "/brightlysoftware_logo.jpeg",
    location: "Noida",
    period: "Dec 2024 - Current",
    accent: "#0f766e",
    roles: [
      {
        title: "Senior Software Engineer",
        impactChips: [
          "MFE Architecture",
          "FCM + Service Worker",
          "100% WCAG 2.1 AA",
        ],
        achievements: [
          "Led the frontend design and implementation of cross-functional modules including Auditing, User Notifications, and the Approvals Engine within a large-scale CMMS platform.",
          "Architected and delivered features within a Micro Frontend ecosystem using Module Federation in Vite, enabling independent deployments and modular scalability across teams.",
          "Integrated push notifications using Firebase Cloud Messaging and Service Workers, ensuring reliable delivery in both foreground and background contexts with support for multi-browser environments.",
          "Championed accessibility-first development, ensuring 100% WCAG 2.1 AA compliance, including screen reader support and full keyboard navigation across all core modules.",
        ],
      },
    ],
  },
  {
    company: "Paytm",
    companyLogo: "/paytm_logo.jpeg",
    location: "Bangalore / Noida",
    period: "March 2022 - Nov 2024",
    accent: "#2563eb",
    roles: [
      {
        title: "Technical Lead",
        impactChips: ["+20% Revenue", "+23% Engagement", "50% Faster Load", "+20% TTI"],
        achievements: [
          "Managed the Motor Insurance pod by driving mentorship, sprint planning, technical solutioning, code reviews, deployments, and engineering best practices.",
          "Revamped the end-to-end UI with A/B testing using Storefront, resulting in 20% increase in revenue.",
          "Integrated MS Clarity for better observability, improving user engagement to 23%.",
          "Optimized UI components, resulting in a 50% improvement in application load times and a 20% increase in Time to Interactivity (TTI) using code splitting, service workers, and caching strategies.",
        ],
      },
      {
        title: "Senior Software Engineer",
        impactChips: ["-15% Drop-off", "Cross-sell Expansion", "KYC Modernization"],
        achievements: [
          "Collaborated on atomic components and form creator libraries to ensure uniformity across insurance products, enhancing reusability and maintainability using Vue.js and Tailwind CSS.",
          "Developed a comprehensive KYC process in compliance with government regulations, streamlining onboarding for insurance purchases using H5 WebView.",
          "Orchestrated integration of sachet insurance products with services such as Personal Loan Insurance and Credit Card Bill Payment Insurance, increasing cross-sell opportunities.",
          "Revamped the health insurance quotes page, reducing user drop-off rates by over 15% and improving conversion.",
        ],
      },
    ],
  },
  {
    company: "Perfios Solutions Pvt. Ltd.",
    companyLogo: "/perfios_logo.jpeg",
    location: "Bangalore",
    period: "June 2018 - Feb 2022",
    accent: "#9333ea",
    roles: [
      {
        title: "Senior Software Engineer",
        impactChips: ["React + Redux Platform", "Jest Coverage", "+10% TAT"],
        achievements: [
          "Developed a new React project from scratch with Redux, reusable components, React Router, custom hooks, lazy loading, and code splitting with SCSS.",
          "Developed unit tests using Jest to validate React components and improve code reliability and coverage.",
          "Enhanced accessibility by improving keyboard navigation, resulting in an overall TAT improvement of 10%.",
        ],
      },
      {
        title: "Software Engineer",
        impactChips: ["Excel Workflow Digitization"],
        achievements: [
          "Replaced XLS-based processing of insurance data with a dynamic UI integrating nearly all core Excel features, streamlining the process and user experience using JExcel Library.",
        ],
      },
      {
        title: "Internship",
        impactChips: ["AWS Monitoring App"],
        achievements: [
          "Built a Real Time Monitoring and Alert application using AWS.",
        ],
      },
    ],
  },
];
