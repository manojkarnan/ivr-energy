'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, FileText, ArrowLeft, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
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
            <FileText className="h-3.5 w-3.5" /> Legal & Transparency
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Terms & <span className="text-gradient-red">Conditions</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Please read these terms and conditions carefully before engaging IVR Energy for solar EPC services, site surveys, or proposals.
          </p>
          <div className="mt-4 text-xs text-neutral-400 font-medium">
            Last Updated: {content?.termsLastUpdated || 'July 2026'} • IVR Energy (OPC) Private Limited
          </div>
        </div>
      </div>

      {/* Terms Body Section */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 border border-neutral-200 shadow-soft space-y-10 text-neutral-700 leading-relaxed text-sm md:text-base">
          {content?.termsText ? (
            <div
              className="leading-relaxed text-neutral-800 font-sans space-y-6"
              dangerouslySetInnerHTML={{
                __html: (() => {
                  const cleaned = content.termsText.replace(/\\n/g, '\n')
                  return cleaned.includes('<') ? cleaned : cleaned.replace(/\n/g, '<br/>')
                })()
              }}
            />
          ) : (
            <>
              {/* Section 1 */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">1</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing our website (<Link href="/" className="text-[#D71920] font-semibold hover:underline">ivrenergysolutions.com</Link>), requesting a quote, or entering into an agreement with <strong>IVR Energy</strong> for solar Engineering, Procurement, and Construction (EPC) services, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">2</span>
              Scope of Solar EPC Services
            </h2>
            <p className="mb-3">
              IVR Energy provides turnkey solar energy solutions across Residential, Commercial, and Industrial sectors, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>Site shadow analysis and structural feasibility studies</li>
              <li>Design, engineering, and equipment supply (Tier-1 PV modules & inverters)</li>
              <li>Erection, testing, and commissioning of rooftop or ground-mounted solar systems</li>
              <li>Assistance with DISCOM net-metering approvals and government solar subsidy processing</li>
              <li>Operations & Maintenance (O&M) contracts as specified in individual agreements</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">3</span>
              Estimates & Pricing
            </h2>
            <p className="mb-3">
              All financial estimates generated on our savings calculator or initial quotations are indicative. Final system sizing and pricing depend on detailed technical site surveys.
            </p>
            <p>
              Government subsidy assistance is subject to eligibility guidelines published by the Ministry of New and Renewable Energy (MNRE) and local DISCOMs (e.g., TANGEDCO). IVR Energy facilitates filing and coordination but is not responsible for delays caused by DISCOM portal downtime or government disbursal schedules.
            </p>
          </section>

          {/* Section 4 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">4</span>
              Customer Responsibilities
            </h2>
            <p className="mb-3">The customer agrees to:</p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li>Provide clear, uninhibited access to the rooftop or installation site for installation and testing</li>
              <li>Ensure structural stability of the installation area to support solar mounting structures</li>
              <li>Provide necessary documentation (electricity bills, property proof, identity documents) required for net metering and subsidy applications</li>
              <li>Maintain safe working conditions during site execution</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">5</span>
              Warranties & Guarantees
            </h2>
            <p className="mb-3">
              IVR Energy supplies equipment backed by leading original equipment manufacturer (OEM) warranties:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-600">
              <li><strong>Solar PV Modules:</strong> 10-Year product warranty and 25-Year performance output warranty (as per manufacturer terms).</li>
              <li><strong>Inverters:</strong> Standard 5 to 10-Year manufacturer warranty depending on model selected.</li>
              <li><strong>Workmanship:</strong> 1-Year workmanship warranty covering installation integrity by IVR Energy.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">6</span>
              Limitation of Liability
            </h2>
            <p>
              IVR Energy shall not be held liable for indirect, incidental, or consequential damages resulting from power grid outages, extreme weather events, grid instability beyond specified tolerances, or unauthorized tampering with equipment by third parties.
            </p>
          </section>

          {/* Section 7 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">7</span>
              Governing Law & Jurisdiction
            </h2>
            <p>
              These terms are governed by the laws of India. Any legal disputes or claims arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in <strong>Chennai, Tamil Nadu, India</strong>.
            </p>
          </section>

          {/* Section 8 */}
          <section className="pt-6 border-t border-neutral-100">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">8</span>
              Contact Information
            </h2>
            <p className="mb-2">For any questions regarding these Terms & Conditions, please contact us:</p>
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
