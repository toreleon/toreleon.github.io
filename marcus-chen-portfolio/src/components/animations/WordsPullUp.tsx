import { Fragment, useCallback, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion'

/** Typed as a 4-tuple so Framer's `Easing` accepts it — a bare array widens to number[]. */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const WORD_VARIANTS: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const IN_VIEW_OPTIONS = { once: true, margin: '-10% 0px' } as const

type WordsPullUpTag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface WordToken {
  kind: 'word'
  value: string
  /** Position among words only, so whitespace never consumes a stagger step. */
  order: number
}

interface SpaceToken {
  kind: 'space'
  value: string
}

type Token = WordToken | SpaceToken

/**
 * Splits on whitespace while KEEPING the separators, so the original spacing
 * survives verbatim: words wrap naturally, copy/paste reproduces the source
 * string, and a meaningful leading/trailing space (e.g. copy that is meant to
 * butt up against an adjacent italic span) is never silently dropped.
 */
function tokenize(text: string): Token[] {
  let order = 0
  return text
    .split(/(\s+)/)
    .filter((part) => part.length > 0)
    .map<Token>((value) =>
      /^\s+$/.test(value) ? { kind: 'space', value } : { kind: 'word', value, order: order++ },
    )
}

export interface WordsPullUpProps {
  text: string
  /** Applied to the wrapping element. */
  className?: string
  /** Applied to each word span. */
  wordClassName?: string
  /** Seconds before the first word. */
  delay?: number
  /** Seconds between words. */
  stagger?: number
  as?: WordsPullUpTag
}

/**
 * Word-by-word pull-up. Each word rises from y:20 to y:0 as it fades in, staggered
 * left to right, triggered once when the block scrolls into view.
 *
 * Reduced motion: no motion components at all — plain, fully opaque spans that keep
 * `wordClassName` styling intact, so the text reads identically without animating.
 */
export function WordsPullUp({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as = 'span',
}: WordsPullUpProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()

  const containerRef = useRef<HTMLElement | null>(null)
  // Callback ref typed to HTMLElement so one ref serves every polymorphic tag.
  const setContainer = useCallback((node: HTMLElement | null): void => {
    containerRef.current = node
  }, [])
  const isInView = useInView(containerRef, IN_VIEW_OPTIONS)

  const tokens = useMemo(() => tokenize(text), [text])

  const wordClasses = wordClassName ? `inline-block ${wordClassName}` : 'inline-block'

  const content: ReactNode = tokens.map((token, index) => {
    if (token.kind === 'space') {
      return <Fragment key={index}>{token.value}</Fragment>
    }

    if (prefersReducedMotion) {
      return (
        <span key={index} className={wordClassName}>
          {token.value}
        </span>
      )
    }

    return (
      <motion.span
        key={index}
        className={wordClasses}
        variants={WORD_VARIANTS}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration: 0.7,
          ease: EASE_OUT,
          delay: delay + token.order * stagger,
        }}
      >
        {token.value}
      </motion.span>
    )
  })

  switch (as) {
    case 'h1':
      return (
        <h1 ref={setContainer} className={className}>
          {content}
        </h1>
      )
    case 'h2':
      return (
        <h2 ref={setContainer} className={className}>
          {content}
        </h2>
      )
    case 'h3':
      return (
        <h3 ref={setContainer} className={className}>
          {content}
        </h3>
      )
    case 'p':
      return (
        <p ref={setContainer} className={className}>
          {content}
        </p>
      )
    default:
      return (
        <span ref={setContainer} className={className}>
          {content}
        </span>
      )
  }
}
