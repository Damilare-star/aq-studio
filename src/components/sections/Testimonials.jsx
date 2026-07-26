import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  )
}

const avatarColors = ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B']

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const autoRef = useRef(null)

  const go = (dir) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    autoRef.current = setInterval(() => go(1), 5000)
    return () => clearInterval(autoRef.current)
  }, [])

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="blob w-96 h-96 bg-primary bottom-0 right-0 opacity-10" />
      <div className="blob w-64 h-64 bg-secondary top-0 left-0 opacity-10" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Testimonials"
          title="What Clients"
          highlight="Say About Us"
          subtitle="Don't just take our word for it — here's what brands have experienced working with us."
        />

        <div className="mt-16 relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative min-h-[320px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute w-full"
              >
                <div className="glass-card p-8 lg:p-12 text-center relative">
                  {/* Quote icon */}
                  <div className="absolute top-6 left-8 text-primary/20">
                    <Quote size={48} />
                  </div>

                  <Stars count={testimonials[current].rating} />

                  <p className="text-white text-lg sm:text-xl leading-relaxed mt-6 mb-8 font-body italic max-w-2xl mx-auto">
                    "{testimonials[current].review}"
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg shrink-0"
                      style={{ background: avatarColors[current % avatarColors.length] }}
                    >
                      {testimonials[current].name[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-heading font-semibold text-white">
                        {testimonials[current].name}
                      </div>
                      <div className="text-muted text-sm">
                        {testimonials[current].role} · {testimonials[current].business}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 glass-card flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 glass-card flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Mini cards strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-12">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-4 text-left transition-all duration-300 ${
                i === current ? 'border-primary/40 shadow-glow-sm' : 'hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: avatarColors[i % avatarColors.length] }}
                >
                  {t.name[0]}
                </div>
                <span className="text-white text-xs font-semibold truncate">{t.name}</span>
              </div>
              <p className="text-muted text-xs line-clamp-2 leading-relaxed">{t.review}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
