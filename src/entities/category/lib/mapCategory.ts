import type { Category as CategoryDto } from '@/shared/api'
import type { Category, CategoryId } from '../model/types'

export function mapCategory(dto: CategoryDto): Category {
  return {
    id: dto.id as CategoryId,
    name: dto.name,
    image: dto.imageUrl[0],
  }
}
