import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * MagneticButton — pulls toward the cursor within a radius
 * Wraps any children. Pass `href` for a Link, `onClick` for a button.
 */
export default function MagneticButton({
  children,
  href,
  external,
  onClick,
  className = '',
  strength = 0.35,
  radius = 80,
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist < radius) {
      setPos({ x: dx * strength, y: dy * strength })
    }
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
  }

  const motionProps = {
    ref,
    animate: { x: pos.x, y: pos.y },
    transition: { type: 'spring', stiffness: 180, damping: 18 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
  }

  if (href && external) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...motionProps}>
        {children}
      </motion.a>
    )
  }

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link to={href}>{children}</Link>
      </motion.div>
    )
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}
