import cn from 'classnames'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectProductInCart, selectProductInCartCount } from '@/entities/cart'
import { formatPrice, type Product } from '@/entities/product'
import { selectIsAuthorized } from '@/entities/session'
import { useConfirmModal, useFeatureSlicedDebug } from '@/shared/lib'
import { useAlertModal } from '@/shared/lib/useAlertModal'
import { useAppDispatch, useAppSelector } from '@/shared/model'
import { Button } from '@/shared/ui'
import {
  addProductToCartThunk,
  removeProductToCartThunk,
} from '../model/addProductToCart'
import css from './AddToCartButton.module.css'

type Props = {
  product: Product
}

export function AddToCartButton(props: Props) {
  const { rootAttributes } = useFeatureSlicedDebug(
    'feature/cart/AddToCartButton'
  )
  const loginModal = useConfirmModal()
  const changeCartModal = useAlertModal()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const productInCart = useAppSelector((state) =>
    selectProductInCart(state, props.product.id)
  )
  const productInCartCount = useAppSelector(selectProductInCartCount)

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
        dispatch(addProductToCartThunk(props.product))
      } else {
        dispatch(removeProductToCartThunk(props.product))
      }

      if (addOne) {
        changeCartModal.show({
          children: (
            <div className={css.changeCartModalRoot}>
              {props.product.name} was added to bag{' '}
              <Button>View bag ({productInCartCount + 1})</Button>
            </div>
          ),
        })
      }
    },
    [props.product.id, productInCart, productInCartCount]
  )

  const onAddProduct = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      handleClick(true)
    },
    [handleClick]
  )

  const onRemoveProduct = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      handleClick(false)
    },
    [handleClick]
  )

  return (
    <div {...rootAttributes}>
      <Button onClick={onAddProduct} theme="primary">
        {productInCart && (
          <div className={css.buttonContent}>
            <span
              onClick={onRemoveProduct}
              className={cn(css.buttonAction, 'text_xl')}
            >
              -
            </span>
            <span>
              {formatPrice(props.product.price)}x{productInCart.quantity}
            </span>
            <span className={cn(css.buttonAction, 'text_xl')}>+</span>
          </div>
        )}
        {!productInCart && (
          <span>Add to bag ({formatPrice(props.product.price)})</span>
        )}
      </Button>
    </div>
  )
}
