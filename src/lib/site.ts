/** Utilitare comune: URL-ul canonic al site-ului și construirea de linkuri absolute. */

const FALLBACK = 'http://localhost:3000'

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '') ||
  FALLBACK
).replace(/\/+$/, '')

export const absoluteUrl = (path = '/') => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

export const LOCALE = 'ro_RO'
export const LANG = 'ro'
