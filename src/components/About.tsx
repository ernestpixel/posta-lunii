import Image from 'next/image'
import type { LandingContent } from '@/lib/content'

type Props = { about: LandingContent['about'] }

export function About({ about }: Props) {
  return (
    <>
      <div aria-hidden="true" style={{ background: 'var(--paper-200)' }}>
        <div className="pl-tear pl-tear--flip" style={{ ['--tear' as string]: 'var(--paper-100)' }} />
      </div>
      <section
        className="pl-section pl-section--warm"
        id="adina"
        aria-labelledby="adina-title"
        style={{ paddingTop: 64 }}
      >
        <div className="pl-wrap pl-adina">
          <figure className="pl-adina__photo pl-reveal" style={{ margin: 0 }}>
            <Image
              className="pl-adina__pages"
              src="/assets/handwritten-pages.webp"
              alt=""
              aria-hidden="true"
              width={700}
              height={999}
              sizes="(max-width: 860px) 180px, 250px"
            />
            <div className="pl-adina__sticker pl-polaroid">
              <Image
                src="/assets/adina-bella-polaroid.webp"
                alt={about.photoAlt}
                width={900}
                height={1013}
                sizes="(max-width: 860px) 300px, 420px"
              />
              <span className="pl-adina__caption">{about.photoCaption}</span>
            </div>
          </figure>

          <div className="pl-letter pl-reveal" style={{ ['--rd' as string]: '.15s' }}>
            <h2 id="adina-title" className="pl-sr">
              Despre Adina
            </h2>
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph.text}</p>
            ))}
            <span className="pl-letter__sign">{about.signature}</span>
          </div>
        </div>
      </section>
    </>
  )
}
