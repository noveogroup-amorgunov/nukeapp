import { env } from '@/shared/lib'
import categoriesMock from './__mocks__/categories.json'
import productsMock from './__mocks__/products.json'
import { db } from './serverDb'

type CreateUserParams = {
  email: string
  password: string
}

const idCounters: Record<string, number> = {}

function generateId(tableName: string) {
  idCounters[tableName] = idCounters[tableName] || 1

  return idCounters[tableName]++
}

function createUser(userData: CreateUserParams) {
  const user = db.user.create({ ...userData, id: generateId('user') })

  db.wishlist.create({
    id: generateId('wishlist'),
    user,
    productIds: [3, 4, 5, 6, 7],
  })

  db.cart.create({
    id: generateId('cart'),
    user,
    version: 0,
    itemsProductId: [],
    itemsProductQuantity: [],
  })
}

export function startDatabaseMigration() {
  const users = db.user.getAll()

  // Data already exists by persist(db)
  if (users.length > 0) {
    return
  }

  // create test users
  createUser({
    email: env.VITE_API_USER_EMAIL,
    password: env.VITE_API_USER_PASSWORD,
  })
  createUser({ email: 'test@ya.ru', password: '123456' })

  categoriesMock.forEach((row) => db.category.create(row))

  productsMock.forEach((row) => db.product.create(row))
}
