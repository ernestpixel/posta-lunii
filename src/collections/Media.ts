import type { CollectionConfig } from 'payload'

const anyone = () => true

/**
 * Imaginile paginii sunt fișiere statice în /public/assets — rămân acolo pentru
 * ca masca CSS a hârtiei rupte și randarea să fie identice cu macheta.
 * Colecția aceasta există pentru imaginile pe care le adaugă Adina din admin
 * (ediții viitoare, poze noi) și pentru a putea înlocui, la nevoie, o imagine
 * din pagină fără deploy.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagine', plural: 'Imagini' },
  admin: { group: 'Conținut' },
  access: { read: anyone },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined, position: 'centre' },
      { name: 'card', width: 800, height: undefined, position: 'centre' },
      { name: 'full', width: 1600, height: undefined, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Text alternativ',
      admin: {
        description:
          'Descrie imaginea pentru cititoarele de ecran și pentru motoarele de căutare. Lasă gol doar dacă imaginea este pur decorativă.',
      },
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Credit / sursă',
    },
  ],
}
