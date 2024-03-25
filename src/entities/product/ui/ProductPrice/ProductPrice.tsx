import cn from 'classnames'
import { formatPrice } from '../../lib/formatPrice'
import { type Product } from '../../model/types'
import css from './ProductPrice.module.css'

type Props = {
  product: Product
}

export function ProductPrice(props: Props) {
  const { product } = props
  const { oldPrice, price, stocks } = product

  if (stocks === 0) {
    return <div className={css.outOfStocks}>Out of stocks</div>
  }

  return (
    <div className={cn(css.price, 'text_bold')}>
      {formatPrice(price)}
      {oldPrice && oldPrice !== price && (
        <span className={css.oldPrice}>{formatPrice(oldPrice, false)}</span>
      )}
    </div>
  )
}
