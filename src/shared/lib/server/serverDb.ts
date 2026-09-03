import { Collection } from '@msw/data'
import { z } from 'zod'
import { env } from '../env'
import { persist } from './persistExtension'

/**
 * Its database, which using only in @msw "server" handlers
 * This handlers run in the browser (client side) and emulate
 * work with real API and database
 */

const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
})

const wishlistSchema = z.object({
  id: z.number(),
  get user() {
    return userSchema
  },
  productIds: z.array(z.number()),
})

const cartSchema = z.object({
  id: z.number(),
  get user() {
    return userSchema
  },
  version: z.number(),
  itemsProductId: z.array(z.number()),
  itemsProductQuantity: z.array(z.number()),
})

const productSchema = z.object({
  id: z.number(),
  // Products in the mock data may not belong to any category
  categoryId: z.number().optional(),
  popular: z.boolean(),
  name: z.string(),
  description: z.string().nullish(),
  badge: z.string(),
  subtitle: z.string(),
  price: z.number(),
  discountPrice: z.number(),
  inStock: z.boolean(),
  imageUrl: z.array(z.string()),
  detailsImageUrl: z.array(z.string()).nullish(),
})

const categorySchema = z.object({
  id: z.number(),
  popular: z.boolean(),
  name: z.string(),
  imageUrl: z.array(z.string()),
})

const storage
  = env.VITE_API_STORAGE_MODE === 'local' ? localStorage : sessionStorage

const usersPersist = persist({ name: 'user', storage })
const wishlistsPersist = persist({ name: 'wishlist', storage })
const cartsPersist = persist({ name: 'cart', storage })
const productsPersist = persist({ name: 'product', storage })
const categoriesPersist = persist({ name: 'category', storage })

const users = new Collection({
  schema: userSchema,
  extensions: [usersPersist.extension],
})
const wishlists = new Collection({
  schema: wishlistSchema,
  extensions: [wishlistsPersist.extension],
})
const carts = new Collection({
  schema: cartSchema,
  extensions: [cartsPersist.extension],
})
const products = new Collection({
  schema: productSchema,
  extensions: [productsPersist.extension],
})
const categories = new Collection({
  schema: categorySchema,
  extensions: [categoriesPersist.extension],
})

wishlists.defineRelations(({ one }) => ({
  user: one(users),
}))

carts.defineRelations(({ one }) => ({
  user: one(users),
}))

export const db = {
  user: users,
  wishlist: wishlists,
  cart: carts,
  product: products,
  category: categories,
}

/**
 * Resolves when all the collections are hydrated from the storage.
 * Await it before reading or seeding the database.
 */
export const dbHydration = Promise.all([
  usersPersist.hydration,
  wishlistsPersist.hydration,
  cartsPersist.hydration,
  productsPersist.hydration,
  categoriesPersist.hydration,
]).then(() => undefined)
