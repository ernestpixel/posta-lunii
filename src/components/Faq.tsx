import type { LandingContent } from '@/lib/content'

type Props = { faq: LandingContent['faq'] }

/**
 * Secțiune opțională (se activează din Payload). Când e vizibilă, aduce cu ea și
 * datele structurate FAQPage — de aici își iau răspunsurile Google și asistenții
 * AI. Cât e dezactivată, designul paginii rămâne exact cel din machetă.
 */
export function Faq({ faq }: Props) {
  if (!faq.enabled || faq.items.length === 0) return null

  return (
    <section className="pl-section pl-section--warm" id="intrebari" aria-labelledby="faq-title">
      <div className="pl-wrap">
        <div className="pl-section__head pl-reveal">
          <p className="pl-eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title" className="pl-h2">
            {faq.title}
          </h2>
        </div>

        <div className="pl-faq pl-reveal">
          {faq.items.map((item, index) => (
            <details className="pl-faq__item" key={index} name="pl-faq">
              <summary className="pl-faq__q">
                <h3
                  style={{
                    font: 'inherit',
                    margin: 0,
                    fontVariationSettings: 'inherit',
                  }}
                >
                  {item.question}
                </h3>
                <span className="pl-faq__sign" aria-hidden="true" />
              </summary>
              <p className="pl-faq__a">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
