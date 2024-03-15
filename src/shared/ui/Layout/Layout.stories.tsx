import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'shared/ui/Layout',
  component: Layout,
}

export default meta

type Story = StoryObj<typeof Layout>

export const Common: Story = {
  args: {
    navbarSlot: <div>navbar slot</div>,
    headerSlot: <div>header slot</div>,
    bottomSlot: <div>bottom slot</div>,
    announcementSlot: <div>announcement slot</div>,
    sidebarSlot: <div>sidebar slot</div>,
    // TODO: Outlet react router in storybook
    // children: <div>main content slot</div>,
  },
}
