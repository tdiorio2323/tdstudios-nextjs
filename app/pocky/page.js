'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAntiSaveProtection } from '@/hooks/useAntiSaveProtection'
import { catalogConfigs } from '@/lib/catalogConfig'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/catalog/LoadingSpinner'
import ErrorState from '@/components/catalog/ErrorState'
import EmptyState from '@/components/catalog/EmptyState'
import DesignCard from '@/components/catalog/DesignCard'
import Pagination from '@/components/catalog/Pagination'

const ITEMS_PER_PAGE = 100
const config = catalogConfigs.pocky

export default function PockyDesigns() {
  const [designs, setDesigns] = useState([])
  const [displayedDesigns, setDisplayedDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)

  const { handlers, styles } = useAntiSaveProtection()

  const fetchDesigns = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch('/api/pocky')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load designs.')
      }

      setDesigns(data.objects)
    } catch (err) {
      console.error('[PockyDesigns] Error fetching designs:', err)
      setError(err instanceof Error ? err.message : 'Failed to load designs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDesigns()
  }, [fetchDesigns])

  useEffect(() => {
    const start = page * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    setDisplayedDesigns(designs.slice(start, end))
  }, [page, designs])

  const totalPages = Math.ceil(designs.length / ITEMS_PER_PAGE)
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

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

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

        {/* Stats */}
        {!loading && !error && designs.length > 0 && (
          <div className="flex items-center justify-center gap-4 mb-8 px-4 py-3 bg-charcoal/50 rounded-lg">
            <span className="text-sm text-light-gray">
              <strong className="text-white">{designs.length}</strong> designs
            </span>
          </div>
        )}

        {loading && <LoadingSpinner />}

        {error && !loading && (
          <ErrorState error={error} onRetry={fetchDesigns} />
        )}

        {!loading && !error && designs.length === 0 && <EmptyState />}

        {!loading && !error && designs.length > 0 && (
          <>
            {totalPages > 1 && (
              <div className="text-center text-sm text-light-gray mb-4">
                Page {page + 1} of {totalPages} ({displayedDesigns.length} shown)
              </div>
            )}

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
