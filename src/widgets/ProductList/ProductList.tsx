import cn from 'classnames'
import { type ReactNode } from 'react'
import { ProductCard, type Product, type ProductId } from '@/entities/product'
import { selectIsAuthorized } from '@/entities/session'
import { AddToWishlistIcon } from '@/features/wishlist/AddToWishlist'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppSelector } from '@/shared/model'
import css from './ProductList.module.css'

type Props<T extends Product> = {
  products: T[]
  productCardBottomSlot?: (product: T) => ReactNode
  productCardActionsSlot?: (productId: ProductId) => ReactNode
  isFetching?: boolean
  size?: 's' | 'm'
}

export function ProductList<T extends Product>(props: Props<T>) {
  const { rootAttributes } = useFeatureSlicedDebug('widget/ProductList')
  const { isFetching, products, size = 'm' } = props
  const isAuthorized = useAppSelector(selectIsAuthorized)

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
      {...rootAttributes}
      className={cn(
        css.root,
        isFetching && css.rootIsFetching,
        css[`root_size_${size}`]
      )}
    >
      {products.map((product) => (
        <ProductCard
          size={size}
          key={product.id}
          product={product}
          bottomContentSlot={
            props.productCardBottomSlot
              ? props.productCardBottomSlot(product)
              : undefined
          }
          // TODO: Move ProductList to entity/product from widgets
          // (and compose <AddToWishlistIcon productId={product.id} />)
          actionSlot={
            props.productCardActionsSlot
              ? props.productCardActionsSlot(product.id)
              : isAuthorized && <AddToWishlistIcon productId={product.id} />
          }
        />
      ))}
    </div>
  )
}
