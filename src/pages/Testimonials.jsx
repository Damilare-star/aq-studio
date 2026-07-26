import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, Filter } from 'lucide-react'
import SEO from '@components/utils/SEO'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const allTestimonials = [
  { id: 1, name: 'Sarah Johnson', business: 'Glow Beauty Co.', role: 'Founder & CEO', service: 'AI Video Ads', rating: 5, review: 'The AI video ads completely transformed our Instagram presence. Our engagement tripled within the first month and sales followed. Absolutely phenomenal work.', result: '+185% Sales', color: '#EC4899' },
  { id: 2, name: 'Marcus Williams', business: 'FitPro Athletics', role: 'Marketing Director', service: 'AI Video Ads', rating: 5, review: 'I was skeptical about AI-generated ads but the quality blew me away. The videos look completely professional and our ROAS jumped from 2x to 6x.', result: '6x ROAS', color: '#3B82F6' },
  { id: 3, name: 'Priya Sharma', business: 'LuxeHome Decor', role: 'E-commerce Manager', service: 'Shopify Design', rating: 5, review: 'Not only did they create stunning video ads, but the Shopify store redesign was world class. Our conversion rate went from 1.2% to 4.1%.', result: '+240% CVR', color: '#8B5CF6' },
  { id: 4, name: 'James Chen', business: 'TechGear Store', role: 'Owner', service: 'Email Marketing', rating: 5, review: 'The email marketing flows they set up in Klaviyo are generating passive revenue every day. My abandoned cart recovery rate is now over 35%.', result: '35% Recovery', color: '#06B6D4' },
  { id: 5, name: 'Aaliya Hassan', business: 'Modesty Fashion', role: 'Brand Owner', service: 'AI Video Ads', rating: 5, review: 'Fast, professional, and incredibly talented. The TikTok ads went viral twice in one month. I highly recommend to any brand that wants to scale.', result: '2x Viral', color: '#F59E0B' },
  { id: 6, name: 'David Okafor', business: 'NovaTech Devices', role: 'CMO', service: 'AI Video Ads', rating: 5, review: 'The product launch video drove 1.8M views in 72 hours. We hit 420% of our pre-order target. Genuinely one of the best marketing investments we have made.', result: '+420% Pre-orders', color: '#10B981' },
  { id: 7, name: 'Sophie Laurent', business: 'Aurum Fine Jewels', role: 'Creative Director', service: 'AI Video Ads', rating: 5, review: 'The luxury brand film exceeded every expectation. It positioned us alongside the top jewellery brands and increased our average order value by 38%.', result: '+38% AOV', color: '#F59E0B' },
  { id: 8, name: 'Ryan Thompson', business: 'Nordic Living Co.', role: 'Founder', service: 'Shopify Design', rating: 5, review: 'The Shopify redesign increased our website traffic by 78% and our best-performing content of all time was the lifestyle video they created for us.', result: '+78% Traffic', color: '#06B6D4' },
  { id: 9, name: 'Fatima Al-Rashid', business: 'Prestige Real Estate', role: 'Marketing Manager', service: 'AI Video Ads', rating: 5, review: 'I never thought AI video could look this cinematic. The property tour generated 67% more qualified leads and we received three offers in two weeks.', result: '+67% Leads', color: '#8B5CF6' },
]

const services = ['All', 'AI Video Ads', 'Shopify Design', 'Email Marketing']
const avatarColors = ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899', '#F97316', '#84CC16', '#A855F7']

function TestimonialCard({ t, index }) {
  return (
    <motion.div
      variants={staggerItem}
      className="glass-card p-6 hover:border-white/20 transition-all duration-300 group flex flex-col h-full"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Quote icon */}
      <div className="text-white/5 mb-2">
        <Quote size={32} />
      </div>

      {/* Review */}
      <p className="text-white/80 text-sm leading-relaxed flex-1 mb-5 italic">
        "{t.review}"
      </p>

      {/* Result badge */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5 self-start"
        style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}40` }}
      >
        <span>📈</span> {t.result}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0"
          style={{ background: avatarColors[index % avatarColors.length] }}
        >
          {t.name[0]}
        </div>
        <div>
          <div className="font-heading font-semibold text-white text-sm">{t.name}</div>
          <div className="text-muted text-xs">{t.role} · {t.business}</div>
        </div>
        <div className="ml-auto">
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted text-xs">
            {t.service}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [activeService, setActiveService] = useState('All')

  const filtered = activeService === 'All'
    ? allTestimonials
    : allTestimonials.filter((t) => t.service === activeService)

  return (
    <>
      <SEO
        title="Testimonials | Client Reviews — AI Video Ads Studio"
        description="See what clients say about our AI video ads, Shopify design, and email marketing services. Real reviews from real brands."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-primary top-0 right-0 opacity-10 animate-float" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Star size={12} className="fill-current" />
            Client Testimonials
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            What Clients{' '}
            <span className="gradient-text">Say About Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg max-w-xl mx-auto mb-8"
          >
            Real results from real brands. 98% client satisfaction across every project.
          </motion.p>

          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-2xl"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-heading font-bold text-white text-xl">5.0</span>
            <span className="text-muted text-sm">from {allTestimonials.length} reviews</span>
          </motion.div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="pb-32 relative z-10">
        <div className="container-custom">
          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {services.map((s) => (
              <button
                key={s}
                onClick={() => setActiveService(s)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeService === s ? 'bg-primary text-white shadow-glow-sm' : 'glass-card text-muted hover:text-white hover:border-white/20'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="mt-20 text-center"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
              Ready to Be Our Next{' '}
              <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-muted mb-8 max-w-lg mx-auto">
              Join the brands that have transformed their marketing with AI-powered video ads and smart automation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/contact" arrow>Book a Free Call</Button>
              <Button variant="secondary" size="lg" href="/ai-video-ads">View Portfolio</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
