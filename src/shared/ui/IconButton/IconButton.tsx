import type { ReactElement } from 'react'
import { Slot } from '@radix-ui/react-slot'
import cn from 'classnames'
import { Text } from '../Text/Text'
import css from './IconButton.module.css'

export type IconButtonVariant = 'secondary' | 'primary' | 'ghost'

export type Props = {
  children: ReactElement
  asChild?: boolean
  count?: number
  disabled?: boolean
  variant?: IconButtonVariant
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>

export function IconButton({ asChild, children, count, disabled, variant = 'secondary', onClick, className, ...rest }: Props) {
  const Component = asChild ? Slot : 'button'

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <span className={cn(css.root, className)}>
      <Component
        aria-disabled={disabled || undefined}
        className={cn(
          css.control,
          variant !== 'secondary' && css[`control_variant_${variant}`],
          disabled && css.control_disabled,
        )}
        disabled={asChild ? undefined : disabled}
        onClick={handleClick}
        type={asChild ? undefined : 'button'}
        {...rest}
      >
        {children}
      </Component>
      {Boolean(count) && (
        <span className={css.badge}>
          <Text variant="LabelUltraSmall">{count}</Text>
        </span>
      )}
    </span>
  )
}
