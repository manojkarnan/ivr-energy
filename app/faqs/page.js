'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, X, HelpCircle, PhoneCall, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { companyNAP } from '@/data/companyStats'
import { DEFAULT_FAQS, FAQ_CATEGORIES } from '@/data/faqs'

export default function FAQsPage() {
  const [content, setContent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => { })
  }, [])

  const phoneDisplay = content?.contact?.phone || companyNAP.phone
  const phoneRaw = content?.contact?.phoneRaw || companyNAP.phoneRaw

  // Merge CMS/DB FAQs or fallback to rich structured default FAQs
  const allFaqs = useMemo(() => {
    if (content?.faqsList && Array.isArray(content.faqsList) && content.faqsList.length > 0) {
      return content.faqsList.map((item, idx) => ({
        id: item.id || `faq-${idx}`,
        category: item.category || 'General',
        q: item.q || '',
        directAnswer: item.directAnswer || item.a || '',
        a: item.a || item.directAnswer || '',
        details: item.details || '',
        lastUpdated: item.lastUpdated || '',
      }))
    }
    return DEFAULT_FAQS
  }, [content])

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((f) => {
      const matchesCat = selectedCategory === 'All' || f.category === selectedCategory
      const query = searchTerm.toLowerCase().trim()
      if (!query) return matchesCat

      const matchesText =
        (f.q && f.q.toLowerCase().includes(query)) ||
        (f.directAnswer && f.directAnswer.toLowerCase().includes(query)) ||
        (f.a && f.a.toLowerCase().includes(query)) ||
        (f.category && f.category.toLowerCase().includes(query))

      return matchesCat && matchesText
    })
  }, [allFaqs, selectedCategory, searchTerm])

  // Extract unique categories from actual FAQs
  const displayCategories = useMemo(() => {
    const cats = new Set(FAQ_CATEGORIES)
    allFaqs.forEach((f) => {
      if (f.category) cats.add(f.category)
    })
    return Array.from(cats)
  }, [allFaqs])

  // Strict Schema.org FAQPage JSON-LD reflecting visible Q&A pairs for AEO & Google AI Overviews
  const faqJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: allFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.directAnswer || f.a || '',
        },
      })),
    }
  }, [allFaqs])

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans antialiased text-neutral-900 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar content={content} />

      {/* Main Content Hero Banner (Styled like About Page) */}
      <header className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden bg-white">
        {/* Subtle Ambient Warm Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-gradient-to-b from-red-100/40 via-orange-50/20 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          {content?.faqPageTitle ? (
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-neutral-900"
              dangerouslySetInnerHTML={{ __html: content.faqPageTitle }}
            />
          ) : (
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-neutral-900">
              Frequently Asked{' '}
              <span className="font-normal bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
          )}

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 font-light max-w-4xl leading-relaxed">
            {content?.faqPageSubtitle || 'Direct, expert answers on solar system pricing in Chennai, PM Surya Ghar ₹78,000 subsidies, TANGEDCO net metering, and turnkey EPC engineering.'}
          </p>

          {/* Search Input Box (Clean Light Card Design) */}
          <div className="mt-8 max-w-2xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g., 3 kW cost, subsidy, EB bill, net metering)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#D71920] focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-neutral-400 hover:text-neutral-700 transition-colors p-1"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter Tabs */}
      <section className="bg-neutral-50/80 border-y border-neutral-200/80 sticky top-16 md:top-20 z-30 backdrop-blur-xl py-3 px-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {displayCategories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#D71920] text-white border-[#D71920] shadow-md shadow-red-500/20'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Cards Section (Answer-First Layout) */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Active Search/Filter Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-neutral-200/80">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                {selectedCategory === 'All' ? 'All Questions' : `${selectedCategory} Solar FAQs`}
              </h2>
              {searchTerm && (
                <p className="text-xs text-neutral-500 mt-0.5">
                  Results for "{searchTerm}"
                </p>
              )}
            </div>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="text-xs font-semibold text-[#D71920] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 px-6 rounded-3xl border border-neutral-200 bg-white shadow-soft">
              <HelpCircle className="h-12 w-12 text-[#D71920] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-neutral-900">No matching questions found</h3>
              <p className="mt-2 text-sm text-neutral-600 max-w-md mx-auto">
                We couldn't find any questions matching your filter. Try another keyword or talk to our solar engineers directly.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                variant="outline"
                className="mt-6 rounded-full px-6 text-sm font-semibold border-neutral-300 hover:bg-neutral-100"
              >
                View All FAQs
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredFaqs.map((f, i) => (
                <div
                  key={f.id || `${f.q}-${i}`}
                  className="rounded-2xl border border-neutral-200/90 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all duration-300"
                >
                  {/* Category & Badge Header */}
                  {f.category && (
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#D71920] border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" /> {f.category}
                      </span>
                    </div>
                  )}

                  {/* Question (H3 for semantic structure) */}
                  <h3 className="text-lg md:text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                    {f.q}
                  </h3>

                  {/* Answer Box */}
                  <div className="mt-4 p-4 md:p-5 rounded-xl bg-neutral-50/90 border border-neutral-200/70 text-neutral-800 text-sm sm:text-base leading-relaxed">
                    <p className="font-normal text-neutral-800 leading-relaxed whitespace-pre-line">
                      {f.directAnswer || f.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* High-Intent Help CTA Card */}
      <section className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden border border-neutral-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Have a specific solar query?</h3>
            <p className="mt-3 text-neutral-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Our solar engineering consultants provide customized system sizing, terrace shadow simulations, and complete PM Surya Ghar subsidy guidance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-8 h-12 text-sm font-semibold shadow-glow-red">
                <Link href="/contact">Talk to an Engineer</Link>
              </Button>
              <a
                href={`tel:+${phoneRaw}`}
                className="flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-white transition-colors py-2"
              >
                <PhoneCall className="h-4 w-4 text-[#D71920]" /> Call Direct: {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content} />

      {/* Sticky Bottom Quick-Contact Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
      >
        <div className="mx-auto max-w-4xl px-4 pb-4 pointer-events-auto">
          <div className="flex items-center justify-between gap-3 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
            <a
              href={`tel:+${phoneRaw}`}
              className="flex items-center gap-2.5 text-white hover:text-[#D71920] transition-colors min-w-0"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#D71920]/15 border border-[#D71920]/30 flex items-center justify-center">
                <Phone className="h-4 w-4 text-[#D71920]" />
              </span>
              <span className="text-sm font-semibold truncate hidden sm:block">{phoneDisplay}</span>
            </a>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl text-xs font-semibold px-4 h-9 shadow-glow-red">
                <Link href="/contact">Get Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
