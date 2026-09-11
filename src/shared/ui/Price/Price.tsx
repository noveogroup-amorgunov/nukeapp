import cn from 'classnames'
import { formatPrice } from '@/shared/lib'
import { Text } from '../Text/Text'
import css from './Price.module.css'

export type PriceSize = 'm' | 'l'

export type PriceVariant = 'primary' | 'secondary'

type Props = {
  price: Penny
  oldPrice?: Penny
  size?: PriceSize
  variant?: PriceVariant
  className?: string
}

export function Price({
  price,
  oldPrice,
  size = 'm',
  variant = 'primary',
  className,
}: Props) {
  const textVariant = size === 'l' ? 'DisplayLarge' : 'BodyCapture'

  return (
    <div
      className={cn(
        css.root,
        variant === 'secondary' && css.root_variant_secondary,
        className,
      )}
    >
      {typeof oldPrice !== 'undefined' && (
        <Text asChild className={css.oldPrice} variant={textVariant}>
          <span>{formatPrice(oldPrice, false)}</span>
        </Text>
      )}
      <Text asChild variant={textVariant}>
        <span>{formatPrice(price)}</span>
      </Text>
    </div>
  )
}
