/**
 * ✅ DX Best Practice
 * Use branded type to entity id to
 * don't to be confused with other identifiers
 */
export type ProductId = Brand<Id, 'ProductId'>

export type Product = {
  id: ProductId
  name: string
  subname: string
  label: string

  /**
   * ✅ DX Best Practice
   * Use type aliases for primitive types
   * to improve developer experience
   *
   * @see types/app.d.ts
   */
  image: Url
  price: Penny
  oldPrice?: Penny
}
