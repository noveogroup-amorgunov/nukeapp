import React from 'react'
import cn from 'classnames'
import css from './Icon.module.css'
import arrowDown from './icons/arrowDown.svg?react'
import bag from './icons/bag.svg?react'
import chevronDown from './icons/chevronDown.svg?react'
import chevronUp from './icons/chevronUp.svg?react'
import like from './icons/like.svg?react'
import liked from './icons/liked.svg?react'
import loader from './icons/loader.svg?react'
import moon from './icons/moon.svg?react'
import sun from './icons/sun.svg?react'
import trash from './icons/trash.svg?react'
import user from './icons/user.svg?react'
import x from './icons/x.svg?react'

export type IconType
  = | 'bag'
    | 'like'
    | 'liked'
    | 'user'
    | 'sun'
    | 'moon'
    | 'loader'
    | 'x'
    | 'chevronDown'
    | 'chevronUp'
    | 'arrowDown'
    | 'trash'

const icons: Record<IconType, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
  bag,
  like,
  liked,
  user,
  sun,
  moon,
  loader,
  x,
  chevronDown,
  chevronUp,
  arrowDown,
  trash,
}

export type Props = {
  className?: string
  size?: number
  type: IconType
}

export function Icon(props: Props) {
  const Svg = icons[props.type]

  return (
    <Svg
      className={cn(css.icon, props.className)}
      style={{ width: props.size ?? 24, height: props.size ?? 24 }}
    />
  )
}
