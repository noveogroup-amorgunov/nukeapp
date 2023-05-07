export type ProductDto = {
  id: number
  name: string
  badge: string
  subtitle: string
  discountPrice?: number
  price: number
  imageUrl: string[]
}

export type ProductDetailsDto = ProductDto & {
  detailsImageUrl: string[]
  description: string
}
