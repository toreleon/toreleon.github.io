"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const highlightText = (text: string) => {
    // Efficiency metrics patterns - more precise matching
    const efficiencyPattern = /([−-]?\d+%|\d+×|\d+\s+faster|\d+\.\d+%|99\.9%|83\.7%|55%\s+to\s+70%|70%|55%|40%|25%|30%|3×|5×)/gi
    
    let highlightedText = text
    
    // Highlight efficiency metrics with minimal styling
    highlightedText = highlightedText.replace(efficiencyPattern, (match) => 
      `<span class="font-semibold text-foreground bg-muted/50 px-1 rounded-sm">${match}</span>`
    )
    
    return highlightedText
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Thang
                  <br />
                  <span className="text-muted-foreground">Le Viet</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  AI Engineer with a strong background in computer science, focusing on
                  <span className="text-foreground"> large language models</span>,
                  <span className="text-foreground"> agentic systems</span>, and
                  <span className="text-foreground"> scalable ML platforms</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Ho Chi Minh City, Viet Nam</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-4">
                  {[
                    {
                      role: "Co-founder & Vibe Coding Engineer",
                      company: "Stealth Startup",
                      period: "Jun 2024 — Present",
                    },
                    {
                      role: "AI Engineer III",
                      company: "FPT AI Center — AI4SE Lab",
                      period: "Jan 2024 — Present",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="text-foreground">{item.role}</div>
                      <div className="text-muted-foreground">@ {item.company}</div>
                      <div className="text-xs text-muted-foreground">{item.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "PyTorch", "LangChain", "FastAPI", "Kafka", "MLflow", "GCP", "Azure", "Docker"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="py-24 sm:py-40 lg:py-48"
        >
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">2021 — 2025</div>
            </div>

            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {[
                {
                  year: "2024",
                  role: "Co-founder & Vibe Coding Engineer",
                  company: "Stealth Startup",
                    details: [
                      "Built end-to-end conversational AI systems integrating TTS, STT, and LLMs for low-latency, real-time dialogue with <50ms response time.",
                      "Researched and implemented multi-agent architectures to advance agentic workflows for next-gen SaaS platforms.",
                      "Adopted vibe coding workflows with Cursor, GitHub Copilot, V0, Replit, and Lovable for AI-assisted development, boosting productivity by 3×.",
                      "Deployed and orchestrated multi-service, cloud-based architectures for scalable applications using containerized microservices.",
                    ],
                },
                {
                  year: "2024",
                  role: "AI Engineer III",
                  company: "FPT AI Center — AI4SE Lab",
                    details: [
                      "Developed an event-driven agentic platform automating code analysis, review, and bug localization (−25% manual effort).",
                      "Designed clustering algorithms to segment large legacy codebases by entry points (+30% accessibility & documentation).",
                      "Applied syntactic parsers and knowledge graphs to enhance IR and enable advanced QA over legacy code using transformer models.",
                      "Built tools and strategies for synthetic data generation to support xMainframe (specialized LLM for legacy code QA).",
                      "Engineered backend APIs for detailed mainframe code analysis at modernization scale with 99.9% uptime.",
                    ],
                },
                {
                  year: "2023",
                  role: "AI Engineer",
                  company: "Resonance Technology",
                    details: [
                      "Explored LLMs and ML for SEO/marketing competitive analysis: keyword trend forecasting and topic exploration using transformer models.",
                      "Prototyped an AI Copilot enabling end-to-end SEO workflow automation in Writerzen with natural language processing.",
                      "Led in-app AI features using advanced prompt engineering and fine-tuned models, boosting user engagement by 83.7%.",
                      "Designed high-performance SERP clustering algorithms: 40% faster processing and over 5× memory savings using vector embeddings.",
                    ],
                },
                {
                  year: "2022",
                  role: "Data Scientist",
                  company: "Be Group",
                  details: [
                    "Improved search API accuracy, raising top recommendation click rates from 55% to 70% via ranking algorithms.",
                    "Built a personalized Bayesian ranking engine, increasing recommendation clicks by 8% platform-wide.",
                    "Developed and deployed a Rasa-based conversational AI platform for customer support automation.",
                    "Built a FastText-powered semantic search engine to enhance contextual relevance.",
                  ],
                },
                {
                  year: "2021",
                  role: "Research Assistant",
                  company: "NLP@UIT Laboratory",
                  details: [
                    "Created COVIDROP, the first Vietnamese numerical reasoning dataset based on DROP.",
                    "Designed annotation guidelines and labeling tools to ensure high-quality data collection.",
                    "Implemented and evaluated NAQANet and NumNet to benchmark numerical reasoning.",
                    "Contributed knowledge-graph QA workshops and techniques for semantic information extraction.",
                  ],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 py-8 sm:py-12 lg:py-16 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-10 space-y-4 sm:space-y-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium">{job.role}</h3>
                      <div className="text-base sm:text-lg text-muted-foreground">{job.company}</div>
                    </div>
                      <ul className="list-disc pl-5 space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {Array.isArray(job.details)
                          ? job.details.map((d, i) => <li key={i} dangerouslySetInnerHTML={{ __html: highlightText(d) }} />)
                          : null}
                      </ul>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Publications</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title:
                    "Numerical reasoning reading comprehension on Vietnamese COVID-19 news: task, corpus, and challenges",
                  excerpt:
                    "Neural Computing & Applications (Q1), 2024. DOI: 10.1007/s00521-024-09744-5.",
                  date: "2024",
                  readTime: "",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:levietthang0512@outlook.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">levietthang0512@outlook.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@toreleon", url: "https://github.com/toreleon" },
                  { name: "LinkedIn", handle: "thanglv", url: "https://linkedin.com/in/thanglv" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Thang Le Viet. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with v0.dev by Thang Le Viet</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
