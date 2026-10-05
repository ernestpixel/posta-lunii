/**
 * Generează, o singură dată, imaginile de brand care nu se schimbă la fiecare
 * deploy: imaginea Open Graph și seria de icoane (favicon, PWA, Apple).
 *
 * Rezultatele se comit în repo — nu se regenerează la build, deci nu depind de
 * rețea sau de fonturile instalate pe mașina de build.
 *
 *   node scripts/generate-brand-assets.mjs
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const ASSETS = path.join(ROOT, 'public', 'assets')
const OUT = path.join(ROOT, 'public')
const FONT_DIR = path.join(ROOT, 'scripts', '.fonts')

const PAPER = '#F6F0E4'
const NIGHT_900 = '#1B1836'
const NIGHT_700 = '#2E2450'
const MOON_300 = '#E7C77A'
const ON_NIGHT_MUTED = '#CFC6DC'

const FONTS = {
  fraunces: {
    file: 'Fraunces.ttf',
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf',
  },
  instrument: {
    file: 'InstrumentSans.ttf',
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/InstrumentSans%5Bwdth%2Cwght%5D.ttf',
  },
}

async function ensureFont(key) {
  const { file, url } = FONTS[key]
  const target = path.join(FONT_DIR, file)
  if (existsSync(target)) return target
  await mkdir(FONT_DIR, { recursive: true })
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    await writeFile(target, Buffer.from(await response.arrayBuffer()))
    console.log(`  · font descărcat: ${file}`)
    return target
  } catch (error) {
    console.warn(`  ! nu am putut descărca ${file} (${error.message}) — folosesc un font de sistem`)
    return null
  }
}

/** Text randat cu Pango, cu fontul de brand când e disponibil. */
async function renderText({ text, fontfile, font, size, color, width, align = 'left' }) {
  return sharp({
    text: {
      text: `<span foreground="${color}">${text}</span>`,
      rgba: true,
      font: `${font} ${size}px`,
      ...(fontfile ? { fontfile } : {}),
      width,
      wrap: 'word',
      align,
      dpi: 72 * 4,
      spacing: Math.round(size * 0.18),
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true })
}

/** Recolorează o imagine transparentă păstrându-i silueta (canalul alfa). */
async function tint(file, width, color) {
  const resized = await sharp(file).resize({ width }).ensureAlpha().png().toBuffer()
  const { width: w, height: h } = await sharp(resized).metadata()
  const alpha = await sharp(resized).extractChannel(3).raw().toBuffer()

  return sharp({ create: { width: w, height: h, channels: 3, background: color } })
    .joinChannel(alpha, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer({ resolveWithObject: true })
}

/** Stele deterministe, același algoritm ca în pagină. */
function starsSvg(count, width, height) {
  let seed = 7
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const parts = []
  for (let i = 0; i < count; i++) {
    const x = (rnd() * width).toFixed(1)
    const y = (rnd() * height).toFixed(1)
    const r = (0.8 + rnd() * 2.2).toFixed(2)
    const o = (0.25 + rnd() * 0.6).toFixed(2)
    parts.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${MOON_300}" opacity="${o}"/>`)
  }
  return parts.join('')
}

async function buildOgImage() {
  const W = 1200
  const H = 630

  const fraunces = await ensureFont('fraunces')
  const instrument = await ensureFont('instrument')

  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="night" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stop-color="${NIGHT_900}"/>
          <stop offset="1" stop-color="${NIGHT_700}"/>
        </linearGradient>
        <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="${MOON_300}" stop-opacity="0.55"/>
          <stop offset="0.35" stop-color="${MOON_300}" stop-opacity="0.2"/>
          <stop offset="1" stop-color="${MOON_300}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#night)"/>
      <circle cx="905" cy="176" r="230" fill="url(#halo)"/>
      ${starsSvg(70, W, H)}
      <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${MOON_300}" opacity="0.85"/>
    </svg>`,
  )

  // Logo-ul este cerneală închisă, desenat pentru hârtie. Pe cerul de noapte îl
  // recolorăm în crem, exact cum face secțiunea de noapte a paginii
  // (--on-night: --paper-100): păstrăm forma literelor, schimbăm doar culoarea.
  const logo = await tint(path.join(ASSETS, 'posta-lunii-logo-fara-luna.webp'), 620, PAPER)

  const moon = await sharp(path.join(ASSETS, 'moon-crescent.webp'))
    .resize({ width: 126 })
    .png()
    .toBuffer({ resolveWithObject: true })

  const envelope = await sharp(path.join(ASSETS, 'hero-envelope.webp'))
    .resize({ width: 400 })
    .png()
    .toBuffer({ resolveWithObject: true })

  const tagline = await renderText({
    text: 'Un plic pentru tine.\nUn mic ajutor pentru un animal din adăpost.',
    fontfile: fraunces,
    font: fraunces ? 'Fraunces' : 'Georgia',
    size: 38,
    color: PAPER,
    width: 640,
  })

  const donation = await renderText({
    text: '15 lei din fiecare plic → Adăpostul Speranța',
    fontfile: instrument,
    font: instrument ? 'Instrument Sans' : 'Arial',
    size: 24,
    color: ON_NIGHT_MUTED,
    width: 640,
  })

  const composite = [
    { input: envelope.data, left: W - 360, top: H - envelope.info.height + 80 },
    { input: logo.data, left: 72, top: 84 },
    { input: moon.data, left: 72 + 562, top: 50 },
    { input: tagline.data, left: 76, top: 84 + logo.info.height + 34 },
    {
      input: donation.data,
      left: 76,
      top: 84 + logo.info.height + 34 + tagline.info.height + 30,
    },
  ]

  await sharp(background)
    .composite(composite)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'og-image.png'))

  console.log('  ✓ public/og-image.png (1200×630)')
}

async function buildIcons() {
  const moon = await readFile(path.join(ASSETS, 'moon-crescent.webp'))

  // Favicon vectorial — luna pe hârtie, la fel ca identitatea paginii.
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${PAPER}"/>
  <path d="M40.5 14.2a19 19 0 1 0 8.9 24.6 15.2 15.2 0 1 1-8.9-24.6Z" fill="${NIGHT_700}"/>
  <circle cx="45" cy="17" r="2" fill="${MOON_300}"/>
  <circle cx="52" cy="26" r="1.4" fill="${MOON_300}"/>
</svg>`
  await writeFile(path.join(OUT, 'icon.svg'), iconSvg, 'utf8')
  console.log('  ✓ public/icon.svg')

  const variants = [
    { name: 'icon-192.png', size: 192, inset: 0.66, bg: PAPER, radius: 42 },
    { name: 'icon-512.png', size: 512, inset: 0.66, bg: PAPER, radius: 112 },
    { name: 'icon-maskable-512.png', size: 512, inset: 0.5, bg: PAPER, radius: 0 },
    { name: 'apple-icon.png', size: 180, inset: 0.62, bg: PAPER, radius: 0 },
  ]

  for (const variant of variants) {
    const inner = await sharp(moon)
      .resize({ width: Math.round(variant.size * variant.inset) })
      .png()
      .toBuffer({ resolveWithObject: true })

    const base = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${variant.size}" height="${variant.size}">
        <rect width="${variant.size}" height="${variant.size}" rx="${variant.radius}" fill="${variant.bg}"/>
      </svg>`,
    )

    await sharp(base)
      .composite([
        {
          input: inner.data,
          left: Math.round((variant.size - inner.info.width) / 2),
          top: Math.round((variant.size - inner.info.height) / 2),
        },
      ])
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, variant.name))

    console.log(`  ✓ public/${variant.name}`)
  }
}

console.log('Poșta Lunii — generez imaginile de brand:')
await buildOgImage()
await buildIcons()
console.log('Gata.')
