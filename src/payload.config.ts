import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'
import sharp from 'sharp'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Settings } from '@/globals/Settings'
import { Navigation } from '@/globals/Navigation'
import { Landing } from '@/globals/Landing'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Poșta Lunii',
    },
  },
  collections: [Users, Media],
  globals: [Landing, Navigation, Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  // SQLite ține totul într-un fișier: zero configurare local, iar în producție
  // aceeași configurație merge pe libSQL/Turso doar schimbând DATABASE_URI.
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./posta-lunii.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  upload: { limits: { fileSize: 8_000_000 } },
  graphQL: { disable: false },
  i18n: { fallbackLanguage: 'ro', supportedLanguages: { ro, en } },
})
