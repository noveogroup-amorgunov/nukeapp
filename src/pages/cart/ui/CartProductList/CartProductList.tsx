import { useCallback, useMemo } from 'react'
import { removeProductFromCart } from '@/entities/cart'
import { type CartItem } from '@/entities/cart'
import { type Product, formatPrice, type ProductId } from '@/entities/product'
import { AddToCartButton } from '@/features/cart/addToCart'
import { AddToWishlistIcon } from '@/features/wishlist/AddToWishlist'
import { useConfirmModal } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'
import { Icon } from '@/shared/ui'
import { ProductList } from '@/widgets/ProductList'
import css from './CartProductList.module.css'

type CartProduct = Product & { quantity: number }

type Props = {
  products: CartItem[]
}

export function CartProductList(props: Props) {
  const dispatch = useAppDispatch()
  const confirmRemoveModal = useConfirmModal()

  const products = useMemo(() => {
    return props.products.map((item) => {
      return {
        ...item.product,
        quantity: item.quantity,
      }
    })
  }, [props.products])

  const onClickToRemove = useCallback((productId: ProductId) => {
    confirmRemoveModal.show({
      title: 'Are you really want remove product from cart?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => {
        confirmRemoveModal.remove()
        // TODO: move to thunk
        dispatch(removeProductFromCart(productId))
      },
      onCancel: () => confirmRemoveModal.remove(),
    })
  }, [])

  return (
    <ProductList<CartProduct>
      size="s"
      productCardBottomSlot={(product: CartProduct) => {
        return (
          <div className={css.productCardBottomActions}>
            <div>
              Total price:{' '}
              <span className="text_bold">
                {formatPrice(product.quantity * product.price)}
              </span>
            </div>
            <AddToCartButton size="s" showOnlyQuantity product={product} />
          </div>
        )
      }}
      productCardActionsSlot={(productId) => (
        <div className={css.productCardActions}>
          <AddToWishlistIcon productId={productId} />
          <Icon
            type="trash"
            onClick={(event) => {
              event.preventDefault()
              onClickToRemove(productId)
            }}
          />
        </div>
      )}
      products={products}
    />
  )
}
