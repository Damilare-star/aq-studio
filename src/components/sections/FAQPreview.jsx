import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import Button from '@components/ui/Button'
import { faqData } from '@/data/faq'
import { viewport } from '@/utils/animations'

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ delay: index * 0.06 }}
      className={`glass-card overflow-hidden transition-all duration-300 ${
        open ? 'border-primary/30' : 'hover:border-white/20'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-none"
        aria-expanded={open}
      >
        <span className="font-heading font-semibold text-white text-sm sm:text-base pr-4">
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
            open ? 'bg-primary text-white' : 'bg-white/5 text-muted'
          }`}
        >
          {open ? <Minus size={15} /> : <Plus size={15} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-muted text-sm leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPreview() {
  // Show only first 5 on homepage
  const preview = faqData.slice(0, 5)

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="blob w-96 h-96 bg-secondary top-0 left-0 opacity-[0.07]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="FAQ"
          title="Common"
          highlight="Questions"
          subtitle="Everything you need to know before getting started. Still have questions? Just ask."
        />

        <div className="max-w-3xl mx-auto mt-12 flex flex-col gap-3">
          {preview.map((item, i) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          className="text-center mt-10"
        >
          <Button variant="outline" href="/faq" arrow>
            View All Questions
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
