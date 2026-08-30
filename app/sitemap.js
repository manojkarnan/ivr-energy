import { readDb } from '@/lib/jsonDb'
import { BLOG_POSTS } from '@/data/blogs'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

  // Static routes with SEO-optimized priorities & change frequencies
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solutions`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/3kw-solar-system`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/4kw-solar-system`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/5kw-solar-system`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/10kw-solar-system`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solar-panel-installation-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/residential-solar-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/commercial-solar-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/industrial-solar-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/3kw-solar-system-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/5kw-solar-system-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solar-panel-price-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solar-subsidy-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pm-surya-ghar-chennai`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solar-net-metering-tamil-nadu`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/faqs`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date().toISOString(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Dynamic blog article routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Dynamic project routes — each project gets its own indexed URL
  let projectRoutes = []
  try {
    const db = await readDb()
    if (Array.isArray(db.projects) && db.projects.length) {
      projectRoutes = db.projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: project.updatedAt || project.createdAt || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }))
    }
  } catch {
    // Silently fall back to static-only sitemap
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
