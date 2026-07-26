import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaTiktok, FaTwitter } from 'react-icons/fa'
import { Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'AI Video Ads', path: '/ai-video-ads' },
  { label: 'Shopify Portfolio', path: '/shopify-portfolio' },
  { label: 'Shopify Templates', path: '/shopify-templates' },
  { label: 'Email Marketing', path: '/email-marketing' },
]

const secondaryLinks = [
  { label: 'About', path: '/about' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms-of-service' },
]

const socials = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTiktok, href: '#', label: 'TikTok' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background overflow-hidden">
      {/* Gradient blob */}
      <div className="blob w-96 h-96 bg-primary bottom-0 left-1/4 opacity-10" />

      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
              <span className="text-white font-heading font-bold text-sm">AQ</span>
              </div>
              <span className="font-heading font-bold text-xl gradient-text">Studio</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Premium AI Video Ads that stop the scroll and increase sales for brands worldwide.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 glass-card flex items-center justify-center text-muted hover:text-white hover:border-primary/40 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-muted hover:text-white text-sm transition-colors flex items-center gap-1 group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5">
              {secondaryLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-muted hover:text-white text-sm transition-colors flex items-center gap-1 group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-widest">Stay Updated</h4>
            <p className="text-muted text-sm mb-4 leading-relaxed">Get tips on AI video marketing and brand growth.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold hover:shadow-glow-purple transition-all duration-300"
              >
                Subscribe
              </button>
            </form>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-muted text-xs">
                <Mail size={12} className="text-primary" />
                <span>hello@aqstudio.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted text-xs">
                <Clock size={12} className="text-primary" />
                <span>Mon–Fri, 9AM–6PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs text-center sm:text-left">
            © {new Date().getFullYear()} AQ Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-muted hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-muted hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
