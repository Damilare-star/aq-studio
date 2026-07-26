import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import VideoCard from './VideoCard'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

export default function VideoGallery({
  projects,
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  onProjectClick,
}) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <section className="pb-32 relative z-10">
      <div className="container-custom">
        {/* Controls bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-10 sticky top-20 z-30 py-4 bg-background/80 backdrop-blur-xl border-b border-white/5">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, industry, client..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter toggle on mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-muted text-sm hover:text-white hover:border-white/20 transition-all"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          {/* Category pills — always visible on desktop */}
          <div className={`flex flex-wrap gap-2 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-glow-sm'
                    : 'glass-card text-muted hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <motion.p
            key={`${activeCategory}-${search}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted text-sm"
          >
            {projects.length === 0 ? (
              'No projects found'
            ) : (
              <>
                Showing <span className="text-white font-semibold">{projects.length}</span> project{projects.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && (
                  <> in <span className="text-primary font-semibold">{activeCategory}</span></>
                )}
                {search && (
                  <> matching <span className="text-primary font-semibold">"{search}"</span></>
                )}
              </>
            )}
          </motion.p>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {projects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">No projects found</h3>
              <p className="text-muted text-sm">Try a different category or search term.</p>
              <button
                onClick={() => { onCategoryChange('All'); onSearchChange('') }}
                className="mt-6 px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-xl text-sm hover:bg-primary/20 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${search}`}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, i) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <VideoCard
                    project={project}
                    onClick={() => onProjectClick(project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
