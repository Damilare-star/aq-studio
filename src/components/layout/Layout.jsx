import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import SkipLink from '@components/ui/SkipLink'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Accessibility */}
      <SkipLink />

      <Navbar />

      <motion.main
        id="main-content"
        key={location.pathname}
        role="main"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1"
        tabIndex={-1}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  )
}
