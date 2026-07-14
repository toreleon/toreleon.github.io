import { MetadataRoute } from 'next'
import { getAllThoughtSlugs } from '@/lib/thoughts'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toreleon.github.io'

  const blogEntries = getAllThoughtSlugs().map((slug) => ({
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
