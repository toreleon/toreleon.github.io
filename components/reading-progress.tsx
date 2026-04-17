"use client"

import { useEffect, useState } from "react"

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const max = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight
      const value = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0
      setProgress(value)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div
      className="reading-progress"
      style={{ ["--progress" as string]: progress }}
      aria-hidden="true"
    />
  )
}
