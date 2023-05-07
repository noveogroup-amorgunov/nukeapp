import { type ProductDetailsDto } from '../api/types'
import { type ProductDetails, type ProductId } from '../model/types'

export function mapProductDetails(dto: ProductDetailsDto): ProductDetails {
  return {
    id: dto.id as ProductId,
    name: dto.name,
    label: dto.badge,
    subname: dto.subtitle,
    price: dto.discountPrice ?? dto.price,
    oldPrice: dto.price,
    images: dto.detailsImageUrl ?? [],
    description: dto.description ?? '',
  }
}
