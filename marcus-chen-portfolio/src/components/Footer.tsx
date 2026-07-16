import { useCallback } from 'react'
import { ArrowUp } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import { footer, personal } from '../data/portfolio'

export default function Footer(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Recomputed per render, but this component renders rarely and the value is
  // trivial — a memo here would cost more than it saves.
  const year = new Date().getFullYear()

  const handleBackToTop = useCallback((): void => {
    if (typeof window === 'undefined') {
      return
    }

    // Honour the OS setting: a long smooth scroll is exactly what "reduce" means.
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [prefersReducedMotion])

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 py-14 text-center sm:px-8 sm:py-16 md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
        {/* Identity */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-lg font-bold tracking-tight text-cream sm:text-xl">{personal.name}</p>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gray-400 sm:text-xs">
            {personal.title}
          </p>
        </div>

        {/* Tagline — the one expressive note in an otherwise quiet footer. */}
        <p className="max-w-[16rem] text-balance font-serif text-lg italic leading-snug text-gray-400 sm:max-w-none sm:text-xl">
          {footer.tagline}
        </p>

        {/* Back to top + copyright */}
        <div className="flex flex-col items-center gap-5 md:items-end">
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="focus-ring group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-gray-400 transition-colors duration-300 hover:border-cream/40 hover:text-cream"
          >
            <ArrowUp
              className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>

          <p className="text-xs text-gray-400">
            © {year} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
