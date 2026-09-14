import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropdownMenu } from '@/shared/ui'

const meta: Meta<typeof DropdownMenu> = {
  title: 'shared/ui/DropdownMenu',
  component: DropdownMenu,
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

const items = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-high-low', label: 'Price: High-Low' },
  { value: 'price-low-high', label: 'Price: Low-High' },
]

export const Default: Story = {
  args: {
    trigger: <button type="button">Open menu</button>,
    items,
  },
}

export const SelectedItem: Story = {
  args: {
    trigger: <button type="button">Sort By: Featured</button>,
    items,
    selected: 'featured',
    onSelect: () => {},
  },
}

export const WithHeader: Story = {
  args: {
    trigger: <button type="button">user@nukeapp.com</button>,
    header: 'user@nukeapp.com',
    items: [{ value: 'logout', label: 'Logout' }],
  },
}
