import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fade-in-up on scroll via GSAP ScrollTrigger
 * Usage: const ref = useScrollReveal()
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: options.y ?? 50 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.8,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 88%',
          once: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return ref
}

/**
 * Stagger children on scroll
 */
export function useStaggerReveal(selector = '.stagger-item', options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const items = container.querySelectorAll(selector)
    if (!items.length) return

    gsap.set(items, { opacity: 0, y: 40 })

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.7,
      stagger: options.stagger ?? 0.1,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: options.start ?? 'top 85%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [selector])

  return ref
}

/**
 * Horizontal parallax on scroll
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = gsap.to(el, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed])

  return ref
}

/**
 * GSAP text split reveal — animates each word
 */
export function useTextReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.textContent.split(' ')
    el.innerHTML = words
      .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block reveal-word">${w}</span></span>`)
      .join(' ')

    const wordEls = el.querySelectorAll('.reveal-word')
    gsap.set(wordEls, { y: '110%' })

    const tween = gsap.to(wordEls, {
      y: '0%',
      duration: 0.8,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return ref
}
