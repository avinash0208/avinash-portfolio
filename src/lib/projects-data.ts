export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectItem = {
  name: string;
  summary: string;
  links: ProjectLink[];
  note?: string;
  tags: string[];
};

export const projects: ProjectItem[] = [
  {
    name: "PAYTM-INSURANCE",
    summary:
      "Insurance platform journey work focused on conversion, observability, and performance optimization.",
    links: [{ label: "Live Product", url: "https://paytminsurance.co.in/" }],
    tags: ["Vue", "A/B Testing", "Performance", "Observability", "User Journey"],
  },
  {
    name: "BRIGHTLY PLATFORM",
    summary:
      "Enterprise CMMS platform module development with scalable frontend architecture and accessibility focus.",
    links: [
      {
        label: "Live Product",
        url: "https://apps.brightlysoftware.com/audit-logs?tac=FytF",
      },
    ],
    tags: ["Micro Frontend", "Module Federation", "Accessibility", "Enterprise", "Scalable Architecture"],
  },
  {
    name: "NETFLIX REPLICA",
    summary:
      "Streaming-style UI clone project with modern React architecture and Firebase deployment.",
    links: [
      { label: "Live Demo", url: "https://netflix-avinash-b166d.web.app/" },
      { label: "GitHub", url: "https://github.com/avinash0208/netflix-gpt" },
    ],
    tags: ["React", "Firebase", "UI Architecture"],
  },
  {
    name: "COVID-19 TRACKER",
    summary:
      "Data tracking dashboard for pandemic metrics with clean visual information hierarchy.",
    links: [{ label: "Live Demo", url: "https://avinash-covid19-tracker.web.app/" }],
    tags: ["Data Visualization", "React", "Public APIs", "Leaflet"],
  },
  {
    name: "FOOD DELIVERY APP",
    summary:
      "Food ordering interface with client-side data flows and reusable component design.",
    links: [
      { label: "Live Demo", url: "https://avinash-food-app.firebaseapp.com/" },
      { label: "GitHub", url: "https://github.com/avinash0208/food-app-react" },
    ],
    note: "GitHub preview workflows may require CORS-enabled browser settings for specific API calls.",
    tags: ["React", "State Management", "Routing", "Reusable Components", "Firebase Hosting"],
  },
];
