import type { ProductDto } from '../api/types'
import type { Product, ProductId } from '../model/types'

export function mapProduct(dto: ProductDto): Product {
  return {
    id: dto.id as ProductId,
    name: dto.name,
    label: dto.badge,
    subname: dto.subtitle,
    price: dto.discountPrice ?? dto.price,
    oldPrice: dto.price,
    image: dto.imageUrl[0],
  }
}
