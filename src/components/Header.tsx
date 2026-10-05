import Image from 'next/image'
import type { NavigationContent } from '@/lib/content'

type Props = {
  navigation: NavigationContent
  siteName: string
}

export function Header({ navigation, siteName }: Props) {
  return (
    <header className="pl-header" data-header>
      <div className="pl-wrap pl-header__bar">
        <a href="#top" aria-label={`${siteName} — început`}>
          <Image
            className="pl-header__logo"
            src="/assets/posta-lunii-logo.webp"
            alt={siteName}
            width={1200}
            height={291}
            sizes="150px"
            priority
          />
        </a>
        <nav className="pl-header__nav" aria-label="Navigare">
          {navigation.items.map((item) => (
            <a key={`${item.href}-${item.label}`} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="pl-btn pl-btn--gold pl-btn--sm" href={navigation.ctaHref}>
            {navigation.ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  )
}
