# Portfolio

A personal portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS** using the **App Router**.

## Overview

This repository contains the portfolio website, including:

- a landing page
- a lab/projects section
- a blog section
- theme switching
- locale-aware routing primitives

At present, **blog** and **lab** pages are intentionally served in **English only**.

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **MDX** for long-form blog content

## Key Features

- App Router-based file system routing
- Static generation for content pages
- Metadata generation per route
- Reusable top navigation
- Theme toggle support
- Structured content loading for blog posts

## Project Structure

```text
portfolio/
├─ src/
│  ├─ app/
│  │  └─ [locale]/
│  │     ├─ blog/
│  │     ├─ lab/
│  │     └─ ...
│  ├─ components/
│  │  ├─ site-nav.tsx
│  │  ├─ theme-toggle.tsx
│  │  └─ ...
│  ├─ lib/
│  │  ├─ blog.ts
│  │  ├─ i18n.ts
│  │  └─ ...
│  └─ ...
├─ docs/
│  ├─ architecture.md
│  ├─ content-authoring.md
│  └─ contributing.md
└─ README.md
```

## Routing

Routes are organized under a locale segment:

- `/[locale]`
- `/[locale]/blog`
- `/[locale]/blog/[slug]`
- `/[locale]/lab`

### Locale behavior

The application includes locale-aware routing utilities.  
However, **blog** and **lab** currently accept only:

- `en`

Requests for unsupported locales in those sections should resolve to `notFound()`.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Lint the project:

```bash
npm run lint
```

## Content System

Blog posts are defined through structured metadata and dynamically loaded content modules.

Typical flow:

1. Post metadata is stored in a central blog registry.
2. A page resolves the route slug.
3. The matching MDX/content module is loaded.
4. Static params and metadata are generated from that source.

See [docs/content-authoring.md](./docs/content-authoring.md).

## Styling

The UI uses utility-first styling with Tailwind CSS.

Current navigation design follows a minimal editorial pattern:

- text-first links
- active underline
- lightweight header layout
- theme toggle on the right

## Documentation

- [Architecture](./docs/architecture.md)
- [Content Authoring](./docs/content-authoring.md)
- [Contributing](./docs/contributing.md)

## Maintenance Notes

When changing navigation, routes, or content loading:

- keep `currentPath` matching rules aligned with route shape
- keep static params in sync with supported routes
- update metadata generation when post structure changes
- preserve `notFound()` handling for invalid slugs/locales

## License

Add a license file if this repository is intended for public distribution.
