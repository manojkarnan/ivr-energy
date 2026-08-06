export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

  const routes = ['', '/services', '/faqs', '/projects', '/terms', '/privacy'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : route === '/services' ? 0.9 : 0.8,
    })
  )

  return routes
}
