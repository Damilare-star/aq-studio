import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const [cursorType, setCursorType] = useState('default') // default | hover | click | text

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const onMouseDown = () => { dot.style.transform += ' scale(0.7)' }
    const onMouseUp   = () => { dot.style.transform = dot.style.transform.replace(' scale(0.7)', '') }

    const onEnter = (e) => {
      const el = e.currentTarget
      const type = el.tagName === 'A' || el.tagName === 'BUTTON' || el.dataset.cursor === 'hover'
        ? 'hover'
        : el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
        ? 'text'
        : 'hover'
      ringEl.setAttribute('data-type', type)
    }
    const onLeave = () => ringEl.setAttribute('data-type', 'default')

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1)
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Attach to interactive elements
    const attachToElements = () => {
      document.querySelectorAll('a, button, input, textarea, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attachToElements()
    // Re-attach after any DOM mutations (route changes)
    const observer = new MutationObserver(attachToElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Dot — instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] w-2 h-2 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ transition: 'transform 0.05s linear' }}
      />
      {/* Ring — lagged */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease' }}
        data-type="default"
      >
        <style>{`
          [data-type="default"] {
            width: 36px; height: 36px;
            border: 1.5px solid rgba(139,92,246,0.5);
            border-radius: 50%;
            background: transparent;
          }
          [data-type="hover"] {
            width: 56px; height: 56px;
            border: 1.5px solid rgba(139,92,246,0.9);
            border-radius: 50%;
            background: rgba(139,92,246,0.08);
            backdrop-filter: blur(2px);
          }
          [data-type="text"] {
            width: 3px; height: 28px;
            border: none;
            border-radius: 2px;
            background: rgba(139,92,246,0.8);
          }
        `}</style>
      </div>
    </div>
  )
}
