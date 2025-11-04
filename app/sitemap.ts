import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toreleon.github.io'
  
  // Blog post slugs
  const blogPosts = [
    'future-ai-engineering-beyond-model-training',
    'building-agentic-systems-multi-agent-architecture',
    'vibe-coding-revolution-ai-transforming-development',
    'legacy-to-modern-art-code-modernization',
  ]

  // Generate blog post entries
  const blogEntries = blogPosts.map((slug) => ({
    url: `${baseUrl}/thoughts/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...blogEntries,
  ]
}

