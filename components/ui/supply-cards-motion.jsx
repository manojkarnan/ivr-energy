'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

// Single interactive 3D Tilt + Spotlight Card in Dark/Black Shade (Mobile & Desktop optimized)
function TiltSupplyCard({
  item,
  index,
  isCardHovered,
  isTouch,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const cardRef = useRef(null)
  const Icon = item.icon

  // Mouse position within card for 3D tilt & spotlight (0 to 1)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.2 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // 3D Tilt angles (-7deg to +7deg on desktop, subtle on mobile)
  const rotateX = useTransform(smoothMouseY, [0, 1], [7, -7])
  const rotateY = useTransform(smoothMouseX, [0, 1], [-7, 7])

  // Spotlight coordinates in px for radial gradient
  const [spotlightPos, setSpotlightPos] = useState({ x: 80, y: 80 })

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isTouch) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [mouseX, mouseY, isTouch])

  const handleMouseLeaveCard = useCallback(() => {
    if (isTouch) return
    mouseX.set(0.5)
    mouseY.set(0.5)
    onMouseLeave()
  }, [mouseX, mouseY, isTouch, onMouseLeave])

  return (
    <div
      ref={cardRef}
      onMouseEnter={isTouch ? undefined : onMouseEnter}
      onMouseLeave={isTouch ? undefined : handleMouseLeaveCard}
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onClick={onClick}
      className="relative group/card p-1 sm:p-1.5 h-full select-none cursor-pointer"
      style={{ perspective: 1000 }}
    >
      {/* Sliding fluid backdrop pill (21st.dev HoverEffect layoutId) in Black/Red Glow */}
      <AnimatePresence>
        {isCardHovered && (
          <motion.div
            layoutId="supplyHoverPill"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { type: 'spring', bounce: 0.15, duration: 0.35 },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D71920]/25 via-neutral-900/60 to-black/80 -z-10 shadow-xl shadow-red-950/30 border border-[#D71920]/30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* 3D Tilting Card Body - Black Shade Style */}
      <motion.div
        style={{
          rotateX: isCardHovered && !isTouch ? rotateX : 0,
          rotateY: isCardHovered && !isTouch ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'relative h-full min-h-[190px] sm:min-h-[220px] rounded-2xl bg-neutral-900/95 backdrop-blur-md border border-neutral-800 p-3.5 sm:p-5 text-center flex flex-col justify-between overflow-hidden',
          'transition-all duration-300 shadow-lg shadow-black/40',
          isCardHovered
            ? 'border-[#D71920]/60 shadow-2xl shadow-red-950/40 -translate-y-1 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-black'
            : 'hover:border-neutral-700 hover:bg-neutral-900'
        )}
      >
        {/* Dynamic Cursor Spotlight Overlay (Solar Red Sheen) */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 -z-0',
            isCardHovered ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: isTouch
              ? `radial-gradient(160px circle at center, rgba(215, 25, 32, 0.2), transparent 75%)`
              : `radial-gradient(200px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(215, 25, 32, 0.22), transparent 75%)`,
          }}
        />

        {/* Ambient Top Red Glow Line */}
        <div
          className={cn(
            'absolute inset-x-3 sm:inset-x-4 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#D71920] to-transparent transition-all duration-500 rounded-t-2xl',
            isCardHovered ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Icon Badge */}
          <motion.div
            style={{ transform: !isTouch ? 'translateZ(24px)' : 'none' }}
            className="relative mb-2.5 sm:mb-3.5"
          >
            {/* Pulsing ring behind icon on active/hover */}
            <div
              className={cn(
                'absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#D71920] to-[#ff5a4e] blur-md transition-opacity duration-300',
                isCardHovered ? 'opacity-50' : 'opacity-0'
              )}
            />

            <div
              className={cn(
                'relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md',
                isCardHovered
                  ? 'bg-gradient-to-br from-[#D71920] to-[#a01217] shadow-lg shadow-red-600/40 scale-105 border-transparent'
                  : 'bg-neutral-800/90 border border-neutral-700/60'
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    'h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300',
                    isCardHovered ? 'text-white' : 'text-neutral-200'
                  )}
                />
              )}
            </div>
          </motion.div>

          {/* Title */}
          <h4
            style={{ transform: !isTouch ? 'translateZ(18px)' : 'none' }}
            className={cn(
              'font-extrabold text-xs sm:text-sm leading-tight transition-colors duration-200 line-clamp-1',
              isCardHovered ? 'text-[#ff6b6b]' : 'text-white'
            )}
          >
            {item.title}
          </h4>

          {/* Description */}
          <p
            style={{ transform: !isTouch ? 'translateZ(12px)' : 'none' }}
            className={cn(
              'mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed line-clamp-2 transition-colors',
              isCardHovered ? 'text-neutral-300' : 'text-neutral-400'
            )}
          >
            {item.desc}
          </p>
        </div>

        {/* Card Footer Pill / Micro Spec */}
        <div
          style={{ transform: !isTouch ? 'translateZ(15px)' : 'none' }}
          className="relative z-10 mt-2.5 sm:mt-3.5 pt-2 sm:pt-2.5 border-t border-neutral-800/90 flex items-center justify-center"
        >
          <span
            className={cn(
              'inline-flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded-full transition-all truncate max-w-full',
              isCardHovered
                ? 'border border-red-500/40 text-red-300 bg-red-950/30'
                : 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/40'
            )}
          >
            <Sparkles
              className={cn(
                'h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 transition-colors',
                isCardHovered ? 'text-red-400' : 'text-neutral-400'
              )}
            />
            <span className="tracking-wide truncate">{item.spec || 'Tier-1 Certified'}</span>
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export function SupplyCardsMotion({ items, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch-enabled device
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  const handleCardClick = (idx) => {
    if (isTouch) {
      setHoveredIndex((prev) => (prev === idx ? null : idx))
    }
  }

  return (
    <div
      onMouseLeave={() => {
        if (!isTouch) setHoveredIndex(null)
      }}
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-w-5xl mx-auto',
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item.title || idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: (idx % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          <TiltSupplyCard
            item={item}
            index={idx}
            isTouch={isTouch}
            isCardHovered={hoveredIndex === idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => {
              if (hoveredIndex === idx) setHoveredIndex(null)
            }}
            onClick={() => handleCardClick(idx)}
          />
        </motion.div>
      ))}
    </div>
  )
}
