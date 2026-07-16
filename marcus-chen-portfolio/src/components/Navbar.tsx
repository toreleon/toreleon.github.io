import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { nav as navItems, personal } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const MOBILE_MENU_ID = 'primary-mobile-menu'
/**
 * Must stay in lockstep with the `lg:hidden` / `lg:flex` pair below (and with
 * MobileMenu's own `lg:hidden`): this is the width at which the compact bar
 * hands over to the pill. The nav carries seven items, which no longer fit the
 * pill at `md` — 'EXPERIENCE' and 'PUBLICATIONS' are long words and the pill is
 * letterspaced — so the handover sits at Tailwind's `lg` (1024px).
 */
const DESKTOP_BREAKPOINT = '(min-width: 1024px)'

/** Section ids observed for the active-state indicator. Stable across renders. */
const NAV_IDS: readonly string[] = navItems.map((item) => item.id)

/** Breathing room between the header and the heading it scrolls to. */
const SCROLL_GAP = 24

export function Navbar(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()
  const activeId = useActiveSection(NAV_IDS)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  /**
   * The header is fixed, so `scrollIntoView({ block: 'start' })` would tuck each
   * section heading behind it. Section components should carry a
   * `scroll-mt-24 md:scroll-mt-28` utility for the no-JS / native-hash path; on
   * top of that we sync the *measured* header height onto every nav target here,
   * so the offset stays exact when the bar re-flows (larger text settings, a
   * longer wordmark) and so a section that forgot the utility still lands right.
   */
  useEffect(() => {
    const header = headerRef.current
    if (!header) {
      return
    }

    const targets = (): HTMLElement[] =>
      NAV_IDS.map((id) => document.getElementById(id)).filter(
        (el): el is HTMLElement => el !== null,
      )

    const sync = (): void => {
      const offset = header.offsetHeight + SCROLL_GAP
      for (const el of targets()) {
        el.style.scrollMarginTop = `${offset}px`
      }
    }

    sync()

    const observer = new ResizeObserver(sync)
    observer.observe(header)

    return () => {
      observer.disconnect()
      for (const el of targets()) {
        el.style.scrollMarginTop = ''
      }
    }
  }, [])

  const scrollToSection = useCallback(
    (sectionId: string): void => {
      const target = document.getElementById(sectionId)
      if (!target) {
        return
      }

      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })

      // Keep the URL shareable without letting the browser jump the viewport.
      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, '', `#${sectionId}`)
      }
    },
    [prefersReducedMotion],
  )

  const handleLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string): void => {
      // Leave modified clicks (new tab / new window) to the browser.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return
      }
      event.preventDefault()
      scrollToSection(sectionId)
    },
    [scrollToSection],
  )

  const closeMenu = useCallback((): void => {
    setIsOpen(false)
    // Return focus to the control that opened the panel.
    toggleRef.current?.focus({ preventScroll: true })
  }, [])

  const handleMobileNavigate = useCallback(
    (sectionId: string): void => {
      closeMenu()
      // The body scroll lock is released by MobileMenu's effect cleanup on the
      // next commit; scrolling before that would be swallowed while overflow is
      // still hidden. Two frames guarantees we run after that cleanup.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToSection(sectionId))
      })
    },
    [closeMenu, scrollToSection],
  )

  const toggleMenu = useCallback((): void => {
    setIsOpen((open) => !open)
  }, [])

  const handleWordmarkClick = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search)
    }
  }, [prefersReducedMotion])

  /* The toggle is display:none from `lg` up — never leave the panel (and its
   * scroll lock) alive after a resize into the desktop layout. */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT)
    const handleChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        setIsOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isOpen])

  const indicatorTransition = {
    duration: prefersReducedMotion ? 0 : 0.45,
    ease: EASE,
  }

  return (
    // pointer-events-none on the shell so the header's empty width never steals
    // clicks from the hero underneath; every real control opts back in.
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/*
        Compact bar (< lg). Serves phones, tablets and small laptops — every
        width below the pill's handover point.

        A <nav> rather than a plain <div>: the desktop pill below is display:none
        under lg, which drops it out of the accessibility tree entirely, so
        without this the page would expose no navigation landmark at all on a
        phone. The two are mutually exclusive, so they share the "Primary" name.
      */}
      <nav aria-label="Primary" className="lg:hidden">
        <div className="pointer-events-auto relative z-20 mx-4 mt-3 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-black/90 py-2 pl-5 pr-2 backdrop-blur-sm">
          <button
            type="button"
            onClick={handleWordmarkClick}
            aria-label={`${personal.name} — back to top`}
            className="focus-ring truncate rounded-full text-[13px] font-bold uppercase tracking-[0.16em] text-primary transition-colors duration-300 hover:text-cream"
          >
            {personal.name}
          </button>

          <button
            ref={toggleRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary transition-colors duration-300 hover:bg-white/5"
          >
            {isOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Desktop pill (lg+) */}
      <nav
        aria-label="Primary"
        className="relative z-20 hidden justify-center px-6 pt-5 lg:flex"
      >
        {/*
          Seven items fit here at the unchanged px-4 / 0.16em rhythm: measured in
          Almarai they come to ~802px of pill against ~960px of usable width at
          lg (1024px less this nav's px-6 and a scrollbar), so the spacing did not
          need tightening to absorb 'Experience' and 'Publications'. Adding an
          eighth item, or a longer label than 'Publications', is what would spend
          that headroom — re-measure before doing either.
        */}
        <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/90 p-1.5 backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = item.id === activeId

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => handleLinkClick(event, item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`focus-ring relative block rounded-full px-4 py-2.5 text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      aria-hidden="true"
                      transition={indicatorTransition}
                      className="absolute inset-0 rounded-full bg-cream"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <MobileMenu
        id={MOBILE_MENU_ID}
        isOpen={isOpen}
        items={navItems}
        activeId={activeId}
        onClose={closeMenu}
        onNavigate={handleMobileNavigate}
      />
    </header>
  )
}

export default Navbar
