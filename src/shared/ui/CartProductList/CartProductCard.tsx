import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton'
import { Price } from '../Price/Price'
import type { ProductCompactView } from '../ProductCard/ProductCard'
import { Text } from '../Text/Text'
import css from './CartProductCard.module.css'

export type CartLineView = {
  product: ProductCompactView
  quantity: number
}

type Props = {
  line: CartLineView
  onIncrease?: (productId: string) => void
  onDecrease?: (productId: string) => void
  onProductClick?: (productId: string) => void
  actions?: ReactNode
}

export function CartProductCard({
  line,
  onIncrease,
  onDecrease,
  onProductClick,
  actions,
}: Props) {
  const { product, quantity } = line
  const { id, name, specification, imageUrl, price, oldPrice, stock } = product

  const maxQuantityIsReached = quantity >= stock

  const handleIncrease = useCallback(() => {
    onIncrease?.(id)
  }, [onIncrease, id])

  const handleDecrease = useCallback(() => {
    onDecrease?.(id)
  }, [onDecrease, id])

  const handleProductClick = useCallback(() => {
    onProductClick?.(id)
  }, [onProductClick, id])

  return (
    <article className={css.root}>
      <div className={css.media} onClick={handleProductClick} role="presentation">
        {imageUrl && <img alt={name} className={css.image} src={imageUrl} />}
      </div>
      <div className={css.info}>
        <button className={css.summary} type="button" onClick={handleProductClick}>
          {specification && (
            <Text color="secondary" variant="LabelSmall">
              {specification}
            </Text>
          )}
          <Text variant="BodyMedium">{name}</Text>
          <Price price={price} size="l" />
          <div className={css.totalRow}>
            <Text variant="BodyMedium">Total price:&nbsp;</Text>
            <Price
              price={quantity * price}
              oldPrice={typeof oldPrice !== 'undefined' ? quantity * oldPrice : undefined}
              size="m"
            />
          </div>
        </button>
        <AddToCartButton
          quantity={quantity}
          maxQuantityIsReached={maxQuantityIsReached}
          price={price}
          oldPrice={oldPrice}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>
      {actions && <div className={css.actions}>{actions}</div>}
    </article>
  )
}
