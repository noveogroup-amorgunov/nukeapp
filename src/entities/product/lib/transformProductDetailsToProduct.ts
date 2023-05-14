import { type ProductDetails, type Product } from '../model/types'

export function transformProductDetailsToProduct(
  productDetails: ProductDetails
): Product {
  return {
    id: productDetails.id,
    name: productDetails.name,
    label: productDetails.label,
    subname: productDetails.subname,
    price: productDetails.price,
    oldPrice: productDetails.oldPrice,
    image: productDetails.images[0],
  }
}
