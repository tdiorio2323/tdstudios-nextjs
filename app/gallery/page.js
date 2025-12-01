'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getDesigns, getDesignUrl } from '@/lib/supabase'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      try {
        const files = await getDesigns()

        // Filter for image files
        let imageFiles = files
          .filter(file => file.name !== '.emptyFolderPlaceholder' && !file.name.startsWith('.'))
          .map(file => ({
            src: getDesignUrl(file.name),
            alt: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
            name: file.name,
            created_at: file.created_at || file.updated_at || new Date().toISOString() // Fallback
          }))

        // Sort by recently added (newest first)
        imageFiles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        // Prioritize "exgire" image if it exists
        const exgireIndex = imageFiles.findIndex(img => img.name.toLowerCase().includes('exgire'))
        if (exgireIndex > -1) {
          const exgireImage = imageFiles.splice(exgireIndex, 1)[0]
          imageFiles.unshift(exgireImage)
        }

        setImages(imageFiles)
      } catch (error) {
        console.error('Error loading gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-black relative pb-16">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--pink)_0%,transparent_70%)] blur-[80px] opacity-10 animate-[float_20s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--purple)_0%,transparent_70%)] blur-[80px] opacity-10 animate-[float_20s_ease-in-out_infinite_10s]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-8 md:px-16 border-b border-white/5 backdrop-blur-xl bg-black/80">
        <Link href="/" className="flex items-center gap-2 text-light-gray text-sm hover:text-white transition-colors duration-300">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 10H4M8 6l-4 4 4 4"/>
          </svg>
          Back
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-white font-normal">Gallery</h1>
        <div className="w-[60px]"></div>
      </header>

      {/* Content */}
      <div className="relative z-1 max-w-[1600px] mx-auto px-4 md:px-8 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray">
            <div className="w-12 h-12 border-4 border-white/10 border-t-pink rounded-full animate-spin mb-4"></div>
            <p>Loading gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray">
            <p>No images found in gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div
                key={image.name}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer bg-charcoal/60 backdrop-blur-md border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-pink/30 hover:shadow-xl"
                onClick={() => openLightbox(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading={index < 10 ? "eager" : "lazy"}
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
              </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[1000] flex items-center justify-center p-8 cursor-zoom-out"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:rotate-90"
              onClick={closeLightbox}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1920}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  )
}
