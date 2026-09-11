import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoV2 } from './LogoV2'

const meta: Meta<typeof LogoV2> = {
  title: 'shared/ui/LogoV2',
  component: LogoV2,
}

export default meta

type Story = StoryObj<typeof LogoV2>

export const Default: Story = {}
