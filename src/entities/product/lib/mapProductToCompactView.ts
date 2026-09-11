import type { ProductCompactView } from '@/shared/ui'
import type { Product } from '../model/types'

export function mapProductToCompactView(product: Product): ProductCompactView {
  return {
    id: String(product.id),
    name: product.name,
    specification: product.subname,
    imageUrl: product.image,
    price: product.price,
    oldPrice: product.oldPrice,
    stock: product.stock,
  }
}
