'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'
import {
  Phone, Search, FileText, PenTool, BadgeCheck, HardHat, Zap, Wrench
} from 'lucide-react'

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consultation',
    desc: 'Free site visit & requirement analysis.',
    icon: Phone,
  },
  {
    number: '02',
    title: 'Site Survey',
    desc: 'Shadow analysis, structural review & metering plan.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Proposal',
    desc: 'Custom techno-commercial proposal with ROI.',
    icon: FileText,
  },
  {
    number: '04',
    title: 'Engineering & Design',
    desc: 'Detailed engineering, single-line & layout drawings.',
    icon: PenTool,
  },
  {
    number: '05',
    title: 'Government Approval',
    desc: 'DISCOM & subsidy paperwork handled by our team.',
    icon: BadgeCheck,
  },
  {
    number: '06',
    title: 'Installation',
    desc: 'Certified installers with premium mounting structures.',
    icon: HardHat,
  },
  {
    number: '07',
    title: 'Net Metering',
    desc: 'Bi-directional meter installation & grid tie-in.',
    icon: Zap,
  },
  {
    number: '08',
    title: 'Commissioning & O&M',
    desc: '24/7 monitoring and annual preventive maintenance.',
    icon: Wrench,
  }
]

// Duplicate list for infinite seamless marquee loop
const LOOP_STEPS = [...PROCESS_STEPS, ...PROCESS_STEPS]

// 3D Glassmorphism Card Component - Identical Dimensions (320px x 275px)
function Card3D({ step, index, activeHover, setActiveHover }) {
  const Icon = step.icon
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // 5° 3D Tilt Transformations
  const rotateX = useTransform(y, [-150, 150], [5, -5])
  const rotateY = useTransform(x, [-150, 150], [-5, 5])

  // Glossy Light Sweep effect coordinates
  const mouseX = useMotionValue(-500)
  const mouseY = useMotionValue(-500)

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    mouseX.set(-500)
    mouseY.set(-500)
    setActiveHover(null)
  }

  const isHovered = activeHover === index

  return (
    <div style={{ perspective: '1200px' }} className="pt-4 pb-4">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setActiveHover(index)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: '320px',
          minWidth: '320px',
          height: '275px',
          minHeight: '275px',
        }}
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          mass: 0.6,
        }}
        className={`group relative rounded-[32px] p-[32px] bg-white/95 backdrop-blur-[24px]
          border flex flex-col justify-between transition-all duration-500 ease-out cursor-pointer select-none
          ${isHovered
            ? 'border-[#E53935]/40 shadow-[0_35px_80px_rgba(229,57,53,0.2),0_15px_30px_rgba(0,0,0,0.06)] z-30'
            : 'border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.02)] hover:border-[#E53935]/30'
          }`}
      >
        {/* Soft Red Ambient Glow behind card when active */}
        <div 
          className={`absolute -inset-4 rounded-[40px] bg-gradient-to-r from-[#E53935]/20 to-[#FF5A4E]/15 blur-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Dynamic Light Sweep / Reflection Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100 z-20"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                260px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.7),
                rgba(229, 57, 53, 0.08) 40%,
                transparent 80%
              )
            `,
          }}
        />

        {/* Glass Specular Border Highlight */}
        <div className="absolute inset-0 rounded-[32px] border border-white/60 pointer-events-none z-20" />

        {/* Top Header Row: Icon & 3D Number */}
        <div className="relative z-10 flex items-center justify-between">
          
          {/* 3D Glossy Acrylic Red Icon Cube */}
          <div 
            style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
          >
            <div 
              className={`w-[58px] h-[58px] rounded-[22px] flex items-center justify-center transition-all duration-500 relative
                bg-gradient-to-br from-[#FF5252] via-[#E53935] to-[#B71C1C] text-white
                shadow-[0_12px_28px_rgba(229,57,53,0.38),0_4px_10px_rgba(0,0,0,0.15)]
                border border-white/40
                ${isHovered ? 'rotate-[10deg] scale-110 shadow-[0_18px_36px_rgba(229,57,53,0.5)]' : 'group-hover:rotate-[6deg]'}`}
            >
              <div className="absolute inset-0 rounded-[22px] bg-gradient-to-t from-transparent via-white/20 to-white/40 pointer-events-none" />
              <Icon className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] relative z-10 transition-transform duration-500" />
            </div>
          </div>

          {/* 3D Embossed Background Step Number */}
          <div 
            style={{ transform: 'translateZ(15px)' }}
            className={`text-[64px] font-black pointer-events-none leading-none select-none transition-colors duration-500 ${
              isHovered ? 'text-[#E53935]/[0.15]' : 'text-neutral-900/[0.06]'
            }`}
          >
            {step.number}
          </div>
        </div>

        {/* Bottom Content Area */}
        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 mt-auto">
          <h3 className={`text-[23px] font-extrabold tracking-tight leading-tight transition-colors duration-300 ${
            isHovered ? 'text-[#E53935]' : 'text-[#111111]'
          }`}>
            {step.title}
          </h3>

          <p className="mt-2.5 text-[15px] text-[#5B6470] leading-relaxed font-normal">
            {step.desc}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function InstallationTimeline() {
  const [activeHover, setActiveHover] = useState(null)
  const isPaused = activeHover !== null

  return (
    <section className="relative w-full bg-white pt-[140px] pb-[130px] overflow-hidden text-[#111111] font-sans">
      
      {/* Studio Ambient Global Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#E53935]/[0.05] via-[#E53935]/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-[70px]">
          <h2 className="text-[36px] sm:text-[44px] md:text-[56px] font-extrabold text-[#111111] tracking-tight leading-[1.1]">
            Our Installation <span className="bg-gradient-to-r from-[#E53935] via-[#FF5A4E] to-[#E53935] bg-clip-text text-transparent">Journey</span>
          </h2>

          <p className="text-[18px] md:text-[20px] text-[#5B6470] font-normal leading-relaxed max-w-2xl mx-auto mt-5">
            A transparent, engineering-driven workflow refined through 180+ successful solar installations.
          </p>
        </div>
      </div>

      {/* Infinite Seamless Marquee Loop Track */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left & Right Edge Soft Blur Vignettes for Seamless Edge Flow */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <motion.div
          animate={{
            x: isPaused ? undefined : ['0%', '-50%'],
          }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
          className="flex gap-9 w-max pt-6 pb-16 px-6 cursor-grab active:cursor-grabbing"
        >
          {LOOP_STEPS.map((step, idx) => (
            <Card3D 
              key={`${step.number}-${idx}`}
              step={step} 
              index={idx}
              activeHover={activeHover}
              setActiveHover={setActiveHover}
            />
          ))}
        </motion.div>
      </div>

    </section>
  )
}
