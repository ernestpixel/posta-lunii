import Image from 'next/image'
import Link from 'next/link'

import { Footer } from '@/components/Footer'
import { LEGAL_UPDATED } from '@/lib/legal'
import { getLanding, getSettings } from '@/lib/payload-content'

type Props = {
  title: string
  intro?: React.ReactNode
  /** Fără data actualizării (ex. formularul de retragere). */
  hideUpdated?: boolean
  children: React.ReactNode
}

/** Cadrul comun al paginilor legale: antet simplu, text lizibil, footer-ul site-ului. */
export async function LegalPage({ title, intro, hideUpdated, children }: Props) {
  const [landing, settings] = await Promise.all([getLanding(), getSettings()])

  return (
    <div className="pl" id="top">
      <header className="pl-legal__header">
        <div className="pl-wrap pl-legal__bar">
          <Link href="/" aria-label={`${settings.siteName} — pagina principală`}>
            <Image
              className="pl-legal__logo"
              src="/assets/posta-lunii-logo.webp"
              alt={settings.siteName}
              width={1200}
              height={291}
              sizes="150px"
              priority
            />
          </Link>
          <Link className="pl-legal__back" href="/">
            <span aria-hidden="true">←</span> Înapoi la {settings.siteName}
          </Link>
        </div>
      </header>

      <main className="pl-legal pl-grain">
        <article className="pl-wrap pl-legal__doc">
          <h1 className="pl-h2">{title}</h1>
          {hideUpdated ? null : <p className="pl-legal__updated">Ultima actualizare: {LEGAL_UPDATED}</p>}
          {intro ? <div className="pl-legal__intro">{intro}</div> : null}
          {children}
        </article>
      </main>

      <Footer footer={landing.footer} instagramUrl={settings.instagramUrl} />
    </div>
  )
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="pl-legal__section" id={id} aria-labelledby={`${id}-title`}>
      <h2 className="pl-legal__h2" id={`${id}-title`}>
        {title}
      </h2>
      {children}
    </section>
  )
}

/** Cuprins cu ancore către secțiuni. */
export function LegalToc({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav className="pl-legal__toc" aria-label="Cuprins">
      <p className="pl-eyebrow">Cuprins</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
