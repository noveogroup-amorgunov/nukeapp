import { baseApi, CART_TAG } from '@/shared/api'
import { mapCart } from '../lib/mapCart'
import type { Cart } from '../model/types'
import type { CartItemDto } from './types'
import { cartDtoSchema } from './types'

export const cartApi = baseApi.injectEndpoints({
  endpoints: build => ({
    cart: build.query<Cart, void>({
      query: () => ({
        url: `/cart`,
      }),
      providesTags: [CART_TAG],
      /**
       * ✅ DX Best practice (Type safe)
       *
       * By default response is any (see BaseQueryResult)
       * Set response as unknown and validate it by zod schema
       *
       * @see node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes.d.ts
       */
      transformResponse: (response: unknown) => mapCart(cartDtoSchema.parse(response)),
    }),
    updateCart: build.mutation<object, { items: CartItemDto[], version: number }>({
      query: ({ items, version }) => ({
        url: `/cart`,
        method: 'PATCH',
        body: { items, version },
        params: { delay: 500 },
      }),
      invalidatesTags: [CART_TAG],
    }),
  }),
})

export const { useCartQuery, useUpdateCartMutation } = cartApi
