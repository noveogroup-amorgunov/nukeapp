import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useProductsQuery } from '@/entities/product/api/productApi'
import { selectIsAuthorize } from '@/entities/session/model/slice'
import { useWishlistProductsQuery } from '@/entities/wishlist/api/wishlistApi'
import { selectProductIdsInWishlist } from '@/entities/wishlist/model/slice'
import { useAppSelector } from '@/shared/model/hooks'
import { useFeatureSlicedDebug } from '@/widgets/DebugMode/lib/useFeatureSlicedDebug'
import { ProductList } from '@/widgets/ProductList/ProductList'
import css from './ProductWishlistList.module.css'

export function ProductWishlistList() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/ProductWishlistList')
  // const productIdsInWishlist = useAppSelector(selectProductIdsInWishlist)
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
