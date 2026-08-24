'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import {
  PenTool, HardHat, Home, Building2, Factory, PanelsTopLeft, Handshake, Wrench, IndianRupee,
  PhoneCall, Search, FileText, ClipboardCheck, Zap, Sparkles, Phone, Mail, MapPin, ArrowRight,
  ShieldCheck, Award, Cpu, ArrowUp, CheckCircle2, Star, ChevronDown, ChevronRight,
  Sun, Gauge, TrendingUp, Users, BadgeCheck, Cable, Box, Shield, Monitor, Plug,
  GraduationCap, Hotel, Warehouse, Heart, LandPlot, CircuitBoard, BatteryCharging,
  X, Maximize2, Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee'
import { FlippingCard } from '@/components/ui/flipping-card'
import { SupplyCardsMotion } from '@/components/ui/supply-cards-motion'
import { SOLAR_CAPACITIES_DATA, sortCapacitiesAscending } from '@/data/capacities'

const ICON_MAP = {
  PenTool, HardHat, Home, Building2, Factory, PanelsTopLeft, Handshake, Wrench,
  IndianRupee, ShieldCheck, Award, Users, TrendingUp, Gauge, BadgeCheck, Cpu,
  PhoneCall, Search, FileText, ClipboardCheck, Zap, Sparkles, Star, CheckCircle2,
  Sun, Cable, Box, Shield, Monitor, Plug, GraduationCap, Hotel, Warehouse, Heart,
  LandPlot, CircuitBoard, BatteryCharging
}

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const SERVICE_NAV = [
  { id: 'capacities', label: '3kW, 4kW & 5kW Sizing', icon: Zap },
  { id: 'services-grid', label: 'All Services', icon: PenTool },
  { id: 'epc', label: 'EPC Services', icon: HardHat },
  { id: 'approvals', label: 'Approvals', icon: ClipboardCheck },
  { id: 'supply', label: 'Supply', icon: Box },
]

const SOLAR_CAPACITIES = SOLAR_CAPACITIES_DATA

const SERVICES = [
  {
    icon: PenTool,
    title: 'Solar Consultancy',
    desc: 'End-to-end consulting with international partners for feasibility, DPR & funding.',
    features: ['Feasibility Study', 'DPR Preparation', 'ROI Analysis', 'Technical Consulting'],
    longDesc: 'Our expert solar consultants perform detailed technical feasibility assessments, solar irradiance analysis, DPR preparation, and financial modeling with international engineering standards to maximize your return on investment.'
  },
  {
    icon: HardHat,
    title: 'Solar EPC Services',
    desc: 'Turnkey Engineering, Procurement & Construction — from land to commissioning.',
    features: ['Engineering Design', 'Procurement', 'Construction', 'Testing & Commissioning'],
    longDesc: 'We handle the entire EPC lifecycle — from precision engineering and Tier-1 component procurement to certified structural mounting, electrical cabling, grid integration, and final plant commissioning.'
  },
  {
    icon: Home,
    title: 'Residential Rooftop',
    desc: 'Slash your EB bill to zero with premium home solar systems.',
    features: ['Net Metering', 'Subsidy Support', 'Premium Panels', 'App Monitoring'],
    longDesc: 'Transform your home rooftop into a self-sustaining power generator. Enjoy up to 80% reduction in electricity bills, zero-cost solar power for 25+ years, hassle-free net metering, and PM Surya Ghar subsidy support.'
  },
  {
    icon: Building2,
    title: 'Commercial Rooftop',
    desc: 'Cut operating costs for offices, hotels, hospitals & IT parks.',
    features: ['Load Analysis', 'Custom Design', 'OPEX/CAPEX Models', 'Grid Tie-In'],
    longDesc: 'Optimize corporate operating costs for offices, hospitals, hotels, and IT parks. Our custom commercial solar plants reduce peak tariff charges, provide accelerated depreciation tax benefits, and boost corporate sustainability.'
  },
  {
    icon: Factory,
    title: 'Industrial Solar',
    desc: 'Captive solar power for textiles, cement, chemical & manufacturing.',
    features: ['High-Voltage Systems', 'Transformer Integration', 'SCADA Monitoring', 'Power Evacuation'],
    longDesc: 'Designed for energy-intensive manufacturing plants, textiles, and chemical industries. We engineer high-voltage captive solar power systems equipped with real-time SCADA monitoring, step-up transformers, and robust power evacuation.'
  },
  {
    icon: PanelsTopLeft,
    title: 'Ground Mounted Solar',
    desc: 'Utility-scale solar farms with grid tie-in and net metering.',
    features: ['Land Assessment', 'Module Mounting', 'HT Infrastructure', 'Grid Synchronization'],
    longDesc: 'Utility-scale ground mounted solar farms engineered for maximum generation yield. We handle topography land surveying, civil piling, HT transmission infrastructure, substations, and DISCOM grid synchronization.'
  },
  {
    icon: Handshake,
    title: 'Government Approvals',
    desc: 'Subsidy applications, TANGEDCO net-metering & policy compliance.',
    features: ['DISCOM Liaison', 'Net Metering', 'Subsidy Processing', 'Regulatory Compliance'],
    longDesc: 'Zero-hassle administrative paperwork. Our dedicated liaison team manages TANGEDCO / DISCOM net-metering applications, CEIG safety inspection approvals, grid connectivity agreements, and government subsidy disbursal.'
  },
  {
    icon: Wrench,
    title: 'O&M Services',
    desc: 'Inverter, transformer & MV switchgear preventive maintenance.',
    features: ['Preventive Maintenance', 'Performance Monitoring', 'Spare Parts', 'Annual Contracts'],
    longDesc: 'Keep your solar power plant running at peak efficiency year-round. We offer 24/7 remote IoT generation tracking, thermal drone imaging, panel washing, inverter diagnostics, and SLA-backed preventive maintenance.'
  },
  {
    icon: IndianRupee,
    title: 'Solar Financing',
    desc: 'Bank tie-ups, EMI options & PM Surya Ghar subsidy support.',
    features: ['Bank Loans', 'EMI Options', 'Subsidy Guidance', 'ROI Documentation'],
    longDesc: 'Make your solar transition affordable through our banking network. Benefit from low-interest green energy loans, zero-down-payment OPEX/CAPEX models, flexible EMI tenures, and maximum PM Surya Ghar subsidy assistance.'
  },
]



const EPC_TIMELINE = [
  { step: 'Planning', desc: 'Site assessment, load analysis, and project scope definition.', icon: Search },
  { step: 'Design', desc: 'Engineering drawings, SLD, and structural analysis.', icon: PenTool },
  { step: 'Procurement', desc: 'Tier-1 component sourcing with quality certifications.', icon: Box },
  { step: 'Installation', desc: 'Certified team deployment with safety protocols.', icon: HardHat },
  { step: 'Testing', desc: 'IV curve testing, insulation resistance, and earthing checks.', icon: Gauge },
  { step: 'Commissioning', desc: 'Grid synchronization and performance benchmarking.', icon: Zap },
  { step: 'Maintenance', desc: '24/7 monitoring and annual preventive maintenance.', icon: Wrench },
]

const APPROVAL_STEPS = [
  { step: 'Eligibility', desc: 'Verify site and consumer eligibility criteria.', icon: CheckCircle2 },
  { step: 'Application', desc: 'Submit application with required documentation.', icon: FileText },
  { step: 'Government Approval', desc: 'DISCOM review and technical feasibility clearance.', icon: ClipboardCheck },
  { step: 'PPA', desc: 'Power Purchase Agreement execution.', icon: Handshake },
  { step: 'Grid Connection', desc: 'Bi-directional meter installation and grid tie-in.', icon: Zap },
  { step: 'Commissioning', desc: 'Final inspection, testing, and commissioning certificate.', icon: BadgeCheck },
]



const SUPPLY_ITEMS = [
  { title: 'Solar Panels', icon: Sun, desc: 'Mono-PERC / TOPCon / HJT modules from Tier-1 manufacturers.', spec: 'Tier-1 Certified' },
  { title: 'Inverters', icon: Gauge, desc: 'String, central, and micro inverters with MPPT technology.', spec: '98.8% Efficiency' },
  { title: 'Transformers', icon: Plug, desc: 'Step-up and auxiliary transformers for grid synchronization.', spec: 'IS/IEC Standard' },
  { title: 'SCADA', icon: Monitor, desc: 'Supervisory control with real-time monitoring dashboards.', spec: 'IoT Enabled' },
  { title: 'Junction Boxes', icon: Box, desc: 'IP65-rated junction boxes with surge protection.', spec: 'IP65 Rated' },
  { title: 'Lightning Protection', icon: Shield, desc: 'LA systems and chemical earthing kits per IEC 62305.', spec: 'IEC 62305' },
  { title: 'LT Panel', icon: CircuitBoard, desc: 'MCCB/MCB panels with metering and protection relays.', spec: 'Type Tested' },
  { title: 'HT Panel', icon: BatteryCharging, desc: 'Vacuum circuit breakers and relay protection panels.', spec: 'VCB Standard' },
  { title: 'Cables', icon: Cable, desc: 'DC, AC, and control cables with UV-resistant insulation.', spec: 'UV-Resistant' },
  { title: 'Mounting Structure', icon: LandPlot, desc: 'Hot-dip galvanized structures certified for wind zone compliance.', spec: 'HDG 80+ µm' },
]



const COMPARISON_DATA = [
  { dim: 'Experience', ivr: '12+ years with 500+ projects', trad: 'Varies, often limited' },
  { dim: 'Component Quality', ivr: 'Tier-1 only, 25-yr warranty', trad: 'Mixed quality, shorter warranty' },
  { dim: 'Government Support', ivr: 'Full liaison & subsidy processing', trad: 'Customer responsibility' },
  { dim: 'Warranty', ivr: 'Comprehensive 5-year workmanship', trad: '1-year standard' },
  { dim: 'Execution Speed', ivr: '2-4 days residential, 2-6 weeks commercial', trad: 'Unpredictable timelines' },
  { dim: 'Monitoring', ivr: 'Real-time app with WiFi/GPRS', trad: 'Basic or no monitoring' },
  { dim: 'Maintenance', ivr: 'SLA-backed annual O&M contracts', trad: 'On-call, no SLA' },
]

const WORKFLOW_STEPS = [
  { title: 'Consultation', desc: 'Free site visit & requirement analysis.', icon: PhoneCall },
  { title: 'Site Survey', desc: 'Shadow analysis, structural review & metering plan.', icon: Search },
  { title: 'Design', desc: 'Detailed engineering, SLD & layout drawings.', icon: PenTool },
  { title: 'Approval', desc: 'DISCOM & subsidy paperwork by our team.', icon: ClipboardCheck },
  { title: 'Installation', desc: 'Certified installers with premium structures.', icon: HardHat },
  { title: 'Inspection', desc: 'Quality checks and safety compliance.', icon: Gauge },
  { title: 'Commissioning', desc: 'Grid sync, testing & performance benchmarking.', icon: Zap },
  { title: 'After-Sales Support', desc: '24/7 monitoring and annual maintenance.', icon: Wrench },
]



const FAQ_DATA = [
  { q: 'How long does a typical rooftop solar installation take?', a: 'Residential installations are completed in 2 to 4 days. Commercial and industrial projects depend on capacity, typically ranging from 2 to 6 weeks, including DISCOM approvals and testing.' },
  { q: 'What maintenance is required for my solar power plant?', a: 'Solar power plants require very low maintenance. We recommend cleaning the panels every 10-15 days with water to clear off dust and optimize power output. Our team provides detailed maintenance playbooks upon hand-off.' },
  { q: 'Do you assist with government subsidies?', a: 'Yes, IVR Energy is fully empanelled. We manage the entire subsidy liaison process for residential customers applying under the PM Surya Ghar Muft Bijli Yojana (up to ₹78,000 subsidy).' },
  { q: 'How is the generation of the plant monitored?', a: 'Every solar plant we commission includes smart WiFi/GPRS logging. You can monitor daily electricity generation, peak yield, carbon footprint savings, and health metrics directly from your mobile app.' },
  { q: 'What is the payback period for a solar system?', a: 'Typical payback period ranges from 3-5 years depending on your electricity tariff, system size, and net metering policy. Our systems generate free electricity for 20+ years beyond payback.' },
  { q: 'Do you handle net metering approvals?', a: 'Yes, our dedicated liaison team handles the complete net metering application process including documentation, DISCOM coordination, bi-directional meter installation, and grid tie-in approval.' },
  { q: 'What warranty do you provide on installations?', a: 'We offer 5-year comprehensive workmanship warranty, 25-year panel performance warranty from manufacturers, and 5-10 year inverter warranty. Extended AMC contracts are available.' },
  { q: 'Can I finance my solar installation with EMIs?', a: 'Absolutely. We have tie-ups with leading banks offering solar-specific loans at competitive rates. Zero down-payment options and 3-7 year EMI plans are available with instant approval.' },
]

const REVIEWS_DATA = [
  { name: "Umesh Unnikrishnan", role: "Homeowner · 5 kW", text: "Great service and support throughout the installation process. I've installed a 5kW solar panel from IVR Energy on the roof of my home. Highly recommend them." },
  { name: "M V Sankaran", role: "10 KW Installation, Chennai", text: "I had the opportunity of using the services of IVR Energy for a 10 KW installation at Chennai. Excellent professional support." },
  { name: "Anbu Guru", role: "10 kW Office, Chennai", text: "Installed 10 kW system in my office. EB Bill has come down drastically — nearly 80% reduction in power consumption." },
  { name: "Rudhra Prasad", role: "5 KV Home Installation", text: "It was pleasant working with IVR Energy. Recently installed 5KV at my residence. Purely efficient and working great." },
  { name: "Cap. Shankar A", role: "Rooftop Owner", text: "Job completed as promised. Very cooperative and professional. Mr. Prakash explained the system in detail and clarified all doubts." },
  { name: "Ramachandran Saamy", role: "Rooftop Owner", text: "Installed rooftop system. Their approach towards the work is really professional." },
]

/* ──────────────────────────────────────────────
   UTILITY COMPONENTS
   ────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

function SectionHeader({ eyebrow, title, sub, light = false, align = 'center' }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-12 md:mb-16`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#D71920] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight ${light ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? 'text-neutral-300' : 'text-neutral-600'}`}>{sub}</p>}
    </motion.div>
  )
}

function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const end = value
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, value, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ──────────────────────────────────────────────
   SECTION 1: HERO
   ────────────────────────────────────────────── */

function HeroSection({ content }) {
  const badge = content?.servicesHeroBadge || 'Complete Solar Energy Solutions'
  const titleHtml = content?.servicesHeroTitle || 'Complete Solar <span class="text-gradient-red">Energy Solutions</span>'
  const sub = content?.servicesHeroSubtitle || 'From Consultation to Commissioning, IVR Energy delivers complete turnkey solar EPC solutions for Residential, Commercial, Industrial and Utility Scale Projects.'

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={content?.heroImage || "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072"}
          alt="Solar farm"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D71920]/40 rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#D71920] mb-6 px-4 py-2 rounded-full border border-[#D71920]/30 bg-[#D71920]/10 backdrop-blur-sm">
              {badge}
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />

          <motion.p variants={fadeUp} custom={2}
            className="mt-6 text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto"
          >
            {sub}
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-8 h-14 text-base font-bold shadow-glow-red transition-all hover:scale-105 active:scale-95">
              <Link href="/contact">Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-full px-8 h-14 text-base font-semibold backdrop-blur-md transition-all hover:scale-105">
              <a href="#capacities">Explore Solar Systems <ChevronDown className="ml-2 h-4 w-4" /></a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-white/50" />
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECTION 2: STICKY SERVICE NAVIGATION
   ────────────────────────────────────────────── */

function StickyServiceNav() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )

    SERVICE_NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="sticky top-[64px] z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 hidden md:block">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-center gap-1 py-2 overflow-x-auto no-scrollbar">
          {SERVICE_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeId === id
                  ? 'bg-[#D71920] text-white shadow-glow-red'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   SECTION 3: SERVICES GRID (3D FLIPPING CARDS)
   ────────────────────────────────────────────── */

function ServiceCard({ service, index }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = service.icon

  const frontFace = (
    <div className="flex flex-col justify-between h-full w-full">
      <div>
        {/* Red Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D71920] to-[#b3141a] flex items-center justify-center text-white shadow-md shadow-red-500/20 mb-4">
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-neutral-900 tracking-tight">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
          {service.desc}
        </p>

        {/* Pill Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.features.map((f) => (
            <span
              key={f}
              className="text-[11.5px] font-medium px-2.5 py-1 rounded-full bg-neutral-100/90 text-neutral-700 border border-neutral-200/50"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Footer trigger */}
      <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D71920]">
          Learn More <ChevronRight className="h-3.5 w-3.5 group-hover/flipping-card:translate-x-1 transition-transform" />
        </span>
        <span className="text-[10.5px] text-neutral-400 font-medium">Hover to flip</span>
      </div>
    </div>
  )

  const backFace = (
    <div className="flex flex-col justify-between h-full w-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold tracking-wider border border-red-500/30">
            <Icon className="h-3.5 w-3.5" />
            <span>{service.title}</span>
          </div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Details</span>
        </div>

        <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed line-clamp-4">
          {service.longDesc}
        </p>

        <div className="mt-3 space-y-1.5 border-t border-neutral-800/80 pt-2.5">
          {service.features.slice(0, 3).map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#D71920] shrink-0" />
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-2">
        <Button
          asChild
          size="sm"
          className="w-full bg-[#D71920] hover:bg-[#b3141a] text-white rounded-full text-xs font-bold h-9 shadow-lg shadow-red-600/30"
          onClick={(e) => e.stopPropagation()}
        >
          <Link href="/contact">
            Get Fast Quote <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      custom={index % 3}
      className="h-full"
    >
      <FlippingCard
        height={340}
        frontContent={frontFace}
        backContent={backFace}
        isFlipped={isFlipped}
        onFlipToggle={() => setIsFlipped(!isFlipped)}
      />
    </motion.div>
  )
}

function ServicesGridSection() {
  return (
    <section id="services-grid" className="py-20 md:py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Our Services"
          title={<>Complete <span className="text-gradient-red">turnkey solar</span> services</>}
          sub="From consultancy to commissioning — one accountable partner for every step of your solar journey."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECTION 4: 3KW, 4KW & 5KW SYSTEM SIZING
   ────────────────────────────────────────────── */

function CapacitySizingSection() {
  const [capacities, setCapacities] = useState(sortCapacitiesAscending(SOLAR_CAPACITIES_DATA))

  useEffect(() => {
    fetch('/api/capacities')
      .then(r => r.json())
      .then(j => {
        if (Array.isArray(j.capacities) && j.capacities.length > 0) {
          setCapacities(sortCapacitiesAscending(j.capacities))
        }
      })
      .catch(() => {})
  }, [])

  const sortedList = sortCapacitiesAscending(capacities)

  return (
    <section id="capacities" className="py-20 md:py-28 bg-white scroll-mt-28 border-t border-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <SectionHeader
          eyebrow="Rooftop Solar Sizing & Specs"
          title={<>Explore <span className="text-gradient-red">3 kW, 4 kW, 5 kW & 10 kW</span> Systems</>}
          sub="Select any capacity below to view its complete technical specifications, appliance compatibility, daily yield estimates, and PM Surya Ghar subsidy details."
        />

        {/* Capacity Sizing Package Cards in Ascending Order - Centered Grid/Flex */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6">
          {sortedList.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp} custom={i}
              className="service-card-hover group relative rounded-3xl bg-neutral-900 text-white p-6 sm:p-7 border border-neutral-800 flex flex-col justify-between overflow-hidden shadow-xl hover:border-[#D71920]/50 transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[260px] max-w-[320px]"
            >
              {/* Card Ambient Glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#D71920]/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              <div>
                {/* Big Capacity Title at the top */}
                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mb-2.5 h-[38px] flex items-center">
                  {cap.kw}
                </div>

                {/* Tag Pill */}
                <div className="flex items-center justify-between gap-2 mb-3 min-h-[26px]">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-neutral-200 border border-white/10 whitespace-nowrap truncate max-w-full">
                    {cap.tag}
                  </span>
                </div>

                {/* Subsidy Badge */}
                <div className="text-xs font-bold text-emerald-400 mb-3.5 flex items-center gap-1.5 min-h-[20px]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="truncate">{cap.badge}</span>
                </div>

                {/* Description - Fixed 2-line height */}
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 h-[36px] mb-5">
                  {cap.description}
                </p>

                {/* Quick Specs List - Uniform Row Heights */}
                <div className="space-y-2.5 py-4 border-t border-b border-white/10 text-xs">
                  <div className="flex items-center justify-between text-neutral-300 h-[22px]">
                    <span className="text-neutral-400 flex items-center gap-1.5 shrink-0">
                      <Zap className="h-3.5 w-3.5 text-[#ff5a4e] shrink-0" /> Daily Output
                    </span>
                    <span className="font-bold text-white text-right truncate pl-2">
                      {cap.dailyUnits ? cap.dailyUnits.split(' / ')[0] : '—'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-300 min-h-[38px] gap-2">
                    <span className="text-neutral-400 flex items-center gap-1.5 shrink-0">
                      <LandPlot className="h-3.5 w-3.5 text-amber-400 shrink-0" /> Roof Area
                    </span>
                    <span className="font-bold text-white text-right leading-tight line-clamp-2 pl-2">
                      {cap.roofArea}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-300 h-[22px]">
                    <span className="text-neutral-400 flex items-center gap-1.5 shrink-0">
                      <IndianRupee className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Monthly Savings
                    </span>
                    <span className="font-bold text-emerald-400 text-right truncate pl-2">
                      {cap.monthlySavings ? cap.monthlySavings.split(' / ')[0] : '—'}
                    </span>
                  </div>
                </div>

                {/* Load Hint */}
                <div className="mt-4 text-[11px] text-neutral-400 flex items-center gap-1.5 h-[20px]">
                  <Gauge className="h-3.5 w-3.5 text-[#D71920] shrink-0" />
                  <span className="truncate">{cap.suitableFor}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-2">
                <Link
                  href={`/services/${cap.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#D71920] hover:bg-[#b01319] text-white text-xs font-bold transition-all shadow-md group-hover:shadow-red-500/25 cursor-pointer"
                >
                  <span>Explore {cap.kw} Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



/* ──────────────────────────────────────────────
   SECTION 5: SOLAR EPC
   ────────────────────────────────────────────── */

function EPCSection({ content }) {
  const eyebrow = content?.epcEyebrow || "Solar EPC"
  const titleHtml = content?.epcTitle || 'Engineering, Procurement & <span class="text-gradient-red">Construction</span>'
  const sub = content?.epcSubtitle || "Our turnkey EPC process ensures quality at every step — from initial planning to final commissioning and ongoing maintenance."
  const rawList = (content?.epcTimeline && content.epcTimeline.length > 0) ? content.epcTimeline : EPC_TIMELINE

  const items = rawList.map(item => ({
    ...item,
    icon: typeof item.icon === 'string' ? (ICON_MAP[item.icon] || Search) : (item.icon || Search)
  }))

  return (
    <section id="epc" className="py-20 md:py-28 bg-white scroll-mt-28 border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />}
          sub={sub}
        />

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-neutral-200" />

          {items.map((item, i) => {
            const Icon = item.icon
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={item.step || i}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp} custom={i * 0.5}
                className={`relative flex items-start gap-6 mb-10 md:mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#D71920] flex items-center justify-center z-10 shadow-sm">
                  <Icon className="h-5 w-5 text-[#D71920]" />
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="service-card-hover bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-sm">
                    <div className="text-xs font-bold text-[#D71920] tracking-wider uppercase mb-1">Step {String(i + 1).padStart(2, '0')}</div>
                    <h4 className="font-heading font-bold text-lg text-neutral-900">{item.step}</h4>
                    <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ApprovalSection({ content }) {
  const eyebrow = content?.approvalEyebrow || "Government Approvals"
  const titleHtml = content?.approvalTitle || 'Hassle-free <span class="text-gradient-red">approval process</span>'
  const sub = content?.approvalSubtitle || "Our liaison team handles the complete DISCOM approval, net metering, and subsidy documentation process."
  const rawList = (content?.approvalSteps && content.approvalSteps.length > 0) ? content.approvalSteps : APPROVAL_STEPS

  const steps = rawList.map(item => ({
    ...item,
    icon: typeof item.icon === 'string' ? (ICON_MAP[item.icon] || CheckCircle2) : (item.icon || CheckCircle2)
  }))

  return (
    <section id="approvals" className="py-20 md:py-28 bg-white scroll-mt-28 border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />}
          sub={sub}
        />

        {/* Process flow */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step || i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  className="relative"
                >
                  <div className="service-card-hover bg-white rounded-2xl p-5 border border-neutral-200/60 shadow-sm text-center h-full flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D71920] to-[#ff5a4e] flex items-center justify-center mb-3 shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-xs font-bold text-[#D71920] mb-1">Step {i + 1}</div>
                    <h4 className="font-bold text-sm text-neutral-900 leading-tight">{step.step}</h4>
                    <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{step.desc}</p>
                  </div>
                  {/* Arrow connector */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="h-4 w-4 text-[#D71920]" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function SupplySection({ content }) {
  const eyebrow = content?.supplyEyebrow || "Scope of Supply"
  const titleHtml = content?.supplyTitle || 'Premium <span class="text-gradient-red">Tier-1 components</span>'
  const sub = content?.supplySubtitle || "We source exclusively from certified Tier-1 manufacturers to ensure maximum performance, reliability, and warranty coverage."
  const rawList = (content?.supplyItems && content.supplyItems.length > 0) ? content.supplyItems : SUPPLY_ITEMS

  const items = rawList.map(item => ({
    ...item,
    icon: typeof item.icon === 'string' ? (ICON_MAP[item.icon] || Sun) : (item.icon || Sun)
  }))

  return (
    <section id="supply" className="py-20 md:py-28 bg-white scroll-mt-28 border-t border-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />}
          sub={sub}
        />

        {/* 21st.dev Dynamic Interactive Motion Grid */}
        <SupplyCardsMotion items={items} />
      </div>
    </section>
  )
}

function ComparisonSection({ content }) {
  const eyebrow = content?.comparisonEyebrow || "Why Choose Us"
  const titleHtml = content?.comparisonTitle || 'The IVR Energy <span class="text-gradient-red">advantage</span>'
  const sub = content?.comparisonSubtitle || "See how our engineering-first approach delivers superior outcomes compared to traditional solar EPC providers."
  const rows = (content?.comparisonData && content.comparisonData.length > 0) ? content.comparisonData : COMPARISON_DATA

  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />}
          sub={sub}
        />

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto bg-white rounded-3xl border border-neutral-200/60 overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-[580px]">
              {/* Header */}
              <div className="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200/60">
                <div className="p-4 md:p-5 font-bold text-sm text-neutral-500">Dimension</div>
                <div className="p-4 md:p-5 font-bold text-sm text-[#D71920] text-center">IVR Energy</div>
                <div className="p-4 md:p-5 font-bold text-sm text-neutral-500 text-center">Traditional EPC</div>
              </div>

              {/* Rows */}
              {rows.map((row, i) => (
                <motion.div
                  key={row.dim || i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="comparison-row grid grid-cols-3 border-b border-neutral-100 last:border-0"
                >
                  <div className="p-4 md:p-5 font-semibold text-sm text-neutral-900">{row.dim}</div>
                  <div className="p-4 md:p-5 text-sm text-neutral-700 text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-left">{row.ivr}</span>
                  </div>
                  <div className="p-4 md:p-5 text-sm text-neutral-500 text-center">{row.trad}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function WorkflowSection({ content }) {
  const eyebrow = content?.workflowEyebrow || "Our Process"
  const titleHtml = content?.workflowTitle || 'Your solar journey in <span class="text-gradient-red">8 seamless steps</span>'
  const sub = content?.workflowSubtitle || "A refined, transparent execution playbook honed across 500+ projects."
  const rawList = (content?.workflowSteps && content.workflowSteps.length > 0) ? content.workflowSteps : WORKFLOW_STEPS

  const steps = rawList.map(item => ({
    ...item,
    icon: typeof item.icon === 'string' ? (ICON_MAP[item.icon] || PhoneCall) : (item.icon || PhoneCall)
  }))

  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={<span dangerouslySetInnerHTML={{ __html: titleHtml }} />}
          sub={sub}
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-neutral-200" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title || i}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp} custom={i * 0.3}
                className="relative flex items-start gap-6 mb-8 last:mb-0"
              >
                {/* Number dot */}
                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-neutral-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-[#D71920]">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#D71920]" />
                </div>

                {/* Card */}
                <div className="flex-1 service-card-hover bg-white rounded-2xl p-5 md:p-6 border border-neutral-200/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-[#D71920] tracking-wider">STEP {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-neutral-900">{step.title}</h4>
                  <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



/* ──────────────────────────────────────────────
   SECTION 13: TESTIMONIALS
   ────────────────────────────────────────────── */

function ServicesReviewsSection({ reviews }) {
  const list = (reviews && reviews.length) ? reviews : REVIEWS_DATA
  const testimonials = list.map(r => ({
    author: {
      name: r.name,
      handle: r.role || "Rooftop Owner",
      avatar: r.avatar || r.image || r.img || r.photo || ""
    },
    text: r.text
  }))

  return (
    <TestimonialsSection
      title="What our clients say about our services"
      description="Real feedback from homeowners, commercial site managers, and industrial partners across Tamil Nadu."
      testimonials={testimonials}
      className="bg-white border-t border-neutral-100"
    />
  )
}

/* ──────────────────────────────────────────────
   SECTION 14: FAQ
   ────────────────────────────────────────────── */

function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const filtered = FAQ_DATA.filter(
    f => f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="FAQs"
          title={<>Common <span className="text-gradient-red">questions answered</span></>}
          sub="Everything you need to know about timelines, maintenance, subsidies, and monitoring."
        />

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D71920]/20 focus:border-[#D71920]/40 transition-all"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-neutral-200 bg-white px-6 data-[state=open]:border-[#D71920]/30 data-[state=open]:shadow-soft transition-all">
                <AccordionTrigger className="text-left hover:no-underline py-5 font-semibold text-neutral-900 text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-neutral-600 leading-relaxed pb-5 text-sm">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filtered.length === 0 && (
            <p className="text-center text-neutral-500 py-8">No matching questions found. Try a different search term.</p>
          )}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SECTION 15: FINAL CTA
   ────────────────────────────────────────────── */

function FinalCTASection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="relative rounded-[2rem] bg-gradient-to-br from-neutral-900 via-[#1a0505] to-neutral-950 text-white p-10 md:p-16 lg:p-20 overflow-hidden shadow-2xl border border-neutral-800 text-center max-w-5xl mx-auto"
        >
          {/* Glow effects */}
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#D71920]/30 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-500/10 blur-[100px]" />

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#D71920] mb-4"
            >
              Get Started Today
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold leading-tight">
              Ready to Generate Your Own{' '}
              <span className="text-gradient-red">Solar Power?</span>
            </h2>
            <p className="mt-5 text-neutral-400 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              Join 500+ satisfied customers who have made the switch to clean, affordable solar energy with IVR Energy.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-8 h-14 text-base font-bold shadow-glow-red transition-all hover:scale-105">
                <Link href="/contact">Get Free Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 text-white rounded-full px-8 h-14 text-base font-semibold backdrop-blur transition-all hover:scale-105">
                <Link href="/contact">Talk to Expert</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 text-white rounded-full px-8 h-14 text-base font-semibold backdrop-blur transition-all hover:scale-105">
                <a href="tel:919047777936"><Phone className="mr-2 h-4 w-4" /> Call Now</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   SCROLL TO TOP
   ────────────────────────────────────────────── */

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white shadow-glow-red transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function ServicesPage() {
  const [content, setContent] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => {})

    fetch('/api/reviews')
      .then(r => r.json())
      .then(j => setReviews(j.reviews || []))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-neutral-900">
      <Navbar content={content} />

      <HeroSection content={content} />
      <StickyServiceNav />
      <CapacitySizingSection />
      <ServicesGridSection content={content} />
      <EPCSection content={content} />
      <ApprovalSection content={content} />
      <SupplySection content={content} />
      <ComparisonSection content={content} />
      <WorkflowSection content={content} />
      <ServicesReviewsSection reviews={reviews} />
      <FAQSection />
      <FinalCTASection />

      <Footer content={content} />
      <ScrollToTop />
    </div>
  )
}
