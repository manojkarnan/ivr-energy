'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowDown, Zap, ShieldCheck, Sun, IndianRupee, Award, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { companyStats } from '@/data/companyStats'

export default function AnimatedHero({
  badgeText = 'Free • Instant • No Signup Required',
  title = 'Solar Savings',
  highlightText = 'Calculator',
  description = 'Estimate your rooftop solar system size, installation cost, monthly savings, government subsidies, and ROI in seconds.',
  ctaTarget = '#calculator-form',
  ctaText = 'Start Free Calculation',
  stats = [
    { label: 'Avg. Bill Reduction', value: 'Up to 90%', icon: Zap },
    { label: 'Govt. MNRE Subsidy', value: 'Up to ₹78,000', icon: IndianRupee },
    { label: 'Solar Warranty', value: '25 Years', icon: ShieldCheck },
    { label: 'Projects Delivered', value: `${companyStats.projects} Projects`, icon: Sun },
  ],
}) {
  const [mousePosition, setMousePosition] = useState({ x: 600, y: 300 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const elem = sectionRef.current
    if (elem) {
      elem.addEventListener('mousemove', handleMouseMove)
      return () => elem.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="calculator-hero"
      aria-label="Solar Calculator Hero"
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-gradient-to-b from-neutral-950 via-[#150707] to-neutral-900 text-white flex flex-col items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* ─── 21st.dev Animated Interactive SVG Grid & Glow Background ─── */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-80">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <g clipPath="url(#hero-clip)">
            {/* Grid Pattern */}
            {[...Array(35)].map((_, i) => (
              <React.Fragment key={`grid-col-${i}`}>
                {[...Array(23)].map((_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={-20.0891 + i * 36}
                    y={9.2 + j * 36}
                    width="35.6"
                    height="35.6"
                    stroke="#ffffff"
                    strokeOpacity="0.04"
                    strokeWidth="0.4"
                    strokeDasharray="2 2"
                  />
                ))}
              </React.Fragment>
            ))}

            {/* Glowing Accent Squares */}
            <rect x="699.7" y="81" width="36" height="36" fill="#D71920" fillOpacity="0.2" className="animate-pulse" />
            <rect x="195.7" y="153" width="36" height="36" fill="#f59e0b" fillOpacity="0.25" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <rect x="1023.7" y="153" width="36" height="36" fill="#D71920" fillOpacity="0.15" />
            <rect x="123.7" y="225" width="36" height="36" fill="#ef4444" fillOpacity="0.2" />
            <rect x="1095.7" y="225" width="36" height="36" fill="#f97316" fillOpacity="0.2" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <rect x="951.7" y="297" width="36" height="36" fill="#D71920" fillOpacity="0.25" />
            <rect x="231.7" y="333" width="36" height="36" fill="#f59e0b" fillOpacity="0.15" />
            <rect x="519.7" y="405" width="36" height="36" fill="#D71920" fillOpacity="0.18" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          </g>

          {/* Mouse follow radial glow */}
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="380"
            fill="url(#solarMouseGlow)"
            opacity="0.45"
            className="transition-opacity duration-300"
          />

          <defs>
            <radialGradient id="solarMouseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D71920" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ea580c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <clipPath id="hero-clip">
              <rect width="1220" height="810" rx="16" fill="#ffffff" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* ─── Ambient Glow Blobs ─── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D71920]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-red-600/10 blur-[90px] rounded-full pointer-events-none" />

      {/* ─── Hero Content ─── */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-5xl flex flex-col items-center">
        
        {/* Floating Top Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs sm:text-sm font-medium text-neutral-200 shadow-2xl hover:border-[#D71920]/40 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D71920] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D71920]"></span>
            </span>
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{badgeText}</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.1]"
        >
          {title}{' '}
          <span className="bg-gradient-to-r from-[#ff4d4d] via-[#D71920] to-[#f97316] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(215,25,32,0.4)]">
            {highlightText}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {description}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a href={ctaTarget} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#D71920] hover:bg-[#b01319] text-white font-bold text-base px-8 py-6 rounded-full shadow-[0_0_30px_rgba(215,25,32,0.4)] hover:shadow-[0_0_40px_rgba(215,25,32,0.7)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <span>{ctaText}</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </a>
          <a
            href="#how-it-works"
            className="text-xs sm:text-sm font-medium text-neutral-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <span>How the formula works</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Trust Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 w-full max-w-4xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
            {stats.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#D71920]/20 flex items-center justify-center mb-2 text-[#ff6b6b]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">{item.value}</span>
                  <span className="text-[11px] sm:text-xs text-neutral-400 font-medium mt-0.5">{item.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
