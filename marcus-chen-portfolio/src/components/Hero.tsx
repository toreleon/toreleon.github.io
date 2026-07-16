import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

import { Reveal } from './animations/Reveal'
import { WordsPullUp } from './animations/WordsPullUp'
import { NoiseOverlay } from './NoiseOverlay'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import { heroPoster, heroVideo, personal } from '../data/portfolio'

/**
 * Full-viewport opening frame: a placeholder clip behind a bottom-heavy scrim,
 * with the name set as the page's single h1 near the lower edge.
 *
 * Motion policy: when `prefers-reduced-motion` is set the <video> is never
 * mounted at all — the poster still renders as a plain <img>, so playback
 * genuinely cannot start rather than merely being hidden.
 */
export default function Hero(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    // Null whenever reduced motion is on (the element is not rendered) or
    // before the first commit — both are valid states, so bail out quietly.
    if (!video) {
      return
    }

    if (prefersReducedMotion) {
      video.pause()
      return
    }

    // `autoPlay` covers the normal path; this re-arms playback if the attribute
    // was ignored (e.g. the preference flipped back mid-session).
    video.play().catch(() => {
      // Autoplay can be refused (low-power mode, data saver). The poster frame
      // stays visible, so the hero still reads correctly.
    })
  }, [prefersReducedMotion])

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen w-full flex-col p-4 supports-[min-height:100svh]:min-h-[100svh] md:p-6"
    >
      <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl bg-surface md:rounded-[2rem]">
        {/* --- Media stack. Non-interactive, sits under the copy. --- */}
        <div className="pointer-events-none absolute inset-0 bg-surface" aria-hidden="true">
          {prefersReducedMotion ? (
            <img
              src={heroPoster}
              alt=""
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={heroVideo}
              poster={heroPoster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* Bottom-heavy scrim: carries the h1 and the roles line. */}
          <div className="cinematic-overlay" />

          {/* Short top scrim so the status marker and the fixed navbar stay
              legible against a bright frame. */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

          <NoiseOverlay className="absolute inset-0" opacity={0.05} />
        </div>

        {/* --- Copy. Top marker pinned clear of the navbar, body at the base. --- */}
        <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-24 md:px-10 md:pb-12 md:pt-28 lg:px-14 lg:pb-14">
          <Reveal delay={0.1} distance={12}>
            <div className="inline-flex max-w-full items-center rounded-full border border-white/15 bg-black/20 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-[9px] uppercase tracking-[0.16em] text-cream/70 sm:text-[10px] sm:tracking-[0.2em]">
                {personal.availability}
              </span>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.15} distance={16}>
              <p className="font-serif-italic text-lg text-cream/60 sm:text-xl md:text-2xl">
                {personal.title}
              </p>
            </Reveal>

            <WordsPullUp
              text={personal.name}
              as="h1"
              delay={0.2}
              stagger={0.09}
              className="mt-3 max-w-full text-[19vw] font-extrabold leading-[0.82] tracking-[-0.06em] text-cream sm:mt-4 sm:text-[15vw] md:text-[14vw] lg:text-[12vw]"
            />

            <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <Reveal delay={0.5} className="lg:max-w-xl">
                <p className="text-pretty max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
                  {personal.roles}
                </p>
              </Reveal>

              <Reveal delay={0.6} className="lg:shrink-0">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#work"
                    className="focus-ring group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-black transition-colors duration-300 hover:bg-cream/90 sm:px-7 sm:text-base"
                  >
                    View selected work
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="#about"
                    className="focus-ring inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm text-cream/80 transition-colors duration-300 hover:border-white/30 hover:bg-white/5 hover:text-cream sm:px-7 sm:text-base"
                  >
                    About me
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
