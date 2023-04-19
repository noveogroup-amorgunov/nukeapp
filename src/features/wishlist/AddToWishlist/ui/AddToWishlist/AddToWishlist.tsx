import React, { useCallback } from 'react'
import { toggleWishlistProductThunk } from '../../model/toggleWishlistProduct'
import { type ProductId } from '@/entities/product/model/types'
import { selectIsInWishlist } from '@/entities/wishlist/model/slice'
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks'
import { Icon } from '@/shared/ui/Icon/Icon'
import { useFeatureSlicedDebug } from '@/widgets/DebugMode/lib/useFeatureSlicedDebug'

type Props = {
  productId: ProductId
}

export function AddToWishlist({ productId }: Props) {
  const { rootAttributes } = useFeatureSlicedDebug('feature/AddToWishlist')
  const isInWishlist = useAppSelector((state) =>
    selectIsInWishlist(state, productId)
  )
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
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
