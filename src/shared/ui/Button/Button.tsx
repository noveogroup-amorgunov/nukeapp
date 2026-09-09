import type { ReactNode } from 'react'
import cn from 'classnames'
import css from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  variant?: ButtonVariant
  type?: 'submit'
  isLoading?: boolean
  disabled?: boolean
}

export function Button({
  onClick,
  children,
  isLoading,
  variant = 'primary',
  disabled,
  type,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      return
    }
    onClick?.(e)
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        css.root,
        css[`root_variant_${variant}`],
        isLoading && css.root_loading,
        disabled && css.root_disabled,
      )}
      onClick={handleClick}
    >
      <span className={cn(css.content, isLoading && css.content_loading)}>
        {children}
      </span>
      {isLoading && (
        <span className={css.loading} aria-hidden="true">
          ...
        </span>
      )}
    </button>
  )
}
