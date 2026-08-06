'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Youtube, MessageCircle, ArrowUpRight } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Calculator', href: '/#calculator' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/#contact' },
]

const SERVICES_LIST = [
  'Residential Rooftop Solar',
  'Commercial Solar Rooftop',
  'Industrial Captive Solar',
  'Ground Mounted Solar Farms',
  'Solar Consultancy & DPR',
  'DISCOM & Net Metering',
  'Solar O&M Services',
]

const SECTORS = [
  'Homes & Residential Villas',
  'IT Parks & Commercial Buildings',
  'Textile & Manufacturing Plants',
  'Hospitals & Educational Campuses',
  'Government & Public Sector',
]

export default function Footer({ content }) {
  const router = useRouter()
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
    '3th floor, Door No - 1, Plot No - A, Manasarovar Nagar, Gerugambakkam, Chennai - 600122.'

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
            </ul>
          </div>

          {/* Col 2: Solar EPC Solutions */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide mb-4">Solar EPC Solutions</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {SERVICES_LIST.map((item) => (
                <li key={item} className="hover:text-neutral-200 transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sectors Served */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide mb-4">Sectors Served</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {SECTORS.map((sector) => (
                <li key={sector} className="hover:text-neutral-200 transition-colors">
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Sales & Support Enquiries & Our Office */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide mb-2">Sales & Support Enquiries</h3>
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

            <h3 className="text-base font-bold text-white tracking-wide mt-6 mb-2">Our Office</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {address}
            </p>
          </div>

          {/* Col 5: Connect */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide mb-4">Connect</h3>
            <div className="flex flex-wrap items-center gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 transition-all hover:scale-105"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#0A66C2] transition-all hover:scale-105"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              <a
                href={`https://wa.me/${phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-emerald-600 transition-all hover:scale-105"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] transition-all hover:scale-105"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0000] transition-all hover:scale-105"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
            {gstNumber && (
              <div className="mt-6 text-xs text-neutral-400">
                GST: <span className="text-neutral-300 font-mono font-medium">{gstNumber}</span>
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
