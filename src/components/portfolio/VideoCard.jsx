import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, TrendingUp, ExternalLink, Heart } from 'lucide-react'
import { SiInstagram, SiTiktok, SiFacebook, SiYoutube } from 'react-icons/si'

const platformIcons = {
  Instagram: SiInstagram,
  TikTok: SiTiktok,
  Facebook: SiFacebook,
  YouTube: SiYoutube,
  Pinterest: null,
}

export default function VideoCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    card.style.transform = `perspective(900px) rotateX(${(y - cy) / 14}deg) rotateY(${(cx - x) / 14}deg) scale3d(1.02,1.02,1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)'
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className="group rounded-2xl overflow-hidden bg-black cursor-none"
      style={{ transition: 'transform 0.15s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={project.thumb}
          alt={project.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover overlay */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)` }}
        />

        {/* Play button */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/80 bg-white/10 backdrop-blur-md"
                style={{ boxShadow: `0 0 30px ${project.color}60` }}
              >
                <Play size={22} className="text-white ml-1" fill="white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.platform.slice(0, 2).map((p) => {
            const Icon = platformIcons[p]
            return (
              <span key={p} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white text-xs">
                {Icon && <Icon size={9} />}
                {p}
              </span>
            )
          })}
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

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-0.5 rounded-full bg-primary/80 text-white text-xs font-semibold backdrop-blur-sm">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Result on hover */}
        <AnimatePresence>
          {hovered && project.results?.[0] && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-green-500/20 border border-green-500/40 backdrop-blur-sm"
            >
              <span className="text-green-400 text-xs font-bold">
                {project.results[0].value} {project.results[0].label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info footer */}
      <div
        className="p-4 border border-t-0 rounded-b-2xl transition-all duration-300"
        style={{ borderColor: hovered ? `${project.color}30` : 'rgba(255,255,255,0.08)', background: hovered ? `${project.color}08` : 'rgba(255,255,255,0.03)' }}
      >
        <h3 className="font-heading font-semibold text-white text-sm mb-1 truncate">{project.title}</h3>
        <p className="text-muted text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted text-xs">
            <span className="flex items-center gap-1">
              <Eye size={11} /> {project.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={11} /> {project.likes}
            </span>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold transition-colors"
            style={{ color: project.color }}
          >
            View <ExternalLink size={10} />
          </button>
        </div>
      </div>
    </div>
  )
}
