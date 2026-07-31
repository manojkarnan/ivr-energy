'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  PenTool, HardHat, Home, Building2, Factory, PanelsTopLeft, Handshake, Wrench, IndianRupee,
  PhoneCall, Search, FileText, ClipboardCheck, Zap, Sparkles, Phone, Mail, MapPin, Menu, X, ArrowRight,
  ShieldCheck, Award, Cpu, ArrowUp, CheckCircle2, Star, Quote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const NAV = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Calculator', href: '/#calculator' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/#contact' },
]

const SERVICES = [
  { icon: PenTool, title: 'Solar Consultancy', desc: 'End-to-end consulting with international partners for feasibility, DPR & funding.' },
  { icon: HardHat, title: 'Solar EPC Services', desc: 'Turnkey Engineering, Procurement •& Construction •— from land to commissioning.' },
  { icon: Home, title: 'Residential Rooftop', desc: 'Slash your EB bill to zero with premium home solar systems.' },
  { icon: Building2, title: 'Commercial Rooftop', desc: 'Cut operating costs for offices, hotels, hospitals & IT parks.' },
  { icon: Factory, title: 'Industrial Solar', desc: 'Captive solar power for textiles, cement, chemical & manufacturing.' },
  { icon: PanelsTopLeft, title: 'Ground Mounted Solar', desc: 'Utility-scale solar farms with grid tie-in and net metering.' },
  { icon: Handshake, title: 'Government Approvals', desc: 'Subsidy applications, TANGEDCO net-metering & policy compliance.' },
  { icon: Wrench, title: 'O&M Services', desc: 'Inverter, transformer & MV switchgear preventive maintenance.' },
  { icon: IndianRupee, title: 'Solar Financing', desc: 'Bank tie-ups, EMI options & PM Surya Ghar subsidy support.' },
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

const ADVANTAGES = [
  { icon: Award, t: 'Tier-1 Quality Components', d: 'We partner strictly with Tier-1 manufacturers offering 25-year performance warranties.' },
  { icon: ShieldCheck, t: 'Liaison & Approvals', d: 'Zero-hassle paperwork. Our team handles DISCOM approvals, net metering liaisoning, and subsidy application management.' },
  { icon: Wrench, t: 'SLA-backed O&M Support', d: 'Custom preventative maintenance schedules and active generation monitoring for maximum return on investment.' },
  { icon: Cpu, t: 'Real-time App Monitoring', d: 'Every inverter comes equipped with GPRS/WiFi loggers to track daily yield and health analytics on your mobile.' }
]

function SectionHeader({ title, sub }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight break-words">
        {title}
      </h2>
      {sub && <p className="mt-4 text-lg text-neutral-600 leading-relaxed">{sub}</p>}
    </div>
  )
}

function StackingServicesCard({ s, i, total, scrollYProgress }) {
  const Icon = s.icon

  // Cards enter step-by-step between 0 -> 1.0 of section scroll
  const step = 1.0 / Math.max(1, total - 1)
  const start = i === 0 ? 0 : (i - 1) * step
  const end = i === 0 ? 0.01 : i * step

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [i === 0 ? 0 : 450, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [end, 1],
    [1, 1 - (total - 1 - i) * 0.02]
  )

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.03), start],
    [i === 0 ? 1 : 0, 1]
  )

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: i + 1,
      }}
      className="absolute inset-0 bg-[#ffffff] rounded-[28px] md:rounded-[32px] p-8 md:p-10 border border-white/80 shadow-[0_15px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between overflow-hidden" 
    >
      <div className="absolute inset-0 bg-[#ffffff] z-0" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-soft border border-neutral-100 flex items-center justify-center text-[#D71920] flex-shrink-0">
            <Icon className="h-7 w-7 text-[#D71920]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {s.title}
          </h3>
          <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">
            {s.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function StackingServicesSection() {
  const containerRef = useRef(null)

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const scrollYProgress = useSpring(rawProgress, { stiffness: 60, damping: 25, restDelta: 0.001 })

  const displayServices = SERVICES.slice(0, 6)
  const total = displayServices.length

  return (
    <section id="services-stack" ref={containerRef} className="relative bg-white text-neutral-900 h-[115vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-16 md:pt-20 pb-6 overflow-hidden z-20">
        <div className="w-full max-w-4xl mx-auto text-center mb-6 relative z-10">
          <SectionHeader
            eyebrow="What We Do" 
            title={<>Complete <span className="text-gradient-red">turnkey solar</span> services</>}
            sub="From consultancy to commissioning — one accountable partner for every step of your solar journey." />
        </div>

        <div className="relative w-full max-w-xl h-[260px] md:h-[280px] flex items-center justify-center z-10">
          {displayServices.map((s, i) => (
            <StackingServicesCard
              key={s.title}
              s={s}
              i={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StackingAdvantageCard({ adv, i, total, scrollYProgress }) {
  const IconComponent = adv.icon

  // Cards enter step-by-step between 0 -> 0.98 of section scroll
  const step = 0.98 / Math.max(1, total - 1)
  const start = i === 0 ? 0 : (i - 1) * step
  const end = i === 0 ? 0.01 : i * step

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [i === 0 ? 0 : 450, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [end, 1],
    [1, 1 - (total - 1 - i) * 0.03]
  )

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.04), start],
    [i === 0 ? 1 : 0, 1]
  )

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: i + 1,
      }}
      className="absolute inset-0 bg-white rounded-3xl p-8 md:p-10 border border-neutral-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.09)] flex flex-col justify-between overflow-hidden " 
    >
      <div className="absolute inset-0 bg-white z-0 "  />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="mb-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#D71920] flex items-center justify-center border border-red-100">
            <IconComponent className="h-7 w-7 text-[#D71920]" />
          </div>
        </div>
        <div>
          <h4 className="font-extrabold text-2xl md:text-3xl text-neutral-900 tracking-tight">{adv.t}</h4>
          <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">{adv.d}</p>
        </div>
      </div>
    </motion.div>
  )
}

function StackingAdvantageSection() {
  const containerRef = useRef(null)
  const total = ADVANTAGES.length

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const scrollYProgress = useSpring(rawProgress, { stiffness: 60, damping: 25, restDelta: 0.001 })

  return (
    <section ref={containerRef} className="relative bg-white text-neutral-900 h-[120vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-16 md:pt-20 pb-4 overflow-hidden z-20">
        <div className="w-full max-w-3xl mx-auto text-center mb-8 relative z-10">
          <SectionHeader
            eyebrow="Our Execution Standards " 
            title={<>Why choose our <span className="text-gradient-red">engineering team</span>?</>}
            sub="We combine premium component selection, zero-hassle documentation, and strict wind-load analyses to ensure your plant produces peak power for 25+ years. " 
          />
        </div>

        <div className="relative w-full max-w-xl h-[260px] md:h-[280px] flex items-center justify-center z-10">
          {ADVANTAGES.map((adv, i) => (
            <StackingAdvantageCard
              key={adv.t}
              adv={adv}
              i={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const [scrollDir, setScrollDir] = useState('down')
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastY.current + 4) {
        setScrollDir('down')
      } else if (currentY < lastY.current - 4) {
        setScrollDir('up')
      }
      lastY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="py-20 bg-[#ffffff] border-t border-b border-neutral-200/50">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Our Process " 
          title={<>Your solar journey in <span className="text-gradient-red">8 seamless steps</span></>}
          sub="A refined, transparent execution playbook honed across 180+ projects. " 
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: scrollDir === 'down' ? -100 : 100, scale: 0.84 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative rounded-3xl bg-white p-6 border border-neutral-200/60 hover:border-red-200 hover:shadow-xl transition-colors duration-200 cursor-pointer " 
            >
              <div className="absolute -top-4 -left-3 text-6xl font-bold text-red-50 select-none pointer-events-none">{String(i + 1).padStart(2, '0')}</div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D71920] to-[#ff5a4e] flex items-center justify-center shadow-glow-red"><p.i className="h-6 w-6 text-white "  /></div>
                <div className="mt-4 text-lg font-bold text-neutral-900">{p.t}</div>
                <div className="mt-1 text-sm text-neutral-600 leading-relaxed">{p.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const REVIEWS_DATA = [
  { name: "Umesh Unnikrishnan", role: "Homeowner · 5 kW", category: "Residential", rating: 5, text: "Great service and support throughout the installation process. I've installed a 5kW solar panel from IVR Energy on the roof of my home. Highly recommend them." },
  { name: "M V Sankaran", role: "10 KW Installation, Chennai", category: "Commercial", rating: 5, text: "I had the opportunity of using the services of IVR Energy for a 10 KW installation at Chennai. Excellent professional support." },
  { name: "Anbu Guru", role: "10 kW Office, Chennai", category: "Commercial", rating: 5, text: "Installed 10 kW system in my office. EB Bill has come down drastically — nearly 80% reduction in power consumption." },
  { name: "Rudhra Prasad", role: "5 KV Home Installation", category: "Residential", rating: 5, text: "It was pleasant working with IVR Energy. Recently installed 5KV at my residence. Purely efficient and working great." },
  { name: "Cap. Shankar A", role: "Rooftop Owner", category: "Residential", rating: 5, text: "Job completed as promised. Very cooperative and professional. Mr. Prakash explained the system in detail and clarified all doubts." },
  { name: "Ramachandran Saamy", role: "Rooftop Owner", category: "Residential", rating: 5, text: "Installed rooftop system. Their approach towards the work is really professional." },
]

function ServicesReviewsSection({ reviews }) {
  const [filter, setFilter] = useState('All')
  const list = (reviews && reviews.length) ? reviews : REVIEWS_DATA

  const categories = ['All', 'Residential', 'Commercial']
  const filteredList = filter === 'All' 
    ? list 
    : list.filter(r => (r.category && r.category.toLowerCase() === filter.toLowerCase()) || (r.role && r.role.toLowerCase().includes(filter.toLowerCase())))

  return (
    <section className="py-20 bg-gradient-to-b from-[#ffffff] via-red-50/25 to-[#ffffff] relative overflow-hidden border-t border-b border-neutral-200/60">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D71920]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            What our clients say about <span className="text-gradient-red">our services</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-600 leading-relaxed">
            Real feedback from homeowners, commercial site managers, and industrial partners across Tamil Nadu.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#D71920] to-[#e62027] text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 shadow-sm'
                }`}
              >
                {cat} {cat === 'All' ? `(${list.length})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Review Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredList.map((r, i) => {
            const initials = r.name.split(' ').map(n => n[0]).join('').slice(0, 2)
            return (
              <motion.div
                key={r.name + i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-3xl bg-white p-7 border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(215,25,32,0.1)] hover:border-red-200/80 transition-all flex flex-col justify-between relative group"
              >
                {/* Top Row: Rating & Verified Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(r.rating || 5)].map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Verified
                    </span>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-neutral-700 text-sm md:text-base font-medium leading-relaxed italic relative z-10">
                    "{r.text}"
                  </blockquote>
                </div>

                {/* Bottom Row: User Avatar & Meta */}
                <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D71920] to-[#b3141a] text-white flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#D71920] transition-colors">{r.name}</h4>
                    <p className="text-xs text-neutral-500 font-medium">{r.role}</p>
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

export default function ServicesPage() {
  const [content, setContent] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)

    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => { })

    fetch('/api/reviews')
      .then(r => r.json())
      .then(j => setReviews(j.reviews || []))
      .catch(() => { })
  }, [])

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans antialiased text-neutral-900 animate-fade-in">
      <Navbar content={content} />

      {/* Pinned Stacked Cards: Complete Turnkey Solar Services Section */}
      <StackingServicesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* New Styled Client Reviews Section */}
      <ServicesReviewsSection reviews={reviews} />

      {/* Pinned Stacked Cards: The IVR Execution Advantage Section */}
      <StackingAdvantageSection />

      {/* Services Support FAQs Section */}
      <section className="pt-8 pb-16 md:pt-10 md:pb-20 bg-[#ffffff] border-t border-b border-neutral-200/50">
        <div className="container mx-auto px-6">
          <SectionHeader
            eyebrow="FAQs " 
            title={<>Service support <span className="text-gradient-red">questions</span></>}
            sub="Everything you need to know about timelines, maintenance, and subsidies. " 
          />
          <div className="max-w-3xl mx-auto">
            <Accordion type="single "  collapsible className="space-y-3">
              {[
                { q: 'How long does a typical rooftop solar installation take?', a: 'Residential installations are completed in 2 to 4 days. Commercial and industrial projects depend on capacity, typically ranging from 2 to 6 weeks, including DISCOM approvals and testing.' },
                { q: 'What maintenance is required for my solar power plant?', a: 'Solar power plants require very low maintenance. We recommend cleaning the panels every 10 - 15 days with water to clear off dust and optimize power output. Our team provides detailed maintenance playbooks upon hand-off.' },
                { q: 'Do you assist with government subsidies?', a: 'Yes, IVR Energy is fully empanelled. We manage the entire subsidy liaison process for residential customers applying under the PM Surya Ghar Muft Bijli Yojana (up to ₹78,000 subsidy).' },
                { q: 'How is the generation of the plant monitored?', a: 'Every solar plant we commission includes smart WiFi/GPRS logging. You can monitor daily electricity generation, peak yield, carbon footprint savings, and health metrics directly from your mobile app.' }
              ].map((f, i) => (
                <AccordionItem key={i} value={`service-item-${i}`} className="rounded-2xl border border-neutral-200 bg-white px-6 data-[state=open]:border-red-200 data-[state=open]:shadow-soft transition-all">
                  <AccordionTrigger className="text-left hover:no-underline py-5 font-semibold text-neutral-900 text-base md:text-lg">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Interactive Savings Banner CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-[#1a0505] to-neutral-950 text-white p-10 md:p-14 overflow-hidden shadow-2xl border border-neutral-800 text-center max-w-4xl mx-auto">
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#D71920]/30 blur-3xl "  />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl "  />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold">Ready to calculate your solar potential?</h3>
              <p className="mt-4 text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Use our interactive savings calculator to instantly estimate your recommended system size, cost, yearly savings, and carbon reduction.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-8 h-12 text-base font-bold shadow-glow-red">
                  <Link href="/#calculator">Calculate Your Savings <ArrowRight className="ml-2 h-4 w-4 "  /></Link>
                </Button>
                <Button asChild variant="outline "  className="bg-transparent border-white/20 hover:bg-white/10 hover:text-white text-white rounded-full px-8 h-12 text-base font-semibold backdrop-blur">
                  <Link href="/#contact">Get Custom Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content} />
      <ScrollToTop />
    </div>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white shadow-glow-red transition-all cursor-pointer hover:scale-105 active:scale-95 " 
          aria-label="Scroll to top " 
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 "  />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
