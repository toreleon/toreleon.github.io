import { useCallback, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion'

/** Typed as a 4-tuple so Framer's `Easing` accepts it — a bare array widens to number[]. */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const IN_VIEW_OPTIONS = { once: true, margin: '-10% 0px' } as const

type StaggerGridTag = 'div' | 'ul'
type StaggerItemTag = 'div' | 'li' | 'article'

/**
 * Items rise into place; with reduced motion the two states are identical, so an
 * item is visible whatever variant label the container happens to be resolving.
 */
const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

const STATIC_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
}

export interface StaggerGridProps {
  children: ReactNode
  className?: string
  /** Seconds between each child. */
  stagger?: number
  /** Seconds before the first child. */
  delay?: number
  as?: StaggerGridTag
}

/**
 * Variants container. Never animates its own opacity — only orchestrates its
 * children — so the group itself can never be stranded invisible.
 *
 * Reduced motion: `initial={false}` plus a zero stagger means children mount at
 * their final state with no travel.
 */
export function StaggerGrid({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
}: StaggerGridProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()

  const containerRef = useRef<HTMLElement | null>(null)
  // Callback ref typed to HTMLElement so one ref serves every polymorphic tag.
  const setContainer = useCallback((node: HTMLElement | null): void => {
    containerRef.current = node
  }, [])
  const isInView = useInView(containerRef, IN_VIEW_OPTIONS)

  const variants: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : stagger,
          delayChildren: prefersReducedMotion ? 0 : delay,
        },
      },
    }),
    [delay, prefersReducedMotion, stagger],
  )

  const motionProps = {
    ref: setContainer,
    className,
    variants,
    initial: prefersReducedMotion ? false : ('hidden' as const),
    animate: prefersReducedMotion || isInView ? 'visible' : 'hidden',
  }

  if (as === 'ul') {
    return <motion.ul {...motionProps}>{children}</motion.ul>
  }

  return <motion.div {...motionProps}>{children}</motion.div>
}

export interface StaggerItemProps {
  children: ReactNode
  className?: string
  as?: StaggerItemTag
}

/**
 * Variant consumer. Deliberately declares no `initial`/`animate` so it inherits
 * the label from its StaggerGrid parent — that inheritance is what drives the
 * stagger. Rendered outside a StaggerGrid it simply stays visible.
 */
export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()
  const variants = prefersReducedMotion ? STATIC_ITEM_VARIANTS : ITEM_VARIANTS

  switch (as) {
    case 'li':
      return (
        <motion.li variants={variants} className={className}>
          {children}
        </motion.li>
      )
    case 'article':
      return (
        <motion.article variants={variants} className={className}>
          {children}
        </motion.article>
      )
    default:
      return (
        <motion.div variants={variants} className={className}>
          {children}
        </motion.div>
      )
  }
}
