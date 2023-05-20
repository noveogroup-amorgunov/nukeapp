export {
  type Product,
  type ProductDetails,
  type ProductId,
} from './model/types'
export { ProductCard } from './ui/ProductCard/ProductCard'
export { mapProduct } from './lib/mapProduct'
export { formatPrice } from './lib/formatPrice'
export {
  usePopularProductsQuery,
  useProductDetailsQuery,
} from './api/productApi'

export { transformProductDetailsToProduct } from './lib/transformProductDetailsToProduct'
