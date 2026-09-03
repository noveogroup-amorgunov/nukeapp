import { z } from 'zod'
import { productDtoSchema } from '@/entities/product/@x/cart'

export const cartItemDtoSchema = z.object({
  productId: z.number().positive(),
  quantity: z.number().positive(),
})

export type CartItemDto = z.infer<typeof cartItemDtoSchema>

export const cartDtoSchema = z.object({
  cartItems: z.array(
    z.object({
      product: productDtoSchema,
      quantity: z.number().positive(),
    }),
  ),
  deliveryPrice: z.number().nonnegative(),
  version: z.number().int().positive(),
})

export type CartDto = z.infer<typeof cartDtoSchema>
