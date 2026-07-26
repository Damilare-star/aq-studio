import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * TextReveal — animates words sliding up from a clip mask
 * Usage: <TextReveal text="Your headline here" as="h1" className="..." />
 */
export default function TextReveal({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.07,
  duration = 0.7,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}

/**
 * TextRevealChar — character-by-character variant
 */
export function TextRevealChar({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.03,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
