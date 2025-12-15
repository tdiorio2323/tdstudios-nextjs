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

// Trim whitespace and remove any hidden characters to prevent header issues
// This fixes "Failed to execute 'set' on 'Headers': Invalid value" errors
const safeSupabaseUrl = supabaseUrl ? supabaseUrl.replace(/\s/g, '') : ''
const safeSupabaseKey = supabaseKey ? supabaseKey.replace(/\s/g, '') : ''

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
