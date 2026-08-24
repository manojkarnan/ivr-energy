import Script from 'next/script'
import { readDb } from '@/lib/jsonDb'

function getProjectCapacityInKw(p) {
  const mwMatch = p.title.match(/(\d+(?:\.\d+)?)\s*MW/i)
  if (mwMatch) return parseFloat(mwMatch[1]) * 1000
  const kwMatch = p.title.match(/(\d+(?:\.\d+)?)\s*KW/i)
  if (kwMatch) return parseFloat(kwMatch[1])
  if (p.capacity) {
    const parsed = parseFloat(p.capacity)
    if (!isNaN(parsed)) return parsed
  }
  return 0
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

  try {
    const db = await readDb()
    const project = (db.projects || []).find((p) => p.id === id)

    if (!project) {
      return {
        title: 'Project Not Found | IVR Energy',
        description: 'The requested solar project could not be found.',
        robots: { index: false, follow: true },
      }
    }

    const capacityKw = getProjectCapacityInKw(project)
    const capacityLabel =
      capacityKw >= 1000 ? `${capacityKw / 1000} MW` : `${capacityKw} KW`

    const title = `${project.title} — ${project.client}, ${project.location} | IVR Energy`
    const description = `${capacityLabel} ${project.type.toLowerCase()} solar ${
      project.type === 'Industrial' ? 'plant' : 'rooftop'
    } installation for ${project.client} in ${project.location} by IVR Energy. View project gallery, capacity details & installation photos.`

    const imageUrl = project.img?.startsWith('http')
      ? project.img
      : `${baseUrl}${project.img}`

    return {
      title,
      description,
      keywords: `${project.title}, ${project.client} solar, solar ${project.type.toLowerCase()} ${project.location}, ${capacityLabel} solar, IVR Energy project, solar EPC ${project.location}`,
      alternates: {
        canonical: `${baseUrl}/projects/${id}`,
      },
      openGraph: {
        title: `${project.title} — ${project.client} | IVR Energy`,
        description,
        url: `${baseUrl}/projects/${id}`,
        siteName: 'IVR Energy',
        type: 'article',
        locale: 'en_IN',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${project.title} — ${project.type} solar installation by IVR Energy`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.title} — ${project.client}`,
        description,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  } catch {
    return {
      title: 'Solar Project | IVR Energy',
      description:
        'View solar EPC project details, installation gallery and capacity information by IVR Energy.',
    }
  }
}

export default async function ProjectDetailLayout({ children, params }) {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

  let projectJsonLd = null
  let breadcrumbJsonLd = null

  try {
    const db = await readDb()
    const project = (db.projects || []).find((p) => p.id === id)

    if (project) {
      const imageUrl = project.img?.startsWith('http')
        ? project.img
        : `${baseUrl}${project.img}`

      projectJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: project.title,
        description: `${project.type} solar installation for ${project.client} in ${project.location} by IVR Energy.`,
        image: project.gallery
          ? project.gallery.map((g) =>
              g.startsWith('http') ? g : `${baseUrl}${g}`
            )
          : [imageUrl],
        author: {
          '@type': 'Organization',
          name: 'IVR Energy',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'IVR Energy',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/ivr-logo.webp`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/projects/${id}`,
        },
      }

      breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${baseUrl}/projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: `${baseUrl}/projects/${id}`,
          },
        ],
      }
    }
  } catch {
    // Graceful fallback — page renders without structured data
  }

  return (
    <>
      {projectJsonLd && (
        <Script
          id="project-detail-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectJsonLd),
          }}
        />
      )}
      {breadcrumbJsonLd && (
        <Script
          id="project-breadcrumb-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      )}
      {children}
    </>
  )
}
