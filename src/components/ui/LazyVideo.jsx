import { useRef, useEffect, useState } from 'react'

/**
 * LazyVideo — only loads/plays when scrolled into view
 * Prevents autoplay of off-screen videos killing performance
 */
export default function LazyVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  onPlay,
}) {
  const videoRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (autoPlay) el.play().catch(() => {})
        } else {
          if (autoPlay) el.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [autoPlay])

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="none"
      className={className}
      onPlay={onPlay}
      aria-hidden="true"
    >
      {inView && src && <source src={src} type="video/mp4" />}
    </video>
  )
}
