import { Link, useParams } from 'react-router-dom'
import { useCategoryDetailsQuery } from '@/entities/category'
import { ProductList } from '@/widgets/ProductList'

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()

  // TODO: Add zod validation
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
    return (
      <div>
        Category not found, go to <Link to="/">main page</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <ProductList products={data.products} />
    </div>
  )
}
