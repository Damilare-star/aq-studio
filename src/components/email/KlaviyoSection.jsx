import { motion } from 'framer-motion'
import { Check, Zap, BarChart2, Users, Settings, Mail } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const features = [
  {
    icon: Zap,
    title: 'Advanced Automation',
    desc: 'Multi-step flows triggered by behaviour, purchase history, and browsing activity.',
  },
  {
    icon: Users,
    title: 'Smart Segmentation',
    desc: 'Hyper-targeted segments based on LTV, purchase frequency, location, and more.',
  },
  {
    icon: BarChart2,
    title: 'Deep Analytics',
    desc: 'Revenue attribution, A/B testing, and full campaign performance dashboards.',
  },
  {
    icon: Settings,
    title: 'Shopify Integration',
    desc: 'Native Shopify data sync for real-time personalisation and product recommendations.',
  },
  {
    icon: Mail,
    title: 'SMS + Email',
    desc: 'Combined email and SMS campaigns for maximum reach and engagement.',
  },
  {
    icon: Check,
    title: 'Deliverability',
    desc: 'Warm-up protocols and list hygiene to keep your sender score high.',
  },
]

const services = [
  'Klaviyo Account Setup',
  'Flow Architecture',
  'Welcome Series',
  'Abandoned Cart',
  'Browse Abandonment',
  'Post-Purchase',
  'Win-Back Campaign',
  'VIP Loyalty Flow',
  'Segmentation Strategy',
  'A/B Testing',
  'Analytics Setup',
  'Monthly Reporting',
]

export default function KlaviyoSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      {/* Klaviyo brand colour blob */}
      <div className="blob w-[500px] h-[500px] bg-[#1B1B1B] top-0 left-0 opacity-30" />
      <div className="blob w-72 h-72 bg-primary bottom-0 right-0 opacity-[0.08]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Klaviyo logo badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              className="inline-flex items-center gap-3 px-5 py-2.5 glass-card rounded-2xl border border-white/10 mb-8"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1B1B1B] border border-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-xs font-heading">K</span>
              </div>
              <div>
                <div className="text-white font-heading font-bold text-sm">Klaviyo Partner</div>
                <div className="text-muted text-xs">Certified Email Expert</div>
              </div>
            </motion.div>

            <SectionHeading
              badge="Klaviyo"
              title="Klaviyo Email"
              highlight="Marketing"
              subtitle="The world's most powerful email marketing platform. I set it up, optimise it, and make it generate serious revenue for your brand."
              center={false}
            />

            {/* Features grid */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewport}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"
            >
              {features.map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={staggerItem} className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-white text-sm mb-1">{title}</h4>
                    <p className="text-muted text-xs leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button variant="primary" href="/contact" arrow>
                Set Up Klaviyo for Me
              </Button>
            </motion.div>
          </div>

          {/* Right — services list + mock dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {/* Services checklist card */}
            <div className="glass-card p-7">
              <h4 className="font-heading font-bold text-white text-lg mb-5 flex items-center gap-2">
                <Zap size={18} className="text-primary" />
                What's Included
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-primary" />
                    </div>
                    <span className="text-white/80 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock flow diagram */}
            <div className="glass-card p-6">
              <div className="text-muted text-xs uppercase tracking-widest font-semibold mb-4">
                Sample Flow Architecture
              </div>
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Trigger: New Subscriber', color: '#8B5CF6', icon: '⚡' },
                  { label: 'Email 1: Welcome + Brand Story', color: '#3B82F6', icon: '✉️' },
                  { label: 'Wait: 2 days', color: '#6B7280', icon: '⏱' },
                  { label: 'Email 2: Best Sellers', color: '#3B82F6', icon: '✉️' },
                  { label: 'Conditional: Opened?', color: '#F59E0B', icon: '🔀' },
                  { label: 'Email 3: Exclusive Offer', color: '#10B981', icon: '🎁' },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-stretch gap-3">
                    {/* Line + dot */}
                    <div className="flex flex-col items-center w-6 shrink-0">
                      <div className="w-3 h-3 rounded-full border-2 mt-3 shrink-0" style={{ borderColor: step.color }} />
                      {i < 5 && <div className="flex-1 w-px bg-white/10 my-0.5" />}
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <span>{step.icon}</span>
                      <span className="text-white/70 text-xs">{step.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
