import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, TrendingUp, MousePointer, DollarSign, Users, ChevronDown, ChevronUp } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { campaigns } from '@/data/emailMarketing'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const typeFilters = ['All', 'Welcome Sequence', 'Abandoned Cart', 'Product Launch', 'Sales Campaign', 'Newsletter', 'Email Automation']
const platformFilters = ['All Platforms', 'Klaviyo', 'Shopify Email']

function MetricBar({ value, max = 100, color }) {
  return (
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  )
}

function CampaignCard({ campaign }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      className={`glass-card overflow-hidden transition-all duration-300 hover:border-white/20 group`}
      style={{ borderColor: expanded ? `${campaign.color}30` : undefined }}
    >
      {/* Top color accent */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${campaign.color}, ${campaign.color}50)` }} />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: `${campaign.color}20`, color: campaign.color, border: `1px solid ${campaign.color}40` }}
              >
                {campaign.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted">
                {campaign.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted">
                {campaign.emails} emails
              </span>
            </div>
            <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug">
              {campaign.name}
            </h3>
            <p className="text-muted text-xs mt-1">{campaign.client} · {campaign.industry}</p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-green-400 font-heading font-bold text-lg sm:text-xl">{campaign.revenue}</div>
            <div className="text-muted text-xs">Revenue</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: Mail, label: 'Open Rate', value: `${campaign.openRate}%`, raw: campaign.openRate, max: 100, color: campaign.color },
            { icon: MousePointer, label: 'Click Rate', value: `${campaign.clickRate}%`, raw: campaign.clickRate, max: 50, color: '#3B82F6' },
            { icon: TrendingUp, label: 'Conversion', value: `${campaign.conversionRate}%`, raw: campaign.conversionRate, max: 30, color: '#10B981' },
          ].map(({ icon: Icon, label, value, raw, max, color }) => (
            <div key={label} className="bg-white/[0.03] rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={11} className="text-muted" />
                <span className="text-muted text-xs">{label}</span>
              </div>
              <div className="font-heading font-bold text-base text-white mb-1.5">{value}</div>
              <MetricBar value={raw} max={max} color={color} />
            </div>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-muted hover:text-white text-xs font-medium transition-colors w-full justify-between"
        >
          <span>{expanded ? 'Show less' : 'View details'}</span>
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/5 mt-4">
                <p className="text-muted text-sm leading-relaxed mb-3">{campaign.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {campaign.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function CampaignPortfolio() {
  const [activeType, setActiveType] = useState('All')
  const [activePlatform, setActivePlatform] = useState('All Platforms')

  const filtered = campaigns.filter((c) => {
    const matchType = activeType === 'All' || c.type === activeType
    const matchPlatform = activePlatform === 'All Platforms' || c.platform === activePlatform
    return matchType && matchPlatform
  })

  return (
    <section id="campaigns" className="section-padding relative overflow-hidden">
      <div className="blob w-96 h-96 bg-primary top-0 right-0 opacity-[0.07]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Campaign Portfolio"
          title="Real Campaigns,"
          highlight="Real Results"
          subtitle="A selection of email campaigns that generated significant revenue for our clients."
        />

        {/* Filters */}
        <div className="mt-10 mb-8 space-y-4">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveType(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeType === f
                    ? 'bg-primary text-white shadow-glow-sm'
                    : 'glass-card text-muted hover:text-white hover:border-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Platform filters */}
          <div className="flex gap-2">
            {platformFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActivePlatform(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activePlatform === f
                    ? 'bg-secondary text-white'
                    : 'glass-card text-muted hover:text-white hover:border-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeType}-${activePlatform}`}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="text-4xl mb-3">📭</div>
                <p className="text-muted">No campaigns match these filters.</p>
                <button
                  onClick={() => { setActiveType('All'); setActivePlatform('All Platforms') }}
                  className="mt-4 text-primary text-sm hover:text-white transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              filtered.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
