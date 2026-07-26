import { motion } from 'framer-motion'
import Button from '@components/ui/Button'
import { viewport } from '@/utils/animations'

export default function PortfolioCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-secondary/10" />
      <div className="blob w-[400px] h-[400px] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 animate-float" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto glass-card p-10 lg:p-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Ready to Get Started?
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-5 leading-tight"
          >
            Need Videos Like These?{' '}
            <span className="gradient-text">Let's Work Together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.2 }}
            className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
          >
            Every project starts with a free 30-minute discovery call.
            No commitment, no pressure — just a conversation about your brand and goals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" href="/contact" arrow>
              Book a Free Call
            </Button>
            <Button variant="secondary" size="lg" href="/contact">
              Send a Message
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ delay: 0.4 }}
            className="text-muted text-xs mt-6 flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for new projects · Responds within 24 hours
          </motion.p>
        </div>
      </div>
    </section>
  )
}
