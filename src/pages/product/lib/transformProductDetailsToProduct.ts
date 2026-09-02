import type { ProductDetails } from '../model/types'
import type { Product } from '@/entities/product'

export function transformProductDetailsToProduct(
  productDetails: ProductDetails,
): Product {
  return {
    id: productDetails.id,
    name: productDetails.name,
    label: productDetails.label,
    subname: productDetails.subname,
    price: productDetails.price,
    oldPrice: productDetails.oldPrice,
    image: productDetails.mainImage,
  }
}
