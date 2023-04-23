import { productsMock } from '@/entities/product/@x/category'
import { type CategoryWithProductsDto } from '../types'
import categories from './categories.json'

export function mockCategoryDtoById(
  id: number
): Nullable<CategoryWithProductsDto> {
  const category = categories.find((category) => category.id === id)

  if (!category) {
    return null
  }

  return {
    ...category,
    products: productsMock.filter((product) => product.categoryId === id),
  }
}
