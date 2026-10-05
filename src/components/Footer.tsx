import Image from 'next/image'
import type { LandingContent } from '@/lib/content'

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
