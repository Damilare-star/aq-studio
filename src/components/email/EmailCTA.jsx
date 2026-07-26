import { motion } from 'framer-motion'
import { Mail, TrendingUp, DollarSign, Zap } from 'lucide-react'
import Button from '@components/ui/Button'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const reasons = [
  { icon: TrendingUp, label: '68% avg open rate vs 21% industry average', color: '#8B5CF6' },
  { icon: DollarSign, label: '$168K+ revenue generated across campaigns', color: '#10B981' },
  { icon: Zap, label: 'Full automation setup — earn on autopilot', color: '#3B82F6' },
  { icon: Mail, label: 'Klaviyo & Shopify Email certified expertise', color: '#06B6D4' },
]

export default function EmailCTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/8" />
      <div className="blob w-[500px] h-[500px] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] animate-float" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none rounded-2xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Ready to Grow?
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: 0.1 }}
                  className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5"
                >
                  Turn Your Email List Into a{' '}
                  <span className="gradient-text">Revenue Machine</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: 0.2 }}
                  className="text-muted leading-relaxed mb-8"
                >
                  Most brands leave thousands on the table with poor email marketing.
                  Let me build your complete email system and put your revenue on autopilot.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button variant="primary" size="lg" href="/contact" arrow>
                    Grow My Sales
                  </Button>
                  <Button variant="secondary" size="lg" href="/contact">
                    Book a Free Call
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewport}
                  transition={{ delay: 0.4 }}
                  className="text-muted text-xs mt-5 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Free strategy call · No commitment required
                </motion.p>
              </div>

              {/* Right — reasons */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={viewport}
                className="space-y-4"
              >
                <div className="text-muted text-xs uppercase tracking-widest font-semibold mb-5">
                  Why Choose Us
                </div>
                {reasons.map(({ icon: Icon, label, color }) => (
                  <motion.div
                    key={label}
                    variants={staggerItem}
                    className="flex items-start gap-3 p-4 glass-card rounded-xl hover:border-white/20 transition-all"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed pt-1.5">{label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
