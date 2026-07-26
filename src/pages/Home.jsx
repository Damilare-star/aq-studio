import SEO from '@components/utils/SEO'
import Hero from '@components/sections/Hero'
import TrustedBy from '@components/sections/TrustedBy'
import WhyAIVideoAds from '@components/sections/WhyAIVideoAds'
import ServicesPreview from '@components/sections/ServicesPreview'
import FeaturedVideos from '@components/sections/FeaturedVideos'
import Statistics from '@components/sections/Statistics'
import Process from '@components/sections/Process'
import Testimonials from '@components/sections/Testimonials'
import InstagramFeed from '@components/sections/InstagramFeed'
import FAQPreview from '@components/sections/FAQPreview'
import ContactCTA from '@components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <SEO
        title="AI Video Ads That Stop the Scroll & Increase Sales"
        description="I create high-converting AI video advertisements for brands, eCommerce stores, and businesses that increase engagement, build trust, and drive more sales."
      />
      <Hero />
      <TrustedBy />
      <WhyAIVideoAds />
      <ServicesPreview />
      <FeaturedVideos />
      <Statistics />
      <Process />
      <Testimonials />
      <InstagramFeed />
      <FAQPreview />
      <ContactCTA />
    </>
  )
}
