'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Youtube, MessageCircle, ArrowUpRight } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

const SOLAR_CAPACITIES = [
  { label: '3 kW Solar System', href: '/services/3kw-solar-system' },
  { label: '4 kW Solar System', href: '/services/4kw-solar-system' },
  { label: '5 kW Solar System', href: '/services/5kw-solar-system' },
  { label: '10 kW+ Solar System', href: '/services/10kw-solar-system' },
  { label: 'Solar Savings Calculator', href: '/#calculator' },
]

const SERVICES_LIST = [
  { label: 'Residential Rooftop Solar', href: '/services' },
  { label: 'Commercial Solar Rooftop', href: '/services' },
  { label: 'Industrial Captive Solar', href: '/services' },
  { label: 'Ground Mounted Solar Farms', href: '/services' },
  { label: 'Solar Consultancy & DPR', href: '/services' },
  { label: 'DISCOM & Net Metering', href: '/services' },
  { label: 'Solar O&M Services', href: '/services' },
]

export default function Footer({ content }) {
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'
  const phoneRaw = content?.contact?.phoneRaw || '919047777936'
  const email = content?.contact?.email || 'ivrenergysolutions@gmail.com'
  const secondaryEmail = content?.contact?.secondaryEmail || 'info@ivrenergy.com'
  const instagram = content?.contact?.instagram || 'https://www.instagram.com/ivrenergy/'
  const linkedin = content?.contact?.linkedin || 'https://www.linkedin.com/company/ivr-energy'
  const facebook = content?.contact?.facebook || ''
  const youtube = content?.contact?.youtube || ''
  const gstNumber = content?.contact?.gstNumber || '33BTTPR9122F1ZB'
  const address =
    content?.contact?.address ||
    '3rd floor, Door No - 1,\nPlot No - A, Manasarovar Nagar,\nGerugambakkam,\nChennai - 600122.'
  const secondaryAddressTitle = content?.contact?.secondaryAddressTitle || ''
  const secondaryAddress = content?.contact?.secondaryAddress || ''
  const secondaryAddressPhone = content?.contact?.secondaryAddressPhone || ''

  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-black font-sans">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-black text-white p-8 sm:p-12 md:p-16 border border-neutral-800 shadow-2xl relative overflow-hidden">
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
          {/* Col 1: Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {isHomePage && (
                <li>
                  <button
                    type="button"
                    onDoubleClick={() => router.push('/adminivr')}
                    className="hover:text-[#D71920] transition-colors text-xs text-neutral-500 cursor-pointer select-none text-left bg-transparent border-0 p-0"
                    title="Double click to open Admin Panel"
                  >
                    Admin Panel
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 2: Solar System Capacities (3kW, 4kW, 5kW, 10kW+) */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide mb-4">Solar Capacities</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {SOLAR_CAPACITIES.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solar EPC Solutions */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide mb-4">Solar EPC Solutions</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {SERVICES_LIST.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Sales & Support Enquiries & Primary Chennai Head Office */}
          <div className="flex flex-col">
            <div className="min-h-[140px]">
              <h3 className="text-base font-bold text-white tracking-wide mb-2">Sales & Support</h3>
              <a href={`mailto:${email}`} className="text-sm text-neutral-300 hover:text-white transition-colors block break-all">
                {email}
              </a>
              {secondaryEmail && (
                <a href={`mailto:${secondaryEmail}`} className="text-sm text-neutral-300 hover:text-white transition-colors block break-all mt-1">
                  {secondaryEmail}
                </a>
              )}
              <a href={`tel:+${phoneRaw}`} className="text-sm text-white font-semibold hover:underline block mt-1.5">
                {phoneDisplay}
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <h3 className="text-base font-bold text-white tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
                {secondaryAddress ? 'Chennai Head Office' : 'Our Office'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-line">
                {address}
              </p>
            </div>
          </div>

          {/* Col 5: Connect & Secondary / Branch Office (Parallel on Right Side) */}
          <div className="flex flex-col">
            <div className="min-h-[140px]">
              <h3 className="text-base font-bold text-white tracking-wide mb-3">Connect</h3>
              <div className="flex flex-wrap items-center gap-2.5">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 transition-all hover:scale-105"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#0A66C2] transition-all hover:scale-105"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={`https://wa.me/${phoneRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/30 transition-all hover:scale-105"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] transition-all hover:scale-105"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {youtube && (
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0000] transition-all hover:scale-105"
                    aria-label="YouTube"
                    title="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
              {gstNumber && (
                <div className="mt-3 text-xs text-neutral-400">
                  GST: <span className="text-neutral-300 font-mono font-medium">{gstNumber}</span>
                </div>
              )}
            </div>

            {/* Secondary / Branch Office (Parallel Right Side Below Connect) */}
            {secondaryAddress && (
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <h3 className="text-base font-bold text-white tracking-wide mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {secondaryAddressTitle || 'Branch Office'}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-line">
                  {secondaryAddress}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Divider & Copyright Meta */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 relative z-10">
          <div>© 2026 — IVR Energy</div>
          <div className="text-neutral-500">Powering India with Clean & Sustainable Solar Energy</div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white cursor-pointer transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Giant Display Brand Logo Typography Watermark */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center relative z-10 overflow-hidden">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/10 to-transparent uppercase select-none leading-none py-2">
            IVR ENERGY
          </h1>
        </div>
      </div>
    </footer>
  )
}
