import { motion } from 'framer-motion'
import {
  Phone, Search, Target, FileText, Layout,
  Cpu, Scissors, RefreshCw, Send, HeartHandshake,
} from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { viewport } from '@/utils/animations'

const steps = [
  { icon: Phone, title: 'Discovery Call', desc: 'We discuss your brand, goals, target audience, and project requirements.', color: '#8B5CF6' },
  { icon: Search, title: 'Research', desc: 'In-depth analysis of your market, competitors, and audience behaviour.', color: '#7C3AED' },
  { icon: Target, title: 'Strategy', desc: 'We build a custom ad strategy tailored to your goals and platform.', color: '#6D28D9' },
  { icon: FileText, title: 'Script Writing', desc: 'Compelling, conversion-focused scripts crafted for your audience.', color: '#3B82F6' },
  { icon: Layout, title: 'Storyboard', desc: 'Visual planning of every scene to ensure perfect flow and pacing.', color: '#2563EB' },
  { icon: Cpu, title: 'AI Production', desc: 'High-quality video generation using the latest AI tools and models.', color: '#06B6D4' },
  { icon: Scissors, title: 'Editing', desc: 'Professional editing, colour grading, and motion graphics added.', color: '#0891B2' },
  { icon: RefreshCw, title: 'Revisions', desc: 'Refinements based on your feedback until you are 100% happy.', color: '#10B981' },
  { icon: Send, title: 'Delivery', desc: 'Final files delivered in all required formats and resolutions.', color: '#059669' },
  { icon: HeartHandshake, title: 'Support', desc: 'Ongoing support and guidance for running your ad campaigns.', color: '#F59E0B' },
]

export default function Process() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="blob w-[600px] h-[600px] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="How It Works"
          title="Our Proven"
          highlight="Process"
          subtitle="A streamlined workflow from first call to final delivery — transparent, collaborative, and results-driven."
        />

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Center line — desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-12 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div
                      className={`glass-card p-5 inline-block max-w-sm hover:border-white/20 transition-all duration-300 group ${
                        isLeft ? 'ml-auto' : 'mr-auto'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 mb-2 ${isLeft ? 'lg:flex-row-reverse' : 'flex-row'}`}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}
                        >
                          <Icon size={16} style={{ color: step.color }} />
                        </div>
                        <h3 className="font-heading font-semibold text-white text-base">{step.title}</h3>
                      </div>
                      <p className={`text-muted text-sm leading-relaxed ${isLeft ? 'lg:text-right' : 'text-left'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center number bubble */}
                  <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 mx-auto lg:mx-0 font-heading font-bold text-sm text-white border-2"
                    style={{ background: step.color, borderColor: `${step.color}60`, boxShadow: `0 0 20px ${step.color}40` }}
                  >
                    {i + 1}
                  </div>

                  {/* Empty spacer */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
