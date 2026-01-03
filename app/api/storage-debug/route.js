/**
 * Storage Debug API Endpoint
 * GET /api/storage-debug
 *
 * Returns diagnostic information about Supabase storage configuration
 * Use this to verify bucket access and troubleshoot listing issues
 */

import { detectBucketConfig, listAllCatalogObjects, STORAGE_CONFIG } from '@/lib/storage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Run bucket detection
    const detection = await detectBucketConfig()

    // Try to list from configured bucket
    const listResult = await listAllCatalogObjects()

    const response = {
      timestamp: new Date().toISOString(),
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseUrlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      },
      configuredBucket: STORAGE_CONFIG.bucket,
      configuredPath: STORAGE_CONFIG.rootPath || '(root)',
      detection,
      listResult: {
        totalObjects: listResult.objects.length,
        stats: listResult.stats,
        samplePaths: listResult.objects.slice(0, 20).map(o => o.fullPath || o.name),
        newestItem: listResult.objects[0] || null,
        error: listResult.error?.message || null,
      },
    }

    return Response.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (err) {
    return Response.json(
      {
        error: err.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
