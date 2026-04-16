import Link from "next/link"
import { notFound } from "next/navigation"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import type { Metadata } from "next"

type Thought = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
  fullContent: string
}

const thoughts: Thought[] = [
  {
    slug: "software-is-gone-so-what-next",
    title: "Software is gone. So, what next?",
    excerpt:
      "Coding agents solved the IDE. The more interesting question is where they go next — and what it means that the center of my day is no longer typing code.",
    date: "2026-04-17",
    readTime: "7 min read",
    category: "Essays",
    tags: ["Coding Agents", "Multi-Agent Systems", "AI Engineering", "Future of Software"],
    fullContent: `For most of my career the job was clear. Read a ticket, open a file, type code, push a PR. The unit of work was a keystroke; the craft was in choosing which keystrokes, in what order, with what discipline. That framing is what I trained for, what I interviewed for, what I argued about on lunch breaks.
Sometime in the last two years that framing quietly collapsed on me.
I still write code. But increasingly I don't type it. I describe an intent, supervise a plan, review a diff, and re-route when the agent goes somewhere I didn't expect. The keystrokes moved down the stack. What stays is judgment — what to build, what to cut, what to measure, what to trust. When people say "software is gone," they don't mean programs are gone. They mean the old loop is gone. The one where the bottleneck was typing.
**The old answer doesn't fit anymore**
A year ago the honest response to "what will this change?" was "autocomplete, but better." That's no longer true. Today's agents open files you didn't mention, run tests, read logs, propose migrations, and argue with you about naming. A competent agent is not a faster typist — it's a junior engineer that never sleeps and never asks for benefits, with a bounded but real understanding of your codebase.
That reframe matters because it changes who the agent replaces. Autocomplete replaced muscle memory. Agents replace the loop — the thing where you read a bug report, form a hypothesis, reproduce it, fix it, and ship. Not the senior engineer. Not yet. But the grunt version of that loop, the one we used to assign to interns and call "ramp-up," is already done.
**The interesting question is where they go next**
This is what I've been sitting with. If the IDE is a solved substrate — if an agent can now move through a codebase the way a developer moves through a codebase — what happens when you point it at something that isn't a codebase?
A finance team's quarterly close has a structure not unlike a repo: sources of truth, dependencies, inconsistent naming, institutional folklore, a small number of senior operators who remember why things are the way they are. A legal team's diligence workflow has that shape too. So does an ops rotation. So does a clinical trial coordinator's inbox. None of these people think of themselves as programmers, but the work has the same texture: gather context, make a plan, execute, verify, repeat.
The thesis I keep coming back to is that coding agents were never really about code. Code was the first domain where three things were true at once: the work was mostly text, the environment was reproducible, and the feedback loop was fast. Any domain with those three properties will get its coding-agent moment, just with different file extensions.
**What that means for me, practically**
I've stopped treating code as the center of my day. The center is now the spec around the code: the task shape, the tools the agent can call, the evaluation harness, the guardrails, the place to park human judgment so the agent doesn't need to ask twice. The code still needs to be right. But "being right" is now a property of the system I designed, not of the line I just typed.
A few things have gotten sharper for me as a result:
- **Evaluation is the job**: if I can't tell whether an agent did the task correctly without reading the diff myself, I haven't finished designing the task. Every agent loop I've shipped and been proud of started with the eval and ended with the prompt.
- **Tools are a product surface**: the set of things the agent can do in your system is a UI, and it deserves UI-grade taste. Bad tool shapes make good models look stupid.
- **Domain context lives in people, not wikis**: the most valuable thing I do on any new problem is sit with the person who currently does the job by hand and watch them work. The agent is a transcription of that watching, plus a delta.
- **Multi-agent is rarely the first answer**: when one agent fails at a task, splitting it into five usually just moves the failure around. The real win is almost always a better single loop — tighter tools, better evals, a clearer spec — before you reach for orchestration.
**Software isn't gone. The ceremony is.**
I don't actually think software is going away. What's going away is the ceremony around it — the implicit assumption that every useful digital outcome has to pass through a human typing in an IDE. That assumption built the entire industry I grew up in, and it's worth being honest that a lot of what we called "engineering" was just the cost of moving intent through a keyboard.
What's left when that cost drops is the interesting part. Taste. Judgment. Knowing which problem is worth solving. Knowing what "done" looks like in a domain where done used to mean "the expert signed off in their head." These things don't get automated by the next model release. They get more valuable.
So when someone asks me what I'm working on, the honest answer is: coding agents, but not for coding. I'm spending my time on the domains where nobody has built the eval harness yet, where the tools don't exist, where the expert is still doing the work by hand because there's no IDE for their job.
That's the next loop. That's what I mean when I say the era of writing software is ending, and the next one is about where coding agents go once they leave the IDE.`,
  },
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
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: thought.title,
    description: thought.excerpt,
    image: "https://toreleon.github.io/og-image.jpg",
    datePublished: thought.date,
    author: {
      "@type": "Person",
      name: "Thang Le Viet",
      url: "https://toreleon.github.io",
      jobTitle: "AI Engineer",
    },
    publisher: {
      "@type": "Person",
      name: "Thang Le Viet",
      url: "https://toreleon.github.io",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://toreleon.github.io/thoughts/${thought.slug}`,
    },
    articleSection: thought.category,
    keywords: thought.tags.join(", "),
    wordCount: thought.fullContent.split(" ").length,
    timeRequired: thought.readTime,
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader active="blog" />

      <main className="flex-1 w-full pb-8">
        <header className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-20">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-mono text-muted-foreground mb-10">
            <span>{thought.date}</span>
            <span className="text-border">·</span>
            <span>{thought.readTime}</span>
            <span className="text-border">·</span>
            <span className="uppercase tracking-[0.2em] text-xs font-medium">
              {thought.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-foreground mb-8">
            {thought.title}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            {thought.excerpt}
          </p>
        </header>

        <article className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
          <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:text-foreground prose-headings:tracking-tight
            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6
            prose-p:text-base sm:prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6
            prose-li:text-base sm:prose-li:text-lg prose-li:leading-relaxed prose-li:text-muted-foreground prose-li:my-2
            prose-strong:text-foreground prose-strong:font-medium
            prose-a:text-foreground prose-a:underline prose-a:decoration-muted-foreground/30 hover:prose-a:decoration-foreground prose-a:transition-all
            prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
            prose-code:text-foreground prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:font-normal
            prose-hr:border-border"
          >
            <div className="space-y-5">
              {thought.fullContent.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <h2 key={index}>{paragraph.slice(2, -2)}</h2>
                }
                if (paragraph.startsWith("- **") && paragraph.includes("**:")) {
                  const [boldPart, ...rest] = paragraph.split("**:")
                  const boldText = boldPart.slice(4)
                  const regularText = rest.join("**:")
                  return (
                    <li key={index} className="list-none ml-0">
                      <strong>{boldText}:</strong>
                      {regularText}
                    </li>
                  )
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={index} className="list-disc ml-6">
                      {paragraph.slice(2)}
                    </li>
                  )
                }
                if (/^\d+\./.test(paragraph)) {
                  return (
                    <li key={index} className="list-decimal ml-6">
                      {paragraph.replace(/^\d+\.\s*/, "")}
                    </li>
                  )
                }
                if (paragraph.trim() === "") return null
                return <p key={index}>{paragraph}</p>
              })}
            </div>
          </div>
        </article>

        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-border">
          <div className="space-y-4">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Tags</div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground font-mono">
              {thought.tags.map((tag, i, arr) => (
                <span key={tag} className="flex items-center gap-3">
                  {tag}
                  {i < arr.length - 1 && <span className="text-border">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="uppercase tracking-[0.2em]">Back to writing</span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export function generateStaticParams() {
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }))
}
