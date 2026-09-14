import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectCartQuantityByProductId } from '@/entities/cart'
import { mapProductToCompactView } from '@/entities/product'
import { useAppSelector } from '@/shared/redux'
import { ProductGrid } from '@/shared/ui'
import { useGetPopularProductsQuery } from '../../api/popularProductsApi'
import css from './ProductPopularList.module.css'

export function ProductPopularList() {
  const { data = [], isFetching } = useGetPopularProductsQuery()
  const navigate = useNavigate()
  const quantityByProductId = useAppSelector(selectCartQuantityByProductId)

  const products = useMemo(() => data.map(mapProductToCompactView), [data])

  const handleProductClick = useCallback(
    (productId: string) => {
      navigate(`/product/${productId}`)
    },
    [navigate],
  )

  if (data.length < 1) {
    return null
  }

  return (
    <div className={css.root}>
      <h2>Featured products</h2>
      {isFetching && products.length === 0
        ? <div>Fetching...</div>
        : (
            <ProductGrid
              products={products}
              quantityByProductId={quantityByProductId}
              columns="auto"
              onProductClick={handleProductClick}
            />
          )}
    </div>
  )
}
