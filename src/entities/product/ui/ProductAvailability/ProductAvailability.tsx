import cn from 'classnames'
import { formatPrice } from '@/shared/lib'
import css from './ProductAvailability.module.css'

type Props = {
  stock: number
  price: Penny
  oldPrice?: Penny
}

export function ProductAvailability(props: Props) {
  const { stock, price, oldPrice } = props

  if (stock === 0) {
    return <div className={cn(css.root, 'text_bold')}>Out of stock</div>
  }

  return (
    <div className={cn(css.root, 'text_bold')}>
      {formatPrice(price)}
      {oldPrice && oldPrice !== price && (
        <span className={css.oldPrice}>{formatPrice(oldPrice, false)}</span>
      )}
      {stock === 1 && <span className={css.badge}>Only 1 left</span>}
    </div>
  )
}
