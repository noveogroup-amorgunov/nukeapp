import { type CategoryDto } from '../types'
import categories from './categories.json'

export function mockPopularCategoriesDto() {
  return categories.filter((category) => category.popular) as CategoryDto[]
}
