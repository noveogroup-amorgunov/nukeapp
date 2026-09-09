import type { ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import cn from 'classnames'
import { textColors } from '../tokens'
import type { TextColor } from '../tokens'
import css from './Text.module.css'

const variantTag = {
  DisplayLarge: 'h1',
  DisplaySmall: 'h2',
  LabelSmall: 'span',
  LabelUltraSmall: 'span',
  BodyMedium: 'p',
  BodyCapture: 'span',
  BodySmall: 'span',
} as const

export type TextVariant = keyof typeof variantTag

type Props = {
  variant?: TextVariant
  color?: TextColor
  asChild?: boolean
  className?: string
  children: ReactNode
}

export function Text({ variant = 'BodyMedium', color, asChild, className, children }: Props) {
  const Tag = asChild ? Slot : variantTag[variant]

  return (
    <Tag
      className={cn(css.root, css[`root_variant_${variant}`], className)}
      style={color ? { color: textColors[color] } : undefined}
    >
      {children}
    </Tag>
  )
}
