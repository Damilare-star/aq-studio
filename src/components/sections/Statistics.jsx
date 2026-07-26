import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from 'react-countup'
import SectionHeading from '@components/ui/SectionHeading'
import Card3D from '@components/ui/Card3D'
import MouseGlow from '@components/ui/MouseGlow'
import { stats } from '@/data/stats'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

gsap.registerPlugin(ScrollTrigger)

export default function Statistics() {
  const sectionRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // GSAP parallax on the background gradient
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const bg = el.querySelector('.stats-bg')
    if (!bg) return
    const tween = gsap.to(bg, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Parallax background */}
      <div className="stats-bg absolute inset-0 bg-gradient-to-r from-primary/6 via-secondary/4 to-accent/6 will-change-transform" />
      <div className="absolute inset-0 border-y border-white/5" />
      <MouseGlow color="rgba(139,92,246,0.08)" size={600} />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Results"
          title="Numbers That"
          highlight="Speak for Themselves"
          subtitle="Real results for real brands. Every number represents a business we helped grow."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-16"
        >
          {stats.map(({ value, suffix, label, icon }, i) => (
            <motion.div key={label} variants={staggerItem}>
              <Card3D
                glowColor="rgba(139,92,246,0.3)"
                className="p-6 text-center h-full"
              >
                <div className="text-3xl mb-3">{icon}</div>

                <div className="font-heading font-bold text-4xl gradient-text mb-2">
                  {inView ? (
                    <CountUp
                      end={value}
                      duration={2.5 + i * 0.15}
                      suffix={suffix}
                      separator=","
                      useEasing
                    />
                  ) : (
                    `0${suffix}`
                  )}
                </div>

                <p className="text-muted text-sm leading-tight">{label}</p>

                {/* Bottom glow line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                  style={{ background: 'linear-gradient(to right, #8B5CF6, #06B6D4)' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
