'use server'

import { randomBytes } from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

import { COMPANY } from '@/lib/legal'

export type WithdrawalState =
  | { status: 'idle' }
  | { status: 'error'; message: string; fields?: Partial<Record<FieldName, string>> }
  | { status: 'done'; reference: string; submittedAt: string; emailSent: boolean; email: string }

type FieldName = 'name' | 'email' | 'product' | 'contract'

const PRODUCTS = {
  single: 'Un plic (o lună)',
  monthly: 'Abonament 12 luni – plată lunară',
  annual: 'Abonament 12 luni – plată integrală',
} as const

type Product = keyof typeof PRODUCTS

const text = (value: FormDataEntryValue | null, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ro-RO', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Bucharest',
  }).format(date)
}

/**
 * Înregistrează declarația de retragere, trimite confirmarea pe email
 * (dacă SMTP e configurat) și întoarce numărul de înregistrare.
 */
export async function submitWithdrawal(_prev: WithdrawalState, formData: FormData): Promise<WithdrawalState> {
  // Câmp-capcană pentru roboți: oamenii nu îl văd și nu îl completează.
  if (text(formData.get('website'), 200)) return { status: 'idle' }

  const name = text(formData.get('name'), 200)
  const email = text(formData.get('email'), 200)
  const product = text(formData.get('product'), 20) as Product
  const contract = text(formData.get('contract'), 2000)
  const address = text(formData.get('address'), 1000)
  const message = text(formData.get('message'), 2000)

  const fields: Partial<Record<FieldName, string>> = {}
  if (!name) fields.name = 'Scrie numele tău.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'Scrie o adresă de email validă.'
  if (!(product in PRODUCTS)) fields.product = 'Alege produsul.'
  if (!contract) fields.contract = 'Spune-ne cum identificăm comanda (ex. data și emailul folosit la plată).'
  if (Object.keys(fields).length) {
    return { status: 'error', message: 'Verifică, te rog, câmpurile marcate.', fields }
  }

  const now = new Date()
  const reference = `RET-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${randomBytes(3).toString('hex').toUpperCase()}`

  try {
    const payload = await getPayload({ config })
    const doc = await payload.create({
      collection: 'withdrawals',
      overrideAccess: true,
      data: { reference, name, email, product, contract, address, message, status: 'new' },
    })

    const when = formatDate(now)
    const rows = [
      ['Număr de înregistrare', reference],
      ['Primită la', when],
      ['Nume', name],
      ['Email', email],
      ['Produs', PRODUCTS[product]],
      ['Identificarea comenzii', contract],
      ...(address ? [['Adresa de livrare', address]] : []),
      ...(message ? [['Mențiuni', message]] : []),
    ]
    const table = rows
      .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#5b5561">${label}</td><td style="padding:4px 0">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`)
      .join('')

    let emailSent = false
    if (process.env.SMTP_HOST) {
      try {
        await payload.sendEmail({
          to: email,
          replyTo: COMPANY.email,
          subject: `Confirmare retragere din contract — ${reference}`,
          html: `<p>Bună, ${escapeHtml(name)},</p>
<p>Am primit declarația ta de retragere din contract. Acest email este confirmarea de primire.</p>
<table>${table}</table>
<p>Îți returnăm toate sumele primite pentru produsele la care te-ai retras, cu aceeași metodă de plată, în cel mult 14 zile de la data de mai sus. Dacă ai primit deja plicuri, te rugăm să le trimiți înapoi în cel mult 14 zile; îți scriem adresa de retur.</p>
<p>Pentru orice întrebare, răspunde la acest email sau scrie-ne la ${COMPANY.email}.</p>
<p>Cu drag,<br>Poșta Lunii<br><small>${COMPANY.name} · CUI ${COMPANY.cui} · ${COMPANY.address}</small></p>`,
        })
        await payload.sendEmail({
          to: COMPANY.email,
          replyTo: email,
          subject: `[Poșta Lunii] Retragere nouă din contract — ${reference}`,
          html: `<p>A fost trimisă o declarație de retragere prin site.</p><table>${table}</table>`,
        })
        emailSent = true
        await payload.update({
          collection: 'withdrawals',
          id: doc.id,
          overrideAccess: true,
          data: { acknowledgementSent: true },
        })
      } catch (error) {
        payload.logger.error({ err: error }, `[posta-lunii] confirmarea retragerii ${reference} nu a putut fi trimisă`)
      }
    } else {
      payload.logger.warn(`[posta-lunii] retragere ${reference} înregistrată; SMTP neconfigurat — emailul de confirmare nu a plecat.`)
    }

    return { status: 'done', reference, submittedAt: when, emailSent, email }
  } catch (error) {
    console.error('[posta-lunii] retragerea nu a putut fi înregistrată', error)
    return {
      status: 'error',
      message: `Nu am putut înregistra cererea. Te rugăm să încerci din nou sau să ne scrii la ${COMPANY.email} — declarația trimisă pe email este la fel de valabilă.`,
    }
  }
}
