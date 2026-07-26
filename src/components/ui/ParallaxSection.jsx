import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * ParallaxSection — wraps children in a scroll-linked parallax container
 * `speed`: positive = slower than scroll (recedes), negative = faster (advances)
 */
export default function ParallaxSection({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

/**
 * ParallaxImage — parallax specifically for background images
 */
export function ParallaxImage({ src, alt = '', speed = 0.2, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover will-change-transform"
        loading="lazy"
      />
    </div>
  )
}
