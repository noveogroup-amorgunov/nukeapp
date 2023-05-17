import { config } from '@/shared/lib'
import categoriesMock from './__mocks__/categories.json'
import productsMock from './__mocks__/products.json'
import { db } from './serverDb'

export function startDatabaseMigration() {
  // create test user
  const user = db.user.create({
    id: 1,
    email: config.API_USER_EMAIL,
    password: config.API_USER_PASSWORD,
  })

  categoriesMock.forEach((row) => db.category.create(row))

  productsMock.forEach((row) => db.product.create(row))

  db.wishlist.create({
    id: 1,
    user,
    productIds: [3, 4, 5, 6, 7],
  })
}
