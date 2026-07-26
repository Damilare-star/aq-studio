import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [phase, setPhase] = useState('video') // video | exit | done
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Max 8s fallback
    timerRef.current = setTimeout(() => {
      setPhase('exit')
      setTimeout(() => setPhase('done'), 800)
    }, 8000)

    const onEnded = () => {
      clearTimeout(timerRef.current)
      setTimeout(() => {
        setPhase('exit')
        setTimeout(() => setPhase('done'), 800)
      }, 300)
    }

    const onError = () => {
      clearTimeout(timerRef.current)
      setPhase('exit')
      setTimeout(() => setPhase('done'), 600)
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)

    // Play once — no loop
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
        className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Video plays once at natural size — readable, centered */}
        <motion.video
          ref={videoRef}
          src="/videos/aq-intro.mp4"
          muted
          playsInline
          preload="auto"
          // NO loop — plays once only
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'block',
            width: 'min(800px, 92vw)',
            height: 'auto',
          }}
        />

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'exit' ? 0 : 0.55 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          onClick={skip}
          className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full text-white/55 hover:text-white text-xs font-medium transition-all border border-white/10 hover:border-white/30"
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
