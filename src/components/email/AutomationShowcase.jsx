import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ChevronRight, Check, ArrowRight } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { automationFlows } from '@/data/emailMarketing'
import { staggerContainer, staggerItem, viewport } from '@/utils/animations'

function FlowCard({ flow, isActive, onClick }) {
  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      className={`w-full glass-card p-5 text-left transition-all duration-300 group ${
        isActive
          ? 'border-primary/40 shadow-glow-sm'
          : 'hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{
            background: `${flow.color}20`,
            border: `1px solid ${flow.color}30`,
          }}
        >
          {flow.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-white text-sm leading-tight">{flow.title}</h3>
          <p className="text-muted text-xs mt-0.5">{flow.emails} emails</p>
        </div>
        <ChevronRight
          size={16}
          className={`text-muted transition-all ${isActive ? 'text-primary rotate-90' : 'group-hover:translate-x-1'}`}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">Avg. Revenue</span>
        <span className="font-bold text-green-400">{flow.avgRevenue}</span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-muted">Open Rate</span>
        <span className="font-semibold" style={{ color: flow.color }}>{flow.openRate}</span>
      </div>
    </motion.button>
  )
}

function FlowDetail({ flow }) {
  return (
    <motion.div
      key={flow.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <div className="glass-card p-7 sm:p-9 h-full relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: flow.color }}
        />

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: `${flow.color}20`, border: `1px solid ${flow.color}30` }}
          >
            {flow.icon}
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-2xl">{flow.title}</h3>
            <p className="text-muted text-sm">{flow.emails} emails · {flow.openRate} open rate</p>
          </div>
        </div>

        <p className="text-white/80 leading-relaxed mb-8">{flow.description}</p>

        {/* Email steps */}
        <div className="mb-8">
          <h4 className="text-muted text-xs uppercase tracking-widest font-semibold mb-4">
            Email Sequence
          </h4>
          <div className="space-y-2">
            {flow.steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3"
              >
                {/* Step number */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: flow.color }}
                >
                  {i + 1}
                </div>
                {/* Connector line */}
                <div className="flex-1 flex items-center gap-2 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-white/80 text-sm">{step}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Vertical connector lines between steps */}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {[
            { label: 'Avg Revenue', value: flow.avgRevenue, color: '#10B981' },
            { label: 'Open Rate', value: flow.openRate, color: flow.color },
            { label: 'Emails', value: `${flow.emails}`, color: '#3B82F6' },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-card p-3 text-center rounded-xl">
              <div className="font-heading font-bold text-base mb-0.5" style={{ color }}>{value}</div>
              <div className="text-muted text-xs">{label}</div>
            </div>
          ))}
        </div>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow-sm"
          style={{ background: flow.color }}
        >
          Set Up This Flow <ArrowRight size={15} />
        </a>
      </div>
    </motion.div>
  )
}

export default function AutomationShowcase() {
  const [active, setActive] = useState(automationFlows[0])

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="blob w-96 h-96 bg-accent bottom-0 right-0 opacity-[0.07]" />

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Automation Flows"
          title="Email Automations That"
          highlight="Print Money"
          subtitle="Set up once, earn on autopilot. These proven automation flows run 24/7 generating passive revenue for your store."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Flow selector list */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {automationFlows.map((flow) => (
              <FlowCard
                key={flow.id}
                flow={flow}
                isActive={active.id === flow.id}
                onClick={() => setActive(flow)}
              />
            ))}
          </motion.div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <FlowDetail key={active.id} flow={active} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
