import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Play, Pause, Volume2, VolumeX,
  ExternalLink, ChevronLeft, ChevronRight,
  Eye, Heart, Share2, TrendingUp,
} from 'lucide-react'
import { SiInstagram, SiTiktok, SiFacebook, SiYoutube } from 'react-icons/si'
import { Link } from 'react-router-dom'
import Button from '@components/ui/Button'
import { projects } from '@/data/projects'

const platformIcons = { Instagram: SiInstagram, TikTok: SiTiktok, Facebook: SiFacebook, YouTube: SiYoutube }

export default function VideoLightbox({ project, onClose }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const overlayRef = useRef(null)

  // Get adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length]
  const next = projects[(currentIndex + 1) % projects.length]

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ESC key close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'case-study', label: 'Case Study' },
    { id: 'results', label: 'Results' },
  ]

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 glass-card flex items-center justify-center rounded-xl text-muted hover:text-white hover:border-white/30 transition-all"
          >
            <X size={18} />
          </button>

          {/* Navigation prev/next */}
          <button
            onClick={() => { /* handled via onClose + re-open in parent ideally */ }}
            className="absolute top-1/2 -translate-y-1/2 left-4 z-20 w-9 h-9 glass-card hidden md:flex items-center justify-center rounded-xl text-muted hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-9 h-9 glass-card hidden md:flex items-center justify-center rounded-xl text-muted hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left — video/image */}
            <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[500px] rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden bg-black">
              <img
                src={project.thumb}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Play/pause button */}
              <button
                onClick={() => setPlaying(!playing)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/60 bg-black/30 backdrop-blur-sm group-hover:border-white transition-all"
                  style={{ boxShadow: `0 0 40px ${project.color}50` }}
                >
                  {playing
                    ? <Pause size={28} className="text-white" fill="white" />
                    : <Play size={28} className="text-white ml-1" fill="white" />
                  }
                </motion.div>
              </button>

              {/* Volume toggle */}
              <button
                onClick={() => setMuted(!muted)}
                className="absolute bottom-4 right-4 w-9 h-9 glass-card flex items-center justify-center rounded-xl text-muted hover:text-white transition-all"
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Platform badges */}
              <div className="absolute top-4 left-4 flex gap-1.5">
                {project.platform.map((p) => {
                  const Icon = platformIcons[p]
                  return (
                    <span key={p} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">
                      {Icon && <Icon size={11} />} {p}
                    </span>
                  )
                })}
              </div>

              {/* Industry + featured */}
              <div className="absolute top-4 right-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${project.color}30`, color: project.color, border: `1px solid ${project.color}50` }}
                >
                  {project.industry}
                </span>
              </div>
            </div>

            {/* Right — info */}
            <div className="p-6 sm:p-8 flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                    {project.title}
                  </h2>
                  <button className="shrink-0 text-muted hover:text-white transition-colors mt-1">
                    <Share2 size={18} />
                  </button>
                </div>
                <p className="text-muted text-sm mb-3">{project.client} · {project.duration} delivery</p>
                <p className="text-white/80 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Eye, label: 'Views', value: project.views },
                  { icon: Heart, label: 'Likes', value: project.likes },
                  { icon: Share2, label: 'Shares', value: project.shares },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-card p-3 text-center rounded-xl">
                    <Icon size={14} className="text-muted mx-auto mb-1" />
                    <div className="font-heading font-bold text-white text-base">{value}</div>
                    <div className="text-muted text-xs">{label}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-6 glass-card p-1 rounded-xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-glow-sm'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-h-[160px]"
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">Goal</h4>
                        <p className="text-white/80 text-sm leading-relaxed">{project.goal}</p>
                      </div>
                      <div>
                        <h4 className="text-muted text-xs uppercase tracking-wider font-semibold mb-2">Tools Used</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tools.map((tool) => (
                            <span key={tool} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted text-xs">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-muted text-xs uppercase tracking-wider font-semibold mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium"
                              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'case-study' && (
                    <div className="space-y-4">
                      {[
                        { label: 'Challenge', text: project.challenge },
                        { label: 'Solution', text: project.solution },
                        { label: 'Outcome', text: project.result },
                      ].map(({ label, text }) => (
                        <div key={label}>
                          <h4 className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">{label}</h4>
                          <p className="text-white/80 text-sm leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div className="grid grid-cols-2 gap-3">
                      {project.results.map(({ label, value }) => (
                        <div
                          key={label}
                          className="glass-card p-4 rounded-xl hover:border-primary/30 transition-colors"
                        >
                          <div
                            className="font-heading font-bold text-2xl mb-1"
                            style={{ color: project.color }}
                          >
                            {value}
                          </div>
                          <div className="text-muted text-xs">{label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <div className="pt-6 mt-auto border-t border-white/5">
                <p className="text-muted text-xs mb-4">
                  Need videos like this?{' '}
                  <span className="text-white">Let's work together.</span>
                </p>
                <div className="flex gap-3">
                  <Button variant="primary" size="sm" href="/contact" className="flex-1 justify-center">
                    Book a Free Call
                  </Button>
                  <Button variant="secondary" size="sm" href={`/ai-video-ads/${project.slug}`} className="flex-1 justify-center">
                    Full Case Study
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
