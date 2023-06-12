/**
 * 👇 ATTENTION (FSD)
 *
 * For entity cross imports using experimental feature
 * Explicit index files for every pair of slices that need cross-importing
 * @see https://github.com/feature-sliced/documentation/discussions/390#discussioncomment-5570073
 */
export type { ProductDto } from '../api/types'
export type { Product, ProductId } from '../model/types'
export { mapProduct } from '../lib/mapProduct'
