import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import { services } from '@/data/services'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const gradients = {
  'ai-video-ads': 'from-primary/20 via-secondary/10 to-transparent',
  shopify: 'from-secondary/20 via-accent/10 to-transparent',
  'email-marketing': 'from-accent/20 via-primary/10 to-transparent',
}

const iconColors = {
  'ai-video-ads': '#8B5CF6',
  shopify: '#3B82F6',
  'email-marketing': '#06B6D4',
}

export default function ServicesPreview() {
  const featured = services.find((s) => s.featured)
  const others = services.filter((s) => !s.featured)

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="blob w-[500px] h-[500px] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Services"
          title="Everything Your Brand"
          highlight="Needs to Scale"
          subtitle="From AI video ads to Shopify stores and email marketing — one creative partner for all your growth needs."
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Featured large card */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <div
              className={`glass-card h-full p-8 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-glow-sm`}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[featured.id]} opacity-50 pointer-events-none`} />

              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                ⭐ Featured Service
              </span>

              <h3 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
                {featured.title}
              </h3>
              <p className="text-muted text-base leading-relaxed mb-8 max-w-md">
                {featured.description}
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                {featured.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check size={13} className="text-primary shrink-0" />
                    <span className="text-muted text-xs">{f}</span>
                  </div>
                ))}
              </div>

              <Button variant="primary" href={featured.path} arrow>
                {featured.cta}
              </Button>

              {/* Floating glow orb */}
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
            </div>
          </motion.div>

          {/* Smaller cards */}
          <div className="flex flex-col gap-6">
            {others.map((service, i) => (
              <motion.div key={service.id} variants={staggerItem} className="flex-1">
                <div
                  className={`glass-card h-full p-6 relative overflow-hidden group hover:border-secondary/30 transition-all duration-500`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[service.id]} opacity-40 pointer-events-none`} />

                  <h3 className="font-heading font-bold text-xl text-white mb-3 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-5 relative z-10">
                    {service.description}
                  </p>

                  {/* Top features */}
                  <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                    {service.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted text-xs"
                      >
                        {f}
                      </span>
                    ))}
                    {service.features.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted text-xs">
                        +{service.features.length - 4} more
                      </span>
                    )}
                  </div>

                  <Link
                    to={service.path}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-white transition-colors relative z-10 group/link"
                  >
                    {service.cta}
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
