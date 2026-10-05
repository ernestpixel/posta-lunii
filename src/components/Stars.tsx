import type { CSSProperties } from 'react'
import { STARS } from '@/lib/stars'

type Props = { field: keyof typeof STARS }

export function Stars({ field }: Props) {
  const stars = STARS[field] ?? []

  return (
    <div className="pl-stars" aria-hidden="true">
      {stars.map((star, index) => {
        const style: CSSProperties = {
          left: star.left,
          top: star.top,
          ['--d' as string]: star.duration,
          ['--delay' as string]: star.delay,
          ...(star.size ? { ['--s' as string]: star.size } : {}),
          ...(star.opacity ? { ['--o' as string]: star.opacity } : {}),
          ...(star.color ? { ['--c' as string]: star.color } : {}),
        }
        return <i key={index} className={star.kind === 'dot' ? 'pl-dot' : 'pl-star'} style={style} />
      })}
    </div>
  )
}
