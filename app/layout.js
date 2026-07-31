import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-neutral-900" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
