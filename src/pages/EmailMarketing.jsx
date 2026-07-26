import SEO from '@components/utils/SEO'
import EmailHero from '@components/email/EmailHero'
import EmailStats from '@components/email/EmailStats'
import CampaignPortfolio from '@components/email/CampaignPortfolio'
import AutomationShowcase from '@components/email/AutomationShowcase'
import KlaviyoSection from '@components/email/KlaviyoSection'
import ShopifyEmailSection from '@components/email/ShopifyEmailSection'
import RevenueCharts from '@components/email/RevenueCharts'
import EmailCTA from '@components/email/EmailCTA'

export default function EmailMarketing() {
  return (
    <>
      <SEO
        title="Email Marketing | Klaviyo & Shopify Email Expert"
        description="Revenue-driving email marketing campaigns and automation. Welcome flows, abandoned cart, product launches, and more using Klaviyo and Shopify Email."
      />
      <EmailHero />
      <EmailStats />
      <CampaignPortfolio />
      <RevenueCharts />
      <AutomationShowcase />
      <KlaviyoSection />
      <ShopifyEmailSection />
      <EmailCTA />
    </>
  )
}
