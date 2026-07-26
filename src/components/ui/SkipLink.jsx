/**
 * SkipLink — accessibility skip-to-main-content for keyboard users
 * Visually hidden until focused
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm focus:outline-none"
    >
      Skip to main content
    </a>
  )
}
