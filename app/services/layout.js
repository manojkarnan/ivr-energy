const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  title: 'Turnkey Solar EPC Services & System Sizing | IVR Energy',
  description: 'Explore turnkey solar EPC solutions in Tamil Nadu: Residential rooftop solar (3kW–5kW), commercial & industrial solar plants, DISCOM net-metering liaison, CEIG safety approvals, and solar O&M services by IVR Energy.',
  keywords: [
    'Solar EPC Services Chennai',
    'Residential Rooftop Solar System Sizing',
    '3kW Solar System Tamil Nadu',
    '4kW Solar Rooftop Installation',
    '5kW Solar Villa Power Plant',
    '10kW Commercial Solar EPC',
    'PM Surya Ghar Subsidy Processing',
    'TANGEDCO Net Metering Approval',
    'Industrial Captive Solar Chennai',
    'Solar Panel Operations and Maintenance',
    'Solar DPR & Feasibility Advisory'
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: 'Turnkey Solar EPC Services & System Sizing | IVR Energy',
    description: 'Explore turnkey solar EPC solutions in Tamil Nadu: Residential rooftop solar, commercial & industrial solar plants, and system sizing.',
    url: `${siteUrl}/services`,
    siteName: 'IVR Energy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/projects/svs-1mw/1.jpg`,
        width: 1200,
        height: 630,
        alt: 'IVR Energy Solar EPC Services Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turnkey Solar EPC Services & System Sizing | IVR Energy',
    description: 'End-to-end solar EPC services from 3kW residential systems to multi-MW industrial captive solar plants in Tamil Nadu.',
    images: [`${siteUrl}/projects/svs-1mw/1.jpg`],
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

export default function ServicesLayout({ children }) {
  return children
}
