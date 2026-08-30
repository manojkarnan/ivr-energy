'use client'
 
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun, ArrowRight, Phone, Mail, MapPin, CheckCircle2,
  HelpCircle, ShieldCheck, Award, Clock, IndianRupee, Layers,
  ChevronRight, Sparkles, MessageCircle, FileText, Check, PhoneCall
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { companyNAP, companyStats } from '@/data/companyStats'
import { toast } from 'sonner'

export default function LandingPageTemplate({ page: initialPage }) {
  const [page, setPage] = useState(initialPage)
  const [formData, setFormData] = useState({ name: '', phone: '', city: 'Chennai', interest: initialPage.h1, message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/api/landing-pages')
      .then((r) => r.json())
      .then((j) => {
        if (Array.isArray(j.landingPages)) {
          const found = j.landingPages.find((p) => p.slug === initialPage.slug)
          if (found) {
            setPage(found)
          }
        }
      })
      .catch(() => {})
  }, [initialPage.slug])

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ivrenergy.com'
  const currentUrl = `${siteUrl}/${page.slug}`

  // Schema.org JSON-LD definitions
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: page.h1,
        description: page.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: 'IVR Energy',
          telephone: companyNAP.phone,
          email: companyNAP.primaryEmail,
          address: {
            '@type': 'PostalAddress',
            streetAddress: companyNAP.address.streetAddress,
            addressLocality: companyNAP.address.city,
            addressRegion: companyNAP.address.state,
            postalCode: companyNAP.address.pincode,
            addressCountry: companyNAP.address.countryCode,
          },
        },
        areaServed: [
          { '@type': 'City', name: 'Chennai' },
          { '@type': 'State', name: 'Tamil Nadu' },
          { '@type': 'Country', name: 'India' },
        ],
        url: currentUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${siteUrl}/solutions` },
          { '@type': 'ListItem', position: 3, name: page.h1, item: currentUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city || 'Chennai',
          service: formData.interest,
          message: formData.message || `Enquiry for ${page.h1} via landing page`,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Thank you! Our solar engineer will contact you shortly.')
      } else {
        toast.error('Could not submit form. Please call us directly.')
      }
    } catch {
      toast.error('Network error. Please call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans antialiased text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-[#180505] to-neutral-950 text-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D71920]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Semantic Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-red-400 font-medium truncate max-w-xs">{page.h1}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
                {page.h1.split(' in ')[0]}{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#ff4d52] to-amber-400">
                  in {page.h1.split(' in ')[1] || 'Chennai'}
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                {page.tagline}
              </p>

              {/* Direct Answer Box (AEO & Featured Snippets) */}
              <div className="mt-6 p-4 md:p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-sm sm:text-base text-neutral-200 leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-red-300 mb-1">
                      Direct Overview
                    </div>
                    <p className="text-neutral-100">{page.directAnswer}</p>
                  </div>
                </div>
              </div>

              {/* Hero Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {page.heroStats.map((st, i) => (
                  <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-lg sm:text-xl font-bold text-white tracking-tight">{st.val}</div>
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#quote-form"
                  className="inline-flex items-center justify-center rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white px-8 h-12 text-sm font-semibold shadow-glow-red transition-all"
                >
                  Request Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${companyNAP.primaryPhoneRaw}?text=Hi%20IVR%20Energy,%20I'm%20interested%20in%20${encodeURIComponent(page.h1)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 h-12 text-sm font-semibold transition-all shadow-md gap-2"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right Column: Quick Quote Form Card */}
            <div className="lg:col-span-5" id="quote-form">
              <div className="rounded-3xl bg-white p-6 sm:p-8 text-neutral-900 shadow-2xl border border-neutral-100">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900">Get Free Solar Sizing</h2>
                    <p className="text-xs text-neutral-500 mt-0.5">Quick feasibility & quotation in 24 hours</p>
                  </div>
                  <span className="w-9 h-9 rounded-2xl bg-red-50 text-[#D71920] flex items-center justify-center font-bold text-xs">
                    <Sun className="h-5 w-5" />
                  </span>
                </div>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <Check className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">Enquiry Submitted!</h3>
                    <p className="text-sm text-neutral-600 mt-2">
                      Our senior solar engineer will call you shortly to discuss sizing, roof requirements, and subsidies.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D71920] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 90000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D71920] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          City / Locality
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Chennai, OMR"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D71920] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                          Service Type
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={page.h1.slice(0, 24)}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-700 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Monthly EB Bill or Requirement (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g., Monthly bill ₹4,000 or 3BHK roof space 400 sq ft"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D71920] focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl h-12 text-sm font-semibold shadow-glow-red mt-2"
                    >
                      {submitting ? 'Sending Request...' : 'Get Free Feasibility & Quote'}
                    </Button>

                    <div className="text-center pt-2">
                      <a
                        href={`tel:${companyNAP.primaryPhoneTel}`}
                        className="text-xs text-neutral-500 hover:text-[#D71920] font-medium inline-flex items-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="h-3 w-3 text-[#D71920]" /> Or Call Direct: {companyNAP.phone}
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications & Pricing Table */}
      <section className="py-16 md:py-24 bg-neutral-50/70 border-b border-neutral-200/80">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Technical Specifications & System Sizing
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Tier-1 engineering standards built to withstand Tamil Nadu weather conditions and TANGEDCO grid parameters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Specs Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-soft">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#D71920]" /> Hardware Specifications
              </h3>
              <dl className="divide-y divide-neutral-100">
                {page.systemSpecs.map((spec, i) => (
                  <div key={i} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-400">{spec.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-neutral-900 sm:col-span-2 sm:mt-0">{spec.val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Pricing Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-[#D71920]" /> Estimated Investment & Subsidy
                </h3>
                <dl className="divide-y divide-neutral-100">
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-400">Capacity Scope</dt>
                    <dd className="mt-1 text-sm font-semibold text-neutral-900 sm:col-span-2 sm:mt-0">{page.pricingData.capacity}</dd>
                  </div>
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-400">Gross Price</dt>
                    <dd className="mt-1 text-sm font-semibold text-neutral-900 sm:col-span-2 sm:mt-0">{page.pricingData.priceRange}</dd>
                  </div>
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-400">Central Subsidy</dt>
                    <dd className="mt-1 text-sm font-semibold text-emerald-700 sm:col-span-2 sm:mt-0">{page.pricingData.subsidyAvailable}</dd>
                  </div>
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-400">Net Investment</dt>
                    <dd className="mt-1 text-base font-bold text-[#D71920] sm:col-span-2 sm:mt-0">{page.pricingData.effectiveCost}</dd>
                  </div>
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-400">Payback Period</dt>
                    <dd className="mt-1 text-sm font-semibold text-neutral-900 sm:col-span-2 sm:mt-0">{page.pricingData.typicalPayback}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Includes complete Net Metering</span>
                <a href="#quote-form" className="text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1">
                  Get Itemized Quote <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chennai-Specific Engineering Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              {page.overviewTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
              {page.overviewText}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {page.chennaiEngineeringHighlights.map((hl, i) => (
              <div key={i} className="rounded-2xl p-6 bg-neutral-50 border border-neutral-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#D71920]/10 text-[#D71920] flex items-center justify-center font-bold mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div
                  className="text-sm text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: hl.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-900 font-bold block mb-1">$1</strong>')
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Turnkey Process */}
      <section className="py-16 md:py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              End-to-End Turnkey Execution Workflow
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400">
              From site survey to TANGEDCO net meter synchronization, IVR Energy manages every milestone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.processSteps.map((pr, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 relative">
                <span className="text-3xl font-black text-[#D71920]/40 block mb-2">{pr.step}</span>
                <h3 className="text-base font-bold text-white mb-2">{pr.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Project Examples */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200/80">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Proven Project Track Record
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Explore real solar installations delivered by IVR Energy across Chennai and Tamil Nadu.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {page.projectExamples.map((pj, i) => (
              <div key={i} className="rounded-2xl p-5 border border-neutral-200 bg-neutral-50/80 shadow-sm hover:border-red-200 hover:shadow-md transition-all">
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D71920] uppercase tracking-wider mb-2">
                  <Sun className="h-3.5 w-3.5" /> {pj.capacity}
                </div>
                <h3 className="text-sm font-bold text-neutral-900">{pj.title}</h3>
                <p className="text-xs text-neutral-500 mt-1">{pj.client}</p>
                <div className="mt-3 pt-3 border-t border-neutral-200/60 flex items-center gap-1 text-[11px] text-neutral-400">
                  <MapPin className="h-3 w-3 text-neutral-400" /> {pj.loc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Clear answers on pricing, subsidies, roof sizing, and TANGEDCO net metering.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {page.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-neutral-200 bg-white px-6 data-[state=open]:border-red-200 data-[state=open]:shadow-soft transition-all"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 font-semibold text-neutral-900 text-base md:text-lg hover:text-[#D71920] transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 leading-relaxed pb-5 text-sm md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Internal Link Matrix */}
      <section className="py-12 bg-white border-t border-neutral-200/80">
        <div className="container mx-auto px-6 max-w-5xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
            Explore Related Solar Solutions in Chennai
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {page.relatedLinks.map((rl, i) => (
              <Link
                key={i}
                href={rl.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-700 hover:border-[#D71920] hover:text-[#D71920] hover:bg-red-50/50 transition-colors"
              >
                <span>{rl.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
