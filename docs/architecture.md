# Architecture

## Application Model

This project uses the **Next.js App Router** with route segments under `src/app`.

A locale segment is present in the route structure:

```text
src/app/[locale]/
```

This allows route-aware rendering while keeping the UI and content model modular.

## Main Areas

### 1. App routes

Route files under `src/app/[locale]` define pages such as:

- home
- blog listing
- blog detail
- lab listing
- lab detail

These pages may export:

- `generateStaticParams`
- `generateMetadata`
- default async page components

### 2. Shared UI components

Reusable UI lives under `src/components`.

Examples:

- `SiteNav`
- `ThemeToggle`

These components should remain presentation-focused and accept data through props.

### 3. Library utilities

Shared logic lives under `src/lib`.

Examples:

- `i18n.ts` for locale/message helpers
- `blog.ts` for post metadata and content resolution

This layer should contain content loading, route-aware helpers, and data utilities.

## Blog Page Flow

A blog detail route generally follows this sequence:

1. Read `locale` and `slug` from route params.
2. Validate the route locale.
3. Find the post metadata from the blog registry.
4. Load the post component by slug.
5. Return `notFound()` if any step fails.
6. Render the page with metadata, summary, and MDX content.

## Static Generation

Content pages are designed to support pre-rendering.

### `generateStaticParams`

Used to prebuild known routes such as blog posts.

Example behavior:

- iterate over known post slugs
- return `{ locale: "en", slug }`

### `generateMetadata`

Used to set per-page metadata such as:

- title
- description

This keeps content pages SEO-aware without duplicating metadata manually.

## Navigation

`SiteNav` is responsible for top-level navigation.

### Current behavior

- renders links for home, lab, and blog
- determines active state from `currentPath`
- shows a minimalist underline for the active route
- renders the theme toggle on the right

### Active link logic

A route is considered active when:

- `/` matches only `/`
- other links match exact path or nested descendants

This avoids false positives while preserving nested page highlighting.

## Internationalization

Locale helpers are managed through `src/lib/i18n`.

### Current rule

The application has locale-aware structure, but **blog** and **lab** currently support only:

- `en`

If broader locale support is restored later:

- update static params
- update message resolution
- update route validation
- review content parity for translated sections

## Content Loading

Blog content is split into:

- metadata registry
- rendered content module

This keeps listing pages fast and detail pages structured.

Recommended pattern:

- keep metadata serializable
- keep long-form content in MDX/content modules
- load by slug through a single utility

## Design Principles

- keep route components thin
- keep shared logic in `src/lib`
- keep UI components reusable
- fail fast with `notFound()` on invalid route state
- keep metadata generation close to the page boundary

## Future Improvements

Recommended future extensions:

- formal content schema validation
- shared type definitions for content records
- automated tests for route params and active nav state
- docs for deployment and environment variables if introduced