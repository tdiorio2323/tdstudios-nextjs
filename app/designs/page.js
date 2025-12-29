'use client'

import { CatalogGrid } from '@/components/catalog'
import { catalogConfigs } from '@/lib/catalogConfig'

/**
 * Design Catalog page
 * Displays the TD Studios design collection with watermarks
 */
export default function Designs() {
  return <CatalogGrid config={catalogConfigs.designs} />
}
