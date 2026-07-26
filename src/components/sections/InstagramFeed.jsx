import { motion } from 'framer-motion'
import { Play, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const reels = [
  {
    id: 1,
    thumb: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
    likes: '12.4K',
    comments: '342',
    isVideo: true,
  },
  {
    id: 2,
    thumb: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
    likes: '8.9K',
    comments: '218',
    isVideo: true,
  },
  {
    id: 3,
    thumb: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    likes: '21.1K',
    comments: '567',
    isVideo: true,
  },
  {
    id: 4,
    thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    likes: '15.3K',
    comments: '411',
    isVideo: true,
  },
  {
    id: 5,
    thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    likes: '9.7K',
    comments: '265',
    isVideo: false,
  },
  {
    id: 6,
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    likes: '18.2K',
    comments: '489',
    isVideo: true,
  },
]

export default function InstagramFeed() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="container-custom relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <SectionHeading
            badge="Instagram"
            title="Follow Our"
            highlight="Creative Journey"
            center={false}
          />
          <Button
            variant="outline"
            href="https://instagram.com"
            external
            icon={<SiInstagram size={16} />}
          >
            @aqstudio
          </Button>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewport}
          className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3"
        >
          {reels.map((reel) => (
            <motion.a
              key={reel.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 cursor-none"
            >
              <img
                src={reel.thumb}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  {reel.isVideo && (
                    <Play size={20} className="text-white fill-white" />
                  )}
                  <div className="flex gap-3 text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Heart size={11} className="fill-white" /> {reel.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={11} /> {reel.comments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video indicator */}
              {reel.isVideo && (
                <div className="absolute top-1.5 right-1.5">
                  <Play size={10} className="text-white fill-white" />
                </div>
              )}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          className="flex items-center justify-center gap-3 mt-8 text-muted text-sm"
        >
          <SiInstagram size={16} className="text-pink-500" />
          <span>Follow us for daily AI video ad inspiration</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-white transition-colors font-semibold flex items-center gap-1"
          >
            Follow <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
