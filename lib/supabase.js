import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

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
