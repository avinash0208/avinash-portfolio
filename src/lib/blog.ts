export type BlogPostMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "content-security-policy-web-security",
    title: "Content Security Policy for Modern Web Security",
    summary:
      "Why CSP remains one of the most practical browser-level defenses against script injection and unsafe resource loading.",
    date: "2024-06-15",
    tags: ["Web Security", "CSP", "Frontend Architecture"],
  },
  {
    slug: "accessibility-at-scale",
    title: "Accessibility at Scale in Product Teams",
    summary:
      "A practical playbook for making accessibility measurable and sustainable in fast-moving teams.",
    date: "2025-09-20",
    tags: ["A11y", "Testing", "Frontend Platform"],
  },
  {
    slug: "architecting-ssr-csr-boundaries",
    title: "Architecting SSR and CSR Boundaries",
    summary:
      "How to decide what should render on the server versus the client in modern React applications.",
    date: "2026-04-03",
    tags: ["Next.js", "Architecture", "Performance"],
  },
];

export async function getPostComponent(slug: string) {
  switch (slug) {
    case "content-security-policy-web-security":
      return import("@/content/blog/content-security-policy-web-security.mdx");
    case "architecting-ssr-csr-boundaries":
      return import("@/content/blog/architecting-ssr-csr-boundaries.mdx");
    case "accessibility-at-scale":
      return import("@/content/blog/accessibility-at-scale.mdx");
    default:
      return null;
  }
}
