import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pagina nu există',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="pl pl-grain" id="top">
      <section className="pl-closing" style={{ paddingBottom: 110, minHeight: '70vh' }}>
        <div className="pl-wrap" style={{ position: 'relative' }}>
          <div className="pl-closing__moon">
            <span className="pl-moon__halo" aria-hidden="true" />
            <Image
              src="/assets/moon-crescent.webp"
              alt=""
              aria-hidden="true"
              width={541}
              height={549}
              sizes="84px"
            />
          </div>
          <h1 className="pl-h2" style={{ marginBottom: 18 }}>
            Plicul acesta s-a rătăcit
          </h1>
          <p className="pl-closing__for">
            Pagina pe care o cauți nu există (sau nu mai există). Hai înapoi la început.
          </p>
          <Link className="pl-btn pl-btn--gold" href="/">
            Înapoi la Poșta Lunii{' '}
            <span className="pl-btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
