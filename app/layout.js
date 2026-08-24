import { Geist, Inter, Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', weight: ['400', '500', '600', '700', '800', '900'], display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', weight: ['400', '500', '600', '700', '800'], display: 'swap' })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#D71920',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'IVR Energy | Premier Solar EPC & Turnkey Solar Solutions in Chennai & Tamil Nadu',
    template: '%s | IVR Energy',
  },
  description: 'IVR Energy is a leading Solar EPC company in Chennai delivering turnkey solar solutions for Residential, Commercial and Industrial clients across Tamil Nadu & India. Tier-1 Modules, PM Surya Ghar Subsidy Assistance, TANGEDCO Net Metering & 25-Year Performance Guarantee.',
  keywords: [
    'Solar EPC Chennai',
    'Rooftop Solar Tamil Nadu',
    'Solar Panel Installation Chennai',
    '3kW Solar System Price',
    '4kW Solar Rooftop Price',
    '5kW Solar Villa Tamil Nadu',
    '10kW Commercial Solar System',
    'PM Surya Ghar Muft Bijli Yojana Subsidy',
    'TANGEDCO Net Metering Approval',
    'Industrial Captive Solar Power Plant',
    'Ground Mounted Solar Farms India',
    'Solar EPC Contractors Chennai',
    'Solar O&M Services Tamil Nadu',
    'Solar Installers Hosur',
    'Solar Company Krishnagiri',
    'IVR Energy'
  ],
  authors: [{ name: 'IVR Energy', url: siteUrl }],
  creator: 'IVR Energy',
  publisher: 'IVR Energy',
  applicationName: 'IVR Energy',
  generator: 'Next.js',
  alternates: {
    canonical: siteUrl,
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'IVR Energy',
    title: 'IVR Energy | Premier Solar EPC & Turnkey Solar Solutions',
    description: 'Slash your electricity bills to zero with Tier-1 rooftop solar systems, PM Surya Ghar subsidy support, and turnkey EPC execution by IVR Energy across Tamil Nadu & India.',
    images: [
      {
        url: '/ivr-logo.webp',
        width: 1200,
        height: 630,
        alt: 'IVR Energy — Premier Solar EPC Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IVR Energy | Premier Solar EPC & Turnkey Solar Solutions',
    description: 'Turnkey solar EPC solutions across Tamil Nadu & India. From 3kW residential rooftops to multi-MW industrial solar power plants.',
    images: ['/ivr-logo.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Chennai, Tamil Nadu, India',
    'geo.position': '13.013944;80.136667',
    'ICBM': '13.013944, 80.136667',
    'DC.title': 'IVR Energy — Solar EPC Company Chennai & Tamil Nadu',
    'DC.creator': 'IVR Energy',
    'DC.language': 'en',
    'DC.coverage': 'Tamil Nadu, Chennai, Hosur, India',
  },
}

const geoAndEntityJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'SolarEnergy', 'GeneralContractor'],
      '@id': `${siteUrl}/#organization`,
      name: 'IVR Energy',
      legalName: 'IVR Energy (OPC) Private Limited',
      slogan: 'Powering India with Clean & Sustainable Solar Energy',
      url: siteUrl,
      logo: `${siteUrl}/ivr-logo.webp`,
      image: `${siteUrl}/ivr-logo.webp`,
      description: 'Premier Solar EPC company based in Chennai providing turnkey solar power solutions across Residential, Commercial, and Industrial sectors in Tamil Nadu and India.',
      telephone: '+91 90477 77936',
      email: 'ivrenergysolutions@gmail.com',
      priceRange: '₹₹',
      foundingDate: '2014',
      taxID: '33BTTPR9122F1ZB',
      vatID: '33BTTPR9122F1ZB',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3rd floor, Door No - 1, Plot No - A, Manasarovar Nagar, Gerugambakkam',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600122',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 13.013944,
        longitude: 80.136667,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:30',
          closes: '19:30',
        },
      ],
      sameAs: [
        'https://www.instagram.com/ivrenergy/',
        'https://www.linkedin.com/company/ivr-energy',
      ],
      areaServed: [
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'City', name: 'Hosur' },
        { '@type': 'City', name: 'Kanchipuram' },
        { '@type': 'City', name: 'Chengalpattu' },
        { '@type': 'City', name: 'Tiruvallur' },
        { '@type': 'City', name: 'Coimbatore' },
        { '@type': 'City', name: 'Krishnagiri' },
        { '@type': 'City', name: 'Salem' },
        { '@type': 'City', name: 'Madurai' },
        { '@type': 'City', name: 'Tiruchirappalli' },
        { '@type': 'City', name: 'Erode' },
        { '@type': 'City', name: 'Tiruppur' },
        { '@type': 'City', name: 'Vellore' },
        { '@type': 'State', name: 'Tamil Nadu' },
        { '@type': 'Country', name: 'India' },
      ],
      knowsAbout: [
        'Solar EPC Engineering',
        'Residential Rooftop Solar Installation',
        'Commercial Solar Power Plants',
        'Industrial Captive MW Solar EPC',
        'PM Surya Ghar Muft Bijli Yojana Central Subsidy',
        'TANGEDCO Bi-Directional Net Metering Approvals',
        'CEIG Electrical Safety Inspections',
        'TOPCon Bifacial Solar Modules',
        'Smart Grid-Tie Inverters with WiFi Telemetry',
        'Elevated High-Clearance Rooftop Structures',
        'Solar Operations and Maintenance (O&M)'
      ],
      department: [
        {
          '@type': 'LocalBusiness',
          name: 'IVR Energy — Hosur Regional Branch',
          telephone: '+91 90477 77935',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'LIG 226, Phase - X, Rayakottai Road, HUDCO',
            addressLocality: 'Hosur',
            addressRegion: 'Tamil Nadu',
            postalCode: '635109',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 12.7409,
            longitude: 77.8253,
          },
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Solar EPC Services & Systems',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Residential Rooftop Solar Installation',
              description: 'Turnkey on-grid rooftop solar plants (3kW, 4kW, 5kW) with PM Surya Ghar ₹78,000 direct DBT subsidy processing.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Solar Rooftop EPC',
              description: 'High-yield solar power systems for schools, hospitals, IT parks and commercial buildings with 40% accelerated depreciation.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Industrial Captive MW Solar Plants',
              description: 'Multi-megawatt rooftop & ground mounted captive solar energy solutions for manufacturing and textile industries.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'IVR Energy',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai, Tamil Nadu, India" />
        <meta name="geo.position" content="13.013944;80.136667" />
        <meta name="ICBM" content="13.013944, 80.136667" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(geoAndEntityJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-neutral-900" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
