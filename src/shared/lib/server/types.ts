import { type db } from './serverDb'

type DatabaseApiType = typeof db

export type CartDatabaseModel = NonNullable<
  ReturnType<DatabaseApiType['cart']['findFirst']>
>

export type ProductDatabaseModel = NonNullable<
  ReturnType<DatabaseApiType['product']['findFirst']>
>

export type CategoryDatabaseModel = NonNullable<
  ReturnType<DatabaseApiType['category']['findFirst']>
>

export type UserDatabaseModel = NonNullable<
  ReturnType<DatabaseApiType['user']['findFirst']>
>

export type WishlistDatabaseModel = NonNullable<
  ReturnType<DatabaseApiType['wishlist']['findFirst']>
>
