import Link from "next/link"
import { notFound } from "next/navigation"
import TopNav from "@/components/top-nav"
import type { Metadata } from "next"

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const thought = thoughts.find((t) => t.slug === slug)

  if (!thought) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: thought.title,
    description: thought.excerpt,
    keywords: [...thought.tags, "AI Engineering", "Blog", "Tech Insights", "Thang Le Viet"],
    authors: [{ name: "Thang Le Viet" }],
    openGraph: {
      title: thought.title,
      description: thought.excerpt,
      type: "article",
      publishedTime: thought.date,
      authors: ["Thang Le Viet"],
      tags: thought.tags,
      url: `https://toreleon.github.io/thoughts/${thought.slug}`,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: thought.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: thought.title,
      description: thought.excerpt,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://toreleon.github.io/thoughts/${thought.slug}`,
    },
  }
}

export default async function ThoughtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const thought = thoughts.find((t) => t.slug === slug)

  if (!thought) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: thought.title,
    description: thought.excerpt,
    image: 'https://toreleon.github.io/og-image.jpg',
    datePublished: thought.date,
    author: {
      '@type': 'Person',
      name: 'Thang Le Viet',
      url: 'https://toreleon.github.io',
      jobTitle: 'AI Engineer',
    },
    publisher: {
      '@type': 'Person',
      name: 'Thang Le Viet',
      url: 'https://toreleon.github.io',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://toreleon.github.io/thoughts/${thought.slug}`,
    },
    articleSection: thought.category,
    keywords: thought.tags.join(', '),
    wordCount: thought.fullContent.split(' ').length,
    timeRequired: thought.readTime,
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav activeTab="blog" />

      <main className="flex-1 w-full mt-16 mb-8">
        {/* Article header */}
        <header className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-12">
          {/* Category Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-foreground to-foreground/80 text-background rounded-xl shadow-lg">
              {thought.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-foreground mb-8 tracking-tight">
            {thought.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light mb-10 max-w-3xl">
            {thought.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground pt-8 border-t-2 border-border/50">
            <div className="flex items-center gap-3 font-medium">
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{thought.date}</span>
            </div>
            <span className="text-muted-foreground/40 font-bold">•</span>
            <div className="flex items-center gap-3 font-medium">
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{thought.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article content */}
        <article className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:leading-tight
            prose-p:text-[1.1875rem] prose-p:leading-[2rem] prose-p:text-muted-foreground prose-p:mb-7 prose-p:font-light
            prose-li:text-[1.125rem] prose-li:leading-[1.875rem] prose-li:text-muted-foreground prose-li:my-3 prose-li:font-light
            prose-strong:text-foreground prose-strong:font-bold
            prose-a:text-foreground prose-a:underline prose-a:decoration-muted-foreground/30 hover:prose-a:decoration-foreground prose-a:transition-all
            prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-muted-foreground/90
            prose-code:text-foreground prose-code:bg-muted/70 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-sm prose-code:font-semibold
          ">
            <div className="space-y-6">
            {thought.fullContent.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                // Bold headings
                return (
                  <h2 key={index}>
                    {paragraph.slice(2, -2)}
                  </h2>
                )
              } else if (paragraph.startsWith('- **') && paragraph.includes('**:')) {
                // Bold list items
                const [boldPart, ...rest] = paragraph.split('**:')
                const boldText = boldPart.slice(4)
                const regularText = rest.join('**:')
                return (
                  <li key={index} className="list-none ml-0">
                    <strong>{boldText}:</strong>
                    {regularText}
                  </li>
                )
              } else if (paragraph.startsWith('- ')) {
                // Regular list items
                return (
                  <li key={index} className="list-disc ml-6">
                    {paragraph.slice(2)}
                  </li>
                )
              } else if (/^\d+\./.test(paragraph)) {
                // Numbered list items
                return (
                  <li key={index} className="list-decimal ml-6">
                    {paragraph.replace(/^\d+\.\s*/, '')}
                  </li>
                )
              } else if (paragraph.trim() === '') {
                // Empty lines - skip to maintain spacing
                return null
              } else {
                // Regular paragraphs
                return (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>
          </div>
        </article>

        {/* Separator */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent my-16"></div>
        </div>

        {/* Tags */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">Topics</h3>
          <div className="flex flex-wrap gap-3">
            {thought.tags.map((tag, index) => (
              <span
                key={index}
                className="px-5 py-2.5 text-sm font-bold text-muted-foreground bg-muted/60 hover:bg-muted rounded-xl transition-all duration-300 cursor-default border border-border/30 hover:border-border hover:scale-105 transform"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Back to Blog CTA */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-4 px-10 py-5 text-base font-bold text-background bg-gradient-to-r from-foreground to-foreground/90 hover:from-foreground/90 hover:to-foreground rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform uppercase tracking-wide"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Read More Articles</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }))
}
