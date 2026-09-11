import { useCallback } from 'react'
import cn from 'classnames'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import { Price } from '../Price/Price'
import { Text } from '../Text/Text'
import css from './AddToCartButtonV2.module.css'

export type AddToCartButtonV2Size = 'm' | 'l'

type Props = {
  quantity: number
  maxQuantityIsReached?: boolean
  price: Penny
  oldPrice?: Penny
  size?: AddToCartButtonV2Size
  disabled?: boolean
  onIncrease: (event: React.MouseEvent<HTMLElement>) => void
  onDecrease: (event: React.MouseEvent<HTMLElement>) => void
}

export function AddToCartButtonV2({
  quantity,
  maxQuantityIsReached,
  price,
  oldPrice,
  size = 'm',
  disabled,
  onIncrease,
  onDecrease,
}: Props) {
  const inCart = quantity > 0

  const handleIncrease = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      if (!disabled && !maxQuantityIsReached) {
        onIncrease(event)
      }
    },
    [disabled, maxQuantityIsReached, onIncrease],
  )

  const handleDecrease = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      if (!disabled && quantity > 0) {
        onDecrease(event)
      }
    },
    [disabled, quantity, onDecrease],
  )

  const handleContainerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      handleIncrease(event)
    },
    [handleIncrease],
  )

  return (
    <div
      className={cn(
        css.root,
        css[`root_size_${size}`],
        inCart ? css.root_inCart : css.root_empty,
        disabled && css.root_disabled,
      )}
      onClick={handleContainerClick}
    >
      {inCart
        ? (
            <>
              <IconButton variant="ghost" disabled={disabled} onClick={handleDecrease}>
                <Icon className={css.stepperIcon} type="minus" />
              </IconButton>
              <Text className={css.quantity} variant="BodyCapture">
                {quantity}
              </Text>
            </>
          )
        : (
            <Price price={price} oldPrice={oldPrice} size="m" variant="secondary" />
          )}
      <IconButton
        variant="ghost"
        disabled={disabled || maxQuantityIsReached}
        onClick={handleIncrease}
      >
        <Icon
          className={cn(css.stepperIcon, maxQuantityIsReached && css.stepperIconMax)}
          type="plus"
        />
      </IconButton>
    </div>
  )
}
