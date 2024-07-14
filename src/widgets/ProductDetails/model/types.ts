import type { ProductId } from '@/entities/product'

export type ProductDetails = {
  id: ProductId
  name: string
  subname: string
  description: string
  label: string
  mainImage: Url
  images: Url[]
  price: Penny
  oldPrice?: Penny
}
