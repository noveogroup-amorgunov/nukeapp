import { z } from 'zod'
import { productDtoSchema } from '@/entities/product/@x/wishlist'

export const wishlistDtoSchema = z.array(productDtoSchema)

export type WishlistDto = z.infer<typeof wishlistDtoSchema>
