'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { galleryImages } from '@/lib/visuals'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  // Use static gallery images from config
  const images = galleryImages

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <div className="gallery-container">
      {/* Background */}
      <div className="gallery-bg">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
      </div>

      {/* Header */}
      <header className="gallery-header">
        <Link href="/" className="back-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 10H4M8 6l-4 4 4 4"/>
          </svg>
          Back
        </Link>
        <h1 className="gallery-title">Gallery</h1>
        <div style={{ width: '60px' }}></div>
      </header>

      {/* Content */}
      <div className="gallery-content">
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={image.src}
              className="gallery-item"
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={750}
                className="w-full h-full object-cover"
                loading={index < 6 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
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
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-container {
          min-height: 100vh;
          background: #0a0a0a;
          position: relative;
          padding-bottom: 4rem;
        }

        .gallery-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 0;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.1;
          animation: float 20s ease-in-out infinite;
        }

        .gradient-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #c9a227 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }

        .gradient-orb-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #8b9a7d 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }

        .gallery-header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          background: rgba(10, 10, 10, 0.8);
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--light-gray);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .back-button:hover {
          color: var(--white);
        }

        .gallery-title {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem;
          font-weight: 400;
          color: var(--white);
        }

        .gallery-content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .gallery-loading,
        .gallery-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          color: var(--gray);
        }

        .gallery-empty svg {
          margin-bottom: 2rem;
          opacity: 0.3;
        }

        .gallery-empty h2 {
          font-size: 1.5rem;
          color: var(--white);
          margin-bottom: 0.5rem;
        }

        .gallery-empty p {
          color: var(--gray);
          font-size: 1rem;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-4px);
          border-color: rgba(201, 162, 39, 0.3);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          cursor: zoom-out;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          cursor: default;
        }

        .lightbox-content img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .gallery-header {
            padding: 1.5rem 2rem;
          }

          .gallery-title {
            font-size: 1.5rem;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
          }

          .gallery-content {
            padding: 2rem 1rem;
          }

          .lightbox-close {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  )
}
