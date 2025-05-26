import { useMemo } from 'react'
import type { CartItem } from '@/entities/cart'
import { type Product, formatPrice } from '@/entities/product'
import { AddToCartButton, RemoveIcon } from '@/features/cart/addToCart'
import { AddToWishlistIcon } from '@/features/wishlist/addToWishlist'
import { BaseProductList } from '@/widgets/BaseProductList'
import css from './CartProductList.module.css'

type CartProduct = Product & { quantity: number }

type Props = {
  products: CartItem[]
}

export function CartProductList(props: Props) {
  const products = useMemo(() => {
    return props.products.map((item) => {
      return {
        ...item.product,
        quantity: item.quantity,
      }
    })
  }, [props.products])

  return (
    <BaseProductList<CartProduct>
      size="s"
      productCardBottomSlot={(product: CartProduct) => {
        return (
          <div className={css.productCardBottomActions}>
            <div>
              Total price:
              {' '}
              <span className="text_bold">
                {formatPrice(product.quantity * product.price)}
              </span>
            </div>
            <AddToCartButton size="s" showOnlyQuantity product={product} />
          </div>
        )
      }}
      productCardActionsSlot={productId => (
        <div className={css.productCardActions}>
          <AddToWishlistIcon productId={productId} />
          <RemoveIcon productId={productId} />
        </div>
      )}
      products={products}
    />
  )
}
