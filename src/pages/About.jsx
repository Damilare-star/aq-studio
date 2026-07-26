import { motion } from 'framer-motion'
import {
  Award, Code2, Video, Mail, Users, TrendingUp,
  Instagram, Linkedin, Twitter, ExternalLink,
  CheckCircle2, Calendar, Zap,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import SEO from '@components/utils/SEO'
import Button from '@components/ui/Button'
import SectionHeading from '@components/ui/SectionHeading'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const skills = [
  { label: 'AI Video Production', level: 98, color: '#8B5CF6' },
  { label: 'Shopify Development', level: 92, color: '#3B82F6' },
  { label: 'Email Marketing', level: 94, color: '#06B6D4' },
  { label: 'Motion Graphics', level: 88, color: '#10B981' },
  { label: 'Brand Strategy', level: 85, color: '#F59E0B' },
  { label: 'Conversion Optimisation', level: 90, color: '#EC4899' },
]

const timeline = [
  { year: '2018', title: 'Started Digital Marketing', desc: 'Began freelancing in social media marketing and content creation for local businesses.', icon: '🚀' },
  { year: '2019', title: 'Shopify Specialist', desc: 'Transitioned into eCommerce, building and optimising Shopify stores for fashion and beauty brands.', icon: '🛍️' },
  { year: '2020', title: 'Email Marketing Focus', desc: 'Became a Klaviyo-certified expert generating consistent revenue for eCommerce clients.', icon: '✉️' },
  { year: '2022', title: 'Discovered AI Video', desc: 'Early adopter of AI video tools. Created first viral AI ad that reached 500K views organically.', icon: '🤖' },
  { year: '2023', title: 'AI Video Studio Launch', desc: 'Officially launched AI Video Ads Studio, serving brands across 12 countries.', icon: '🎬' },
  { year: '2024', title: '100+ Videos & $500K Revenue', desc: 'Surpassed 100 AI video ads created and helped clients generate over $500K in attributed revenue.', icon: '⭐' },
]

const stats = [
  { value: '100+', label: 'Videos Created', icon: Video },
  { value: '50+', label: 'Brands Served', icon: Users },
  { value: '$500K+', label: 'Revenue Influenced', icon: TrendingUp },
  { value: '6+', label: 'Years Experience', icon: Award },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#', color: '#E1306C' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: Twitter, label: 'Twitter', href: '#', color: '#1DA1F2' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: '#', color: '#25D366' },
]

function SkillBar({ label, level, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-white/80 text-sm font-medium">{label}</span>
        <span className="text-muted text-xs font-semibold">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, ${color}80)` }}
        />
      </div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <SEO
        title="About | AI Video Ads Expert & Creative Director"
        description="Learn about my background, skills, and experience in AI video production, Shopify development, and email marketing."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-primary top-0 right-0 opacity-10 animate-float" />
        <div className="blob w-64 h-64 bg-accent bottom-0 left-0 opacity-10 animate-float-slow" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                About Me
              </motion.div>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Creative Director &{' '}
                <span className="gradient-text">AI Video Expert</span>
              </h1>

              <p className="text-white/80 text-lg leading-relaxed mb-5">
                I'm a digital creative specialising in AI-powered video advertising, Shopify store
                design, and email marketing. With 6+ years in the industry, I've helped brands
                across fashion, beauty, fitness, and technology grow their revenue through
                compelling content and smart marketing systems.
              </p>

              <p className="text-muted leading-relaxed mb-8">
                My mission is simple: use cutting-edge AI tools to give every brand —
                regardless of size or budget — access to world-class video advertising that
                actually converts. I believe great content should be fast, affordable, and
                results-driven.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-3 mb-8">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 glass-card flex items-center justify-center rounded-xl hover:border-white/20 transition-all group"
                  >
                    <Icon size={16} style={{ color }} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="primary" href="/contact" arrow>Work With Me</Button>
                <Button variant="secondary" href="/ai-video-ads">View Portfolio</Button>
              </div>
            </motion.div>

            {/* Photo + card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              {/* Photo placeholder */}
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] glass-card">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow-purple">
                      <span className="text-white font-heading font-bold text-5xl">AI</span>
                    </div>
                    <p className="text-muted text-sm">Creative Director</p>
                    <p className="text-white font-heading font-semibold">AI Video Studio</p>
                  </div>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-5 top-1/4 glass-card px-4 py-3 rounded-2xl border border-primary/20"
              >
                <div className="font-heading font-bold text-primary text-xl">100+</div>
                <div className="text-muted text-xs">AI Videos</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-5 bottom-1/4 glass-card px-4 py-3 rounded-2xl border border-accent/20"
              >
                <div className="font-heading font-bold text-accent text-xl">98%</div>
                <div className="text-muted text-xs">Satisfaction</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-white/5">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="glass-card p-6 text-center hover:border-primary/30 hover:shadow-glow-sm transition-all"
              >
                <Icon size={22} className="text-primary mx-auto mb-3" />
                <div className="font-heading font-bold text-3xl gradient-text mb-1">{value}</div>
                <div className="text-muted text-sm">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding relative overflow-hidden">
        <div className="blob w-96 h-96 bg-primary top-0 right-0 opacity-[0.07]" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                badge="Skills"
                title="What I"
                highlight="Specialise In"
                center={false}
              />
              <div className="mt-10 space-y-5">
                {skills.map((skill) => (
                  <SkillBar key={skill.label} {...skill} />
                ))}
              </div>
            </div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              className="space-y-5"
            >
              {[
                {
                  icon: Zap, color: '#8B5CF6', title: 'My Mission',
                  text: 'To democratise premium video advertising through AI — giving every brand access to world-class ads that were once only available to large corporations with massive budgets.',
                },
                {
                  icon: TrendingUp, color: '#3B82F6', title: 'My Vision',
                  text: 'A world where every small business can compete with the biggest brands using AI-powered marketing that is fast, affordable, and extraordinarily effective.',
                },
                {
                  icon: CheckCircle2, color: '#06B6D4', title: 'My Values',
                  text: 'Transparency, quality, and results. I don\'t just deliver content — I deliver outcomes. Every project is measured by the impact it has on your revenue.',
                },
              ].map(({ icon: Icon, color, title, text }) => (
                <div key={title} className="glass-card p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg">{title}</h3>
                  </div>
                  <p className="text-muted leading-relaxed text-sm">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding relative overflow-hidden bg-background">
        <div className="blob w-[400px] h-[400px] bg-secondary top-1/2 left-0 opacity-[0.06]" />
        <div className="container-custom relative z-10">
          <SectionHeading badge="Journey" title="My" highlight="Story" subtitle="From digital marketing freelancer to AI video expert — the journey that shaped who I am today." />

          <div className="relative mt-16 max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-start`}
                >
                  {/* Card */}
                  <div className={`flex-1 pl-14 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                    <div className="glass-card p-5 inline-block max-w-sm hover:border-white/20 transition-all">
                      <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-primary font-heading font-bold text-sm">{item.year}</span>
                      </div>
                      <h3 className="font-heading font-bold text-white text-base mb-1">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-glow-sm z-10 top-4" />

                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="blob w-96 h-96 bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
        <div className="container-custom relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="font-heading font-bold text-4xl sm:text-5xl text-white mb-5"
          >
            Let's Create Something{' '}
            <span className="gradient-text">Extraordinary</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg max-w-xl mx-auto mb-8"
          >
            Ready to take your brand to the next level? Let's talk.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact" arrow>Book a Free Call</Button>
            <Button variant="secondary" size="lg" href="/ai-video-ads">View Portfolio</Button>
          </div>
        </div>
      </section>
    </>
  )
}
