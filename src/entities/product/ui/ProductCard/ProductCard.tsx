import cn from 'classnames'
import { useFeatureSlicedDebug } from '@/widgets/DebugMode/lib/useFeatureSlicedDebug'
import { formatPrice } from '../../lib/formatPrice'
import { type Product } from '../../model/types'
import css from './ProductCard.module.css'

type Props = {
  product: Product
  actionSlot?: React.ReactNode
  size?: 's' | 'm'
}

export function ProductCard(props: Props) {
  const { size = 'm', product, actionSlot } = props
  const { oldPrice, price, image, subname, name } = product
  const { rootAttributes } = useFeatureSlicedDebug('entity/ProductCard')

  return (
    <div className={cn(css.root, css[`root_size_${size}`])} {...rootAttributes}>
      <div className={css.imageContainer}>
        <div
          className={css.image}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      </div>
      <div className={css.content}>
        <div className={cn(css.label, 'text_xs')}>{subname}</div>
        <div className={cn(css.title, 'text_base')}>{name}</div>
        <div className={cn(css.price, 'text_bold')}>
          {formatPrice(price)}
          {oldPrice && oldPrice !== price && (
            <span className={css.oldPrice}>{formatPrice(oldPrice, false)}</span>
          )}
        </div>
      </div>
      <div className={css.actions}>{actionSlot}</div>
    </div>
  )
}
