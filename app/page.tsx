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
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-20 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-muted-foreground/50 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg
            className="w-5 h-5 text-foreground"
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
            className="w-5 h-5 text-foreground"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "education", "thoughts", "connect"].map((section) => (
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
          className="py-24 sm:py-40 lg:py-48"
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

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[3] = el }}
          className="py-24 sm:py-40 lg:py-48"
        >
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light">Recent Thoughts</h2>
              <div className="text-sm text-muted-foreground font-mono">Insights & Reflections</div>
            </div>

            <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
              {[
                {
                  title: "The Future of AI Engineering: Beyond Model Training",
                  slug: "future-ai-engineering-beyond-model-training",
                  excerpt: "As AI engineering evolves, the focus is shifting from just training models to building robust, scalable systems. The real challenge isn't just achieving state-of-the-art performance, but creating AI systems that can be deployed, monitored, and improved in production environments.",
                  date: "Dec 2024",
                  readTime: "5 min read",
                  category: "AI Engineering",
                  tags: ["AI", "Engineering", "Production"],
                  fullContent: `The landscape of AI engineering is undergoing a fundamental transformation. While the early days were dominated by achieving state-of-the-art performance on benchmarks, today's AI engineers face a more complex challenge: building systems that work reliably in the real world.

**The Production Reality**

In production environments, a model's accuracy is just one piece of the puzzle. Engineers must consider:

- **Latency Requirements**: Real-time applications demand sub-100ms response times
- **Scalability**: Systems must handle traffic spikes without breaking
- **Monitoring**: Continuous tracking of model drift and performance degradation
- **Version Control**: Managing model updates without disrupting services

**Beyond the Model**

The future belongs to AI engineers who think in terms of complete systems, not just models. This means mastering:

- Container orchestration with Kubernetes
- Event-driven architectures with message queues
- Observability with proper logging and metrics
- A/B testing frameworks for model comparison

**Key Takeaways**

1. Focus on system reliability over individual model performance
2. Invest in monitoring and observability from day one
3. Design for failure - AI systems will fail, plan accordingly
4. Build with scalability in mind, even for small initial deployments

The engineers who thrive in this new era will be those who can bridge the gap between cutting-edge AI research and production-ready systems.`
                },
                {
                  title: "Building Agentic Systems: Lessons from Multi-Agent Architecture",
                  slug: "building-agentic-systems-multi-agent-architecture",
                  excerpt: "Working with multi-agent systems has taught me that the complexity lies not in the individual agents, but in orchestrating their interactions. The key is designing clear communication protocols and failure recovery mechanisms that allow agents to work together seamlessly.",
                  date: "Nov 2024",
                  readTime: "4 min read",
                  category: "AI Systems",
                  tags: ["Multi-Agent", "Architecture", "Orchestration"],
                  fullContent: `Multi-agent systems represent one of the most fascinating frontiers in AI engineering. Having worked extensively with agentic architectures, I've learned that the magic happens not in the individual agents, but in how they coordinate.

**The Orchestration Challenge**

The complexity of multi-agent systems doesn't scale linearly with the number of agents—it scales exponentially. Each agent must understand:

- When to take action vs. when to delegate
- How to communicate intent clearly
- What to do when other agents fail
- How to maintain system-wide coherence

**Communication Protocols**

Effective multi-agent systems require robust communication protocols:

1. **Message Passing**: Structured data exchange between agents
2. **Event Broadcasting**: System-wide notifications for important events
3. **State Synchronization**: Keeping all agents aware of global state
4. **Failure Propagation**: Ensuring failures don't cascade

**Design Patterns That Work**

- **Hierarchical Delegation**: Clear chains of command and responsibility
- **Peer-to-Peer Coordination**: Direct agent-to-agent communication
- **Central Orchestrator**: A single coordinator managing all interactions
- **Hybrid Approaches**: Combining multiple patterns for complex scenarios

**Lessons Learned**

The most successful multi-agent systems I've built share common characteristics:
- Clear role definitions for each agent
- Graceful degradation when agents become unavailable
- Comprehensive logging for debugging complex interactions
- Regular testing of failure scenarios

Building agentic systems is as much about software architecture as it is about AI—the coordination logic often determines success or failure.`
                },
                {
                  title: "The Vibe Coding Revolution: How AI is Transforming Development",
                  slug: "vibe-coding-revolution-ai-transforming-development",
                  excerpt: "The shift towards AI-assisted development isn't just about productivity gains—it's fundamentally changing how we think about problem-solving. When you can iterate rapidly with AI, the focus shifts from writing perfect code to exploring better solutions.",
                  date: "Oct 2024",
                  readTime: "6 min read",
                  category: "Development",
                  tags: ["AI Tools", "Productivity", "Innovation"],
                  fullContent: `The development landscape is experiencing a seismic shift. AI-assisted coding tools like Cursor, GitHub Copilot, and V0 aren't just productivity enhancers—they're fundamentally changing how we approach software development.

**The Vibe Coding Philosophy**

"Vibe coding" represents a new paradigm where developers work in harmony with AI to explore solutions rather than implement predetermined specifications. This approach emphasizes:

- **Rapid Prototyping**: Quick iteration cycles with AI assistance
- **Exploratory Development**: Testing multiple approaches simultaneously
- **Human-AI Collaboration**: Leveraging AI for what it does best while maintaining human creativity
- **Focus on Outcomes**: Prioritizing results over perfect code

**Tools That Enable Vibe Coding**

1. **Cursor**: AI-powered IDE that understands context
2. **GitHub Copilot**: Intelligent code completion and generation
3. **V0**: AI-driven UI component generation
4. **Replit**: Collaborative coding with AI assistance
5. **Lovable**: Full-stack development with AI

**The Productivity Multiplier**

In my experience, AI-assisted development delivers more than just 3× productivity gains:

- **Faster Debugging**: AI can quickly identify common patterns and suggest fixes
- **Better Documentation**: Automated generation of comprehensive docs
- **Code Quality**: AI helps maintain consistent patterns and best practices
- **Learning Acceleration**: Real-time feedback and suggestions improve skills

**The Human Element**

Despite AI's capabilities, human developers remain essential for:

- Understanding business context and user needs
- Making architectural decisions
- Debugging complex, domain-specific issues
- Maintaining code quality and standards

**Future Implications**

As AI tools become more sophisticated, the role of developers will evolve toward:
- System design and architecture
- AI prompt engineering and optimization
- Quality assurance and testing
- User experience and product strategy

The developers who thrive in this new era will be those who embrace AI as a collaborative partner rather than a replacement.`
                },
                {
                  title: "From Legacy to Modern: The Art of Code Modernization",
                  slug: "legacy-to-modern-art-code-modernization",
                  excerpt: "Modernizing legacy systems requires more than technical expertise—it demands empathy for the original developers and understanding of business constraints. The goal isn't just to upgrade technology, but to preserve institutional knowledge while enabling future innovation.",
                  date: "Sep 2024",
                  readTime: "7 min read",
                  category: "Engineering",
                  tags: ["Legacy Systems", "Modernization", "Technical Debt"],
                  fullContent: `Code modernization is one of the most challenging yet rewarding aspects of software engineering. Having worked extensively with legacy mainframe systems and their transformation, I've learned that successful modernization is as much about people as it is about technology.

**Understanding the Legacy Context**

Before touching any legacy code, it's crucial to understand:

- **Business Logic**: What problems was the original system solving?
- **Constraints**: What technical limitations guided the original design?
- **Dependencies**: How does the system integrate with other components?
- **Knowledge**: What institutional knowledge exists in the current team?

**The Modernization Strategy**

Effective modernization follows a structured approach:

1. **Assessment Phase**: Comprehensive analysis of the existing system
2. **Planning Phase**: Define migration strategy and success metrics
3. **Incremental Migration**: Gradual transformation to minimize risk
4. **Validation Phase**: Ensure functionality is preserved throughout

**Tools and Techniques**

Modern mainframe modernization leverages:

- **Code Analysis Tools**: Automated scanning for patterns and dependencies
- **Synthetic Data Generation**: Creating realistic test data for validation
- **Knowledge Graphs**: Mapping relationships between system components
- **Clustering Algorithms**: Organizing large codebases into manageable segments

**The Human Factor**

Successful modernization requires empathy for:

- **Original Developers**: Understanding the constraints they faced
- **Current Maintainers**: Preserving their institutional knowledge
- **Business Stakeholders**: Balancing technical debt with business needs
- **End Users**: Ensuring minimal disruption to their workflows

**Measuring Success**

Modernization success isn't just about technology upgrades:

- **Reduced Maintenance Costs**: Easier to understand and modify
- **Improved Developer Experience**: Better tools and faster iteration
- **Enhanced Reliability**: Fewer bugs and better error handling
- **Business Agility**: Faster time-to-market for new features

**Key Lessons**

1. **Start Small**: Begin with non-critical components to build confidence
2. **Document Everything**: Capture knowledge that exists only in people's heads
3. **Test Thoroughly**: Legacy systems often have hidden dependencies
4. **Communicate Continuously**: Keep all stakeholders informed of progress

The goal of modernization isn't just to upgrade technology—it's to preserve institutional knowledge while enabling future innovation. The most successful projects balance technical excellence with human understanding.`
                },
              ].slice(0, 2).map((post, index) => (
                <Link
                  key={index}
                  href={`/thoughts/${post.slug}`}
                  className="group block"
                >
                  <article className="p-8 sm:p-10 border border-border rounded-xl hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg bg-card/30 h-full">
                    <div className="space-y-6 h-full flex flex-col">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                      <div className="space-y-3">
                        <div className="inline-flex items-center px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-full border border-border">
                          {post.category}
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-medium group-hover:text-muted-foreground transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-base sm:text-lg flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs text-muted-foreground/70 bg-muted/30 rounded-md border border-border/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                        <span>Read full article</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                  </div>
                </article>
                </Link>
              ))}
            </div>

            <div className="text-center pt-8">
              <Link
                href="/thoughts"
                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 font-mono"
              >
                View All Thoughts
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[4] = el }} className="py-20 sm:py-32">
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
                  { 
                    name: "GitHub", 
                    handle: "@toreleon", 
                    url: "https://github.com/toreleon",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )
                  },
                  { 
                    name: "LinkedIn", 
                    handle: "thanglv", 
                    url: "https://linkedin.com/in/thanglv",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {social.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 font-medium">
                          {social.name}
                        </div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
