import { motion } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Mail, Phone, ArrowRight } from 'lucide-react'
import Button from '@components/ui/Button'
import { viewport } from '@/utils/animations'

export default function ContactCTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute inset-0 bg-noise opacity-50" />

      {/* Blobs */}
      <div className="blob w-[500px] h-[500px] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 animate-float" />
      <div className="blob w-64 h-64 bg-secondary top-10 right-10 opacity-15 animate-float-slow" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-10 lg:p-16 text-center relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none rounded-2xl" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Ready to Scale?
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Let's Build Something{' '}
            <span className="gradient-text">Amazing Together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Ready to create AI video ads that actually convert? Book a free 30-minute discovery
            call and let's talk about growing your brand.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button variant="primary" size="lg" href="/contact" arrow>
              Book a Free Call
            </Button>
            <Button variant="secondary" size="lg" href="/contact">
              Send a Message
            </Button>
          </motion.div>

          {/* Social / contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: FaWhatsapp, label: 'WhatsApp', href: '#', color: '#25D366' },
              { icon: Mail, label: 'Email', href: 'mailto:hello@aqstudio.com', color: '#8B5CF6' },
              { icon: FaInstagram, label: 'Instagram', href: '#', color: '#E1306C' },
              { icon: FaLinkedinIn, label: 'LinkedIn', href: '#', color: '#0A66C2' },
            ].map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl hover:border-white/20 transition-all duration-300 text-muted hover:text-white text-sm font-medium"
              >
                <Icon size={16} style={{ color }} />
                {label}
              </a>
            ))}
          </motion.div>

          {/* Response time indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ delay: 0.5 }}
            className="text-muted text-xs mt-8 flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Typically responds within 24 hours
          </motion.p>
        </div>
      </div>
    </section>
  )
}
