"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  text: string
  html?: string
  speed?: number
  startDelay?: number
  className?: string
  as?: "span" | "div" | "p"
  showCaret?: boolean
  onDone?: () => void
}

export function StreamText({
  text,
  html,
  speed = 10,
  startDelay = 0,
  className,
  as: Tag = "span",
  showCaret = false,
  onDone,
}: Props) {
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      if (mq.matches) {
        setStarted(true)
        setIndex(text.length)
        setDone(true)
        return
      }
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [text])

  useEffect(() => {
    if (!started || done) return
    let cancelled = false
    let k = 0
    const tick = () => {
      if (cancelled) return
      k += 1
      setIndex(k)
      if (k >= text.length) {
        setDone(true)
        onDone?.()
        return
      }
      const ch = text[k - 1]
      const next = /\s/.test(ch)
        ? speed * 0.35
        : /[.,;:!?]/.test(ch)
          ? speed * 6
          : speed + Math.random() * speed
      setTimeout(tick, next)
    }
    const start = setTimeout(tick, startDelay)
    return () => {
      cancelled = true
      clearTimeout(start)
    }
  }, [started, done, text, speed, startDelay, onDone])

  const assignRef = (node: HTMLElement | null) => {
    ref.current = node
  }

  if (done && html) {
    return (
      <Tag
        ref={assignRef as never}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <Tag ref={assignRef as never} className={className}>
      {started ? text.slice(0, index) : "\u200B"}
      {showCaret && !done && started && <span className="stream-caret" aria-hidden />}
    </Tag>
  )
}
