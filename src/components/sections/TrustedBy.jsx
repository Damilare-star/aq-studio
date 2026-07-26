import { motion } from 'framer-motion'
import {
  SiShopify, SiInstagram, SiMeta, SiTiktok,
  SiYoutube, SiGoogle, SiSpotify, SiStripe,
} from 'react-icons/si'

const logos = [
  { Icon: SiShopify, label: 'Shopify', color: '#96BF48' },
  { Icon: SiInstagram, label: 'Instagram', color: '#E1306C' },
  { Icon: SiMeta, label: 'Meta', color: '#1877F2' },
  { Icon: SiTiktok, label: 'TikTok', color: '#69C9D0' },
  { Icon: SiYoutube, label: 'YouTube', color: '#FF0000' },
  { Icon: SiGoogle, label: 'Google Ads', color: '#4285F4' },
  { Icon: SiSpotify, label: 'Spotify', color: '#1DB954' },
  { Icon: SiStripe, label: 'Stripe', color: '#635BFF' },
  { Icon: SiShopify, label: 'OpenAI', color: '#ffffff' },
  { Icon: SiMeta, label: 'Facebook', color: '#1877F2' },
]

// Duplicate for seamless loop
const doubled = [...logos, ...logos]

export default function TrustedBy() {
  return (
    <section className="py-14 border-y border-white/5 overflow-hidden bg-background relative">
      <div className="container-custom mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted text-sm uppercase tracking-widest font-semibold"
        >
          Trusted Platforms & Tools
        </motion.p>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee gap-12 pr-12">
          {doubled.map(({ Icon, label, color }, i) => (
            <div
              key={`${label}-${i}`}
              className="flex items-center gap-3 px-6 py-3 glass-card rounded-2xl shrink-0 hover:border-white/20 transition-all duration-300 group"
            >
              <Icon
                size={22}
                style={{ color }}
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-muted group-hover:text-white text-sm font-medium transition-colors whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
