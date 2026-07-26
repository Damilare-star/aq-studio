import { useRef } from 'react'
import { useInView } from 'framer-motion'
import CountUp from 'react-countup'

/**
 * AnimatedCounter — triggers CountUp when element enters viewport
 */
export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2.5,
  decimals = 0,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
          separator=","
          useEasing
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}
