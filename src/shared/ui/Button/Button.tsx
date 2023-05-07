import cn from 'classnames'
import { type ReactNode } from 'react'
import { Icon } from '@/shared/ui'
import css from './Button.module.css'

type ButtonTheme = 'primary' | 'secondary'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  theme?: ButtonTheme
  type?: 'submit'
  isLoading?: boolean
}

export function Button({
  onClick,
  children,
  isLoading,
  theme = 'primary',
  type,
}: Props) {
  return (
    <button
      type={type}
      className={cn(css.root, css[`root_theme_${theme}`])}
      onClick={onClick}
    >
      {isLoading ? <Icon className={css.loader} type="loader" /> : children}
    </button>
  )
}
