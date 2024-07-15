import { type Product } from '@/entities/product'
import { type ProductDetails } from '../model/types'

export function transformProductDetailsToProduct(
  productDetails: ProductDetails
): Product {
  return {
    id: productDetails.id,
    stocks: productDetails.stocks,
    name: productDetails.name,
    label: productDetails.label,
    subname: productDetails.subname,
    price: productDetails.price,
    oldPrice: productDetails.oldPrice,
    image: productDetails.mainImage,
  }
}
