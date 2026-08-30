const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  title: 'Turnkey Solar Solutions | Residential, Commercial, Industrial & Utility | IVR Energy',
  description: 'Explore engineered solar power solutions in Tamil Nadu: Residential rooftop solar with PM Surya Ghar subsidy, commercial rooftop solar EPC, MW industrial captive plants, agricultural BESS hybrid systems, EV solar carports, and ground-mounted farms.',
  keywords: [
    'Solar Solutions Tamil Nadu',
    'Residential Rooftop Solar Chennai',
    'Commercial Solar Power Plant EPC',
    'Industrial Captive Solar Tamil Nadu',
    'Agricultural Solar Pump Battery Storage',
    'EV Charging Solar Carport Canopy',
    'Utility Ground Mount Solar EPC India',
    'PM Surya Ghar Solar Subsidy Eligible',
    'Grid-Tied vs Hybrid Solar Tamil Nadu',
    'Solar Payback Period India',
    'Solar Energy Contractor Hosur',
    'IVR Energy Solar Solutions'
  ],
  alternates: {
    canonical: `${siteUrl}/solutions`,
  },
  openGraph: {
    title: 'Turnkey Solar Solutions & Sizing | IVR Energy',
    description: 'Custom-engineered solar installations for homes, commercial establishments, and heavy industrial facilities across Tamil Nadu & India.',
    url: `${siteUrl}/solutions`,
    siteName: 'IVR Energy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/projects/svs-1mw/1.jpg`,
        width: 1200,
        height: 630,
        alt: 'IVR Energy Engineered Solar Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turnkey Solar Solutions | IVR Energy',
    description: 'From 3kW residential rooftop setups to multi-megawatt industrial captive plants, discover high-yield solar solutions by IVR Energy.',
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

const solutionsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemPage',
      '@id': `${siteUrl}/solutions#webpage`,
      url: `${siteUrl}/solutions`,
      name: 'Turnkey Solar Solutions by Segment — IVR Energy',
      description: 'Comprehensive engineering specifications, capacities, and ROI models for residential, commercial, industrial, agricultural, and EV carport solar installations.',
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
            name: 'Solutions',
            item: `${siteUrl}/solutions`,
          },
        ],
      },
      hasPart: [
        {
          '@type': 'Service',
          name: 'Residential Rooftop Solar',
          serviceType: 'Solar Panel Installation',
          description: 'On-grid rooftop solar systems (3kW–10kW) with PM Surya Ghar subsidy eligibility, TANGEDCO bi-directional net-metering, and Tier-1 TOPCon modules.',
          provider: { '@id': `${siteUrl}/#organization` },
          areaServed: { '@type': 'State', name: 'Tamil Nadu' },
        },
        {
          '@type': 'Service',
          name: 'Commercial Rooftop EPC',
          serviceType: 'Commercial Solar Energy',
          description: 'Commercial rooftop solar systems (10kW–100kW+) offering up to 70% daytime bill reduction and 40% Section 32 accelerated corporate tax depreciation.',
          provider: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': 'Service',
          name: 'Industrial Captive Power Plants',
          serviceType: 'Industrial Solar EPC',
          description: 'Megawatt-scale captive solar plants (100kW–5MW+) engineered for high-tension (11kV/22kV/33kV) continuous industrial manufacturing loads.',
          provider: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': 'Service',
          name: 'Agricultural & Hybrid Storage (BESS)',
          serviceType: 'Solar Battery Energy Storage',
          description: 'Off-grid and hybrid solar installations with Lithium Ferro Phosphate (LFP) batteries for uninterrupted daytime irrigation pumping and remote microgrids.',
          provider: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': 'Service',
          name: 'EV Solar Carports & Canopies',
          serviceType: 'EV Charging Solar Infrastructure',
          description: 'Engineered cantilever steel solar car shade structures integrated with Level-2 AC and CCS2 DC fast charging stations.',
          provider: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': 'Service',
          name: 'Utility Ground-Mounted Farms',
          serviceType: 'Utility Scale Solar EPC',
          description: 'Land-to-grid utility solar power plants with astronomical single-axis trackers, 33kV/66kV grid evacuation, and comprehensive PPA management.',
          provider: { '@id': `${siteUrl}/#organization` },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/solutions#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much subsidy can I get for a residential rooftop solar system in Tamil Nadu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Under the Central Government PM Surya Ghar: Muft Bijli Yojana, residential homeowners receive a direct bank transfer (DBT) subsidy of ₹33,000 for 1 kW, ₹66,000 for 2 kW, and up to ₹78,000 for 3 kW and above systems.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between On-Grid, Hybrid, and Off-Grid solar systems?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On-Grid systems connect to the electricity grid with net metering to sell surplus power (fastest 2.5–3 year payback). Hybrid systems include lithium battery storage (BESS) for seamless instant power during grid cuts. Off-Grid systems operate 100% independently from the state grid with dedicated battery banks.',
          },
        },
        {
          '@type': 'Question',
          name: 'What corporate tax benefits apply to commercial and industrial solar installations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Commercial and industrial entities can claim 40% Accelerated Depreciation (AD) under Section 32 of the Income Tax Act in the first year of commissioning, significantly reducing corporate tax liability in addition to saving on peak commercial power tariffs.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a turnkey solar EPC installation take with IVR Energy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard residential installations (3kW–10kW) are completed in 3 to 5 working days, followed by TANGEDCO meter installation in 2 to 3 weeks. Commercial and MW industrial installations range from 30 to 90 days including CEIG clearances.',
          },
        },
      ],
    },
  ],
}

export default function SolutionsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsJsonLd) }}
      />
      {children}
    </>
  )
}
