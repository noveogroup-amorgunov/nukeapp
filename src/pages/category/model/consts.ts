import type { ProductSortBy } from './types'

/** Default Sort per GLOSSARY; never serialized to the URL. */
export const DEFAULT_SORT_BY: ProductSortBy = 'Featured'

export const productSortByNamesMap: Record<ProductSortBy, string> = {
  Featured: 'Featured',
  Newest: 'Newest',
  PriceHighLow: 'Price: High-Low',
  PriceLowHigh: 'Price: Low-High',
} as const
