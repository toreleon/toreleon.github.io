"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

// Thought data - in a real app, this would come from a CMS or database
const thoughts = [
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
  }
]

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                Blog
              </Link>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
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

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                Blog
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Portfolio
              </Link>
              
              <div className="pt-4 border-t border-border flex items-center gap-4">
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
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-32 mt-16 mb-8 w-full">
        {/* Header */}
        <header className="mb-16 sm:mb-20">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono tracking-wider">BLOG / 2025</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light">Thoughts & Insights</h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Insights, reflections, and learnings from my journey in AI engineering, 
              software development, and technology leadership.
            </p>
          </div>
        </header>

        {/* Thoughts List */}
        <div className="space-y-6">
          {thoughts.map((post, index) => (
            <Link
              key={index}
              href={`/thoughts/${post.slug}`}
              className="group block"
            >
              <article className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 border-l-4 border-border hover:border-foreground transition-all duration-300 bg-card hover:bg-muted/50 rounded-r-xl">
                {/* Left Side - Metadata */}
                <div className="sm:w-48 flex-shrink-0 space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{post.date}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-foreground text-background rounded-full">
                    {post.category}
                  </div>

                  {/* Read Time */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 space-y-4">
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-foreground/70 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground leading-relaxed text-base line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags and Read More */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted/50 rounded-md hover:bg-muted transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                    <div className="ml-auto flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all">
                      <span className="hidden sm:inline">Read article</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

      </main>
    </div>
  )
}
