import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CartItem } from '@/entities/cart'
import type { ProductId } from '@/entities/product'
import { mapProductToCompactView } from '@/entities/product'
import { addCartProductThunk, removeCartProductThunk, RemoveIcon } from '@/features/cart/addToCart'
import { AddToWishlistIcon } from '@/features/wishlist/addToWishlist'
import { useAppDispatch } from '@/shared/redux'
import { CartProductList as CartProductListView } from '@/shared/ui'
import type { CartLineView } from '@/shared/ui'
import css from './CartProductList.module.css'

type Props = {
  items: CartItem[]
}

export function CartProductList({ items }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const lines = useMemo<CartLineView[]>(() => {
    return items.map(item => ({
      product: mapProductToCompactView(item.product),
      quantity: item.quantity,
    }))
  }, [items])

  const productsById = useMemo(() => {
    return new Map(items.map(item => [String(item.product.id), item.product]))
  }, [items])

  const handleIncrease = useCallback(
    (productId: string) => {
      const product = productsById.get(productId)
      if (product) {
        dispatch(addCartProductThunk(product))
      }
    },
    [dispatch, productsById],
  )

  const handleDecrease = useCallback(
    (productId: string) => {
      const product = productsById.get(productId)
      if (product) {
        dispatch(removeCartProductThunk(product))
      }
    },
    [dispatch, productsById],
  )

  const handleProductClick = useCallback(
    (productId: string) => {
      navigate(`/product/${productId}`)
    },
    [navigate],
  )

  const renderActions = useCallback(
    (line: CartLineView) => (
      <div className={css.productCardActions}>
        <AddToWishlistIcon productId={Number(line.product.id) as ProductId} />
        <RemoveIcon productId={Number(line.product.id) as ProductId} />
      </div>
    ),
    [],
  )

  return (
    <CartProductListView
      lines={lines}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onProductClick={handleProductClick}
      actions={renderActions}
    />
  )
}
