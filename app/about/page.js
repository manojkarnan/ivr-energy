'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  Shield,
  ShieldCheck,
  Zap,
  Target,
  Award,
  Layers,
  Sparkles,
  Sun,
  Users,
  Building2,
  Factory,
  Home,
  HardHat,
  Gauge
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Timeline } from '@/components/ui/timeline'
import { companyStats } from '@/data/companyStats'

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */




const TIMELINE = [
  {
    year: '2018',
    title: 'Establishment & Foundation',
    desc: 'Founded with a core focus on precision solar structural engineering and specialized electrical consulting in Tamil Nadu.',
  },
  {
    year: '2020',
    title: 'Commercial Scale & Expansion',
    desc: 'Expanded turnkey rooftop EPC services to hospitals, colleges, and commercial complexes across Chennai and industrial hubs.',
  },
  {
    year: '2022',
    title: 'MW-Scale Industrial Captive Plants',
    desc: 'Delivered HT grid-connected captive installations for textile, chemical, and precision manufacturing sectors.',
  },
  {
    year: '2024',
    title: 'PM Surya Ghar National Empanelment',
    desc: 'Accredited with national nodal agencies for fast-track DBT subsidy disbursal and residential villa solar solutions.',
  },
  {
    year: '2026',
    title: 'Smart IoT, Storage & EV Solar Carports',
    desc: 'Pioneering integrated hybrid storage systems, smart microgrids, and bi-directional EV charging solar canopies.',
  },
]

const VALUES = [
  {
    title: 'Engineering Rigor',
    desc: 'Every layout is verified through computational solar irradiance and shading simulations to maximize lifetime kWh output.',
  },
  {
    title: 'Absolute Transparency',
    desc: 'No hidden clauses or subcontracted delays. Transparent Bill of Materials (BOM) with genuine Tier-1 manufacturer warranties.',
  },
  {
    title: 'Enduring Stewardship',
    desc: 'We treat every solar plant as a quarter-century infrastructure asset, backed by dedicated SLA maintenance teams.',
  },
]

/* ──────────────────────────────────────────────
   ABOUT PAGE (LIGHT THEME — MATCHED TO SITE)
   ────────────────────────────────────────────── */

export default function AboutPage() {
  const [content, setContent] = useState(null)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', interest: 'About Us Consultation', message: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        const c = data?.content || data
        if (c) setContent(c)
      })
      .catch(() => {})
  }, [])

  const handleSubmitLead = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please provide your name and phone number.')
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
        setFormData({ name: '', phone: '', email: '', interest: 'About Us Consultation', message: '' })
      } else {
        toast.error('Submission failed. Please call our direct helpline.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const heroTitle = content?.aboutHeroTitle || 'Engineering renewable power with <span class="font-normal bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">clarity</span>, <span class="font-normal text-neutral-900">precision</span>, and <span class="font-normal bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">integrity</span>.'
  const heroDesc = content?.aboutHeroDescription || 'IVR Energy is a premier Solar EPC contractor based in Tamil Nadu. We engineer, procure, and construct high-yield rooftop and captive solar assets for homeowners, commercial institutions, and industrial leaders across India.'
  const missionHeading = content?.aboutMissionHeading || 'Our Mission & Purpose'
  const missionP1 = content?.aboutMissionP1 || `At <strong class="font-semibold text-neutral-900">IVR Energy</strong>, we believe the transition to clean solar energy should be transparent, high-yielding, and built to last. With over ${companyStats.experience} of dedicated solar EPC experience across Tamil Nadu, we treat every installation as a multi-decade critical infrastructure asset.`
  const missionP2 = content?.aboutMissionP2 || 'Our engineering methodology eliminates the guesswork from renewable power. By conducting precision 3D shadow simulations, utilizing Tier-1 TOPCon and Mono-PERC modules, and installing hot-dip galvanized structures tested for high-velocity winds, we guarantee maximum kilowatt-hour generation.'
  const missionP3 = content?.aboutMissionP3 || 'From independent homes securing direct PM Surya Ghar DBT subsidies to multi-megawatt industrial captive power plants, we take complete turnkey ownership—managing DISCOM net-metering liaison, CEIG safety clearances, and lifetime cloud SCADA performance tracking.'
  const timelineData = (content?.aboutTimeline && content.aboutTimeline.length > 0) ? content.aboutTimeline : TIMELINE
  const valuesData = (content?.aboutValues && content.aboutValues.length > 0) ? content.aboutValues : VALUES
  const ctaTitle = content?.aboutCtaTitle || 'Begin your solar feasibility assessment.'
  const ctaDesc = content?.aboutCtaDesc || 'Connect directly with our engineering team for an exact irradiance report, system capacity sizing, and subsidy overview.'

  return (
    <div className="min-h-screen bg-[#ffffff] text-neutral-900 antialiased selection:bg-[#D71920] selection:text-white">
      <Navbar onQuote={() => setQuoteModalOpen(true)} content={content} />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        {/* Subtle Ambient Warm Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-b from-red-100/40 via-orange-50/20 to-transparent blur-3xl pointer-events-none" />

        {/* ──────── 01. EDITORIAL HERO ──────── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.08]"
            dangerouslySetInnerHTML={{ __html: heroTitle }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-neutral-600 font-light max-w-4xl leading-relaxed"
          >
            {heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-200"
          >
            <Link href="/contact">
              <Button
                className="bg-[#D71920] hover:bg-red-700 text-white font-semibold px-7 py-5 rounded-xl text-sm shadow-lg shadow-red-600/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Consult an Engineer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                variant="ghost"
                className="text-neutral-500 hover:text-[#D71920] hover:bg-red-50 font-normal text-sm px-6 py-5 rounded-xl"
              >
                View Solutions <ArrowUpRight className="ml-1.5 h-4 w-4 text-[#D71920]" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* ──────── 03. MISSION & CORE ARCHITECTURE ──────── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 sm:mt-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Heading & Detailed Narrative */}
            <div className="md:col-span-5 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight leading-tight">
                {missionHeading}
              </h2>
              <div className="space-y-3.5 text-sm text-neutral-600 font-light leading-relaxed pt-1">
                <p dangerouslySetInnerHTML={{ __html: missionP1 }} />
                <p dangerouslySetInnerHTML={{ __html: missionP2 }} />
                <p dangerouslySetInnerHTML={{ __html: missionP3 }} />
              </div>
            </div>

            {/* Right Column: Brief Key Pillars Centered */}
            <div className="md:col-span-7 space-y-3.5 my-auto">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-red-200/80 hover:shadow-md transition-all flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D71920] border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="h-4.5 w-4.5 text-[#D71920]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-0.5">
                    {content?.aboutMissionCardTitle || 'Our Mission'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {content?.aboutMissionCardDesc || 'Deliver zero-headache, high-yield rooftop solar for homes, businesses, and industrial plants.'}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-red-200/80 hover:shadow-md transition-all flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D71920] border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="h-4.5 w-4.5 text-[#D71920]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-0.5">
                    {content?.aboutPurposeCardTitle || 'Our Purpose'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {content?.aboutPurposeCardDesc || 'Accelerate clean energy adoption through precision engineering and Tier-1 hardware.'}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-red-200/80 hover:shadow-md transition-all flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#D71920] border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#D71920]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-0.5">
                    {content?.aboutTurnkeyCardTitle || 'Turnkey Assurance'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {content?.aboutTurnkeyCardDesc || 'End-to-end execution: shadow analysis, DISCOM net-metering, and direct DBT subsidies.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────── 05. TIMELINE / MILESTONES (Aceternity UI) ──────── */}
        <section className="mt-24 sm:mt-32 relative z-10">
          <Timeline
            title={content?.aboutTimelineTitle || "Evolution & Growth"}
            description={content?.aboutTimelineSubtitle || "Key milestones in IVR Energy's journey from foundation to industry leadership."}
            data={timelineData.map((item) => ({
              title: item.year,
              content: (
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ),
            }))}
          />
        </section>

        {/* ──────── 06. CORE VALUES ──────── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 sm:mt-32 relative z-10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D71920]">
              {content?.aboutValuesEyebrow || 'Our Principles'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mt-1 tracking-tight">
              {content?.aboutValuesTitle || 'Core Values'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4" style={{ perspective: '1200px' }}>
            {valuesData.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  rotateY: idx === 0 ? 6 : idx === 2 ? -6 : 0,
                  rotateX: -4,
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.35, ease: 'easeOut' }
                }}
                className="relative bg-white rounded-[28px] p-7 sm:p-8 border border-neutral-200/80 space-y-4 cursor-default overflow-hidden"
                style={{
                  boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06), 0 12px 40px -8px rgba(0,0,0,0.08), 0 -1px 0 0 rgba(255,255,255,0.8) inset, 0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                {/* Ambient light effect */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-red-100/60 to-orange-50/30 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200/40 to-transparent" />

                {/* 3D Icon */}
                <div
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/80 flex items-center justify-center border border-red-200/50 relative"
                  style={{
                    transform: 'translateZ(20px)',
                    boxShadow: '0 4px 12px -2px rgba(215,25,32,0.15), 0 2px 4px rgba(215,25,32,0.08)',
                  }}
                >
                  <span className="text-[#D71920] text-xl">✦</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 font-light leading-relaxed">{v.desc}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#D71920]/20 to-transparent" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── 07. MINIMALIST INVITATION / CTA ──────── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24 sm:mt-32 relative z-10">
          <div className="relative p-10 sm:p-14 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-center space-y-6 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              {ctaTitle}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
              {ctaDesc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <Button
                  className="bg-[#D71920] hover:bg-red-700 text-white font-bold px-8 py-5 rounded-xl text-sm shadow-lg shadow-red-600/30 hover:scale-105 transition-all cursor-pointer"
                >
                  {content?.aboutCtaButtonText || 'Request Site Assessment'}
                </Button>
              </Link>
              <a
                href="https://wa.me/919047777936"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 px-5 py-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 font-medium transition-colors"
              >
                Direct WhatsApp Contact <ArrowUpRight className="ml-1.5 h-4 w-4" />
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
                  <span>Engineering Consultation</span>
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
                    Application Segment
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#D71920] h-10"
                  >
                    <option value="Residential Solar (3kW–10kW)">Residential Rooftop (3kW – 10kW)</option>
                    <option value="Commercial Solar (10kW–100kW)">Commercial Rooftop (Offices & Hospitals)</option>
                    <option value="Industrial Solar (100kW–1MW+)">Industrial Captive (100kW – 5MW)</option>
                    <option value="Ground-Mounted Solar">Utility Ground-Mounted Solar</option>
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
