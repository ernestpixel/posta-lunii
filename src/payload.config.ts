import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'
import sharp from 'sharp'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Withdrawals } from '@/collections/Withdrawals'
import { Settings } from '@/globals/Settings'
import { Navigation } from '@/globals/Navigation'
import { Landing } from '@/globals/Landing'
import { COMPANY } from '@/lib/legal'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Poșta Lunii',
    },
  },
  collections: [Users, Media, Withdrawals],
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
  // Emailuri (ex. confirmarea retragerii din contract). Fără SMTP configurat,
  // Payload doar scrie emailurile în consolă.
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_FROM || COMPANY.email,
          defaultFromName: 'Poșta Lunii',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 465),
            secure: Number(process.env.SMTP_PORT || 465) === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          },
        }),
      }
    : {}),
  sharp,
  upload: { limits: { fileSize: 8_000_000 } },
  graphQL: { disable: false },
  i18n: { fallbackLanguage: 'ro', supportedLanguages: { ro, en } },
})
