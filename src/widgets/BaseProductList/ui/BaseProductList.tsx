import cn from 'classnames'
import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { ProductCard } from '@/entities/product'
import type { Product, ProductId } from '@/entities/product'
import { selectIsAuthorized } from '@/entities/session'
import { AddToWishlistIcon } from '@/features/wishlist/addToWishlist'
import { useAppSelector } from '@/shared/redux'
import css from './BaseProductList.module.css'

type Props<T extends Product> = {
  products: T[]
  productCardBottomSlot?: (product: T) => ReactNode
  productCardActionsSlot?: (productId: ProductId) => ReactNode
  isFetching?: boolean
  size?: 's' | 'm'
}

export function BaseProductList<T extends Product>(props: Props<T>) {
  const { isFetching, products, size = 'm' } = props
  const isAuthorized = useAppSelector(selectIsAuthorized)

  const getActionSlot = useCallback(
    (product: Product) => {
      if (props.productCardActionsSlot) {
        return props.productCardActionsSlot(product.id)
      }

      if (isAuthorized) {
        return <AddToWishlistIcon productId={product.id} />
      }

      return null
    },
    [props.productCardActionsSlot, isAuthorized],
  )

  if (Boolean(isFetching) && products.length === 0) {
    return <div className={css.root}>Fetching...</div>
  }

  /**
   * ✅ FSD Best practice
   *
   * Receive product actions (add to wishlist)
   * to render-prop to avoid entity cross-import
   */
  return (
    <div
      data-fsd="widget/BaseProductList"
      className={cn(
        css.root,
        isFetching && css.rootIsFetching,
        css[`root_size_${size}`],
      )}
    >
      {products.map(product => (
        <ProductCard
          size={size}
          key={product.id}
          product={product}
          bottomContentSlot={
            props.productCardBottomSlot
              ? props.productCardBottomSlot(product)
              : null
          }
          actionSlot={getActionSlot(product)}
        />
      ))}
    </div>
  )
}
