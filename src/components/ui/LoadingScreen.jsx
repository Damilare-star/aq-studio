import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Cinematic intro sequence using aq-intro.mp4:
 * 1. Black screen
 * 2. Video fades in and plays (muted)
 * 3. When video ends (or after max 5s) — fade out
 * 4. Hero reveals underneath
 */
export default function LoadingScreen() {
  const [phase, setPhase] = useState('video') // video | exit | done
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Fallback: force exit after 6 seconds max
    timerRef.current = setTimeout(() => {
      setPhase('exit')
      setTimeout(() => setPhase('done'), 800)
    }, 6000)

    const onEnded = () => {
      clearTimeout(timerRef.current)
      // Brief pause after video ends, then exit
      setTimeout(() => {
        setPhase('exit')
        setTimeout(() => setPhase('done'), 800)
      }, 400)
    }

    const onError = () => {
      // If video fails to load, exit gracefully
      clearTimeout(timerRef.current)
      setPhase('exit')
      setTimeout(() => setPhase('done'), 600)
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)

    // Try to play
    video.play().catch(() => {
      // Autoplay blocked — exit after short delay
      clearTimeout(timerRef.current)
      setTimeout(() => {
        setPhase('exit')
        setTimeout(() => setPhase('done'), 800)
      }, 1200)
    })

    return () => {
      clearTimeout(timerRef.current)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Video — fades in */}
          <motion.video
            ref={videoRef}
            src="/videos/aq-intro.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'exit' ? 0 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
            }}
          />

          {/* Skip button — appears after 1.5s */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'exit' ? 0 : 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            onClick={() => {
              clearTimeout(timerRef.current)
              setPhase('exit')
              setTimeout(() => setPhase('done'), 800)
            }}
            className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/60 hover:text-white hover:border-white/40 text-xs font-medium transition-all duration-300"
          >
            Skip
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 4-8 4V2z" fill="currentColor"/>
              <line x1="10" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.button>

          {/* AQ Studio watermark bottom-left */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase === 'exit' ? 0 : 0.7 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-8 left-8 flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xs">AQ</span>
            </div>
            <span className="text-white/60 text-xs font-heading font-semibold tracking-widest uppercase">
              AQ Studio
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
