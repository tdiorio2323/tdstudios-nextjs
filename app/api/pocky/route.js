import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return Response.json(
        { error: 'Missing SUPABASE_SERVICE_ROLE_KEY environment variable' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const allObjects = []
    let offset = 0
    let hasMore = true

    while (hasMore) {
      const { data, error } = await supabase.storage
        .from('designs')
        .list('POCKY', {
          limit: 1000,
          offset,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      if (error) {
        return Response.json({ error: error.message }, { status: 500 })
      }

      if (!data || data.length === 0) {
        hasMore = false
        break
      }

      for (const item of data) {
        if (item.name.startsWith('.')) continue
        if (item.id === null) continue

        if (IMAGE_EXTENSIONS.test(item.name)) {
          const { data: urlData } = supabase.storage
            .from('designs')
            .getPublicUrl(`POCKY/${item.name}`)

          allObjects.push({
            name: item.name,
            fullPath: `POCKY/${item.name}`,
            publicUrl: urlData.publicUrl,
          })
        }
      }

      if (data.length < 1000) {
        hasMore = false
      } else {
        offset += 1000
      }
    }

    return Response.json({ objects: allObjects })
  } catch (err) {
    console.error('[PockyAPI] Error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
