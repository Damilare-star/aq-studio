import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import Button from '@components/ui/Button'
import TextReveal from '@components/ui/TextReveal'
import MouseGlow from '@components/ui/MouseGlow'
import { StaticBlob } from '@components/ui/FloatingGradients'

const wordList = ['Stop the Scroll', 'Increase Sales', 'Build Your Brand', 'Drive Revenue']

export default function Hero() {
  const wordRef    = useRef(null)
  const badgeRef   = useRef(null)
  const statsRef   = useRef(null)
  const containerRef = useRef(null)

  // Mouse-follow lighting
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const lightX  = useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1440], [-60, 60])
  const lightY  = useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 900], [-60, 60])

  // Cycling animated word
  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    let i = 0
    const cycle = () => {
      gsap.to(el, {
        opacity: 0, y: 14, duration: 0.35, ease: 'power2.in',
        onComplete: () => {
          i = (i + 1) % wordList.length
          el.textContent = wordList[i]
          gsap.fromTo(el, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        },
      })
    }
    const id = setInterval(cycle, 2800)
    return () => clearInterval(id)
  }, [])

  // GSAP entrance for badge + stats
  useEffect(() => {
    gsap.fromTo(badgeRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)', delay: 0.2 }
    )
    gsap.fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 1 }
    )
  }, [])

  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Mouse-follow glow */}
      <MouseGlow color="rgba(139,92,246,0.10)" size={700} />

      {/* Moving light orb following mouse */}
      <motion.div
        className="absolute z-[2] rounded-full pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
          x: lightX,
          y: lightY,
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Static background blobs */}
      <StaticBlob color="#8B5CF6" size={600} className="top-1/4 -left-40" />
      <StaticBlob color="#3B82F6" size={400} className="bottom-1/4 -right-32" />
      <StaticBlob color="#06B6D4" size={300} className="top-1/2 right-1/3" />

      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-20"
          poster="https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1920&q=80"
        >
          <source src="" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-sm font-semibold mb-8 opacity-0"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Premium AI Video Ads · AQ Studio
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Headline — word-by-word reveal */}
        <div className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6">
          <TextReveal
            text="AI Video Ads That"
            as="div"
            delay={0.3}
            stagger={0.08}
            className="block"
          />
          {/* Animated cycling word */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="block"
          >
            <span
              ref={wordRef}
              className="gradient-text inline-block"
              style={{ backgroundSize: '200% 200%', animation: 'gradientX 4s ease infinite' }}
            >
              {wordList[0]}
            </span>
          </motion.div>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-muted text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I create high-converting AI video advertisements for brands, eCommerce
          stores, and businesses that increase engagement, build trust, and{' '}
          <span className="text-white font-medium">drive more sales.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button variant="primary" size="lg" href="/ai-video-ads" arrow>
            View Portfolio
          </Button>
          <Button variant="secondary" size="lg" href="/contact">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Book a Free Call
            </span>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <div ref={statsRef} className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: '100+', label: 'Videos Created' },
            { value: '1M+',  label: 'Views Generated' },
            { value: '98%',  label: 'Client Satisfaction' },
            { value: '50+',  label: 'Brands Served' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center opacity-0">
              <span className="font-heading font-bold text-2xl sm:text-3xl gradient-text">{stat.value}</span>
              <span className="text-muted text-xs sm:text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-muted text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
