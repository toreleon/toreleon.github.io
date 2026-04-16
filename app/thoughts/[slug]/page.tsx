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

const thoughts: Thought[] = []

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
