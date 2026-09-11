import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from '@/shared/ui'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'shared/ui/IconButton',
  component: IconButton,
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    children: <Icon type="like" />,
  },
}

export const WithCount: Story = {
  args: {
    children: <Icon type="like" />,
    count: 6,
  },
}

export const Disabled: Story = {
  args: {
    children: <Icon type="like" />,
    disabled: true,
  },
}

export const Ghost: Story = {
  args: {
    children: <Icon type="like" />,
    variant: 'ghost',
  },
}

export const GhostDisabled: Story = {
  args: {
    children: <Icon type="like" />,
    variant: 'ghost',
    disabled: true,
  },
}

export const AsChildLink: Story = {
  args: {
    asChild: true,
    children: (
      <a href="#">
        <Icon type="like" />
      </a>
    ),
  },
}

export const AsChildLinkWithCount: Story = {
  args: {
    asChild: true,
    count: 6,
    children: (
      <a href="#">
        <Icon type="bag" />
      </a>
    ),
  },
}
