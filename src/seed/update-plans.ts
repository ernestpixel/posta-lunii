/**
 * Rescrie doar planurile de preț (secțiunea „Prețuri”) cu valorile din
 * `src/lib/content.ts`, fără să atingă restul conținutului editat în admin.
 *
 *   pnpm seed:plans
 */

import { getPayload } from 'payload'
import config from '@payload-config'

import { defaultLanding } from '../lib/content.js'

const payload = await getPayload({ config })

const landing = await payload.findGlobal({ slug: 'landing', depth: 0 })

await payload.updateGlobal({
  slug: 'landing',
  depth: 0,
  data: { pricing: { ...landing.pricing, plans: defaultLanding.pricing.plans } },
})

payload.logger.info('Planurile de preț au fost actualizate.')
process.exit(0)
