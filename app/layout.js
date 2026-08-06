import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'IVR Energy — Powering India with Clean, Smart & Sustainable Solar Energy',
  description: 'IVR Energy is a leading Solar EPC company in Chennai delivering turnkey solar solutions for Residential, Commercial and Industrial customers. Engineering •• Procurement •• Construction •• O&M.',
  keywords: 'Solar EPC Chennai, Rooftop Solar, Ground Mounted Solar, Industrial Solar, PM Surya Ghar, IVR Energy, Solar panels India',
  openGraph: {
    title: 'IVR Energy — Premium Solar EPC Solutions',
    description: 'Turnkey solar EPC solutions across India. From 5KW homes to 1MW industrial plants.',
    type: 'website',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'IVR Energy',
  image: 'https://ivrenergy.com/ivr-logo.webp',
  '@id': 'https://ivrenergy.com',
  url: 'https://ivrenergy.com',
  telephone: '+91 90477 77936',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3rd floor, Door No - 1, Plot No - A, Manasarovar Nagar, Gerugambakkam',
    addressLocality: 'Chennai',
    postalCode: '600122',
    addressCountry: 'IN',
  },
  priceRange: '₹₹',
  description: 'IVR Energy is a leading Solar EPC company in Chennai delivering turnkey solar solutions for Residential, Commercial and Industrial customers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-neutral-900" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
