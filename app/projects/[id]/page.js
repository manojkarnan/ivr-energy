'use client'

import { use, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Users, Sparkles, Phone, Mail, Menu, X, ArrowRight,
  ChevronLeft, ChevronRight, PlayCircle, ArrowUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageLoader from '@/components/PageLoader'

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 260, 
      damping: 22 
    } 
  }
}

export default function ProjectPage({ params }) {
  const { id } = use(params)
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScrollEvent)

    // Fetch projects and find the matching ID
    fetch('/api/projects')
      .then(r => r.json())
      .then(j => {
        if (Array.isArray(j.projects)) {
          const found = j.projects.find(p => p.id === id)
          setProject(found)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Fetch site content configurations
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => {})

    return () => window.removeEventListener('scroll', handleScrollEvent)
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

  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'
  const phoneRaw = content?.contact?.phoneRaw || '919047777936'
  const email = content?.contact?.email || 'ivrenergysolutions@gmail.com'
  const address = content?.contact?.address || '3th floor, Door No - 1, Plot No - A, Manasarovar Nagar, Gerugambakkam, Chennai - 600122.'

  if (loading) {
    return <PageLoader text="Loading Project Details "  />
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-neutral-900">Project Not Found</h2>
        <p className="mt-4 text-neutral-600 max-w-md">We couldn't find the project details you are looking for. It may have been moved or deleted.</p>
        <Button asChild className="mt-8 bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-6">
          <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4 "  /> Back to Projects</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans antialiased text-neutral-900 animate-fade-in">
      {/* Navigation Header */}
      <header className={`fixed top-0 inset-x-0 z-50 py-3 px-4 sm:px-6 md:px-8 pointer-events-none transition-all duration-500 ${visible || open ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={`mx-auto max-w-7xl rounded-full border transition-all duration-500 flex items-center justify-between h-14 md:h-16 px-6 pointer-events-auto ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-3xl border-white/35 shadow-[0_15px_35px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.5)]' 
            : 'bg-white/50 backdrop-blur-2xl border-white/25 shadow-[0_10px_25px_rgba(0,0,0,0.05),_inset_0_2px_4px_rgba(255,255,255,0.4)]'
        }`}>
          <Link href="/ "  className="flex items-center group relative">
            <img src="/ivr-logo.webp "  alt="IVR Energy "  className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105 "  />
          </Link>
          <nav 
            className="hidden lg:flex items-center gap-1 relative " 
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV.map((n, idx) => {
              const isActive = n.label === 'Projects'
              const isHovered = hoveredIndex === idx
              const isHighlighted = isHovered || (isActive && hoveredIndex === null)
              return (
                <Link 
                  key={n.label} 
                  href={n.href} 
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full duration-300 ${isHighlighted ? 'text-[#D71920]' : 'text-neutral-700 hover:text-[#D71920]'}`}
                >
                  <span className="relative z-10">{n.label}</span>
                  {isHighlighted && (
                    <motion.div
                      layoutId="hoverBgProjectDetails " 
                      className="absolute inset-0 bg-[#D71920]/10 border border-[#D71920]/25 backdrop-blur-md rounded-full -z-10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.35),_0_6px_15px_-4px_rgba(215,25,32,0.15)]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:+${phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#D71920] transition-colors">
              <Phone className="h-4 w-4 "  /> {phoneDisplay}
            </a>
            <Button asChild className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-5 h-10 text-sm font-bold shadow-glow-red">
              <Link href="/#contact">Get Free Quote <ArrowRight className="ml-1.5 h-4 w-4 "  /></Link>
            </Button>
          </div>
          <button className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 "  onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6 "  /> : <Menu className="h-6 w-6 "  />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] lg:hidden " 
            />

            {/* Floating Drawer Card */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-4 right-4 w-[calc(100vw-2rem)] max-w-[340px] bg-[#0c0c0e]/95 border border-white/10 rounded-[28px] p-6 shadow-2xl z-[100] flex flex-col justify-between overflow-y-auto lg:hidden " 
            >
              <div>
                {/* Logo and Close Button */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-2xl font-bold tracking-tight text-white">IVR ENERGY</span>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-xl border border-white/5 transition-colors flex items-center justify-center " 
                  >
                    <X className="h-5 w-5 "  />
                  </button>
                </div>

                {/* Navigation Links - Staggered fade in down */}
                <motion.nav 
                  variants={containerVariants}
                  initial="hidden " 
                  animate="show " 
                  className="flex flex-col gap-1.5 " 
                >
                  {NAV.map((n) => (
                    <motion.div key={n.label} variants={itemVariants}>
                      <Link
                        href={n.href}
                        onClick={() => setOpen(false)}
                        className={`py-3 px-4 rounded-xl transition-all text-lg font-semibold tracking-wide flex items-center justify-between ${n.label === 'Projects' ? 'text-[#D71920] bg-white/5' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
                      >
                        {n.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                <a href={`tel:+${phoneRaw}`} className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm px-4">
                  <Phone className="h-4 w-4 text-[#D71920]" /> {phoneDisplay}
                </a>
                <Button
                  asChild
                  className="w-full bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full py-6 text-base font-bold shadow-glow-red " 
                >
                  <Link href="/#contact "  onClick={() => setOpen(false)}>Get Free Quote</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Banner / Hero */}
      <div className="relative h-[45vh] md:h-[55vh] flex items-end overflow-hidden pt-24 sm:pt-28 md:pt-32">
        <div className="absolute inset-0 z-0 animate-pulse-glow">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover "  />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent "  />
        </div>
        <div className="container mx-auto px-6 relative z-10 pb-8 md:pb-12 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="rounded-full bg-[#D71920] text-white text-xs font-semibold px-4 py-1.5 uppercase tracking-wider">{project.type}</span>
            <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">{project.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-6 py-12">
        <Link href="/projects "  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[#D71920] transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform "  /> Back to Projects
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column: Project Stats and Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-neutral-200/60 p-8 shadow-soft space-y-6">
              <h3 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-4">Project Overview</h3>
              <div className="space-y-4">
                {project.capacity && (
                  <div>
                    <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Capacity</div>
                    <div className="mt-1 text-lg font-bold text-neutral-800">{project.capacity}</div>
                  </div>
                )}
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Client</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#D71920]" /> {project.client}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Location</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#D71920]" /> {project.location}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Installation Type</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-800 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#D71920]" /> {project.type} Solar Installation
                  </div>
                </div>
              </div>
            </div>

            {/* Quote CTA card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#D71920] to-[#a5121a] text-white p-8 shadow-glow-red space-y-4">
              <h4 className="text-2xl font-bold leading-tight">Ready to switch to solar?</h4>
              <p className="text-sm opacity-90 leading-relaxed">Book a free site consultation with our expert solar engineers and get a customized design layout.</p>
              <Button asChild className="w-full bg-white hover:bg-neutral-50 text-[#D71920] font-bold rounded-full h-11 shadow-md">
                <Link href="/#contact">Request a Site Visit</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Project Gallery */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-neutral-200/60 p-8 shadow-soft">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Project Gallery</h3>
              {project.gallery && project.gallery.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.gallery.map((imgUrl, index) => (
                    <motion.div
                      key={imgUrl}
                      onClick={() => setLightbox(index)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-neutral-100 " 
                    >
                      <img src={imgUrl} alt={`${project.title} - ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 "  />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold px-4 py-2 border border-white/20">Zoom Photo</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-neutral-400 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                  <PlayCircle className="h-10 w-10 mx-auto text-neutral-300 mb-3 "  />
                  No additional photos available for this project.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && project.gallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 "  onClick={() => setLightbox(null)}>
            <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors "  aria-label="Close">
              <X className="h-5 w-5 "  />
            </button>
            <div className="absolute top-5 left-5 z-10 text-white">
              <div className="text-sm uppercase tracking-wider opacity-70">{project.client} " {project.location}</div>
              <div className="text-lg font-bold">{project.title}</div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); prevImg() }} className="absolute left-3 md:left-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors "  aria-label="Previous">
              <ChevronLeft className="h-6 w-6 "  />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextImg() }} className="absolute right-3 md:right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors "  aria-label="Next">
              <ChevronRight className="h-6 w-6 "  />
            </button>
            <div className="relative max-w-full max-h-[80vh] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img src={project.gallery[lightbox]} alt={project.title} className="w-full h-full object-contain "  />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-300 pt-20 pb-8 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="bg-white rounded-2xl px-6 py-5 inline-block shadow-lg">
                <img src="/ivr-logo.webp "  alt="IVR Energy "  className="h-20 md:h-24 w-auto object-contain "  />
              </div>
              <p className="mt-5 text-sm text-neutral-400 leading-relaxed">A specialist solar EPC company delivering turnkey rooftop, ground-mounted and captive solar power plants across India.</p>
              <p className="mt-4 text-xs text-neutral-500">GST: 33BTTPR9122F1ZB</p>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">Quick Links</div>
              <ul className="space-y-2.5 text-sm">
                {NAV.map(n => <li key={n.label}><Link href={n.href} className="hover:text-[#D71920] transition-colors">{n.label}</Link></li>)}
                <li><a href="/adminivr" className="hover:text-[#D71920] transition-colors inline-flex items-center gap-1.5">Admin Panel</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">Services</div>
              <ul className="space-y-2.5 text-sm">
                {['Solar Consultancy','EPC Services','Residential Rooftop','Commercial Rooftop','Industrial Solar','Ground Mounted','O&M','Subsidy Support'].map(s => (
                  <li key={s}><Link href="/#services "  className="hover:text-[#D71920] transition-colors">{s}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">Contact</div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-[#D71920]" /> <a href={`tel:+${phoneRaw}`} className="hover:text-white">{phoneDisplay}</a></li>
                <li className="flex gap-2 items-start">
                  <Mail className="h-4 w-4 mt-0.5 text-[#D71920] flex-shrink-0 "  />
                  <div className="flex flex-col gap-1">
                    {email.split(',').map(e => {
                      const cleanEmail = e.trim()
                      return (
                        <a key={cleanEmail} href={`mailto:${cleanEmail}`} className="hover:text-white transition-colors break-all">
                          {cleanEmail}
                        </a>
                      )
                    })}
                  </div>
                </li>
                <li className="flex gap-2 items-start"><MapPin className="h-4 w-4 mt-0.5 text-[#D71920] flex-shrink-0 "  /> <span className="leading-relaxed">{address}</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-500 flex flex-col sm:flex-row justify-between gap-4">
            <div>© {new Date().getFullYear()} IVR Energy. All rights reserved.</div>
            <div className="flex justify-center gap-6">
              <a href="# "  className="hover:text-neutral-400">Privacy Policy</a>
              <a href="# "  className="hover:text-neutral-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
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
    window.addEventListener('scroll', toggleVisibility)
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
