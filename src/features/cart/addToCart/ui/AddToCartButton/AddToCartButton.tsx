import cn from 'classnames'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectProductInCart, selectTotalQuantity } from '@/entities/cart'
import { type Product, formatPrice } from '@/entities/product'
import { selectIsAuthorized } from '@/entities/session'
import { useConfirmModal } from '@/shared/lib'
import { useAlertModal } from '@/shared/lib/useAlertModal'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { Button } from '@/shared/ui'
import {
  addCartProductThunk,
  removeCartProductThunk,
} from '../../model/actions'
import css from './AddToCartButton.module.css'

type Props = {
  size?: 'm' | 's'
  product: Product
  showOnlyQuantity?: boolean
  showAlertAfterAddAction?: boolean
}

export function AddToCartButton(props: Props) {
  const loginModal = useConfirmModal()
  const updateCartModal = useAlertModal()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const productInCart = useAppSelector(state =>
    selectProductInCart(state, props.product.id),
  )
  const productInCartQuantity = useAppSelector(selectTotalQuantity)

  const handleClick = useCallback(
    (addOne: boolean) => {
      if (!isAuthorized) {
        loginModal.show({
          title: 'To add product in bag you need login',
          confirmText: 'Login',
          cancelText: 'Later',
          onConfirm: () => {
            loginModal.remove()
            navigate('/login', {
              state: { returnUrl: `/product/${props.product.id}` },
            })
          },
          onCancel: () => loginModal.remove(),
        })

        return
      }

      if (addOne) {
        dispatch(addCartProductThunk(props.product))
      }
      else {
        dispatch(removeCartProductThunk(props.product))
      }

      if (addOne && props.showAlertAfterAddAction) {
        updateCartModal.show({
          title: `${props.product.name} was added to bag`,
          buttonText: `View bag (${productInCartQuantity + 1})`,
          onButtonClick: () => {
            navigate('/user/cart')
            updateCartModal.remove()
          },
        })
      }
    },
    [
      props.product.id,
      props.showAlertAfterAddAction,
      productInCart,
      productInCartQuantity,
    ],
  )

  const onAddProduct = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      handleClick(true)
    },
    [handleClick],
  )

  const onRemoveProduct = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      handleClick(false)
    },
    [handleClick],
  )

  return (
    <div data-fsd="feature/cart/AddToCartButton">
      <Button size={props.size} onClick={onAddProduct} theme="primary">
        {productInCart && (
          <div className={css.buttonContent}>
            <span
              onClick={onRemoveProduct}
              className={cn(css.buttonAction, 'text_xl')}
            >
              -
            </span>
            <span>
              {props.showOnlyQuantity
                ? productInCart.quantity
                : `${formatPrice(props.product.price)}x${
                    productInCart.quantity
                  }`}
            </span>
            <span className={cn(css.buttonAction, 'text_xl')}>+</span>
          </div>
        )}
        {!productInCart && (
          <span>
            Add to bag (
            {formatPrice(props.product.price)}
            )
          </span>
        )}
      </Button>
    </div>
  )
}
