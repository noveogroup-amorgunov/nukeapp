import cn from 'classnames'
import { formatPrice } from '@/entities/product'
import { Button } from '@/shared/ui'
import css from './CartSummary.module.css'

type Props = {
  totalPrice: Penny
}

export function CartSummary(props: Props) {
  return (
    <div className={css.root}>
      <div className={css.row}>
        <div>Subtotal</div>
        <div>{formatPrice(props.totalPrice)}</div>
      </div>
      <div className={css.row}>
        <div>Estimated Delivery</div>
        <div>Free</div>
      </div>
      <div className={css.row}>
        <div>Taxes</div>
        <div>—</div>
      </div>
      <div className={cn(css.row, css.rowWithDivider)}>
        <div>Total</div>
        <div>{formatPrice(props.totalPrice)}</div>
      </div>
      <div className={cn(css.row, css.rowWithDivider)}>
        <Button disabled>Checkout</Button>
      </div>
    </div>
  )
}
