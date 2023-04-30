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

  if (!isFetching && products.length === 0) {
    return (
      <div className={css.root} {...rootAttributes}>
        <h3 className={css.title}>Wishlist</h3>
        <div className={css.empty}>
          There are no products in the wish list. Add someone by clicking on the
          &quot;heart&quot; icon
        </div>
      </div>
    )
  }

  return (
    <div className={css.root} {...rootAttributes}>
      <h3 className={css.title}>
        Wishlist ({isFetching ? '...' : products.length})
      </h3>
      <ProductList size="s" products={products} isFetching={isFetching} />
    </div>
  )
}
