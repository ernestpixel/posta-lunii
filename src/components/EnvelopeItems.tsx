import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { EnvelopeItem, ItemVariant, LandingContent } from '@/lib/content'

type Props = { envelope: LandingContent['envelope'] }

/** Designul fiecărui cartonaș — rotația, întârzierea la apariție și ilustrația
 *  aparțin variantei, nu textului editat din Payload. */
const VARIANTS: Record<ItemVariant, { rotate: string; art: 'rules' | 'squiggle' | 'notebook' | 'bookmark' }> = {
  letter: { rotate: '-2.2deg', art: 'rules' },
  journal: { rotate: '1.6deg', art: 'squiggle' },
  book: { rotate: '-1.2deg', art: 'notebook' },
  gift: { rotate: '2.4deg', art: 'bookmark' },
}

const DELAYS = ['0s', '.12s', '.24s', '.36s']

function Art({ variant }: { variant: ItemVariant }) {
  const art = VARIANTS[variant].art

  if (art === 'squiggle') {
    return (
      <div className="pl-item__art" aria-hidden="true">
        <svg viewBox="0 0 200 92" fill="none" stroke="#2E2450" strokeWidth="1.6" strokeLinecap="round">
          <path d="M18 70c20-26 36-8 52-20s18-30 40-24 22 30 46 20 24-22 30-18" />
          <path d="M160 24l14-14 6 6-14 14-8 2z" stroke="#A5432F" />
        </svg>
      </div>
    )
  }

  if (art === 'notebook') {
    return (
      <div className="pl-item__art pl-item__art--img" aria-hidden="true">
        <Image
          src="/assets/notebook.webp"
          alt=""
          width={520}
          height={640}
          sizes="120px"
          style={{ transform: 'rotate(-4deg)' }}
        />
      </div>
    )
  }

  if (art === 'bookmark') {
    return (
      <div className="pl-item__art pl-item__art--img" aria-hidden="true">
        <Image src="/assets/bookmark.webp" alt="" width={480} height={674} sizes="120px" />
      </div>
    )
  }

  return <div className="pl-item__art" aria-hidden="true" />
}

function Note({ item }: { item: EnvelopeItem }) {
  if (!item.note) return null

  if (item.variant === 'book') {
    return <p className="pl-item__note pl-item__note--brick">{item.note}</p>
  }

  if (item.variant === 'gift') {
    return (
      <p className="pl-item__note">
        {item.note}{' '}
        <Image
          className="pl-inline-moon"
          src="/assets/moon-crescent.webp"
          alt=""
          aria-hidden="true"
          width={541}
          height={549}
          sizes="24px"
        />
      </p>
    )
  }

  return <p className="pl-item__note">{item.note}</p>
}

export function EnvelopeItems({ envelope }: Props) {
  return (
    <section className="pl-section" id="plic" aria-labelledby="plic-title">
      <div className="pl-wrap">
        <div className="pl-section__head pl-reveal">
          <p className="pl-eyebrow">{envelope.eyebrow}</p>
          <h2 id="plic-title" className="pl-h2">
            {envelope.title}
          </h2>
        </div>

        <div className="pl-items" data-reveal-group>
          {envelope.items.map((item, index) => {
            const variant = VARIANTS[item.variant] ?? VARIANTS.letter
            const style: CSSProperties = {
              ['--r' as string]: variant.rotate,
              ['--rd' as string]: DELAYS[index] ?? '0s',
            }
            return (
              <article key={`${item.variant}-${index}`} className={`pl-item pl-item--${item.variant}`} style={style}>
                <Art variant={item.variant} />
                <h3 className="pl-item__title">{item.title}</h3>
                <Note item={item} />
              </article>
            )
          })}
        </div>

        <p className="pl-items__outro pl-lead-serif pl-reveal">{envelope.outro}</p>
      </div>
    </section>
  )
}
