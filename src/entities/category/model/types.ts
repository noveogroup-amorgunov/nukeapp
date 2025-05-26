import type { EntitiesDomain } from '@/shared/domain'

export type CategoryId = Brand<Id, 'CategoryId'>

export type Category = {
  id: CategoryId
  name: string
  image: Url
}

export type CategoryWithProducts = Category & {
  products: EntitiesDomain['Product'][]
}
