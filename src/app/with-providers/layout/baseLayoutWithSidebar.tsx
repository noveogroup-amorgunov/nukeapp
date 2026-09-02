import { AdBlock } from '@/widgets/AdBlock'
import { Layout } from '@/widgets/Layout'

/**
 * ✅ FSD Best practice
 *
 * (1) Devide layout in two modules: dumb layout grid (widget or shared/ui)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export const baseLayoutWithSidebar = (
  <Layout sidebarSlot={<AdBlock />} />
)
