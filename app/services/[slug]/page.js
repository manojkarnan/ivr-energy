'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, LandPlot, IndianRupee, TrendingUp, ShieldCheck, Award, Gauge,
  CheckCircle2, ArrowRight, PhoneCall, ChevronRight, HelpCircle,
  FileCheck, Shield, Sparkles, Home, Building2, Sun, Cable, Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getCapacityBySlug, SOLAR_CAPACITIES_DATA, sortCapacitiesAscending } from '@/data/capacities'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function CapacityDetailPage({ params }) {
  const { slug } = use(params)
  const defaultCap = getCapacityBySlug(slug) || SOLAR_CAPACITIES_DATA[0]
  const [capacities, setCapacities] = useState(sortCapacitiesAscending(SOLAR_CAPACITIES_DATA))
  const [content, setContent] = useState(null)
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', address: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => {})

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
  const clean = (slug || '').toLowerCase().trim()
  const cap = sortedList.find(c => c.id === clean || c.slug === clean || (c.aliases && c.aliases.includes(clean))) || defaultCap

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city || 'Tamil Nadu',
          projectType: `${cap.kw} Rooftop System`,
          message: `Inquiry for ${cap.title} (${cap.kw}). Address: ${formData.address || 'Not specified'}.`
        })
      })
      const j = await res.json()
      if (j.success || res.ok) {
        setSubmitted(true)
      }
    } catch {
      // fallback
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-neutral-900">
      <Navbar content={content} />

      {/* Hero Header */}
      <header className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 overflow-hidden bg-neutral-950 text-white">
        {/* Ambient Red Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D71920]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-6 flex-wrap">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
            <Link href="/services#capacities" className="hover:text-white transition-colors">System Sizing</Link>
            <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
            <span className="text-[#ff4b55] truncate">{cap.kw} Solar System</span>
          </nav>

          {/* Quick Capacity Switcher Bar - 2 cols on mobile, flex on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 mb-8">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider shrink-0">
              Select Capacity:
            </span>
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
              {sortedList.map((c) => {
                const isActive = c.id === cap.id || c.slug === cap.slug
                return (
                  <Link
                    key={c.id || c.slug}
                    href={`/services/${c.slug}`}
                    className={`text-center px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#D71920] text-white shadow-glow-red'
                        : 'bg-white/10 hover:bg-white/20 text-neutral-300 border border-white/10'
                    }`}
                  >
                    {c.kw} System
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Header Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#D71920] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider">
                  {cap.kw} Specifications
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {cap.badge}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {cap.title}
              </h1>

              <p className="text-sm sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                {cap.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl pt-1">
                {cap.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <Button asChild className="w-full sm:w-auto bg-[#D71920] hover:bg-[#b01319] text-white font-bold rounded-full h-12 px-7 text-xs sm:text-sm shadow-xl">
                  <a href="#quote-form" className="justify-center">
                    Get {cap.kw} Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full h-12 px-6 text-xs sm:text-sm">
                  <a href="tel:+919047777936" className="justify-center">
                    <PhoneCall className="mr-2 h-4 w-4 text-[#ff5a4e]" /> Talk to Solar Engineer
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Stat Bento Box */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {[
                {
                  label: 'Daily Generation',
                  value: cap.dailyUnits ? String(cap.dailyUnits).replace(/\s*\/\s*Day/i, '') : (cap.heroHighlights?.[0]?.value || '12 – 15 Units')
                },
                {
                  label: 'Roof Area Required',
                  value: cap.roofArea ? String(cap.roofArea).replace(/\s*\(.*?\)/g, '').trim() : (cap.heroHighlights?.[1]?.value || '270 – 300 Sq. Ft.')
                },
                {
                  label: 'Monthly Bill Savings',
                  value: cap.monthlySavings ? String(cap.monthlySavings).replace(/\s*\/\s*Month/i, '').trim() : (cap.heroHighlights?.[2]?.value || '₹2,500 – ₹3,500')
                },
                {
                  label: 'Govt Subsidy Credit',
                  value: cap.subsidy ? (String(cap.subsidy).includes('₹') ? String(cap.subsidy).split(' under ')[0].split(' Direct ')[0] + ' Direct DBT' : String(cap.subsidy)) : (cap.badge || cap.heroHighlights?.[3]?.value || '₹78,000 Direct DBT')
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden" animate="visible" custom={i} variants={fadeUp}
                  className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    {stat.label}
                  </div>
                  <div className="text-base sm:text-xl font-extrabold text-white mt-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> Guaranteed
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Specifications Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-16">
          {/* Key System Specs Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#D71920] uppercase tracking-wider">Technical & Financial Specs</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 mt-1">
                Everything Included in Your {cap.kw} Plant
              </h2>
              <p className="text-neutral-600 text-sm mt-2">
                Certified Tier-1 components engineered to generate peak solar energy for 25+ years.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D71920] flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">Solar PV Modules</h3>
                <p className="text-xs text-neutral-500 mt-1">Tier-1 TOPCon / Mono PERC (550Wp+)</p>
                <div className="mt-3 font-semibold text-sm text-neutral-800">{cap.panelsCount}</div>
                <div className="text-xs text-neutral-500 mt-0.5">25 Years 84.8% Output Warranty</div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">Smart Solar Inverter</h3>
                <p className="text-xs text-neutral-500 mt-1">High-Efficiency Grid-Tie MPPT</p>
                <div className="mt-3 font-semibold text-sm text-neutral-800">{cap.inverterSpec}</div>
                <div className="text-xs text-neutral-500 mt-0.5">WiFi & Mobile Cloud App Included</div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <LandPlot className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">Mounting Structure</h3>
                <p className="text-xs text-neutral-500 mt-1">Wind Resilience 150 km/h</p>
                <div className="mt-3 font-semibold text-sm text-neutral-800">{cap.structureSpec}</div>
                <div className="text-xs text-neutral-500 mt-0.5">Hot-Dip Galvanized GI / Elevated</div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                  <Cable className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">Electrical Balance of System</h3>
                <p className="text-xs text-neutral-500 mt-1">Complete AC/DC Safety & Earthing</p>
                <div className="mt-3 font-semibold text-sm text-neutral-800">Dual/Triple Chemical Earthing</div>
                <div className="text-xs text-neutral-500 mt-0.5">Type-2 SPD Surge Protection & DC MCBs</div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">TANGEDCO Net Metering</h3>
                <p className="text-xs text-neutral-500 mt-1">100% Turnkey Government Liaison</p>
                <div className="mt-3 font-semibold text-sm text-neutral-800">Bi-Directional Meter & CEIG</div>
                <div className="text-xs text-neutral-500 mt-0.5">End-to-End Paperwork Handled by IVR</div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-[#D71920] flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-base text-neutral-900">Warranty & Service</h3>
                <p className="text-xs text-neutral-500 mt-1">Peace of Mind Guarantee</p>
                <div className="mt-3 font-semibold text-sm text-neutral-800">{cap.warranty}</div>
                <div className="text-xs text-neutral-500 mt-0.5">5 Years Free Service & Maintenance</div>
              </div>
            </div>
          </div>

          {/* Compatible Appliances & Inclusions Split */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* What runs on this system */}
            <div className="p-7 md:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D71920]">
                <Gauge className="h-4 w-4" />
                <span>Supported Daily Appliance Load</span>
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900">
                What Can You Run on a {cap.kw} System?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A {cap.kw} solar plant is tailored for {cap.suitableFor}. Here is the typical daily equipment supported:
              </p>

              <div className="space-y-3 pt-2">
                {cap.appliances.map((app, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-neutral-900">{app.name}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">{app.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Turnkey Inclusions Checklist */}
            <div className="p-7 md:p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5a4e]">
                <Award className="h-4 w-4" />
                <span>IVR Energy Standard Package</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Everything in the Turnkey {cap.kw} Scope
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Zero hidden charges. Our pricing includes complete civil foundation, electrical synchronization, and government documentation.
              </p>

              <div className="space-y-3 pt-2">
                {cap.inclusions.map((inc, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="h-5 w-5 text-[#D71920] shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm font-medium text-neutral-200 leading-relaxed">{inc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quotation Request Form */}
          <div id="quote-form" className="p-8 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-br from-neutral-50 via-white to-red-50/40 border border-neutral-200 shadow-xl scroll-mt-28">
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-[#D71920] text-white text-xs font-extrabold uppercase tracking-wider shadow-xs">
                Instant Proposal
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Request an Official {cap.kw} Solar Proposal
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm">
                Get a customized technical layout, exact financial return calculation, and free engineering site inspection in Tamil Nadu.
              </p>
            </div>

            {submitted ? (
              <div className="max-w-lg mx-auto text-center p-8 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-neutral-900">Inquiry Submitted Successfully</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Thank you! An IVR Energy engineer has been assigned to your project and will reach out with the complete {cap.kw} quotation breakdown.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4 rounded-full text-xs">
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#D71920] shadow-2xs"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#D71920] shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">City / District *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#D71920] shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Installation Location / Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-xs focus:outline-none focus:border-[#D71920] shadow-2xs"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D71920] hover:bg-[#b01319] text-white font-bold rounded-2xl h-12 text-xs sm:text-sm shadow-xl mt-2 cursor-pointer"
                >
                  {submitting ? 'Submitting...' : `Get Instant ${cap.kw} Technical & Pricing Proposal`}
                </Button>

                <p className="text-[11px] text-neutral-500 text-center pt-2">
                  🔒 We respect your privacy. No spam. Direct consultation from certified solar engineers.
                </p>
              </form>
            )}
          </div>

          {/* FAQs Accordion */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#D71920] uppercase tracking-wider">Frequently Asked Questions</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                Common Questions on {cap.kw} Solar Systems
              </h3>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {cap.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-neutral-200 rounded-2xl px-5 bg-neutral-50/50">
                    <AccordionTrigger className="text-left font-bold text-neutral-900 text-sm sm:text-base py-4 hover:text-[#D71920]">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600 text-xs sm:text-sm leading-relaxed pb-4">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </div>
  )
}
