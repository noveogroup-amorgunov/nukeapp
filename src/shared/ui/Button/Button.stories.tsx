import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/shared/ui'

const meta: Meta<typeof Button> = {
  title: 'shared/ui/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Common: Story = {
  args: {
    size: 'm',
    theme: 'primary',
    children: 'click me',
    isLoading: false,
    disabled: false,
  },
}
