export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/adminivr/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
