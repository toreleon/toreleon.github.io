# Thang Le Viet — Portfolio

A dark, cinematic, editorial single-page portfolio for an AI engineer working on agentic AI
for software engineering. Built as a static site: large typography, generous negative space,
restrained motion, and strong image presentation.

The site is always dark. Every animation is gated behind `prefers-reduced-motion`, and all
content remains readable with animation fully disabled.

## Tech stack

- **Vite 5** — dev server and build
- **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** — design tokens live in `tailwind.config.js`
- **Framer Motion 11** — scroll reveals and staggered text
- **Lucide React** — icons
- **Almarai** (global sans) + **Instrument Serif** (expressive italic), loaded from Google Fonts

## Prerequisites

- **Node.js 18+**
- npm (ships with Node)

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server at http://localhost:5173
npm run build   # typecheck, then build to dist/
npm run preview # serve the production build locally
npm run typecheck # types only, no build
```

## Project structure

```
marcus-chen-portfolio/
├── index.html               # shell, meta tags, Google Fonts
├── tailwind.config.js       # DESIGN TOKENS (colors, fonts)
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx             # React entry
    ├── App.tsx              # page assembly + skip link
    ├── index.css            # base styles, noise / overlay / focus utilities
    ├── data/
    │   └── portfolio.ts     # ← ALL EDITABLE CONTENT
    ├── hooks/
    │   ├── useReducedMotion.ts   # usePrefersReducedMotion()
    │   └── useActiveSection.ts   # nav scroll-spy
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── About.tsx
        ├── SelectedWork.tsx
        ├── Expertise.tsx
        ├── Experience.tsx
        ├── Contact.tsx
        ├── Footer.tsx
        ├── NoiseOverlay.tsx
        └── animations/
            ├── WordsPullUp.tsx
            ├── Reveal.tsx
            └── StaggerGrid.tsx
```

## Editing your content

**All editable personal content lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
You should not need to touch any component to make the site your own. That file holds:

| Export         | What it controls                                                    |
| -------------- | ------------------------------------------------------------------- |
| `personal`     | Name, title, roles, status line, **contact email**, location, experience, focus — the last three also feed the About facts row |
| `heroVideo`    | The hero background video URL                                        |
| `heroPoster`   | The still shown while the video loads                                |
| `nav`          | Nav labels and the section ids they scroll to                        |
| `about`        | About statement, paragraph, and the facts row labels                 |
| `work`         | Section title and intro                                              |
| `projects`     | The six case studies: title, year, category, description, image      |
| `expertise`    | The four capability items and their Lucide icons                     |
| `experience`   | The experience timeline                                              |
| `education`    | Degrees: period, degree, field, institution, and detail (e.g. GPA)   |
| `publications` | Published papers: authors, title, venue, year, and DOI link          |
| `socials`      | Social profile links                                                 |
| `contact`      | Contact heading, body, and CTA label                                 |
| `footer`       | Footer tagline                                                       |

### Content rules worth keeping

- **Every claim traces to the CV.** The copy in `portfolio.ts` is real professional history, so
  figures are quoted exactly (`83.7%`, `50+`, `55% to 70%`, `over 5x`, `8%`). Do not round,
  inflate, or invent metrics, clients, or credentials when editing.
- **No availability claim.** `personal.availability` is a neutral status line (current role and
  base), not an open-to-work badge. Keep it factual.
- **No phone number.** Deliberately excluded; the email is the only contact channel.

### Things you must replace before publishing

- **Hero video** — `heroVideo` points at a placeholder file. Swap in your own hosted video.
- **Images** — every `image` and `heroPoster` is a placeholder [Unsplash](https://unsplash.com)
  URL: dark, abstract textures chosen to read as one system on black. Replace them with your own
  art, and update each `imageAlt` to describe what is actually in the frame (this is what
  screen-reader users hear).
- **Project links** — every project's `href` is `null` except COVIDROP, which points at its
  published DOI. A `null` card renders as a plain, non-interactive article rather than a link
  that goes nowhere. Set `href` to a real URL and the whole card becomes one link, with its
  "View project" row.

Social links are **live**: `socials` already points at the owner's real GitHub and LinkedIn
profiles. Experience entries are real history, not sample content.

### Text rendered in italic serif

A few strings are split into segments so the middle segment can render in Instrument Serif
italic while the rest stays in Almarai:

- `about.statementLead` + `about.statementEmphasis` + `about.statementRest`
- `contact.headingLead` + `contact.headingEmphasis` + `contact.headingRest`

Keep the leading/trailing spaces when editing these — the segments are concatenated as-is.

## Design tokens

Colours and fonts are defined once in **`tailwind.config.js`**:

```js
colors: { primary: '#DEDBC8', cream: '#E1E0CC', surface: '#101010', card: '#212121' }
fontFamily: { sans: ['Almarai', 'sans-serif'], serif: ['"Instrument Serif"', 'serif'] }
```

The page background is `#000000`. `surface` (`#101010`) and `card` (`#212121`) are the only
elevated surfaces. Almarai is the global font; Instrument Serif italic is reserved for
expressive text — role descriptions, quotes, and highlighted phrases.

If you change fonts here, update the Google Fonts `<link>` in `index.html` to match.
