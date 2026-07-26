import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, TrendingUp, Instagram, ExternalLink } from 'lucide-react'
import { SiTiktok, SiFacebook, SiInstagram } from 'react-icons/si'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const categories = ['All', 'Fashion', 'Beauty', 'Fitness', 'Food', 'Real Estate', 'Technology', 'Luxury']

const platformIcon = {
  Instagram: SiInstagram,
  TikTok: SiTiktok,
  Facebook: SiFacebook,
}

const projects = [
  {
    id: 1,
    title: 'Summer Collection Drop',
    industry: 'Fashion',
    description: 'Viral UGC-style reel driving 2M+ impressions in 48 hours.',
    platform: 'Instagram',
    views: '2.4M',
    result: '+185% Sales',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    color: '#8B5CF6',
  },
  {
    id: 2,
    title: 'Skincare Launch Campaign',
    industry: 'Beauty',
    description: 'AI avatar-driven product demo that converted 8.3% of viewers.',
    platform: 'TikTok',
    views: '890K',
    result: '+312% ROAS',
    thumb: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    color: '#EC4899',
  },
  {
    id: 3,
    title: 'FitPro 30-Day Challenge',
    industry: 'Fitness',
    description: 'High-energy ad series driving app downloads and memberships.',
    platform: 'Facebook',
    views: '1.1M',
    result: '+240% Signups',
    thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    color: '#3B82F6',
  },
  {
    id: 4,
    title: 'Artisan Food Brand',
    industry: 'Food',
    description: 'Cinematic product showcase with motion graphics overlay.',
    platform: 'Instagram',
    views: '560K',
    result: '+95% Orders',
    thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    color: '#F59E0B',
  },
  {
    id: 5,
    title: 'Luxury Property Tour',
    industry: 'Real Estate',
    description: 'AI-generated walkthrough video generating qualified leads.',
    platform: 'Facebook',
    views: '320K',
    result: '+67% Inquiries',
    thumb: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    color: '#06B6D4',
  },
  {
    id: 6,
    title: 'Tech Gadget Launch',
    industry: 'Technology',
    description: 'Sleek product reveal ad with animated specs and features.',
    platform: 'TikTok',
    views: '1.8M',
    result: '+420% Pre-orders',
    thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    color: '#10B981',
  },
]

function VideoCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const PlatformIcon = platformIcon[project.platform]

  return (
    <motion.div
      variants={staggerItem}
      className="group relative rounded-2xl overflow-hidden cursor-none bg-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={project.thumb}
          alt={project.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Dark overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${hovered ? 'opacity-70' : 'opacity-30'}`} />

        {/* Play button */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/80 bg-white/10 backdrop-blur-sm">
                <Play size={22} className="text-white ml-1" fill="white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Platform badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
          {PlatformIcon && <PlatformIcon size={11} className="text-white" />}
          <span className="text-white text-xs font-medium">{project.platform}</span>
        </div>

        {/* Industry badge */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}
          >
            {project.industry}
          </span>
        </div>

        {/* Result badge on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-green-500/20 border border-green-500/40 backdrop-blur-sm"
            >
              <span className="text-green-400 text-xs font-bold">{project.result}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-4 bg-gradient-to-b from-white/5 to-transparent border border-white/10 border-t-0 rounded-b-2xl">
        <h3 className="font-heading font-semibold text-white text-base mb-1">{project.title}</h3>
        <p className="text-muted text-xs leading-relaxed mb-3">{project.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted text-xs">
            <Eye size={12} />
            <span>{project.views} views</span>
          </div>
          <button className="text-primary text-xs font-semibold flex items-center gap-1 hover:text-white transition-colors">
            View Project <ExternalLink size={10} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedVideos() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.industry === activeCategory)

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="blob w-96 h-96 bg-accent top-0 right-0 opacity-[0.07]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Portfolio"
          title="Featured AI"
          highlight="Video Ads"
          subtitle="A selection of high-performing campaigns created for brands across industries."
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-glow-sm'
                  : 'glass-card text-muted hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <VideoCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          className="text-center mt-12"
        >
          <Button variant="outline" href="/ai-video-ads" arrow>
            View Full Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
