import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@/shared/ui'

const meta: Meta<typeof Text> = {
  title: 'shared/ui/Text',
  component: Text,
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    variant: 'BodyMedium',
    children: 'Text',
  },
}

export const VariantSet: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)' }}>
      <Text variant="DisplayLarge">DisplayLarge - Inter Bold 24/30</Text>
      <Text variant="DisplaySmall">DisplaySmall - Inter Semi Bold 16/20</Text>
      <Text variant="LabelSmall">LabelSmall - Inter Bold 12/14</Text>
      <Text variant="BodyMedium">BodyMedium - Inter Regular 16/18</Text>
      <Text variant="BodyCapture">BodyCapture - Inter Medium 16/18</Text>
      <Text variant="BodySmall">BodySmall - Inter Regular 14/18</Text>
    </div>
  ),
}

export const AsChild: Story = {
  args: {
    variant: 'DisplaySmall',
  },
  render: args => (
    <Text {...args} asChild>
      <span>Rendered as span via asChild</span>
    </Text>
  ),
}

export const Secondary: Story = {
  args: {
    variant: 'BodySmall',
    color: 'secondary',
    children: 'Secondary body text',
  },
}
