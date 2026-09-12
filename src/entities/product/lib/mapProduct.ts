import type { Product as ProductDto } from '@/shared/api'
import type { Product, ProductId } from '../model/types'

export function mapProduct(dto: ProductDto): Product {
  return {
    id: dto.id as ProductId,
    stock: dto.stock,
    name: dto.name,
    label: dto.badge,
    subname: dto.subtitle,
    price: dto.discountPrice ?? dto.price,
    oldPrice: dto.price,
    image: dto.imageUrl[0],
  }
}
