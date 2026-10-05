/**
 * Stelele care clipesc, generate pe server.
 *
 * Macheta le construia din JavaScript, cu un generator pseudo-aleator cu sămânță
 * fixă (seed = 7) și un singur flux împărțit între cele trei secțiuni, în ordinea
 * din pagină: hero (22), noapte (46), închidere (14). Portul de aici păstrează
 * exact același algoritm și aceeași ordine, deci stelele cad în aceleași poziții —
 * doar că acum ajung în HTML-ul livrat, fără JavaScript și fără salt la hidratare.
 */

export type StarPalette = 'hero' | 'night'

export type Star = {
  kind: 'star' | 'dot'
  left: string
  top: string
  duration: string
  delay: string
  size?: string
  opacity?: string
  color?: string
}

type Box = { key: string; count: number; palette: StarPalette }

// Ordinea contează: fluxul pseudo-aleator este comun, ca în macheta originală.
const BOXES: Box[] = [
  { key: 'hero', count: 22, palette: 'hero' },
  { key: 'night', count: 46, palette: 'night' },
  { key: 'closing', count: 14, palette: 'hero' },
]

function generate(): Record<string, Star[]> {
  let seed = 7
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  const out: Record<string, Star[]> = {}

  for (const box of BOXES) {
    const night = box.palette === 'night'
    const stars: Star[] = []

    for (let i = 0; i < box.count; i++) {
      // Atenție: pentru paleta „hero” `rnd()` nu se apelează aici (scurtcircuit),
      // exact ca în original — altfel tot fluxul s-ar decala.
      const dot = night && rnd() < 0.55

      const star: Star = {
        kind: dot ? 'dot' : 'star',
        left: `${(rnd() * 100).toFixed(2)}%`,
        top: `${(rnd() * (night ? 100 : 70)).toFixed(2)}%`,
        duration: `${(3 + rnd() * 4).toFixed(2)}s`,
        delay: `${(-rnd() * 6).toFixed(2)}s`,
      }

      if (!dot) {
        star.size = `${(5 + rnd() * (night ? 9 : 7)).toFixed(1)}px`
        star.opacity = night ? (0.5 + rnd() * 0.5).toFixed(2) : (0.35 + rnd() * 0.35).toFixed(2)
        star.color = night ? 'var(--moon-300)' : rnd() < 0.7 ? 'var(--moon-500)' : 'var(--night-700)'
      }

      stars.push(star)
    }

    out[box.key] = stars
  }

  return out
}

export const STARS = generate()
