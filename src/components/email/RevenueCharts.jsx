import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@components/ui/SectionHeading'
import { campaigns } from '@/data/emailMarketing'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

// Simple bar chart — no external chart lib needed
const monthlyData = [
  { month: 'Jan', revenue: 18400, emails: 12 },
  { month: 'Feb', revenue: 22100, emails: 15 },
  { month: 'Mar', revenue: 31200, emails: 18 },
  { month: 'Apr', revenue: 28600, emails: 16 },
  { month: 'May', revenue: 41800, emails: 22 },
  { month: 'Jun', revenue: 52400, emails: 28 },
  { month: 'Jul', revenue: 48900, emails: 24 },
  { month: 'Aug', revenue: 61300, emails: 31 },
  { month: 'Sep', revenue: 57200, emails: 26 },
  { month: 'Oct', revenue: 69800, emails: 34 },
  { month: 'Nov', revenue: 84200, emails: 42 },
  { month: 'Dec', revenue: 97600, emails: 48 },
]

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

function BarChart() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="w-full">
      {/* Y-axis labels */}
      <div className="flex items-end gap-2 sm:gap-3 h-48 sm:h-64 mb-2">
        {monthlyData.map((d, i) => (
          <div
            key={d.month}
            className="flex-1 flex flex-col items-center justify-end gap-1 cursor-none h-full"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip */}
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 px-2 py-1.5 glass-card rounded-lg text-xs text-white font-semibold whitespace-nowrap z-10 pointer-events-none"
              >
                ${(d.revenue / 1000).toFixed(1)}K
              </motion.div>
            )}

            <div className="relative w-full flex items-end justify-center" style={{ height: '100%' }}>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                className="w-full rounded-t-lg relative overflow-hidden"
                style={{
                  background: hovered === i
                    ? 'linear-gradient(to top, #8B5CF6, #06B6D4)'
                    : 'linear-gradient(to top, rgba(139,92,246,0.8), rgba(59,130,246,0.4))',
                  transition: 'background 0.2s ease',
                  boxShadow: hovered === i ? '0 0 20px rgba(139,92,246,0.5)' : 'none',
                }}
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="flex gap-2 sm:gap-3">
        {monthlyData.map((d) => (
          <div key={d.month} className="flex-1 text-center text-muted text-xs">{d.month}</div>
        ))}
      </div>
    </div>
  )
}

function DonutChart({ value, max = 100, color, label, sublabel }) {
  const pct = (value / max) * 100
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const dash = (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          {/* Track */}
          <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          {/* Progress */}
          <motion.circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - dash }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading font-bold text-lg text-white">{value}%</span>
        </div>
      </div>
      <div className="text-white text-xs font-semibold text-center mt-2">{label}</div>
      <div className="text-muted text-xs text-center">{sublabel}</div>
    </div>
  )
}

export default function RevenueCharts() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="blob w-[500px] h-[500px] bg-secondary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Analytics"
          title="Revenue &"
          highlight="Performance Data"
          subtitle="Transparent results backed by real data from our email campaigns."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar chart — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            className="lg:col-span-2 glass-card p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h3 className="font-heading font-bold text-white text-lg">Monthly Revenue from Email</h3>
                <p className="text-muted text-sm mt-0.5">Cumulative across all client campaigns — 2024</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-muted text-xs">
                  <span className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to top, #8B5CF6, #3B82F6)' }} />
                  Revenue
                </span>
              </div>
            </div>
            <BarChart />
            <div className="mt-4 flex items-center justify-between text-muted text-xs">
              <span>Total 2024: <span className="text-green-400 font-bold">$613,500</span></span>
              <span>YoY Growth: <span className="text-primary font-bold">+284%</span></span>
            </div>
          </motion.div>

          {/* Donut charts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="mb-6">
              <h3 className="font-heading font-bold text-white text-lg mb-1">Email Metrics</h3>
              <p className="text-muted text-sm">vs industry benchmarks</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <DonutChart value={68} color="#8B5CF6" label="Open Rate" sublabel="Avg. 21% industry" />
              <DonutChart value={28} color="#3B82F6" label="Click Rate" sublabel="Avg. 3.1% industry" />
              <DonutChart value={35} color="#10B981" label="Cart Recovery" sublabel="Avg. 8% industry" />
              <DonutChart value={92} color="#F59E0B" label="Deliverability" sublabel="Industry avg 85%" />
            </div>
          </motion.div>
        </div>

        {/* Campaign revenue breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ delay: 0.15 }}
          className="mt-6 glass-card p-6 sm:p-8"
        >
          <h3 className="font-heading font-bold text-white text-lg mb-6">Revenue by Campaign Type</h3>
          <div className="space-y-4">
            {campaigns.map((c, i) => (
              <div key={c.id} className="flex items-center gap-4">
                <div className="w-36 sm:w-48 shrink-0">
                  <div className="text-white text-sm font-medium truncate">{c.name.split('—')[0].trim()}</div>
                  <div className="text-muted text-xs">{c.type}</div>
                </div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(c.revenueRaw / 52400) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: c.color }}
                  />
                </div>
                <div className="w-20 text-right shrink-0">
                  <span className="text-green-400 font-bold text-sm">{c.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
