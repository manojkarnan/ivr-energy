import Link from 'next/link'
import { ArrowLeft, Home, Sun, Zap, Compass, PhoneCall } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: '404 - Page Not Found | IVR Energy',
  description: 'The requested solar page could not be found. Explore IVR Energy solar rooftop systems, commercial EPC solutions, and government subsidy guides.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-neutral-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-28 md:py-36">
        <div className="max-w-2xl w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#D71920] mb-6">
            <Zap className="h-3.5 w-3.5" /> 404 — Page Not Found
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-tight">
            Lost in the <span className="text-[#D71920]">Solar Grid?</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg mx-auto">
            The page you are looking for might have been moved, removed, or is temporarily unavailable. Let's get you back on track to clean energy.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white px-8 h-12 font-semibold shadow-glow-red">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 font-semibold border-neutral-300 hover:bg-neutral-50">
              <Link href="/services">
                <Sun className="mr-2 h-4 w-4" /> Solar Services
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 font-semibold border-neutral-300 hover:bg-neutral-50">
              <Link href="/projects">
                <Compass className="mr-2 h-4 w-4" /> Completed Projects
              </Link>
            </Button>
          </div>

          {/* Quick Contact Link */}
          <div className="mt-12 pt-8 border-t border-neutral-100 text-sm text-neutral-500">
            Need immediate assistance?{' '}
            <Link href="/contact" className="text-[#D71920] font-semibold hover:underline inline-flex items-center gap-1">
              <PhoneCall className="h-3.5 w-3.5" /> Contact Our Solar Engineers
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
