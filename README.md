## Thang Le Viet — Portfolio (Next.js + Tailwind)

A fast, single‑page developer portfolio built with Next.js App Router, React 19, and Tailwind CSS v4. The site statically exports for GitHub Pages and includes smooth section transitions, manual dark mode, and a clean content structure you can edit in one place.

— Live URL: add your site link here

## Features

- Modern stack: Next.js 15, React 19, Tailwind v4
- Static export: optimized for GitHub Pages hosting
- Section nav: smooth scrolling + active section indicator
- Manual dark mode: lightweight toggle, no client provider needed
- Clean content model: edit intro, work history, publications, and links in one file

## Tech Stack

- Next.js App Router and Static Export
- React 19 + TypeScript
- Tailwind CSS v4 + tw-animate-css
- Radix UI primitives and shadcn-style components
- Optional: @vercel/analytics (installed, not wired by default)

## Quick Start

- Prerequisites: Node 20+, PNPM 10+
- Install: `pnpm install`
- Dev: `pnpm dev` then open http://localhost:3000
- Build: `pnpm build` → outputs static site to `out/`
- Preview static build: `pnpm dlx serve out` (or any static file server)

## Editing Content

- Site metadata: update title/description in `app/layout.tsx:12`
- Main content: edit sections in `app/page.tsx:70` (intro), `app/page.tsx:147` (work), `app/page.tsx:245` (publications), `app/page.tsx:286` (connect/socials)
- Global styles and theme tokens: `app/globals.css:1`
- Images and assets: place files in `public/`

Notes
- The page highlights performance metrics in bullet points using a simple pattern highlighter.
- Theme toggling works by toggling the `dark` class on `<html>`; no provider is required. A Next Themes provider is scaffolded at `components/theme-provider.tsx:1` if you prefer system theme and persistence.

## Deployment (GitHub Pages)

This repo is preconfigured to deploy via GitHub Actions to GitHub Pages.

- Workflow: `.github/workflows/deploy.yml:1`
- Static export: `next.config.mjs:1` sets `output: 'export'` and auto‑configures `basePath/assetPrefix` for project pages.

Steps
- Enable Pages: Settings → Pages → Source: GitHub Actions
- Push to `main`: the action builds and publishes `out/` to Pages
- User vs project pages
  - User site (`username.github.io`): served at root (no basePath)
  - Project site (`username.github.io/repo`): `next.config.mjs` computes `basePath` automatically when running on GitHub Actions

Local path testing for project pages
- If serving under a subpath locally, set `NEXT_PUBLIC_BASE_PATH=/<repo>` and emulate by opening files from `out/` (optional; the action handles this in CI).

## Project Structure

- `app/`: App Router pages and layout
- `app/layout.tsx`: fonts, metadata, global CSS
- `app/page.tsx`: all portfolio sections and content arrays
- `app/globals.css`: Tailwind v4 entry + CSS variables + animations
- `components/`: UI building blocks (Radix/shadcn‑style)
- `public/`: static assets (images, icons)
- `next.config.mjs`: static export + GitHub Pages pathing
- `.github/workflows/deploy.yml`: CI for Pages

## Development Notes

- TypeScript/ESLint: build ignores type and lint errors to avoid blocking static export. Fix issues during dev with your editor or `pnpm lint`.
- Static export: avoid server‑only features (no API routes). Client components and static data are fine.

## Customize This Template

- Replace name, headline, and location in `app/page.tsx:80`
- Update work history and bullet points in `app/page.tsx:158`
- Edit publications in `app/page.tsx:251`
- Update social links in `app/page.tsx:289`
- Tweak colors/radii in `app/globals.css:4`

## Acknowledgements

- Generated with v0.dev (Vercel) — see `app/layout.tsx:12` generator tag
- Radix UI, shadcn/ui patterns, Lucide React icons

## License

No license file is included. If this is public, add a `LICENSE` file (e.g., MIT) or keep the code private.
