import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { X } from 'lucide-react'
import type { NavItem } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Everything that can hold focus inside the panel, in DOM order. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export interface MobileMenuProps {
  /** Navbar owns this state; the panel only reads it. */
  isOpen: boolean
  /** Nav entries, straight from src/data/portfolio.ts. */
  items: readonly NavItem[]
  /** Section id currently highlighted by useActiveSection. */
  activeId: string
  /** Close without navigating (Escape, backdrop, close button). Must be stable. */
  onClose: () => void
  /** Close *and* scroll to `id`. Must be stable. */
  onNavigate: (id: string) => void
  /** DOM id of the panel — must match the toggle button's `aria-controls`. */
  id: string
}

/**
 * Animated navigation dropdown for viewports below `lg`.
 *
 * The `lg:hidden` on the backdrop and panel below must stay in lockstep with
 * Navbar's compact-bar/pill switch and its DESKTOP_BREAKPOINT media query —
 * all three describe the same handover width.
 *
 * The component itself stays mounted at all times and only the panel is
 * added/removed through AnimatePresence. That matters for the body scroll lock:
 * if the lock lived inside the animated panel it would only release once the
 * exit animation finished, which would swallow the scroll that follows a link
 * press. Keeping it here releases the lock the instant `isOpen` flips false.
 */
export function MobileMenu({
  isOpen,
  items,
  activeId,
  onClose,
  onNavigate,
  id,
}: MobileMenuProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()
  const panelRef = useRef<HTMLDivElement | null>(null)

  /*
   * Lock background scroll while open, restoring the exact previous inline values.
   * The cleanup also runs on unmount, so a fast close can never strand the page.
   *
   * <html> must be locked, not just <body>: index.css sets `overflow-x: hidden`
   * on html, and the UA only propagates body's overflow to the viewport while
   * html's own overflow is `visible` in BOTH axes. It is not here, so html owns
   * the viewport scroll and a body-only lock is silently ignored — the page
   * would keep scrolling behind this aria-modal dialog. Both elements are locked
   * so the behaviour holds regardless of which one ends up owning the scroll.
   */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const { body, documentElement: html } = document
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = html.style.overflow
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previousBodyOverflow
      html.style.overflow = previousHtmlOverflow
    }
  }, [isOpen])

  /* Escape closes from anywhere; Navbar returns focus to the toggle button. */
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  /* Move focus into the panel on open so the dialog name is announced and the
   * very next Tab lands on the first link rather than back in the page. */
  useEffect(() => {
    if (!isOpen) {
      return
    }
    panelRef.current?.focus({ preventScroll: true })
  }, [isOpen])

  const handleTabTrap = useCallback((event: ReactKeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'Tab') {
      return
    }

    const panel = panelRef.current
    if (!panel) {
      return
    }

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (event.shiftKey) {
      // The panel itself is the focus holder right after opening.
      if (active === first || active === panel) {
        event.preventDefault()
        last.focus()
      }
      return
    }

    if (active === last) {
      event.preventDefault()
      first.focus()
    }
  }, [])

  const handleLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string): void => {
      // Leave modified clicks (new tab / new window) to the browser.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return
      }
      event.preventDefault()
      onNavigate(sectionId)
    },
    [onNavigate],
  )

  const backdropVariants = useMemo<Variants>(
    () =>
      prefersReducedMotion
        ? {
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { duration: 0 } },
            exit: { opacity: 1, transition: { duration: 0 } },
          }
        : {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.28, ease: EASE } },
            exit: { opacity: 0, transition: { duration: 0.2, ease: EASE } },
          },
    [prefersReducedMotion],
  )

  const panelVariants = useMemo<Variants>(
    () =>
      prefersReducedMotion
        ? {
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { duration: 0 } },
            exit: { opacity: 1, transition: { duration: 0 } },
          }
        : {
            hidden: { opacity: 0, y: -10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.34,
                ease: EASE,
                delayChildren: 0.06,
                staggerChildren: 0.045,
              },
            },
            exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE } },
          },
    [prefersReducedMotion],
  )

  // Items inherit `hidden`/`visible` from the panel and have no exit of their
  // own — the panel fades as one piece on close.
  const itemVariants = useMemo<Variants>(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { duration: 0 } } }
        : {
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
          },
    [prefersReducedMotion],
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          aria-hidden="true"
          className="pointer-events-auto fixed inset-0 z-0 bg-black/70 lg:hidden"
        />
      )}

      {isOpen && (
        <motion.div
          key="mobile-menu-panel"
          ref={panelRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          onKeyDown={handleTabTrap}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="pointer-events-auto absolute inset-x-0 top-full z-10 px-4 pt-2 outline-none lg:hidden"
        >
          <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-surface p-2">
            {/* Landmarks the links while the panel is open. Named distinctly
                from the bar's "Primary" nav, which stays in the tree alongside it. */}
            <nav aria-label="Site sections">
              <ul className="flex flex-col gap-0.5">
                {items.map((item, index) => {
                  const isActive = item.id === activeId

                  return (
                    <motion.li key={item.id} variants={itemVariants}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => handleLinkClick(event, item.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`focus-ring flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-base transition-colors duration-300 ${
                          isActive
                            ? 'bg-cream text-black'
                            : 'text-gray-400 hover:bg-white/5 hover:text-primary'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden="true"
                          className={`font-serif-italic text-sm ${
                            isActive ? 'text-black/50' : 'text-gray-600'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* The bar's X sits outside this aria-modal dialog, so the panel
                carries its own close control for keyboard and screen readers. */}
            <div className="mt-2 border-t border-white/5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 transition-colors duration-300 hover:bg-white/5 hover:text-primary"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
