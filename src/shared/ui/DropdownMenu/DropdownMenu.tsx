import type { ReactNode } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import cn from 'classnames'
import css from './DropdownMenu.module.css'

export type DropdownMenuItem = {
  value: string
  label: ReactNode
  disabled?: boolean
}

type Props = {
  trigger: ReactNode
  items: DropdownMenuItem[]
  header?: ReactNode
  selected?: string
  onSelect?: (value: string) => void
  align?: 'start' | 'center' | 'end'
}

export function DropdownMenu({ trigger, items, header, selected, onSelect, align = 'start' }: Props) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          className={css.menu}
          sideOffset={4}
        >
          {header && <div className={css.header}>{header}</div>}
          {items.map(item => (
            <DropdownMenuPrimitive.Item
              key={item.value}
              className={cn(css.item, item.value === selected && css.item_selected)}
              disabled={item.disabled}
              onSelect={() => onSelect?.(item.value)}
            >
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
