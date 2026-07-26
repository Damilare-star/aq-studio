import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [phase, setPhase] = useState('video') // video | exit | done
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Max 6s fallback
    timerRef.current = setTimeout(() => {
      setPhase('exit')
      setTimeout(() => setPhase('done'), 800)
    }, 6000)

    const onEnded = () => {
      clearTimeout(timerRef.current)
      setTimeout(() => {
        setPhase('exit')
        setTimeout(() => setPhase('done'), 800)
      }, 400)
    }

    const onError = () => {
      clearTimeout(timerRef.current)
      setPhase('exit')
      setTimeout(() => setPhase('done'), 600)
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)

    video.play().catch(() => {
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

  const skip = () => {
    clearTimeout(timerRef.current)
    setPhase('exit')
    setTimeout(() => setPhase('done'), 800)
  }

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient glow behind card */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{
            opacity: phase === 'exit' ? 0 : 1,
            scale: phase === 'exit' ? 0.94 : 1,
            y: phase === 'exit' ? -16 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10"
          style={{
            width: 220,
            boxShadow: '0 0 50px rgba(139,92,246,0.3), 0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* Video — 100px tall */}
          <video
            ref={videoRef}
            src="/videos/aq-intro.mp4"
            muted
            playsInline
            preload="auto"
            style={{
              display: 'block',
              width: '100%',
              height: 100,
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />

          {/* Text strip — 50px tall */}
          <div
            className="flex items-center justify-center border-t border-white/10"
            style={{
              height: 50,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              className="font-heading font-bold text-xs uppercase"
              style={{ letterSpacing: '0.3em', color: 'rgba(255,255,255,0.85)' }}
            >
              THE{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AQ
              </span>{' '}
              STUDIO
            </span>
          </div>
        </motion.div>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'exit' ? 0 : 0.6 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          onClick={skip}
          className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full text-white/50 hover:text-white text-xs font-medium transition-colors border border-white/10 hover:border-white/30"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          Skip
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 4-8 4V2z" fill="currentColor" />
            <line x1="10" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
