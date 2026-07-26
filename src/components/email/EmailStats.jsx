import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from '@/hooks/useInView'
import { emailStats } from '@/data/emailMarketing'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

export default function EmailStats() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section className="py-16 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-secondary/5" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {emailStats.map(({ value, label, sub, color }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="glass-card p-6 text-center group hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300"
            >
              <div
                className="font-heading font-bold text-3xl sm:text-4xl mb-2"
                style={{ color }}
              >
                {value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{label}</div>
              <div className="text-muted text-xs">{sub}</div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
