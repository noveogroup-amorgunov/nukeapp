import { useParams } from 'react-router-dom'
// import { useCategoryDetailsQuery } from '@/entities/category'
// import { ProductList } from '@/widgets/ProductList'

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>()

  // const { data, isFetching } = useProductDetailsQuery(
  //   Number.parseInt(categoryId ?? '1', 10)
  // )

  // if (isFetching) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }

  // if (!data?.products) {
  //   return null
  // }

  return (
    <div>
      <h1>{productId}</h1>
      productId: {productId}
    </div>
  )
}
