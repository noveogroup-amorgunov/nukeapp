import { useParams } from 'react-router-dom'
import { useCategoryDetailsQuery } from '@/entities/category/api/categoryApi'
import { ProductList } from '@/widgets/ProductList/ProductList'

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()

  const { data, isFetching } = useCategoryDetailsQuery(
    Number.parseInt(categoryId ?? '1', 10)
  )

  if (isFetching) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!data?.products) {
    return null
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <ProductList products={data.products} />
    </div>
  )
}
