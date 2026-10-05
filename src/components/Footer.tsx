import Image from 'next/image'
import Link from 'next/link'
import type { LandingContent } from '@/lib/content'
import { ANPC, COMPANY, LEGAL_LINKS, WITHDRAWAL_HREF } from '@/lib/legal'
import { CookieSettingsButton } from './CookieConsent'

type Props = {
  footer: LandingContent['footer']
  instagramUrl: string
}

export function Footer({ footer, instagramUrl }: Props) {
  const handle = footer.instagramLabel.replace(/^@/, '')

  return (
    <footer className="pl-footer">
      <div className="pl-wrap">
        <div className="pl-footer__grid">
          <a
            className="pl-footer__ig"
            href={instagramUrl}
            target="_blank"
            rel="me noopener"
            aria-label={`${handle} pe Instagram`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
            </svg>
            {footer.instagramLabel}
          </a>
        </div>
        <nav className="pl-footer__legal" aria-label="Informații legale">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <CookieSettingsButton />
          <Link href={WITHDRAWAL_HREF}>Retrage-te din contract aici</Link>
        </nav>
        <div className="pl-footer__anpc">
          <a href={ANPC.sal} target="_blank" rel="noopener" aria-label="ANPC – Soluționarea alternativă a litigiilor">
            <Image src="/assets/anpc-sal.png" alt="ANPC – Soluționarea alternativă a litigiilor" width={204} height={52} sizes="204px" />
          </a>
          <a href={ANPC.sol} target="_blank" rel="noopener" aria-label="Soluționarea online a litigiilor">
            <Image src="/assets/anpc-sol.png" alt="Soluționarea online a litigiilor" width={200} height={55} sizes="200px" />
          </a>
        </div>
        <p className="pl-footer__company">
          {COMPANY.name} · CUI {COMPANY.cui} · {COMPANY.regCom} · EUID {COMPANY.euid} · {COMPANY.address} ·{' '}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </p>
        <div className="pl-footer__base">
          <span>
            <Image src="/assets/paw.webp" alt="" width={400} height={395} sizes="20px" />
            {footer.baseNote}
          </span>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
