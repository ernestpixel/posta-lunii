import type { GlobalConfig } from 'payload'
import { revalidateSite } from '@/hooks/revalidate'
import { defaultSettings as d } from '@/lib/content'

const anyone = () => true

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Setări site & SEO',
  admin: { group: 'Site' },
  access: { read: anyone },
  hooks: { afterChange: [revalidateSite] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identitate',
          fields: [
            { name: 'siteName', type: 'text', label: 'Nume site', required: true, defaultValue: d.siteName },
            { name: 'tagline', type: 'text', label: 'Slogan', defaultValue: d.tagline },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Link Instagram',
              defaultValue: d.instagramUrl,
            },
          ],
        },
        {
          label: 'SEO',
          description:
            'Titlul și descrierea apar în Google și când cineva dă share la link. Descrierea ideală are 140–160 de caractere.',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Titlu meta',
              defaultValue: d.metaTitle,
              maxLength: 70,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Descriere meta',
              defaultValue: d.metaDescription,
              maxLength: 200,
            },
            {
              name: 'keywords',
              type: 'textarea',
              label: 'Cuvinte cheie',
              defaultValue: d.keywords,
              admin: { description: 'Separate prin virgulă. Contează puțin pentru Google, mai mult pentru asistenții AI.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagine social (1200×630)',
              admin: {
                description:
                  'Opțional. Dacă lipsește, se folosește imaginea generată automat din logo și lună.',
              },
            },
            { name: 'noindex', type: 'checkbox', label: 'Blochează indexarea (staging)', defaultValue: false },
          ],
        },
        {
          label: 'Donație & preț',
          description: 'Folosite în datele structurate (schema.org) și în textele generate pentru asistenții AI.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'donationAmount', type: 'text', label: 'Sumă donată / plic', defaultValue: d.donationAmount, admin: { width: '50%' } },
                { name: 'shelterName', type: 'text', label: 'Adăpost', defaultValue: d.shelterName, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'priceFrom', type: 'text', label: 'Preț minim (doar cifra)', defaultValue: d.priceFrom, admin: { width: '33%' } },
                { name: 'priceMonthly', type: 'text', label: 'Preț lunar (doar cifra)', defaultValue: d.priceMonthly, admin: { width: '33%' } },
                { name: 'currency', type: 'text', label: 'Monedă', defaultValue: d.currency, admin: { width: '33%' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
