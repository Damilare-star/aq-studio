import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Card3D — glass card with realistic 3D tilt + light reflection on hover
 */
export default function Card3D({
  children,
  className = '',
  glowColor = 'rgba(139,92,246,0.3)',
  intensity = 12,
}) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})
  const [glowStyle, setGlowStyle] = useState({})
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rx = ((y - cy) / cy) * intensity
    const ry = ((cx - x) / cx) * intensity

    setStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`,
    })

    // Move the light reflection
    const pctX = (x / rect.width) * 100
    const pctY = (y / rect.height) * 100
    setGlowStyle({
      background: `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.06), transparent 60%)`,
    })
  }

  const onMouseLeave = () => {
    setStyle({ transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)' })
    setGlowStyle({})
    setHovered(false)
  }

  const onMouseEnter = () => setHovered(true)

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden glass-card will-change-transform ${className}`}
      style={{
        ...style,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${glowColor}` : '0 8px 32px rgba(0,0,0,0.3)',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {/* Light reflection layer */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl transition-opacity duration-300"
        style={{ ...glowStyle, opacity: hovered ? 1 : 0 }}
      />
      {children}
    </div>
  )
}
