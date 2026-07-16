import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Returns the id of the section currently considered "active" for nav highlighting.
 *
 * A single IntersectionObserver watches every section and wakes the picker when
 * section visibility changes; the picker then decides the winner geometrically,
 * which keeps the result stable for sections that are taller or shorter than the
 * viewport (where raw intersectionRatio is misleading).
 *
 * - Only calls setState when the value actually changes.
 * - Tolerates ids whose elements are not mounted yet, and re-checks on mount.
 * - Guarantees the final section is reachable at the bottom of the page, even if
 *   it is too short to ever cross the middle of the viewport.
 * - Returns '' when no tracked section has reached the anchor line yet — e.g.
 *   while the untracked hero fills the viewport. Consumers must treat that as
 *   "nothing active" rather than defaulting to the first section, which would
 *   otherwise claim the user is somewhere they have not scrolled to.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  rootMargin = '-30% 0px -30% 0px',
): string {
  // Parents typically pass an inline array; key on contents, not identity.
  const idsKey = sectionIds.join('|')
  const ids = useMemo<string[]>(() => idsKey.split('|').filter(Boolean), [idsKey])

  // Starts empty: at first paint nothing has been measured, and the page may
  // well be sitting on an untracked hero. Guessing the first section here would
  // paint a wrong indicator before the mount-time pick() corrects it.
  const [activeId, setActiveId] = useState<string>('')
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || ids.length === 0) {
      return
    }

    const getElements = (): HTMLElement[] =>
      ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

    // Commit only on real change so consumers don't re-render on every scroll tick.
    const commit = (next: string): void => {
      setActiveId((prev) => (prev === next ? prev : next))
    }

    const pick = (): void => {
      const elements = getElements()
      if (elements.length === 0) return

      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Bottom of the page: the last section wins outright. Without this a short
      // final section can never become active.
      if (scrollY + viewportHeight >= documentHeight - 2) {
        const last = elements[elements.length - 1]
        if (last) commit(last.id)
        return
      }

      // Anchor line sits in the upper third: a section becomes active once its
      // heading has comfortably entered the viewport.
      const anchor = scrollY + viewportHeight * 0.35

      // No fallback to the first section: above the first anchor crossing the
      // honest answer is "none", not "the first one".
      let current = ''
      for (const el of elements) {
        const top = el.getBoundingClientRect().top + scrollY
        if (top <= anchor) {
          current = el.id
        }
      }

      commit(current)
    }

    // Coalesce bursts of scroll/intersection events into one measurement per frame.
    const schedulePick = (): void => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null
        pick()
      })
    }

    const observer = new IntersectionObserver(schedulePick, {
      rootMargin,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })

    for (const el of getElements()) {
      observer.observe(el)
    }

    window.addEventListener('scroll', schedulePick, { passive: true })
    window.addEventListener('resize', schedulePick)

    // Initial measurement (covers deep links and restored scroll positions).
    pick()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedulePick)
      window.removeEventListener('resize', schedulePick)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [ids, rootMargin])

  return activeId
}
