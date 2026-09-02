import { baseApi, CART_TAG } from '@/shared/api'
import { mapCart } from '../lib/mapCart'
import type { Cart } from '../model/types'
import type { CartDto, CartItemDto } from './types'

export const cartApi = baseApi.injectEndpoints({
  endpoints: build => ({
    cart: build.query<Cart, void>({
      query: () => ({
        url: `/cart`,
      }),
      providesTags: [CART_TAG],
      transformResponse: (response: CartDto) => mapCart(response),
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
