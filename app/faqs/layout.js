const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  title: 'Solar FAQs & PM Surya Ghar Subsidy Questions | IVR Energy',
  description: 'Frequently asked questions about rooftop solar installation, PM Surya Ghar subsidy rates (₹78,000 max), TANGEDCO net metering, payback timeline, and maintenance by IVR Energy.',
  keywords: [
    'Solar FAQs Tamil Nadu',
    'PM Surya Ghar Muft Bijli Yojana Questions',
    'TANGEDCO Net Metering FAQ',
    'How Solar Panels Work India',
    'Rooftop Solar Cost & Subsidy FAQ',
    'Solar Inverter Maintenance FAQ',
    'IVR Energy FAQs'
  ],
  alternates: {
    canonical: `${siteUrl}/faqs`,
  },
  openGraph: {
    title: 'Solar FAQs & PM Surya Ghar Subsidy Questions | IVR Energy',
    description: 'Everything you need to know about going solar, subsidy guidelines, net metering approvals, and plant maintenance in Tamil Nadu.',
    url: `${siteUrl}/faqs`,
    siteName: 'IVR Energy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar FAQs & PM Surya Ghar Subsidy Guide | IVR Energy',
    description: 'Get clear answers to all questions on rooftop solar, costs, subsidies, and approvals.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function FaqsLayout({ children }) {
  return children
}
