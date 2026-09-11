import { useCallback, useLayoutEffect, useMemo } from 'react'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { selectCartQuantityByProductId } from '@/entities/cart'
import { useCategoryDetailsQuery } from '@/entities/category'
import type { CategoryId } from '@/entities/category'
import { useFeatureToggle } from '@/entities/featureToggle'
import { mapProductToCompactView } from '@/entities/product'
import { useTypedParams, useTypedQueryParams } from '@/shared/lib/router'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { PageHeader, ProductGrid } from '@/shared/ui'
import { categoryPageSlice } from '../../model/slice'
import type { ProductSortBy } from '../../model/types'
import { SortByDropdown } from '../SortByDropdown/SortByDropdown'
import css from './Page.module.css'

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
  const navigate = useNavigate()
  const sortBy = useAppSelector(categoryPageSlice.selectors.sortBy)
  const sortByIsEnabled = useFeatureToggle('productsSort')

  useLayoutEffect(() => {
    if (initialSortBy && sortBy !== initialSortBy) {
      dispatch(categoryPageSlice.actions.changeSortBy(initialSortBy))
    }
  }, [])

  const { data, isFetching, isLoading } = useCategoryDetailsQuery({
    categoryId,
    sortBy,
  })

  const products = useMemo(
    () => data?.products.map(mapProductToCompactView) ?? [],
    [data],
  )

  const quantityByProductId = useAppSelector(selectCartQuantityByProductId)

  const handleProductClick = useCallback(
    (productId: string) => {
      navigate(`/product/${productId}`)
    },
    [navigate],
  )

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

  if (isFetching && products.length === 0) {
    return (
      <div>
        <PageHeader title={data.name} />
        <div>Fetching...</div>
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
                dispatch(categoryPageSlice.actions.changeSortBy(sortBy))}
            />
          )
        }
      />
      <div
        className={cn(
          css.grid,
          isFetching && products.length > 0 && css.gridFetching,
        )}
      >
        <ProductGrid
          products={products}
          quantityByProductId={quantityByProductId}
          columns="auto"
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  )
}
