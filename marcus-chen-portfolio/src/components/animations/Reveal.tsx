import { useCallback, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion'

/** Typed as a 4-tuple so Framer's `Easing` accepts it — a bare array widens to number[]. */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const IN_VIEW_MARGIN = '-10% 0px'

type RevealTag = 'div' | 'section' | 'li' | 'article'

export interface RevealProps {
  children: ReactNode
  /** Seconds before the reveal starts. */
  delay?: number
  /** Pixels of upward travel. */
  distance?: number
  className?: string
  /** Reveal only the first time it enters the viewport. */
  once?: boolean
  as?: RevealTag
}

/**
 * Fade-up wrapper. Content lifts `distance` px into place as it enters view.
 *
 * Reduced motion: `initial={false}` skips the enter state entirely, so the element
 * mounts at its final, fully opaque position with a zero-duration transition —
 * content is never left at opacity 0.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  className,
  once = true,
  as = 'div',
}: RevealProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()

  const containerRef = useRef<HTMLElement | null>(null)
  // Callback ref typed to HTMLElement so one ref serves every polymorphic tag.
  const setContainer = useCallback((node: HTMLElement | null): void => {
    containerRef.current = node
  }, [])
  const isInView = useInView(containerRef, { once, margin: IN_VIEW_MARGIN })

  const variants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0 },
    }),
    [distance],
  )

  const transition: Transition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0, delay: 0 }
        : { duration: 0.7, delay, ease: EASE_OUT },
    [delay, prefersReducedMotion],
  )

  const motionProps = {
    ref: setContainer,
    className,
    variants,
    transition,
    initial: prefersReducedMotion ? false : ('hidden' as const),
    animate: prefersReducedMotion || isInView ? 'visible' : 'hidden',
  }

  switch (as) {
    case 'section':
      return <motion.section {...motionProps}>{children}</motion.section>
    case 'li':
      return <motion.li {...motionProps}>{children}</motion.li>
    case 'article':
      return <motion.article {...motionProps}>{children}</motion.article>
    default:
      return <motion.div {...motionProps}>{children}</motion.div>
  }
}
