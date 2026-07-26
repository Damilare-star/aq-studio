import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * LazyImage — blur-up lazy loading with IntersectionObserver
 * Uses native loading="lazy" + a CSS blur transition for smooth reveal
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  width,
  height,
  priority = false, // set true for above-fold images
  objectFit = 'cover',
}) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(priority)
  const ref = useRef(null)

  useEffect(() => {
    if (priority) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [priority])

  return (
    <div ref={ref} className={`relative overflow-hidden bg-white/5 ${wrapperClassName}`}>
      {inView && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={className}
          style={{
            objectFit,
            filter: loaded ? 'blur(0px)' : 'blur(8px)',
            transform: loaded ? 'scale(1)' : 'scale(1.04)',
            transition: 'filter 0.5s ease, transform 0.5s ease',
          }}
        />
      )}
      {/* Skeleton shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-white/[0.06] to-white/[0.02] animate-pulse" />
      )}
    </div>
  )
}
