import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import SEO from '@components/utils/SEO'
import VideoGallery from '@components/portfolio/VideoGallery'
import VideoLightbox from '@components/portfolio/VideoLightbox'
import PortfolioHero from '@components/portfolio/PortfolioHero'
import PortfolioCTA from '@components/portfolio/PortfolioCTA'
import { projects, categories } from '@/data/projects'

export default function AIVideoAds() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [lightboxProject, setLightboxProject] = useState(null)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === 'All' || p.industry === activeCategory
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.industry.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  return (
    <>
      <SEO
        title="AI Video Ads Portfolio | High-Converting Video Advertisements"
        description="Browse our portfolio of AI-generated video advertisements for fashion, beauty, fitness, technology, and more. Real results for real brands."
      />

      <PortfolioHero />

      <VideoGallery
        projects={filtered}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        search={search}
        onSearchChange={setSearch}
        onProjectClick={setLightboxProject}
      />

      <PortfolioCTA />

      {lightboxProject && (
        <VideoLightbox
          project={lightboxProject}
          onClose={() => setLightboxProject(null)}
        />
      )}
    </>
  )
}
