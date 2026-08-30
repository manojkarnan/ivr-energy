'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileText,
  Gauge,
  HardHat,
  Home,
  Building2,
  Factory,
  Wheat,
  Car,
  PanelsTopLeft,
  PenTool,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
  LandPlot,
  IndianRupee,
  ChevronDown
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { SOLAR_CAPACITIES_DATA, sortCapacitiesAscending } from '@/data/capacities'
import { ALL_LANDING_PAGES_LIST } from '@/data/landingPages'

/* ──────────────────────────────────────────────
   SOLUTIONS DATA
   ────────────────────────────────────────────── */

const SOLUTIONS = [
  {
    id: 'residential',
    num: '01',
    title: 'Residential Rooftop Solar',
    subtitle: 'Villas, Gated Communities & Independent Homes',
    badge: 'PM Surya Ghar Subsidy Eligible',
    desc: 'Turnkey on-grid rooftop solar systems engineered to eliminate bi-monthly power bills. Fast-tracked with TANGEDCO bi-directional net-metering and direct central government DBT subsidy assistance.',
    specs: [
      { label: 'System Range', val: '3 kW – 10 kW' },
      { label: 'Monthly Generation', val: '360 – 1,200 Units' },
      { label: 'Payback Timeline', val: '2.5 – 3.2 Years' },
      { label: 'Roof Area', val: '300 – 1,000 Sq. Ft.' },
    ],
    highlights: [
      'Up to ₹78,000 direct bank DBT subsidy under PM Surya Ghar Yojana',
      'High-efficiency Tier-1 TOPCon / Mono-PERC bi-facial modules',
      'Dual-MPPT smart inverters with Wi-Fi real-time phone tracking',
      'Hot-dip galvanized (80µm) structure tested for 160 km/h wind gusts',
    ],
  },
  {
    id: 'commercial',
    num: '02',
    title: 'Commercial Rooftop EPC',
    subtitle: 'Hospitals, Institutions, Offices & Hotels',
    badge: '40% Accelerated Tax Depreciation',
    desc: 'High-capacity commercial rooftop solar systems (10 kW to 100 kW+) designed to offset high-tier commercial electricity tariffs and lower recurring operational overheads.',
    specs: [
      { label: 'System Range', val: '10 kW – 100 kW+' },
      { label: 'Monthly Generation', val: '1,200 – 12,000 Units' },
      { label: 'Payback Timeline', val: '2.8 – 3.5 Years' },
      { label: 'Tax Advantage', val: '40% Year-1 Depreciation' },
    ],
    highlights: [
      'Cuts daytime peak commercial energy bills by up to 70%',
      'Section 32 Accelerated Depreciation corporate tax benefits',
      'Three-phase commercial string inverters with integrated SCADA',
      'Full CEIG electrical safety certification and DISCOM clearance',
    ],
  },
  {
    id: 'industrial',
    num: '03',
    title: 'Industrial Captive Power Plants',
    subtitle: 'Textile Mills, Foundries, Chemical & Manufacturing',
    badge: 'High-Tension (HT) Grid Evacuation',
    desc: 'Megawatt-scale rooftop and ground captive solar installations engineered for heavy continuous machinery loads, with complete HT substation synchronization and wheeling & banking liaison.',
    specs: [
      { label: 'System Range', val: '100 kW – 5 MW+' },
      { label: 'Grid Level', val: '11kV / 22kV / 33kV HT' },
      { label: 'Levelized Cost', val: '< ₹2.50 / Unit' },
      { label: 'Monitoring', val: 'Industrial SCADA / Telemetry' },
    ],
    highlights: [
      'Drastically lowers industrial power costs from ₹9.50+ to under ₹2.50/unit',
      'Complete HT transformer, switchgear, and vacuum circuit breaker EPC',
      'Harmonic distortion suppression and power factor optimization',
      'Thermal drone thermography and automated preventive washing',
    ],
  },
  {
    id: 'agricultural',
    num: '04',
    title: 'Agricultural & Hybrid Storage (BESS)',
    subtitle: 'Farms, Plantations, Cold Storage & Microgrids',
    badge: 'PM-KUSUM & Battery Storage',
    desc: 'Off-grid and hybrid solar installations with Battery Energy Storage Systems (BESS) for continuous daytime agricultural pumping and uninterrupted remote facility power.',
    specs: [
      { label: 'Pump Capacity', val: '5 HP – 25 HP' },
      { label: 'Storage Chemistry', val: 'Lithium Ferro Phosphate (LFP)' },
      { label: 'Failover Speed', val: '< 10ms UPS Transfer' },
      { label: 'Autonomy', val: '8 – 12 Hours Storage' },
    ],
    highlights: [
      'Reliable, unthrottled daytime water pumping for high-yield farming',
      'Lithium battery banks with 6,000+ cycle life (15-year durability)',
      'Automated generator synchronization during prolonged monsoon clouds',
      'PM-KUSUM subsidy guidance and agricultural compliance support',
    ],
  },
  {
    id: 'carport',
    num: '05',
    title: 'EV Solar Carports & Canopies',
    subtitle: 'Corporate Campuses, Malls & Fleet Depots',
    badge: 'Integrated EV Fast Charging',
    desc: 'Architectural solar car shade structures integrated with Level-2 AC and CCS2 DC fast charging stations, transforming unused parking spaces into clean power generators.',
    specs: [
      { label: 'Scale', val: '2 to 500+ Car Bays' },
      { label: 'EV Charging', val: '7.4 kW AC to 60 kW DC' },
      { label: 'Framing', val: 'Engineered Cantilever Steel' },
      { label: 'Cable Routing', val: 'Concealed Water Gutters' },
    ],
    highlights: [
      'Dual functionality: vehicle sun/rain protection + renewable power generation',
      'Integrated smart load-balancing EV charging points',
      'Engineered structural aesthetics with optional nighttime LED accents',
      'High-visibility corporate ESG asset for green-certified facilities',
    ],
  },
  {
    id: 'ground',
    num: '06',
    title: 'Utility Ground-Mounted Farms',
    subtitle: 'Independent Power Producers (IPP) & Open Access',
    badge: 'Turnkey Land-to-Grid EPC',
    desc: 'Utility-scale solar power generation plants on agricultural or barren land. Includes topographical contour mapping, piling foundations, automated single-axis solar trackers, and transmission lines.',
    specs: [
      { label: 'Land Sizing', val: '3.5 – 4 Acres / MW' },
      { label: 'Annual Yield', val: '15 – 17 Lakh Units / MW' },
      { label: 'Grid Tie-In', val: '33kV / 66kV / 110kV' },
      { label: 'Design Life', val: '25 – 30 Years' },
    ],
    highlights: [
      'Turnkey land feasibility, soil analysis, and contour grading',
      'Optional single-axis astronomical trackers for +18% higher power yield',
      'Dedicated transmission line erection and sub-station bay setup',
      'Full statutory PPA, CEIG, and environmental approvals management',
    ],
  },
]

const COMPARISON = [
  {
    attribute: 'Grid Interconnection',
    onGrid: 'Exports surplus electricity to the grid via Net Meter',
    hybrid: 'Operates with grid, battery, or solar in parallel',
    offGrid: 'Completely disconnected from the state electricity grid',
  },
  {
    attribute: 'Outage Continuity',
    onGrid: 'Shuts down during grid cuts for line safety',
    hybrid: 'Instant switchover (<10ms) powers priority loads',
    offGrid: 'Full 24/7 autonomous battery power',
  },
  {
    attribute: 'Capital Expenditure',
    onGrid: 'Lowest initial cost; fastest payback (2.5–3 yrs)',
    hybrid: 'Moderate (includes lithium storage system)',
    offGrid: 'Higher (requires heavy battery capacity)',
  },
  {
    attribute: 'PM Surya Ghar Subsidy',
    onGrid: 'Eligible for up to ₹78,000 direct subsidy',
    hybrid: 'Eligible on the solar module component',
    offGrid: 'Not eligible for standard grid net-meter subsidy',
  },
]

/* ──────────────────────────────────────────────
   SOLUTIONS PAGE (LIGHT THEME — MATCHED TO SITE)
   ────────────────────────────────────────────── */

export default function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState(SOLUTIONS[0].id)
  const [capacities, setCapacities] = useState(sortCapacitiesAscending(SOLAR_CAPACITIES_DATA))
  const [landingPages, setLandingPages] = useState(ALL_LANDING_PAGES_LIST)
  const [content, setContent] = useState(null)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((j) => setContent(j.content || j))
      .catch(() => {})

    fetch('/api/capacities')
      .then((r) => r.json())
      .then((j) => {
        if (Array.isArray(j.capacities) && j.capacities.length > 0) {
          setCapacities(sortCapacitiesAscending(j.capacities))
        }
      })
      .catch(() => {})

    fetch('/api/landing-pages')
      .then((r) => r.json())
      .then((j) => {
        if (Array.isArray(j.landingPages) && j.landingPages.length > 0) {
          setLandingPages(j.landingPages)
        }
      })
      .catch(() => {})
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Residential Solar (3kW–10kW)',
    message: '',
  })

  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const handleOpenConsult = (interestTitle) => {
    setFormData((prev) => ({ ...prev, interest: interestTitle || 'Custom Solar Solution' }))
    setQuoteModalOpen(true)
  }

  const handleSubmitLead = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast.success('Thank you. A solar engineer will connect with you shortly.')
        setQuoteModalOpen(false)
        setFormData({ name: '', phone: '', email: '', interest: 'Residential Solar (3kW–10kW)', message: '' })
      } else {
        toast.error('Submission failed. Please call us directly.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const solutionsHeroTitle = content?.solutionsHeroTitle || 'Engineered systems for every <span class="font-normal bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">scale</span> of power generation.'
  const solutionsHeroSubtitle = content?.solutionsHeroSubtitle || 'From residential villas with direct PM Surya Ghar subsidy integration to high-tension MW captive industrial plants, we deliver precision solar turnkey installations built for 25+ years of verified output.'
  const solutionsList = (content?.solutionsList && content.solutionsList.length > 0) ? content.solutionsList : SOLUTIONS
  const solutionsComparison = (content?.solutionsComparison && content.solutionsComparison.length > 0) ? content.solutionsComparison : COMPARISON
  const solutionsCtaTitle = content?.solutionsCtaTitle || 'Evaluate your premises for turnkey solar.'
  const solutionsCtaDesc = content?.solutionsCtaDesc || 'Schedule a comprehensive site evaluation with our engineers to receive a shadow analysis, single-line diagram (SLD), and commercial ROI breakdown.'

  const activeSolution = solutionsList.find((s) => s.id === selectedSolution) || solutionsList[0] || SOLUTIONS[0]

  return (
    <div className="min-h-screen bg-[#ffffff] text-neutral-900 antialiased selection:bg-[#D71920] selection:text-white">
      <Navbar onQuote={() => setQuoteModalOpen(true)} content={content} />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Subtle Ambient Warm Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-b from-red-100/40 via-orange-50/20 to-transparent blur-3xl pointer-events-none" />

        {/* ──────── 01. EDITORIAL HERO ──────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 leading-[1.12] sm:leading-[1.08]"
            dangerouslySetInnerHTML={{ __html: solutionsHeroTitle }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-600 font-light max-w-4xl leading-relaxed"
          >
            {solutionsHeroSubtitle}
          </motion.p>
        </section>

        {/* ──────── 02. SEGMENT SELECTOR & SOLUTIONS ──────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-24 relative z-10">
          {/* Segment Navigation Tabs (Scrollable on mobile) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 p-1.5 sm:p-2 bg-neutral-100/90 backdrop-blur-md rounded-2xl max-w-4xl mx-auto mb-6 sm:mb-10 border border-neutral-200/80 shadow-sm overflow-x-auto no-scrollbar scroll-smooth">
            {solutionsList.map((s) => {
              const isSelected = selectedSolution === s.id
              const IconComp = s.id === 'residential' ? Home : s.id === 'commercial' ? Building2 : s.id === 'industrial' ? Factory : s.id === 'agricultural' ? Wheat : s.id === 'carport' ? Car : Sun
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSolution(s.id)}
                  className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D71920] text-white shadow-md shadow-red-600/25 scale-[1.02]'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/80'
                  }`}
                >
                  <IconComp className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isSelected ? 'text-white' : 'text-[#D71920]'}`} />
                  <span>{s.title.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>

          {/* Active Solution Focus Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolution.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-[28px] sm:rounded-[32px] bg-white p-5 sm:p-8 lg:p-12 border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden"
            >
              {/* Subtle Ambient Red Flare */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />

              {/* Left Column: Solution Narrative & Highlights */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight pt-1">
                    {activeSolution.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                    {activeSolution.subtitle}
                  </p>
                </div>

                <p className="text-neutral-600 font-light leading-relaxed text-sm sm:text-base">
                  {activeSolution.desc}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {(activeSolution.highlights || []).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50/80 border border-neutral-100 text-xs sm:text-sm text-neutral-700 font-normal">
                      <div className="w-5 h-5 rounded-full bg-red-100/80 text-[#D71920] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        ✓
                      </div>
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      className="w-full sm:w-auto bg-[#D71920] hover:bg-red-700 text-white font-semibold px-6 sm:px-7 py-4 sm:py-5 rounded-xl text-sm shadow-lg shadow-red-600/20 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Request Technical Proposal</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/919047777936"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-sm text-emerald-600 hover:text-emerald-700 font-semibold px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 transition-colors gap-1.5"
                  >
                    <span>WhatsApp Quick Sizing</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Engineering Specs Dashboard */}
              <div className="lg:col-span-5 rounded-2xl sm:rounded-[28px] bg-gradient-to-b from-neutral-50 to-red-50/30 p-5 sm:p-7 border border-red-100/80 shadow-sm space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">Engineering Specs</span>
                  </div>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {(activeSolution.specs || []).map((spec, i) => {
                    const SpecIcon = i === 0 ? Zap : i === 1 ? Gauge : i === 2 ? IndianRupee : LandPlot
                    return (
                      <div key={i} className="p-3 sm:p-3.5 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs flex flex-col justify-center gap-1 hover:border-red-200 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-red-50 text-[#D71920] flex items-center justify-center shrink-0">
                            <SpecIcon className="h-3.5 w-3.5 text-[#D71920]" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400">{spec.label}</span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-neutral-900 pl-8 leading-snug">
                          {spec.val}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ──────── 03. ROOFTOP SOLAR SIZING PACKAGES (3kW, 4kW, 5kW, 10kW+) ──────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 mt-1 tracking-tight">
              Explore <span className="font-normal bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">3 kW, 4 kW, 5 kW &amp; 10 kW+</span> Systems
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2 sm:mt-3 font-light">
              Select any capacity below to view its complete technical specifications, appliance compatibility, daily yield estimates, and PM Surya Ghar subsidy details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {capacities.map((cap, i) => (
              <div
                key={cap.id}
                className="group relative rounded-2xl sm:rounded-3xl bg-white text-neutral-900 p-5 sm:p-7 border border-neutral-200/80 flex flex-col justify-between overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:border-red-200 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-100/40 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                <div>
                  <Link href={`/services/${cap.slug || `${cap.id}-solar-system`}`} className="block group/title">
                    <div className="text-3xl sm:text-4xl font-black text-neutral-900 group-hover/title:text-[#D71920] transition-colors tracking-tight mb-2 flex items-center">
                      {cap.kw}
                    </div>
                  </Link>

                  <div className="flex items-center mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/80 whitespace-nowrap">
                      {cap.tag}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-emerald-600 mb-3.5 flex items-center gap-1.5 min-h-[20px]">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="truncate">{cap.badge}</span>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 h-[34px] mb-5 font-light">
                    {cap.description}
                  </p>

                  <div className="space-y-3 py-4 border-t border-b border-neutral-100 text-xs">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="text-neutral-500 flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-[#D71920] shrink-0" /> Daily Output
                      </span>
                      <span className="font-bold text-neutral-900">
                        {cap.dailyUnits ? cap.dailyUnits.split(' / ')[0] : '—'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="text-neutral-500 flex items-center gap-1.5">
                        <LandPlot className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Roof Area
                      </span>
                      <span className="font-bold text-neutral-900 text-right leading-tight max-w-[55%] truncate">
                        {cap.roofArea ? cap.roofArea.split(' (')[0] : '—'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-600">
                      <span className="text-neutral-500 flex items-center gap-1.5">
                        <IndianRupee className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Monthly Savings
                      </span>
                      <span className="font-bold text-emerald-600">
                        {cap.monthlySavings ? cap.monthlySavings.split(' / ')[0] : '—'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-[11px] text-neutral-500 flex items-center gap-1.5 mb-6">
                    <Gauge className="h-3.5 w-3.5 text-[#D71920] shrink-0" />
                    <span className="truncate">{cap.suitableFor}</span>
                  </div>
                </div>

                <div>
                  <Link href={`/services/${cap.slug || `${cap.id}-solar-system`}`} className="block w-full">
                    <Button
                      className="w-full bg-[#D71920] hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore {cap.kw} Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────── 04. HIGH-INTENT CHENNAI SOLAR GUIDES & DIRECTORY ──────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight">
              Specialized <span className="font-normal bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">Solar Solutions</span> for Chennai &amp; Tamil Nadu
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2 font-light max-w-2xl mx-auto">
              Direct technical guides, PM Surya Ghar subsidy details, pricing breakdowns, and TANGEDCO net metering procedures.
            </p>
          </div>

          {/* Single Line Text Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
            {landingPages.map((lp) => (
              <Link
                key={lp.slug}
                href={`/${lp.slug}`}
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white border border-neutral-200/80 hover:border-red-300 hover:shadow-sm hover:bg-red-50/20 transition-all duration-200"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-[#D71920] transition-colors truncate">
                    {lp.h1}
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-[#D71920] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* ──────── 05. SYSTEM COMPARISON MATRIX ──────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 relative z-10">
          <div className="border-b border-neutral-200 pb-5 sm:pb-7 mb-8 sm:mb-10">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#D71920]">Topology</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mt-2 tracking-tight">
              Grid-Tied vs. Hybrid vs. Off-Grid
            </h2>
          </div>

          <div className="sm:hidden text-xs font-mono text-neutral-400 mb-3 flex items-center gap-2">
            <ArrowRight className="h-3.5 w-3.5 text-[#D71920]" /> Swipe horizontally to view full matrix
          </div>

          <div className="overflow-x-auto rounded-[28px] sm:rounded-[32px] border border-neutral-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            <table className="min-w-[700px] w-full text-left text-base text-neutral-600">
              <thead className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 border-b border-neutral-200 pb-4">
                <tr>
                  <th className="py-5 pr-6 font-bold">Attribute</th>
                  <th className="py-5 px-6 text-[#D71920] font-bold text-sm sm:text-base">On-Grid (Net Metered)</th>
                  <th className="py-5 px-6 text-amber-600 font-bold text-sm sm:text-base">Hybrid (BESS)</th>
                  <th className="py-5 pl-6 text-neutral-800 font-bold text-sm sm:text-base">Off-Grid (Standalone)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {solutionsComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-red-50/40 transition-colors">
                    <td className="py-6 sm:py-7 pr-6 font-mono text-xs sm:text-sm font-bold text-neutral-500 uppercase leading-snug">
                      {row.attribute}
                    </td>
                    <td className="py-6 sm:py-7 px-6 text-sm sm:text-base text-neutral-800 font-normal leading-relaxed">
                      {row.onGrid}
                    </td>
                    <td className="py-6 sm:py-7 px-6 text-sm sm:text-base text-neutral-800 font-normal leading-relaxed">
                      {row.hybrid}
                    </td>
                    <td className="py-6 sm:py-7 pl-6 text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
                      {row.offGrid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ──────── 05. AEO & SEARCH ENGINE KNOWLEDGE SECTION ──────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#D71920]">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 mt-1 tracking-tight">
              Solar Solutions &amp; Subsidy Questions
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-2 font-light max-w-xl mx-auto">
              Direct technical facts on subsidies, payback periods, and grid liaison for Tamil Nadu installations.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How much subsidy can I get under PM Surya Ghar for residential rooftop solar?',
                a: 'Under the PM Surya Ghar: Muft Bijli Yojana, eligible homeowners receive a direct bank transfer (DBT) central subsidy of ₹33,000 for 1 kW, ₹66,000 for 2 kW, and up to ₹78,000 for 3 kW and larger systems. IVR Energy handles all portal registrations, DISCOM inspections, and subsidy clearance documentation end-to-end.'
              },
              {
                q: 'What is the difference between On-Grid, Hybrid (BESS), and Off-Grid systems?',
                a: 'On-Grid solar connects directly with TANGEDCO to export daytime surplus power via a bi-directional net meter, delivering the fastest 2.5–3 year ROI. Hybrid systems incorporate lithium battery storage (BESS) for seamless instant power during grid cuts. Off-Grid systems operate 100% autonomously in remote farms or agricultural facilities without grid connectivity.'
              },
              {
                q: 'What corporate tax benefits apply to Commercial & Industrial solar in India?',
                a: 'Under Section 32 of the Indian Income Tax Act, commercial enterprises and factories can claim 40% Accelerated Depreciation (AD) in the first year of commissioning their solar asset, creating substantial tax write-offs in addition to lowering recurring peak power bills.'
              },
              {
                q: 'What hardware warranties are provided on IVR Energy installations?',
                a: 'We deploy Tier-1 TOPCon and Mono-PERC bi-facial modules backed by a 25 to 30-year linear performance warranty (>85% output guaranteed at Year 25), paired with IP65 smart grid-tied string inverters with 5 to 10-year standard manufacturer replacement warranties and hot-dip galvanized mounting structures tested for 160 km/h wind gusts.'
              },
              {
                q: 'How does TANGEDCO Bi-Directional Net Metering work in Tamil Nadu?',
                a: 'Your existing electricity meter is replaced with a bi-directional digital net meter. Solar power generated during peak daylight powers your active premises first. Any surplus electricity is exported to the grid and credited against your nighttime units, reducing your bi-monthly bill to the minimum fixed charge.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-neutral-200/80 overflow-hidden shadow-2xs transition-all hover:border-red-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-neutral-900 cursor-pointer gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#D71920] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* ──────── 06. MINIMALIST INVITATION / CTA ──────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-32 relative z-10">
          <div className="relative p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-center space-y-5 sm:space-y-6 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-tight">
              {solutionsCtaTitle}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-base max-w-xl mx-auto font-light leading-relaxed">
              {solutionsCtaDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto bg-[#D71920] hover:bg-red-700 text-white font-bold px-7 sm:px-8 py-4 sm:py-5 rounded-xl text-sm shadow-lg shadow-red-600/30 hover:scale-105 transition-all cursor-pointer"
                >
                  {content?.solutionsCtaButtonText || 'Schedule Site Audit'}
                </Button>
              </Link>
              <a
                href="https://wa.me/919047777936"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-sm text-emerald-400 hover:text-emerald-300 px-5 py-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 font-medium transition-colors"
              >
                WhatsApp Direct <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ──────── CONSULTATION MODAL ──────── */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#D71920]" />
                  <span>Proposal Request</span>
                </div>
                <button
                  onClick={() => setQuoteModalOpen(false)}
                  className="text-neutral-400 hover:text-neutral-900 text-xs font-mono uppercase tracking-wider"
                >
                  Close [esc]
                </button>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                    Full Name
                  </label>
                  <Input
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 rounded-lg text-sm h-10 focus:border-[#D71920]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Phone Number
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 rounded-lg text-sm h-10 focus:border-[#D71920]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Email (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 rounded-lg text-sm h-10 focus:border-[#D71920]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                    Solar Solution Type
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#D71920] h-10"
                  >
                    <option value="Residential Solar (3kW–10kW)">Residential Rooftop (3kW – 10kW)</option>
                    <option value="Commercial Solar (10kW–100kW)">Commercial Rooftop (Offices & Hospitals)</option>
                    <option value="Industrial Solar (100kW–1MW+)">Industrial Captive (100kW – 5MW)</option>
                    <option value="Agricultural / Off-Grid Solar">Agricultural & Hybrid BESS</option>
                    <option value="EV Solar Carport Canopies">EV Solar Carports</option>
                    <option value="Utility Ground-Mounted Solar">Utility Ground-Mounted Solar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                    Location / Roof Details
                  </label>
                  <Textarea
                    placeholder="City / location or approximate monthly bill..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 rounded-lg text-sm h-20 focus:border-[#D71920]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D71920] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-red-600/20 transition-all"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer content={content} />
    </div>
  )
}
