"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface SiteHeaderProps {
  active?: "blog" | "portfolio"
}

export default function SiteHeader({ active = "blog" }: SiteHeaderProps) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark, mounted])

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            aria-label="Home"
            className="group inline-flex items-baseline font-semibold tracking-tight text-foreground"
          >
            <span className="text-xl sm:text-2xl">tore</span>
            <span className="text-xl sm:text-2xl text-muted-foreground group-hover:text-foreground transition-colors duration-300">.</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === "blog" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/portfolio"
              className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === "portfolio" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Portfolio
            </Link>

            <button
              onClick={() => setIsDark(!isDark)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
