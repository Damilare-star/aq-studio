import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Layout from '@components/layout/Layout'
import CustomCursor from '@components/ui/CustomCursor'
import ScrollProgress from '@components/ui/ScrollProgress'
import LoadingScreen from '@components/ui/LoadingScreen'
import SmoothScroll from '@components/utils/SmoothScroll'

// ── Lazy-loaded pages (code splitting) ──────────────────────
const Home             = lazy(() => import('@pages/Home'))
const AIVideoAds       = lazy(() => import('@pages/AIVideoAds'))
const ProjectDetail    = lazy(() => import('@pages/ProjectDetail'))
const ShopifyPortfolio = lazy(() => import('@pages/ShopifyPortfolio'))
const ShopifyTemplates = lazy(() => import('@pages/ShopifyTemplates'))
const EmailMarketing   = lazy(() => import('@pages/EmailMarketing'))
const About            = lazy(() => import('@pages/About'))
const Testimonials     = lazy(() => import('@pages/Testimonials'))
const FAQ              = lazy(() => import('@pages/FAQ'))
const Contact          = lazy(() => import('@pages/Contact'))
const NotFound         = lazy(() => import('@pages/NotFound'))
const PrivacyPolicy    = lazy(() => import('@pages/PrivacyPolicy'))
const TermsOfService   = lazy(() => import('@pages/TermsOfService'))

// ── Page fallback ────────────────────────────────────────────
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary animate-pulse" />
        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-primary animate-[shimmer_1.5s_infinite]" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  )
}

// ── Scroll to top on route change ───────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ai-video-ads" element={<AIVideoAds />} />
          <Route path="ai-video-ads/:slug" element={<ProjectDetail />} />
          <Route path="shopify-portfolio" element={<ShopifyPortfolio />} />
          <Route path="shopify-templates" element={<ShopifyTemplates />} />
          <Route path="email-marketing" element={<EmailMarketing />} />
          <Route path="about" element={<About />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  return (
    <Router>
      <SmoothScroll>
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </SmoothScroll>
    </Router>
  )
}
