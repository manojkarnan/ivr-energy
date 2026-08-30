'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  Copy,
  MessageCircle,
  Linkedin,
  Instagram,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileCheck2,
  ChevronRight,
  Building2,
  CheckCircle2,
  Loader2
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { companyNAP } from '@/data/companyStats'

const PROJECT_TYPES = [
  { id: 'residential', label: 'Residential Rooftop (3kW - 10kW)' },
  { id: 'commercial', label: 'Commercial Rooftop (10kW - 100kW+)' },
  { id: 'industrial', label: 'Industrial Captive (100kW - 5MW+)' },
  { id: 'dpr_consulting', label: 'Solar DPR & Consultancy' },
  { id: 'subsidy_liaison', label: 'PM Surya Ghar Subsidy Liaison' },
]

export default function ContactPage() {
  const [copiedKey, setCopiedKey] = useState(null)
  const [content, setContent] = useState(null)
  const [selectedType, setSelectedType] = useState('residential')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  })

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        const c = data?.content || data
        if (c) {
          setContent(c)
        }
      })
      .catch(() => {})
  }, [])

  const contactData = content?.contact || {}
  const phone1 = contactData.phone || contactData.phoneRaw || companyNAP.phone
  const phone1Raw = contactData.phoneRaw || companyNAP.phoneRaw
  const phone2 = contactData.secondaryPhone || contactData.secondaryPhoneRaw || companyNAP.secondaryPhone
  const phone2Raw = contactData.secondaryPhoneRaw || companyNAP.secondaryPhoneRaw
  const email1 = contactData.email || companyNAP.primaryEmail
  const email2 = contactData.secondaryEmail || companyNAP.secondaryEmail
  const whatsappNumber = contactData.whatsapp || phone1Raw || companyNAP.phoneRaw
  const address =
    contactData.address ||
    companyNAP.address.multiline
  const secondaryAddressTitle = contactData.secondaryAddressTitle || ''
  const secondaryAddress = contactData.secondaryAddress || ''
  const secondaryAddressPhone = contactData.secondaryAddressPhone || ''
  const gst = contactData.gstNumber || companyNAP.gstNumber
  const instagramUrl = contactData.instagram || 'https://www.instagram.com/ivrenergy/'
  const linkedinUrl = contactData.linkedin || 'https://www.linkedin.com/company/ivr-energy'
  const hours = contactData.hours || 'Mon - Sat, 9:30 AM - 7:30 PM'

  const copyToClipboard = (text, key) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        type: 'contact',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        requirement: PROJECT_TYPES.find((t) => t.id === selectedType)?.label || selectedType,
        message: formData.message,
        source: 'contact_page',
        createdAt: new Date().toISOString(),
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          message: '',
        })
      } else {
        const errData = await res.json().catch(() => ({}))
        setError(errData.error || 'Failed to submit form. Please call us directly.')
      }
    } catch {
      setError('Network error occurred. Please call or WhatsApp our engineering desk.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-neutral-900 selection:bg-[#D71920] selection:text-white relative">
      <Navbar content={content} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact IVR Energy',
            description:
              'Get in touch with IVR Energy for solar rooftop installations, turnkey EPC engineering, PM Surya Ghar subsidy processing, and site surveys in Tamil Nadu.',
            url: 'https://ivrenergy.com/contact',
            mainEntity: {
              '@type': 'LocalBusiness',
              name: 'IVR Energy',
              image: 'https://ivrenergy.com/icon.png',
              telephone: phone1,
              email: email1,
              priceRange: '₹₹₹',
              address: {
                '@type': 'PostalAddress',
                streetAddress: companyNAP.address.streetAddress,
                addressLocality: companyNAP.address.city,
                addressRegion: companyNAP.address.state,
                postalCode: companyNAP.address.pincode,
                addressCountry: companyNAP.address.countryCode,
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 13.013929,
                longitude: 80.136652,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '19:30',
                },
              ],
            },
          }),
        }}
      />

      {/* =========================================================================
          HERO BANNER (Clean White & Soft Red Ambient Glow)
          ========================================================================= */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-white via-red-50/20 to-[#FAFAFA]">
        {/* Soft Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          {/* Main Hero Header */}
          {content?.contactPageTitle ? (
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-neutral-900 max-w-4xl mb-6"
              dangerouslySetInnerHTML={{ __html: content.contactPageTitle }}
            />
          ) : (
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-neutral-900 max-w-4xl mb-6">
              Let’s Power Your Space with{' '}
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-[#D71920] to-amber-600">
                Clean Solar Energy
              </span>
            </h1>
          )}

          <p className="text-neutral-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl font-normal">
            {content?.contactPageSubtitle || 'Have questions about rooftop feasibility, TANGEDCO net-metering, or PM Surya Ghar subsidies? Our engineering desk in Chennai is ready to assist with custom 3D layouts and zero-obligation site surveys.'}
          </p>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTACT SECTION: 21ST.DEV BENTO GRID (WHITE THEME)
          ========================================================================= */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl pb-24">
        {/* Unified 4-in-1 Contact Bento Box */}
        <div className="rounded-3xl bg-white border border-neutral-200/80 shadow-sm overflow-hidden mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-neutral-200/70">
          {/* Bento Section 1: Direct Hotline */}
          <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/40 transition-colors group sm:border-r sm:border-b lg:border-b-0 border-neutral-200/70">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-red-50 border border-red-100 text-[#D71920] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Phone className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Direct Hotline</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Speak to an Engineer</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Immediate consultation for residential, commercial & industrial solar setups.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <a
                  href={`tel:${phone1Raw}`}
                  className="font-mono text-sm font-semibold text-neutral-900 hover:text-[#D71920] transition-colors"
                >
                  {phone1}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(phone1, 'phone1')}
                  title="Copy Phone Number"
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {copiedKey === 'phone1' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={`tel:${phone2Raw}`}
                  className="font-mono text-sm font-semibold text-neutral-900 hover:text-[#D71920] transition-colors"
                >
                  {phone2}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(phone2, 'phone2')}
                  title="Copy Phone Number"
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {copiedKey === 'phone2' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Bento Section 2: Email Desk */}
          <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/40 transition-colors group sm:border-b lg:border-b-0 lg:border-r border-neutral-200/70">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Email Inquiries</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Project Proposals</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Send your electricity bills or architectural plans for detailed yield estimates.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${email1}`}
                  className="font-mono text-xs sm:text-sm font-semibold text-neutral-900 hover:text-blue-600 transition-colors truncate max-w-[170px]"
                >
                  {email1}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(email1, 'email1')}
                  title="Copy Email"
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors shrink-0"
                >
                  {copiedKey === 'email1' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${email2}`}
                  className="font-mono text-xs sm:text-sm font-semibold text-neutral-900 hover:text-blue-600 transition-colors truncate max-w-[170px]"
                >
                  {email2}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(email2, 'email2')}
                  title="Copy Email"
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors shrink-0"
                >
                  {copiedKey === 'email2' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Bento Section 3: WhatsApp Chat */}
          <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/40 transition-colors group sm:border-r border-neutral-200/70">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Instant Messaging</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">WhatsApp Support</h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Chat with our solar team on WhatsApp for instant quote estimates and brochure PDFs.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <a
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent('Hello IVR Energy Team, I would like to inquire about a solar rooftop installation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl h-10 transition-colors shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Start WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Bento Section 4: Corporate Office */}
          <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/40 transition-colors group">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Chennai Office</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Visit Our Office</h3>
              <address className="not-italic text-xs text-neutral-600 leading-relaxed mb-3 whitespace-pre-line">
                {address}
              </address>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center text-[11px] text-neutral-500">
              <span>GSTIN: <span className="text-neutral-900 font-mono font-semibold">{gst}</span></span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE CONSULTATION FORM & OFFICE DETAILS (2-Column Bento White)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Solar Inquiry Form (Span 7) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-10 shadow-sm space-y-7 relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D71920] font-bold text-xs uppercase tracking-wider border border-red-200/60 mb-3 shadow-xs">
                <FileCheck2 className="h-3.5 w-3.5" />
                <span>Zero-Cost Rooftop Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Request a Custom Solar Proposal
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Fill out your details below. Our senior project engineer will analyze your location and provide a tailored system sizing, ROI sheet, and subsidy estimate within 24 hours.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">Inquiry Submitted Successfully</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Your solar inquiry has been logged. An engineering expert has been assigned to your project and will reach out with a detailed technical & financial breakdown.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-bold h-10 px-6 cursor-pointer"
                >
                  Submit Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-[#D71920] text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* Requirement Chips */}
                <div>
                  <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
                    1. Select Solar Requirement Type
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedType === type.id
                            ? 'bg-[#D71920] text-white shadow-md border border-[#D71920]'
                            : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200 shadow-xs'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Your Full Name <span className="text-[#D71920]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#D71920] focus:ring-2 focus:ring-red-100 rounded-xl px-4 py-3 text-sm font-medium text-neutral-900 transition-all shadow-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Phone Number <span className="text-[#D71920]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#D71920] focus:ring-2 focus:ring-red-100 rounded-xl px-4 py-3 text-sm font-medium text-neutral-900 transition-all shadow-xs outline-none"
                    />
                  </div>
                </div>

                {/* Email & City Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#D71920] focus:ring-2 focus:ring-red-100 rounded-xl px-4 py-3 text-sm font-medium text-neutral-900 transition-all shadow-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      City / District in Tamil Nadu
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#D71920] focus:ring-2 focus:ring-red-100 rounded-xl px-4 py-3 text-sm font-medium text-neutral-900 transition-all shadow-xs outline-none"
                    />
                  </div>
                </div>

                {/* Message / Site Details */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                    Additional Project Notes or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#D71920] focus:ring-2 focus:ring-red-100 rounded-xl p-4 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 transition-all shadow-xs resize-none outline-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#D71920] hover:bg-[#b01319] active:scale-[0.99] text-white font-bold h-12 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer tracking-wide"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting Inquiry to Engineering Desk...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Solar Proposal & Cost Breakdown</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center text-[11px] text-neutral-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    100% Privacy Protected
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Map & Working Hours (Span 5 White Bento) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Embedded Google Map Box */}
            <div className="rounded-3xl bg-white border border-neutral-200/80 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                  <MapPin className="h-4 w-4 text-[#D71920]" />
                  <span>Chennai Office Location</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                  GPS Active
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-neutral-200 aspect-[16/10] bg-neutral-100 relative">
                <iframe
                  title="IVR Energy Chennai Office Location"
                  src="https://maps.google.com/maps?q=13.013929,80.136652&hl=en&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full opacity-95 hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <address className="not-italic text-xs text-neutral-600">{companyNAP.address.fullFormatted}</address>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=13.013929,80.136652"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  Get Directions <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Branch Office Dedicated Card (When Configured) */}
            {secondaryAddress && (
              <div className="rounded-3xl bg-white border border-neutral-200/80 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                    <Building2 className="h-4 w-4 text-purple-600" />
                    <span>{secondaryAddressTitle || 'Branch Office'}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                    Regional Office
                  </span>
                </div>
                {secondaryAddressPhone && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-neutral-500 font-medium">Branch Phone:</span>
                    <a href={`tel:${secondaryAddressPhone.replace(/\D/g, '')}`} className="font-mono font-bold text-neutral-900 hover:text-[#D71920] transition-colors">
                      {secondaryAddressPhone}
                    </a>
                  </div>
                )}
                <div className="text-xs text-neutral-600 leading-relaxed whitespace-pre-line pt-1">
                  {secondaryAddress}
                </div>
              </div>
            )}



            {/* Social Connect Bento Card */}
            <div className="rounded-3xl bg-white border border-neutral-200/80 p-6 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900">Follow IVR Energy</div>
                <div className="text-[11px] text-neutral-500">Stay updated on solar subsidies & projects</div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#0A66C2] text-white hover:bg-[#084e96] transition-all hover:scale-105 shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-sm hover:opacity-90 transition-all hover:scale-105"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer content={content} />
    </div>
  )
}
