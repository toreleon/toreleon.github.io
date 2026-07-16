import { ArrowUpRight } from 'lucide-react'
import { NoiseOverlay } from './NoiseOverlay'
import { StaggerGrid, StaggerItem } from './animations/StaggerGrid'
import { WordsPullUp } from './animations/WordsPullUp'
import { publications } from '../data/portfolio'

/**
 * Publications — peer-reviewed work, given room rather than compressed into a row.
 *
 * All copy comes from `publications` in src/data/portfolio.ts and is rendered as
 * a plain citation: authors, title, venue, year, DOI. The DOI is a real external
 * destination, so it is the one place on this section that opens a new tab.
 *
 * Mapped over `items` rather than hardcoded to the single current paper, so a
 * second publication needs a data edit and nothing else.
 *
 * `aria-label` rather than `aria-labelledby`: WordsPullUp renders no `id`, so
 * pointing at one would name the section after an element that does not exist.
 */
export function Publications(): JSX.Element {
  return (
    <section
      id="publications"
      aria-label={publications.title}
      className="scroll-mt-24 border-t border-white/5 py-28 sm:py-36 lg:py-44"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <WordsPullUp
          as="h2"
          text={publications.title}
          className="max-w-3xl text-4xl font-light leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl"
        />

        <StaggerGrid
          as="ul"
          className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 md:gap-6"
          stagger={0.08}
          delay={0.1}
        >
          {publications.items.map((item) => (
            <StaggerItem key={item.id} as="li">
              <article className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-7 sm:p-10 md:rounded-[2rem] md:p-14">
                {/* Film grain, scoped to the card. Caller supplies the position. */}
                <NoiseOverlay className="absolute inset-0" opacity={0.04} />

                {/* Lifted above the grain layer. */}
                <div className="relative max-w-3xl">
                  <p className="text-sm leading-relaxed text-gray-400">{item.authors}</p>

                  <h3 className="mt-4 text-balance text-2xl font-light leading-[1.15] tracking-tight text-cream sm:text-3xl lg:text-4xl">
                    {/* <cite> is the right element for a work's title; the design
                        reserves italics for Instrument Serif, so reset it here. */}
                    <cite className="not-italic">{item.title}</cite>
                  </h3>

                  <p className="mt-5 text-pretty text-sm leading-relaxed tabular-nums text-gray-400">
                    {item.venue} ({item.year})
                  </p>

                  {/*
                   * inline-block so the top margin applies while the DOI still
                   * wraps as text; `break-all` keeps the URL inside the card at
                   * 320px, and the arrow flows with the final line.
                   */}
                  <a
                    href={item.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read ${item.title} at ${item.doi} (opens in a new tab)`}
                    className="focus-ring group/doi mt-8 inline-block max-w-full rounded-sm text-xs tabular-nums tracking-[0.08em] text-cream sm:text-sm"
                  >
                    <span className="break-all underline decoration-white/25 underline-offset-4 transition-colors duration-500 ease-out group-hover/doi:decoration-cream/70">
                      {item.doi}
                    </span>
                    <ArrowUpRight className="ml-1.5 inline h-3.5 w-3.5 align-[-0.15em]" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}

export default Publications
