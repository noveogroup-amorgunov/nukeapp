import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChangeThemeIconButton } from './ChangeThemeIconButton'

const meta: Meta<typeof ChangeThemeIconButton> = {
  title: 'entities/theme/ChangeThemeIconButton',
  component: ChangeThemeIconButton,
}

export default meta

type Story = StoryObj<typeof ChangeThemeIconButton>

export const Default: Story = {}
