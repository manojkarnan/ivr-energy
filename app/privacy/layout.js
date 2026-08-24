const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'

export const metadata = {
  title: 'Privacy Policy | IVR Energy',
  description: 'Understand how IVR Energy protects your personal and site information collected for solar feasibility proposals, PM Surya Ghar subsidy processing, and net metering.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyLayout({ children }) {
  return children
}
