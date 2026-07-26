import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const variants = {
  primary: 'bg-gradient-primary text-white shadow-glow-sm hover:shadow-glow-purple border border-transparent',
  secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
  outline: 'bg-transparent text-white border border-primary/50 hover:bg-primary/10 hover:border-primary',
  ghost: 'bg-transparent text-white hover:bg-white/5 border border-transparent',
  accent: 'bg-gradient-accent text-white shadow-glow-blue hover:shadow-glow-cyan border border-transparent',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  onClick,
  icon,
  arrow,
  className = '',
  disabled,
  type = 'button',
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-semibold font-body
    rounded-xl transition-all duration-300 cursor-none select-none
    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
    disabled:opacity-50 disabled:pointer-events-none
    ${variants[variant]} ${sizes[size]} ${className}
  `

  const content = (
    <>
      {icon && <span className="text-current">{icon}</span>}
      {children}
      {arrow && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
    </>
  )

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group ${baseClasses}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to={href} className={`group ${baseClasses}`}>
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${baseClasses}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
