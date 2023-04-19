export type ProductId = Brand<Id, 'ProductId'>

export type Product = {
  id: ProductId
  name: string
  subname: string
  label: string
  image: Url
  price: Penny
  oldPrice?: Penny
}
