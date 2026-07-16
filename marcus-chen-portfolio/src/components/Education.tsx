import { StaggerGrid, StaggerItem } from './animations/StaggerGrid'
import { WordsPullUp } from './animations/WordsPullUp'
import { education } from '../data/portfolio'

/**
 * Education — the same hairline-row system as Selected experience.
 *
 * All copy comes from `education` in src/data/portfolio.ts. Each row is reduced
 * to the four things the CV actually records: period, award, awarding
 * institution, and the one detail line. Nothing is inferred beyond the "in"
 * that joins degree to field, which is how the CV itself phrases it.
 *
 * `aria-label` rather than `aria-labelledby`: WordsPullUp renders no `id`, so
 * pointing at one would name the section after an element that does not exist.
 */
export function Education(): JSX.Element {
  return (
    <section
      id="education"
      aria-label={education.title}
      className="scroll-mt-24 py-28 sm:py-36 lg:py-44"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <WordsPullUp
          as="h2"
          text={education.title}
          className="max-w-3xl text-4xl font-light leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl"
        />

        <StaggerGrid as="ul" className="-mx-3 mt-14 sm:-mx-4 sm:mt-20" stagger={0.08} delay={0.1}>
          {education.items.map((item) => (
            <StaggerItem
              key={item.id}
              as="li"
              className="group border-t border-white/10 last:border-b"
            >
              <div className="grid px-3 py-8 transition-colors duration-500 ease-out group-hover:bg-surface sm:px-4 md:grid-cols-12 md:gap-x-6 md:py-10">
                {/*
                 * Period — small label on mobile, left column on desktop. Column
                 * rhythm mirrors Selected experience: wider at md so a full
                 * 'Sep 2023 – Mar 2026' stays on one line, resuming the
                 * three-column rhythm at lg where the columns are roomy.
                 */}
                <div className="md:col-span-4 md:pt-1 lg:col-span-3">
                  <span className="flex items-center text-sm tabular-nums text-gray-400 transition-colors duration-500 ease-out group-hover:text-cream">
                    {item.period}
                  </span>
                </div>

                {/* The award itself, then the institution that granted it. */}
                <div className="mt-3 md:col-span-8 md:mt-0 lg:col-span-5">
                  <h3 className="text-balance text-lg font-normal leading-snug text-cream sm:text-xl">
                    {item.degree} in {item.field}
                  </h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-gray-400">
                    {item.institution}
                  </p>
                </div>

                {/*
                 * The single recorded detail — GPA, and any standing beside it.
                 * At md it drops below the award and aligns to it rather than
                 * being squeezed into a third narrow column.
                 */}
                <p className="mt-2 text-pretty text-sm leading-relaxed tabular-nums text-gray-400 md:col-span-8 md:col-start-5 md:mt-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:pt-1">
                  {item.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}

export default Education
