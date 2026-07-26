import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  MessageCircle, Calendar,
} from 'lucide-react'
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import SEO from '@components/utils/SEO'
import Button from '@components/ui/Button'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

const services = [
  'AI Video Ads',
  'Shopify Store Design',
  'Shopify Templates',
  'Email Marketing',
  'Full Package',
  'Other',
]

const budgets = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000+',
  'Not Sure Yet',
]

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@aistudio.com', href: 'mailto:hello@aistudio.com', color: '#8B5CF6' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+1 (555) 000-0000', href: '#', color: '#25D366' },
  { icon: Clock, label: 'Business Hours', value: 'Mon–Fri, 9AM–6PM', href: null, color: '#3B82F6' },
  { icon: MapPin, label: 'Location', value: 'Available Worldwide', href: null, color: '#06B6D4' },
]

const socials = [
  { icon: FaInstagram, label: 'Instagram', href: '#', color: '#E1306C' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: '#', color: '#25D366' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@aistudio.com', color: '#8B5CF6' },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '',
    service: '', budget: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <>
      <SEO
        title="Contact | Book a Free Call — AI Video Ads Studio"
        description="Get in touch to start your AI video ads, Shopify, or email marketing project. Book a free discovery call today."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-primary top-0 right-0 opacity-10 animate-float" />
        <div className="blob w-72 h-72 bg-secondary bottom-0 left-0 opacity-10 animate-float-slow" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Let's Talk
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Let's Build Something{' '}
            <span className="gradient-text">Amazing Together</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Ready to grow your brand with AI video ads, a stunning Shopify store, or
            revenue-generating email marketing? Let's start with a free 30-minute call.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-32 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              className="lg:col-span-2 space-y-5"
            >
              {/* Contact info */}
              <div className="glass-card p-6">
                <h3 className="font-heading font-bold text-white text-lg mb-5">Contact Info</h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                        <Icon size={15} style={{ color }} />
                      </div>
                      <div>
                        <div className="text-muted text-xs mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} className="text-white text-sm font-medium hover:text-primary transition-colors">{value}</a>
                        ) : (
                          <span className="text-white text-sm font-medium">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="glass-card p-6">
                <h3 className="font-heading font-bold text-white text-base mb-4">Quick Connect</h3>
                <div className="grid grid-cols-2 gap-2">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.03] border border-white/8 rounded-xl hover:border-white/20 hover:bg-white/[0.06] transition-all text-sm text-muted hover:text-white"
                    >
                      <Icon size={14} style={{ color }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Book a call card */}
              <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4">
                    <Calendar size={18} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">Book a Free Call</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    Prefer to talk first? Book a free 30-minute discovery call and let's discuss your project.
                  </p>
                  <Button variant="primary" size="sm" href="https://calendly.com" external arrow>
                    Schedule a Call
                  </Button>
                </div>
              </div>

              {/* Response time */}
              <div className="glass-card p-4 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                <p className="text-muted text-sm">
                  Typically responds within <span className="text-white font-semibold">24 hours</span>
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={36} className="text-green-400" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-white text-2xl mb-3">Message Sent!</h3>
                    <p className="text-muted leading-relaxed max-w-sm">
                      Thanks for reaching out. I'll review your message and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', business: '', service: '', budget: '', message: '' }) }}
                      className="mt-6 text-primary text-sm hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-7 sm:p-9 space-y-5"
                  >
                    <h3 className="font-heading font-bold text-white text-xl mb-1">Send a Message</h3>
                    <p className="text-muted text-sm">Fill in the details below and I'll get back to you shortly.</p>

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-muted text-xs font-medium block mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          className={`w-full px-4 py-2.5 bg-white/5 border rounded-xl text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-muted text-xs font-medium block mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className={`w-full px-4 py-2.5 bg-white/5 border rounded-xl text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-muted text-xs font-medium block mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 555 000 0000"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-muted text-xs font-medium block mb-1.5">Business Name</label>
                        <input
                          type="text"
                          placeholder="Your Company"
                          value={form.business}
                          onChange={(e) => update('business', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="text-muted text-xs font-medium block mb-2">Service Needed</label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => update('service', s)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${form.service === s ? 'bg-primary text-white' : 'glass-card text-muted hover:text-white hover:border-white/20'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="text-muted text-xs font-medium block mb-2">Budget Range</label>
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => update('budget', b)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${form.budget === b ? 'bg-secondary text-white' : 'glass-card text-muted hover:text-white hover:border-white/20'}`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-muted text-xs font-medium block mb-1.5">Project Description *</label>
                      <textarea
                        rows={4}
                        placeholder="Tell me about your project, goals, and any specific requirements..."
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10'}`}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-glow-purple transition-all duration-300 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
