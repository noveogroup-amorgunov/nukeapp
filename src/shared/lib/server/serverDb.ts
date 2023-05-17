import { factory, nullable, oneOf, primaryKey } from '@mswjs/data'

/**
 * Its database, which using only in @mswjs "server" handlers
 * This handlers run in the browser (client side) and emulate
 * work with real API and database
 */
export const db = factory({
  user: {
    id: primaryKey(Number),
    email: String,
    password: String,
  },
  wishlist: {
    id: primaryKey(Number),
    user: oneOf('user'),
    productIds: (): number[] => [],
  },
  product: {
    id: primaryKey(Number),
    categoryId: Number,
    popular: Boolean,
    name: String,
    description: nullable(String),
    badge: String,
    subtitle: String,
    price: Number,
    discountPrice: Number,
    inStock: Boolean,
    imageUrl: (): string[] => [],
    detailsImageUrl: nullable((): string[] => []),
  },
  category: {
    id: primaryKey(Number),
    popular: Boolean,
    name: String,
    imageUrl: (): string[] => [],
  },
})
