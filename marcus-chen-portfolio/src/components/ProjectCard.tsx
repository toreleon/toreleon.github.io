import { ArrowUpRight } from 'lucide-react'
import { NoiseOverlay } from './NoiseOverlay'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import type { Project } from '../data/portfolio'

export interface ProjectCardProps {
  project: Project
  /**
   * Drops the card a step from `lg` up. Set by SelectedWork for the second card
   * of a paired row — the card itself has no knowledge of the grid it sits in.
   */
  offset?: boolean
  /** True when the card spans all 12 columns, which calls for a wider crop. */
  wide?: boolean
}

/** Shared editorial easing for every transition on the card. */
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

/**
 * A single editorial project card.
 *
 * With a real `href`, the whole frame is one interactive target: the "View
 * project" link stretches across the card via an ::after pseudo-element, so
 * there is exactly one tab stop and no nested interactive elements.
 *
 * With `href: null` there is nowhere to go, so the card is not a link, not a
 * button and not focusable — the same rule ExpertiseCard follows. Presenting a
 * link to '#' instead would announce "View project" to assistive tech and then
 * scroll the reader back to the top of the page on activation.
 */
export function ProjectCard({ project, offset = false, wide = false }: ProjectCardProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Destructured so TypeScript narrows it to `string` inside the linked branch.
  const { href } = project

  const isLarge = project.size === 'large'

  /*
   * Large stills stand tall; standard stills sit wide; a full-width card takes a
   * cinematic crop, because a 4/5 frame at 12 columns would be several screens
   * tall. Fixed aspect boxes mean the grid never reflows once the image decodes,
   * and `width`/`height` below must keep matching whichever ratio wins here.
   */
  const aspectClass = wide ? 'aspect-[16/9]' : isLarge ? 'aspect-[4/5]' : 'aspect-[3/2]'
  const intrinsicHeight = wide ? 900 : isLarge ? 2000 : 1067

  const offsetClass = offset ? 'lg:mt-20' : ''

  const imageMotionClass = prefersReducedMotion
    ? ''
    : `transition-transform duration-[1200ms] ${EASE} group-hover:scale-[1.04] group-focus-within:scale-[1.04]`

  /*
   * Secondary metadata reveal.
   *
   * Default state is fully visible — that is what touch devices and reduced
   * motion users get. Only pointers that can actually hover opt into the
   * hidden-until-hover state via `@media (hover: hover)`, and `group-hover` /
   * `group-focus-within` out-specify that media query to bring it back.
   *
   * A card with no destination has no focusable child, so `group-focus-within`
   * can never fire and a keyboard user would have no way to reveal the copy.
   * Those cards therefore keep the metadata visible at all times.
   */
  const revealClass =
    prefersReducedMotion || href === null
      ? ''
      : [
          'transition-[opacity,transform] duration-700',
          EASE,
          '[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-2',
          'group-hover:opacity-100 group-hover:translate-y-0',
          'group-focus-within:opacity-100 group-focus-within:translate-y-0',
        ].join(' ')

  return (
    <article className={`group relative ${offsetClass}`}>
      <div className="relative overflow-hidden rounded-2xl bg-card ring-1 ring-white/5 group-focus-within:ring-2 group-focus-within:ring-cream">
        <div className={`relative w-full ${aspectClass}`}>
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={intrinsicHeight}
            className={`absolute inset-0 h-full w-full object-cover ${imageMotionClass}`}
          />
        </div>

        {/* Film grain, sitting between the still and the scrims. */}
        <NoiseOverlay className="absolute inset-0" opacity={0.05} />

        {/* Bottom scrim (shared utility) + a top scrim so the index stays legible. */}
        <div className="cinematic-overlay" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent"
          aria-hidden="true"
        />

        {/* Deepens the frame slightly on hover / focus. */}
        <div
          className={`pointer-events-none absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ${
            prefersReducedMotion ? '' : `transition-opacity duration-700 ${EASE}`
          }`}
          aria-hidden="true"
        />

        <span
          className="pointer-events-none absolute left-5 top-5 text-[0.6875rem] tracking-[0.22em] text-cream/70 sm:left-6 sm:top-6"
          aria-hidden="true"
        >
          {project.number}
        </span>
      </div>

      <div className="mt-5 sm:mt-6">
        {/*
         * `min-w-0` lets a long category wrap instead of forcing the row wider
         * than the card; the year stays on one line so a range such as
         * '2020–2022' can never break across the en dash.
         */}
        <div className="flex items-baseline justify-between gap-4">
          <span className="min-w-0 text-[0.6875rem] uppercase tracking-[0.18em] text-gray-400">
            {project.category}
          </span>
          <span className="shrink-0 whitespace-nowrap text-[0.6875rem] tabular-nums tracking-[0.18em] text-gray-400">
            {project.year}
          </span>
        </div>

        <h3 className="mt-2 text-balance text-2xl leading-tight tracking-tight text-cream sm:text-3xl">
          {project.title}
        </h3>

        {/* `break-words` guards the narrowest viewport against long compounds. */}
        <p
          className={`mt-3 max-w-md text-pretty break-words text-sm leading-relaxed text-gray-400 ${revealClass}`}
        >
          {project.description}
        </p>

        {/*
         * Only rendered when there is somewhere to go. The ::after stretches
         * this one link across the whole card, so the frame is a single tab
         * stop with no nested interactive elements.
         *
         * Every destination in the data is an external record (the COVIDROP
         * DOI), so it opens in a new tab — and the accessible name says so, and
         * names the project, because "View project" alone is meaningless out of
         * context in a list of links.
         */}
        {href !== null && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View project: ${project.title} (opens in a new tab)`}
            className={`focus-ring mt-4 inline-flex items-center gap-1.5 rounded-sm text-[0.6875rem] uppercase tracking-[0.18em] text-cream after:absolute after:inset-0 after:content-[''] ${revealClass}`}
          >
            View project
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}
