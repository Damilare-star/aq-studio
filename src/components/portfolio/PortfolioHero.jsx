import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/utils/animations'

const stats = [
  { value: '100+', label: 'Videos Created' },
  { value: '9', label: 'Industries' },
  { value: '1M+', label: 'Total Views' },
  { value: '4.2x', label: 'Avg. ROAS' },
]

export default function PortfolioHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      {/* Blobs */}
      <div className="blob w-[500px] h-[500px] bg-primary top-0 right-0 opacity-10 animate-float" />
      <div className="blob w-72 h-72 bg-accent bottom-0 left-0 opacity-10 animate-float-slow" />

      <div className="container-custom relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <Play size={12} fill="currentColor" />
          AI Video Ads Portfolio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
        >
          Videos That{' '}
          <span className="gradient-text">Convert</span>
          <br />& Go Viral
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Browse our portfolio of AI-generated video advertisements across fashion, beauty,
          fitness, technology and more. Real campaigns, real results.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-12"
        >
          {stats.map(({ value, label }) => (
            <motion.div key={label} variants={staggerItem} className="flex flex-col items-center">
              <span className="font-heading font-bold text-3xl sm:text-4xl gradient-text">{value}</span>
              <span className="text-muted text-sm mt-1">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
