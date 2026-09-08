import type { ReactNode } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../lib/formatPrice'
import type { Product } from '../../model/types'
import css from './ProductCard.module.css'

type Props = {
  product: Product
  actionSlot?: ReactNode
  bottomContentSlot?: ReactNode
  size?: 's' | 'm'
}

export function ProductCard(props: Props) {
  const { size = 'm', product, actionSlot, bottomContentSlot } = props
  const { image, subname, name } = product
  const isOutOfStock = product.stock === 0

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        css.root,
        css[`root_size_${size}`],
        isOutOfStock && css.rootOutOfStock,
      )}
      data-fsd="entity/product/ProductCard"
    >
      <div className={css.imageContainer}>
        <div
          className={css.image}
          style={{ backgroundImage: `url('${image}')` }}
        >
        </div>
      </div>
      <div className={css.content}>
        <div className={cn(css.label, 'text_xs')}>{subname}</div>
        <div className={cn(css.title, 'text_base')}>{name}</div>
        {isOutOfStock
          ? (
              <div className={cn(css.price, 'text_bold')}>Out of stock</div>
            )
          : (
              <div className={cn(css.price, 'text_bold')}>
                {formatPrice(product.price)}
                {product.oldPrice && product.oldPrice !== product.price && (
                  <span className={css.oldPrice}>
                    {formatPrice(product.oldPrice, false)}
                  </span>
                )}
              </div>
            )}
        {bottomContentSlot && (
          <div className={css.contentActions}>{bottomContentSlot}</div>
        )}
      </div>
      {actionSlot && <div className={css.actions}>{actionSlot}</div>}
    </Link>
  )
}
