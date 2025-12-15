'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'

// Category configuration - exact order specified
const CATEGORIES = [
  'ALL',
  'Nerds',
  'Dirty Fanta',
  'Hi-C',
  'Mamba',
  'Ring Pop',
  'Skittles',
  'Hi-Chew',
  'Creme Savers',
  'Calypso',
]

// Category matching keywords (normalized for searching)
const CATEGORY_MATCHERS = {
  Nerds: ['nerds'],
  'Dirty Fanta': ['df', 'dirty fanta', 'dirtyfanta', 'dirty-fanta'],
  'Hi-C': ['hi-c', 'hic', 'hi c'],
  Mamba: ['mamba'],
  'Ring Pop': ['ring pop', 'ringpop', 'ring-pop'],
  Skittles: ['skittles'],
  'Hi-Chew': ['hi-chew', 'hichew', 'hi chew'],
  'Creme Savers': ['creme savers', 'cremesavers', 'creme-savers'],
  Calypso: ['calypso'],
}

// Normalize filename for matching
const normalizeFilename = (filename) => {
  return filename.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ')
}

// Categorize a design based on filename
const categorizeDesign = (filename) => {
  const normalized = normalizeFilename(filename)

  for (const [category, keywords] of Object.entries(CATEGORY_MATCHERS)) {
    for (const keyword of keywords) {
      if (normalized.includes(keyword)) {
        return category
      }
    }
  }

  return 'Uncategorized'
}

export default function Designs() {
  const [designs, setDesigns] = useState([])
  const [filteredDesigns, setFilteredDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('ALL')

  const LIMIT = 200

  // Deterrence: Prevent common save vectors
  const handleContextMenu = (e) => {
    e.preventDefault()
    if (process.env.NODE_ENV === 'development') {
      console.log('Context menu blocked')
    }
  }

  const handleDragStart = (e) => {
    e.preventDefault()
    if (process.env.NODE_ENV === 'development') {
      console.log('Drag blocked')
    }
  }

  const handleTouchStart = (e) => {
    // Prevent long-press on iOS
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }

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
          sortBy: { column: 'name', order: 'asc' },
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
          !file.id?.endsWith('/') &&
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
      // Provide user-friendly error message
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

  // Deterrence: Block common keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (process.env.NODE_ENV === 'development') {
          console.log('Save shortcut blocked')
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        if (process.env.NODE_ENV === 'development') {
          console.log('Print shortcut blocked')
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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

  const openModal = (design) => {
    setSelectedImage(design)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Deterrence: Top-level wrapper with anti-save handlers */}
      <div
        className="container mx-auto px-4 py-16 mt-16"
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4 text-purple">
            Design Catalog
          </h1>
          <p className="text-lg text-light-gray max-w-2xl mx-auto">
            Browse our collection of custom designs. Click any image to view it in full size.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <div className="bg-charcoal border border-pink/20 rounded-lg p-8">
              <svg
                className="mx-auto h-12 w-12 text-pink mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-white mb-2">Configuration Error</h2>
              <p className="text-pink text-base mb-6">{error}</p>
              {error.includes('environment variables') && (
                <div className="bg-black/50 rounded p-4 mb-6 text-left">
                  <p className="text-light-gray text-sm mb-2">To fix this issue:</p>
                  <ol className="text-light-gray text-sm space-y-1 list-decimal list-inside">
                    <li>Go to your Vercel dashboard</li>
                    <li>Navigate to Settings → Environment Variables</li>
                    <li>Add NEXT_PUBLIC_SUPABASE_URL</li>
                    <li>Add NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                    <li>Redeploy your application</li>
                  </ol>
                </div>
              )}
              <button
                onClick={fetchDesigns}
                className="px-6 py-3 border border-purple text-white hover:bg-purple hover:border-purple transition-all rounded"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && designs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-light-gray text-lg">
              No designs found in the catalog.
            </p>
          </div>
        )}

        {/* Category Tabs - Horizontal Scrollable */}
        {!loading && !error && designs.length > 0 && (
          <>
            <div className="mb-8 -mx-4 px-4">
              <div className="flex gap-2 overflow-x-auto pb-4 snap-x snap-mandatory">
                {CATEGORIES.map((category) => {
                  const count =
                    category === 'ALL'
                      ? designs.length
                      : designs.filter((d) => d.category === category).length

                  if (category !== 'ALL' && count === 0) return null

                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`
                        flex-shrink-0 snap-start px-4 py-2 rounded-full font-medium text-sm
                        transition-all duration-200 whitespace-nowrap
                        ${
                          activeCategory === category
                            ? 'bg-purple text-white shadow-lg shadow-purple/50'
                            : 'bg-charcoal text-light-gray hover:bg-charcoal/80 hover:text-white border border-gray'
                        }
                      `}
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTouchCallout: 'none',
                      }}
                    >
                      {category}
                      {count > 0 && (
                        <span
                          className={`ml-2 ${
                            activeCategory === category
                              ? 'text-white/80'
                              : 'text-light-gray/60'
                          }`}
                        >
                          ({count})
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Design Grid - 2 columns on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {filteredDesigns.map((design) => (
                <div
                  key={design.name}
                  className="group relative overflow-hidden rounded-lg border border-charcoal bg-black hover:border-purple transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => openModal(design)}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                  }}
                >
                  <div className="aspect-[4/5] relative">
                    {/* Image with anti-save attributes */}
                    <img
                      src={design.publicUrl}
                      alt={design.name}
                      className="w-full h-full object-contain bg-black"
                      loading="lazy"
                      draggable="false"
                      onDragStart={handleDragStart}
                      onContextMenu={handleContextMenu}
                      style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitUserDrag: 'none',
                      }}
                    />

                    {/* TD Studios Logo Watermark - Center */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                      }}
                    >
                      <Image
                        src="/images/td-studios-xmas-logo.png"
                        alt="TD Studios"
                        width={500}
                        height={500}
                        className="w-[65%] h-auto"
                        style={{
                          maxWidth: '780px',
                          opacity: 0.85,
                          pointerEvents: 'none',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          WebkitUserDrag: 'none',
                        }}
                        draggable="false"
                        priority={false}
                      />
                    </div>

                    {/* Transparent Overlay - Captures pointer events */}
                    <div
                      className="absolute inset-0 bg-transparent z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal(design)
                      }}
                      onContextMenu={handleContextMenu}
                      onDragStart={handleDragStart}
                      onTouchStart={(e) => {
                        handleTouchStart(e)
                        e.stopPropagation()
                      }}
                      style={{
                        cursor: 'pointer',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTouchCallout: 'none',
                      }}
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
                      <span className="text-white font-medium text-sm md:text-base">
                        View Full Size
                      </span>
                    </div>
                  </div>
                  <div className="p-2 md:p-3 bg-black">
                    <p className="text-xs md:text-sm text-white truncate">
                      {design.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty filtered state */}
            {filteredDesigns.length === 0 && (
              <div className="text-center py-20">
                <p className="text-light-gray text-lg">
                  No designs found in the "{activeCategory}" category.
                </p>
              </div>
            )}

            {/* Pagination */}
            {(page > 0 || hasMore) && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 0}
                  className="px-6 py-3 border border-white text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all"
                >
                  Previous
                </button>
                <span className="text-light-gray">Page {page + 1}</span>
                <button
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className="px-6 py-3 border border-white text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal/Lightbox for Full Size Viewing */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          onTouchStart={handleTouchStart}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[60] text-white hover:text-purple transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Full Size Image */}
              <img
                src={selectedImage.publicUrl}
                alt={selectedImage.name}
                className="max-w-full max-h-full object-contain"
                draggable="false"
                onDragStart={handleDragStart}
                onContextMenu={handleContextMenu}
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitUserDrag: 'none',
                }}
              />

              {/* TD Studios Logo Watermark - Center (Modal) */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <Image
                  src="/images/td-studios-xmas-logo.png"
                  alt="TD Studios"
                  width={600}
                  height={600}
                  className="w-[40%] h-auto"
                  style={{
                    maxWidth: '500px',
                    opacity: 0.85,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitUserDrag: 'none',
                  }}
                  draggable="false"
                  priority={false}
                />
              </div>

              {/* Transparent Overlay on Modal Image */}
              <div
                className="absolute inset-0 bg-transparent z-10"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                }}
              />
            </div>

            {/* Image Name */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 px-6 py-3 rounded-lg">
              <p className="text-white text-sm font-medium">
                {selectedImage.name}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
