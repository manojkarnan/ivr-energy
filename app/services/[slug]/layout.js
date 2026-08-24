import { getCapacityBySlug, SOLAR_CAPACITIES_DATA } from '@/data/capacities'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const cap = getCapacityBySlug(slug)

  if (!cap) {
    return {
      title: 'Solar System Capacity Details | IVR Energy',
      description: 'Explore 3kW, 4kW, 5kW, and 10kW rooftop solar system capacity specifications, pricing, and PM Surya Ghar subsidy details by IVR Energy.',
    }
  }

  const title = `${cap.kw} Rooftop Solar System Specifications & Price | IVR Energy Tamil Nadu`
  const description = `${cap.title}: Generates ${cap.dailyUnits}, requires ${cap.roofArea}, saves ${cap.monthlySavings}. Includes ${cap.badge}, Tier-1 TOPCon panels, net metering & 25-yr warranty.`
  const url = `https://ivrenergy.com/services/${cap.slug}`

  return {
    title,
    description,
    keywords: [
      `${cap.kw} solar system price in Tamil Nadu`,
      `${cap.kw} rooftop solar subsidy`,
      `${cap.kw} PM Surya Ghar subsidy`,
      `${cap.kw} on-grid solar plant`,
      'IVR Energy solar installation',
      'Chennai rooftop solar'
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'IVR Energy',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://ivrenergy.com/projects/svs-1mw/1.jpg',
          width: 1200,
          height: 630,
          alt: `${cap.kw} Solar Power Plant by IVR Energy`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ivrenergy.com/projects/svs-1mw/1.jpg'],
    },
  }
}

export default function CapacityLayout({ children }) {
  return children
}
