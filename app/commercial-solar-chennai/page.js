import { LANDING_PAGES } from '@/data/landingPages'
import LandingPageTemplate from '@/components/LandingPageTemplate'

const pageData = LANDING_PAGES['commercial-solar-chennai']

export const metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: {
    canonical: `https://ivrenergy.com/${pageData.slug}`,
  },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `https://ivrenergy.com/${pageData.slug}`,
    siteName: 'IVR Energy',
    type: 'website',
    images: [{ url: '/ivr-logo.webp', width: 1200, height: 630, alt: pageData.h1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    images: ['/ivr-logo.webp'],
  },
}

export default function CommercialSolarChennaiPage() {
  return <LandingPageTemplate page={pageData} />
}
