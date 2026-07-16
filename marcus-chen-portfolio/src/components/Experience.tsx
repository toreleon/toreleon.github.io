import { StaggerGrid, StaggerItem } from './animations/StaggerGrid'
import { WordsPullUp } from './animations/WordsPullUp'
import { experience } from '../data/portfolio'

/**
 * Selected experience — a quiet editorial timeline.
 *
 * All copy comes from `experience` in src/data/portfolio.ts. These entries are
 * real history, so the section states them plainly: the data carries no
 * supporting line and none is invented here.
 *
 * The section is named with `aria-label` rather than `aria-labelledby`, because
 * the heading is rendered by WordsPullUp, which takes no `id`.
 */
export default function Experience(): JSX.Element {
  return (
    <section
      id="experience"
      aria-label={experience.title}
      className="scroll-mt-24 py-28 sm:py-36 lg:py-44"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <header className="max-w-3xl">
          <WordsPullUp
            as="h2"
            text={experience.title}
            className="text-4xl font-light leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl"
          />
        </header>

        <StaggerGrid as="ul" className="-mx-3 mt-14 sm:-mx-4 sm:mt-20" stagger={0.08} delay={0.1}>
          {experience.items.map((item) => (
            <StaggerItem
              key={item.id}
              as="li"
              className="group border-t border-white/10 last:border-b"
            >
              <div className="grid px-3 py-8 transition-colors duration-500 ease-out group-hover:bg-surface sm:px-4 md:grid-cols-12 md:gap-x-6 md:py-10">
                {/*
                 * Period — small label on mobile, left column on desktop. Wider
                 * at md so a full 'Jan 2024 – Present' stays on one line; the
                 * three-column rhythm resumes at lg where the columns are roomy.
                 */}
                <div className="md:col-span-4 md:pt-1 lg:col-span-3">
                  <span className="flex items-center text-sm tabular-nums text-gray-400 transition-colors duration-500 ease-out group-hover:text-cream">
                    {item.period}
                  </span>
                </div>

                {/* Role + organisation. */}
                <div className="mt-3 md:col-span-8 md:mt-0 lg:col-span-4">
                  <h3 className="text-lg font-normal leading-snug text-cream sm:text-xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400 text-pretty">
                    {item.org}
                  </p>
                </div>

                {/*
                 * One-line summary. At md it drops below the role and aligns to
                 * it rather than being squeezed into a third narrow column.
                 */}
                <p className="mt-2 text-sm leading-relaxed text-gray-400 text-pretty md:col-span-8 md:col-start-5 md:mt-4 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:pt-1">
                  {item.summary}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
