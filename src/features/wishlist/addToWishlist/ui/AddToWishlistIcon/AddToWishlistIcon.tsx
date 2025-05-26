import React, { useCallback } from 'react'
import type { ProductId } from '@/entities/product'
import { selectProductIsInWishlist } from '@/entities/wishlist'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { Icon } from '@/shared/ui'
import { toggleWishlistProductThunk } from '../../model/toggleWishlistProduct'

type Props = {
  productId: ProductId
}

export function AddToWishlistIcon({ productId }: Props) {
  const isInWishlist = useAppSelector(state =>
    selectProductIsInWishlist(state, productId),
  )
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      e.preventDefault()
      dispatch(toggleWishlistProductThunk(productId))
    },
    [productId],
  )

  return (
    <div data-fsd="feature/wishlist/AddToWishlistIcon">
      <Icon onClick={onClick} type={isInWishlist ? 'liked' : 'like'} />
    </div>
  )
}
