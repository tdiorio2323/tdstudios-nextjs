'use client'

import { antiSaveStyles } from '@/hooks/useAntiSaveProtection'
import { CATEGORIES } from '@/lib/catalogConfig'

/**
 * Horizontal scrollable category filter tabs
 */
export default function CategoryFilter({ designs, activeCategory, onCategoryChange }) {
  return (
    <div className="mb-8 -mx-4 px-4">
      <div className="flex gap-2 overflow-x-auto pb-4 snap-x snap-mandatory">
        {CATEGORIES.map((category) => {
          const count =
            category === 'ALL'
              ? designs.length
              : designs.filter((d) => d.category === category).length

          // Hide empty categories (except ALL)
          if (category !== 'ALL' && count === 0) return null

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                flex-shrink-0 snap-start px-4 py-2 rounded-full font-medium text-sm
                transition-all duration-200 whitespace-nowrap
                ${
                  activeCategory === category
                    ? 'bg-purple text-white shadow-lg shadow-purple/50'
                    : 'bg-charcoal text-light-gray hover:bg-charcoal/80 hover:text-white border border-gray'
                }
              `}
              style={antiSaveStyles.base}
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
  )
}
