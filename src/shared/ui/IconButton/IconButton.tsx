import type { ReactElement } from 'react'
import { Slot } from '@radix-ui/react-slot'
import cn from 'classnames'
import { Text } from '../Text/Text'
import css from './IconButton.module.css'

export type Props = {
  children: ReactElement
  asChild?: boolean
  count?: number
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export function IconButton({ asChild, children, count, disabled, onClick }: Props) {
  const Component = asChild ? Slot : 'button'

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <span className={css.root}>
      <Component
        aria-disabled={disabled || undefined}
        className={cn(css.control, disabled && css.control_disabled)}
        disabled={asChild ? undefined : disabled}
        onClick={handleClick}
        type={asChild ? undefined : 'button'}
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
