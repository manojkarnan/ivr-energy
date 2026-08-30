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
          'Googlebot',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
        ],
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
          'GoogleOther',
          'Applebot-Extended',
          'cohere-ai',
          'OAI-SearchBot',
          'CCBot',
          'Diffbot',
          'Bytespider',
          'FacebookBot',
        ],
        allow: ['/', '/llms.txt', '/services', '/services/*', '/solutions', '/projects', '/projects/*', '/blog', '/blog/*', '/faqs', '/about', '/contact'],
        disallow: ['/admin/', '/adminivr/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
