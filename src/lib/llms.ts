import type { LandingContent } from './content'
import type { ResolvedSettings } from './payload-content'
import { absoluteUrl, siteUrl } from './site'

/**
 * Rezumatul paginii pentru asistenții AI.
 *
 * Se generează din același conținut ca pagina, deci nu poate rămâne în urmă:
 * când Adina schimbă un preț în Payload, se schimbă și aici.
 */

const strip = (value: string) => value.replace(/\s+/g, ' ').trim()

export function buildLlmsTxt(landing: LandingContent, settings: ResolvedSettings): string {
  const plans = landing.pricing.plans
    .map((plan) => {
      const parts = [
        `- **${strip(plan.name)}** — ${strip(plan.price)}${plan.priceSuffix ? ` ${strip(plan.priceSuffix)}` : ''}`,
        `  ${strip(plan.description)}`,
      ]
      if (plan.savings) parts.push(`  ${strip(plan.savings)}${plan.descriptionAfter ? ` ${strip(plan.descriptionAfter)}` : ''}`)
      if (plan.fine) parts.push(`  ${strip(plan.fine)}`)
      for (const option of plan.paymentOptions ?? []) {
        parts.push(`  - ${strip(option.label)}${option.detail ? `: ${strip(option.detail)}` : ''}`)
      }
      return parts.join('\n')
    })
    .join('\n')

  const items = landing.envelope.items
    .map((item) => `- ${strip(item.title)}${item.note ? ` — ${strip(item.note)}` : ''}`)
    .join('\n')

  const faq = landing.faq.items
    .map((item) => `### ${strip(item.question)}\n${strip(item.answer)}`)
    .join('\n\n')

  return `# ${settings.siteName}

> ${strip(settings.metaDescription)}

${settings.siteName} este un abonament lunar prin poștă, din România, creat de Adina.
Fiecare plic ajunge fizic la abonat și conține lucruri gândite în jurul temei lunii.
Din fiecare plic cumpărat, ${settings.donationAmount} merg către ${settings.shelterName}.

Site: ${siteUrl}
Limbă: română
Instagram: ${settings.instagramUrl}

## Ce conține fiecare plic

${items}

${strip(landing.envelope.outro)}

## Prețuri

${plans}

Livrare: prin poștă, lunar, în România.
Monedă: ${settings.currency} (lei).
Donație: ${settings.donationAmount} din fiecare plic → ${settings.shelterName}.

## Despre autoare

${landing.about.paragraphs.map((paragraph) => strip(paragraph.text)).join('\n\n')}

## Pentru cine este

${strip(landing.closing.text)}

## Întrebări frecvente

${faq}

## Linkuri

- [Pagina principală](${siteUrl})
- [Ce găsești în plic](${absoluteUrl('/#plic')})
- [Despre Adina](${absoluteUrl('/#adina')})
- [Prețuri și abonare](${absoluteUrl('/#preturi')})
- [Date structurate (JSON-LD)](${siteUrl}) — în pagina principală
- [llms.xml](${absoluteUrl('/llms.xml')})
`
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export function buildLlmsXml(landing: LandingContent, settings: ResolvedSettings): string {
  const e = (value: string) => escapeXml(strip(value))

  const sections = [
    { id: 'plic', title: landing.envelope.title, url: absoluteUrl('/#plic'), summary: landing.envelope.outro },
    {
      id: 'adina',
      title: 'Despre Adina',
      url: absoluteUrl('/#adina'),
      summary: landing.about.paragraphs[0]?.text ?? '',
    },
    {
      id: 'donatie',
      title: `${landing.donation.titleAmount} ${landing.donation.titleMiddle} → ${landing.donation.titleTarget}`,
      url: absoluteUrl('/'),
      summary: landing.donation.text,
    },
    { id: 'preturi', title: landing.pricing.title, url: absoluteUrl('/#preturi'), summary: landing.pricing.note },
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<llms xmlns="https://llmstxt.org/schema" version="1.0">
  <site>
    <name>${e(settings.siteName)}</name>
    <url>${e(siteUrl)}</url>
    <language>ro</language>
    <description>${e(settings.metaDescription)}</description>
    <tagline>${e(settings.tagline)}</tagline>
    <publisher>${e(settings.siteName)}</publisher>
    <contact>${e(settings.instagramUrl)}</contact>
  </site>
  <offering type="subscription">
    <name>${e(settings.siteName)}</name>
    <delivery>Prin poștă, lunar, în România</delivery>
    <currency>${e(settings.currency)}</currency>
${landing.pricing.plans
  .map(
    (plan) => `    <plan featured="${plan.featured ? 'true' : 'false'}">
      <name>${e(plan.name)}</name>
      <price>${e(plan.price)}${plan.priceSuffix ? ` ${e(plan.priceSuffix)}` : ''}</price>
      <description>${e(plan.description)}</description>
      <url>${e(plan.checkoutUrl && plan.checkoutUrl !== '#' ? plan.checkoutUrl : absoluteUrl('/#preturi'))}</url>
    </plan>`,
  )
  .join('\n')}
    <donation>
      <amountPerBox>${e(settings.donationAmount)}</amountPerBox>
      <beneficiary>${e(settings.shelterName)}</beneficiary>
    </donation>
    <contents>
${landing.envelope.items
  .map((item) => `      <item>${e(item.title)}${item.note ? ` — ${e(item.note)}` : ''}</item>`)
  .join('\n')}
    </contents>
  </offering>
  <sections>
${sections
  .map(
    (section) => `    <section id="${e(section.id)}">
      <title>${e(section.title)}</title>
      <url>${e(section.url)}</url>
      <summary>${e(section.summary)}</summary>
    </section>`,
  )
  .join('\n')}
  </sections>
  <faq>
${landing.faq.items
  .map(
    (item) => `    <entry>
      <question>${e(item.question)}</question>
      <answer>${e(item.answer)}</answer>
    </entry>`,
  )
  .join('\n')}
  </faq>
  <resources>
    <resource type="text/plain" url="${e(absoluteUrl('/llms.txt'))}">Rezumat în text simplu</resource>
    <resource type="application/xml" url="${e(absoluteUrl('/sitemap.xml'))}">Sitemap</resource>
    <resource type="application/ld+json" url="${e(siteUrl)}">Date structurate schema.org, în pagina principală</resource>
  </resources>
</llms>
`
}
