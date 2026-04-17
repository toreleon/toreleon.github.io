import Link from "next/link"
import { notFound } from "next/navigation"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import ReadingProgress from "@/components/reading-progress"
import type { Metadata } from "next"
import { getAllThoughtSlugs, getThought } from "@/lib/thoughts"

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const thought = await getThought(slug)

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
  const thought = await getThought(slug)

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
    wordCount: thought.content.split(/\s+/).filter(Boolean).length,
    timeRequired: thought.readTime,
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <SiteHeader active="blog" />

      <main className="flex-1 w-full pb-8">
        <header className="max-w-3xl mx-auto px-6 sm:px-10 pt-32 sm:pt-40 pb-10 sm:pb-14">
          <div className="mb-6">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {thought.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.1] text-foreground mb-6">
            {thought.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
            {thought.excerpt}
          </p>

          <div className="flex items-center gap-4 pt-6 border-t border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background text-sm font-semibold">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Thang Le Viet</span>
              <span className="text-xs text-muted-foreground">
                <time dateTime={thought.date}>{formatDate(thought.date)}</time>
                <span className="mx-1.5 text-border">·</span>
                <span>{thought.readTime}</span>
              </span>
            </div>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-6 sm:px-10 pb-16">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: thought.html }}
          />
        </article>

        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {thought.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-muted/60 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8">
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
            <span className="uppercase tracking-[0.2em]">Back to thoughts</span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export function generateStaticParams() {
  return getAllThoughtSlugs().map((slug) => ({ slug }))
}
