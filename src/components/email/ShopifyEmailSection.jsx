import { motion } from 'framer-motion'
import { Check, ShoppingBag, TrendingUp, Target, Palette } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const advantages = [
  {
    icon: ShoppingBag,
    title: 'Native Shopify Data',
    desc: 'Direct access to your store data — products, orders, customers — for perfectly personalised emails.',
    color: '#96BF48',
  },
  {
    icon: Palette,
    title: 'Beautiful Templates',
    desc: 'On-brand email designs that match your Shopify store and convert browsers into buyers.',
    color: '#3B82F6',
  },
  {
    icon: Target,
    title: 'Smart Campaigns',
    desc: 'Targeted campaigns based on customer purchase history, browsing behaviour, and segments.',
    color: '#8B5CF6',
  },
  {
    icon: TrendingUp,
    title: 'Built-in Analytics',
    desc: 'Track revenue, open rates, and clicks directly inside Shopify admin — no extra tools needed.',
    color: '#06B6D4',
  },
]

const included = [
  'Shopify Email Setup',
  'Brand Template Design',
  'Campaign Strategy',
  'Audience Segmentation',
  'Product Launch Emails',
  'Sale & Promotion Emails',
  'Newsletter Setup',
  'Monthly Reporting',
]

// Fake email mockup template
function EmailMockup() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Email header */}
      <div className="bg-[#96BF48]/10 border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#96BF48] flex items-center justify-center">
            <ShoppingBag size={12} className="text-white" />
          </div>
          <span className="text-white font-heading font-bold text-sm">Your Store</span>
        </div>
        <span className="text-muted text-xs">Shopify Email</span>
      </div>

      {/* Email body mockup */}
      <div className="p-5 space-y-4">
        {/* Hero image placeholder */}
        <div className="w-full h-32 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/5">
          <div className="text-center">
            <div className="text-2xl mb-1">🛍️</div>
            <span className="text-muted text-xs">Product Hero Image</span>
          </div>
        </div>

        {/* Subject line */}
        <div>
          <div className="h-3 bg-white/20 rounded-full w-3/4 mb-2" />
          <div className="h-2 bg-white/10 rounded-full w-full mb-1" />
          <div className="h-2 bg-white/10 rounded-full w-5/6" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
              <div className="w-full h-16 rounded-lg bg-white/5 mb-2" />
              <div className="h-2 bg-white/15 rounded-full w-4/5 mb-1" />
              <div className="h-2 bg-white/10 rounded-full w-2/3 mb-2" />
              <div className="h-5 bg-[#96BF48]/30 rounded-lg w-full border border-[#96BF48]/20" />
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="w-full h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
          <span className="text-white text-xs font-semibold">Shop Now →</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-muted text-xs border-t border-white/5 pt-3">
          <span>Unsubscribe</span>
          <span>View in browser</span>
        </div>
      </div>
    </div>
  )
}

export default function ShopifyEmailSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="blob w-96 h-96 bg-[#96BF48] top-0 right-0 opacity-[0.06]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <EmailMockup />

            {/* Stats below mockup */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: 'Open Rate', value: '72.1%', color: '#96BF48' },
                { label: 'Click Rate', value: '38.6%', color: '#3B82F6' },
                { label: 'Revenue', value: '$19.8K', color: '#10B981' },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass-card p-3 text-center">
                  <div className="font-heading font-bold text-base mb-0.5" style={{ color }}>{value}</div>
                  <div className="text-muted text-xs">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — content */}
          <div className="order-1 lg:order-2">
            {/* Shopify badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              className="inline-flex items-center gap-3 px-5 py-2.5 glass-card rounded-2xl border border-[#96BF48]/20 mb-8"
            >
              <div className="w-8 h-8 rounded-lg bg-[#96BF48] flex items-center justify-center">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-heading font-bold text-sm">Shopify Email</div>
                <div className="text-muted text-xs">Built-in & Powerful</div>
              </div>
            </motion.div>

            <SectionHeading
              badge="Shopify Email"
              title="Shopify Email"
              highlight="Campaigns"
              subtitle="Already have Shopify? Shopify Email is built right in — and when set up correctly, it's a powerful revenue machine."
              center={false}
            />

            {/* Advantages */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewport}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"
            >
              {advantages.map(({ icon: Icon, title, desc, color }) => (
                <motion.div key={title} variants={staggerItem} className="glass-card p-4 hover:border-white/20 transition-all group">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <h4 className="font-heading font-semibold text-white text-sm mb-1">{title}</h4>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Included services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.25 }}
              className="mt-8 glass-card p-5"
            >
              <h4 className="font-heading font-semibold text-white text-sm mb-4">What's Included</h4>
              <div className="grid grid-cols-2 gap-2">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check size={12} className="text-[#96BF48] shrink-0" />
                    <span className="text-muted text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Button variant="primary" href="/contact" arrow>
                Set Up Shopify Email
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
