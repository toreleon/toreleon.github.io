import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { about } from '../data/portfolio'
import { NoiseOverlay } from './NoiseOverlay'
import { Reveal } from './animations/Reveal'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

/* -------------------------------------------------------------------------- */
/*  Statement composition                                                     */
/*                                                                            */
/*  The about statement arrives as three segments that concatenate into ONE   */
/*  sentence, with the middle segment set in Instrument Serif italic. The     */
/*  word pull-up is implemented inline (rather than by stacking three         */
/*  WordsPullUp instances) so that the stagger runs continuously across the   */
/*  whole sentence AND so that segment boundaries that fall mid-word — here   */
/*  the italic '…engineering' immediately followed by the roman '.' that      */
/*  opens statementRest — never gain a stray space or a line break.           */
/*                                                                            */
/*  The tokenizer below is segment-driven, never word-driven: it knows only   */
/*  about whitespace runs, so it stays correct if the copy is rewritten and   */
/*  the boundaries move. Its contract is exact reconstruction — concatenating */
/*  every rendered token in order reproduces statementLead + statementEmphasis */
/*  + statementRest character for character, which is what guarantees no       */
/*  doubled or swallowed space at a boundary.                                 */
/* -------------------------------------------------------------------------- */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface StatementPart {
  text: string
  emphasis: boolean
}

/**
 * A whitespace run, kept verbatim and tagged with the segment it came from.
 * Gaps are rendered rather than re-synthesised so a run of any width survives,
 * and so a space *inside* the emphasis is set in the emphasis face — the italic
 * phrase spans several words, and a roman space between them would break its
 * metric rhythm.
 */
interface StatementGap {
  kind: 'gap'
  key: string
  part: StatementPart
}

/**
 * One whitespace-delimited word, and the animation unit. A word closes only on
 * whitespace, so when a segment boundary lands mid-word the pieces stay welded
 * into this single inline-block — each keeping its own segment's typeface — and
 * can never be split across lines.
 */
interface StatementWord {
  kind: 'word'
  key: string
  parts: readonly StatementPart[]
}

type StatementToken = StatementGap | StatementWord

const statementSegments: readonly StatementPart[] = [
  { text: about.statementLead, emphasis: false },
  { text: about.statementEmphasis, emphasis: true },
  { text: about.statementRest, emphasis: false },
]

/**
 * Flattens the segments into an alternating stream of words and whitespace
 * runs. Splitting on a captured `(\s+)` keeps every character, and appending a
 * non-whitespace chunk to an already-open word is what welds a mid-word segment
 * boundary together.
 */
function buildStatementTokens(segments: readonly StatementPart[]): readonly StatementToken[] {
  type MutableWord = { kind: 'word'; parts: StatementPart[] }
  type MutableToken = { kind: 'gap'; part: StatementPart } | MutableWord

  const tokens: MutableToken[] = []

  for (const segment of segments) {
    for (const chunk of segment.text.split(/(\s+)/)) {
      /* `split` emits '' at the edges when the text starts or ends on a match. */
      if (chunk === '') continue

      const part: StatementPart = { text: chunk, emphasis: segment.emphasis }

      if (/^\s+$/.test(chunk)) {
        tokens.push({ kind: 'gap', part })
        continue
      }

      const open = tokens[tokens.length - 1] as MutableToken | undefined
      if (open !== undefined && open.kind === 'word') {
        open.parts.push(part)
      } else {
        tokens.push({ kind: 'word', parts: [part] })
      }
    }
  }

  return tokens.map((token, index) =>
    token.kind === 'gap'
      ? { kind: 'gap', key: `gap-${index}`, part: token.part }
      : {
          kind: 'word',
          key: `word-${index}-${token.parts.map((part) => part.text).join('')}`,
          parts: token.parts,
        },
  )
}

/* Static data → derive once at module scope rather than on every render. */
const statementTokens: readonly StatementToken[] = buildStatementTokens(statementSegments)

const statementContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.055 },
  },
}

const statementWordVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

const STATEMENT_CLASS =
  'mx-auto max-w-4xl text-balance text-center text-3xl font-light leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl lg:text-6xl'

function emphasisClass(emphasis: boolean): string | undefined {
  return emphasis ? 'font-serif italic font-normal' : undefined
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function About(): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()

  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-10% 0px' })

  const paragraphRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.95', 'start 0.55'],
  })
  /* Clamped by default: the copy is never dimmer than 0.35 and never hidden. */
  const paragraphOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1])

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 px-4 py-24 md:scroll-mt-28 md:px-6 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-2xl border border-white/5 bg-surface px-5 py-16 sm:px-10 sm:py-20 md:rounded-[2rem] md:px-16 md:py-24 lg:px-20 lg:py-28">
          <NoiseOverlay className="absolute inset-0" opacity={0.03} />

          <div className="relative">
            {/* Section label */}
            <Reveal className="flex items-center justify-center">
              <span className="text-[0.6875rem] uppercase tracking-[0.25em] text-gray-400">
                {about.label}
              </span>
            </Reveal>

            {/* Main statement — one continuous sentence, word pull-up */}
            {prefersReducedMotion ? (
              <h2 id="about-heading" ref={headingRef} className={`${STATEMENT_CLASS} mt-8 md:mt-10`}>
                {statementSegments.map((segment) => (
                  <span key={segment.text} className={emphasisClass(segment.emphasis)}>
                    {segment.text}
                  </span>
                ))}
              </h2>
            ) : (
              <motion.h2
                id="about-heading"
                ref={headingRef}
                className={`${STATEMENT_CLASS} mt-8 md:mt-10`}
                variants={statementContainerVariants}
                initial="hidden"
                animate={headingInView ? 'visible' : 'hidden'}
              >
                {statementTokens.map((token) =>
                  token.kind === 'gap' ? (
                    /* Plain span: no variants, so it never joins the stagger and
                       stays a natural line-break opportunity. */
                    <span key={token.key} className={emphasisClass(token.part.emphasis)}>
                      {token.part.text}
                    </span>
                  ) : (
                    <motion.span
                      key={token.key}
                      variants={statementWordVariants}
                      className="inline-block"
                    >
                      {token.parts.map((part, partIndex) => (
                        <span
                          key={`${token.key}-${partIndex}`}
                          className={emphasisClass(part.emphasis)}
                        >
                          {part.text}
                        </span>
                      ))}
                    </motion.span>
                  ),
                )}
              </motion.h2>
            )}

            {/* Supporting paragraph — scroll-linked, always legible */}
            <motion.div
              ref={paragraphRef}
              style={{ opacity: prefersReducedMotion ? 1 : paragraphOpacity }}
              className="mt-8 md:mt-10"
            >
              <p className="mx-auto max-w-2xl text-pretty text-center text-base leading-relaxed text-gray-400 md:text-lg md:leading-relaxed">
                {about.paragraph}
              </p>
            </motion.div>

            {/* Secondary information row */}
            <Reveal delay={0.1} className="mt-14 md:mt-20">
              <dl className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                {about.facts.map((fact) => (
                  <div key={fact.label} className="px-2 py-6 text-center md:px-6 md:py-8">
                    <dt className="text-[0.625rem] uppercase tracking-[0.2em] text-gray-400">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-balance text-sm text-cream md:text-base">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
