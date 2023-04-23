export type { ProductDto } from '../api/types'
export type { Product, ProductId } from '../model/types'
export { mapProduct } from '../lib/mapProduct'

// TODO: In production code mocks don't should pass in bundle
export { default as productsMock } from '../api/__mocks__/products.json'
