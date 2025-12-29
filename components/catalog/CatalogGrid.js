'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
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

const LIMIT = 500

/**
 * Main catalog grid component
 * Displays a filterable grid of designs from Supabase storage
 *
 * @param {Object} config - Catalog configuration
 * @param {string} config.title - Page title
 * @param {string} config.description - Page description
 * @param {string} config.watermarkImage - Path to watermark image
 * @param {string} config.watermarkAlt - Alt text for watermark
 */
export default function CatalogGrid({ config }) {
  const [designs, setDesigns] = useState([])
  const [filteredDesigns, setFilteredDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [activeCategory, setActiveCategory] = useState('ALL')

  const { handlers, styles } = useAntiSaveProtection()

  const fetchDesigns = useCallback(async () => {
    const OFFSET = page * LIMIT
    try {
      setLoading(true)
      setError(null)

      // Validate environment variables before making API calls
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error(
          'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel and redeploy.'
        )
      }

      // List files from the catalog folder
      const { data: files, error: listError } = await supabase.storage
        .from('designs')
        .list('catalog', {
          limit: LIMIT,
          offset: OFFSET,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      if (process.env.NODE_ENV === 'development') {
        console.log('Supabase storage response:', { files, listError })
      }

      if (listError) {
        console.error('List error:', listError)
        throw listError
      }

      if (!files) {
        if (process.env.NODE_ENV === 'development') {
          console.log('No files returned')
        }
        setDesigns([])
        setFilteredDesigns([])
        setHasMore(false)
        return
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Total files found:', files.length)
      }

      // Filter out folders and placeholder files
      const imageFiles = files.filter(
        (file) =>
          file.name &&
          !file.name.startsWith('.') &&
          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
      )

      if (process.env.NODE_ENV === 'development') {
        console.log('Image files after filtering:', imageFiles.length)
      }

      // Generate public URLs and categorize each file
      const designsWithUrls = imageFiles.map((file) => {
        const { data } = supabase.storage
          .from('designs')
          .getPublicUrl(`catalog/${file.name}`)

        return {
          name: file.name,
          publicUrl: data.publicUrl,
          category: categorizeDesign(file.name),
        }
      })

      setDesigns(designsWithUrls)
      setFilteredDesigns(designsWithUrls)
      setHasMore(files.length === LIMIT)
    } catch (err) {
      console.error('Error fetching designs:', err)
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to load designs. Please try again later.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchDesigns()
  }, [fetchDesigns])

  // Filter designs when category changes
  useEffect(() => {
    if (activeCategory === 'ALL') {
      setFilteredDesigns(designs)
    } else {
      setFilteredDesigns(
        designs.filter((design) => design.category === activeCategory)
      )
    }
  }, [activeCategory, designs])

  const handlePrevPage = () => {
    if (page > 0) {
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
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4 text-purple">
            {config.title}
          </h1>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && (
          <ErrorState error={error} onRetry={fetchDesigns} />
        )}

        {/* Empty State */}
        {!loading && !error && designs.length === 0 && <EmptyState />}

        {/* Category Tabs and Grid */}
        {!loading && !error && designs.length > 0 && (
          <>
            <CategoryFilter
              designs={designs}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Design Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {filteredDesigns.map((design) => (
                <DesignCard
                  key={design.name}
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
