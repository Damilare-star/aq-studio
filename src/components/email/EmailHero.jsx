import { motion } from 'framer-motion'
import { Mail, TrendingUp, Zap } from 'lucide-react'
import Button from '@components/ui/Button'
import { staggerContainer, staggerItem } from '@/utils/animations'

const highlights = [
  { icon: Mail, label: '68% Avg Open Rate' },
  { icon: TrendingUp, label: '$168K+ Revenue Generated' },
  { icon: Zap, label: '35% Cart Recovery Rate' },
]

export default function EmailHero() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      {/* Blobs */}
      <div className="blob w-[500px] h-[500px] bg-primary top-0 right-0 opacity-10 animate-float" />
      <div className="blob w-72 h-72 bg-secondary bottom-0 left-0 opacity-10 animate-float-slow" />
      <div className="blob w-64 h-64 bg-accent top-1/2 right-1/4 opacity-[0.08] animate-float" style={{ animationDelay: '1s' }} />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Mail size={12} />
            Email Marketing Expert
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Emails That{' '}
            <span className="gradient-text">Convert</span>
            <br className="hidden sm:block" />
            & Drive Revenue
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            I build complete email marketing systems using Klaviyo and Shopify Email —
            welcome flows, abandoned cart, product launches, and full automation
            that generates revenue on autopilot.
          </motion.p>

          {/* Highlight pills */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {highlights.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-white/10 text-white text-sm font-medium"
              >
                <Icon size={14} className="text-primary" />
                {label}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" href="/contact" arrow>
              Grow My Revenue
            </Button>
            <Button variant="secondary" size="lg" href="#campaigns">
              View Campaigns
            </Button>
          </motion.div>
        </div>

        {/* Floating email mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <div className="flex-1 mx-4 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center px-3">
                <span className="text-muted text-xs">Klaviyo — Campaign Analytics</span>
              </div>
            </div>

            {/* Fake analytics table */}
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-4 gap-2 text-muted text-xs uppercase tracking-wider px-3">
                <span>Campaign</span>
                <span className="text-center">Open Rate</span>
                <span className="text-center">Click Rate</span>
                <span className="text-right">Revenue</span>
              </div>
              {[
                { name: 'Welcome Series', open: '68.4%', click: '24.1%', rev: '$14,200', color: '#8B5CF6' },
                { name: 'Abandoned Cart', open: '54.7%', click: '31.2%', rev: '$28,600', color: '#3B82F6' },
                { name: 'Product Launch', open: '61.3%', click: '28.9%', rev: '$52,400', color: '#10B981' },
                { name: 'Ramadan Sale', open: '72.1%', click: '38.6%', rev: '$19,800', color: '#EC4899' },
              ].map((row, i) => (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="grid grid-cols-4 gap-2 items-center px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: row.color }} />
                    <span className="text-white text-xs font-medium truncate">{row.name}</span>
                  </div>
                  <span className="text-center text-xs font-semibold" style={{ color: row.color }}>{row.open}</span>
                  <span className="text-center text-xs font-semibold text-secondary">{row.click}</span>
                  <span className="text-right text-xs font-bold text-green-400">{row.rev}</span>
                </motion.div>
              ))}
            </div>

            {/* Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
