import cn from 'classnames'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useFeatureSlicedDebug } from '@/shared/lib'
import { type Product } from '../../model/types'
import { ProductPrice } from '../ProductPrice/ProductPrice'
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
  const { rootAttributes } = useFeatureSlicedDebug<HTMLAnchorElement>(
    'entity/product/ProductCard'
  )

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(css.root, css[`root_size_${size}`])}
      {...rootAttributes}
    >
      <div className={css.imageContainer}>
        <div
          className={css.image}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      </div>
      <div className={css.content}>
        <div className={cn(css.label, 'text_xs')}>{subname}</div>
        <div className={cn(css.title, 'text_base')}>{name}</div>
        <ProductPrice product={product} />
        {bottomContentSlot && (
          <div className={css.contentActions}>{bottomContentSlot}</div>
        )}
      </div>
      {actionSlot && <div className={css.actions}>{actionSlot}</div>}
    </Link>
  )
}
