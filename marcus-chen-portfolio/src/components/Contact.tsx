import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { Reveal } from './animations/Reveal'
import { WordsPullUp } from './animations/WordsPullUp'
import { contact, personal, socials } from '../data/portfolio'

/* -------------------------------------------------------------------------- */
/*  Heading timing                                                             */
/*                                                                            */
/*  The closing line is one continuous sentence rendered as three <WordsPullUp> */
/*  spans (Almarai / Instrument Serif italic / Almarai). To keep the pull-up    */
/*  reading as ONE sentence rather than three separate animations, each segment */
/*  starts where the previous one left off — its delay is the running word      */
/*  count multiplied by the shared stagger.                                     */
/* -------------------------------------------------------------------------- */

const HEADING_STAGGER = 0.06

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length
}

/** `headingLead` carries a trailing space in the data; spacing is handled in JSX. */
const HEADING_LEAD = contact.headingLead.trim()
const EMPHASIS_DELAY = countWords(contact.headingLead) * HEADING_STAGGER
const REST_DELAY = EMPHASIS_DELAY + countWords(contact.headingEmphasis) * HEADING_STAGGER

/* -------------------------------------------------------------------------- */
/*  Clipboard                                                                  */
/* -------------------------------------------------------------------------- */

type CopyState = 'idle' | 'copied' | 'error'

const COPY_RESET_MS = 2000

/**
 * Last-resort copy for non-secure contexts and browsers without the async
 * Clipboard API. Returns false rather than throwing so the caller can surface a
 * failure state instead of leaking an error to the console.
 */
function copyViaTextarea(value: string): boolean {
  if (typeof document === 'undefined') {
    return false
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.setAttribute('aria-hidden', 'true')
  textarea.setAttribute('tabindex', '-1')
  // Keep it out of the layout and off-screen so nothing shifts or flashes.
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.width = '1px'
  textarea.style.height = '1px'
  textarea.style.padding = '0'
  textarea.style.border = 'none'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'
  document.body.appendChild(textarea)

  let copied = false
  try {
    textarea.select()
    textarea.setSelectionRange(0, value.length)
    copied = document.execCommand('copy')
  } catch {
    copied = false
  } finally {
    textarea.remove()
  }

  return copied
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function Contact(): JSX.Element {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const resetTimerRef = useRef<number | null>(null)

  // Never set state after unmount: the 2s "Copied" revert is the only timer here.
  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
        resetTimerRef.current = null
      }
    }
  }, [])

  const handleCopy = useCallback((): void => {
    const settle = (state: Exclude<CopyState, 'idle'>): void => {
      setCopyState(state)

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }
      resetTimerRef.current = window.setTimeout(() => {
        resetTimerRef.current = null
        setCopyState('idle')
      }, COPY_RESET_MS)
    }

    const clipboard = typeof navigator === 'undefined' ? undefined : navigator.clipboard

    if (clipboard && typeof clipboard.writeText === 'function') {
      // The promise can reject on permission denial or in a non-secure context.
      // Catch it here so no unhandled rejection ever reaches the console.
      clipboard.writeText(personal.email).then(
        () => settle('copied'),
        () => settle(copyViaTextarea(personal.email) ? 'copied' : 'error'),
      )
      return
    }

    settle(copyViaTextarea(personal.email) ? 'copied' : 'error')
  }, [])

  const copied = copyState === 'copied'
  const copyLabel = copied ? 'Copied' : copyState === 'error' ? 'Copy failed' : personal.email
  const copyAnnouncement = copied
    ? 'Email address copied to clipboard'
    : copyState === 'error'
      ? 'Could not copy the email address automatically. Please copy it manually.'
      : ''

  return (
    <section id="contact" className="scroll-mt-24 px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32 md:pb-40 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-surface px-5 py-20 sm:rounded-[2.25rem] sm:px-10 sm:py-24 md:rounded-[2.5rem] md:px-16 md:py-32 lg:py-40">
          {/* Film grain on the elevated surface — decorative, never interactive. */}
          <div className="noise-overlay absolute inset-0" aria-hidden="true" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal>
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gray-400 sm:text-xs sm:tracking-[0.32em]">
                {contact.label}
              </p>
            </Reveal>

            {/*
              Reads as one sentence: "Have a problem worth solving?".
              The explicit space expression below separates the lead from the
              italic segment; headingRest follows the emphasis with no JSX
              whitespace at all, so the '?' hugs "solving" instead of drifting.
            */}
            <h2 className="mt-7 text-balance text-4xl leading-[0.95] tracking-tight text-cream sm:mt-8 sm:text-5xl md:text-7xl lg:text-8xl">
              <WordsPullUp text={HEADING_LEAD} stagger={HEADING_STAGGER} />
              {' '}
              <WordsPullUp
                text={contact.headingEmphasis}
                className="font-serif italic"
                delay={EMPHASIS_DELAY}
                stagger={HEADING_STAGGER}
              />
              <WordsPullUp text={contact.headingRest} delay={REST_DELAY} stagger={HEADING_STAGGER} />
            </h2>

            <Reveal delay={0.16} className="w-full">
              {/* mx-auto, not just items-center: the Reveal wrapper is as wide as the column. */}
              <p className="mx-auto mt-7 max-w-xl text-pretty text-sm leading-relaxed text-gray-400 sm:mt-8 sm:text-base">
                {contact.body}
              </p>
            </Reveal>

            <Reveal delay={0.28} className="w-full">
              <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:mt-12 sm:flex-row sm:gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-bold tracking-tight text-black transition-colors duration-300 hover:bg-white sm:px-8 sm:text-base"
                >
                  {contact.cta}
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>

                {/*
                  No aria-label here on purpose. The visible label is the email
                  address itself, and an aria-label would replace it wholesale —
                  leaving speech-input users with no way to say what they see
                  (WCAG 2.5.3 Label in Name). The sr-only prefix instead PREPENDS
                  the purpose to the name, so the accessible name always contains
                  the visible text and stays in sync as `copyLabel` swaps.
                */}
                {/*
                  Sized down on the narrowest screens: the real address is long
                  enough that the sm padding/type would clip against the card's
                  overflow-hidden at 320px.
                */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3.5 text-xs text-gray-400 transition-colors duration-300 hover:border-white/30 hover:text-cream sm:gap-2.5 sm:px-6 sm:text-sm"
                >
                  {copied ? (
                    <Check className="h-4 w-4 shrink-0 text-cream" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  <span className="sr-only">Copy email address </span>
                  {/*
                    The label column is sized by the address itself rather than a
                    magic min-width: an aria-hidden copy of `personal.email`
                    shares the one grid cell, invisible but still laid out, so
                    swapping in "Copied" / "Copy failed" can never resize the
                    button. A fixed min-width has to be re-tuned by hand every
                    time the address in the data file changes length — the
                    previous 9.5rem was tuned for a shorter one and had silently
                    stopped bounding the label.
                  */}
                  <span className="grid text-center tracking-tight">
                    <span className="invisible col-start-1 row-start-1" aria-hidden="true">
                      {personal.email}
                    </span>
                    <span className="col-start-1 row-start-1">{copyLabel}</span>
                  </span>
                </button>
              </div>
            </Reveal>

            {/* Always in the DOM so assistive tech announces the change, not the node. */}
            <span aria-live="polite" className="sr-only">
              {copyAnnouncement}
            </span>

            <Reveal delay={0.38} className="w-full">
              <div className="mx-auto mt-14 w-full max-w-md border-t border-white/10 pt-8 sm:mt-16">
                <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:gap-x-10">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} — opens in a new tab`}
                        className="focus-ring group inline-flex items-center gap-1.5 rounded-full text-[0.65rem] uppercase tracking-[0.22em] text-gray-400 transition-colors duration-300 hover:text-cream sm:text-xs"
                      >
                        {social.label}
                        <ArrowUpRight
                          className="h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Contact }
