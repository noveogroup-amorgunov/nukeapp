import { mapProduct } from '@/entities/product/@x/category'
import type { CategoryWithProductsDto } from '../api/types'
import type { CategoryWithProducts } from '../model/types'
import { mapCategory } from './mapCategory'

export function mapCategoryWithProducts(
  dto: CategoryWithProductsDto,
): CategoryWithProducts {
  return {
    ...mapCategory(dto),
    products: dto.products.map(productDto => mapProduct(productDto)),
  }
}
