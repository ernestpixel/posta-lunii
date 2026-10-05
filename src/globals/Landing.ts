import type { GlobalConfig } from 'payload'
import { revalidateSite } from '@/hooks/revalidate'
import { defaultLanding as d } from '@/lib/content'

const anyone = () => true

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Pagina principală',
  admin: { group: 'Conținut' },
  access: { read: anyone },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ---------------------------------------------------------------- 1
        {
          label: '1 · Hero',
          name: 'hero',
          description: 'Plicul care se deschide, luna cu halou și primul CTA.',
          fields: [
            { name: 'subtitle', type: 'textarea', label: 'Subtitlu (sub logo)', defaultValue: d.hero.subtitle },
            { name: 'text', type: 'textarea', label: 'Paragraf principal', defaultValue: d.hero.text },
            {
              type: 'collapsible',
              label: 'Caseta cu donația',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'donationBefore', type: 'text', label: 'Înainte', defaultValue: d.hero.donationBefore, admin: { width: '25%' } },
                    {
                      name: 'donationAmount',
                      type: 'text',
                      label: 'Sumă (scris de mână)',
                      defaultValue: d.hero.donationAmount,
                      admin: { width: '25%' },
                    },
                    { name: 'donationAfter', type: 'text', label: 'După', defaultValue: d.hero.donationAfter, admin: { width: '50%' } },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'ctaLabel', type: 'text', label: 'Buton', defaultValue: d.hero.ctaLabel, admin: { width: '50%' } },
                { name: 'ctaNote', type: 'text', label: 'Notă lângă buton', defaultValue: d.hero.ctaNote, admin: { width: '50%' } },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- 2
        {
          label: '2 · Ce găsești în plic',
          name: 'envelope',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Supratitlu', defaultValue: d.envelope.eyebrow, admin: { width: '40%' } },
                { name: 'title', type: 'text', label: 'Titlu', defaultValue: d.envelope.title, admin: { width: '60%' } },
              ],
            },
            {
              name: 'items',
              type: 'array',
              label: 'Cartonașe',
              labels: { singular: 'Cartonaș', plural: 'Cartonașe' },
              minRows: 1,
              maxRows: 4,
              defaultValue: d.envelope.items,
              admin: {
                description:
                  'Fiecare variantă are designul ei (hârtie par-avion, caiet cu spirală, cartonaș kraft, surpriză). Se editează textele; designul rămâne legat de variantă.',
              },
              fields: [
                {
                  name: 'variant',
                  type: 'select',
                  label: 'Variantă',
                  required: true,
                  defaultValue: 'letter',
                  options: [
                    { label: 'Scrisoare (par-avion)', value: 'letter' },
                    { label: 'Journaling (caiet)', value: 'journal' },
                    { label: 'Carte (cartonaș kraft)', value: 'book' },
                    { label: 'Surprize (semn de carte)', value: 'gift' },
                  ],
                },
                { name: 'title', type: 'text', label: 'Titlu', required: true },
                { name: 'note', type: 'text', label: 'Notă scrisă de mână' },
              ],
            },
            { name: 'outro', type: 'textarea', label: 'Text de încheiere', defaultValue: d.envelope.outro },
          ],
        },
        // ---------------------------------------------------------------- 3
        {
          label: '3 · Despre Adina',
          name: 'about',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'photoCaption', type: 'text', label: 'Text pe polaroid', defaultValue: d.about.photoCaption, admin: { width: '50%' } },
                { name: 'photoAlt', type: 'text', label: 'Descriere poză (alt)', defaultValue: d.about.photoAlt, admin: { width: '50%' } },
              ],
            },
            {
              name: 'paragraphs',
              type: 'array',
              label: 'Scrisoarea',
              labels: { singular: 'Paragraf', plural: 'Paragrafe' },
              defaultValue: d.about.paragraphs,
              fields: [{ name: 'text', type: 'textarea', label: 'Paragraf', required: true }],
            },
            { name: 'signature', type: 'text', label: 'Semnătură', defaultValue: d.about.signature },
          ],
        },
        // ---------------------------------------------------------------- 4
        {
          label: '4 · Donația',
          name: 'donation',
          description: 'Singura secțiune de noapte (indigo).',
          fields: [
            { name: 'eyebrow', type: 'text', label: 'Supratitlu', defaultValue: d.donation.eyebrow },
            {
              type: 'row',
              fields: [
                { name: 'titleAmount', type: 'text', label: 'Titlu — sumă', defaultValue: d.donation.titleAmount, admin: { width: '25%' } },
                { name: 'titleMiddle', type: 'text', label: 'Titlu — mijloc', defaultValue: d.donation.titleMiddle, admin: { width: '35%' } },
                { name: 'titleTarget', type: 'text', label: 'Titlu — destinatar', defaultValue: d.donation.titleTarget, admin: { width: '40%' } },
              ],
            },
            { name: 'text', type: 'textarea', label: 'Paragraf', defaultValue: d.donation.text },
            {
              type: 'row',
              fields: [
                { name: 'refrainLeft', type: 'text', label: 'Refren — stânga', defaultValue: d.donation.refrainLeft, admin: { width: '50%' } },
                { name: 'refrainRight', type: 'text', label: 'Refren — dreapta', defaultValue: d.donation.refrainRight, admin: { width: '50%' } },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- 5
        {
          label: '5 · Prețuri',
          name: 'pricing',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Supratitlu', defaultValue: d.pricing.eyebrow, admin: { width: '30%' } },
                { name: 'title', type: 'text', label: 'Titlu', defaultValue: d.pricing.title, admin: { width: '70%' } },
              ],
            },
            {
              name: 'plans',
              type: 'array',
              label: 'Planuri',
              labels: { singular: 'Plan', plural: 'Planuri' },
              minRows: 1,
              maxRows: 3,
              defaultValue: d.pricing.plans,
              fields: [
                { name: 'name', type: 'text', label: 'Nume plan', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'price', type: 'text', label: 'Preț', required: true, admin: { width: '50%' } },
                    { name: 'priceSuffix', type: 'text', label: 'Sufix preț', admin: { width: '50%', description: 'ex. „/ lună”' } },
                  ],
                },
                { name: 'description', type: 'textarea', label: 'Descriere', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'savings', type: 'text', label: 'Economie (evidențiat)', admin: { width: '50%' } },
                    { name: 'descriptionAfter', type: 'text', label: 'Continuarea descrierii', admin: { width: '50%' } },
                  ],
                },
                { name: 'fine', type: 'textarea', label: 'Rând cu detalii de plată' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', label: 'Buton', required: true, admin: { width: '50%' } },
                    {
                      name: 'checkoutUrl',
                      type: 'text',
                      label: 'Link checkout',
                      required: true,
                      defaultValue: '#',
                      admin: { width: '50%', description: 'Aici se leagă plata (Stripe, Netopia, EuPlătesc…).' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'featured', type: 'checkbox', label: 'Recomandat (evidențiat)', admin: { width: '50%' } },
                    { name: 'badge', type: 'text', label: 'Etichetă', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            { name: 'note', type: 'text', label: 'Notă sub planuri', defaultValue: d.pricing.note },
          ],
        },
        // ---------------------------------------------------------------- 6
        {
          label: '6 · Închidere',
          name: 'closing',
          fields: [
            { name: 'text', type: 'textarea', label: 'Text', defaultValue: d.closing.text },
            { name: 'ctaLabel', type: 'text', label: 'Buton', defaultValue: d.closing.ctaLabel },
          ],
        },
        // ---------------------------------------------------------------- 7
        {
          label: '7 · Întrebări (AEO)',
          name: 'faq',
          description:
            'Secțiune opțională. Când e activă, apare înainte de închidere și adaugă datele structurate FAQPage — de aici își iau răspunsurile Google și asistenții AI. Designul paginii rămâne neschimbat cât timp e dezactivată.',
          fields: [
            { name: 'enabled', type: 'checkbox', label: 'Afișează secțiunea în pagină', defaultValue: d.faq.enabled },
            {
              type: 'row',
              fields: [
                { name: 'eyebrow', type: 'text', label: 'Supratitlu', defaultValue: d.faq.eyebrow, admin: { width: '30%' } },
                { name: 'title', type: 'text', label: 'Titlu', defaultValue: d.faq.title, admin: { width: '70%' } },
              ],
            },
            {
              name: 'items',
              type: 'array',
              label: 'Întrebări',
              labels: { singular: 'Întrebare', plural: 'Întrebări' },
              defaultValue: d.faq.items,
              fields: [
                { name: 'question', type: 'text', label: 'Întrebare', required: true },
                { name: 'answer', type: 'textarea', label: 'Răspuns', required: true },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- 8
        {
          label: '8 · Footer',
          name: 'footer',
          fields: [
            { name: 'instagramLabel', type: 'text', label: 'Etichetă Instagram', defaultValue: d.footer.instagramLabel },
            { name: 'baseNote', type: 'text', label: 'Notă donație', defaultValue: d.footer.baseNote },
            { name: 'copyright', type: 'text', label: 'Copyright', defaultValue: d.footer.copyright },
          ],
        },
      ],
    },
  ],
}
