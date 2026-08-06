'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun, Zap, ArrowRight, Phone, Mail, MapPin, Menu, X, ArrowLeft,
  ChevronRight, Sparkles, PhoneCall, HelpCircle, Search
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

const FAQS = [
  { q: "How do solar panels work, and what is the difference between On-Grid and Off-Grid systems?", a: "Solar panels convert direct sunlight into direct current (DC) electricity using photovoltaic (PV) cells. A solar inverter then converts this DC power into alternating current (AC) electricity to power your household appliances.\n\nOn-Grid (Grid-Tied) Systems: Connected directly to your local utility power grid. Excess power generated during the day is sent back to the grid for credits, and you draw from the grid when needed.\n\nOff-Grid Systems: Completely independent of the utility grid, using battery storage systems to store daytime energy for nighttime or emergency use." },
  { q: "Is my home suitable for solar panel installation?", a: "Most homes with an unshaded roof that receives 4–6 hours of direct sunlight daily are suitable for solar. Our engineers perform a free site assessment to confirm feasibility." },
  { q: "How do I calculate the right solar system for my electricity bill?", a: "The ideal system size is determined by your monthly electricity consumption (kWh), available roof space, and future energy needs." },
  { q: "Can I install solar panels without changing my existing electrical wiring?", a: "In most cases, yes. Our team evaluates your electrical system and makes only the necessary upgrades to ensure a safe installation." },
  { q: "What happens if I move to a new house?", a: "Your solar system is a permanent asset attached to your property. If you're relocating, our team can advise you on possible options." },
  { q: "What happens if one solar panel stops working?", a: "Modern solar systems are designed to continue operating even if one panel underperforms. Our service team can identify and replace faulty components if needed." },
  { q: "Can solar panels withstand heavy rain and strong winds?", a: "Yes. High-quality solar panels are designed to withstand harsh weather conditions, including heavy rain, strong winds, and high temperatures." },
  { q: "Will birds or animals damage my solar panels?", a: "Solar panels are durable, but birds may occasionally nest underneath them. Protective mesh and regular inspections help prevent such issues." },
  { q: "Can I expand my solar system in the future?", a: "Yes. If your electricity demand increases, many solar systems can be upgraded with additional panels, subject to available roof space and inverter capacity." },
  { q: "What is the best time of year to install solar panels?", a: "Solar panels can be installed throughout the year. Installing earlier allows you to start saving on electricity bills sooner." },
  { q: "Will solar panels affect my roof warranty?", a: "Professional installation is designed to minimize impact on your roof. We use appropriate mounting methods to protect the roof structure." },
  { q: "How much weight do solar panels add to my roof?", a: "A typical rooftop solar system adds only a moderate load, which most properly constructed roofs can support after structural assessment." },
  { q: "Can I monitor my solar system from my mobile phone?", a: "Yes. Many modern solar inverters include mobile apps that allow you to monitor power generation and system performance in real time." },
  { q: "What maintenance is required after installation?", a: "Routine cleaning, visual inspections, and occasional professional servicing help maintain optimal system efficiency." },
  { q: "Do solar panels need direct sunlight?", a: "Solar panels perform best in direct sunlight but can still generate electricity under indirect sunlight and cloudy conditions." },
  { q: "Can I install solar panels on a terrace instead of a roof?", a: "Yes. Solar mounting structures can be installed on terraces, provided there is adequate space and sunlight." },
  { q: "How much carbon emissions can solar panels reduce?", a: "A residential solar system can significantly reduce carbon emissions over its lifetime by replacing electricity generated from fossil fuels." },
  { q: "What certifications should I look for when choosing solar panels?", a: "Look for internationally recognized certifications and products that comply with Indian standards for quality, safety, and performance." },
  { q: "Will installing solar increase my property's value?", a: "Many buyers consider solar-powered homes more attractive because they offer lower electricity costs and improved energy efficiency." },
  { q: "Can solar panels be installed on commercial buildings?", a: "Yes. Commercial buildings, offices, factories, schools, hospitals, and warehouses can all benefit from solar installations." },
  { q: "How often should solar panels be cleaned?", a: "Cleaning every 3–6 months is generally recommended, depending on dust levels, pollution, and local weather conditions." },
  { q: "Is a site survey necessary before installation?", a: "Yes. A site survey helps determine roof strength, available space, shading, electrical infrastructure, and the best system design." },
  { q: "What should I check before choosing a solar installer?", a: "Consider the company's experience, certifications, customer reviews, warranty support, product quality, and after-sales service." },
  { q: "How do I know if my inverter is working properly?", a: "Most modern inverters display system status and generation data on a screen or mobile app, making it easy to monitor performance." },
  { q: "Can solar panels help during rising electricity prices?", a: "Yes. By generating your own electricity, solar reduces dependence on grid power and helps protect against future tariff increases." },
  { q: "Is solar energy environmentally friendly?", a: "Yes. Solar energy is clean, renewable, and produces electricity without air pollution or greenhouse gas emissions during operation." },
  { q: "Can I install solar panels if my roof has partial shade?", a: "Yes, but shading can reduce performance. During the site survey, we assess shading and recommend the most efficient system layout." },
  { q: "Do I need permission before installing rooftop solar?", a: "Depending on your location and system type, approvals and utility permissions may be required. IVR Energy assists with the necessary documentation." },
  { q: "What happens after I submit an enquiry?", a: "Our team contacts you, schedules a site visit, assesses your energy needs, provides a customized proposal, and guides you through every step until installation." },
  { q: "How do I maintain maximum solar efficiency?", a: "Keep the panels clean, avoid shading, monitor system performance regularly, and schedule periodic professional inspections." },
  { q: "Are solar panels worth it?", a: "Yes. Solar panels can significantly reduce electricity bills over time and offer an excellent long-term return on investment. Most systems pay for themselves through energy savings while also increasing property value." },
  { q: "How much does a solar panel system cost?", a: "The cost depends on the system size, panel brand, inverter, roof type, and installation requirements. Contact IVR Energy for a free customized quotation based on your electricity consumption." },
  { q: "How many solar panels do I need?", a: "The number of panels depends on your monthly electricity usage and the wattage of the panels. A site assessment helps determine the ideal system size." },
  { q: "How much electricity can solar panels generate?", a: "A well-designed solar system can generate enough electricity to meet a large portion of your daily energy needs. Actual output depends on sunlight, location, weather, and system capacity." },
  { q: "How long do solar panels last, and what maintenance do they require?", a: "The industry standard lifespan for solar panels is 25 to 30 years, and they will continue producing energy even beyond that point. They are incredibly low-maintenance, generally only requiring occasional cleaning to remove dust and debris so sunlight can reach the cells. However, secondary components like the solar inverter or battery storage may need to be replaced after 10 to 15 years." },
  { q: "Do solar panels work at night?", a: "No. Solar panels generate electricity only when sunlight is available. For nighttime power, you can use battery storage or electricity from the grid." },
  { q: "Do solar panels still generate electricity on cloudy or rainy days?", a: "Yes. Solar panels can use both direct and indirect sunlight to generate energy. While they are most efficient in direct sunlight, they will continue to produce power during overcast weather, typically operating at 10% to 25% of their normal output depending on cloud cover." },
  { q: "Will my solar panels provide electricity during a neighborhood power outage?", a: "Standard Grid-Tied Systems: No. For safety reasons, grid-tied solar inverters automatically shut down during a utility power outage to prevent sending electricity back into power lines while technicians restore service.\n\nHybrid or Battery-Backed Systems: Yes. If you install a hybrid inverter paired with battery backup, your system will isolate itself from the grid and continue powering your essential home appliances during an outage." },
  { q: "How much space is required for a rooftop solar system?", a: "As a general rule, a 1-kilowatt (kW) solar power system requires roughly 90 to 100 square feet (around 10 square meters) of shadow-free roof area. A typical 3 kW to 5 kW residential system requires between 300 and 500 square feet of clean area. Your installation partner will calculate the exact space and system size needed." },
  { q: "Can solar panels reduce my electricity bill to zero?", a: "Depending on your electricity consumption, system size, and net metering policy, your electricity bill can be reduced substantially and, in some cases, nearly eliminated." },
  { q: "What happens if my solar panels produce more energy than my home uses?", a: "If your system is tied to the local utility grid and your region supports net metering, excess electricity is sent back into the grid. Your utility provider will credit your account for this surplus power, which further reduces your overall electricity bill." },
  { q: "Is solar energy safe for my home?", a: "Yes. Professionally installed solar systems are designed to meet safety standards and are safe for residential, commercial, and industrial use." },
  { q: "Are solar panels waterproof?", a: "Yes. Solar panels are built to withstand rain, dust, humidity, and various weather conditions." },
  { q: "Do I need to replace or reinforce my roof before installing a solar system?", a: "Because solar panels are designed to last for 25 years or more, your roof should be structurally stable enough to support them for that duration. Unless your roof already has damage or is nearing the end of its lifespan, you likely do not need to replace it, but performing any necessary repairs beforehand is highly recommended." },
  { q: "What is the best direction for solar panels?", a: "In India, solar panels generally perform best when facing south with the appropriate tilt angle for maximum sunlight exposure." },
  { q: "How long does solar installation take?", a: "Residential installations are typically completed within 1–3 days, depending on system size and site conditions." },
  { q: "What is Net Metering, and how does it lower my electricity bill?", a: "Net metering is a billing mechanism that credits solar system owners for the excess electricity they add to the grid. When your solar panels produce more electricity than your home consumes during peak daytime hours, the surplus is exported to the local utility grid. Your electricity meter records this export, and your utility company credits your account—significantly reducing your net monthly electricity bill." },
  { q: "Are there government subsidies, tax credits, or financial incentives available?", a: "Yes. Many national and local government programs offer financial assistance to encourage the adoption of rooftop solar. Residential homeowners can often take advantage of direct capital subsidies (such as PM Surya Ghar Scheme), clean energy tax credits, or low-interest financing programs that significantly reduce the upfront installation cost." },
  { q: "Which is better: On-Grid or Hybrid Solar?", a: "An on-grid system is ideal for reducing electricity bills, while a hybrid system provides both bill savings and battery backup during power outages." },
  { q: "What size solar system do I need?", a: "The right system size depends on your monthly electricity consumption, available roof space, and future energy needs." },
  { q: "Will solar panels run high-power appliances like my air conditioner?", a: "Absolutely. Before installation, a professional will analyze your home's total electrical load to design a system capable of meeting your specific energy demands, including running heavy appliances like air conditioners." },
  { q: "Will solar panels damage my roof?", a: "No. When installed by experienced professionals, solar panels protect the roof rather than damage it." },
  { q: "Which solar panel brand is the best?", a: "The best choice depends on your budget, efficiency requirements, warranty, and installation goals. IVR Energy recommends only trusted, high-quality brands." },
  { q: "Why should I choose IVR Energy?", a: "IVR Energy provides customized solar solutions, premium products, expert installation, competitive pricing, comprehensive warranties, and dependable after-sales support to ensure maximum customer satisfaction." },
]

export default function FAQsPage() {
  const [content, setContent] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [visible, setVisible] = useState(true)
  const [scrollDir, setScrollDir] = useState('down')
  const [searchTerm, setSearchTerm] = useState('')
  const lastScrollY = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)
      if (currentScrollY > lastScrollY.current + 4) {
        setScrollDir('down')
      } else if (currentScrollY < lastScrollY.current - 4) {
        setScrollDir('up')
      }
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScrollEvent, { passive: true })

    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => { })

    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])

  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'
  const phoneRaw = content?.contact?.phoneRaw || '919047777936'
  const email = content?.contact?.email || 'ivrenergysolutions@gmail.com'
  const address = content?.contact?.address || '3th floor, Door No - 1, Plot No - A, Manasarovar Nagar, Gerugambakkam, Chennai - 600122.'

  const activeFaqs = (content?.faqsList && content.faqsList.length > 0)
    ? content.faqsList
    : ((content?.faqs && content.faqs.length > 0) ? content.faqs : FAQS)

  const faqsTitle = content?.faqsTitle || 'Frequently Asked Questions'
  const faqsSubtitle = content?.faqsSubtitle || 'Everything you wanted to know about going solar, subsidies, approvals, and O&M.'

  const filteredFaqs = activeFaqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase().trim())
  )

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: activeFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans antialiased text-neutral-900 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar content={content} />

      {/* Main Content Hero Banner */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-[#1a0505] to-neutral-950 text-white py-24 md:py-32 lg:py-36 overflow-hidden pt-28">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D71920]/40 blur-3xl " />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl " />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words" dangerouslySetInnerHTML={{ __html: faqsTitle.includes('<') ? faqsTitle : faqsTitle.replace('Questions', '<span class="text-gradient-red">Questions</span>') }} />
          <p className="mt-4 text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            {faqsSubtitle}
          </p>

          {/* Search Input Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g., subsidy, EB bill, net metering)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#D71920] focus:border-transparent transition-all shadow-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-neutral-400 hover:text-white transition-colors p-1"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {searchTerm && (
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
              <p className="text-sm font-semibold text-neutral-700">
                Found <span className="text-[#D71920] font-bold">{filteredFaqs.length}</span> {filteredFaqs.length === 1 ? 'question' : 'questions'} for "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs font-semibold text-[#D71920] hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-14 px-6 rounded-3xl border border-neutral-200 bg-white shadow-soft">
              <HelpCircle className="h-12 w-12 text-[#D71920] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-neutral-900">No matching questions found</h3>
              <p className="mt-2 text-sm text-neutral-600 max-w-md mx-auto">
                We couldn't find any questions matching "{searchTerm}". Try another keyword or talk to our solar consultants directly.
              </p>
              <Button
                onClick={() => setSearchTerm('')}
                variant="outline"
                className="mt-6 rounded-full px-6 text-sm font-semibold border-neutral-300 hover:bg-neutral-100"
              >
                View All Questions
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((f, i) => (
                <motion.div
                  key={`${i}-${scrollDir}-${f.q}`}
                  initial={{ opacity: 0, y: scrollDir === 'down' ? 70 : -70, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 20,
                    delay: Math.min((i % 6) * 0.06, 0.35)
                  }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.98, y: -2 }}
                  className="gpu-accelerate "
                >
                  <AccordionItem
                    value={`item-${i}`}
                    className="rounded-2xl border border-neutral-200 bg-white px-6 md:px-8 data-[state=open]:border-red-200 data-[state=open]:shadow-soft transition-all duration-300 "
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6 font-semibold text-neutral-900 text-base md:text-lg hover:text-[#D71920] transition-colors">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600 leading-relaxed pb-6 text-sm md:text-base whitespace-pre-line">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </div>
      </div>

      {/* Help CTA Card */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920]/20 rounded-full blur-3xl "  />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold">Have a different question?</h3>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">Our solar consultants are ready to clarify any doubts regarding system sizing, financial savings, and net metering.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-8 h-12 text-sm font-semibold shadow-glow-red">
                <Link href="/#contact">Ask a Consultant</Link>
              </Button>
              <a href={`tel:+${phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-white transition-colors py-2">
                <PhoneCall className="h-4 w-4 text-[#D71920]" /> Call Us: {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer content={content} />

      {/* Sticky Bottom CTA Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed bottom-0 inset-x-0 z-40 pointer-events-none " 
      >
        <div className="mx-auto max-w-4xl px-4 pb-4 pointer-events-auto">
          <div className="flex items-center justify-between gap-3 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
            {/* Left: phone */}
            <a
              href={`tel:+${phoneRaw}`}
              className="flex items-center gap-2.5 text-white hover:text-[#D71920] transition-colors min-w-0 " 
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#D71920]/15 border border-[#D71920]/30 flex items-center justify-center">
                <Phone className="h-4 w-4 text-[#D71920]" />
              </span>
              <span className="text-sm font-semibold truncate hidden sm:block">{phoneDisplay}</span>
            </a>

            {/* Center: label */}
            <p className="text-xs text-neutral-400 text-center hidden md:block flex-1">
              Still have questions? Our solar experts are here to help.
            </p>

            {/* Right: CTA */}
            <Button
              asChild
              className="flex-shrink-0 bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl px-5 h-10 text-sm font-bold shadow-glow-red " 
            >
              <Link href="/#contact">
                Get Free Quote <ArrowRight className="ml-1.5 h-3.5 w-3.5 "  />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
