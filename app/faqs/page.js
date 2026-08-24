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
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

import { DEFAULT_FAQS } from '@/data/faqs'

const FAQS = DEFAULT_FAQS

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
  const address = content?.contact?.address || '3rd floor, Door No - 1,\nPlot No - A, Manasarovar Nagar,\nGerugambakkam,\nChennai - 600122.'

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
                <Link href="/contact">Ask a Consultant</Link>
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
              <Link href="/contact">
                Get Free Quote <ArrowRight className="ml-1.5 h-3.5 w-3.5 "  />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
