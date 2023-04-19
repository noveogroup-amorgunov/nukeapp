import categories from './categories.json'
import { type CategoryDto } from '../types'

export function mockPopularCategoriesDto() {
  return categories.filter((category) => category.popular) as CategoryDto[]
}
