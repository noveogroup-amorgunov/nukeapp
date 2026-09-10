import { useCallback } from 'react'
import type { ReactNode } from 'react'
import cn from 'classnames'
import { formatPrice } from '@/shared/lib'
import { Text } from '../Text/Text'
import css from './ProductCardV2.module.css'

// Copied from entities/Product model to keep the component decoupled
// from the business Product model.
export type ProductCompactView = {
  id: string
  name: string
  specification: string
  imageUrl: string | null
  // TODO: render oldPrice (strikethrough) — no old-price variant in the
  // Figma component yet. Tracked in .scratch/product-card-old-price.
  price: Penny
  oldPrice?: Penny
  stock: number
}

type Props = {
  product: ProductCompactView
  quantity?: number
  actionSlot?: ReactNode
  onProductClick?: (productId: string) => void
}

export function ProductCardV2({ product, quantity = 0, actionSlot, onProductClick }: Props) {
  const { id, name, specification, imageUrl, price, stock } = product

  const soldOut = stock === 0
  const isLowStock = !soldOut && stock === 1

  const handleProductClick = useCallback(() => {
    onProductClick?.(id)
  }, [onProductClick, id])

  return (
    <article className={cn(css.root, soldOut && css.rootSoldOut)}>
      <button className={css.main} type="button" onClick={handleProductClick}>
        <div className={css.imageWrapper}>
          {imageUrl && <img alt={name} className={css.image} src={imageUrl} />}
          {isLowStock && (
            <div className={css.badge}>
              <Text variant="LabelSmall">Only 1 left</Text>
            </div>
          )}
          {soldOut && (
            <div className={css.overlay}>
              <Text color="primaryInverse" variant="DisplayLarge">
                out of stock
              </Text>
            </div>
          )}
          {!soldOut && quantity > 0 && (
            <div className={css.overlay}>
              <span className={css.quantity}>{quantity}</span>
            </div>
          )}
        </div>
        <div className={css.info}>
          {specification && (
            <Text color="secondary" variant="LabelSmall">
              {specification}
            </Text>
          )}
          <Text className={css.name} variant="BodyMedium">
            {name}
          </Text>
          <Text variant="BodyCapture">
            {soldOut ? 'Out of stock' : formatPrice(price)}
          </Text>
        </div>
      </button>
      {actionSlot && <div className={css.actions}>{actionSlot}</div>}
    </article>
  )
}
