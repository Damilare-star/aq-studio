import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

/**
 * Cinematic intro sequence:
 * 1. Black screen
 * 2. AQ logo SVG path draws in (stroke animation)
 * 3. Soft purple glow blooms behind logo
 * 4. "THE AQ STUDIO" text fades in word by word
 * 5. Brief pause
 * 6. Everything gently fades out
 * 7. Hero reveals with clip-path wipe transition
 */

// SVG path for "AQ" letterform — a clean geometric monogram
function AQLogo({ drawProgress }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-32 h-20 sm:w-40 sm:h-24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="120" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {/* A — left diagonal */}
      <motion.line
        x1="10" y1="70" x2="40" y2="10"
        stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: drawProgress }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* A — right diagonal */}
      <motion.line
        x1="40" y1="10" x2="70" y2="70"
        stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: drawProgress }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      />
      {/* A — crossbar */}
      <motion.line
        x1="22" y1="45" x2="58" y2="45"
        stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: drawProgress }}
        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      />
      {/* Q — circle */}
      <motion.circle
        cx="93" cy="38" r="26"
        stroke="url(#logoGrad)" strokeWidth="4" fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: drawProgress }}
        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
      />
      {/* Q — tail */}
      <motion.line
        x1="108" y1="55" x2="120" y2="70"
        stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: drawProgress }}
        transition={{ duration: 0.3, delay: 1.1, ease: 'easeOut' }}
      />
    </svg>
  )
}

const TAGLINE = ['THE', 'AQ', 'STUDIO']

export default function LoadingScreen() {
  const [phase, setPhase] = useState('draw')   // draw | text | pause | exit | done
  const [drawProgress, setDrawProgress] = useState(0)
  const containerRef = useRef(null)

  // Phase sequencer
  useEffect(() => {
    const t1 = setTimeout(() => setDrawProgress(1),   100)   // start drawing at 100ms
    const t2 = setTimeout(() => setPhase('text'),     1600)  // show text after draw
    const t3 = setTimeout(() => setPhase('pause'),    2800)  // brief pause
    const t4 = setTimeout(() => setPhase('exit'),     3400)  // fade out
    const t5 = setTimeout(() => setPhase('done'),     4200)  // unmount

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  const isExiting = phase === 'exit'

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[99999] bg-[#020202] flex flex-col items-center justify-center overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Ambient glow — blooms with text phase */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'draw' ? 0 : isExiting ? 0 : 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 600,
                height: 600,
                background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </motion.div>

          {/* Subtle noise overlay */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

          {/* Logo + tagline group */}
          <motion.div
            className="flex flex-col items-center gap-6 sm:gap-8"
            animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -24 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* AQ SVG logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              {/* Glow halo behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'draw' ? 0 : 0.7 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)', transform: 'scale(1.6)' }}
              />
              <AQLogo drawProgress={drawProgress} />
            </motion.div>

            {/* "THE AQ STUDIO" word-by-word */}
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
              {TAGLINE.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={
                    phase === 'text' || phase === 'pause'
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 20, filter: 'blur(8px)' }
                  }
                  transition={{
                    duration: 0.6,
                    delay: i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`font-heading font-bold tracking-[0.25em] text-base sm:text-xl uppercase ${
                    word === 'AQ'
                      ? 'gradient-text text-xl sm:text-2xl'
                      : 'text-white/70'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Thin progress line */}
            <motion.div
              className="w-24 h-px overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'draw' ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>

          {/* Corner decorations */}
          {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} w-6 h-6 border border-white/10 rounded-sm`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: isExiting ? 0 : 0.5, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
