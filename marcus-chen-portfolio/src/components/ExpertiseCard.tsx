import { ArrowUpRight } from 'lucide-react'
import type { ExpertiseItem } from '../data/portfolio'

export interface ExpertiseCardProps {
  item: ExpertiseItem
}

/**
 * A single discipline card.
 *
 * The card is deliberately NOT interactive: there is no destination for these
 * four disciplines, so it is not a link, not a button, and not focusable. The
 * "Learn more" row is a decorative hover affordance only — it is aria-hidden so
 * assistive tech never announces an action that does not exist.
 */
export function ExpertiseCard({ item }: ExpertiseCardProps): JSX.Element {
  const Icon = item.icon

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-card p-6 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/10 sm:p-8 lg:p-10">
      {/* Restrained warm lift on hover — no glow, no shadow, no scale. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cream/[0.02] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-cream/20">
          <Icon className="h-5 w-5 text-cream" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="pt-1 text-xs tabular-nums tracking-[0.2em] text-gray-400">
          {item.number}
        </span>
      </div>

      <div className="relative mt-10 sm:mt-12">
        {/*
         * Titles run long ('Agentic AI for Software Engineering'), so they are
         * balanced rather than left ragged, and step back down at md — the point
         * where the grid becomes two columns but the viewport has not yet caught
         * up — before returning to full size in the roomy lg columns.
         */}
        <h3 className="text-balance text-xl font-normal leading-snug tracking-tight text-cream sm:text-2xl md:text-xl lg:text-2xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-gray-400">
          {item.description}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative mt-auto flex items-center gap-2 pt-8 text-[0.6875rem] uppercase tracking-[0.18em] text-gray-500 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-cream group-hover:opacity-100 sm:pt-10"
      >
        <span>Learn more</span>
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </div>
    </article>
  )
}
