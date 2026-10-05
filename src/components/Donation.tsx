import Image from 'next/image'
import { Stars } from './Stars'
import type { LandingContent } from '@/lib/content'

type Props = { donation: LandingContent['donation'] }

export function Donation({ donation }: Props) {
  return (
    <section className="pl-night" aria-labelledby="night-title">
      <div className="pl-tear" aria-hidden="true" style={{ ['--tear' as string]: 'var(--paper-200)' }} />
      <Stars field="night" />
      <div className="pl-wrap pl-night__inner">
        <Image
          className="pl-phases pl-phases--gold pl-reveal"
          src="/assets/moon-phases-gold.webp"
          alt=""
          aria-hidden="true"
          width={1200}
          height={406}
          sizes="300px"
        />
        <p className="pl-eyebrow pl-reveal">{donation.eyebrow}</p>
        <h2 id="night-title" className="pl-night__title pl-reveal">
          <span className="pl-hand">{donation.titleAmount}</span> {donation.titleMiddle}{' '}
          <span className="pl-arrow">→</span> {donation.titleTarget}{' '}
          <span className="pl-shelter">
            <span className="pl-shelter__badge">
              <Image
                src="/assets/adapostul-speranta-logo.webp"
                alt={`Logo ${donation.titleTarget}`}
                width={600}
                height={711}
                sizes="60px"
              />
            </span>
            <Image
              className="pl-night__paw"
              src="/assets/paw.webp"
              alt=""
              width={400}
              height={395}
              sizes="30px"
            />
          </span>
        </h2>
        <p className="pl-night__text pl-reveal">{donation.text}</p>
        <div className="pl-refrain pl-reveal">
          <p className="pl-refrain__line" style={{ margin: 0 }}>
            {donation.refrainLeft}
          </p>
          <Image
            className="pl-refrain__moon"
            src="/assets/moon-crescent.webp"
            alt=""
            aria-hidden="true"
            width={541}
            height={549}
            sizes="54px"
          />
          <p className="pl-refrain__line" style={{ margin: 0 }}>
            {donation.refrainRight}
          </p>
        </div>
      </div>
    </section>
  )
}
