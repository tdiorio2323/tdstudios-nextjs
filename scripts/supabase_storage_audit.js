#!/usr/bin/env node

/**
 * Supabase Storage Audit Script
 *
 * Audits Supabase storage buckets and compares object counts with any
 * tracked sources in the app.
 *
 * Exit codes:
 *   0 - Success (counts match or no tracking source)
 *   1 - Configuration/tooling error
 *   2 - Mismatch detected between storage and tracked counts
 *
 * Usage:
 *   npm run storage:audit
 *   BUCKET_NAME=catalog npm run storage:audit
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

// Load environment variables from .env.local
config({ path: resolve(projectRoot, '.env.local') })
config({ path: resolve(projectRoot, '.env') })

// ============================================================================
// Configuration
// ============================================================================

const CONCURRENCY_LIMIT = 5
const PAGE_SIZE = 1000
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

// ============================================================================
// Environment Setup
// ============================================================================

function getEnvConfig() {
  // Check for various env var naming conventions
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL

  // Prefer service role key for full access, fall back to anon key
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SERVICE_ROLE_KEY

  const anonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY

  const key = serviceRoleKey || anonKey
  const keyType = serviceRoleKey ? 'SERVICE_ROLE' : 'ANON'

  const targetBucket = process.env.BUCKET_NAME || null

  return { url, key, keyType, targetBucket }
}

function validateConfig(config) {
  const errors = []

  if (!config.url) {
    errors.push(
      'Missing Supabase URL. Set one of: SUPABASE_URL, NEXT_PUBLIC_SUPABASE_URL'
    )
  }

  if (!config.key) {
    errors.push(
      'Missing Supabase key. Set one of: SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  if (errors.length > 0) {
    console.error('\n' + '='.repeat(60))
    console.error('CONFIGURATION ERROR')
    console.error('='.repeat(60))
    errors.forEach((e) => console.error(`  - ${e}`))
    console.error('\nCheck your .env.local or .env file.')
    console.error('='.repeat(60) + '\n')
    process.exit(1)
  }

  return true
}

// ============================================================================
// Supabase Client
// ============================================================================

function createSupabaseClient(url, key) {
  // Sanitize values to prevent header issues
  const safeUrl = url.trim().replace(/[\s\r\n\t]/g, '')
  const safeKey = key.trim().replace(/[\s\r\n\t]/g, '')

  return createClient(safeUrl, safeKey, {
    auth: { persistSession: false },
  })
}

// ============================================================================
// Concurrency Limiter
// ============================================================================

function createLimiter(concurrency) {
  let running = 0
  const queue = []

  async function run(fn) {
    if (running >= concurrency) {
      await new Promise((resolve) => queue.push(resolve))
    }
    running++
    try {
      return await fn()
    } finally {
      running--
      if (queue.length > 0) {
        queue.shift()()
      }
    }
  }

  return { run }
}

// ============================================================================
// Retry Helper
// ============================================================================

async function withRetry(fn, retries = MAX_RETRIES) {
  let lastError
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (i + 1)))
      }
    }
  }
  throw lastError
}

// ============================================================================
// Storage Enumeration
// ============================================================================

async function listBuckets(supabase) {
  const { data, error } = await supabase.storage.listBuckets()

  if (error) {
    console.error('Failed to list buckets:', error.message)
    if (error.message.includes('permission') || error.message.includes('RLS')) {
      console.error('\nTip: Use SERVICE_ROLE_KEY for full bucket access.')
    }
    return []
  }

  return data || []
}

async function countObjectsInBucket(supabase, bucketName, limiter) {
  const stats = {
    bucket: bucketName,
    objectCount: 0,
    totalBytes: 0,
    folderBreakdown: {},
    errors: [],
    warnings: [],
  }

  const foldersToScan = ['']
  const scannedFolders = new Set()

  while (foldersToScan.length > 0) {
    const currentPath = foldersToScan.shift()

    if (scannedFolders.has(currentPath)) continue
    scannedFolders.add(currentPath)

    let offset = 0
    let hasMore = true

    while (hasMore) {
      try {
        const result = await limiter.run(() =>
          withRetry(async () => {
            const { data, error } = await supabase.storage
              .from(bucketName)
              .list(currentPath, {
                limit: PAGE_SIZE,
                offset,
                sortBy: { column: 'name', order: 'asc' },
              })

            if (error) throw error
            return data
          })
        )

        if (!result || result.length === 0) {
          hasMore = false
          break
        }

        for (const item of result) {
          // Skip hidden files
          if (item.name.startsWith('.')) continue

          const fullPath = currentPath ? `${currentPath}/${item.name}` : item.name

          // Folder detection: id and metadata are null for folders
          if (item.id === null && item.metadata === null) {
            foldersToScan.push(fullPath)
            continue
          }

          // It's a file
          stats.objectCount++
          const size = item.metadata?.size || 0
          stats.totalBytes += size

          // Track by top-level folder
          const topFolder = fullPath.split('/')[0] || '(root)'
          if (!stats.folderBreakdown[topFolder]) {
            stats.folderBreakdown[topFolder] = { count: 0, bytes: 0 }
          }
          stats.folderBreakdown[topFolder].count++
          stats.folderBreakdown[topFolder].bytes += size
        }

        if (result.length < PAGE_SIZE) {
          hasMore = false
        } else {
          offset += PAGE_SIZE
        }
      } catch (err) {
        stats.errors.push({
          path: currentPath,
          offset,
          message: err.message,
        })
        hasMore = false
      }
    }
  }

  // Warn if count seems suspiciously low
  if (stats.objectCount === 0 && stats.errors.length === 0) {
    stats.warnings.push(
      'Bucket appears empty. If unexpected, verify RLS policies or use SERVICE_ROLE_KEY.'
    )
  }

  return stats
}

// ============================================================================
// App-Side Tracking Detection
// ============================================================================

function findTrackingSource(projectRoot) {
  const sources = []

  // Check for local manifest files
  const manifestPaths = [
    'catalog-manifest.json',
    'storage-manifest.json',
    'designs-manifest.json',
    'public/manifest.json',
    '.storage-manifest.json',
  ]

  for (const mp of manifestPaths) {
    const fullPath = resolve(projectRoot, mp)
    if (existsSync(fullPath)) {
      try {
        const content = JSON.parse(readFileSync(fullPath, 'utf-8'))
        const count = Array.isArray(content)
          ? content.length
          : content.files?.length || content.items?.length || content.count || null

        if (count !== null) {
          sources.push({
            type: 'manifest',
            path: mp,
            count,
          })
        }
      } catch {
        // Ignore parse errors
      }
    }
  }

  // Check lib/catalogConfig.js for any hardcoded counts
  const catalogConfigPath = resolve(projectRoot, 'lib/catalogConfig.js')
  if (existsSync(catalogConfigPath)) {
    try {
      const content = readFileSync(catalogConfigPath, 'utf-8')
      // Look for any array definitions that might be a catalog
      const match = content.match(/export\s+const\s+\w+\s*=\s*\[([^\]]+)\]/g)
      if (match) {
        sources.push({
          type: 'config',
          path: 'lib/catalogConfig.js',
          note: 'Contains category/config definitions (not a file manifest)',
        })
      }
    } catch {
      // Ignore
    }
  }

  return sources
}

// ============================================================================
// Reporting
// ============================================================================

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function printReport(bucketStats, trackingSources, keyType) {
  console.log('\n' + '='.repeat(70))
  console.log('SUPABASE STORAGE AUDIT REPORT')
  console.log('='.repeat(70))
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log(`Auth Key Type: ${keyType}`)
  if (keyType === 'ANON') {
    console.log(
      '  (Using ANON key - some buckets may be restricted. Consider SERVICE_ROLE_KEY for full audit)'
    )
  }
  console.log('')

  let hasMismatch = false

  for (const stats of bucketStats) {
    console.log('-'.repeat(70))
    console.log(`BUCKET: ${stats.bucket}`)
    console.log('-'.repeat(70))
    console.log(`  Objects:     ${stats.objectCount.toLocaleString()}`)
    console.log(`  Total Size:  ${formatBytes(stats.totalBytes)}`)

    if (Object.keys(stats.folderBreakdown).length > 0) {
      console.log('\n  Breakdown by top-level folder:')
      const sorted = Object.entries(stats.folderBreakdown).sort(
        (a, b) => b[1].count - a[1].count
      )
      for (const [folder, data] of sorted.slice(0, 10)) {
        console.log(
          `    ${folder.padEnd(30)} ${String(data.count).padStart(6)} files  ${formatBytes(data.bytes).padStart(10)}`
        )
      }
      if (sorted.length > 10) {
        console.log(`    ... and ${sorted.length - 10} more folders`)
      }
    }

    if (stats.warnings.length > 0) {
      console.log('\n  Warnings:')
      stats.warnings.forEach((w) => console.log(`    - ${w}`))
    }

    if (stats.errors.length > 0) {
      console.log('\n  Errors during enumeration:')
      stats.errors.slice(0, 5).forEach((e) =>
        console.log(`    - Path: ${e.path || '(root)'}, Error: ${e.message}`)
      )
      if (stats.errors.length > 5) {
        console.log(`    ... and ${stats.errors.length - 5} more errors`)
      }
    }

    console.log('')
  }

  // Tracking sources
  console.log('-'.repeat(70))
  console.log('APP-SIDE TRACKING SOURCES')
  console.log('-'.repeat(70))

  if (trackingSources.length === 0) {
    console.log(
      '  No app-side tracking source found (no manifest files or DB tables detected).'
    )
    console.log('  Cannot compare counts. Bucket inventory printed above.')
  } else {
    for (const src of trackingSources) {
      console.log(`  Source: ${src.path}`)
      console.log(`    Type: ${src.type}`)
      if (src.count !== undefined) {
        console.log(`    Tracked Count: ${src.count.toLocaleString()}`)

        // Compare with bucket stats if we have a single bucket
        if (bucketStats.length === 1) {
          const delta = bucketStats[0].objectCount - src.count
          console.log(
            `    Delta: ${delta >= 0 ? '+' : ''}${delta.toLocaleString()}`
          )
          if (delta !== 0) {
            hasMismatch = true
          }
        }
      }
      if (src.note) {
        console.log(`    Note: ${src.note}`)
      }
      console.log('')
    }
  }

  console.log('='.repeat(70))

  // Summary and recommendations
  if (hasMismatch) {
    console.log('\nMISMATCH DETECTED!')
    console.log('Recommended next steps:')
    console.log('  1. Rebuild catalog index / resync job')
    console.log('  2. Check RLS / permissions if list() returns partial results')
    console.log('  3. Ensure you are using SERVICE_ROLE_KEY for complete audit')
    console.log('  4. Verify the manifest file is up to date')
  } else if (bucketStats.every((s) => s.objectCount > 0)) {
    console.log('\nAudit complete. No mismatches detected.')
  } else {
    console.log('\nAudit complete. Some buckets may be empty or inaccessible.')
  }

  console.log('='.repeat(70) + '\n')

  return hasMismatch
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('\nSupabase Storage Audit')
  console.log('----------------------\n')

  // Get and validate config
  const envConfig = getEnvConfig()
  validateConfig(envConfig)

  console.log(`Supabase URL: ${envConfig.url}`)
  console.log(`Using key type: ${envConfig.keyType}`)
  if (envConfig.targetBucket) {
    console.log(`Target bucket: ${envConfig.targetBucket}`)
  }

  // Create client
  const supabase = createSupabaseClient(envConfig.url, envConfig.key)
  const limiter = createLimiter(CONCURRENCY_LIMIT)

  // Determine which buckets to audit
  let bucketsToAudit = []

  if (envConfig.targetBucket) {
    bucketsToAudit = [{ name: envConfig.targetBucket }]
  } else {
    console.log('\nDiscovering buckets...')
    const allBuckets = await listBuckets(supabase)

    if (allBuckets.length === 0) {
      console.log('No buckets found or unable to list buckets.')
      console.log(
        'If using ANON key, try setting SUPABASE_SERVICE_ROLE_KEY for bucket discovery.'
      )

      // Try known bucket names as fallback
      console.log('\nTrying known bucket names: catalog, designs')
      bucketsToAudit = [{ name: 'catalog' }, { name: 'designs' }]
    } else {
      console.log(`Found ${allBuckets.length} bucket(s): ${allBuckets.map((b) => b.name).join(', ')}`)
      bucketsToAudit = allBuckets
    }
  }

  // Audit each bucket
  console.log('\nAuditing storage...')
  const bucketStats = []

  for (const bucket of bucketsToAudit) {
    process.stdout.write(`  Scanning ${bucket.name}...`)
    try {
      const stats = await countObjectsInBucket(supabase, bucket.name, limiter)
      bucketStats.push(stats)
      console.log(` ${stats.objectCount} objects (${formatBytes(stats.totalBytes)})`)
    } catch (err) {
      console.log(` ERROR: ${err.message}`)
      bucketStats.push({
        bucket: bucket.name,
        objectCount: 0,
        totalBytes: 0,
        folderBreakdown: {},
        errors: [{ message: err.message }],
        warnings: [],
      })
    }
  }

  // Find tracking sources
  const trackingSources = findTrackingSource(projectRoot)

  // Print report
  const hasMismatch = printReport(bucketStats, trackingSources, envConfig.keyType)

  // Exit with appropriate code
  const hasErrors = bucketStats.some((s) => s.errors.length > 0)

  if (hasMismatch) {
    process.exit(2)
  } else if (hasErrors) {
    console.log('Note: Some errors occurred during enumeration. Results may be incomplete.')
    process.exit(0) // Still exit 0 if we got partial results
  } else {
    process.exit(0)
  }
}

main().catch((err) => {
  console.error('\nFatal error:', err.message)
  console.error(err.stack)
  process.exit(1)
})
