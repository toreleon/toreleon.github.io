import Link from "next/link"
import { StreamText } from "@/components/stream-text"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { getAllThoughts } from "@/lib/thoughts"

export default function Home() {
  const thoughts = getAllThoughts()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader active="blog" />

      <main className="flex-1 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full">
        <header className="pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="space-y-8 max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              <StreamText text="Thoughts" speed={55} />
            </h1>
            <StreamText
              as="p"
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed"
              text="Notes on coding agents, multi-agent systems, and what happens when you point them at domains beyond software."
              speed={10}
              startDelay={700}
            />
          </div>
        </header>

        <section className="pb-24 sm:pb-32">
          <div className="space-y-10 sm:space-y-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">Writing</h2>
              <div className="text-sm text-muted-foreground font-mono">
                {thoughts.length > 0
                  ? `${thoughts.length} post${thoughts.length === 1 ? "" : "s"}`
                  : "Coming soon"}
              </div>
            </div>

            {thoughts.length === 0 ? (
              <div className="py-16 border-t border-border">
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  No posts yet. First essays are in draft — expect notes on coding agents in production, evaluation pitfalls, and the jump from developer tooling to other domains.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {thoughts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/thoughts/${post.slug}`}
                    className="group grid lg:grid-cols-12 gap-6 sm:gap-10 py-10 sm:py-14 transition-colors duration-500"
                  >
                    <div className="lg:col-span-3 space-y-2">
                      <div className="text-base font-mono text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                        {post.date}
                      </div>
                      <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {post.category}
                      </div>
                      <div className="text-sm font-mono text-muted-foreground">{post.readTime}</div>
                    </div>

                    <div className="lg:col-span-9 space-y-4">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground font-mono">
                        {post.tags.map((tag, i, arr) => (
                          <span key={tag} className="flex items-center gap-3">
                            {tag}
                            {i < arr.length - 1 && <span className="text-border">·</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
