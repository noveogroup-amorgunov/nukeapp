import type { ReactElement } from 'react'
import { Slot } from '@radix-ui/react-slot'
import cn from 'classnames'
import { Text } from '../Text/Text'
import css from './ToggleIcon.module.css'

export type Props = {
  children: ReactElement
  asChild?: boolean
  count?: number
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export function ToggleIcon({ asChild, children, count, disabled, onClick }: Props) {
  const Component = asChild ? Slot : 'button'

  return (
    <span className={css.root}>
      <Component
        aria-disabled={disabled || undefined}
        className={cn(css.control, disabled && css.control_disabled)}
        disabled={asChild ? undefined : disabled}
        onClick={onClick}
        type={asChild ? undefined : 'button'}
      >
        {children}
      </Component>
      {count !== undefined && count > 0 && (
        <span className={css.badge}>
          <Text variant="LabelUltraSmall">{count}</Text>
        </span>
      )}
    </span>
  )
}
