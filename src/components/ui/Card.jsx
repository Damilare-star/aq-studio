import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = true,
  tilt = false,
  glow = false,
  onClick,
}) {
  const handleMouseMove = (e) => {
    if (!tilt) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = (e) => {
    if (!tilt) return
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }

  return (
    <motion.div
      className={`
        glass-card p-6 relative overflow-hidden
        ${hover ? 'hover:border-primary/20 transition-all duration-300' : ''}
        ${glow ? 'hover:shadow-glow-sm' : ''}
        ${onClick ? 'cursor-none' : ''}
        ${className}
      `}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      onClick={onClick}
      style={{ transition: tilt ? 'transform 0.1s ease' : undefined }}
    >
      {children}
    </motion.div>
  )
}
