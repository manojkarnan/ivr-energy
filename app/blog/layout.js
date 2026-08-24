export const metadata = {
  title: 'Solar Energy Blog & Industry Insights | IVR Energy',
  description: 'Explore the latest rooftop solar guides, PM Surya Ghar subsidy updates, commercial & industrial solar ROI case studies, and solar technology innovations in Tamil Nadu by IVR Energy.',
  keywords: [
    'Solar Energy Blog',
    'PM Surya Ghar Subsidy Guide',
    'Industrial Solar ROI Tamil Nadu',
    'TANGEDCO Net Metering',
    'Rooftop Solar EPC',
    'TOPCon Solar Panels',
    'Commercial Solar Power Plant',
    'IVR Energy Blog',
    'Solar Installation Chennai',
    'Solar Maintenance Tamil Nadu'
  ],
  alternates: {
    canonical: 'https://ivrenergy.com/blog',
  },
  openGraph: {
    title: 'Solar Energy Blog & Industry Insights | IVR Energy',
    description: 'Expert guides on PM Surya Ghar subsidies, commercial solar ROI, net-metering regulations, and rooftop solar engineering in Tamil Nadu.',
    url: 'https://ivrenergy.com/blog',
    siteName: 'IVR Energy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://ivrenergy.com/projects/svs-1mw/1.jpg',
        width: 1200,
        height: 630,
        alt: 'IVR Energy Solar Knowledge Hub & Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Energy Blog & Industry Insights | IVR Energy',
    description: 'Expert guides on PM Surya Ghar subsidies, commercial solar ROI, net-metering regulations, and rooftop solar engineering.',
    images: ['https://ivrenergy.com/projects/svs-1mw/1.jpg'],
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

export default function BlogLayout({ children }) {
  return children
}
