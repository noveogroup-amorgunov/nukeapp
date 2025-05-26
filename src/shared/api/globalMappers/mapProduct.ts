import type { EntitiesDomain } from '@/shared/domain'
import type { ProductDto } from './types'

// TODO: docs
export function mapProduct(dto: ProductDto): EntitiesDomain['Product'] {
  return {
    id: dto.id as EntitiesDomain['ProductId'],
    name: dto.name,
    label: dto.badge,
    subname: dto.subtitle,
    price: dto.discountPrice ?? dto.price,
    oldPrice: dto.price,
    image: dto.imageUrl[0],
  }
}
