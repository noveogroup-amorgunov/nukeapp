export type ProductDetailsDto = {
  id: number
  stock: number
  name: string
  badge: string
  subtitle: string
  discountPrice?: number
  price: number
  imageUrl: string[]

  detailsImageUrl: string[]
  description: string
}
