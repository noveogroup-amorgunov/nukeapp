import React, { useCallback } from 'react'
import { type ProductId } from '@/entities/product'
import { selectIsInWishlist } from '@/entities/wishlist'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/model'
import { Icon } from '@/shared/ui'
import { toggleWishlistProductThunk } from '../../model/toggleWishlistProduct'

type Props = {
  productId: ProductId
}

export function AddToWishlistIcon({ productId }: Props) {
  const { rootAttributes } = useFeatureSlicedDebug('feature/AddToWishlist')
  const isInWishlist = useAppSelector((state) =>
    selectIsInWishlist(state, productId)
  )
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      e.preventDefault()
      dispatch(toggleWishlistProductThunk(productId))
    },
    [productId]
  )

  return (
    <div {...rootAttributes}>
      <Icon onClick={onClick} type={isInWishlist ? 'liked' : 'like'} />
    </div>
  )
}
