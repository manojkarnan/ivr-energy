'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, MapPin, Users, ArrowUp, Eye,
  X, ChevronLeft, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SEED_PROJECTS } from '@/data/projects'

export default function ProjectsPage() {
  const [projects, setProjects] = useState(SEED_PROJECTS)
  const [content, setContent] = useState(null)
  const [activeModalProject, setActiveModalProject] = useState(null)
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Fetch projects from API to reflect changes live from admin panel
    fetch('/api/projects')
      .then(r => r.json())
      .then(j => {
        if (Array.isArray(j.projects) && j.projects.length > 0) {
          setProjects(j.projects)
        }
      })
      .catch(() => {})

    // Fetch site content
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => {})
  }, [])

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!activeModalProject) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveModalProject(null)
      if (e.key === 'ArrowRight' && activeModalProject.gallery?.length) {
        setActivePhotoIdx(prev => (prev + 1) % activeModalProject.gallery.length)
      }
      if (e.key === 'ArrowLeft' && activeModalProject.gallery?.length) {
        setActivePhotoIdx(prev => (prev - 1 + activeModalProject.gallery.length) % activeModalProject.gallery.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeModalProject])

  const openQuickView = (e, project, initialIdx = 0) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveModalProject(project)
    setActivePhotoIdx(initialIdx)
  }

  return (
    <div className="min-h-screen bg-black font-sans antialiased text-neutral-100 selection:bg-[#D71920] selection:text-white">
      <Navbar content={content} />

      {/* SEO Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link itemProp="item" href="/"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">Projects</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* =========================================================================
          HERO SECTION (Dark Header Banner)
          ========================================================================= */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-12 overflow-hidden bg-black">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#D71920]/20 via-red-600/10 to-orange-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Subtle Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none -z-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 text-center max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Engineering Excellence Across{' '}
            <span className="bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">
              Tamil Nadu & Beyond
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            Explore our commissioned utility-scale, industrial captive, and commercial rooftop solar installations engineered for peak kilowatt-hour generation.
          </p>
        </div>
      </section>

      {/* =========================================================================
          MAIN PROJECT SHOWCASE GRID (Clean White Theme on Obsidian Canvas)
          ========================================================================= */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-10" id="portfolio">
        {/* Project Cards Grid - Centered items in lane */}
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => {
            const isIndustrial = project.type === 'Industrial'
            const photoCount = (project.gallery && project.gallery.length) || 1

            return (
              <article
                key={project.id}
                className="group flex flex-col rounded-3xl bg-white border border-neutral-200/80 hover:border-[#D71920]/40 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_35px_rgba(215,25,32,0.12)] w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-full"
              >
                {/* Image Container with Hover Zoom */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-100 cursor-pointer"
                  onClick={(e) => openQuickView(e, project, 0)}
                  title="Click to view installation gallery"
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Photo Count Pill */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15 shadow-sm">
                      <Eye className="h-3 w-3" />
                      {photoCount} {photoCount === 1 ? 'photo' : 'photos'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                      <span className="flex items-center gap-1.5 font-semibold text-neutral-800">
                        <Users className="h-3.5 w-3.5 text-[#D71920]" />
                        {project.client}
                      </span>
                      <span className="flex items-center gap-1.5 text-neutral-500">
                        <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                        {project.location}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 leading-snug">
                      <Link href={`/projects/${project.id}`} prefetch={true} className="hover:text-neutral-700 transition-colors">
                        {project.title}
                      </Link>
                    </h2>
                  </div>

                  {/* Card Footer: Dark Black Action */}
                  <div className="pt-4 border-t border-neutral-100">
                    <Link
                      href={`/projects/${project.id}`}
                      prefetch={true}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-black hover:bg-neutral-900 border border-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-98 group/btn"
                      aria-label={`View detailed project specs for ${project.title}`}
                    >
                      <span>VIEW PROJECT DETAILS</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#ff4b55] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* =========================================================================
            BOTTOM CALL-TO-ACTION (Conversion Accelerator Bento)
            ========================================================================= */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-black border border-neutral-800 p-8 sm:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#D71920]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Have a Roof, Factory, or Land? <br />
                  <span className="text-[#ff4b55]">Slash Your EB Bill to Zero.</span>
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Book a free on-site engineering survey with our solar specialists. We provide 3D shadow analysis, generation projections, DISCOM subsidy guidance, and instant ROI calculations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
                <Button
                  asChild
                  className="bg-[#D71920] hover:bg-[#b01319] text-white font-bold rounded-full px-8 h-12 text-sm shadow-[0_4px_25px_rgba(215,25,32,0.6)] transition-all hover:scale-105"
                >
                  <Link href="/contact">
                    Request Free Site Survey <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          MODERN QUICK-VIEW LIGHTBOX MODAL
          ========================================================================= */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveModalProject(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
                <div>
                  <span className="text-xs text-neutral-500 font-medium">
                    {activeModalProject.client} • {activeModalProject.location}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5">
                    {activeModalProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="h-9 w-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px] max-h-[55vh] overflow-hidden">
                <img
                  src={activeModalProject.gallery?.[activePhotoIdx] || activeModalProject.img}
                  alt={activeModalProject.title}
                  className="max-w-full max-h-full object-contain select-none"
                />

                {/* Arrow Controls */}
                {activeModalProject.gallery && activeModalProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhotoIdx(prev => (prev - 1 + activeModalProject.gallery.length) % activeModalProject.gallery.length)}
                      className="absolute left-3 sm:left-5 h-10 w-10 rounded-full bg-black/60 hover:bg-[#D71920] text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-95"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActivePhotoIdx(prev => (prev + 1) % activeModalProject.gallery.length)}
                      className="absolute right-3 sm:right-5 h-10 w-10 rounded-full bg-black/60 hover:bg-[#D71920] text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-95"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails Strip & Action Footer */}
              <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Thumbnails */}
                {activeModalProject.gallery && activeModalProject.gallery.length > 1 ? (
                  <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
                    {activeModalProject.gallery.map((thumbUrl, idx) => (
                      <button
                        key={thumbUrl}
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          activePhotoIdx === idx
                            ? 'border-[#D71920] scale-105 shadow-md'
                            : 'border-neutral-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-neutral-500">
                    Showing primary installation photograph.
                  </div>
                )}

                {/* Direct Link to Project Details */}
                <div className="flex items-center gap-3 shrink-0">
                  <Button
                    asChild
                    className="bg-[#D71920] hover:bg-[#b01319] text-white rounded-full text-xs font-bold px-5 h-9 shadow-md"
                  >
                    <Link href={`/projects/${activeModalProject.id}`}>
                      Full Project Details <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer content={content} />
      <ScrollToTop />
    </div>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#D71920] hover:bg-[#a5121a] text-white shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
