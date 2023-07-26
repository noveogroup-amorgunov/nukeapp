import { type CategoryDatabaseModel } from '@/shared/lib/server'
import { type CategoryDto } from '../types'

export function mockCategoryDto(
  categories: CategoryDatabaseModel[]
): CategoryDto[] {
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    imageUrl: category.imageUrl,
  }))
}
