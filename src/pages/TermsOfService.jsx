import SEO from '@components/utils/SEO'

export default function TermsOfService() {
  return (
    <>
      <SEO title="Terms of Service | AQ Studio" />
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-heading font-bold text-4xl text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert text-muted space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>By using our services, you agree to these Terms of Service. Please read them carefully.</p>
            <h2 className="text-white font-heading text-2xl">Use of Services</h2>
            <p>You may use our services only as permitted by law and these Terms. You may not misuse our services.</p>
            <h2 className="text-white font-heading text-2xl">Intellectual Property</h2>
            <p>All content created by AQ Studio remains our property until full payment is received and ownership is transferred per the project agreement.</p>
            <h2 className="text-white font-heading text-2xl">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at hello@aqstudio.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
