# Frontend Systems Portfolio — Workspace Documentation

Last updated: 2026-04-03

---

## 1) Project Overview

This is a Next.js portfolio workspace with an MDX-driven blog system.

### Primary goals
- Keep product pages/components in TypeScript/React.
- Keep blog content in `.mdx` so content can be edited without coding-heavy workflows.
- Dynamically load blog posts by slug from a central metadata file.

---

## 2) Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Content format:** MDX (`.mdx`)
- **MDX integration:** `@next/mdx`, `@mdx-js/react`, `@mdx-js/loader`
- **Package manager:** npm

---

## 3) Current Workspace Patterns

## 3.1 Blog metadata + routing map

File:
`src/lib/blog.ts`

Responsibilities:
- Defines `BlogPostMeta` type.
- Stores blog post metadata array (`blogPosts`) for listing pages.
- Provides `getPostComponent(slug)` to dynamically import post content files.

This gives:
- One place for list data (title, summary, tags, date).
- One place for slug → MDX file mapping.

---

## 3.2 Blog content location

Blog content files live in:
- `src/content/blog/*.mdx`

Each file is written as MDX, e.g.:
- `architecting-ssr-csr-boundaries.mdx`
- `accessibility-at-scale.mdx`

---

## 3.3 MDX typing

File:
`src/types/mdx.d.ts`

Purpose:
- Lets TypeScript understand `import "./something.mdx"` module shape.
- Prevents TS errors during development.

---

## 3.4 Next.js config for MDX

File:
`next.config.ts`

Pattern used:
- `createMDX` from `@next/mdx`
- `pageExtensions` includes `mdx`

This enables Next.js to compile `.mdx` files in the app.

---

## 4) What Was Fixed (History)

## Problem seen
Error:
`Unknown module type ... .mdx`

## Why it happened
- Next.js build system did not recognize `.mdx` yet (loader/config mismatch).

## Resolution
1. Added MDX dependencies.
2. Configured Next.js with `@next/mdx`.
3. Kept content as `.mdx` (no conversion to `.tsx`).
4. Ensured TS MDX module declaration exists.
5. Cleared cache (`.next`) and restarted dev server.

Outcome:
- Project now runs with MDX blog posts successfully.

---

## 5) Local Development Workflow

From project root:

```bash
cd "/Users/avinashgupta/Avinash Frontend Systems/portfolio"
npm install
npm run dev
```

Open:
- `http://localhost:3000`

---

## 6) How to Add a New Blog Post

## Step 1: Create MDX file

Create:
`src/content/blog/<slug>.mdx`

Example:
`src/content/blog/react-rendering-costs.mdx`

---

## Step 2: Add metadata in `src/lib/blog.ts`

Add object in `blogPosts`:
- `slug`
- `title`
- `summary`
- `date`
- `tags`

---

## Step 3: Add import mapping in `getPostComponent(slug)`

Add a `case` with same slug:
- `return import("@/content/blog/<slug>.mdx")`

---

## Step 4: Verify

Run:
```bash
npm run dev
```

Open blog listing and blog details route to confirm content loads.

---

## 7) Conventions Used

- **Slug format:** kebab-case (`accessibility-at-scale`)
- **Dates:** ISO string (`YYYY-MM-DD`)
- **Tags:** short label array
- **MDX title:** start file with `# H1` matching post title
- Keep metadata and MDX file slugs in sync.

---

## 8) Common Commands

```bash
# install deps
npm install

# dev server
npm run dev

# production build
npm run build

# start production server
npm run start

# clear next cache and restart
rm -rf .next && npm run dev
```

---

## 9) Troubleshooting Guide

## Issue: `Unknown module type` for `.mdx`
Checklist:
1. Confirm packages installed:
   - `@next/mdx`
   - `@mdx-js/react`
   - `@mdx-js/loader`
2. Confirm `next.config.ts` has MDX setup.
3. Confirm `pageExtensions` includes `mdx`.
4. Confirm file extension is exactly `.mdx`.
5. Remove cache: `rm -rf .next`
6. Restart server.

---

## Issue: TS error importing `.mdx`
- Ensure `src/types/mdx.d.ts` exists and is included by TS config scope.

---

## Issue: Post not found at runtime
- Check slug in metadata.
- Check switch case in `getPostComponent`.
- Check actual file name under `src/content/blog`.

---

## 10) Suggested Next Improvements

1. Replace manual switch with file-system discovery (`import.meta.glob` style alternative if supported).
2. Add frontmatter parsing for title/date/tags inside MDX files.
3. Add linting/validation to ensure slug consistency.
4. Add tests for `getPostComponent` and metadata integrity.
5. Add a script to scaffold new posts automatically.

---

## 11) Quick Architecture Summary

- **Data source for listing:** `src/lib/blog.ts`
- **Content source:** `src/content/blog/*.mdx`
- **Content loader:** dynamic import based on slug
- **Build integration:** `@next/mdx` via `next.config.ts`
- **Typing integration:** `src/types/mdx.d.ts`

This keeps content editing simple while preserving type safety and runtime clarity.

---