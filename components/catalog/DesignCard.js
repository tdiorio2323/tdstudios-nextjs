'use client'

import Image from 'next/image'
import { antiSaveStyles } from '@/hooks/useAntiSaveProtection'

/**
 * Diamond checker pattern watermark background
 */
const diamondPatternStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(167, 139, 250, 0.08) 20px,
      rgba(167, 139, 250, 0.08) 40px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      rgba(167, 139, 250, 0.08) 20px,
      rgba(167, 139, 250, 0.08) 40px
    )
  `,
  ...antiSaveStyles.base,
}

/**
 * Individual design card with watermark protection
 */
export default function DesignCard({ design, watermarkImage, watermarkAlt, handlers }) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-charcoal bg-black transition-all duration-300"
      onContextMenu={handlers.onContextMenu}
      onDragStart={handlers.onDragStart}
      style={antiSaveStyles.base}
    >
      <div className="aspect-[4/5] relative">
        {/* Image with anti-save attributes */}
        <img
          src={design.publicUrl}
          alt={design.name}
          className="w-full h-full object-contain bg-black"
          loading="lazy"
          draggable="false"
          onDragStart={handlers.onDragStart}
          onContextMenu={handlers.onContextMenu}
          style={antiSaveStyles.image}
        />

        {/* Diamond Checker Pattern Watermark - Layer 1 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={diamondPatternStyle}
        />

        {/* Logo Watermark - Layer 2 (Center) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={antiSaveStyles.base}
        >
          <Image
            src={watermarkImage}
            alt={watermarkAlt}
            width={500}
            height={500}
            className="w-[65%] h-auto"
            style={{
              maxWidth: '780px',
              opacity: 0.85,
              ...antiSaveStyles.image,
            }}
            draggable="false"
            priority={false}
          />
        </div>

        {/* Transparent Overlay - Prevents interaction */}
        <div
          className="absolute inset-0 bg-transparent z-10"
          onContextMenu={handlers.onContextMenu}
          onDragStart={handlers.onDragStart}
          onTouchStart={handlers.onTouchStart}
          style={antiSaveStyles.base}
        />
      </div>
      <div className="p-2 md:p-3 bg-black">
        <p className="text-xs md:text-sm text-white truncate">
          {design.name}
        </p>
      </div>
    </div>
  )
}
