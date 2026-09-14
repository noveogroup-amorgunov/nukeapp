import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayoutTitleSection } from './LayoutTitleSection'

const meta: Meta<typeof LayoutTitleSection> = {
  title: 'shared/ui/Layout/LayoutTitleSection',
  component: LayoutTitleSection,
}

export default meta

type Story = StoryObj<typeof LayoutTitleSection>

export const Default: Story = {
  args: {
    title: 'Pegasus 39',
  },
}

export const WithRightSlot: Story = {
  args: {
    title: 'Pegasus 39',
    rightSlot: <div>right slot</div>,
  },
}
