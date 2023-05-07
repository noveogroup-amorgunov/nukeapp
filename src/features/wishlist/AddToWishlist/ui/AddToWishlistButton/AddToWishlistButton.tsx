import React, { useCallback, useState } from 'react'
import { type ProductId } from '@/entities/product'
import { selectIsInWishlist } from '@/entities/wishlist'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/model'
import { Button } from '@/shared/ui'
import { toggleWishlistProductThunk } from '../../model/toggleWishlistProduct'

type Props = {
  productId: ProductId
}

export function AddToWishlistButton({ productId }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { rootAttributes } = useFeatureSlicedDebug('feature/AddToWishlist')
  const isInWishlist = useAppSelector((state) =>
    selectIsInWishlist(state, productId)
  )
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      setIsLoading(true)
      dispatch(toggleWishlistProductThunk(productId)).finally(() => {
        setIsLoading(false)
      })
    },
    [productId]
  )

  return (
    <div {...rootAttributes}>
      <Button isLoading={isLoading} onClick={onClick} theme="secondary">
        {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      </Button>
    </div>
  )
}
