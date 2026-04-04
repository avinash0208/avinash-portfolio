import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mb-4 mt-8 text-3xl font-bold text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-3 mt-6 text-2xl font-semibold text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-4 text-xl font-semibold text-foreground">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 list-disc pl-6 text-foreground/90">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 list-decimal pl-6 text-foreground/90">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    a: ({ children, href }) => (
      <a href={href} className="font-medium text-accent underline underline-offset-4 hover:opacity-85">
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded border border-border bg-surface px-1.5 py-0.5 text-sm text-foreground">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-border pl-4 italic text-muted">{children}</blockquote>
    ),
    ...components,
  };
}
