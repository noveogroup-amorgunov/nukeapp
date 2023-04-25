import { skipToken } from '@reduxjs/toolkit/dist/query'
import { selectIsAuthorize } from '@/entities/session'
import { useWishlistProductsQuery } from '@/entities/wishlist'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppSelector } from '@/shared/model'
import { ProductList } from '@/widgets/ProductList'
import css from './ProductWishlistList.module.css'

export function ProductWishlistList() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/ProductWishlistList')
  const isAuthorized = useAppSelector(selectIsAuthorize)

  const { data: products = [], isFetching } = useWishlistProductsQuery(
    isAuthorized ? undefined : skipToken,
    {
      skip: !isAuthorized,
    }
  )

  if (!isAuthorized) {
    return null
  }

  return (
    <div className={css.root} {...rootAttributes}>
      <h3>Wishlist ({isFetching ? '...' : products.length})</h3>
      <ProductList size="s" products={products} isFetching={isFetching} />
    </div>
  )
}
