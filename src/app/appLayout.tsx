import { DebugModeToggler } from '@/shared/modules/DebugMode/ui/DebugModeToggler/DebugModeToggler'
import { Announcement } from '@/shared/ui/Announcement/Announcement'
import { Layout } from '@/shared/ui/Layout/Layout'
import { LayoutHeader } from '@/widgets/LayoutHeader/LayoutHeader'
import { LayoutProfileCard } from '@/widgets/LayoutProfileCard/LayoutProfileCard'
import { LayoutSidebar } from '@/widgets/LayoutSidebar/LayoutSidebar'
import { Logo } from '@/widgets/Logo/Logo'

/**
 * ✅ FSD Best practice
 *
 * (1) Devide layout in two modules: dumb layout grid (shared)
 * and smart layout with widgets (here file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export const appLayout = (
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
