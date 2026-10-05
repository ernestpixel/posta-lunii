import type { LandingContent } from './content'
import type { ResolvedSettings } from './payload-content'
import { absoluteUrl, LANG, siteUrl } from './site'

/**
 * Un singur graf JSON-LD pentru toată pagina. Nodurile sunt legate prin @id, așa
 * cum recomandă Google și cum îl citesc cel mai ușor asistenții AI: Organization
 * → WebSite → WebPage → Product (cu ofertele) → Person → FAQPage.
 */
export function buildJsonLd(landing: LandingContent, settings: ResolvedSettings) {
  const orgId = `${siteUrl}/#organization`
  const siteId = `${siteUrl}/#website`
  const pageId = `${siteUrl}/#webpage`
  const productId = `${siteUrl}/#product`
  const personId = `${siteUrl}/#adina`

  const priceNumber = (value: string) => {
    const match = value.replace(',', '.').match(/[\d.]+/)
    return match ? match[0] : value
  }

  const offers = landing.pricing.plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.name.replace(/^[^\p{L}\d]+/u, '').trim(),
    description: [plan.description, plan.savings, plan.descriptionAfter].filter(Boolean).join(' '),
    price: priceNumber(plan.price),
    priceCurrency: settings.currency,
    availability: 'https://schema.org/InStock',
    url: plan.checkoutUrl && plan.checkoutUrl !== '#' ? plan.checkoutUrl : absoluteUrl('/#preturi'),
    ...(plan.priceSuffix
      ? {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: priceNumber(plan.price),
            priceCurrency: settings.currency,
            billingIncrement: 1,
            unitCode: 'MON',
            billingDuration: 12,
          },
        }
      : {}),
  }))

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: settings.siteName,
      url: siteUrl,
      slogan: settings.tagline,
      description: settings.metaDescription,
      logo: {
        '@type': 'ImageObject',
        '@id': `${siteUrl}/#logo`,
        url: absoluteUrl('/assets/posta-lunii-logo.webp'),
        contentUrl: absoluteUrl('/assets/posta-lunii-logo.webp'),
        width: 1200,
        height: 291,
        caption: settings.siteName,
      },
      image: { '@id': `${siteUrl}/#logo` },
      founder: { '@id': personId },
      sameAs: [settings.instagramUrl].filter(Boolean),
      areaServed: { '@type': 'Country', name: 'România' },
      knowsLanguage: LANG,
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Adina',
      description: landing.about.paragraphs[0]?.text,
      worksFor: { '@id': orgId },
      sameAs: [settings.instagramUrl].filter(Boolean),
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: siteUrl,
      name: settings.siteName,
      description: settings.metaDescription,
      publisher: { '@id': orgId },
      inLanguage: LANG,
    },
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: siteUrl,
      name: settings.metaTitle,
      description: settings.metaDescription,
      isPartOf: { '@id': siteId },
      about: { '@id': productId },
      primaryImageOfPage: { '@id': `${siteUrl}/#logo` },
      inLanguage: LANG,
      breadcrumb: { '@id': `${siteUrl}/#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: siteUrl },
      ],
    },
    {
      '@type': 'Product',
      '@id': productId,
      name: settings.siteName,
      description: `${landing.hero.text} ${landing.hero.donationBefore} ${landing.hero.donationAmount} ${landing.hero.donationAfter}`,
      image: [absoluteUrl('/assets/hero-envelope.webp'), absoluteUrl('/assets/letters-stack.webp')],
      brand: { '@id': orgId },
      category: 'Abonament lunar prin poștă',
      url: absoluteUrl('/#preturi'),
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: settings.currency,
        lowPrice: settings.priceFrom,
        highPrice: settings.priceMonthly,
        offerCount: offers.length,
        offers,
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Donație per plic',
          value: `${settings.donationAmount} → ${settings.shelterName}`,
        },
        { '@type': 'PropertyValue', name: 'Livrare', value: 'Prin poștă, lunar' },
      ],
    },
  ]

  // FAQPage se emite doar când secțiunea chiar apare în pagină — Google cere ca
  // răspunsurile marcate să fie vizibile pentru vizitator.
  if (landing.faq.enabled && landing.faq.items.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      isPartOf: { '@id': siteId },
      inLanguage: LANG,
      mainEntity: landing.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
