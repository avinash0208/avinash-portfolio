# Content Authoring

## Overview

This project separates **content metadata** from **rendered content**.

For the blog, a post usually requires:

1. a metadata entry
2. a slug
3. a rendered MDX/content file
4. optional SEO description/summary

## Blog Content Model

A blog post should include at least:

- `slug`
- `title`
- `summary`
- `date`

These records are typically stored in the blog utility layer.

## Adding a New Blog Post

### Step 1: Create the content file

Add a new MDX/content module for the post using the chosen slug.

Example:

```text
your-post-slug
```

### Step 2: Register the post metadata

Update the blog registry so the new post appears in:

- blog listings
- static params generation
- metadata generation

### Step 3: Verify slug consistency

The following must match exactly:

- file name or content key
- registry slug
- route slug

## Blog Routing Rules

Blog post detail pages are resolved by:

```text
/[locale]/blog/[slug]
```

### Current locale constraint

For blog pages, only the English locale is currently supported.

Expected behavior:

- `/en/blog/[slug]` works
- unsupported locale variants should return `notFound()`

## Lab Content

The lab section should follow the same discipline:

- keep listing metadata centralized
- keep route slugs stable
- use one source of truth for lookups
- reject unsupported locales consistently

## Writing Guidelines

Use these rules for content consistency:

- keep titles concise
- keep summaries between 1 and 3 sentences
- use stable slugs with lowercase words and hyphens
- prefer long-lived URLs
- avoid changing published slugs unless redirects are added

## MDX Guidelines

When writing MDX content:

- keep heading hierarchy valid
- use fenced code blocks with language identifiers
- prefer short paragraphs for readability
- avoid excessively large inline JSX blocks unless needed
- keep embedded components minimal and reusable

## SEO Guidance

For each post:

- write a clear title
- provide a meaningful summary
- ensure the summary can be reused as the page description

## Publishing Checklist

Before publishing a new post or lab entry:

- metadata added
- slug verified
- content renders without runtime errors
- route resolves correctly
- theme looks correct in light and dark mode
- navigation highlights the correct section
- metadata title and description are correct