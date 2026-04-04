# Copilot Instructions

## Project Overview

This repository is a senior frontend engineer portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.

Primary goals:
- Showcase SSR/CSR architecture decisions.
- Maintain strong accessibility and performance quality.
- Support multilingual setup (English/Hindi planned).
- Include MDX blogs and Lab demos with concise LLD notes.

## Commands

Run from repository root.

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

## Architecture Notes

- `src/app/page.tsx`: portfolio landing with section overviews.
- `src/app/lab/page.tsx`: CSR interactive demos and LLD notes.
- `src/app/blog/page.tsx`: MDX blog index.
- `src/app/blog/[slug]/page.tsx`: MDX blog detail route.
- `src/content/blog/*.mdx`: blog content source.
- `src/lib/site-content.ts`: structured section content.
- `src/lib/blog.ts`: blog metadata and loader mapping.

## Conventions

- Keep all app logic in TypeScript with strict typing.
- Favor server components by default and explicitly mark client components.
- Keep reusable UI in `src/components`.
- Include concise comments only where logic is not obvious.
- Preserve accessibility semantics in every new UI section.

## Quality Gates

Before finalizing changes:
- Lint clean.
- Build passes.
- No obvious keyboard navigation regressions.
- Dark and light theme readability maintained.
