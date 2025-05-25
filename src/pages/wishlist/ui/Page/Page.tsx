import { skipToken } from '@reduxjs/toolkit/query'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectIsAuthorized } from '@/entities/session'
import { useWishlistProductsQuery } from '@/entities/wishlist'
import { useAddToWishlistMutation } from '@/entities/wishlist/api/wishlistApi'
import { useAppSelector } from '@/shared/redux'
import { Button } from '@/shared/ui'
import { BaseProductList } from '@/widgets/BaseProductList'

export function WishlistPage() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const navigate = useNavigate()
  const [, { isLoading: isActionFetching }] = useAddToWishlistMutation({
    // This field sync mutation which running from other place
    // @see src/features/wishlist/AddToWishlist/model/toggleWishlistProduct.ts
    fixedCacheKey: 'shared-add-to-wishlist',
  })
  const { data: products = [], isFetching } = useWishlistProductsQuery(
    isAuthorized ? undefined : skipToken,
    { skip: !isAuthorized },
  )

  const onLogin = useCallback(() => {
    navigate('/login', {
      state: { returnUrl: `/user/wishlist` },
    })
  }, [])

  const content = useMemo(() => {
    if (!isAuthorized) {
      return (
        <div>
          <div>Login to see your wishlist.</div>
          <Button onClick={onLogin}>Login</Button>
        </div>
      )
    }

    if (!isFetching && products.length === 0) {
      return (
        <div>
          There are no products in your wishlist. Add someone by clicking on the
          &quot;heart&quot; icon
        </div>
      )
    }

    return (
      <div>
        <BaseProductList size="m" products={products} isFetching={isFetching} />
      </div>
    )
  }, [isAuthorized, isFetching, products])

  const title = `Wishlist ${
    isAuthorized && products.length > 0
      ? `(${isFetching || isActionFetching ? '...' : products.length})`
      : ''
  }`

  return (
    <div>
      <h1>{title}</h1>
      {content}
    </div>
  )
}
