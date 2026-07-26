import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '@components/ui/Button'
import SEO from '@components/utils/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="404 | Page Not Found" />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl font-heading font-bold gradient-text mb-4">404</div>
          <h1 className="text-3xl font-heading font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-muted text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="primary" href="/" arrow>
            Back to Home
          </Button>
        </motion.div>

        {/* Blobs */}
        <div className="blob w-96 h-96 bg-primary top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" />
      </div>
    </>
  )
}
