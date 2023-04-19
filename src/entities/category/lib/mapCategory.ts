import { type CategoryDto } from '../api/types'
import { type Category, type CategoryId } from '../model/types'

export function mapCategory(dto: CategoryDto): Category {
  return {
    id: dto.id as CategoryId,
    name: dto.name,
    image: dto.imageUrl[0],
  }
}
