import type { MetadataRoute } from 'next'
import { getSettings } from '@/lib/payload-content'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSettings()

  return {
    name: settings.siteName,
    short_name: settings.siteName,
    description: settings.metaDescription,
    lang: 'ro',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F0E4',
    theme_color: '#F6F0E4',
    categories: ['lifestyle', 'books', 'shopping'],
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      { src: '/icon-maskable-512.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
    ],
  }
}
