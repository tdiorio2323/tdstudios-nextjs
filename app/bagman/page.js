'use client'

import { CatalogGrid } from '@/components/catalog'
import { catalogConfigs } from '@/lib/catalogConfig'

/**
 * Bagman Design Catalog page
 * Displays the full design collection with Bagman NY watermarks
 */
export default function Bagman() {
  return <CatalogGrid config={catalogConfigs.bagman} />
}
