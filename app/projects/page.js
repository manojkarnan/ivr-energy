'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Phone, Mail, MapPin, Menu, X, ArrowLeft, PlayCircle, Filter, Sparkles, Users, ArrowUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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

const SEED_PROJECTS = [
  { title: '1 MW Industrial Solar Plant', client: 'SVS', location: 'Vandavasi, Tamilnadu', capacity: '', year: 2024, type: 'Industrial', img: '/projects/svs-1mw/1.jpg', gallery: ['/projects/svs-1mw/1.jpg', '/projects/svs-1mw/2.jpg', '/projects/svs-1mw/3.jpg'] },
  { title: '1 MW Solar Rooftop', client: 'TPI', location: 'Avadi, Chennai', capacity: 1000, year: 2021, type: 'Industrial', img: '/projects/tpi-1mw/1.jpeg', gallery: ['/projects/tpi-1mw/1.jpeg','/projects/tpi-1mw/2.jpeg','/projects/tpi-1mw/3.jpeg','/projects/tpi-1mw/4.jpg','/projects/tpi-1mw/5.jpg'] },
  { title: '500 KW Solar Rooftop', client: 'TPI', location: 'Thiruthani', capacity: 500, year: 2021, type: 'Industrial', img: '/projects/tpi-500kw/1.jpg', gallery: ['/projects/tpi-500kw/1.jpg','/projects/tpi-500kw/2.jpg','/projects/tpi-500kw/3.jpg','/projects/tpi-500kw/4.jpg','/projects/tpi-500kw/5.jpg'] },
  { title: '330 KW Solar Rooftop', client: 'Muthukumaran Medical College', location: 'Chennai', capacity: 330, year: 2019, type: 'Commercial', img: '/projects/muthukumaran-330kw/1.jpg', gallery: ['/projects/muthukumaran-330kw/1.jpg','/projects/muthukumaran-330kw/2.png','/projects/muthukumaran-330kw/3.png','/projects/muthukumaran-330kw/4.png'] },
  { title: '170 KW Solar Rooftop', client: 'Muthukumaran College', location: 'Mangadu, Chennai', capacity: 170, year: 2019, type: 'Commercial', img: '/projects/muthukumaran-170kw/1.png', gallery: ['/projects/muthukumaran-170kw/1.png','/projects/muthukumaran-170kw/2.png','/projects/muthukumaran-170kw/3.png','/projects/muthukumaran-170kw/4.png'] },
  { title: '100 KW Solar Rooftop', client: 'T&I Projects', location: 'Coimbatore', capacity: 100, year: 2021, type: 'Industrial', img: '/projects/ti-100kw/1.jpg', gallery: ['/projects/ti-100kw/1.jpg','/projects/ti-100kw/2.jpg','/projects/ti-100kw/3.jpg','/projects/ti-100kw/4.jpg','/projects/ti-100kw/5.jpg'] },
  { title: '82 KW Solar Rooftop', client: 'Thyrocare', location: 'Delhi', capacity: 82, year: 2021, type: 'Commercial', img: '/projects/thyrocare-82kw/1.jpeg', gallery: ['/projects/thyrocare-82kw/1.jpeg','/projects/thyrocare-82kw/2.jpg','/projects/thyrocare-82kw/3.jpeg','/projects/thyrocare-82kw/4.jpeg'] },
  { title: '50 KW Solar Rooftop', client: 'NU-TECH Industrial Parts', location: 'Sriperumbathur', capacity: 50, year: 2021, type: 'Industrial', img: '/projects/nutech-50kw/1.jpeg', gallery: ['/projects/nutech-50kw/1.jpeg','/projects/nutech-50kw/2.jpeg','/projects/nutech-50kw/3.jpeg'] },
  { title: '40 KW Solar Rooftop', client: 'NU-TECH Industrial Parts', location: 'Gerugambakkam, Chennai', capacity: 40, year: 2021, type: 'Industrial', img: '/projects/nutech-40kw/1.jpeg', gallery: ['/projects/nutech-40kw/1.jpeg','/projects/nutech-40kw/2.jpeg','/projects/nutech-40kw/3.jpeg','/projects/nutech-40kw/4.jpeg'] },
  { title: '30 KW Bi-Facial Rooftop', client: 'B.M Hospital', location: 'Ambathur', capacity: 30, year: 2021, type: 'Commercial', img: '/projects/bm-hospital-30kw/1.jpeg', gallery: ['/projects/bm-hospital-30kw/1.jpeg','/projects/bm-hospital-30kw/2.jpeg','/projects/bm-hospital-30kw/3.jpeg'] },
  { title: '25 KW Solar Rooftop', client: 'Akshaya Builders', location: 'Kovur, Chennai', capacity: 25, year: 2021, type: 'Commercial', img: '/projects/akshaya-25kw/1.jpg', gallery: ['/projects/akshaya-25kw/1.jpg','/projects/akshaya-25kw/2.jpg','/projects/akshaya-25kw/3.jpeg','/projects/akshaya-25kw/4.jpg','/projects/akshaya-25kw/5.jpg'] },
  { title: '20 KW Solar Rooftop', client: 'Tennis Academy', location: 'Pallavaram', capacity: 20, year: 2021, type: 'Commercial', img: '/projects/tennis-20kw/1.jpeg', gallery: ['/projects/tennis-20kw/1.jpeg','/projects/tennis-20kw/2.jpeg','/projects/tennis-20kw/3.jpeg','/projects/tennis-20kw/4.jpeg'] },
  { title: '10 KW Solar Rooftop', client: 'Jilaba Software', location: 'Chennai', capacity: 10, year: 2021, type: 'Commercial', img: '/projects/jilaba-10kw/1.jpg', gallery: ['/projects/jilaba-10kw/1.jpg','/projects/jilaba-10kw/2.jpg','/projects/jilaba-10kw/3.jpg'] },
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState(SEED_PROJECTS)
  const [filter, setFilter] = useState('All')
  const [content, setContent] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
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
    window.addEventListener('scroll', handleScrollEvent, { passive: true })

    // Fetch projects
    fetch('/api/projects')
      .then(r => r.json())
      .then(j => {
        if (Array.isArray(j.projects) && j.projects.length) setProjects(j.projects)
      })
      .catch(() => {})

    // Fetch site content
    fetch('/api/content')
      .then(r => r.json())
      .then(j => setContent(j.content))
      .catch(() => {})

    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])

  const filtered = projects.filter(p => filter === 'All' || p.type === filter)
  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'
  const phoneRaw = content?.contact?.phoneRaw || '919047777936'
  const email = content?.contact?.email || 'ivrenergysolutions@gmail.com'
  const address = content?.contact?.address || '3th floor, Door No - 1, Plot No - A, Manasarovar Nagar, Gerugambakkam, Chennai - 600122.'

  const eyebrow = content?.projectsEyebrow || 'Featured EPC Projects'
  const titleHtml = content?.projectsTitle || 'From <span class="text-gradient-red">1 KW</span> rooftops to <span class="text-gradient-red">10 MW</span> plants'
  const subtitle = content?.projectsSubtitle || 'A portfolio built across Chennai, Coimbatore, Delhi and beyond " spanning industries, campuses and homes.'

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans antialiased text-neutral-900 animate-fade-in">
      <Navbar content={content} />

      {/* Main Content Hero Banner */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-[#1a0505] to-neutral-950 text-white py-24 md:py-32 lg:py-36 overflow-hidden pt-28">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D71920]/40 blur-3xl "  />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl "  />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words" dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </div>

      {/* Portfolio Grid Section */}
      <div className="container mx-auto px-6 py-16">
        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-white border border-neutral-200 p-1.5 shadow-sm">
            {['All', 'Industrial', 'Commercial'].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${filter === t ? 'bg-[#D71920] text-white shadow-md' : 'text-neutral-700 hover:text-neutral-900'}`}
              >
                <Filter className="h-3.5 w-3.5 opacity-70 "  /> {t}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <Link key={p.title + p.location} href={`/projects/${p.id}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="relative overflow-hidden rounded-3xl bg-white shadow-soft border border-neutral-100 cursor-pointer h-full flex flex-col " 
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 "  loading="lazy "  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 "  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-[#D71920] text-white text-xs font-semibold px-3 py-1">{p.type}</span>
                  </div>
                  {p.gallery && (
                    <div className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1 flex items-center gap-1.5">
                      <PlayCircle className="h-3.5 w-3.5 "  /> {p.gallery.length} photos
                    </div>
                  )}
                  {p.capacity && (String(p.capacity).includes('KW') || String(p.capacity).includes('MW')) && (
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-2xl font-bold">{p.capacity}</div>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-lg text-neutral-900 leading-tight group-hover:text-[#D71920] transition-colors">{p.title}</div>
                    <div className="mt-3 flex items-center gap-1.5 text-sm text-neutral-500"><Users className="h-4 w-4 text-[#D71920]/75 "  /> {p.client}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500"><MapPin className="h-4 w-4 text-[#D71920]/75 "  /> {p.location}</div>
                  </div>
                  {p.gallery && (
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D71920] group-hover:gap-3 transition-all">
                      View details <ArrowRight className="h-4 w-4 "  />
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <Footer content={content} />
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
    window.addEventListener('scroll', toggleVisibility, { passive: true })
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
