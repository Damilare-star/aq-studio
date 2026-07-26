import SEO from '@components/utils/SEO'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy | AQ Studio" />
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-heading font-bold text-4xl text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert text-muted space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>This Privacy Policy describes how AQ Studio collects, uses, and shares information about you when you use our services.</p>
            <h2 className="text-white font-heading text-2xl">Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out a contact form or subscribe to our newsletter.</p>
            <h2 className="text-white font-heading text-2xl">How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>
            <h2 className="text-white font-heading text-2xl">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at hello@aqstudio.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
