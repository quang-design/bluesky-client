# Bluesky Client (Codecademy Portfolio Project) WIP

A modern, responsive Bluesky client built with SvelteKit, Tailwind CSS, and svelte-shadcn UI. This project adapts Codecademy’s “Build Your Own Reddit App” portfolio project—but instead of React + Reddit API, it uses Svelte + Bluesky API to deliver a fast, pleasant social browsing experience.

Live Demo: [Add your Vercel URL here]
Repository: [Add your GitHub URL here]

## Why Bluesky + Svelte instead of Reddit + React?

- Bluesky provides a rich, open API via `@atproto/api` that’s fun to build with.
- SvelteKit offers excellent DX, performance, and file-based routing with minimal boilerplate.
- Tailwind CSS + svelte-shadcn provides a cohesive, themeable design system out of the box.

This still satisfies the spirit of the Codecademy project: building a full-stack, API-driven client with clean UX, search, filtering, detailed views, and strong web fundamentals.

## Tech Stack

- Svelte 5 + SvelteKit 2
- Tailwind CSS 4 + svelte-shadcn (UI primitives)
- Icons via `@lucide/svelte`
- Bluesky API via `@atproto/api`
- Vite 7
- TypeScript
- Deploy on Vercel

Key files:

- `src/lib/api.ts`: Initializes the Bluesky `Agent` (App View service)
- `src/routes/+layout.svelte`: Global layout with `NavBar` and base styles
- `src/lib/components/nav-bar.svelte`: Sticky header, responsive search UI
- `src/lib/components/post.svelte`: Post UI building block (rendering/content)

## Features

- Responsive layout and navigation with a sticky top bar
- Search entry UI with mobile dialog and desktop inline search
- Cohesive design tokens and components via svelte-shadcn
- Iconography with Lucide
- Baseline accessibility considerations
- Vercel-ready build and preview

Planned/roadmap features:

- Search results fetching from Bluesky App View API
- Post list/feed with pagination or infinite scroll
- Post detail view with dialogs/routes
- Profile view
- Filters (e.g., posts vs quotes vs media)
- Error and empty states
- Animations and subtle transitions

## Getting Started

Prerequisites:

- Node.js 18+
- pnpm (recommended): `npm i -g pnpm`

Install dependencies:

```sh
pnpm install
```

Run in development:

```sh
pnpm dev
# or open automatically
pnpm dev -- --open
```

Type-check and lint:

```sh
pnpm check
pnpm lint
pnpm format
```

Build and preview production:

```sh
pnpm build
pnpm preview
```

Scripts come from `package.json` and include:

- `dev`: Vite dev server
- `build`: Vite build (SvelteKit)
- `preview`: Preview production build
- `prepare`: `svelte-kit sync`
- `check` / `check:watch`: Svelte type-checking
- `format`: Prettier write
- `lint`: Prettier check + ESLint

## Bluesky API Setup

This app initializes an unauthenticated App View client via `@atproto/api`:

- See `src/lib/api.ts` for the `Agent` configured with `service: https://api.bsky.app`.
- Many read-only endpoints work without auth. If you want authenticated features (e.g., interactions), switch to a PDS (e.g., `https://bsky.social`) and implement login.

Optional environment variables (if adding auth later):

- `BLUESKY_IDENTIFIER` (handle or DID)
- `BLUESKY_PASSWORD` (app password)

Store secrets with Vercel Environment Variables (never commit secrets).

## Project Management & Documentation

- Use GitHub Projects or Trello to plan and track tasks
- Wireframes: add images under `docs/wireframes/` and link below

Wireframes:

- Home/Feed: [docs/wireframes/home.png]
- Search: [docs/wireframes/search.png]
- Detail: [docs/wireframes/detail.png]

## Testing Plan

Planned testing stack:

- Unit tests: Vitest + @testing-library/svelte
- E2E: Playwright (recommended for SvelteKit)

Example goals:

- Unit test `post.svelte` rendering logic and states
- E2E test search flow and detail view navigation

Note: The original Codecademy spec mentions Jest/Enzyme/Selenium (React-centric). For Svelte, Vitest/Testing Library/Playwright offer an idiomatic setup.

## Accessibility & Design System

- svelte-shadcn primitives to ensure consistent, accessible surfaces
- Landmarks and semantic HTML in layout and components
- Focus states and keyboard navigation for dialogs and inputs
- Color contrast targets aligned with WCAG AA

## Performance & Lighthouse

Target scores:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

Tips:

- Prefer App View JSON over heavy embeds where possible
- Lazy-load images and non-critical content
- Use Tailwind’s utility-first approach to keep CSS small

## Browser & Device Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive from mobile to desktop

## Deployment (Vercel)

- Framework preset: SvelteKit
- Default `@sveltejs/adapter-auto` works on Vercel
- Set environment variables in Vercel dashboard if adding auth
- `pnpm build` is run by Vercel automatically

## Roadmap / Future Work

- Implement search query integration with Bluesky App View
- Add feeds, post list, and infinite scrolling
- Post details with comments/quotes view
- Filters by content type and author
- Auth (optional) for likes/reposts/follows
- Offline-friendly enhancements (optional PWA)
- CI/CD with GitHub Actions and Vercel
- Comprehensive unit and E2E tests

## Contributing

Issues and PRs are welcome. Please run `pnpm lint` and `pnpm check` before submitting.

## License

[MIT](LICENSE) — feel free to use this as a starting point for your own client.
