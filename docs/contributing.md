# Contributing

## General Rules

- keep changes small and intentional
- prefer reusable components over duplicated markup
- preserve existing naming conventions
- avoid mixing styling, routing, and content logic in one place

## Code Style

### TypeScript

- prefer explicit types for public props and shared utilities
- keep route param typing readable
- avoid unnecessary `any`

### React

- keep components focused
- move repeated logic into helpers
- keep server component logic simple and route-oriented

### Styling

- use existing utility conventions
- prefer spacing and typography consistency over decorative styling
- keep navigation and layout patterns minimal

## Routing Changes

When editing route files:

- validate route params
- update static params if needed
- update metadata generation if content shape changes
- preserve `notFound()` for invalid states

## Content Changes

When adding blog or lab content:

- use stable slugs
- update the content registry
- verify the page renders correctly
- check navigation and metadata

## QA Checklist

Before merging:

- run the app locally
- verify light mode
- verify dark mode
- verify active navigation states
- verify blog and lab routes
- verify unsupported locale behavior for blog/lab
- run linting

## Suggested Workflow

1. create a feature branch
2. make focused changes
3. test locally
4. run lint
5. open a pull request with a short summary

## Pull Request Notes

A good pull request should include:

- what changed
- why it changed
- affected routes/components
- screenshots for visible UI changes
- any follow-up work