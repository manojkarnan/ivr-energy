'use client'

import { motion } from 'framer-motion'

export default function PageLoader({ text }) {
  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-6 text-neutral-900 select-none">
      <div className="relative flex flex-col items-center gap-8 z-10">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg
            className="w-24 h-24 overflow-visible"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 30,25 C 10,25 10,5 30,5 C 50,5 50,45 70,45 C 90,45 90,25 70,25 C 50,25 50,5 30,5 C 10,5 10,25 30,25 Z"
              stroke="#f0f0f0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <motion.path
              d="M 30,25 C 10,25 10,5 30,5 C 50,5 50,45 70,45 C 90,45 90,25 70,25 C 50,25 50,5 30,5 C 10,5 10,25 30,25 Z"
              stroke="#000000"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0.38, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "linear",
              }}
              style={{
                filter: 'drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.25))'
              }}
            />
          </svg>
        </div>

        {text && (
          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-sm font-semibold tracking-widest text-neutral-900 uppercase">
              {text}
            </span>
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
              IVR Energy
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
