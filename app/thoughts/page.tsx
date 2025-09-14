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

export default function ThoughtsPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-32">
        {/* Header */}
        <header className="mb-16 sm:mb-20">
          <div className="mb-8">
            <Link
              href="/#thoughts"
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light">All Thoughts</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Insights, reflections, and learnings from my journey in AI engineering, 
              software development, and technology leadership.
            </p>
          </div>
        </header>

        {/* Thoughts Grid */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 xl:grid-cols-3">
          {thoughts.map((post, index) => (
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

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-border">
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
    </div>
  )
}
