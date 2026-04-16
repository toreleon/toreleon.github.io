"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { StreamText } from "@/components/stream-text"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("intro")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroOffset, setHeroOffset] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const revealRef = useRef<Element[]>([])

  const highlightText = (text: string) => {
    const metricPattern = /([−-]?\d+(?:\.\d+)?%|\d+×|\d+\s+faster)/gi
    return text.replace(metricPattern, (match) =>
      `<span class="font-medium text-foreground">${match}</span>`
    )
  }

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    const revealEls = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-stagger]",
    )
    revealEls.forEach((el) => revealObserver.observe(el))
    revealRef.current = Array.from(revealEls)

    return () => {
      revealObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        const y = window.scrollY
        setScrollProgress(max > 0 ? y / max : 0)
        setHeroOffset(Math.min(y * 0.15, 80))

        const probe = y + window.innerHeight * 0.35
        let current = "intro"
        for (const section of sectionsRef.current) {
          if (!section) continue
          if (section.offsetTop <= probe) current = section.id
        }
        setActiveSection(current)

        raf = 0
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const sections = [
    { id: "intro", label: "Intro" },
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      {/* Scroll progress bar */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-foreground origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Section dots (desktop) */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4"
      >
        {sections.map((s) => {
          const active = activeSection === s.id
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              aria-label={`Jump to ${s.label}`}
              className="group relative flex items-center justify-end h-6"
            >
              <span
                className={`pr-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                  active
                    ? "opacity-100 text-foreground translate-x-0"
                    : "opacity-0 -translate-x-1 text-muted-foreground group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active
                    ? "w-2.5 h-2.5 bg-foreground"
                    : "w-1.5 h-1.5 bg-muted-foreground/50 group-hover:bg-foreground"
                }`}
              />
            </button>
          )
        })}
      </nav>

      <SiteHeader active="portfolio" />

      <main className="flex-1 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8 w-full">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center pt-16"
          style={{
            transform: `translate3d(0, ${-heroOffset * 0.4}px, 0)`,
            opacity: Math.max(1 - heroOffset / 200, 0.4),
          }}
        >
          <div className="w-full flex flex-col items-center text-center space-y-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              <StreamText text="Thang Le Viet" speed={55} />
            </h1>

            <StreamText
              as="p"
              className="max-w-3xl text-xl sm:text-2xl lg:text-3xl italic text-muted-foreground leading-snug"
              text={`\u201CThe era of writing software is ending. The next one is about where coding agents go once they leave the IDE.\u201D`}
              html={`\u201CThe era of writing software is ending. The next one is about where <span class="text-foreground not-italic font-medium">coding agents</span> go once they leave the IDE.\u201D`}
              speed={14}
              startDelay={700}
            />

            <div className="flex flex-col items-center gap-1.5 pt-2">
              <div className="text-base sm:text-lg text-foreground">
                <StreamText
                  text="AI Engineer III · FPT AI Center — AI4SE Lab"
                  speed={12}
                  startDelay={3200}
                />
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                <StreamText
                  text="Jan 2024 – Present"
                  speed={18}
                  startDelay={3800}
                />
              </div>
            </div>

            <div className="intro-fade flex flex-wrap justify-center items-start gap-6 sm:gap-8 max-w-2xl pt-2" style={{ animationDelay: "4.3s" }}>
              {[
                {
                  name: "Claude Code",
                  href: "https://claude.ai/code",
                  icon: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/claude-color.svg",
                },
                {
                  name: "Codex",
                  href: "https://openai.com/codex",
                  icon: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/codex-color.svg",
                },
                {
                  name: "Copilot",
                  href: "https://github.com/features/copilot",
                  icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/githubcopilot.png",
                  iconLight: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/githubcopilot.png",
                },
                {
                  name: "Antigravity",
                  href: "https://antigravity.google",
                  icon: "https://antigravity.google/assets/image/antigravity-logo.png",
                },
                {
                  name: "Cursor",
                  href: "https://www.cursor.com",
                  icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cursor.png",
                  iconLight: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/cursor.png",
                },
              ].map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 w-20 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
                    {tool.iconLight ? (
                      <>
                        <img
                          src={tool.iconLight}
                          alt=""
                          className="w-10 h-10 object-contain block dark:hidden"
                        />
                        <img
                          src={tool.icon}
                          alt=""
                          className="w-10 h-10 object-contain hidden dark:block"
                        />
                      </>
                    ) : (
                      <img
                        src={tool.icon}
                        alt=""
                        className="w-10 h-10 object-contain"
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium">{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen flex items-center py-20"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                <StreamText text="Selected Work" speed={40} />
              </h2>
              <div className="text-sm text-muted-foreground font-mono">2021–2025</div>
            </div>

            <div className="divide-y divide-border">
              {[
                {
                  year: "2024",
                  role: "AI Engineer III",
                  company: "FPT AI Center — AI4SE Lab",
                  details: [
                    "Built an event-driven agentic platform for code analysis, review, and bug localization, cutting manual effort by 25%.",
                    "Designed clustering algorithms that segment legacy codebases by entry points, improving accessibility and documentation by 30%.",
                    "Used syntactic parsers and knowledge graphs to improve retrieval and QA over legacy code.",
                    "Built tooling and synthetic data pipelines for xMainframe, an LLM specialized for legacy code QA.",
                    "Shipped backend APIs for mainframe code analysis at modernization scale with 99.9% uptime.",
                  ],
                },
                {
                  year: "2023",
                  role: "AI Engineer",
                  company: "Resonance Technology",
                  details: [
                    "Applied LLMs and ML to SEO competitive analysis: keyword trend forecasting and topic exploration.",
                    "Prototyped an AI Copilot for end-to-end SEO workflow automation in Writerzen.",
                    "Led in-app AI features with prompt engineering and fine-tuned models, lifting user engagement by 83.7%.",
                    "Designed SERP clustering algorithms that ran 40% faster with over 5× memory savings.",
                  ],
                },
                {
                  year: "2022",
                  role: "Data Scientist",
                  company: "Be Group",
                  details: [
                    "Improved search API ranking, raising top recommendation click rate from 55% to 70%.",
                    "Built a personalized Bayesian ranking engine, increasing recommendation clicks by 8% platform-wide.",
                    "Deployed a Rasa-based conversational platform for customer support automation.",
                    "Built a FastText semantic search engine for contextual relevance.",
                  ],
                },
                {
                  year: "2021",
                  role: "Research Assistant",
                  company: "NLP@UIT Laboratory",
                  details: [
                    "Created COVIDROP, the first Vietnamese numerical reasoning dataset, based on DROP.",
                    "Wrote annotation guidelines and built labeling tools for the dataset.",
                    "Implemented and evaluated NAQANet and NumNet as numerical reasoning baselines.",
                    "Contributed to knowledge-graph QA work on semantic information extraction.",
                  ],
                },
              ].map((job, index) => (
                <article
                  key={index}
                  data-reveal
                  className="reveal group grid lg:grid-cols-12 gap-6 sm:gap-10 py-10 sm:py-14 transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-base font-mono text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-10 space-y-5">
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">{job.role}</h3>
                      <div className="text-base sm:text-lg text-muted-foreground">{job.company}</div>
                    </div>
                    <ul className="list-disc pl-6 space-y-2.5 text-base sm:text-lg text-muted-foreground leading-relaxed marker:text-border">
                      {Array.isArray(job.details)
                        ? job.details.map((d, i) => (
                            <li key={i}>
                              <StreamText
                                as="span"
                                text={d}
                                html={highlightText(d)}
                                speed={8}
                                startDelay={i * 180}
                              />
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen flex items-center py-20"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                <StreamText text="Projects" speed={40} />
              </h2>
              <div className="text-sm text-muted-foreground font-mono">Open source</div>
            </div>

            <div className="divide-y divide-border">
              {[
                {
                  name: "opendev",
                  repo: "opendev-to/opendev",
                  href: "https://github.com/opendev-to/opendev",
                  role: "Contributor",
                  stack: "Rust",
                  summary:
                    "Open-source coding agent for the terminal. Contributing to agent loop, tool integrations, and performance.",
                },
                {
                  name: "Mainframe Studio",
                  repo: "FSoft-AI4Code/Mainframe-Studio",
                  href: "https://github.com/FSoft-AI4Code/Mainframe-Studio",
                  role: "Core Engineer",
                  stack: "Python · FastAPI · Airflow · React",
                  summary:
                    "Platform for mainframe modernization: code analysis, dependency graphs, and AI-assisted QA over legacy codebases.",
                },
              ].map((p, index) => (
                <article
                  key={index}
                  data-reveal
                  className="reveal group grid lg:grid-cols-12 gap-6 sm:gap-10 py-10 sm:py-14 transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-base font-mono text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {p.role}
                    </div>
                  </div>

                  <div className="lg:col-span-10 space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
                        <Link
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-baseline gap-2 hover:text-muted-foreground transition-colors duration-200"
                        >
                          {p.name}
                          <span className="text-base font-normal text-muted-foreground">↗</span>
                        </Link>
                      </h3>
                      <div className="text-base sm:text-lg text-muted-foreground font-mono">
                        {p.repo}
                      </div>
                    </div>
                    <StreamText
                      as="p"
                      text={p.summary}
                      speed={8}
                      className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                    />
                    <div className="text-sm text-muted-foreground font-mono">{p.stack}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
          ref={(el) => { sectionsRef.current[3] = el }}
          className="min-h-screen flex items-center py-20"
        >
          <div className="space-y-12 sm:space-y-16 w-full">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                <StreamText text="Education" speed={40} />
              </h2>
              <div className="text-sm text-muted-foreground font-mono">2018–Present</div>
            </div>

            <div className="divide-y divide-border">
              {[
                {
                  degree: "Master of Science in Computer Science",
                  school: "University of Information Technology",
                  period: "Sep 2023 – Present",
                  location: "Ho Chi Minh City, Vietnam",
                  gpa: "3.7/4.0",
                  thesis: null,
                  highlights: [],
                  coursework: [
                    "Advanced Machine Learning",
                    "Natural Language Processing", 
                    "Knowledge Graphs & Semantic Web",
                    "Deep Learning Architectures",
                    "Statistical Methods in AI",
                    "Research Methodology"
                  ]
                },
                {
                  degree: "Bachelor of Science in Data Science",
                  school: "University of Information Technology", 
                  period: "Sep 2018 – Jan 2022",
                  location: "Ho Chi Minh City, Vietnam",
                  gpa: "3.6/4.0",
                  thesis: "Numerical Reasoning Reading Comprehension on Vietnamese COVID-19 News: Task, Corpus, and Challenges",
                  highlights: [
                    "Graduated top of class in Data Science.",
                    "Published in Neural Computing & Applications (Q1).",
                    "Built COVIDROP, the first Vietnamese numerical reasoning dataset.",
                    "Worked with NLP@UIT Laboratory on knowledge-graph QA.",
                  ],
                  coursework: [
                    "Data Structures & Algorithms",
                    "Statistical Analysis",
                    "Database Systems",
                    "Machine Learning Fundamentals",
                    "Data Mining & Visualization",
                    "Big Data Technologies"
                  ]
                }
              ].map((edu, index) => (
                <article
                  key={index}
                  data-reveal
                  className="reveal grid lg:grid-cols-12 gap-6 sm:gap-10 py-10 sm:py-14"
                >
                  <div className="lg:col-span-3 space-y-2.5">
                    <div className="text-base font-mono text-muted-foreground">
                      {edu.period}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {edu.location}
                    </div>
                    {edu.gpa && (
                      <div className="text-sm font-mono text-muted-foreground">
                        GPA {edu.gpa}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-9 space-y-6">
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">{edu.degree}</h3>
                      <div className="text-base sm:text-lg text-muted-foreground">{edu.school}</div>
                      {edu.thesis && (
                        <div className="text-base text-muted-foreground mt-3 italic leading-relaxed">
                          <span className="text-foreground not-italic">Thesis: </span>{edu.thesis}
                        </div>
                      )}
                      {index === 1 && (
                        <div className="mt-6 pl-5 border-l-2 border-border space-y-2">
                          <div className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">Publication</div>
                          <Link
                            href="https://link.springer.com/article/10.1007/s00521-024-09744-5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-base leading-relaxed text-foreground hover:text-muted-foreground transition-colors duration-200"
                          >
                            "Numerical reasoning reading comprehension on Vietnamese COVID-19 news: task, corpus, and challenges"
                          </Link>
                          <div className="text-sm text-muted-foreground">Van Nguyen, K., Le, T.V. & Do, T.PP.</div>
                          <div className="text-sm text-muted-foreground">Neural Computing & Applications (Q1) · Volume 36, 14053–14073 · 2024</div>
                          <Link
                            href="https://link.springer.com/article/10.1007/s00521-024-09744-5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-1 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            DOI: 10.1007/s00521-024-09744-5 ↗
                          </Link>
                        </div>
                      )}
                    </div>

                    {edu.highlights.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">Highlights</h4>
                        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-muted-foreground leading-relaxed marker:text-border">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i}>
                              <StreamText
                                as="span"
                                text={highlight}
                                speed={8}
                                startDelay={i * 180}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">Coursework</h4>
                      <div className="text-base text-muted-foreground leading-relaxed">
                        {edu.coursework.join(" · ")}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}

