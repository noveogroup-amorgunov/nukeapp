import { useCallback, useMemo } from 'react'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { selectProductInCart, selectTotalQuantity } from '@/entities/cart'
import { selectIsAuthorized } from '@/entities/session'
import {
  addCartProductThunk,
  removeCartProductThunk,
} from '@/features/cart/addToCart'
import { AddToWishlistButton } from '@/features/wishlist/addToWishlist'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import {
  AddToCartButton,
  Price,
  Text,
  useAlertModal,
  useConfirmModal,
} from '@/shared/ui'
import { transformProductDetailsToProduct } from '../../lib/transformProductDetailsToProduct'
import type { ProductDetails as ProductDetailsType } from '../../model/types'
import css from './ProductDetails.module.css'

type Props = {
  productDetails?: ProductDetailsType
  isFetching: boolean
}

const MIN_IMAGE_COUNT = 4

export function ProductDetails({ productDetails, isFetching }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loginModal = useConfirmModal()
  const addedToBagModal = useAlertModal()
  const isAuthorized = useAppSelector(selectIsAuthorized)

  const product = useMemo(
    () =>
      productDetails
        ? transformProductDetailsToProduct(productDetails)
        : undefined,
    [productDetails],
  )

  const productInCart = useAppSelector(state =>
    productDetails
      ? selectProductInCart(state, productDetails.id)
      : undefined,
  )
  const totalQuantity = useAppSelector(selectTotalQuantity)

  const imageStubs = useMemo(
    () =>
      Array.from({
        length: MIN_IMAGE_COUNT - (productDetails?.images.length ?? 0),
      }),
    [productDetails],
  )

  const handleIncrease = useCallback(() => {
    if (!product || !productDetails) {
      return
    }

    if (!isAuthorized) {
      loginModal.show({
        title: 'To add product in bag you need login',
        confirmText: 'Login',
        cancelText: 'Later',
        onConfirm: () => {
          loginModal.remove()
          navigate('/login', {
            state: { returnUrl: `/product/${productDetails.id}` },
          })
        },
        onCancel: () => loginModal.remove(),
      })

      return
    }

    dispatch(addCartProductThunk(product))
    addedToBagModal.show({
      title: `${productDetails.name} was added to bag`,
      buttonText: `View bag (${totalQuantity + 1})`,
      onButtonClick: () => {
        navigate('/user/cart')
        addedToBagModal.remove()
      },
    })
  }, [
    dispatch,
    isAuthorized,
    loginModal,
    addedToBagModal,
    navigate,
    product,
    productDetails,
    totalQuantity,
  ])

  const handleDecrease = useCallback(() => {
    if (product) {
      dispatch(removeCartProductThunk(product))
    }
  }, [dispatch, product])

  if (isFetching) {
    return (
      <div className={css.root}>
        <div className={css.images}>
          {imageStubs.map((_, idx) => (
            <div className={css.image} key={idx} />
          ))}
        </div>
        <div className={css.content}></div>
      </div>
    )
  }

  if (!productDetails) {
    return null
  }

  const quantity = productInCart?.quantity ?? 0
  const maxQuantityIsReached = quantity >= productDetails.stock
  const isOutOfStock = productDetails.stock === 0

  return (
    <div className={css.root}>
      <div className={css.images}>
        {productDetails.images.map((image, idx) => (
          <img
            className={css.image}
            key={idx}
            src={image}
            alt={productDetails.name}
          />
        ))}
        {imageStubs.map((_, idx) => (
          <div className={css.image} key={idx} />
        ))}
      </div>
      <div className={css.content}>
        <div className="text_2xl text_bold">{productDetails.name}</div>
        <div className="text_base text_bold">{productDetails.subname}</div>
        <div className={css.price}>
          {isOutOfStock
            ? (
                <Text variant="BodyMedium">Out of stock</Text>
              )
            : (
                <Price
                  price={productDetails.price}
                  oldPrice={productDetails.oldPrice}
                  size="l"
                />
              )}
          {productDetails.stock === 1 && (
            <span className={css.badge}>Only 1 left</span>
          )}
        </div>
        <div className={css.actions}>
          <AddToWishlistButton productId={productDetails.id} />
          {!isOutOfStock && (
            <AddToCartButton
              quantity={quantity}
              maxQuantityIsReached={maxQuantityIsReached}
              price={productDetails.price}
              oldPrice={productDetails.oldPrice}
              size="l"
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          )}
        </div>
        <div className={cn(css.description, 'text_base')}>
          {productDetails.description}
        </div>
      </div>
    </div>
  )
}
