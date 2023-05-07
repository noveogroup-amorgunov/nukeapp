import { Announcement, Layout } from '@/shared/ui'
import { DebugModeToggler } from '@/widgets/DebugModeToggler'
import { LayoutHeader } from '@/widgets/LayoutHeader'
import { LayoutProfileCard } from '@/widgets/LayoutProfileCard'
import { LayoutSidebar } from '@/widgets/LayoutSidebar'
import { Logo } from '@/widgets/Logo'

export const layoutWithSidebar = (
  <Layout
    announcementSlot={
      <Announcement>
        <span>
          An open source frontend application built with React ⚛️ and
          Feature-Sliced Design 🍰.
        </span>
      </Announcement>
    }
    bottomSlot={<DebugModeToggler />}
    sidebarSlot={<LayoutSidebar />}
    headerSlot={
      <LayoutHeader
        rightContentSlot={<LayoutProfileCard />}
        logotypeSlot={<Logo />}
      />
    }
  />
)
