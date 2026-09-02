import { productsMock } from '@/shared/lib/server'
import type { ProductDto } from '../types'

// Example with faker
// import { faker } from '@faker-js/faker'
// const price = faker.datatype.number({ max: 50000, min: 500 })
// id: faker.datatype.number(),
// imageUrl: initialProps.imageUrl ?? [faker.image.food(150, 150)],
// name: faker.commerce.productName(),
// subtitle: faker.commerce.productDescription(),
// description: faker.commerce.productMaterial(),
// price,
// discountPrice: faker.datatype.number({ min: 1, max: price }),

export function mockProductDto(
  initialProps: Partial<ProductDto> = {},
): ProductDto {
  return {
    ...productsMock[0],
    ...initialProps,
  }
}
