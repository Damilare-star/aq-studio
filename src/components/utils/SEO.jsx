import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'AQ Studio'
const SITE_URL  = 'https://aqstudio.com'
const DEFAULT_IMAGE = '/og-image.jpg'

export default function SEO({
  title,
  description = 'Premium AI Video Ads, Shopify Design, and Email Marketing. Stop the scroll and increase sales.',
  keywords = 'AI Video Ads, AI Advertisements, Shopify Design, Email Marketing',
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noIndex = false,
  structuredData,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — AI Video Ads That Stop the Scroll`
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${SITE_URL}${image}`} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aistudio" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${SITE_URL}${image}`} />

      {/* Structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
