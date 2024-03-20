import { Announcement, Layout } from '@/shared/ui'
import { DebugModeToggler } from '@/widgets/DebugModeToggler'
import { LayoutHeader } from '@/widgets/LayoutHeader'
import { LayoutProfileCard } from '@/widgets/LayoutProfileCard'

/**
 * ✅ FSD Best practice
 *
 * (1) Devide layout in two modules: dumb layout grid (shared)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export const baseLayout = (
  <Layout
    announcementSlot={
      <Announcement>
        <span>
          🚀&nbsp;&nbsp;An&nbsp;open source frontend application built with
          React and Feature-Sliced&nbsp;Design.
        </span>
      </Announcement>
    }
    bottomSlot={<DebugModeToggler />}
    headerSlot={<LayoutHeader rightContentSlot={<LayoutProfileCard />} />}
  />
)
