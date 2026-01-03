'use client'

import { useState, useEffect, useCallback } from 'react'
import { listAllCatalogObjects, listDesignsCatalog, detectBucketConfig, STORAGE_CONFIG } from '@/lib/storage'
import { useAntiSaveProtection } from '@/hooks/useAntiSaveProtection'
import { categorizeDesign } from '@/lib/catalogConfig'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LoadingSpinner from './LoadingSpinner'
import ErrorState from './ErrorState'
import EmptyState from './EmptyState'
import CategoryFilter from './CategoryFilter'
import DesignCard from './DesignCard'
import Pagination from './Pagination'

const ITEMS_PER_PAGE = 100

/**
 * Main catalog grid component
 * Displays a filterable grid of designs from Supabase storage
 * Now with recursive listing and full pagination support
 *
 * @param {Object} config - Catalog configuration
 * @param {string} config.title - Page title
 * @param {string} config.description - Page description
 * @param {string} config.watermarkImage - Path to watermark image
 * @param {string} config.watermarkAlt - Alt text for watermark
 */
export default function CatalogGrid({ config }) {
  const [allDesigns, setAllDesigns] = useState([])
  const [filteredDesigns, setFilteredDesigns] = useState([])
  const [displayedDesigns, setDisplayedDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [fetchStats, setFetchStats] = useState(null)
  const [showDebug, setShowDebug] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { handlers, styles } = useAntiSaveProtection()

  const fetchDesigns = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      // Validate environment variables
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error(
          'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel and redeploy.'
        )
      }

      // Try the configured bucket first, then fallback
      let result = await listAllCatalogObjects()

      // If no objects found in primary config, try alternative
      if (result.objects.length === 0 && !result.error) {
        console.log('[CatalogGrid] No objects in primary bucket, trying alternative...')
        result = await listDesignsCatalog()
      }

      if (result.error) {
        throw result.error
      }

      console.log(`[CatalogGrid] Loaded ${result.objects.length} objects`)
      setFetchStats(result.stats)
      setLastUpdated(new Date())

      // Categorize each design
      const categorizedDesigns = result.objects.map((obj) => ({
        ...obj,
        category: categorizeDesign(obj.name),
      }))

      setAllDesigns(categorizedDesigns)
      setFilteredDesigns(categorizedDesigns)
      setPage(0)
    } catch (err) {
      console.error('[CatalogGrid] Error fetching designs:', err)
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to load designs. Please try again later.'
      setError(errorMessage)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchDesigns()
  }, [fetchDesigns])

  // Filter designs when category changes
  useEffect(() => {
    if (activeCategory === 'ALL') {
      setFilteredDesigns(allDesigns)
    } else {
      setFilteredDesigns(
        allDesigns.filter((design) => design.category === activeCategory)
      )
    }
    setPage(0)
  }, [activeCategory, allDesigns])

  // Update displayed designs when page or filtered list changes
  useEffect(() => {
    const start = page * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    setDisplayedDesigns(filteredDesigns.slice(start, end))
  }, [page, filteredDesigns])

  const totalPages = Math.ceil(filteredDesigns.length / ITEMS_PER_PAGE)
  const hasMore = page < totalPages - 1
  const hasPrev = page > 0

  const handlePrevPage = () => {
    if (hasPrev) {
      setPage(page - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const handleRefresh = () => {
    fetchDesigns(true)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Main content wrapper with anti-save handlers */}
      <div
        className="container mx-auto px-4 py-16 mt-16"
        onContextMenu={handlers.onContextMenu}
        onDragStart={handlers.onDragStart}
        onTouchStart={handlers.onTouchStart}
        style={styles.base}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4 text-purple">
            {config.title}
          </h1>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>

        {/* Stats Bar */}
        {!loading && !error && allDesigns.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 px-4 py-3 bg-charcoal/50 rounded-lg">
            <div className="flex items-center gap-4 text-sm text-light-gray">
              <span>
                <strong className="text-white">{filteredDesigns.length}</strong>
                {activeCategory !== 'ALL' && ` of ${allDesigns.length}`} designs
              </span>
              {lastUpdated && (
                <span className="hidden sm:inline">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-3 py-1.5 text-sm bg-purple/20 hover:bg-purple/30 text-purple rounded transition-colors disabled:opacity-50"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="px-3 py-1.5 text-sm bg-gray/20 hover:bg-gray/30 text-light-gray rounded transition-colors"
              >
                {showDebug ? 'Hide Debug' : 'Debug'}
              </button>
            </div>
          </div>
        )}

        {/* Debug Panel */}
        {showDebug && fetchStats && (
          <div className="mb-8 p-4 bg-charcoal rounded-lg text-xs font-mono overflow-x-auto">
            <h3 className="text-purple font-bold mb-2">Storage Diagnostics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-light-gray">
              <div>
                <p><strong>Bucket:</strong> {fetchStats.bucket || STORAGE_CONFIG.bucket}</p>
                <p><strong>Root Path:</strong> {fetchStats.rootPath || '(root)'}</p>
                <p><strong>Total Objects:</strong> {fetchStats.totalObjectsFound}</p>
                <p><strong>API Calls:</strong> {fetchStats.totalApiCalls}</p>
                <p><strong>Duration:</strong> {fetchStats.durationMs}ms</p>
                <p><strong>Fetched At:</strong> {fetchStats.fetchedAt}</p>
              </div>
              <div>
                <p><strong>Folders Scanned:</strong></p>
                <ul className="ml-4 text-gray">
                  {fetchStats.foldersScanned?.slice(0, 10).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                  {fetchStats.foldersScanned?.length > 10 && (
                    <li>...and {fetchStats.foldersScanned.length - 10} more</li>
                  )}
                </ul>
              </div>
            </div>
            {fetchStats.errors?.length > 0 && (
              <div className="mt-4 p-2 bg-red-900/30 rounded text-red-400">
                <strong>Errors:</strong>
                <ul className="ml-4">
                  {fetchStats.errors.map((e, i) => (
                    <li key={i}>{JSON.stringify(e)}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <p><strong>First 20 Paths:</strong></p>
              <ul className="ml-4 text-gray max-h-40 overflow-y-auto">
                {allDesigns.slice(0, 20).map((d, i) => (
                  <li key={i}>{d.fullPath || d.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && (
          <ErrorState error={error} onRetry={() => fetchDesigns(false)} />
        )}

        {/* Empty State */}
        {!loading && !error && allDesigns.length === 0 && <EmptyState />}

        {/* Category Tabs and Grid */}
        {!loading && !error && allDesigns.length > 0 && (
          <>
            <CategoryFilter
              designs={allDesigns}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Pagination Info */}
            {totalPages > 1 && (
              <div className="text-center text-sm text-light-gray mb-4">
                Page {page + 1} of {totalPages} ({displayedDesigns.length} shown)
              </div>
            )}

            {/* Design Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {displayedDesigns.map((design) => (
                <DesignCard
                  key={design.fullPath || design.name}
                  design={design}
                  watermarkImage={config.watermarkImage}
                  watermarkAlt={config.watermarkAlt}
                  handlers={handlers}
                />
              ))}
            </div>

            {/* Empty filtered state */}
            {filteredDesigns.length === 0 && (
              <EmptyState message={`No designs found in the "${activeCategory}" category.`} />
            )}

            {/* Pagination */}
            <Pagination
              page={page}
              hasMore={hasMore}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
