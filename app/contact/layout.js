const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  title: 'Contact Solar EPC Engineers in Chennai & Hosur | IVR Energy',
  description: 'Connect with IVR Energy for free rooftop solar surveys, PM Surya Ghar subsidy consulting, and custom turnkey EPC quotations in Chennai, Hosur, and across Tamil Nadu. Call +91 90477 77936.',
  keywords: [
    'Contact IVR Energy',
    'Solar Company Chennai Phone Number',
    'Free Solar Site Survey Chennai',
    'Solar Panel Installation Quote',
    'PM Surya Ghar Subsidy Help Chennai',
    'IVR Energy Gerugambakkam Address',
    'IVR Energy Hosur Branch',
    'Solar EPC Consultant Tamil Nadu'
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Solar EPC Engineers in Chennai & Hosur | IVR Energy',
    description: 'Get in touch for free solar site surveys, PM Surya Ghar subsidy processing, and turnkey solar quotes in Tamil Nadu.',
    url: `${siteUrl}/contact`,
    siteName: 'IVR Energy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/ivr-logo.webp`,
        width: 1200,
        height: 630,
        alt: 'Contact IVR Energy - Solar EPC Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Solar EPC Engineers in Chennai & Hosur | IVR Energy',
    description: 'Connect with our solar project engineers for free site assessment and fast ROI quotations.',
    images: [`${siteUrl}/ivr-logo.webp`],
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

export default function ContactLayout({ children }) {
  return children
}
