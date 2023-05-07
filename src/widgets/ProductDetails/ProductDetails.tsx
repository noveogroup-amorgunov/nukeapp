import cn from 'classnames'
import { useMemo } from 'react'
import {
  formatPrice,
  type ProductDetails as ProductDetailsType,
} from '@/entities/product'
import { selectIsAuthorize } from '@/entities/session'
import { AddToWishlistButton } from '@/features/wishlist/AddToWishlist'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { useAppSelector } from '@/shared/model'
import css from './ProductDetails.module.css'

type Props = {
  productDetails?: ProductDetailsType
  isFetching: boolean
}

const MIN_IMAGE_COUNT = 4

export function ProductDetails({ productDetails, isFetching }: Props) {
  const { rootAttributes } = useFeatureSlicedDebug('widget/ProductDetails')
  const isAuthorized = useAppSelector(selectIsAuthorize)

  const imageStubs = useMemo(
    () =>
      Array.from({
        length: MIN_IMAGE_COUNT - (productDetails?.images.length ?? 0),
      }),
    [productDetails]
  )

  if (isFetching) {
    return (
      <div {...rootAttributes} className={css.root}>
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
    <div {...rootAttributes} className={css.root}>
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
        {isAuthorized && (
          <div className={css.actions}>
            <AddToWishlistButton productId={productDetails.id} />
          </div>
        )}
        <div className={cn(css.description, 'text_base')}>
          {productDetails.description}
        </div>
      </div>
    </div>
  )
}
