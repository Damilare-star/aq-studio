import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    // Use native scroll for performance
    const onScroll = () => {
      const scrollTop = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrollTop / total) * 100 : 0
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-white/5">
      <div
        ref={barRef}
        className="h-full will-change-[width]"
        style={{
          width: '0%',
          background: 'linear-gradient(to right, #8B5CF6, #3B82F6, #06B6D4)',
          boxShadow: '0 0 10px rgba(139,92,246,0.8)',
          transition: 'width 0.05s linear',
        }}
      />
      {/* Glow dot at leading edge */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-glow-sm -translate-x-1/2"
        style={{ left: 'var(--progress, 0%)', boxShadow: '0 0 12px #8B5CF6' }}
      />
    </div>
  )
}
