'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}

export default function Navbar({ onQuote, content }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeSection, setActiveSection] = useState('Home')
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollY = useRef(0)

  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'
  const phoneRaw = content?.contact?.phoneRaw || '919047777936'

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 30)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Track active page/section
  useEffect(() => {
    if (pathname === '/services') {
      setActiveSection('Services')
    } else if (pathname === '/projects' || pathname?.startsWith('/projects/')) {
      setActiveSection('Projects')
    } else if (pathname === '/faqs') {
      setActiveSection('FAQs')
    } else if (pathname === '/blog' || pathname?.startsWith('/blog/')) {
      setActiveSection('Blog')
    } else if (pathname === '/contact') {
      setActiveSection('Contact')
    } else if (pathname === '/') {
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      if (hash) {
        const targetId = hash.substring(1)
        const matched = NAV_ITEMS.find(
          (item) => item.href.endsWith(`#${targetId}`) || item.label.toLowerCase() === targetId.toLowerCase()
        )
        if (matched) setActiveSection(matched.label)
      } else {
        setActiveSection('Home')
      }
    }
  }, [pathname])

  const handleNavClick = (e, href, label) => {
    setActiveSection(label)
    if (href.includes('#')) {
      const targetId = href.substring(href.indexOf('#') + 1)
      if (pathname === '/') {
        e.preventDefault()
        setOpen(false)
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          window.history.replaceState(null, '', '/')
        } else {
          const elem = document.getElementById(targetId)
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
            window.history.replaceState(null, '', `#${targetId}`)
          }
        }
      } else {
        setOpen(false)
      }
    } else {
      setOpen(false)
    }
  }

  const handleQuoteClick = () => {
    setOpen(false)
    if (onQuote) {
      onQuote()
    } else if (pathname === '/') {
      const contactElem = document.getElementById('contact')
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else if (typeof window !== 'undefined') {
      window.location.href = '/#contact'
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          pathname === '/services' || visible || open ? 'translate-y-0' : '-translate-y-full'
        } py-3 px-3 sm:px-6 lg:px-8 pointer-events-none`}
      >
        <div
          className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 flex items-center justify-between h-14 lg:h-16 px-4 sm:px-6 lg:px-8 pointer-events-auto ${scrolled
              ? 'bg-white/95 backdrop-blur-2xl border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.6)]'
              : 'bg-white/90 backdrop-blur-2xl border-white/40 shadow-[0_8px_25px_rgba(0,0,0,0.06),_inset_0_1px_2px_rgba(255,255,255,0.5)]'
            }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') handleNavClick(e, '/#home', 'Home')
            }}
            className="flex items-center group relative"
          >
            <img
              src="/ivr-logo.webp"
              alt="IVR Energy"
              className="h-8 sm:h-10 lg:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_ITEMS.map((n, idx) => {
              const isActive = activeSection === n.label
              const isHovered = hoveredIndex === idx
              const isHighlighted = isHovered || (isActive && hoveredIndex === null)

              return (
                <Link
                  key={n.label}
                  href={n.href}
                  onClick={(e) => handleNavClick(e, n.href, n.label)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative px-3.5 py-1.5 text-sm font-semibold transition-colors rounded-full duration-200 ${isHighlighted ? 'text-[#D71920]' : 'text-neutral-700 hover:text-[#D71920]'
                    }`}
                >
                  <span className="relative z-10">{n.label}</span>
                  {isHighlighted && (
                    <motion.div
                      layoutId="hoverBgNavbar"
                      className="absolute inset-0 bg-[#D71920]/10 border border-[#D71920]/20 backdrop-blur-md rounded-full -z-10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA & Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:+${phoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-800 hover:text-[#D71920] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> {phoneDisplay}
            </a>
            <Button
              onClick={handleQuoteClick}
              className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-full px-5 h-9 text-xs font-bold uppercase tracking-wide shadow-glow-red"
            >
              Get Free Quote <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="lg:hidden p-2 rounded-xl text-neutral-800 hover:bg-neutral-100/80 active:scale-95 transition-all"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Floating Card Mobile Navigation Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[99] lg:hidden bg-black/40 backdrop-blur-md"
            />

            {/* Floating Card container */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="fixed top-3 left-3 right-3 z-[100] lg:hidden bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-2xl border border-white/60 p-6 overflow-hidden max-h-[92vh] flex flex-col justify-between"
            >
              {/* Header: Logo & Close Icon */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <img src="/ivr-logo.webp" alt="IVR Energy" className="h-8 sm:h-9 w-auto object-contain" />
                <motion.button
                  onClick={() => setOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-4.5 w-4.5" />
                </motion.button>
              </div>

              {/* Links List */}
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="py-3 flex-1 overflow-y-auto space-y-1"
              >
                {NAV_ITEMS.map((n) => {
                  const isActive = activeSection === n.label
                  return (
                    <motion.div key={n.label} variants={itemVariants}>
                      <Link
                        href={n.href}
                        onClick={(e) => handleNavClick(e, n.href, n.label)}
                        className={`block py-2 text-lg font-bold transition-colors duration-150 ${isActive
                            ? 'text-[#D71920]'
                            : 'text-neutral-800 hover:text-[#D71920]'
                          }`}
                      >
                        {n.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.nav>

              {/* Phone Line & CTA Button */}
              <div className="pt-2 border-t border-neutral-100 flex flex-col gap-3">
                <a
                  href={`tel:+${phoneRaw}`}
                  className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium"
                >
                  <Phone className="h-4 w-4 text-neutral-400" />
                  <span>{phoneDisplay}</span>
                </a>

                <Button
                  onClick={handleQuoteClick}
                  className="w-full bg-[#18181b] hover:bg-black text-white rounded-full py-6 text-sm font-bold uppercase tracking-wider shadow-md active:scale-[0.99] transition-transform"
                >
                  GET FREE QUOTE
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
