import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import type { IconType } from './Icon'

const iconTypes: IconType[] = [
  'bag',
  'like',
  'liked',
  'user',
  'sun',
  'moon',
  'loader',
  'x',
  'chevronDown',
  'chevronUp',
  'arrowDown',
  'trash',
]

const meta: Meta<typeof Icon> = {
  title: 'shared/ui/Icon',
  component: Icon,
}

export default meta

type Story = StoryObj<typeof Icon>

export const Common: Story = {
  args: {
    type: 'like',
  },
}

export const IconsSet: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {iconTypes.map(type => (
        <Icon key={type} type={type} />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon type="like" size={16} />
      <Icon type="like" size={24} />
      <Icon type="like" size={32} />
      <Icon type="like" size={48} />
    </div>
  ),
}
