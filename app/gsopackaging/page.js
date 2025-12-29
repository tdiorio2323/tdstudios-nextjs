'use client'

import { CatalogGrid } from '@/components/catalog'
import { catalogConfigs } from '@/lib/catalogConfig'

/**
 * GSO Packaging Catalog page
 * Displays the GSO Packaging design collection with watermarks
 */
export default function GsoPackaging() {
  return <CatalogGrid config={catalogConfigs.gsopackaging} />
}
