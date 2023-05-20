import cn from 'classnames'
import { type ReactNode } from 'react'
import { Icon } from '@/shared/ui'
import css from './Button.module.css'

type ButtonTheme = 'primary' | 'secondary'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  theme?: ButtonTheme
  size?: 'm' | 's'
  type?: 'submit'
  isLoading?: boolean
  disabled?: boolean
}

export function Button({
  onClick,
  children,
  isLoading,
  size = 'm',
  theme = 'primary',
  disabled,
  type,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        css.root,
        css[`root_size_${size}`],
        css[`root_theme_${theme}`],
        disabled && css.root_disabled
      )}
      onClick={onClick}
    >
      {isLoading ? <Icon className={css.loader} type="loader" /> : children}
    </button>
  )
}
