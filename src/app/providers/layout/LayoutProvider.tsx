import type { ReactNode } from 'react'
import { DebugModeProvider } from '@/shared/services/debugMode'
import { FeatureFlagsToggler } from '@/shared/services/featureFlags'
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
      <FeatureFlagsToggler />
    </DebugModeProvider>
  )
}
