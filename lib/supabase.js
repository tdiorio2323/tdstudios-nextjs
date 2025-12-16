import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment (Vercel dashboard) and redeploy.'
  )
}

// Aggressively sanitize environment variables to prevent header issues
// This fixes "Failed to execute 'set' on 'Headers': Invalid value" errors
// Remove all whitespace, newlines, tabs, and control characters
const safeSupabaseUrl = supabaseUrl ? supabaseUrl.trim().replace(/[\s\r\n\t]/g, '') : ''
const safeSupabaseKey = supabaseKey ? supabaseKey.trim().replace(/[\s\r\n\t]/g, '') : ''

// Additional validation to catch any remaining issues
if (safeSupabaseUrl && !/^https?:\/\/.+/.test(safeSupabaseUrl)) {
  console.error('Invalid NEXT_PUBLIC_SUPABASE_URL format:', JSON.stringify(supabaseUrl))
  throw new Error('NEXT_PUBLIC_SUPABASE_URL must be a valid URL')
}

if (safeSupabaseKey && safeSupabaseKey.length < 20) {
  console.error('Invalid NEXT_PUBLIC_SUPABASE_ANON_KEY length:', safeSupabaseKey.length)
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY appears to be invalid')
}

export const supabase = createClient(safeSupabaseUrl, safeSupabaseKey)

export const getDesigns = async () => {
    const { data, error } = await supabase
        .storage
        .from('designs')
        .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        })

    if (error) {
        console.error('Error fetching designs:', error)
        return []
    }

    return data
}

export const getDesignUrl = (path) => {
    const { data } = supabase
        .storage
        .from('designs')
        .getPublicUrl(path)

    return data.publicUrl
}
