import { useCallback, useMemo } from 'react'
import cn from 'classnames'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { selectCartQuantityByProductId } from '@/entities/cart'
import { useGetCategoryDetailsQuery } from '@/entities/category'
import type { CategoryId } from '@/entities/category'
import { mapProductToCompactView } from '@/entities/product'
import { useAppSelector } from '@/shared/lib/redux'
import { useTypedParams, useTypedQueryParams } from '@/shared/lib/router'
import { useFeatureFlag } from '@/shared/services/featureFlags'
import { LayoutTitleSection, ProductGrid } from '@/shared/ui'
import { productSortByNamesMap } from '../../model/consts'
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
    .enum(
      Object.keys(productSortByNamesMap) as [
        ProductSortBy,
        ...Array<ProductSortBy>,
      ],
    )
    .optional()
    .catch(undefined),
})

export function CategoryPage() {
  const { categoryId } = useTypedParams(pageParamsSchema)
  const { sortBy: sortByParam } = useTypedQueryParams(pageQueryParamsSchema)
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const sortByIsEnabled = useFeatureFlag('productsSort')

  const sortBy = sortByIsEnabled ? sortByParam : undefined

  const { data, isFetching, isLoading } = useGetCategoryDetailsQuery({
    id: categoryId,
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

  const handleSortChange = useCallback(
    (sortBy: ProductSortBy) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (sortBy === 'Featured') {
            next.delete('sortBy')
          }
          else {
            next.set('sortBy', sortBy)
          }
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
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
        <LayoutTitleSection title={data.name} />
        <div>Fetching...</div>
      </div>
    )
  }

  return (
    <div data-fsd="page/category/Page">
      <LayoutTitleSection
        title={data.name}
        rightSlot={
          sortByIsEnabled && (
            <SortByDropdown
              sortBy={sortBy ?? 'Featured'}
              onChange={handleSortChange}
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
