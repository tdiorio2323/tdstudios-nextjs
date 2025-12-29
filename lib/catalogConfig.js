/**
 * Catalog configuration and utilities
 * Shared between /designs and /gsopackaging pages
 */

// Category configuration - exact order specified
export const CATEGORIES = [
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
export const CATEGORY_MATCHERS = {
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

/**
 * Normalize filename for category matching
 * Converts to lowercase and replaces underscores/hyphens with spaces
 */
export function normalizeFilename(filename) {
  return filename.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' ')
}

/**
 * Categorize a design based on its filename
 * Returns the category name or 'Uncategorized'
 */
export function categorizeDesign(filename) {
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

/**
 * Catalog page configurations
 */
export const catalogConfigs = {
  designs: {
    title: 'Design Catalog',
    description: 'Browse our collection of custom designs.',
    watermarkImage: '/images/td-studios-xmas-logo.png',
    watermarkAlt: 'TD Studios',
  },
  gsopackaging: {
    title: 'GSO Packaging',
    description: 'Browse our collection of GSO Packaging designs.',
    watermarkImage: '/images/gso-packaging-overlay.png',
    watermarkAlt: 'GSO Packaging',
  },
}
