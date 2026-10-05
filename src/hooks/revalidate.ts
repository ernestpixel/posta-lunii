import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * După fiecare salvare din admin, pagina publică se reconstruiește imediat.
 * Fără asta, modificările ar apărea abia după expirarea cache-ului (5 minute).
 *
 * Aceleași texte alimentează și /llms.txt, /llms.xml și /sitemap.xml, deci le
 * reîmprospătăm pe toate odată.
 */
export const revalidateSite: GlobalAfterChangeHook = ({ doc, global, req }) => {
  try {
    revalidatePath('/')
    revalidatePath('/llms.txt')
    revalidatePath('/llms.xml')
    revalidatePath('/sitemap.xml')
    revalidatePath('/robots.txt')
    req.payload.logger.info(`[posta-lunii] „${global.slug}” salvat — pagina publică a fost reîmprospătată.`)
  } catch (error) {
    // `revalidatePath` există doar în contextul serverului Next. Rularea din CLI
    // (seed, migrări) nu are ce reîmprospăta — nu e o eroare.
    req.payload.logger.debug({ err: error }, '[posta-lunii] revalidare sărită (în afara contextului Next)')
  }

  return doc
}
