import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

/**
 * FloatingGradients — ambient background orbs that follow mouse
 */
export default function FloatingGradients({ count = 3 }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  const orbs = [
    { color: 'rgba(139,92,246,0.15)', size: 600, xFactor: 0.04, yFactor: 0.04, delay: 0 },
    { color: 'rgba(59,130,246,0.10)', size: 400, xFactor: -0.03, yFactor: 0.05, delay: 0.5 },
    { color: 'rgba(6,182,212,0.08)',  size: 300, xFactor: 0.06, yFactor: -0.03, delay: 1 },
  ].slice(0, count)

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px]"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            top: '50%',
            left: '50%',
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, 10, -5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}

/**
 * StaticBlob — a single decorative blob for section backgrounds
 */
export function StaticBlob({ color = '#8B5CF6', size = 400, className = '' }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none blur-3xl ${className}`}
      style={{ width: size, height: size, background: color, opacity: 0.12 }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.10, 0.15, 0.10] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
