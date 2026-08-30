'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

import Link from 'next/link'

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'

import { toast } from 'sonner'

import {

  Sun, Zap, Home, Building2, Factory, ArrowRight, Phone, Mail, MapPin,

  Menu, X, Star, ShieldCheck, Wrench, Cpu, TrendingUp, Award, Users, CheckCircle2,

  BadgeCheck, Sparkles, Calculator, PhoneCall, MessageCircle, MessageSquare, PlayCircle,

  FileText, Handshake, PenTool, ClipboardCheck, HardHat, Gauge, IndianRupee,

  Send, ArrowUpRight, Search, Filter, PanelsTopLeft, LineChart, MoveRight, ChevronLeft, ChevronRight, ChevronDown, Check,

  ArrowUp, Quote, Clock,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'
import { companyStats, companyNAP } from '@/data/companyStats'
import { COMBINED_FAQS } from '@/data/faqs'

const Case = dynamic(() => import('@/components/ui/cases-with-infinite-scroll').then(mod => mod.Case), { ssr: true })

const ICON_MAP = {
  PenTool, HardHat, Home, Building2, Factory, PanelsTopLeft, Handshake, Wrench,
  IndianRupee, ShieldCheck, Award, Users, TrendingUp, Gauge, BadgeCheck, Cpu,
  PhoneCall, Search, FileText, ClipboardCheck, Zap, Sparkles, Star, CheckCircle2, Sun
}

function getIconHelper(icon, fallback = CheckCircle2) {
  if (typeof icon === 'function') return icon
  if (typeof icon === 'string' && ICON_MAP[icon]) return ICON_MAP[icon]
  return fallback
}

const NAV = [

  { label: 'Home', href: '/#home' },

  { label: 'About', href: '/#about' },

  { label: 'Services', href: '/services' },

  { label: 'Solutions', href: '/#solutions' },

  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/#contact' },

]

const STATS = companyStats.statItems

const SERVICES = [

  { icon: PenTool, title: 'Solar Consultancy', desc: 'End-to-end consulting with international partners for feasibility, DPR & funding.' },

  { icon: HardHat, title: 'Solar EPC Services', desc: 'Turnkey Engineering, Procurement •& Construction • — from land to commissioning.' },

  { icon: Home, title: 'Residential Rooftop', desc: 'Slash your EB bill to zero with premium home solar systems.' },

  { icon: Building2, title: 'Commercial Rooftop', desc: 'Cut operating costs for offices, hotels, hospitals & IT parks.' },

  { icon: Factory, title: 'Industrial Solar', desc: 'Captive solar power for textiles, cement, chemical & manufacturing.' },

  { icon: PanelsTopLeft, title: 'Ground Mounted Solar', desc: 'Utility-scale solar farms with grid tie-in and net metering.' },

  { icon: Handshake, title: 'Government Approvals', desc: 'Subsidy applications, TANGEDCO net-metering & policy compliance.' },

  { icon: Wrench, title: 'O&M Services', desc: 'Inverter, transformer & MV switchgear preventive maintenance.' },

  { icon: IndianRupee, title: 'Solar Financing', desc: 'Bank tie-ups, EMI options & PM Surya Ghar subsidy support.' },

]

const INDUSTRIES = {

  Residential: {

    icon: Home,

    image: 'https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?w=1400&q=80',

    items: ['Homes', 'Villas', 'Apartments', 'Farm Houses', 'Duplex Houses', 'Bungalows'],

    tagline: 'Make your home an Independent Power Producer.',

  },

  Commercial: {

    icon: Building2,

    image: 'https://images.unsplash.com/photo-1726776230760-ae81dc9d4e55?w=1400&q=80',

    items: ['Offices', 'Hospitals', 'Schools', 'Colleges', 'Hotels', 'Shopping Complexes', 'IT Parks', 'Showrooms'],

    tagline: 'Reduce OPEX by 60% and boost your sustainability score.',

  },

  Industrial: {

    icon: Factory,

    image: 'https://images.unsplash.com/photo-1642950863398-1fc3600a5313?w=1400&q=80',

    items: ['Textile', 'Steel', 'Cement', 'Chemical', 'Dairy', 'Sugar', 'Pharmaceutical', 'Manufacturing', 'Refineries'],

    tagline: 'Captive solar for 70% self-sustainability at industrial scale.',

  },

}

const WHY_US = [

  { icon: ShieldCheck, title: 'Government Approved', desc: 'Empanelled with nodal agencies & TANGEDCO for subsidy.' },

  { icon: Award, title: 'Tier-1 Panels Only', desc: 'Premium modules with 25-year performance warranty.' },

  { icon: Users, title: 'Experienced EPC Team', desc: 'Solar-only specialists with 12+ years of field expertise.' },

  { icon: TrendingUp, title: 'High ROI', desc: '3 - 4 year payback and 25+ years of free electricity.' },

  { icon: Handshake, title: 'End-to-End Execution', desc: 'From feasibility to O&M  — one accountable partner.' },

  { icon: Gauge, title: 'Performance Guarantee', desc: 'Monitored generation with SLA-backed uptime.' },

  { icon: BadgeCheck, title: 'Subsidy Assistance', desc: 'Up to ₹78,000 under PM Surya Ghar Yojana.' },

  { icon: Cpu, title: 'Smart Monitoring', desc: 'Real-time app-based generation & health tracking.' },

]

const PROCESS = [

  { t: 'Consultation', d: 'Free site visit & requirement analysis.', i: PhoneCall },

  { t: 'Site Survey', d: 'Shadow analysis, structural review & metering plan.', i: Search },

  { t: 'Proposal', d: 'Custom techno-commercial proposal with ROI.', i: FileText },

  { t: 'Engineering •Design', d: 'Detailed engineering, single-line & layout drawings.', i: PenTool },

  { t: 'Government Approval', d: 'DISCOM & subsidy paperwork handled by our team.', i: ClipboardCheck },

  { t: 'Installation', d: 'Certified installers with premium mounting structures.', i: HardHat },

  { t: 'Net Metering', d: 'Bi-directional meter installation & grid tie-in.', i: Zap },

  { t: 'Commissioning & O&M', d: '24/7 monitoring and annual preventive maintenance.', i: Wrench },

]

const SEED_PROJECTS = [

  { title: '1 MW Industrial Solar Plant', client: 'SVS', location: 'Vandavasi, Tamilnadu', capacity: '', year: 2024, type: 'Industrial', img: '/projects/svs-1mw/1.jpg', gallery: ['/projects/svs-1mw/1.jpg', '/projects/svs-1mw/2.jpg', '/projects/svs-1mw/3.jpg'] },

  { title: '1 MW Solar Rooftop', client: 'TPI', location: 'Avadi, Chennai', capacity: 1000, year: 2021, type: 'Industrial', img: '/projects/tpi-1mw/1.jpeg', gallery: ['/projects/tpi-1mw/1.jpeg', '/projects/tpi-1mw/2.jpeg', '/projects/tpi-1mw/3.jpeg', '/projects/tpi-1mw/4.jpg', '/projects/tpi-1mw/5.jpg'] },

  { title: '500 KW Solar Rooftop', client: 'TPI', location: 'Thiruthani', capacity: 500, year: 2021, type: 'Industrial', img: '/projects/tpi-500kw/1.jpg', gallery: ['/projects/tpi-500kw/1.jpg', '/projects/tpi-500kw/2.jpg', '/projects/tpi-500kw/3.jpg', '/projects/tpi-500kw/4.jpg', '/projects/tpi-500kw/5.jpg'] },

  { title: '330 KW Solar Rooftop', client: 'Muthukumaran Medical College', location: 'Chennai', capacity: 330, year: 2019, type: 'Commercial', img: '/projects/muthukumaran-330kw/1.jpg', gallery: ['/projects/muthukumaran-330kw/1.jpg', '/projects/muthukumaran-330kw/2.png', '/projects/muthukumaran-330kw/3.png', '/projects/muthukumaran-330kw/4.png'] },

  { title: '170 KW Solar Rooftop', client: 'Muthukumaran College', location: 'Mangadu, Chennai', capacity: 170, year: 2019, type: 'Commercial', img: '/projects/muthukumaran-170kw/1.png', gallery: ['/projects/muthukumaran-170kw/1.png', '/projects/muthukumaran-170kw/2.png', '/projects/muthukumaran-170kw/3.png', '/projects/muthukumaran-170kw/4.png'] },

  { title: '100 KW Solar Rooftop', client: 'T&I Projects', location: 'Coimbatore', capacity: 100, year: 2021, type: 'Industrial', img: '/projects/ti-100kw/1.jpg', gallery: ['/projects/ti-100kw/1.jpg', '/projects/ti-100kw/2.jpg', '/projects/ti-100kw/3.jpg', '/projects/ti-100kw/4.jpg', '/projects/ti-100kw/5.jpg'] },

  { title: '82 KW Solar Rooftop', client: 'Thyrocare', location: 'Delhi', capacity: 82, year: 2021, type: 'Commercial', img: '/projects/thyrocare-82kw/1.jpeg', gallery: ['/projects/thyrocare-82kw/1.jpeg', '/projects/thyrocare-82kw/2.jpg', '/projects/thyrocare-82kw/3.jpeg', '/projects/thyrocare-82kw/4.jpeg'] },

  { title: '50 KW Solar Rooftop', client: 'NU-TECH Industrial Parts', location: 'Sriperumbathur', capacity: 50, year: 2021, type: 'Industrial', img: '/projects/nutech-50kw/1.jpeg', gallery: ['/projects/nutech-50kw/1.jpeg', '/projects/nutech-50kw/2.jpeg', '/projects/nutech-50kw/3.jpeg'] },

  { title: '40 KW Solar Rooftop', client: 'NU-TECH Industrial Parts', location: 'Gerugambakkam, Chennai', capacity: 40, year: 2021, type: 'Industrial', img: '/projects/nutech-40kw/1.jpeg', gallery: ['/projects/nutech-40kw/1.jpeg', '/projects/nutech-40kw/2.jpeg', '/projects/nutech-40kw/3.jpeg', '/projects/nutech-40kw/4.jpeg'] },

  { title: '30 KW Bi-Facial Rooftop', client: 'B.M Hospital', location: 'Ambathur', capacity: 30, year: 2021, type: 'Commercial', img: '/projects/bm-hospital-30kw/1.jpeg', gallery: ['/projects/bm-hospital-30kw/1.jpeg', '/projects/bm-hospital-30kw/2.jpeg', '/projects/bm-hospital-30kw/3.jpeg'] },

  { title: '25 KW Solar Rooftop', client: 'Akshaya Builders', location: 'Kovur, Chennai', capacity: 25, year: 2021, type: 'Commercial', img: '/projects/akshaya-25kw/1.jpg', gallery: ['/projects/akshaya-25kw/1.jpg', '/projects/akshaya-25kw/2.jpg', '/projects/akshaya-25kw/3.jpeg', '/projects/akshaya-25kw/4.jpg', '/projects/akshaya-25kw/5.jpg'] },

  { title: '20 KW Solar Rooftop', client: 'Tennis Academy', location: 'Pallavaram', capacity: 20, year: 2021, type: 'Commercial', img: '/projects/tennis-20kw/1.jpeg', gallery: ['/projects/tennis-20kw/1.jpeg', '/projects/tennis-20kw/2.jpeg', '/projects/tennis-20kw/3.jpeg', '/projects/tennis-20kw/4.jpeg'] },

  { title: '10 KW Solar Rooftop', client: 'Jilaba Software', location: 'Chennai', capacity: 10, year: 2021, type: 'Commercial', img: '/projects/jilaba-10kw/1.jpg', gallery: ['/projects/jilaba-10kw/1.jpg', '/projects/jilaba-10kw/2.jpg', '/projects/jilaba-10kw/3.jpg'] },

]

const TESTIMONIALS = [
  { name: "Umesh Unnikrishnan", role: "Homeowner · 5 kW", rating: 5, text: "Great service and support throughout the installation process. I've installed a 5kW solar panel from IVR Energy on the roof of my home. Highly recommend them." },
  { name: "M V Sankaran", role: "10 KW Installation, Chennai", rating: 5, text: "I had the opportunity of using the services of IVR Energy for a 10 KW installation at Chennai. Excellent professional support." },
  { name: "Anbu Guru", role: "10 kW Office, Chennai", rating: 5, text: "Installed 10 kW system in my office. EB Bill has come down drastically — nearly 80% reduction in power consumption." },
  { name: "Rudhra Prasad", role: "5 KV Home Installation", rating: 5, text: "It was pleasant working with IVR Energy. Recently installed 5KV at my residence. Purely efficient and working great." },
  { name: "Cap. Shankar A", role: "Rooftop Owner", rating: 5, text: "Job completed as promised. Very cooperative and professional. Mr. Prakash explained the system in detail and clarified all doubts." },
  { name: "Ramachandran Saamy", role: "Rooftop Owner", rating: 5, text: "Installed rooftop system. Their approach towards the work is really professional." },
]

const FAQS = COMBINED_FAQS

function AnimatedCounter({ to, suffix = '', duration = 2, trigger = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  // Initialize with target value so SSR output & search crawlers immediately receive the actual statistic
  const [n, setN] = useState(to)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted || !inView) return

    const target = Number(to) || 0
    if (target === 0) {
      setN(0)
      return
    }

    setN(0)
    let raf, start

    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      // Cubic ease-out curve for smooth, natural counter deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setN(Math.floor(easeOut * target))

      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setN(target)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [hasMounted, inView, to, duration, trigger])

  return (
    <span ref={ref} className="inline-block tabular-nums" aria-label={`${to}${suffix}`}>
      {n.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

function StatCard({ s, className = '' }) {
  const [trigger, setTrigger] = useState(0)

  return (
    <div
      onMouseEnter={() => setTrigger(prev => prev + 1)}
      className={`bg-white/60 backdrop-blur px-6 py-8 text-center hover:bg-white/90 transition-colors cursor-default ${className}`}
    >
      <div className="text-3xl md:text-4xl font-bold text-neutral-900">
        <AnimatedCounter to={Number(s.value) || 0} suffix={s.suffix || ''} trigger={trigger} />
      </div>
      <div className="mt-2 text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-wider">{s.label}</div>
    </div>
  )
}

function Section({ id, children, className = '' }) {

  return <section id={id} className={`relative pt-8 pb-12 md:pt-10 md:pb-14 lg:pt-12 lg:pb-16 scroll-mt-20 md:scroll-mt-24 ${className}`}>{children}</section>

}

function SectionHeader({ eyebrow, title, sub, center = true }) {

  return (

    <motion.div

      initial={{ opacity: 0, y: 24 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true, margin: '-100px' }}

      transition={{ duration: 0.6 }}

      className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-8 md:mb-10`}

    >

      <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] break-words" >

        {title}

      </h2>

      {sub && <p className="mt-6 text-lg text-neutral-600 leading-relaxed" >{sub}</p>}

    </motion.div>

  )

}

const containerVariants = {

  hidden: { opacity: 0 },

  show: {

    opacity: 1,

    transition: {

      staggerChildren: 0.08,

      delayChildren: 0.15

    }

  }

}

const itemVariants = {

  hidden: { opacity: 0, x: 20 },

  show: {

    opacity: 1,

    x: 0,

    transition: {

      type: 'spring',

      stiffness: 260,

      damping: 22

    }

  }

}

function Nav({ onQuote, content }) {

  const [scrolled, setScrolled] = useState(false)

  const [open, setOpen] = useState(false)

  const [visible, setVisible] = useState(true)

  const [hoveredIndex, setHoveredIndex] = useState(null)

  const [activeSection, setActiveSection] = useState('Home')

  const lastScrollY = useRef(0)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth < 768)

    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  useEffect(() => {

    const onScroll = () => {

      setScrolled(window.scrollY > 40)

    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)

  }, [])

  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'

  const phoneRaw = content?.contact?.phoneRaw || '919047777936'

  useEffect(() => {

    if (typeof window === 'undefined') return

    const hash = window.location.hash

    if (hash) {

      const targetId = hash.substring(1)

      const label = targetId === 'home' ? 'Home' : targetId.charAt(0).toUpperCase() + targetId.slice(1)

      setActiveSection(label)

    } else {

      if (window.location.pathname === '/') {

        setActiveSection('Home')

      }

    }

  }, [])

  const handleScroll = (e, href) => {

    if (!href.includes('#')) {

      setOpen(false)

      return

    }

    // Check if we are on the homepage. If so, smooth scroll locally.

    if (window.location.pathname === '/') {

      e.preventDefault()

      setOpen(false)

      const targetId = href.substring(href.indexOf('#') + 1)

      const elem = document.getElementById(targetId)

      if (elem) {

        elem.scrollIntoView({ behavior: 'smooth', block: 'start' })

        window.history.pushState(null, '', href)

        const label = targetId === 'home' ? 'Home' : targetId.charAt(0).toUpperCase() + targetId.slice(1)

        setActiveSection(label)

      }

    } else {

      setOpen(false)

    }

  }

  return (

    <>

      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${visible || open ? 'translate-y-0' : '-translate-y-full'} py-3 px-4 sm:px-6 md:px-8 pointer-events-none`}>

        <div className={`mx-auto max-w-7xl rounded-xl border transition-all duration-500 flex items-center justify-between h-14 md:h-16 px-6 md:px-8 pointer-events-auto ${scrolled

          ? 'bg-white/90 backdrop-blur-3xl border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.12),_inset_0_2px_4px_rgba(255,255,255,0.5)]'

          : 'bg-white/85 backdrop-blur-3xl border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.08),_inset_0_2px_4px_rgba(255,255,255,0.4)]'

          }`}>

          <Link href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center group relative" >

            <img

              src="/ivr-logo.webp"

              alt="IVR Energy"

              width={170}

              height={48}

              fetchPriority="high"

              decoding="async"

              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"

            />

          </Link>

          <nav

            className="hidden lg:flex items-center gap-1 relative"

            onMouseLeave={() => setHoveredIndex(null)}

          >

            {NAV.map((n, idx) => {

              const isActive = activeSection === n.label

              const isHovered = hoveredIndex === idx

              const isHighlighted = isHovered || (isActive && hoveredIndex === null)

              return (

                <Link

                  key={n.label}

                  href={n.href}

                  onClick={(e) => handleScroll(e, n.href)}

                  onMouseEnter={() => setHoveredIndex(idx)}

                  className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full duration-300 ${isHighlighted ? 'text-[#D71920]' : 'text-neutral-700 hover:text-[#D71920]'}`}

                >

                  <span className="relative z-10" >{n.label}</span>

                  {isHighlighted && (

                    <motion.div

                      layoutId="hoverBg"

                      className="absolute inset-0 bg-[#D71920]/10 border border-[#D71920]/25 backdrop-blur-md rounded-full -z-10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.35),_0_6px_15px_-4px_rgba(215,25,32,0.15)]"

                      initial={{ opacity: 0, scale: 0.95 }}

                      animate={{ opacity: 1, scale: 1 }}

                      exit={{ opacity: 0, scale: 0.95 }}

                      transition={{ type: 'spring', stiffness: 320, damping: 26 }}

                    />

                  )}

                </Link>

              )

            })}

          </nav>

          <div className="hidden lg:flex items-center gap-3" >

            <a href={`tel:+${phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#D71920] transition-colors" >

              <Phone className="h-4 w-4" /> {phoneDisplay}

            </a>

            <Button onClick={onQuote} className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-5 h-10 text-sm font-bold shadow-glow-red animate-pulse-glow" >

              Get Free Quote <ArrowRight className="ml-1.5 h-4 w-4" />

            </Button>

          </div>

          <button className="lg:hidden p-2 rounded-lg hover:bg-neutral-100" onClick={() => setOpen(!open)}>

            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}

          </button>

        </div>

      </header>

      <AnimatePresence>

        {open && (

          <>

            {/* Backdrop  — semi-transparent, tap to close */}

            <motion.div

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              exit={{ opacity: 0 }}

              transition={{ duration: 0.2 }}

              onClick={() => setOpen(false)}

              className="fixed inset-0 z-[99] lg:hidden bg-black/30 backdrop-blur-sm"

            />

            {/* Floating dropdown card */}

            <motion.div

              initial={{ opacity: 0, y: -20, scale: 0.95 }}

              animate={{ opacity: 1, y: 0, scale: 1 }}

              exit={{ opacity: 0, y: -20, scale: 0.95 }}

              transition={{ type: 'spring', damping: 25, stiffness: 300 }}

              className="fixed top-3 left-3 right-3 z-[100] lg:hidden bg-white/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"

            >

              {/* Header  — logo + close */}

              <div className="flex items-center justify-between px-5 pt-4 pb-2" >

                <img src="/ivr-logo.webp" alt="IVR Energy" className="h-9 w-auto object-contain" />

                <motion.button

                  onClick={() => setOpen(false)}

                  whileTap={{ scale: 0.9 }}

                  className="h-9 w-9 rounded-full bg-black/8 flex items-center justify-center text-neutral-600 hover:bg-black/12 transition-colors"

                >

                  <X className="h-4.5 w-4.5" />

                </motion.button>

              </div>

              {/* Navigation Links */}

              <motion.nav

                variants={containerVariants}

                initial="hidden"

                animate="show"

                className="px-5 py-2"

              >

                {NAV.map((n) => {

                  const isActive = activeSection === n.label

                  return (

                    <motion.div key={n.label} variants={itemVariants}>

                      <Link

                        href={n.href}

                        onClick={(e) => handleScroll(e, n.href)}

                        className={`block py-2.5 text-[17px] font-semibold tracking-tight transition-colors duration-200 border-b border-neutral-200/50 last:border-0 ${isActive ? 'text-[#D71920]' : 'text-neutral-700 hover:text-neutral-900'}`}

                      >

                        {n.label}

                      </Link>

                    </motion.div>

                  )

                })}

              </motion.nav>

              {/* Bottom CTA */}

              <div className="px-5 pb-4 pt-2 flex flex-col gap-2.5" >

                <a href={`tel:+${phoneRaw}`} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 transition-colors text-sm" >

                  <Phone className="h-3.5 w-3.5" /> {phoneDisplay}

                </a>

                <Button

                  onClick={() => {

                    setOpen(false)

                    onQuote()

                  }}

                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white rounded-full py-5 text-sm font-bold uppercase tracking-wider"

                >

                  Get Free Quote

                </Button>

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>

    </>

  )

}

function Hero({ onQuote, content }) {

  const { scrollY } = useScroll()

  const y = 0

  const opacity = useTransform(scrollY, [0, 500], [1, 0.4])

  const [isMobile, setIsMobile] = useState(false)

  const heroBadge = content?.heroBadge || 'Government Approved Solar EPC Company'

  const headlineHtml = content?.heroHeadline || 'Powering India with <span class="text-gradient-red" >Clean, Smart</span> & <span class="text-gradient-red">Sustainable</span> Solar Energy'

  const subheadline = content?.heroSubheadline || 'Engineering • Procurement • Construction • Solar Consultancy • Turnkey EPC Solutions across Residential, Commercial & Industrial sectors.'

  const ctaPrimary = content?.heroCtaPrimary || 'Get Free Consultation'

  const ctaSecondary = content?.heroCtaSecondary || 'View Projects'

  const badges = (content?.heroTrustBadges && content.heroTrustBadges.length) ? content.heroTrustBadges : [

    { icon: 'shield', text: 'Tier-1 Panels' },

    { icon: 'badge', text: '25-Year Warranty' },

    { icon: 'rupee', text: 'PM Surya Ghar Subsidy' },

    { icon: 'star', text: '4.9/5 Google Rating' },

  ]

  const iconMap = { shield: ShieldCheck, badge: BadgeCheck, rupee: IndianRupee, star: Star, check: CheckCircle2, sun: Sun, sparkle: Sparkles, award: Award }

  const stats = (content?.stats && content.stats.length) ? content.stats : STATS

  const scrollToSection = (e, id) => {

    e.preventDefault()

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    window.history.pushState(null, '', `#${id}`)

  }

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth < 768)

    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  return (

    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden" >

      <motion.div style={{ y: isMobile ? 0 : y }} className="absolute inset-0 z-0">

        <img
          src={content?.heroImage || "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=2400&q=85"}
          alt="Solar panels at sunset"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

      </motion.div>

      <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-red-200/40 to-orange-200/30 blur-3xl ${isMobile ? '' : 'animate-float'}`} />

      <div className={`absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-red-100/40 to-yellow-100/30 blur-3xl ${isMobile ? '' : 'animate-float'}`} style={{ animationDelay: '2s' }} />

      <motion.div className="container mx-auto px-6 relative z-10 pt-24 sm:pt-28 md:pt-32" >

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl" >

          <div className="inline-flex items-center gap-2 rounded-full border border-red-200/60 bg-white/70 backdrop-blur px-4 py-2 text-xs font-semibold text-[#D71920] shadow-soft" >

            <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />

            {heroBadge}

          </div>

          <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-neutral-900 leading-[1.05] break-words" dangerouslySetInnerHTML={{ __html: headlineHtml }} />

          <p className="mt-8 text-lg md:text-xl text-neutral-700 max-w-2xl leading-relaxed" >{subheadline}</p>

          <div className="mt-10 flex flex-wrap gap-4" >

            <Button size="lg" onClick={onQuote} className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-8 h-14 text-base font-semibold shadow-glow-red group" >

              {ctaPrimary} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />

            </Button>

            <Button size="lg" variant="outline" asChild className="rounded-full px-8 h-14 text-base font-semibold border-neutral-300 bg-white/70 backdrop-blur hover:bg-white" >

              <Link href="/projects"><PlayCircle className="mr-2 h-5 w-5" /> {ctaSecondary}</Link>

            </Button>

          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-neutral-600" >

            {badges.map((b, i) => {

              const I = iconMap[b.icon] || CheckCircle2

              return <div key={i} className="flex items-center gap-2" ><I className={`h-5 w-5 text-[#D71920] ${b.icon === 'star' ? 'fill-[#D71920]' : ''}`} /> {b.text}</div>

            })}

          </div>

        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-16 lg:mt-24" >

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200/70 rounded-3xl overflow-hidden glass shadow-soft" >

            {stats.map((s, i) => (
              <StatCard key={i} s={s} />
            ))}

          </div>

        </motion.div>

      </motion.div>

    </section>

  )

}

const ABOUT_CARDS = [

  {

    t: 'Government Approved.',

    d: 'Empanelled with DISCOM & nodal agencies for subsidy clearance.',

    icon: ShieldCheck

  },

  {

    t: 'Experienced Team.',

    d: 'Solar-only specialists with 12+ years of field engineering expertise.',

    icon: Award

  },

  {

    t: 'Financial Support.',

    d: 'Bank tie-ups & subsidy assistance under PM Surya Ghar Yojana.',

    icon: IndianRupee

  },

  {

    t: 'Turnkey Delivery.',

    d: 'From site shadow analysis to net-metering & 24/7 O&M support.',

    icon: Wrench

  },

]

function StackingAboutCard({ card, i, total, scrollYProgress }) {

  const animEnd = 1.0

  const numSteps = total - 1

  const step = animEnd / numSteps

  const start = i === 0 ? 0 : (i - 1) * step

  const end = i === 0 ? 0.01 : i * step

  const y = 0

  const opacity = useTransform(scrollYProgress, (p) => {

    if (i === 0) return 1

    if (p < start - 0.03) return 0

    if (p <= end) {

      return Math.min(1, Math.max(0, (p - (start - 0.03)) / (step + 0.03)))

    }

    return 1

  })

  const IconComponent = card.icon

  return (

    <motion.div

      style={{

        y,

        opacity,

        zIndex: i + 1,

      }}

      className="absolute inset-0 bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center justify-between min-h-[140px] overflow-hidden"

    >

      <div className="pr-3 max-w-[70%]" >

        <h3 className="text-lg font-bold text-neutral-900 tracking-tight leading-snug" >

          {card.t}

        </h3>

        <p className="mt-1 text-xs text-neutral-500 leading-relaxed font-normal" >

          {card.d}

        </p>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#D71920] flex items-center justify-center border border-red-100 flex-shrink-0" >

        <IconComponent className="h-7 w-7 text-[#D71920]" />

      </div>

    </motion.div>

  )

}

function AboutMobileStackedCards() {

  return null

}

function About({ content }) {

  const aboutImage = content?.aboutImage || 'https://images.unsplash.com/photo-1668097613572-40b7c11c8727?w=1200&q=80'

  const [isMobile, setIsMobile] = useState(false)

  const [mounted, setMounted] = useState(false)

  const parallaxRef = useRef(null)

  const { scrollYProgress } = useScroll({

    target: parallaxRef,

    offset: ['start end', 'end start']

  })

  const springConfig = { stiffness: 70, damping: 24, restDelta: 0.001 }

  const rawImgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const imgY = useSpring(rawImgY, springConfig)

  const rawImgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08])
  const imgScale = useSpring(rawImgScale, springConfig)

  const rawBadgeY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-25, 25])
  const badgeY = useSpring(rawBadgeY, springConfig)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const rawCardY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-30, 30])
  const smoothCardY = useSpring(rawCardY, springConfig)

  const aboutCardY = [smoothCardY, smoothCardY, smoothCardY, smoothCardY]

  return (
    <Section id="about" className="bg-[#ffffff]">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative" ref={parallaxRef}>
          <div className="relative rounded-3xl overflow-hidden shadow-soft aspect-[4/5]">
            <motion.img
              src={aboutImage}
              alt="Solar EPC engineer"
              className="w-full h-full object-cover transform-gpu [will-change:transform]"
              style={{ y: imgY, scale: imgScale }}
            />
          </div>

          <motion.div
            style={{ y: badgeY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -bottom-8 -right-8 md:-right-12 bg-[#ffffff] rounded-[28px] p-6 border border-neutral-200/80 shadow-[0_12px_35px_rgba(0,0,0,0.08)] flex items-center justify-between gap-6 min-w-[260px] transform-gpu [will-change:transform]"
          >

            <div>

              <h3 className="text-2xl font-bold text-neutral-900 tracking-tight" >

                {content?.aboutExperienceVal || '12+ Years'}

              </h3>

              <p className="mt-1 text-sm text-neutral-500 font-normal leading-relaxed" >

                {content?.aboutExperienceLabel || 'Solar Expertise'}

              </p>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-white shadow-soft border border-neutral-100 flex items-center justify-center text-[#D71920] flex-shrink-0" >

              <Award className="h-7 w-7 text-[#D71920]" />

            </div>

          </motion.div>

          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#D71920] to-orange-400 blur-2xl opacity-40" />

        </motion.div>

        <div>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]" dangerouslySetInnerHTML={{ __html: content?.aboutTitle || 'A single-vertical solar company built on <span class="text-gradient-red" >expertise & trust</span>.' }} />

          <p className="mt-6 text-lg text-neutral-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content?.aboutDescription || 'IVR Energy is promoted by experienced professionals with wide knowledge of the solar industry  — supported by financial partners and government nodal agencies. We focus on <strong>only solar power generation</strong>, diversified across Residential Rooftop, Commercial Rooftop, Industrial Rooftop and Ground-Mounted solar farms.' }} />

          {/* 2x2 Feature Grid with Scroll Motion */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4" >
            {(content?.aboutCards || ABOUT_CARDS).map((x, i) => {
              const IconComponent = getIconHelper(x.icon, ShieldCheck)
              return (
                <motion.div
                  key={x.t}
                  style={{ y: aboutCardY[i % aboutCardY.length] }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#ffffff] rounded-[28px] p-5 sm:p-6 border border-neutral-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)] flex items-start justify-between hover:bg-[#ffffff] transition-colors duration-200 cursor-pointer gpu-accelerate"
                >
                  <div className="pr-4" >
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight" >{x.t}</h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed" >{x.d}</p>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-soft border border-neutral-100 flex items-center justify-center text-[#D71920] flex-shrink-0" >
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-[#D71920]" />
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-8 sm:mt-10 grid sm:grid-cols-2 gap-6" >
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1" >Our Mission</div>
              <div className="font-semibold text-neutral-900" >{content?.aboutMission || 'Make every home & business a self-sustaining power producer.'}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1" >Our Vision</div>
              <div className="font-semibold text-neutral-900" >{content?.aboutVision || "Accelerate India's transition to 100% clean energy."}</div>
            </div>
          </div>
        </div>

      </div>

    </Section>

  )

}

function Services({ content }) {
  const eyebrow = content?.servicesEyebrow || 'What we do'
  const titleHtml = content?.servicesTitle || 'Complete <span class="text-gradient-red" >turnkey solar</span> services'
  const subtitle = content?.servicesSubtitle || 'From consultancy to commissioning — one accountable partner for every step of your solar journey.'
  const servicesList = content?.servicesList || SERVICES

  return (
    <Section id="services" className="bg-[#ffffff] !pb-0">
      <div className="container mx-auto px-6" >
        <SectionHeader eyebrow={eyebrow} title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />} sub={subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" >
          {servicesList.map((s, i) => {
            const Icon = getIconHelper(s.icon, PenTool)
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative bg-[#ffffff] rounded-[28px] p-8 border border-white/80 hover:border-red-200/80 hover:shadow-md hover:bg-[#ebebee] transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4" >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-soft border border-neutral-100 flex items-center justify-center text-[#D71920] group-hover:scale-110 transition-transform flex-shrink-0" >
                    <Icon className="h-7 w-7 text-[#D71920]" />
                  </div>
                </div>
                <div>
                  <h3 className="mt-6 text-xl font-bold text-neutral-900 tracking-tight" >{s.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

const AUTO_PLAY_DURATION = 4000;

function BentoSolutionsWhyUs({ content }) {
  const keys = Object.keys(INDUSTRIES)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const solutionsRef = useRef(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % keys.length)
  }, [keys.length])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + keys.length) % keys.length)
  }, [keys.length])

  const handleTabClick = (index) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setIsPaused(true)
  }

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      handleNext()
    }, AUTO_PLAY_DURATION)
    return () => clearInterval(interval)
  }, [activeIndex, isPaused, handleNext])

  const activeTabKey = keys[activeIndex]
  const base = INDUSTRIES[activeTabKey]
  const overrideKey = activeTabKey.toLowerCase() + 'Image'
  const cur = { ...base, image: content?.[overrideKey] || base.image }
  const Icon = cur.icon

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
    }),
  }

  const springConfig = { stiffness: 70, damping: 24, restDelta: 0.001 }
  const rawCardY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-20, 20])
  const smoothCardY = useSpring(rawCardY, springConfig)
  const cardYMap = [smoothCardY, smoothCardY, smoothCardY, smoothCardY, smoothCardY, smoothCardY, smoothCardY, smoothCardY]

  const whyUsTitleHtml = content?.whyUsTitle || 'Built for <span class="text-gradient-red">performance</span>, engineered for <span class="text-gradient-red">longevity</span>'
  const whyUsList = content?.whyUsList || WHY_US

  return (
    <section id="solutions" ref={sectionRef} className="py-6 sm:py-10 md:py-14 bg-[#ffffff] scroll-mt-20">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-neutral-950 text-white rounded-[2.5rem] md:rounded-[3.2rem] p-6 sm:p-10 md:p-12 lg:p-16 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D71920]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

          {/* PART 1: Solutions */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Solutions vertical tabs */}
              <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
                <div className="space-y-1 mb-8">
                  <span className="text-[10px] font-semibold text-[#D71920] uppercase tracking-[0.3em] block ml-0.5">
                    (SOLUTIONS)
                  </span>
                  <h2 className="tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight break-words">
                    {content?.solutionsTitle || 'Tailored solar for every building type'}
                  </h2>
                </div>

                <div className="flex flex-col space-y-0 relative">
                  {keys.map((tabKey, index) => {
                    const isActive = activeIndex === index
                    const tabData = INDUSTRIES[tabKey]
                    const items = content?.solutionsItems?.[tabKey] || tabData.items

                    return (
                      <button
                        key={tabKey}
                        onClick={() => handleTabClick(index)}
                        className={`group relative flex items-start gap-4 py-5 md:py-6 text-left transition-all duration-300 border-t border-white/10 first:border-0 cursor-pointer ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                      >
                        {/* Smooth Sliding Red Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[3px] bg-[#D71920] rounded-full shadow-[0_0_12px_#D71920]"
                            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                          />
                        )}

                        <div className="flex flex-col gap-1 flex-1">
                          <motion.span
                            animate={{
                              color: isActive ? '#ffffff' : '#737373',
                              x: isActive ? 6 : 0,
                            }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight block"
                          >
                            {tabKey} Solar
                          </motion.span>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="flex flex-wrap gap-1.5 pt-3 pb-1 max-w-sm">
                                  {items.map((item, itemIdx) => (
                                    <motion.span
                                      key={item}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.2, delay: itemIdx * 0.03 }}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 hover:border-red-500/40 transition-colors"
                                    >
                                      <CheckCircle2 className="h-3 w-3 text-[#D71920]" /> {item}
                                    </motion.span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Interactive Image Slider */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div
                  className="relative group/gallery"
                >
                  <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/11] rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10" ref={solutionsRef}>
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-0 w-full h-full cursor-pointer"
                        onClick={handleNext}
                      >
                        <img
                          src={cur.image}
                          alt={activeTabKey}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePrev()
                        }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors border border-white/10 cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNext()
                        }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors border border-white/10 cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO DIVIDER */}
          <div className="my-12 md:my-16 border-t border-white/10 relative z-10" />

          {/* PART 2: Why Choose Us (Built for performance) */}
          <div id="why-us" className="relative z-10">
            <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] break-words text-center" dangerouslySetInnerHTML={{ __html: whyUsTitleHtml }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {whyUsList.map((w, i) => {
                const Icon = getIconHelper(w.icon, ShieldCheck)
                return (
                  <motion.div
                    key={w.title}
                    style={{ y: cardYMap[i % cardYMap.length] }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-neutral-900/90 rounded-2xl p-6 border border-white/15 hover:border-red-500/50 transition-colors duration-200 flex flex-col justify-between group hover:bg-neutral-900/95 cursor-pointer transform-gpu [backface-visibility:hidden] [will-change:transform]"
                  >
                    <div>
                      <div className="mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-soft border border-white/20 group-hover:scale-105 transition-transform">
                          <Icon className="h-6 w-6 text-[#D71920]" />
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-white group-hover:text-red-100 transition-colors">{w.title}</h4>
                      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{w.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Process({ content }) {
  const eyebrow = content?.processEyebrow || 'Our Process'
  const titleHtml = content?.processTitle || 'Your solar journey in <span class="text-gradient-red" >8 seamless steps</span>'
  const subtitle = content?.processSubtitle || `A refined, transparent execution playbook honed across ${companyStats.projects} projects.`
  const steps = content?.processSteps || PROCESS

  return (
    <Section className="bg-[#ffffff]" >
      <div className="container mx-auto px-6" >
        <SectionHeader eyebrow={eyebrow} title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />} sub={subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" >
          {steps.map((p, i) => {
            const Icon = getIconHelper(p.icon || p.i, PhoneCall)
            return (
              <motion.div key={p.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: (i % 4) * 0.08 }} className="relative rounded-3xl bg-white p-6 border border-neutral-100 hover:border-red-200 hover:shadow-soft transition-all gpu-accelerate" >
                <div className="absolute -top-4 -left-3 text-6xl font-bold text-red-50 select-none pointer-events-none" >{String(i + 1).padStart(2, '0')}</div>
                <div className="relative" >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D71920] to-[#ff5a4e] flex items-center justify-center shadow-glow-red" ><Icon className="h-6 w-6 text-white" /></div>
                  <div className="mt-4 text-lg font-bold text-neutral-900" >{p.t}</div>
                  <div className="mt-1 text-sm text-neutral-600" >{p.d}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function Projects({ content }) {

  const [projects, setProjects] = useState(SEED_PROJECTS)

  const [filter, setFilter] = useState('All')

  const [showAll, setShowAll] = useState(false)

  const [lightbox, setLightbox] = useState(null)

  const types = ['All', 'Industrial', 'Commercial']

  useEffect(() => {

    fetch('/api/projects').then(r => r.json()).then(j => {

      if (Array.isArray(j.projects) && j.projects.length) setProjects(j.projects)

    }).catch(() => { })

  }, [])

  const filtered = projects.filter(p => filter === 'All' || p.type === filter)

  const list = filtered.slice(0, 3)

  const eyebrow = content?.projectsEyebrow || 'Featured EPC Projects'

  const titleHtml = content?.projectsTitle || 'From <span class="text-gradient-red" >1 KW</span> rooftops to <span class="text-gradient-red" >10 MW</span> plants'

  const subtitle = content?.projectsSubtitle || 'A portfolio built across Chennai, Coimbatore, Delhi and beyond  — spanning industries, campuses and homes.'

  const openGallery = (p) => { if (p.gallery && p.gallery.length) setLightbox({ project: p, index: 0 }) }

  const nextImg = () => setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.project.gallery.length } : null)

  const prevImg = () => setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.project.gallery.length) % lb.project.gallery.length } : null)

  useEffect(() => {

    if (!lightbox) return

    const onKey = (e) => {

      if (e.key === 'Escape') setLightbox(null)

      if (e.key === 'ArrowRight') nextImg()

      if (e.key === 'ArrowLeft') prevImg()

    }

    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)

    // eslint-disable-next-line

  }, [lightbox])

  return (

    <Section id="projects" className="bg-[#ffffff]" >

      <div className="container mx-auto px-6" >

        <SectionHeader eyebrow={eyebrow} title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />} sub={subtitle} />

        <div className="flex justify-center mb-10" >

          <div className="inline-flex rounded-full bg-white border border-neutral-200 p-1.5 shadow-sm" >

            {types.map(t => (

              <button key={t} onClick={() => { setFilter(t); setShowAll(false) }} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === t ? 'bg-[#D71920] text-white' : 'text-neutral-700 hover:text-neutral-900'}`}>

                <Filter className="inline h-3.5 w-3.5 mr-1.5 opacity-70" /> {t}

              </button>

            ))}

          </div>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" >

          {list.map((p, i) => (

            <Link key={p.title + p.location} href={`/projects/${p.id}`} className="block group" >

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="relative overflow-hidden rounded-3xl bg-white shadow-soft border border-neutral-100 cursor-pointer gpu-accelerate" >

                <div className="relative aspect-[4/3] overflow-hidden" >

                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

                  <div className="absolute top-4 left-4 flex gap-2" >

                    <span className="rounded-full bg-[#D71920] text-white text-xs font-semibold px-3 py-1" >{p.type}</span>

                  </div>

                  {p.gallery && (

                    <div className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1 flex items-center gap-1.5" >

                      <PlayCircle className="h-3.5 w-3.5" /> {p.gallery.length} photos

                    </div>

                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white" >

                    <div className="text-2xl font-bold" >{p.capacity}</div>

                  </div>

                </div>

                <div className="p-6" >

                  <div className="font-bold text-lg text-neutral-900 leading-tight" >{p.title}</div>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500" ><Users className="h-4 w-4" /> {p.client}</div>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500" ><MapPin className="h-4 w-4" /> {p.location}</div>

                  {p.gallery && (

                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D71920] group-hover:gap-3 transition-all" >

                      View details <ArrowRight className="h-4 w-4" />

                    </div>

                  )}

                </div>

              </motion.div>

            </Link>

          ))}

        </div>

        <div className="mt-12 flex justify-center" >

          <Button

            asChild

            variant="outline"

            className="rounded-full h-12 px-8 border-neutral-300 hover:bg-[#D71920] hover:text-white hover:border-[#D71920] transition-all font-semibold"

          >

            <Link href="/projects" >

              View all {projects.length} projects <ArrowRight className="ml-2 h-4 w-4" />

            </Link>

          </Button>

        </div>

      </div>

      <AnimatePresence>

        {lightbox && (

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8" onClick={() => setLightbox(null)}>

            <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors" aria-label="Close" >

              <X className="h-5 w-5" />

            </button>

            <div className="absolute top-5 left-5 z-10 text-white" >

              <div className="text-sm uppercase tracking-wider opacity-70" >{lightbox.project.client}  — {lightbox.project.location}</div>

              <div className="text-lg font-bold" >{lightbox.project.title}</div>

            </div>

            <button onClick={(e) => { e.stopPropagation(); prevImg() }} className="absolute left-3 md:left-6 z-10 w-13 h-13 rounded-full bg-neutral-800/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-neutral-700/90 transition-all shadow-lg active:scale-90" aria-label="Previous" >

              <ChevronLeft className="h-6 w-6" />

            </button>

            <button onClick={(e) => { e.stopPropagation(); nextImg() }} className="absolute right-3 md:right-6 z-10 w-13 h-13 rounded-full bg-neutral-800/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-neutral-700/90 transition-all shadow-lg active:scale-90" aria-label="Next" >

              <ChevronRight className="h-6 w-6" />

            </button>

            <motion.img key={lightbox.index} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} src={lightbox.project.gallery[lightbox.index]} alt="" className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()} />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2" >

              {lightbox.project.gallery.map((_, i) => (

                <button key={i} onClick={(e) => { e.stopPropagation(); setLightbox(lb => ({ ...lb, index: i })) }} className={`w-2 h-2 rounded-full transition-all ${i === lightbox.index ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'}`} aria-label={`Photo ${i + 1}`} />

              ))}

            </div>

            <div className="absolute bottom-6 right-6 text-white/70 text-sm" >{lightbox.index + 1} / {lightbox.project.gallery.length}</div>

          </motion.div>

        )}

      </AnimatePresence>

    </Section>

  )

}

function Subsidy({ onQuote, content }) {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const springConfig = { stiffness: 70, damping: 24, restDelta: 0.001 }
  const rawCardY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-35, 35])
  const smoothCardY = useSpring(rawCardY, springConfig)
  const cardY = [smoothCardY, smoothCardY, smoothCardY, smoothCardY]

  const rawGlow1Y = useTransform(scrollYProgress, [0, 1], isMobile ? [-20, 20] : [-50, 50])
  const smoothGlow1Y = useSpring(rawGlow1Y, springConfig)
  const rawGlow2Y = useTransform(scrollYProgress, [0, 1], isMobile ? [-20, 20] : [-50, 50])
  const smoothGlow2Y = useSpring(rawGlow2Y, springConfig)

  const eyebrow = content?.subsidyEyebrow || 'Government Scheme'
  const titleHtml = content?.subsidyTitle || 'PM Surya Ghar Yojana — Get up to <span class="text-gradient-red">₹78,000</span> subsidy'
  const desc = content?.subsidyDescription || "India's flagship rooftop solar program pays you to go solar. Our team handles the entire application, DISCOM approval and net-metering paperwork on your behalf."
  const cta = content?.subsidyCta || 'Check Your Eligibility'
  const bullets = content?.subsidyBullets || ['Subsidy up to ₹78,000', 'Free application filing', 'DISCOM & net-meter support', 'Bank financing tie-ups', 'Zero paperwork for you', 'Fast disbursal timeline']
  const cards = content?.subsidyCards || [{ v: '₹30k', l: '1 kW subsidy' }, { v: '₹60k', l: '2 kW subsidy' }, { v: '₹78k', l: '3 kW+ subsidy' }, { v: '90%', l: 'Bill reduction' }]

  return (
    <section ref={sectionRef} className="relative pt-8 pb-12 md:pt-10 md:pb-14 lg:pt-12 lg:pb-16 scroll-mt-20 md:scroll-mt-24 bg-gradient-to-br from-neutral-950 via-[#1a0505] to-neutral-950 text-white overflow-hidden">
      <motion.div style={{ y: smoothGlow1Y }} className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D71920]/40 blur-3xl pointer-events-none" />
      <motion.div style={{ y: smoothGlow2Y }} className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]" dangerouslySetInnerHTML={{ __html: titleHtml }} />
            <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
              {desc}
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {bullets.map(x => (
                <div key={x} className="flex items-center gap-2.5 text-neutral-200">
                  <CheckCircle2 className="h-5 w-5 text-[#D71920] flex-shrink-0" /> {x}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button onClick={onQuote} size="lg" className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-8 h-14 shadow-glow-red">
                {cta} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {cards.map((c, i) => (
              <motion.div
                key={c.l}
                style={{ y: cardY[i % cardY.length] }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 md:p-8 text-center cursor-pointer transform-gpu [backface-visibility:hidden] [will-change:transform] transition-colors duration-200 hover:border-red-500/60 hover:shadow-[0_15px_35px_rgba(215,25,32,0.3)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient-red pr-2 pb-1 inline-block relative z-10">
                  {c.v}
                </div>
                <div className="mt-3 text-xs sm:text-sm uppercase tracking-wider text-neutral-300 font-semibold relative z-10">
                  {c.l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Calc({ content }) {
  const [bill, setBill] = useState(5000)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const calcConfig = content?.calculator || {}
  const tariff = Number(calcConfig.tariff || 8)
  const billPerKw = Number(calcConfig.billPerKw || 2000)
  const costPerKw = Number(calcConfig.costPerKw || 70000)
  const unitsPerKwYear = Number(calcConfig.unitsPerKwYear || 1400)
  const lifespan = Number(calcConfig.lifespan || 25)
  const co2PerKwh = Number(calcConfig.co2PerKwh || 0.82)

  const recommendedKW = Math.max(1, Math.round((bill / billPerKw) * 10) / 10)
  const annualGeneration = recommendedKW * unitsPerKwYear
  const annualSavings = Math.round(annualGeneration * tariff)
  const systemCost = Math.round(recommendedKW * costPerKw)
  const paybackYears = Math.round((systemCost / Math.max(annualSavings, 1)) * 10) / 10
  const lifetimeSavings = Math.round(annualSavings * lifespan - systemCost)
  const co2Reduction = Math.round(annualGeneration * co2PerKwh)
  const sliderPercent = ((bill - 500) / (100000 - 500)) * 100

  const ringRadius = 90
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference - (sliderPercent / 100) * ringCircumference

  return (
    <Section id="calculator" className="bg-[#ffffff]" >
      <div ref={sectionRef} className="container mx-auto px-6" >
        <SectionHeader
          eyebrow="Savings Calculator"
          title={<>See how much you'll <span className="text-gradient-red" >save with solar</span></>}
          sub="Get an instant estimate of your system size, savings and payback period."
        />

        {/* Main Bento Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5" >

          {/* LEFT: Redesigned Bill Input Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-[28px] bg-white border border-neutral-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-red-500/10 via-orange-500/5 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              {/* Box Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D71920]/10 flex items-center justify-center text-[#D71920]">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">Electricity Expense</span>
                    <span className="text-sm font-semibold text-neutral-900">Monthly Bill</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Est. {Math.round(bill / tariff).toLocaleString('en-IN')} Units/mo
                </div>
              </div>

              {/* Main Bill Hero Display */}
              <div className="rounded-2xl bg-[#ffffff] border border-neutral-200/60 p-6 text-center mb-6 relative group">
                <span className="text-xs uppercase font-medium text-neutral-400 tracking-wider">Your Average Bill</span>
                <div className="text-4xl md:text-5xl font-extrabold text-neutral-900 tabular-nums mt-1 tracking-tight">
                  ₹{bill.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 font-medium">
                  Select or drag below to adjust
                </div>
              </div>

              {/* Range Slider — Premium Redesign */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-neutral-600 tracking-wide">Monthly Bill Range</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-100/60">
                    <span className="text-[11px] font-bold text-[#D71920]">₹500</span>
                    <span className="text-neutral-300">—</span>
                    <span className="text-[11px] font-bold text-[#D71920]">₹1,00,000</span>
                  </div>
                </div>

                {/* Slider Track Container */}
                <div className="relative pt-6 pb-1">
                  {/* Floating Value Tooltip */}
                  <div
                    className="absolute -top-0 transition-all duration-150 ease-out pointer-events-none"
                    style={{ left: `calc(${sliderPercent}% - ${sliderPercent * 0.32}px)` }}
                  >
                    <div className="relative bg-neutral-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap">
                      ₹{bill.toLocaleString('en-IN')}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45 rounded-[1px]" />
                    </div>
                  </div>

                  {/* Custom Track */}
                  <div className="relative h-[10px] rounded-full bg-neutral-100 shadow-inner overflow-visible">
                    {/* Filled Portion */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
                      style={{
                        width: `${sliderPercent}%`,
                        background: 'linear-gradient(90deg, #D71920 0%, #e63e30 40%, #f97316 100%)',
                        boxShadow: '0 0 12px rgba(215,25,32,0.3)',
                      }}
                    />
                    {/* Custom Thumb */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transition-all duration-150 pointer-events-none"
                      style={{ left: `calc(${sliderPercent}% - 10px)` }}
                    >
                      <div className="relative">
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-[#D71920]/20 animate-ping" style={{ animationDuration: '2s' }} />
                        {/* Thumb */}
                        <div className="w-5 h-5 rounded-full bg-white border-[3px] border-[#D71920] shadow-[0_2px_8px_rgba(215,25,32,0.35)] relative z-10" />
                      </div>
                    </div>
                  </div>

                  {/* Invisible Range Input */}
                  <input
                    type="range"
                    suppressHydrationWarning
                    min="500"
                    max="100000"
                    step="500"
                    value={bill}
                    onChange={e => setBill(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                </div>

                {/* Tick Marks & Labels */}
                <div className="relative mt-2 h-6">
                  {[
                    { label: '₹500', pos: 0 },
                    { label: '₹25K', pos: 24.6 },
                    { label: '₹50K', pos: 49.7 },
                    { label: '₹75K', pos: 74.9 },
                    { label: '₹1L', pos: 100 },
                  ].map((tick) => (
                    <div
                      key={tick.label}
                      className="absolute flex flex-col items-center -translate-x-1/2"
                      style={{ left: `${tick.pos}%` }}
                    >
                      <div className={`w-[1.5px] h-2 rounded-full mb-0.5 ${sliderPercent >= tick.pos ? 'bg-[#D71920]/50' : 'bg-neutral-300'
                        }`} />
                      <span className={`text-[10px] font-semibold ${sliderPercent >= tick.pos ? 'text-[#D71920]/70' : 'text-neutral-400'
                        }`}>
                        {tick.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Select Preset Buttons */}
              <div>
                <span className="text-xs font-medium text-neutral-400 block mb-2.5 uppercase tracking-wider">Quick Select</span>
                <div className="grid grid-cols-3 gap-2">
                  {[2000, 5000, 10000, 25000, 50000, 100000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setBill(val)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${bill === val
                        ? 'bg-[#D71920] text-white border-[#D71920] shadow-md shadow-red-500/20 scale-[1.02]'
                        : 'bg-[#ffffff] text-neutral-700 border-neutral-200/80 hover:bg-neutral-100 hover:border-neutral-300'
                        }`}
                    >
                      ₹{val >= 100000 ? '1 Lakh' : val >= 1000 ? `${val / 1000}k` : val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Tip Badge */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Based on TANGEDCO / TNEB rates</span>
              <span className="text-[#D71920] font-semibold">Instant Quote</span>
            </div>
          </motion.div>

          {/* RIGHT: Results Bento Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-5" >
            {/* Featured: Recommended System */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="col-span-2 rounded-[24px] bg-gradient-to-br from-[#D71920] to-[#b5141a] text-white p-6 md:p-8 relative overflow-hidden group"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl group-hover:scale-110 transition-transform duration-500" />
              <div className="relative flex items-center justify-between" >
                <div>
                  <div className="text-xs uppercase tracking-wider text-red-200/80 font-medium" >Recommended System</div>
                  <div className="text-5xl md:text-6xl font-bold mt-1 tabular-nums" >{recommendedKW} <span className="text-2xl md:text-3xl font-semibold" >kW</span></div>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center" >
                  <Sun className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
            </motion.div>

            {/* System Cost */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="rounded-[22px] bg-white border border-neutral-200/70 shadow-[0_2px_16px_rgba(0,0,0,0.03)] p-4 sm:p-5 md:p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-neutral-300/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 shrink-0 flex items-center justify-center">
                  <IndianRupee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold truncate">System Cost</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-900 tabular-nums flex items-baseline gap-0.5">
                ₹{(systemCost / 100000).toFixed(2)}
                <span className="text-sm sm:text-base md:text-lg text-neutral-400 font-semibold ml-0.5">L</span>
              </div>
            </motion.div>

            {/* Annual Savings */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="rounded-[22px] bg-emerald-50/50 border border-emerald-200/50 p-4 sm:p-5 md:p-6 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:border-emerald-300/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 shrink-0 flex items-center justify-center">
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-600/90 font-semibold truncate">Annual Savings</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-700 tabular-nums flex items-baseline gap-0.5">
                ₹{annualSavings >= 100000 ? (annualSavings / 100000).toFixed(2) : (annualSavings / 1000).toFixed(1)}
                <span className="text-sm sm:text-base md:text-lg text-emerald-500/80 font-semibold ml-0.5">
                  {annualSavings >= 100000 ? 'L' : 'k'}
                </span>
              </div>
            </motion.div>

            {/* Payback */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="rounded-[22px] bg-white border border-neutral-200/70 shadow-[0_2px_16px_rgba(0,0,0,0.03)] p-4 sm:p-5 md:p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-neutral-300/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-violet-50 shrink-0 flex items-center justify-center">
                  <Gauge className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-600" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold truncate">Payback</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-900 tabular-nums flex items-baseline gap-0.5">
                {paybackYears}
                <span className="text-sm sm:text-base md:text-lg text-neutral-400 font-semibold ml-1">yrs</span>
              </div>
            </motion.div>

            {/* Lifetime Savings */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="rounded-[22px] bg-emerald-50/50 border border-emerald-200/50 p-4 sm:p-5 md:p-6 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:border-emerald-300/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 shrink-0 flex items-center justify-center">
                  <LineChart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-600/90 font-semibold truncate">25-Yr Savings</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-700 tabular-nums flex items-baseline gap-0.5">
                ₹{(lifetimeSavings / 100000).toFixed(2)}
                <span className="text-sm sm:text-base md:text-lg text-emerald-500/80 font-semibold ml-0.5">L</span>
              </div>
            </motion.div>

            {/* CO₂" full width */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="col-span-2 rounded-[22px] bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/50 p-5 md:p-6 flex flex-col items-center justify-center text-center hover:shadow-[0_8px_30px_rgba(14,165,233,0.08)] hover:border-sky-300/60 transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center"><Sparkles className="h-4 w-4 text-sky-600" /></div>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-sky-500/80 font-medium">CO₂ Reduced Per Year</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-sky-700 tabular-nums">{(co2Reduction / 1000).toFixed(2)} <span className="text-lg text-sky-400">Tonnes</span></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10 md:mt-14"
        >
          <a href="#contact" className="inline-flex items-center gap-2.5 rounded-full bg-neutral-900 text-white px-8 py-4 font-semibold text-lg hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]" >
            Get your free quote <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </Section>
  )
}

function Clients({ content }) {
  return <Case content={content} />
}

function FAQ({ content }) {
  const eyebrow = content?.faqsEyebrow || 'FAQs'
  const titleHtml = content?.faqsTitle || 'Frequently asked <span class="text-gradient-red" >questions</span>'
  const sub = content?.faqsSubtitle || 'Everything you wanted to know about going solar.'
  const list = content?.faqsList || FAQS

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <Section id="faqs" className="bg-[#ffffff]" >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-6" >
        <SectionHeader eyebrow={eyebrow} title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />} sub={sub} />
        <div className="max-w-3xl mx-auto" >
          <Accordion type="single" collapsible className="space-y-3" >
            {list.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min((i % 6) * 0.05, 0.3) }}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="gpu-accelerate"
              >
                <AccordionItem value={`item-${i}`} className="rounded-2xl border border-neutral-200 bg-white px-6 data-[state=open]:border-red-200 data-[state=open]:shadow-soft transition-all gpu-accelerate" >
                  <AccordionTrigger className="text-left hover:no-underline py-5 font-semibold text-neutral-900 text-base md:text-lg hover:text-[#D71920] transition-colors" >{f.q}</AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed pb-5 text-sm md:text-base" >{f.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  )
}

function Contact({ content }) {

  const c = content?.contact || {}

  const phoneDisplay = c.phone || companyNAP.phone

  const phoneRaw = c.phoneRaw || companyNAP.phoneRaw

  const email = c.email || companyNAP.primaryEmail
  const secondaryEmail = c.secondaryEmail || companyNAP.secondaryEmail
  const whatsapp = c.whatsapp || companyNAP.phoneRaw
  const address = c.address || companyNAP.address.fullFormatted
  const hours = c.hours || 'Mon - Sat, 9:30 AM  -  7:30 PM'
  const mapLat = c.mapLat || '13.013901231811213'
  const mapLng = c.mapLng || '80.13669724989127'

  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', interest: 'Residential', message: '' })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.phone) { toast.error('Name and phone are required'); return }
    setLoading(true)
    try {
      const r = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, type: 'contact' }) })
      const j = await r.json()
      if (j.success) {
        toast.success('Thank you! Our expert will call you shortly.')
        setForm({ name: '', email: '', phone: '', city: '', interest: 'Residential', message: '' })
      } else { toast.error('Something went wrong. Please try WhatsApp.') }
    } catch { toast.error('Network error. Please try WhatsApp.') }
    setLoading(false)
  }

  return (
    <Section id="contact" className="bg-[#ffffff]" >
      <div className="container mx-auto px-6" >
        <SectionHeader eyebrow="Get in Touch" title={<>Ready to switch to <span className="text-gradient-red" >solar power?</span></>} sub="Talk to our engineers for a custom feasibility study, system sizing, and transparent quote." />
        <div className="grid lg:grid-cols-5 gap-8 mt-12" >
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-2 space-y-4" >
            {/* Call Card */}
            <a href={`tel:+${phoneRaw}`} className="block rounded-[24px] bg-[#ffffff] p-6 border border-neutral-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all" >
              <div className="flex items-start gap-4" >
                <div className="w-11 h-11 rounded-2xl bg-[#ffffff] text-[#D71920] border border-neutral-200/80 shadow-sm flex items-center justify-center flex-shrink-0" >
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400" >CALL DIRECTLY</div>
                  <div className="mt-1 text-base font-bold text-neutral-900 tracking-tight" >{phoneDisplay}</div>
                </div>
              </div>
            </a>
            {/* Working Hours Card */}
            <div className="rounded-[24px] bg-[#ffffff] p-6 border border-neutral-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#ffffff] text-[#D71920] border border-neutral-200/80 shadow-sm flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">WORKING HOURS</div>
                  <div className="mt-1 text-sm font-normal text-neutral-700">{hours}</div>
                </div>
              </div>
            </div>
            {/* Email Card */}
            <div className="rounded-[24px] bg-[#ffffff] p-6 border border-neutral-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all" >
              <div className="flex items-start gap-4" >
                <div className="w-11 h-11 rounded-2xl bg-[#ffffff] text-[#D71920] border border-neutral-200/80 shadow-sm flex items-center justify-center flex-shrink-0" >
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400" >EMAIL</div>
                  <div className="mt-1 flex flex-col gap-0.5" >
                    <a href={`mailto:${email}`} className="text-sm font-normal text-neutral-700 hover:text-[#D71920] transition-colors break-all" >
                      {email}
                    </a>
                    {secondaryEmail && (
                      <a href={`mailto:${secondaryEmail}`} className="text-sm font-normal text-neutral-700 hover:text-[#D71920] transition-colors break-all" >
                        {secondaryEmail}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Office Card */}
            <a href={`https://www.google.com/maps?q=${mapLat},${mapLng}`} target="_blank" rel="noreferrer" className="block rounded-[24px] bg-[#ffffff] p-6 border border-neutral-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all" >
              <div className="flex items-start gap-4" >
                <div className="w-11 h-11 rounded-2xl bg-[#ffffff] text-[#D71920] border border-neutral-200/80 shadow-sm flex items-center justify-center flex-shrink-0" >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400" >OFFICE</div>
                  <address className="not-italic mt-1 text-sm font-normal text-neutral-700 leading-relaxed" >{address}</address>
                </div>
              </div>
            </a>

            {/* WhatsApp Card */}

            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="block rounded-[24px] bg-[#ffffff] p-6 border border-neutral-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all" >

              <div className="flex items-start gap-4" >

                <div className="w-11 h-11 rounded-2xl bg-[#ffffff] text-[#D71920] border border-neutral-200/80 shadow-sm flex items-center justify-center flex-shrink-0" >

                  <MessageCircle className="h-5 w-5" />

                </div>

                <div>

                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400" >WHATSAPP</div>

                  <div className="mt-1 text-sm font-normal text-neutral-700" >Chat with us instantly</div>

                </div>

              </div>

            </a>

          </div>

          {/* Right Column: Request a free quote Form */}

          <form onSubmit={submit} className="lg:col-span-3 rounded-[36px] bg-[#ffffff] p-7 sm:p-9 md:p-11 border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] font-geist" >

            <h3 className="text-2xl sm:text-[30px] font-bold text-neutral-900 tracking-tight font-geist" >Request a free quote</h3>

            <p className="text-neutral-500 text-sm mt-1.5 font-normal leading-relaxed font-geist" >Fill in your details — we'll get back within a business day.</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5" >

              <div>

                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2" >FULL NAME*</label>

                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="h-[50px] rounded-[18px] bg-[#ffffff] border border-neutral-200 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D71920]/30 transition-all px-4 font-normal" />

              </div>

              <div>

                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2" >PHONE*</label>

                <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91" className="h-[50px] rounded-[18px] bg-[#ffffff] border border-neutral-200 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D71920]/30 transition-all px-4 font-normal" />

              </div>

              <div>

                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2" >EMAIL</label>

                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="h-[50px] rounded-[18px] bg-[#ffffff] border border-neutral-200 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D71920]/30 transition-all px-4 font-normal" />

              </div>

              <div>

                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2" >CITY</label>

                <Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Chennai" className="h-[50px] rounded-[18px] bg-[#ffffff] border border-neutral-200 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D71920]/30 transition-all px-4 font-normal" />

              </div>

              <div className="sm:col-span-2 mt-1" >

                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2.5" >I'M INTERESTED IN</label>

                <div className="flex flex-wrap gap-2.5" >

                  {['Residential', 'Commercial', 'Industrial', 'Ground Mounted', 'O&M', 'Consultancy'].map(x => (

                    <button

                      type="button"

                      key={x}

                      onClick={() => setForm({ ...form, interest: x })}

                      className={`px-5 py-2.5 text-xs transition-all cursor-pointer ${form.interest === x

                        ? 'bg-gradient-to-r from-[#D71920] to-[#e62027] text-white font-semibold rounded-full shadow-md border-none'

                        : 'bg-[#ffffff] text-neutral-600 hover:text-neutral-900 font-medium rounded-full border border-neutral-200'

                        }`}

                    >

                      {x}

                    </button>

                  ))}

                </div>

              </div>

              <div className="sm:col-span-2 mt-1" >

                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2" >MESSAGE</label>

                <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Tell us about your requirement, monthly bill, roof area, etc." className="rounded-[20px] bg-[#ffffff] border border-neutral-200 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D71920]/30 p-4 font-normal min-h-[110px] transition-all" />

              </div>

            </div>

            <Button type="submit" disabled={loading} className="mt-8 w-full h-14 bg-gradient-to-r from-[#D71920] to-[#c0151b] hover:from-[#c0151b] hover:to-[#a5121a] rounded-full text-white font-bold text-base shadow-glow-red flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.005] active:scale-[0.995]" >

              {loading ? 'Sending...' : (<>Book Free Site Visit <Send className="ml-1 h-4 w-4" /></>)}

            </Button>

            <p className="mt-4 text-[11px] text-neutral-400 text-center font-normal" >By submitting, you agree to be contacted by IVR Energy about your enquiry.</p>

          </form>

        </div>

      </div>

    </Section>

  )

}

function ParallaxMap({ content }) {

  const c = content?.contact || {}

  const mapLat = c.mapLat || '13.013944'

  const mapLng = c.mapLng || '80.136667'

  const address = c.address || companyNAP.address.fullFormatted

  const phoneDisplay = c.phone || companyNAP.phone

  const phoneRaw = c.phoneRaw || companyNAP.phoneRaw

  const [isMobile, setIsMobile] = useState(false)

  const mapRef = useRef(null)

  const { scrollYProgress } = useScroll({

    target: mapRef,

    offset: ['start end', 'end start']

  })

  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15])

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 0.3, 0.3, 0.7])

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth < 768)

    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  return (

    <section ref={mapRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden" >

      {/* Parallax map background  — stays sticky within the section */}

      <motion.div

        className="absolute inset-0 w-full h-full"

        style={{ scale: isMobile ? 1 : mapScale }}

      >

        <iframe

          title="IVR Energy location"

          className="w-full h-full border-0 pointer-events-none"

          loading="lazy"

          src={`https://www.google.com/maps?q=${mapLat},${mapLng}&z=17&output=embed`}

          style={{ filter: 'saturate(0.8) contrast(1.05)' }}

        />

      </motion.div>

      {/* Dark overlay that fades based on scroll */}

      <motion.div

        className="absolute inset-0 bg-neutral-950 pointer-events-none z-10"

        style={{ opacity: isMobile ? 0.7 : overlayOpacity }}

      />

      {/* Top gradient fade for seamless section merge */}

      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#f4f5f8] to-transparent z-20 pointer-events-none" />

      {/* Bottom gradient fade */}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-20 pointer-events-none" />

      {/* Floating location card */}

      <div className="absolute inset-0 z-30 flex items-center justify-center px-6 pointer-events-none" >

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true, margin: '-100px' }}

          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}

          className="pointer-events-auto max-w-md w-full"

        >

          <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/60 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25)] relative overflow-hidden" >

            {/* Decorative glow */}

            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#D71920]/20 blur-3xl pointer-events-none" />

            <div className="relative" >

              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D71920] mb-4" >

                <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />

                Our Location

              </div>

              <h3 className="text-xl font-bold text-neutral-900 leading-snug" >

                IVR Energy

              </h3>

              <address className="not-italic mt-2 text-sm text-neutral-600 leading-relaxed" >

                {address}

              </address>

              <div className="mt-5 flex flex-col sm:flex-row gap-3" >

                <a

                  href={`https://www.google.com/maps/dir/?api=1&destination=${mapLat},${mapLng}`}

                  target="_blank"

                  rel="noreferrer"

                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white px-6 py-3 text-sm font-semibold shadow-glow-red transition-all hover:scale-[1.02] active:scale-[0.98]"

                >

                  <MapPin className="h-4 w-4" /> Get Directions

                </a>

                <a

                  href={`tel:+${phoneRaw}`}

                  className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"

                >

                  <Phone className="h-4 w-4" /> {phoneDisplay}

                </a>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Interactive map overlay  — enables map interaction on click */}

      <div

        className="absolute inset-0 z-20 cursor-pointer"

        onClick={(e) => {

          // Enable iframe interaction by removing the overlay temporarily

          e.currentTarget.style.display = 'none'

          setTimeout(() => { if (e.currentTarget) e.currentTarget.style.display = '' }, 3000)

        }}

      />

    </section>

  )

}

function FloatingWhatsApp({ content }) {

  const wa = content?.contact?.whatsapp || '919047777936'

  return (

    <a href={`https://wa.me/${wa}?text=Hi%20IVR%20Energy,%20I%27d%20like%20a%20free%20solar%20quote.`} target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group" aria-label="Chat on WhatsApp" >

      <div className="absolute inset-0 rounded-full bg-green-500/40 blur-lg animate-pulse-glow" />

      <div className="relative flex items-center justify-center h-10 w-10 sm:h-12 sm:w-auto sm:px-4 sm:py-3.5 rounded-full bg-green-500 text-white shadow-glow-red group-hover:scale-105 transition-transform" >

        <MessageCircle className="h-5 w-5 fill-white" />

        <span className="hidden sm:inline text-sm font-semibold pr-1 ml-2" >WhatsApp Us</span>

      </div>

    </a>

  )

}

function CustomInterestSelect({ value, onChange }) {

  const [open, setOpen] = useState(false)

  const ref = useRef(null)

  const options = ['Residential', 'Commercial']

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (ref.current && !ref.current.contains(e.target)) {

        setOpen(false)

      }

    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)

  }, [])

  return (

    <div ref={ref} className="relative col-span-2 sm:col-span-1 z-30" >

      <button

        type="button"

        onClick={() => setOpen(!open)}

        className="w-full h-12 rounded-xl bg-white/10 border border-white/15 px-4 text-sm font-medium text-white flex items-center justify-between hover:bg-white/15 focus:outline-none focus:border-[#D71920] transition-all cursor-pointer"

      >

        <span className="truncate" >{value || 'Select Service'}</span>

        <ChevronDown className={`h-4 w-4 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-[#D71920]' : ''}`} />

      </button>

      <AnimatePresence>

        {open && (

          <motion.div

            initial={{ opacity: 0, y: -6, scale: 0.98 }}

            animate={{ opacity: 1, y: 0, scale: 1 }}

            exit={{ opacity: 0, y: -6, scale: 0.98 }}

            transition={{ duration: 0.2, ease: 'easeOut' }}

            className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#1c1d26] border border-white/20 rounded-2xl p-1.5 shadow-2xl backdrop-blur-2xl space-y-1"

          >

            {options.map((opt) => {

              const isSelected = value === opt

              return (

                <button

                  type="button"

                  key={opt}

                  onClick={() => {

                    onChange(opt)

                    setOpen(false)

                  }}

                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${isSelected

                    ? 'bg-[#D71920] text-white font-bold shadow-sm'

                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'

                    }`}

                >

                  <span>{opt}</span>

                  {isSelected && <Check className="h-4 w-4 text-white" />}

                </button>

              )

            })}

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  )

}

function QuickQuote() {

  const [form, setForm] = useState({ name: '', phone: '', city: '', interest: 'Residential' })

  const [loading, setLoading] = useState(false)

  async function submit(e) {

    e.preventDefault()

    if (!form.name || !form.phone) { toast.error('Name & phone are required'); return }

    setLoading(true)

    try {

      const r = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, type: 'quote', message: 'Quick quote request (below Surya Ghar section)' }) })

      const j = await r.json()

      if (j.success) { toast.success('Quote requested! Our team will call you shortly.'); setForm({ name: '', phone: '', city: '', interest: 'Residential' }) }

      else toast.error('Something went wrong.')

    } catch { toast.error('Network error.') }

    setLoading(false)

  }

  return (

    <Section className="bg-[#ffffff]" >

      <div className="container mx-auto px-6" >

        <div className="max-w-5xl mx-auto rounded-[36px] p-8 md:p-12 bg-gradient-to-br from-neutral-950 via-neutral-900 to-[#1a0505] relative overflow-hidden shadow-2xl" >
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D71920]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

          <div className="relative grid md:grid-cols-5 gap-8 items-center z-10" >

            <div className="md:col-span-2 text-white" >

              <h3 className="mt-4 text-3xl md:text-4xl font-bold leading-tight" >

                Request a <span className="text-gradient-red" >Free Quote</span>

              </h3>

              <p className="mt-3 text-neutral-300 text-sm" >

                Get a personalised solar quote in under 24 hours. Zero obligation.

              </p>

              <div className="mt-5 flex items-center gap-4 text-xs text-neutral-400" >

                <div className="flex items-center gap-1.5" >

                  <CheckCircle2 className="h-4 w-4 text-green-400" /> Free consultation

                </div>

              </div>

            </div>

            <form onSubmit={submit} className="md:col-span-3 grid grid-cols-2 gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-5" >

              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name*" className="col-span-2 sm:col-span-1 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-neutral-400" />

              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone number*" className="col-span-2 sm:col-span-1 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-neutral-400" />

              <Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City" className="col-span-2 sm:col-span-1 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-neutral-400" />

              <CustomInterestSelect value={form.interest} onChange={val => setForm({ ...form, interest: val })} />

              <Button type="submit" disabled={loading} className="col-span-2 h-12 bg-[#D71920] hover:bg-[#a5121a] rounded-xl font-bold shadow-glow-red" >

                {loading ? 'Sending...' : <>Get My Free Quote <ArrowRight className="ml-2 h-4 w-4" /></>}

              </Button>

            </form>

          </div>

        </div>

      </div>

    </Section>

  )

}

function ScrollToTop() {

  const [visible, setVisible] = useState(false)

  const [chatbotOpen, setChatbotOpen] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth < 768)

    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  useEffect(() => {

    const toggleVisibility = () => {

      if (window.scrollY > 400) {

        setVisible(true)

      } else {

        setVisible(false)

      }

    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })

    return () => window.removeEventListener('scroll', toggleVisibility)

  }, [])

  useEffect(() => {

    const onOpen = () => setChatbotOpen(true)

    const onClose = () => setChatbotOpen(false)

    window.addEventListener('chatbot-open', onOpen)

    window.addEventListener('chatbot-close', onClose)

    return () => {

      window.removeEventListener('chatbot-open', onOpen)

      window.removeEventListener('chatbot-close', onClose)

    }

  }, [])

  const scrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    })

  }

  const shouldShow = visible && !(chatbotOpen && isMobile)

  return (

    <AnimatePresence>

      {shouldShow && (

        <motion.button

          initial={{ opacity: 0, y: 40, scale: 0.8 }}

          animate={{ opacity: 1, y: 0, scale: 1 }}

          exit={{ opacity: 0, y: 40, scale: 0.8 }}

          transition={{ type: 'spring', stiffness: 260, damping: 20 }}

          onClick={scrollToTop}

          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white shadow-glow-red transition-all cursor-pointer hover:scale-105 active:scale-95"

          aria-label="Scroll to top"

        >

          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />

        </motion.button>

      )}

    </AnimatePresence>

  )

}

function FAQChatbot() {

  const [isOpen, setIsOpen] = useState(false)

  const [step, setStep] = useState(0) // 0: greeting/ask name, 1: ask phone, 2: ask interest

  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', interest: '', message: '' })

  const [messages, setMessages] = useState([

    { sender: 'bot', text: 'Hello! I am the IVR energy assistant. I can help you request a free, personalized solar quote.' },

    { sender: 'bot', text: 'To get started, could you please tell me your Full Name?' }

  ])

  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(false)

  const chatContainerRef = useRef(null)

  // Notify ScrollToTop to hide on mobile when chatbot opens/closes

  useEffect(() => {

    window.dispatchEvent(new CustomEvent(isOpen ? 'chatbot-open' : 'chatbot-close'))

  }, [isOpen])

  useEffect(() => {

    if (isOpen && chatContainerRef.current) {

      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight

    }

  }, [messages, isOpen])

  const handleSend = async (textToSend) => {

    const text = (textToSend || input).trim()

    if (!text) return

    // Add user message

    setMessages(prev => [...prev, { sender: 'user', text }])

    if (!textToSend) setInput('')

    let nextStep = step

    let updatedForm = { ...form }

    // State machine logic

    if (step === 0) {

      // Name received

      updatedForm.name = text

      setForm(updatedForm)

      nextStep = 1

      setTimeout(() => {

        setMessages(prev => [...prev, { sender: 'bot', text: `Thanks, ${text}! What is your Phone Number?` }])

      }, 500)

    }

    else if (step === 1) {

      // Phone received

      updatedForm.phone = text

      setForm(updatedForm)

      nextStep = 2

      setTimeout(() => {

        setMessages(prev => [...prev, {

          sender: 'bot',

          text: `Which solar service are you interested in? Please select or type one:`

        }])

      }, 500)

    }

    else if (step === 2) {

      // Interest received -> Submit lead immediately!

      updatedForm.interest = text

      setForm(updatedForm)

      setLoading(true)

      setTimeout(async () => {

        try {

          const payload = {

            name: updatedForm.name,

            phone: updatedForm.phone,

            email: '',

            city: '',

            interest: updatedForm.interest,

            message: `Chatbot Quote Request`,

            type: 'quote'

          }

          const r = await fetch('/api/leads', {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(payload)

          })

          const j = await r.json()

          if (j.success) {

            setMessages(prev => [...prev, {

              sender: 'bot',

              text: `Thank you, ${updatedForm.name}! Your quote request has been submitted successfully to our team. An engineer will get in touch with you shortly!`

            }])

            // Reset form for next time

            setForm({ name: '', phone: '', email: '', city: '', interest: '', message: '' })

            setStep(0)

          } else {

            setMessages(prev => [...prev, {

              sender: 'bot',

              text: 'Oops, something went wrong while saving your details. Please try requesting a quote via the main form or WhatsApp.'

            }])

          }

        } catch {

          setMessages(prev => [...prev, {

            sender: 'bot',

            text: 'Network error. Please try again or reach out to us on WhatsApp.'

          }])

        }

        setLoading(false)

      }, 500)

    }

    if (step < 2) {

      setStep(nextStep)

    }

  }

  const interests = ['Residential', 'Commercial', 'Industrial', 'Ground Mounted', 'O&M', 'Consultancy']

  return (

    <>

      {/* Floating Toggle Button */}

      <button

        onClick={() => setIsOpen(!isOpen)}

        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white shadow-lg shadow-red-500/20 hover:scale-105 transition-all"

        aria-label="Solar Quote Chatbot"

      >

        <MessageSquare className="h-4.5 w-4.5 sm:h-5 sm:w-5" />

      </button>

      {/* Chat Window */}

      <AnimatePresence>

        {isOpen && (

          <motion.div

            initial={{ opacity: 0, y: 50, scale: 0.9 }}

            animate={{ opacity: 1, y: 0, scale: 1 }}

            exit={{ opacity: 0, y: 50, scale: 0.9 }}

            className="fixed bottom-16 left-4 sm:bottom-20 sm:left-6 z-40 w-[90vw] sm:w-[380px] h-[440px] sm:h-[480px] bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"

          >

            {/* Header */}

            <div className="px-6 py-4 bg-gradient-to-r from-[#D71920] to-[#ff5a4e] flex items-center justify-between" >

              <div className="flex items-center gap-2" >

                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse ring-2 ring-white/50" />

                <span className="font-bold text-sm" >IVR energy assistant</span>

              </div>

              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white" >

                <X className="h-4 w-4" />

              </button>

            </div>

            {/* Chat Area */}

            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar" >

              {messages.map((m, i) => (

                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.sender === 'user'

                    ? 'bg-[#D71920] text-white rounded-tr-none'

                    : 'bg-white/10 text-neutral-100 rounded-tl-none'

                    }`}>

                    {m.text}

                  </div>

                </div>

              ))}

              {loading && (

                <div className="flex justify-start" >

                  <div className="bg-white/10 text-neutral-100 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm" >

                    Submitting details...

                  </div>

                </div>

              )}

            </div>

            {/* Clickable Quick Choices (Only at Step 2 - Interest) */}

            {step === 2 && (

              <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap bg-neutral-900/50" >

                {interests.map(choice => (

                  <button

                    key={choice}

                    onClick={() => handleSend(choice)}

                    className="text-[11px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-all text-neutral-300"

                  >

                    {choice}

                  </button>

                ))}

              </div>

            )}

            {/* Input Form */}

            <form

              onSubmit={(e) => { e.preventDefault(); handleSend() }}

              className="p-3 border-t border-white/10 flex gap-2 bg-neutral-950"

            >

              <input

                type="text" value={input}

                onChange={(e) => setInput(e.target.value)}

                placeholder={

                  step === 0 ? "Type your full name..." :

                    step === 1 ? "Type your phone number..." : "Select or type interest..."}

                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D71920]"

                disabled={loading}

              />

              <button

                type="submit"

                disabled={loading}

                className="h-10 w-10 rounded-xl bg-[#D71920] hover:bg-[#a5121a] flex items-center justify-center transition-all disabled:opacity-50"

              >

                <Send className="h-4 w-4" />

              </button>

            </form>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  )

}

function App() {

  const [content, setContent] = useState({})

  const [reviews, setReviews] = useState([])

  const onQuote = () => {
    const elem = document.getElementById('contact')
    if (elem) {
      const top = elem.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      const timer = setTimeout(() => {
        const elem = document.getElementById('contact')
        if (elem) {
          const top = elem.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(j => { if (j.content) setContent(j.content) }).catch(() => { })
    fetch('/api/reviews').then(r => r.json()).then(j => { if (Array.isArray(j.reviews)) setReviews(j.reviews) }).catch(() => { })
  }, [])

  const vis = content.sectionVisibility || {}

  return (

    <main className="relative overflow-x-hidden" style={{ willChange: 'auto' }}>

      <Navbar onQuote={onQuote} content={content} />

      {vis.hero !== false && <Hero onQuote={onQuote} content={content} />}

      {vis.subsidy !== false && <Subsidy onQuote={onQuote} content={content} />}

      <QuickQuote />

      {vis.about !== false && <About content={content} />}

      {(vis.solutions !== false || vis.whyUs !== false) && <BentoSolutionsWhyUs content={content} />}

      {vis.calc !== false && <Calc content={content} />}

      {vis.projects !== false && <Projects content={content} />}

      {vis.clients !== false && <Clients content={content} />}

      {vis.process !== false && <Process content={content} />}

      {vis.faqs !== false && <FAQ content={content} />}

      {vis.contact !== false && <Contact content={content} />}

      {vis.contact !== false && <ParallaxMap content={content} />}

      <Footer content={content} />

      <FloatingWhatsApp content={content} />

      <FAQChatbot />

      <ScrollToTop />

    </main>

  )

}

export default App

