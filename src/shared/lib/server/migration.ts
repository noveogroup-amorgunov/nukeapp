import { config } from '@/shared/lib'
import categoriesMock from './__mocks__/categories.json'
import productsMock from './__mocks__/products.json'
import { db } from './serverDb'

export function startDatabaseMigration() {
  const users = db.user.getAll()

  // Data already exists by persist(db)
  if (users.length > 0) {
    return
  }

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

  db.cart.create({
    id: 1,
    user,
    version: 0,
    itemsProductId: [],
    itemsProductQuantity: [],
  })
}
