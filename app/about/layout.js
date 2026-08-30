import { companyStats, companyNAP } from '@/data/companyStats'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  title: 'About IVR Energy | Premier Solar EPC Company in Tamil Nadu & India',
  description: `Learn about IVR Energy, Tamil Nadu's trusted Solar EPC contractor with ${companyStats.experience} of field engineering expertise, ${companyStats.projects} turnkey solar installations, DISCOM empanelment, and MNRE PM Surya Ghar subsidy leadership.`,
  keywords: [
    'About IVR Energy',
    'Solar EPC Company Chennai',
    'Solar EPC Contractors Tamil Nadu',
    'Solar Panel Installation Company Chennai',
    'TANGEDCO Empanelled Solar EPC',
    'MNRE PM Surya Ghar Vendor Tamil Nadu',
    'Solar Engineering Team Chennai',
    'Commercial Solar EPC Contractor Hosur',
    'Industrial Captive Solar Installer India',
    `${companyStats.experience} Solar EPC Experience`,
    'IVR Energy Founders & Engineering'
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About IVR Energy | Premier Solar EPC Company in Tamil Nadu & India',
    description: `${companyStats.experience} of engineering rigor, Tier-1 hardware, DISCOM net-metering clearance, and ${companyStats.projects} successful rooftop and MW-scale solar power plants across India.`,
    url: `${siteUrl}/about`,
    siteName: 'IVR Energy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/projects/svs-1mw/1.jpg`,
        width: 1200,
        height: 630,
        alt: 'IVR Energy — Premier Solar EPC Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About IVR Energy | Premier Solar EPC Company',
    description: 'Engineering renewable power with clarity, precision, and integrity. Turnkey rooftop and captive solar power plants in Tamil Nadu.',
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

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${siteUrl}/about#webpage`,
      url: `${siteUrl}/about`,
      name: 'About IVR Energy — Solar EPC Leaders in Tamil Nadu',
      description: 'Overview of IVR Energy history, engineering values, mission, turnkey solar EPC capabilities, and executive leadership.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'IVR Energy',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: `${siteUrl}/about`,
          },
        ],
      },
      mainEntity: {
        '@type': ['Organization', 'LocalBusiness', 'SolarEnergy'],
        '@id': `${siteUrl}/#organization`,
        name: 'IVR Energy',
        legalName: 'IVR Energy (OPC) Private Limited',
        foundingDate: '2014',
        slogan: 'Engineering renewable power with clarity, precision, and integrity.',
        telephone: companyNAP.phone,
        email: companyNAP.primaryEmail,
        url: siteUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: companyNAP.address.streetAddress,
          addressLocality: companyNAP.address.city,
          addressRegion: companyNAP.address.state,
          postalCode: companyNAP.address.pincode,
          addressCountry: companyNAP.address.countryCode,
        },
        knowsAbout: [
          'Turnkey Solar EPC',
          '3D Shadow Computational Simulation',
          'TANGEDCO Net Metering Approvals',
          'CEIG Electrical Safety Clearance',
          'PM Surya Ghar Central Government Subsidies',
          'Industrial High Tension Solar Power Plants',
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/about#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does IVR Energy provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'IVR Energy is a full-service turnkey Solar EPC contractor providing 3D site shadow analysis, engineering design, procurement of Tier-1 TOPCon modules, installation, DISCOM net-metering liaison, CEIG approvals, and 25-year solar O&M operations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where does IVR Energy operate in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'IVR Energy is headquartered in Chennai, Tamil Nadu, with regional operational hubs in Hosur and coverage across all districts of Tamil Nadu including Coimbatore, Salem, Madurai, Trichy, Kanchipuram, and pan-India industrial captive projects.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does IVR Energy assist with PM Surya Ghar solar subsidies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. IVR Energy provides complete end-to-end liaison for the PM Surya Ghar Muft Bijli Yojana, securing up to ₹78,000 in direct bank transfer (DBT) central government subsidies for eligible residential homeowners.',
          },
        },
      ],
    },
  ],
}

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  )
}
