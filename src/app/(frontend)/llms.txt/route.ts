import { buildLlmsTxt } from '@/lib/llms'
import { getLanding, getSettings } from '@/lib/payload-content'

export const revalidate = 300

export async function GET() {
  const [landing, settings] = await Promise.all([getLanding(), getSettings()])

  return new Response(buildLlmsTxt(landing, settings), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
