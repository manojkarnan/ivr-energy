export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/adminivr/', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'OAI-SearchBot',
          'CCBot'
        ],
        allow: ['/', '/llms.txt', '/services', '/services/*', '/projects', '/projects/*', '/blog', '/blog/*', '/faqs', '/contact'],
        disallow: ['/admin/', '/adminivr/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
