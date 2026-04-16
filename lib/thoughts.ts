import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"

export type ThoughtMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
}

export type Thought = ThoughtMeta & {
  content: string
  html: string
}

const THOUGHTS_DIR = path.join(process.cwd(), "content", "thoughts")

function readThoughtFile(slug: string): { data: Record<string, unknown>; content: string } | null {
  const filePath = path.join(THOUGHTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { data, content }
}

function toMeta(slug: string, data: Record<string, unknown>): ThoughtMeta {
  return {
    slug,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? ""),
    readTime: String(data.readTime ?? ""),
    category: String(data.category ?? ""),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  }
}

export function getAllThoughtSlugs(): string[] {
  if (!fs.existsSync(THOUGHTS_DIR)) return []
  return fs
    .readdirSync(THOUGHTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getAllThoughts(): ThoughtMeta[] {
  return getAllThoughtSlugs()
    .map((slug) => {
      const parsed = readThoughtFile(slug)
      if (!parsed) return null
      return toMeta(slug, parsed.data)
    })
    .filter((t): t is ThoughtMeta => t !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getThought(slug: string): Promise<Thought | null> {
  const parsed = readThoughtFile(slug)
  if (!parsed) return null
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(parsed.content)
  return {
    ...toMeta(slug, parsed.data),
    content: parsed.content,
    html: String(processed),
  }
}
