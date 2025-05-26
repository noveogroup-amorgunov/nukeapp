import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'widget/Layout',
  component: Layout,
}

export default meta

type Story = StoryObj<typeof Layout>

export const Common: Story = {
  args: {
    headerRightSlot: <div>header right slot</div>,
    sidebarSlot: <div>sidebar slot</div>,
    // TODO: Outlet react router in storybook
    // children: <div>main content slot</div>,
  },
}
