import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useCategoryDetailsQuery } from '@/entities/category'
import type { CategoryId } from '@/entities/category/model/types'
import { useFeatureToggle } from '@/entities/featureToggle'
import { type ProductSortBy, SortByDropdown } from '@/features/product/sortBy'
import { useTypedParams, useTypedQueryParams } from '@/shared/lib/router'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { PageHeader } from '@/shared/ui'
import { BaseProductList } from '@/widgets/BaseProductList'
import { categoryPageSlice } from '../../model/slice'

const pageParamsSchema = z.object({
  categoryId: z.coerce
    .number()
    .positive()
    .transform(value => value as CategoryId),
})

const pageQueryParamsSchema = z.object({
  sortBy: z
    .enum(['Featured', 'Newest', 'PriceHighLow', 'PriceLowHigh'])
    .optional()
    .transform(value => value as ProductSortBy | undefined)
    .catch(undefined),
})

export function CategoryPage() {
  const { categoryId } = useTypedParams(pageParamsSchema)
  const { sortBy: initialSortBy } = useTypedQueryParams(pageQueryParamsSchema)
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector(categoryPageSlice.selectors.sortBy)
  const sortByIsEnabled = useFeatureToggle('productsSort')

  useLayoutEffect(() => {
    if (initialSortBy && sortBy !== initialSortBy) {
      dispatch(categoryPageSlice.actions.change(initialSortBy))
    }
  }, [])

  const { data, isFetching, isLoading } = useCategoryDetailsQuery({
    categoryId,
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
        Category not found, go to
        {' '}
        <Link to="/">main page</Link>
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
                dispatch(categoryPageSlice.actions.change(sortBy))}
            />
          )
        }
      />
      <BaseProductList isFetching={isFetching} products={data.products} />
    </div>
  )
}
