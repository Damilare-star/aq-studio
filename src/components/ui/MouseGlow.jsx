import { useEffect, useRef } from 'react'

/**
 * MouseGlow — attaches a radial glow that follows the mouse within the parent section
 * Place inside a `relative overflow-hidden` container
 */
export default function MouseGlow({
  color = 'rgba(139,92,246,0.12)',
  size = 600,
  className = '',
}) {
  const glowRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    // Attach to the closest relative parent
    const container = glow.closest('section') || glow.parentElement
    if (!container) return

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glow.style.left = `${x}px`
      glow.style.top = `${y}px`
      glow.style.opacity = '1'
    }

    const onMouseLeave = () => {
      glow.style.opacity = '0'
    }

    container.addEventListener('mousemove', onMouseMove, { passive: true })
    container.addEventListener('mouseleave', onMouseLeave)

    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className={`absolute pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        zIndex: 1,
      }}
    />
  )
}
