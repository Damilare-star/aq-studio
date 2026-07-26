import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Play, Eye, Heart, Share2,
  Clock, Users, Target, Wrench, TrendingUp,
} from 'lucide-react'
import { SiInstagram, SiTiktok, SiFacebook, SiYoutube } from 'react-icons/si'
import SEO from '@components/utils/SEO'
import Button from '@components/ui/Button'
import { projects } from '@/data/projects'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const platformIcons = { Instagram: SiInstagram, TikTok: SiTiktok, Facebook: SiFacebook, YouTube: SiYoutube }

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center">
        <div className="text-5xl mb-4">🎬</div>
        <h1 className="font-heading font-bold text-2xl text-white mb-2">Project Not Found</h1>
        <p className="text-muted mb-6">This project doesn't exist or may have been removed.</p>
        <Button variant="primary" href="/ai-video-ads">Back to Portfolio</Button>
      </div>
    )
  }

  const related = projects.filter((p) => p.id !== project.id && (p.industry === project.industry || p.featured)).slice(0, 3)

  return (
    <>
      <SEO
        title={`${project.title} | AI Video Ads Case Study`}
        description={`${project.description} — ${project.result}`}
      />

      {/* Back button */}
      <div className="fixed top-20 left-4 sm:left-8 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-muted hover:text-white text-sm font-medium transition-all"
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-primary top-0 right-0 opacity-10 animate-float" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Platforms */}
              <div className="flex gap-2 mb-5">
                {project.platform.map((p) => {
                  const Icon = platformIcons[p]
                  return (
                    <span key={p} className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-white/10 text-muted text-xs font-medium">
                      {Icon && <Icon size={11} />} {p}
                    </span>
                  )
                })}
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
                >
                  {project.industry}
                </span>
              </div>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
                {project.title}
              </h1>

              <p className="text-muted text-lg leading-relaxed mb-6">{project.description}</p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 mb-8 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <Users size={14} className="text-primary" />
                  <span>Client: <span className="text-white">{project.client}</span></span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Clock size={14} className="text-primary" />
                  <span>Delivered in: <span className="text-white">{project.duration}</span></span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" href="/contact" arrow>Start Your Project</Button>
                <Button variant="secondary" href="/ai-video-ads">View Portfolio</Button>
              </div>
            </motion.div>

            {/* Video thumb */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/5] group cursor-none"
            >
              <img src={project.thumb} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/60 bg-black/30 backdrop-blur-sm group-hover:scale-110 transition-transform"
                  style={{ boxShadow: `0 0 40px ${project.color}60` }}
                >
                  <Play size={28} className="text-white ml-1" fill="white" />
                </div>
              </div>
              {/* Stats strip */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                {[
                  { icon: Eye, val: project.views },
                  { icon: Heart, val: project.likes },
                  { icon: Share2, val: project.shares },
                ].map(({ icon: Icon, val }) => (
                  <div key={val} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
                    <Icon size={12} /> {val}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results bar */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {project.results.map(({ label, value }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="glass-card p-5 text-center hover:border-primary/30 transition-all hover:shadow-glow-sm"
              >
                <div className="font-heading font-bold text-3xl mb-1" style={{ color: project.color }}>
                  {value}
                </div>
                <div className="text-muted text-sm">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="mb-12 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Case Study
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white">
              Behind the Campaign
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { icon: Target, color: '#8B5CF6', title: 'The Goal', text: project.goal },
              { icon: TrendingUp, color: '#3B82F6', title: 'The Challenge', text: project.challenge },
              { icon: Wrench, color: '#06B6D4', title: 'The Solution', text: project.solution },
              { icon: TrendingUp, color: '#10B981', title: 'The Result', text: project.result },
            ].map(({ icon: Icon, color, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 sm:p-8 flex gap-5 hover:border-white/20 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-muted leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools used */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="mt-10 glass-card p-6"
          >
            <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
              <Wrench size={18} className="text-primary" /> Tools Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-muted text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="pb-24">
          <div className="container-custom">
            <h2 className="font-heading font-bold text-2xl text-white mb-8">More Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/ai-video-ads/${p.slug}`} className="group rounded-2xl overflow-hidden block cursor-none">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <img src={p.thumb} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-semibold mb-1" style={{ color: p.color }}>{p.industry}</p>
                      <h3 className="font-heading font-bold text-white text-sm">{p.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="blob w-96 h-96 bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto glass-card p-10 text-center">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
              Need Videos Like This?
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Let's create something amazing together. Book a free call and tell me about your brand.
            </p>
            <Button variant="primary" size="lg" href="/contact" arrow>
              Book a Free Call
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
