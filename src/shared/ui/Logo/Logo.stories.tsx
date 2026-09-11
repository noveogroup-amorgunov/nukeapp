import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'shared/ui/Logo',
  component: Logo,
}

export default meta

type Story = StoryObj<typeof Logo>

export const Default: Story = {}
