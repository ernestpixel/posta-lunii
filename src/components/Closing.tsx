import Image from 'next/image'
import { Stars } from './Stars'
import type { LandingContent } from '@/lib/content'

type Props = {
  closing: LandingContent['closing']
  ctaHref: string
}

export function Closing({ closing, ctaHref }: Props) {
  return (
    <section className="pl-closing" aria-labelledby="close-title">
      <Stars field="closing" />
      <div className="pl-wrap" style={{ position: 'relative' }}>
        <h2 id="close-title" className="pl-sr">
          Pentru cine este Poșta Lunii
        </h2>
        <p className="pl-closing__text pl-reveal">{closing.text}</p>
        <div className="pl-reveal">
          <a className="pl-btn pl-btn--gold" href={ctaHref}>
            {closing.ctaLabel}{' '}
            <span className="pl-btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <Image
          className="pl-closing__letters pl-reveal"
          src="/assets/letters-stack.webp"
          alt=""
          aria-hidden="true"
          width={1200}
          height={885}
          sizes="(max-width: 860px) 80vw, 440px"
        />
      </div>
    </section>
  )
}
