import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blogs'
import { readDb } from '@/lib/jsonDb'

export async function generateMetadata({ params }) {
  const { slug } = await params
  let post = getBlogPostBySlug(slug)

  if (!post) {
    try {
      const db = await readDb()
      if (Array.isArray(db.blogs)) {
        post = db.blogs.find(b => b.slug === slug || b.id === slug)
      }
    } catch {
      // fallback
    }
  }

  if (!post) {
    return {
      title: 'Solar Article Not Found | IVR Energy',
      description: 'The requested solar guide or industry insight could not be found.',
    }
  }

  const title = `${post.title} | IVR Energy`
  const description = post.excerpt || post.description || 'Expert solar energy guides, PM Surya Ghar subsidy details, and industrial solar engineering in Tamil Nadu by IVR Energy.'
  const url = `https://ivrenergy.com/blog/${post.slug || slug}`
  const imageUrl = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `https://ivrenergy.com${post.coverImage || '/projects/svs-1mw/1.jpg'}`

  return {
    title,
    description,
    keywords: Array.isArray(post.tags) ? post.tags : ['Solar Energy', 'Rooftop Solar', 'IVR Energy', 'Tamil Nadu'],
    authors: [{ name: post.author?.name || 'IVR Energy Engineering Team' }],
    creator: 'IVR Energy',
    publisher: 'IVR Energy (OPC) Private Limited',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'IVR Energy',
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt || post.publishedAt || post.createdAt,
      authors: [post.author?.name || 'IVR Energy Engineering Team'],
      section: post.category || 'Solar Energy',
      tags: post.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@ivrenergy',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function BlogPostLayout({ children }) {
  return children
}
