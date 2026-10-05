import { buildLlmsXml } from '@/lib/llms'
import { getLanding, getSettings } from '@/lib/payload-content'

export const revalidate = 300

export async function GET() {
  const [landing, settings] = await Promise.all([getLanding(), getSettings()])

  return new Response(buildLlmsXml(landing, settings), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
