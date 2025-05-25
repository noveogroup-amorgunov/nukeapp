import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProductId } from '@/entities/product'
import { selectIsAuthorized } from '@/entities/session'
import { selectProductIsInWishlist } from '@/entities/wishlist'
import { useConfirmModal } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { Button } from '@/shared/ui'
import { toggleWishlistProductThunk } from '../../model/toggleWishlistProduct'

type Props = {
  productId: ProductId
}

export function AddToWishlistButton({ productId }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const loginModal = useConfirmModal()
  const navigate = useNavigate()
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const isInWishlist = useAppSelector(state =>
    selectProductIsInWishlist(state, productId),
  )
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()

      if (!isAuthorized) {
        loginModal.show({
          title: 'To add product in wishlist you need login',
          confirmText: 'Login',
          cancelText: 'Later',
          onConfirm: () => {
            loginModal.remove()
            navigate('/login', {
              state: { returnUrl: `/product/${productId}` },
            })
          },
          onCancel: () => loginModal.remove(),
        })

        return
      }

      setIsLoading(true)
      dispatch(toggleWishlistProductThunk(productId)).finally(() => {
        setIsLoading(false)
      })
    },
    [productId, isAuthorized],
  )

  return (
    <div data-fsd="feature/wishlist/AddToWishlistButton">
      <Button isLoading={isLoading} onClick={onClick} theme="secondary">
        {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      </Button>
    </div>
  )
}
