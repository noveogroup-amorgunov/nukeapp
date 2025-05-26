import cn from 'classnames'
import { useMemo } from 'react'
import { formatPrice } from '@/entities/product'
import { AddToCartButton } from '@/features/cart/addToCart'
import { AddToWishlistButton } from '@/features/wishlist/addToWishlist'
import { transformProductDetailsToProduct } from '../lib/transformProductDetailsToProduct'
import type { ProductDetails as ProductDetailsType } from '../model/types'
import css from './ProductDetails.module.css'

type Props = {
  productDetails?: ProductDetailsType
  isFetching: boolean
}

const MIN_IMAGE_COUNT = 4

export function ProductDetails({ productDetails, isFetching }: Props) {
  const imageStubs = useMemo(
    () =>
      Array.from({
        length: MIN_IMAGE_COUNT - (productDetails?.images.length ?? 0),
      }),
    [productDetails],
  )

  if (isFetching) {
    return (
      <div data-fsd="widget/ProductDetails" className={css.root}>
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

  return (
    <div data-fsd="widget/ProductDetails" className={css.root}>
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
        <div className={cn(css.price, 'text_bold')}>
          {formatPrice(productDetails.price)}
        </div>
        <div className={css.actions}>
          <AddToWishlistButton productId={productDetails.id} />
          <AddToCartButton
            showAlertAfterAddAction
            product={transformProductDetailsToProduct(productDetails)}
          />
        </div>
        <div className={cn(css.description, 'text_base')}>
          {productDetails.description}
        </div>
      </div>
    </div>
  )
}
