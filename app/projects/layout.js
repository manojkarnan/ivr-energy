import Script from 'next/script'
import { companyNAP } from '@/data/companyStats'

export const metadata = {
  title: 'Solar EPC Projects & Rooftop Solar Installations | IVR Energy',
  description:
    'Explore completed solar EPC projects and rooftop solar installations across Tamil Nadu and Pan-India by IVR Energy — from residential rooftop solar to 10 MW industrial solar power plants.',
  keywords:
    'solar EPC projects, rooftop solar installations, solar power plants Tamil Nadu, industrial solar rooftop, commercial solar installation Chennai, turnkey solar EPC, solar panels India, ground mounted solar, IVR Energy projects',
  alternates: {
    canonical: 'https://ivrenergy.com/projects',
  },
  openGraph: {
    title: 'Solar EPC Projects & Rooftop Solar Installations | IVR Energy',
    description:
      'Explore completed solar EPC projects and rooftop solar installations across Tamil Nadu and Pan-India by IVR Energy.',
    url: 'https://ivrenergy.com/projects',
    siteName: 'IVR Energy',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://ivrenergy.com/projects/svs-1mw/1.jpg',
        width: 1200,
        height: 630,
        alt: 'IVR Energy — 1 MW Industrial Solar Plant Project',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Projects Portfolio — IVR Energy EPC',
    description:
      'Browse 13+ completed solar installations by IVR Energy across India. From 10 KW rooftops to 1 MW industrial plants.',
    images: ['https://ivrenergy.com/projects/svs-1mw/1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

const projectsPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Solar EPC Projects Portfolio — IVR Energy',
  description:
    'Complete portfolio of solar EPC projects by IVR Energy across India, including industrial, commercial and residential solar installations.',
  url: 'https://ivrenergy.com/projects',
  isPartOf: {
    '@type': 'WebSite',
    name: 'IVR Energy',
    url: 'https://ivrenergy.com',
  },
  provider: {
    '@type': 'LocalBusiness',
    name: 'IVR Energy',
    url: 'https://ivrenergy.com',
    telephone: companyNAP.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyNAP.address.streetAddress,
      addressLocality: companyNAP.address.city,
      addressRegion: companyNAP.address.state,
      postalCode: companyNAP.address.pincode,
      addressCountry: companyNAP.address.countryCode,
    },
    areaServed: [
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'City', name: 'Coimbatore' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'State', name: 'Tamil Nadu' },
    ],
    priceRange: '₹₹',
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'IVR Energy Solar Project Portfolio',
    numberOfItems: 13,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'CreativeWork',
          name: '1 MW Industrial Solar Plant — SVS, Vandavasi',
          description:
            '1 MW ground-mounted industrial solar plant installed for SVS in Vandavasi, Tamil Nadu by IVR Energy.',
          image: 'https://ivrenergy.com/projects/svs-1mw/1.jpg',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'CreativeWork',
          name: '1 MW Solar Rooftop — TPI, Avadi Chennai',
          description:
            '1 MW solar rooftop installation for TPI in Avadi, Chennai by IVR Energy.',
          image: 'https://ivrenergy.com/projects/tpi-1mw/1.jpeg',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'CreativeWork',
          name: '500 KW Solar Rooftop — TPI, Thiruthani',
          description:
            '500 KW solar rooftop system installed for TPI in Thiruthani by IVR Energy.',
          image: 'https://ivrenergy.com/projects/tpi-500kw/1.jpg',
        },
      },
    ],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://ivrenergy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://ivrenergy.com/projects',
    },
  ],
}

export default function ProjectsLayout({ children }) {
  return (
    <>
      <Script
        id="projects-page-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsPageJsonLd),
        }}
      />
      <Script
        id="projects-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {children}
    </>
  )
}
