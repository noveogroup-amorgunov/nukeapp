import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/shared/ui'

const meta: Meta<typeof Button> = {
  title: 'shared/ui/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Add to cart',
    isLoading: false,
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Add to cart',
    isLoading: false,
    disabled: false,
  },
}

export const IsLoading: Story = {
  args: {
    variant: 'primary',
    children: 'Add to cart',
    isLoading: true,
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Add to cart',
    isLoading: false,
    disabled: true,
  },
}
