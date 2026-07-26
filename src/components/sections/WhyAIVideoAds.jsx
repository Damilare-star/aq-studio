import { motion } from 'framer-motion'
import { TrendingUp, Zap, DollarSign, MousePointer } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import Card from '@components/ui/Card'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const features = [
  {
    icon: TrendingUp,
    color: '#8B5CF6',
    title: 'More Sales',
    description:
      'Increase conversions through engaging AI-powered advertisements designed to move viewers through your funnel and click buy.',
    stat: '+340%',
    statLabel: 'avg. conversion lift',
  },
  {
    icon: Zap,
    color: '#3B82F6',
    title: 'Faster Production',
    description:
      'Launch campaigns in days instead of weeks. No scheduling, no reshoots — AI delivers polished video ads at unprecedented speed.',
    stat: '3–7',
    statLabel: 'days delivery',
  },
  {
    icon: DollarSign,
    color: '#06B6D4',
    title: 'Lower Costs',
    description:
      'No expensive actors, cameras, studios, or production teams. Get premium video ads at a fraction of traditional production costs.',
    stat: '80%',
    statLabel: 'cost reduction',
  },
  {
    icon: MousePointer,
    color: '#10B981',
    title: 'Higher Engagement',
    description:
      'Videos designed to stop scrolling and increase clicks. AI-crafted content that speaks directly to your target audience.',
    stat: '5x',
    statLabel: 'engagement rate',
  },
]

export default function WhyAIVideoAds() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-primary top-0 right-0 opacity-10" />
      <div className="blob w-64 h-64 bg-secondary bottom-0 left-0 opacity-10" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Why AI Video Ads"
          title="The Smarter Way to"
          highlight="Advertise"
          subtitle="AI-powered video ads give your brand an unfair advantage. Better results, faster turnaround, lower cost."
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map(({ icon: Icon, color, title, description, stat, statLabel }) => (
            <motion.div key={title} variants={staggerItem}>
              <Card tilt glow hover className="h-full group">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>

                {/* Stat */}
                <div className="mb-3">
                  <span
                    className="font-heading font-bold text-3xl"
                    style={{ color }}
                  >
                    {stat}
                  </span>
                  <span className="text-muted text-xs ml-2">{statLabel}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white mb-3">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 70%)`,
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
