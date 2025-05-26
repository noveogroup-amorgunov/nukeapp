import type { ProductId } from '@/entities/product'
import type { ProductDetailsDto } from '../api/types'
import type { ProductDetails } from '../model/types'

export function mapProductDetails(dto: ProductDetailsDto): ProductDetails {
  return {
    id: dto.id as ProductId,
    name: dto.name,
    label: dto.badge,
    subname: dto.subtitle,
    price: dto.discountPrice ?? dto.price,
    oldPrice: dto.price,
    mainImage: dto.imageUrl[0],
    images: dto.detailsImageUrl.length > 0 ? dto.detailsImageUrl : Array.from({ length: 3 }).fill(dto.imageUrl[0]) as Url[],
    description: dto.description ?? '',
  }
}
