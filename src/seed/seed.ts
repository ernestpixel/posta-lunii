/**
 * Populează baza de date cu textele din `src/lib/content.ts` și creează primul
 * cont de administrator dacă nu există niciunul.
 *
 *   pnpm seed
 *
 * Este idempotent: poate fi rulat de câte ori e nevoie. Conținutul globalelor se
 * rescrie la valorile din cod, așa că NU rula seed-ul peste modificări făcute în
 * admin dacă vrei să le păstrezi.
 */

import { getPayload } from 'payload'
import config from '@payload-config'

import { defaultLanding, defaultNavigation, defaultSettings } from '../lib/content.js'

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@postalunii.ro'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'PostaLunii2026!'

const payload = await getPayload({ config })

payload.logger.info('Seed — scriu conținutul implicit…')

await payload.updateGlobal({ slug: 'settings', data: defaultSettings, depth: 0 })
payload.logger.info('  · setări site & SEO')

await payload.updateGlobal({ slug: 'navigation', data: defaultNavigation, depth: 0 })
payload.logger.info('  · meniu')

await payload.updateGlobal({ slug: 'landing', data: defaultLanding, depth: 0 })
payload.logger.info('  · pagina principală (7 secțiuni + întrebări)')

const { totalDocs } = await payload.count({ collection: 'users' })

if (totalDocs === 0) {
  await payload.create({
    collection: 'users',
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'Adina' },
  })
  payload.logger.info(`  · cont admin creat: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  payload.logger.warn('    Schimbă parola după prima autentificare.')
} else {
  payload.logger.info(`  · există deja ${totalDocs} utilizator(i) — nu creez altul`)
}

payload.logger.info('Gata. Panoul de administrare: /admin')

process.exit(0)
