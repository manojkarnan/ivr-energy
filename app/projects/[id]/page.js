'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Users, Zap, ArrowRight,
  ChevronLeft, ChevronRight, PlayCircle, X,
  Building2, Factory, Calculator, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import PageLoader from '@/components/PageLoader'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SEED_PROJECTS } from '@/data/projects'

function findProjectMatch(searchId, list) {
  if (!searchId || !list?.length) return null
  const clean = decodeURIComponent(searchId).toLowerCase().trim()
  const cleanNorm = clean.replace(/[^a-z0-9]/g, '')

  return list.find(p => {
    if (!p) return false
    const pId = (p.id || '').toLowerCase()
    const pTitle = (p.title || '').toLowerCase()
    const pImg = (p.img || '').toLowerCase()
    const pSlug = pTitle.replace(/\s+/g, '-')

    if (pId === clean || pId.replace(/[^a-z0-9]/g, '') === cleanNorm) return true
    if (pSlug === clean || pSlug.replace(/[^a-z0-9]/g, '') === cleanNorm) return true
    if (pImg.includes(clean) || (clean.length > 3 && pImg.includes(clean.split('-')[0]))) return true
    if (pTitle.replace(/[^a-z0-9]/g, '').includes(cleanNorm)) return true
    return false
  })
}

export default function ProjectPage({ params }) {
  const { id } = use(params)
  const initialMatch = findProjectMatch(id, SEED_PROJECTS)
  const [project, setProject] = useState(() => initialMatch ? {
    ...initialMatch,
    capacity: initialMatch.capacity || (initialMatch.title.match(/(\d+\s*(?:MW|KW))/i) ? initialMatch.title.match(/(\d+\s*(?:MW|KW))/i)[0] : 'Solar EPC'),
    gallery: (initialMatch.gallery && initialMatch.gallery.length) ? initialMatch.gallery : (initialMatch.img ? [initialMatch.img] : [])
  } : null)
  const [loading, setLoading] = useState(() => !initialMatch)
  const [content, setContent] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Fetch projects from API to get any newly updated CMS data
    fetch('/api/projects')
      .then(r => r.json())
      .then(j => {
        if (Array.isArray(j.projects)) {
          const found = findProjectMatch(id, j.projects) || initialMatch
          if (found) {
            setProject({
              ...found,
              capacity: found.capacity || (found.title.match(/(\d+\s*(?:MW|KW))/i) ? found.title.match(/(\d+\s*(?:MW|KW))/i)[0] : 'Solar EPC'),
              gallery: (found.gallery && found.gallery.length) ? found.gallery : (found.img ? [found.img] : [])
            })
          }
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Fetch site content configurations
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => {})
  }, [id])

  const nextImg = () => {
    if (!project?.gallery?.length) return
    setLightbox(idx => (idx + 1) % project.gallery.length)
  }

  const prevImg = () => {
    if (!project?.gallery?.length) return
    setLightbox(idx => (idx - 1 + project.gallery.length) % project.gallery.length)
  }

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') nextImg()
      if (e.key === 'ArrowLeft') prevImg()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, project])

  if (loading) {
    return <PageLoader text="Loading Project Specifications..." />
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fafafc] flex flex-col items-center justify-center p-6 text-center text-neutral-900">
        <div className="h-16 w-16 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#D71920] mb-4">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-neutral-900">Project Not Found</h2>
        <p className="mt-3 text-neutral-600 max-w-md text-sm">
          We couldn't locate the specific solar project details you requested. It may have been updated or moved.
        </p>
        <Button asChild className="mt-8 bg-[#D71920] hover:bg-[#b01319] text-white rounded-full px-8 h-11 text-xs font-bold shadow-md">
          <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Project Portfolio</Link>
        </Button>
      </div>
    )
  }

  const isIndustrial = project.type === 'Industrial'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-black font-sans antialiased text-neutral-100 selection:bg-[#D71920] selection:text-white"
    >
      <Navbar content={content} />

      {/* Hero Banner with Dark Vignette Header for strong photo presence */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-black text-white">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover brightness-[0.35] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-[#D71920]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          {/* Breadcrumb Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors mb-6 group px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform text-[#ff4b55]" />
            Back to All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Engineered and commissioned for <strong className="text-white">{project.client}</strong> in {project.location}. Delivering clean, cost-efficient solar power with zero grid interruptions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout (Clean White Theme) */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Project Overview Bento & Quick Actions (Span 4) */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Overview Bento Card (White) */}
            <div className="rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4">
              <div className="space-y-3 text-xs sm:text-sm">
                {project.capacity && (
                  <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 flex items-center justify-between">
                    <span className="text-neutral-500 font-medium">Plant Capacity</span>
                    <span className="font-extrabold text-neutral-900 text-base">{project.capacity}</span>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Client Name</span>
                  <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-[#D71920]" /> {project.client}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Location</span>
                  <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#D71920]" /> {project.location}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Structure Type</span>
                  <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    {isIndustrial ? <Factory className="h-4 w-4 text-neutral-600" /> : <Building2 className="h-4 w-4 text-neutral-600" />}
                    {project.type} Installation
                  </span>
                </div>
              </div>
            </div>

            {/* Turnkey Consultation CTA Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#D71920] to-[#b01319] p-6 sm:p-7 text-white shadow-xl space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                Start Your Project
              </span>
              <h3 className="text-xl font-bold leading-tight text-white">
                Get a Similar Solar Plant for Your Facility
              </h3>
              <p className="text-xs text-white/90 leading-relaxed">
                Connect with our senior EPC engineers for site feasibility, generation estimations, and transparent turnkey pricing.
              </p>
              <div className="pt-2">
                <Button asChild className="w-full bg-white hover:bg-neutral-100 text-[#D71920] font-bold rounded-full h-11 text-xs shadow-md">
                  <Link href="/contact">Book Free Site Survey <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Res Project Gallery (Span 8) */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 space-y-8"
          >
            <div className="rounded-3xl bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">Installation Gallery</h3>
                <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 shrink-0 whitespace-nowrap">
                  {project.gallery?.length || 1} Photos
                </span>
              </div>

              {project.gallery && project.gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((imgUrl, index) => {
                    const isOddLast = (project.gallery.length % 2 !== 0) && (index === project.gallery.length - 1)

                    return (
                      <div
                        key={imgUrl}
                        onClick={() => setLightbox(index)}
                        className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-neutral-200/80 hover:border-[#D71920]/60 transition-all duration-300 shadow-sm hover:shadow-md bg-neutral-100 ${
                          isOddLast ? 'sm:col-span-2 sm:max-w-[calc(50%-0.5rem)] sm:mx-auto w-full' : ''
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${project.title} - View ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <InteractiveHoverButton
                            text="Zoom"
                            className="bg-white text-black border-black shadow-2xl hover:border-black"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-500 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                  <PlayCircle className="h-10 w-10 mx-auto text-neutral-400 mb-3" />
                  No additional photographs available for this project.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && project.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-[#D71920] text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute top-5 left-5 z-10 text-white">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">{project.client} • {project.location}</div>
              <div className="text-base sm:text-lg font-bold mt-0.5">{project.title}</div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); prevImg() }}
              className="absolute left-3 md:left-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-[#D71920] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImg() }}
              className="absolute right-3 md:right-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-[#D71920] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="relative max-w-full max-h-[82vh] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img src={project.gallery[lightbox]} alt={project.title} className="w-full h-full object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer content={content} />
    </motion.div>
  )
}
