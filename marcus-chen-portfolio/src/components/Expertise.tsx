import { expertise } from '../data/portfolio'
import { StaggerGrid, StaggerItem } from './animations/StaggerGrid'
import { WordsPullUp } from './animations/WordsPullUp'
import { ExpertiseCard } from './ExpertiseCard'

/**
 * The "What I do" section: four disciplines in a 2x2 editorial grid.
 *
 * All copy comes from `expertise` in src/data/portfolio.ts. The data has no
 * supporting line for this section, so none is rendered — nothing is invented here.
 */
export function Expertise(): JSX.Element {
  return (
    <section
      id="expertise"
      aria-label={expertise.title}
      className="scroll-mt-24 border-t border-white/5 px-6 py-24 sm:px-8 md:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        <WordsPullUp
          as="h2"
          text={expertise.title}
          className="max-w-3xl text-4xl font-light tracking-tight text-cream sm:text-5xl lg:text-6xl"
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:gap-6 lg:mt-24">
          {expertise.items.map((item) => (
            <StaggerItem key={item.number} className="h-full">
              <ExpertiseCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
