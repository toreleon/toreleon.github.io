"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Portfolio() {
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
    <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-light tracking-tight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                Thang Le Viet
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Blog
              </Link>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                Portfolio
              </Link>

              {/* Divider */}
              <div className="h-6 w-px bg-border"></div>

              {/* Social Links */}
              <Link
                href="https://github.com/toreleon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/in/thanglv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-foreground"
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
                    className="w-4 h-4 text-foreground"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "education"].map((section) => (
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

      <main className="flex-1 max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-16 pb-8 w-full">
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
                  {["Python", "PyTorch", "OpenAI API", "Autogen", "NextJS", "FastAPI", "Docker", "Azure"].map((skill) => (
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
          id="education"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="py-24 sm:py-40 lg:py-48 pb-32"
        >
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light">Education</h2>
              <div className="text-sm text-muted-foreground font-mono">2018 - Present</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  degree: "Master of Science in Computer Science",
                  school: "University of Information Technology",
                  period: "Sep 2023 — Present",
                  location: "Ho Chi Minh City, Vietnam",
                  gpa: "3.7/4.0",
                  thesis: null,
                  highlights: [
                    "Currently pursuing advanced studies in Computer Science",
                  ],
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
                  period: "Sep 2018 — Jan 2022",
                  location: "Ho Chi Minh City, Vietnam",
                  gpa: "3.6/4.0",
                  thesis: "Numerical Reasoning Reading Comprehension on Vietnamese COVID-19 News: Task, Corpus, and Challenges",
                  highlights: [
                    "♔ Graduated Top 1 in Major (Data Science)",
                    "Published research paper in Neural Computing & Applications (Q1 journal)",
                    "Developed COVIDROP dataset - first Vietnamese numerical reasoning dataset",
                    "Collaborated with NLP@UIT Laboratory on knowledge-graph QA techniques",
                    "Participated in multiple data science competitions and hackathons",
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
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 py-8 sm:py-12 lg:py-16 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-3">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 mb-2">
                      {edu.period}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {edu.location}
                    </div>
                    {edu.gpa && (
                      <div className="text-xs text-muted-foreground mt-2 font-mono">
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-9 space-y-4 sm:space-y-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium">{edu.degree}</h3>
                      <div className="text-base sm:text-lg text-muted-foreground">{edu.school}</div>
                      {edu.thesis && (
                        <div className="text-sm text-muted-foreground mt-2 italic">
                          Thesis: {edu.thesis}
                        </div>
                      )}
                    {index === 1 && (
                      <div className="mt-3 p-4 bg-muted/30 border border-border rounded-lg">
                        <h4 className="text-sm font-medium text-foreground uppercase tracking-wider mb-2">Publication</h4>
                        <div className="space-y-1">
                          <Link 
                            href="https://link.springer.com/article/10.1007/s00521-024-09744-5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                          >
                            <div className="font-medium text-sm leading-relaxed group-hover:text-muted-foreground transition-colors duration-300">
                              "Numerical reasoning reading comprehension on Vietnamese COVID-19 news: task, corpus, and challenges"
                            </div>
                          </Link>
                          <div className="text-xs text-muted-foreground">Van Nguyen, K., Le, T.V. & Do, T.PP.</div>
                          <div className="text-xs text-muted-foreground">Neural Computing & Applications (Q1) • Volume 36, 14053–14073 • 2024</div>
                          <div className="flex items-center gap-2">
                            <Link 
                              href="https://link.springer.com/article/10.1007/s00521-024-09744-5"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground font-mono hover:text-foreground transition-colors duration-300 flex items-center gap-1"
                            >
                              DOI: 10.1007/s00521-024-09744-5
                              <svg 
                                className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground uppercase tracking-wider">Key Highlights</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i} className="text-base sm:text-lg">{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground uppercase tracking-wider">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300 text-muted-foreground"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
    </div>
  )
}

