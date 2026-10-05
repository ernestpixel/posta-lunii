import type { GlobalConfig } from 'payload'
import { revalidateSite } from '@/hooks/revalidate'
import { defaultNavigation as d } from '@/lib/content'

const anyone = () => true

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Meniu',
  admin: { group: 'Site' },
  access: { read: anyone },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Linkuri',
      labels: { singular: 'Link', plural: 'Linkuri' },
      maxRows: 5,
      defaultValue: d.items,
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', label: 'Text', required: true, admin: { width: '50%' } },
            {
              name: 'href',
              type: 'text',
              label: 'Destinație',
              required: true,
              admin: { width: '50%', description: 'Ancoră (#plic) sau URL complet.' },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'Buton — text', defaultValue: d.ctaLabel, admin: { width: '50%' } },
        { name: 'ctaHref', type: 'text', label: 'Buton — destinație', defaultValue: d.ctaHref, admin: { width: '50%' } },
      ],
    },
  ],
}
