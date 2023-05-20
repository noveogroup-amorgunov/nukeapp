import cn from 'classnames'
import React from 'react'
import css from './Icon.module.css'

export type IconType =
  | 'bag'
  | 'like'
  | 'liked'
  | 'user'
  | 'sun'
  | 'moon'
  | 'loader'
  | 'x'
  | 'chevronDown'
  | 'toggleRight'
  | 'trash'

export type Props = {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  type: IconType
}

export function Icon(props: Props) {
  return (
    <div
      className={cn(
        css.root,
        { [css.root_clickable]: Boolean(props.onClick) },
        props.className
      )}
      onClick={props.onClick}
    >
      <div
        className={css.icon}
        style={{ backgroundImage: `url("/images/${props.type}.svg")` }}
      />
    </div>
  )
}
