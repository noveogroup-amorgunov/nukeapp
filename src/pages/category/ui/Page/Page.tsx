import { Link, useParams } from 'react-router-dom'
import { useCategoryDetailsQuery } from '@/entities/category'
import { useAppSelector } from '@/shared/model'
import { ProductList } from '@/widgets/ProductList'
import { selectSortBy } from '../../model/slice'
import { PageHeader } from '../PageHeader/PageHeader'

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const sortBy = useAppSelector(selectSortBy)

  // TODO: Add zod validation
  const { data, isFetching, isLoading } = useCategoryDetailsQuery({
    categoryId: Number.parseInt(categoryId ?? '1', 10),
    sortBy,
  })

  /**
   * Use isLoading for only first loading
   * For next loading use isFetching
   */
  if (isLoading) {
    return (
      <div>
        <h1 className="text_2xl">Loading...</h1>
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
      <PageHeader category={data} />
      <ProductList isFetching={isFetching} products={data.products} />
    </div>
  )
}
