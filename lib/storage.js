/**
 * Supabase Storage utilities
 * Provides comprehensive listing with recursive folder support and full pagination
 */

import { supabase } from './supabase'

// Storage configuration - CHANGE THIS if your bucket name differs
export const STORAGE_CONFIG = {
  // The Supabase storage bucket name
  // NOTE: User reports bucket is named 'catalog', but code historically used 'designs'
  // If 'catalog' doesn't work, try 'designs' with path 'catalog'
  bucket: 'catalog',

  // Root path within the bucket (empty string = bucket root)
  rootPath: '',

  // Maximum items per API request (Supabase caps at 1000)
  pageSize: 1000,

  // Supported image extensions
  imageExtensions: /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i,
}

/**
 * List ALL objects in a storage bucket path, including nested folders
 * Handles pagination automatically to ensure no items are missed
 *
 * @param {string} bucket - Storage bucket name
 * @param {string} path - Path within bucket (empty string for root)
 * @param {Object} options - Options
 * @param {boolean} options.recursive - Whether to list nested folders
 * @param {boolean} options.imagesOnly - Filter to only image files
 * @returns {Promise<{objects: Array, stats: Object, error: Error|null}>}
 */
export async function listAllObjects(bucket, path = '', options = {}) {
  const { recursive = true, imagesOnly = true } = options
  const startTime = Date.now()

  const stats = {
    bucket,
    rootPath: path,
    totalApiCalls: 0,
    totalObjectsFound: 0,
    foldersScanned: [],
    errors: [],
    fetchedAt: new Date().toISOString(),
    durationMs: 0,
  }

  const allObjects = []
  const foldersToScan = [path]

  try {
    while (foldersToScan.length > 0) {
      const currentPath = foldersToScan.shift()
      stats.foldersScanned.push(currentPath || '(root)')

      let offset = 0
      let hasMore = true

      // Paginate through all items in current folder
      while (hasMore) {
        stats.totalApiCalls++

        const { data, error } = await supabase.storage
          .from(bucket)
          .list(currentPath, {
            limit: STORAGE_CONFIG.pageSize,
            offset,
            sortBy: { column: 'created_at', order: 'desc' },
          })

        if (error) {
          stats.errors.push({
            path: currentPath,
            offset,
            error: error.message,
          })
          console.error(`[Storage] Error listing ${bucket}/${currentPath}:`, error)
          break
        }

        if (!data || data.length === 0) {
          hasMore = false
          break
        }

        for (const item of data) {
          // Skip placeholder files
          if (item.name.startsWith('.')) continue

          const fullPath = currentPath ? `${currentPath}/${item.name}` : item.name

          // Check if this is a folder (no metadata means folder)
          if (item.id === null && item.metadata === null) {
            if (recursive) {
              foldersToScan.push(fullPath)
            }
            continue
          }

          // It's a file
          const isImage = STORAGE_CONFIG.imageExtensions.test(item.name)

          if (!imagesOnly || isImage) {
            const { data: urlData } = supabase.storage
              .from(bucket)
              .getPublicUrl(fullPath)

            allObjects.push({
              name: item.name,
              fullPath,
              publicUrl: urlData.publicUrl,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
              metadata: item.metadata,
              size: item.metadata?.size,
              mimeType: item.metadata?.mimetype,
            })
          }
        }

        stats.totalObjectsFound = allObjects.length

        // Check if there are more items
        if (data.length < STORAGE_CONFIG.pageSize) {
          hasMore = false
        } else {
          offset += STORAGE_CONFIG.pageSize
        }
      }
    }

    stats.durationMs = Date.now() - startTime

    console.log(`[Storage] Fetched ${allObjects.length} objects from ${bucket} in ${stats.durationMs}ms (${stats.totalApiCalls} API calls)`)

    return {
      objects: allObjects,
      stats,
      error: null,
    }
  } catch (err) {
    stats.durationMs = Date.now() - startTime
    stats.errors.push({ error: err.message })
    console.error('[Storage] Fatal error:', err)

    return {
      objects: allObjects,
      stats,
      error: err,
    }
  }
}

/**
 * List all catalog objects using configured defaults
 * This is the main function to use for the /designs page
 *
 * @returns {Promise<{objects: Array, stats: Object, error: Error|null}>}
 */
export async function listAllCatalogObjects() {
  return listAllObjects(STORAGE_CONFIG.bucket, STORAGE_CONFIG.rootPath, {
    recursive: true,
    imagesOnly: true,
  })
}

/**
 * Alternative: List from 'designs' bucket with 'catalog' folder
 * Use this if the bucket is actually named 'designs' with a 'catalog' subfolder
 *
 * @returns {Promise<{objects: Array, stats: Object, error: Error|null}>}
 */
export async function listDesignsCatalog() {
  return listAllObjects('designs', 'catalog', {
    recursive: true,
    imagesOnly: true,
  })
}

/**
 * Debug utility: List bucket contents with full diagnostics
 * Useful for verifying bucket structure
 *
 * @param {string} bucket - Bucket name to inspect
 * @returns {Promise<Object>} Diagnostic info
 */
export async function inspectBucket(bucket) {
  console.log(`[Storage] Inspecting bucket: ${bucket}`)

  // Try listing root
  const { data: rootFiles, error: rootError } = await supabase.storage
    .from(bucket)
    .list('', { limit: 20 })

  if (rootError) {
    return {
      bucket,
      exists: false,
      error: rootError.message,
      hint: 'Bucket may not exist, be misspelled, or lack read permissions',
    }
  }

  const folders = rootFiles?.filter(f => f.id === null) || []
  const files = rootFiles?.filter(f => f.id !== null) || []

  return {
    bucket,
    exists: true,
    rootContents: {
      totalItems: rootFiles?.length || 0,
      folders: folders.map(f => f.name),
      files: files.slice(0, 10).map(f => f.name),
      hasMore: (rootFiles?.length || 0) >= 20,
    },
    firstFileUrl: files[0] ? supabase.storage.from(bucket).getPublicUrl(files[0].name).data.publicUrl : null,
  }
}

/**
 * Test both bucket configurations and return which one works
 *
 * @returns {Promise<Object>} Working configuration or error details
 */
export async function detectBucketConfig() {
  console.log('[Storage] Auto-detecting bucket configuration...')

  // Try 'catalog' bucket first (as per user requirement)
  const catalogResult = await inspectBucket('catalog')
  if (catalogResult.exists && catalogResult.rootContents.totalItems > 0) {
    return {
      detected: true,
      config: { bucket: 'catalog', path: '' },
      details: catalogResult,
    }
  }

  // Try 'designs' bucket with 'catalog' folder
  const designsResult = await inspectBucket('designs')
  if (designsResult.exists) {
    // Check if 'catalog' folder exists within designs bucket
    const { data: catalogFolder } = await supabase.storage
      .from('designs')
      .list('catalog', { limit: 5 })

    if (catalogFolder && catalogFolder.length > 0) {
      return {
        detected: true,
        config: { bucket: 'designs', path: 'catalog' },
        details: { ...designsResult, catalogFolderSample: catalogFolder.slice(0, 5).map(f => f.name) },
      }
    }
  }

  return {
    detected: false,
    triedConfigs: [
      { bucket: 'catalog', path: '', result: catalogResult },
      { bucket: 'designs', path: 'catalog', result: designsResult },
    ],
    hint: 'Neither "catalog" bucket nor "designs/catalog" folder found. Check Supabase dashboard.',
  }
}
