import { Reveal } from './animations/Reveal'
import { StaggerGrid, StaggerItem } from './animations/StaggerGrid'
import { WordsPullUp } from './animations/WordsPullUp'
import { ProjectCard } from './ProjectCard'
import { projects, work } from '../data/portfolio'
import type { Project } from '../data/portfolio'

/** The `lg` grid is 12 columns wide; every row should consume all of them. */
const ROW_COLUMNS = 12

/** `size` is the only knob the data file exposes for the editorial rhythm. */
const SPAN_BY_SIZE: Record<Project['size'], number> = {
  large: 7,
  standard: 5,
}

/** Tailwind only sees class names it can find as literals, so map them explicitly. */
const SPAN_CLASS: Record<number, string> = {
  5: 'lg:col-span-5',
  7: 'lg:col-span-7',
  12: 'lg:col-span-12',
}

interface ProjectLayout {
  project: Project
  /** Column span applied from `lg` up. */
  spanClass: string
  /** Second card of a pair: drops a step so the row reads as a composition. */
  offset: boolean
  /** Alone on its row, so it takes all 12 columns instead of leaving a hole. */
  wide: boolean
}

/**
 * Packs the projects into 12-column rows, mirroring CSS grid's own sparse
 * auto-placement: an item that cannot fit in the space left on the current row
 * moves to the next one.
 *
 * Today's data pairs exactly — large/standard, standard/large, large/standard,
 * i.e. 7+5, 5+7, 7+5 — so this returns three full rows and changes nothing. It
 * exists so that editing `projects` cannot quietly produce a ragged hole: any
 * card left alone on a row is widened to the full 12 columns on purpose rather
 * than floating beside dead space.
 */
function layoutProjects(items: readonly Project[]): ProjectLayout[] {
  const rows: Project[][] = []
  let row: Project[] = []
  let filled = 0

  for (const project of items) {
    const span = SPAN_BY_SIZE[project.size]
    if (filled + span > ROW_COLUMNS) {
      rows.push(row)
      row = []
      filled = 0
    }
    row.push(project)
    filled += span
  }
  if (row.length > 0) {
    rows.push(row)
  }

  return rows.flatMap((cards) =>
    cards.map((project, indexInRow) => {
      const isAlone = cards.length === 1
      return {
        project,
        spanClass: SPAN_CLASS[isAlone ? ROW_COLUMNS : SPAN_BY_SIZE[project.size]],
        // A full-width card has nothing to sit against, so it never drops.
        offset: !isAlone && indexInRow === 1,
        wide: isAlone,
      }
    }),
  )
}

const layout: ProjectLayout[] = layoutProjects(projects)

/**
 * Editorial index range derived from the project count — never hardcoded — so it
 * stays true when projects are added or removed. Six projects read '01 — 06',
 * matching the `number` badges the cards themselves render.
 */
const indexRange: string | null = ((): string | null => {
  if (projects.length === 0) {
    return null
  }
  const last = String(projects.length).padStart(2, '0')
  return projects.length === 1 ? last : `01 — ${last}`
})()

export function SelectedWork(): JSX.Element {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-white/5 px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <header>
          {indexRange !== null && (
            <Reveal>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-8 bg-white/20" />
                <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-gray-400">
                  {indexRange}
                </span>
              </div>
            </Reveal>
          )}

          <WordsPullUp
            as="h2"
            text={work.title}
            delay={0.05}
            className="mt-6 text-balance text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl"
          />

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-gray-400">
              {work.intro}
            </p>
          </Reveal>
        </header>

        {/*
         * Single column on mobile; a 12-column editorial grid from `lg` up where
         * `size` drives the alternating 7 / 5 rhythm straight from the data.
         */}
        <StaggerGrid
          as="ul"
          stagger={0.09}
          delay={0.05}
          className="mt-16 grid grid-cols-1 items-start gap-x-6 gap-y-14 sm:gap-y-16 lg:mt-24 lg:grid-cols-12 lg:gap-x-8"
        >
          {layout.map(({ project, spanClass, offset, wide }) => (
            <StaggerItem key={project.id} as="li" className={spanClass}>
              <ProjectCard project={project} offset={offset} wide={wide} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
