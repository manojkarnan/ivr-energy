const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  title: 'Terms & Conditions | IVR Energy',
  description: 'Review the official terms and conditions for solar Engineering, Procurement, Construction (EPC) and O&M services by IVR Energy (OPC) Private Limited.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsLayout({ children }) {
  return children
}
