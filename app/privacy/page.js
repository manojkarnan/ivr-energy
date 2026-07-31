'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Lock, ArrowLeft, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => { })
  }, [])

  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'
  const phoneRaw = content?.contact?.phoneRaw || '919047777936'
  const email = content?.contact?.email || 'ivrenergysolutions@gmail.com'

  return (
    <div className="min-h-screen bg-neutral-50 font-sans antialiased text-neutral-900">
      <Navbar content={content} />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-[#1a0505] to-neutral-950 text-white py-24 md:py-32 overflow-hidden pt-28">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D71920]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-300 mb-6">
            <Lock className="h-3.5 w-3.5" /> Data Security & Trust
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Privacy <span className="text-gradient-red">Policy</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            At IVR Energy, we are committed to safeguarding your personal details and rooftop solar data. Learn how we handle and protect your information.
          </p>
          <div className="mt-4 text-xs text-neutral-400 font-medium">
            Last Updated: {content?.privacyLastUpdated || 'July 2026'} • IVR Energy (OPC) Private Limited
          </div>
        </div>
      </div>

      {/* Privacy Body Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 border border-neutral-200 shadow-soft space-y-10 text-neutral-700 leading-relaxed text-sm md:text-base">
          {content?.privacyText ? (
            <div className="leading-relaxed text-neutral-800 font-sans space-y-6" dangerouslySetInnerHTML={{ __html: content.privacyText.includes('<') ? content.privacyText : content.privacyText.replace(/\n/g, '<br/>') }} />
          ) : (
            <>
              {/* Section 1 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">1</span>
              Introduction
            </h2>
            <p>
              IVR Energy (OPC) Private Limited ("<strong>IVR Energy</strong>", "we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal and technical information gathered when you visit <Link href="/" className="text-[#D71920] font-semibold hover:underline">ivrenergysolutions.com</Link>, request a quote, or use our solar installation services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">2</span>
              Information We Collect
            </h2>
            <p className="mb-3">We collect information that you voluntarily provide to us, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li><strong>Contact Information:</strong> Name, phone number, email address, and site installation address.</li>
              <li><strong>Electricity Consumption Data:</strong> Average monthly electricity bill amount, unit consumption, phase details (single-phase / three-phase), and DISCOM connection number.</li>
              <li><strong>Technical Site Information:</strong> Rooftop area, shadow constraints, building type (residential, commercial, industrial).</li>
              <li><strong>Documents for Subsidy & Net Metering:</strong> Aadhar, PAN, electricity bill copies, and bank account details required for government PM Surya Ghar subsidy application processing.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">3</span>
              How We Use Your Information
            </h2>
            <p className="mb-3">We use your information exclusively to provide high-quality solar engineering services, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>Generating accurate solar DPR proposals, system sizing, and financial payback estimates</li>
              <li>Filing official PM Surya Ghar subsidy applications on government portals</li>
              <li>Submitting net-metering applications with DISCOM nodal officers (e.g., TANGEDCO)</li>
              <li>Setting up cloud-based smart inverter monitoring accounts for your system</li>
              <li>Communicating project execution updates, O&M service alerts, and support responses</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">4</span>
              Information Sharing & Disclosure
            </h2>
            <p className="mb-3">
              We do <strong>not</strong> sell, rent, or trade your personal information to third-party marketing companies. We share information only with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li><strong>Government & Regulatory Nodal Agencies:</strong> MNRE, National Portal for PM Surya Ghar, and local electricity distribution companies (DISCOMs) for official net-metering & subsidy processing.</li>
              <li><strong>Financial Partners:</strong> Partner banks and Non-Banking Financial Companies (NBFCs) if you request solar loan assistance.</li>
              <li><strong>Authorized Service Engineers:</strong> Our field engineers strictly for conducting site surveys and installing your solar plant.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">5</span>
              Data Security
            </h2>
            <p>
              We implement industry-standard administrative, technical, and physical security measures to safeguard your personal data against unauthorized access, loss, or disclosure. Cloud-based monitoring and database connections use encrypted SSL/TLS protocols.
            </p>
          </section>

          {/* Section 6 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">6</span>
              Your Rights & Choices
            </h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or opt out of non-essential promotional communications at any time by contacting our privacy officer at <a href={`mailto:${email}`} className="text-[#D71920] font-semibold hover:underline">{email}</a>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">7</span>
              Contact Us
            </h2>
            <p className="mb-2">If you have any questions or concerns regarding this Privacy Policy, please reach out to us:</p>
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 text-sm space-y-1.5">
              <p><strong>IVR Energy (OPC) Private Limited</strong></p>
              <p>3rd Floor, Door No. 1, Plot No. A, Manasarovar Nagar, Gerugambakkam, Chennai - 600122</p>
              <p>Email: <a href={`mailto:${email}`} className="text-[#D71920] font-semibold hover:underline">{email}</a></p>
              <p>Phone: <a href={`tel:+${phoneRaw}`} className="text-[#D71920] font-semibold hover:underline">{phoneDisplay}</a></p>
            </div>
          </section>
        </>
      )}
        </div>
      </div>

      <Footer content={content} />
    </div>
  )
}
