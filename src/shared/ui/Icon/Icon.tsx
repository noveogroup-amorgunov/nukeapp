import cn from 'classnames'
import React from 'react'
// TODO: FSD: (import shared -> entity/model)
// eslint-disable-next-line boundaries/element-types
import { selectCurrentTheme } from '@/entities/theme'
import { useAppSelector } from '@/shared/model'
import css from './Icon.module.css'

export type IconType = 'cart' | 'like' | 'liked' | 'user' | 'sun' | 'moon'

export type Props = {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  type: IconType
}

const hasDarkMode: IconType[] = ['like', 'liked', 'moon']

export function Icon(props: Props) {
  const currentTheme = useAppSelector(selectCurrentTheme)
  const isDark = currentTheme === 'dark' && hasDarkMode.includes(props.type)
  const image = `${props.type}${isDark ? '@dark' : ''}.svg`

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
        style={{ backgroundImage: `url("/images/${image}")` }}
      />
    </div>
  )
}
