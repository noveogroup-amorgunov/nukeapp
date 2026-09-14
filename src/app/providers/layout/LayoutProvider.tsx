import type { ReactNode } from 'react'
import { DebugModeProvider, DebugModeToggler } from '@/shared/services'
import { Layout } from '@/shared/ui'
import { LayoutHeaderIcons } from './ui/LayoutHeaderIcons/LayoutHeaderIcons'

type Props = {
  sidebarSlot?: ReactNode
}

export function LayoutProvider(props: Props) {
  return (
    <DebugModeProvider>
      <Layout
        headerRightSlot={<LayoutHeaderIcons />}
        sidebarSlot={props.sidebarSlot}
      />
      <DebugModeToggler />
    </DebugModeProvider>
  )
}
