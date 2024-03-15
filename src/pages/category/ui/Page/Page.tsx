import { Link, useParams } from 'react-router-dom'
import { useCategoryDetailsQuery } from '@/entities/category'
import { useFeatureToggle } from '@/entities/featureToggle'
import { type ProductSortBy, SortByDropdown } from '@/features/product/sortBy'
import { useAppSelector, useAppDispatch } from '@/shared/model'
import { PageHeader } from '@/shared/ui'
import { BaseProductList } from '@/widgets/BaseProductList'
import { selectSortBy, changeSortBy } from '../../model/slice'

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector(selectSortBy)
  const sortByIsEnabled = useFeatureToggle('productsSort')

  console.log(sortByIsEnabled)

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
      <PageHeader
        title={data.name}
        rightSlot={
          sortByIsEnabled && (
            <SortByDropdown
              defaultSortBy={sortBy}
              onChange={(sortBy: ProductSortBy) =>
                dispatch(changeSortBy(sortBy))
              }
            />
          )
        }
      />
      <BaseProductList isFetching={isFetching} products={data.products} />
    </div>
  )
}
