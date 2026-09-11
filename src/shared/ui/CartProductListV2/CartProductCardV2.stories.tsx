import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, IconButton } from '@/shared/ui'
import type { CartLineView } from './CartProductCardV2'
import { CartProductCardV2 } from './CartProductCardV2'

const meta: Meta<typeof CartProductCardV2> = {
  title: 'shared/ui/CartProductCardV2',
  component: CartProductCardV2,
}

export default meta

type Story = StoryObj<typeof CartProductCardV2>

const line: CartLineView = {
  product: {
    id: '1',
    name: 'Nike Air Max Pulse',
    specification: 'Men\'s Shoes',
    imageUrl: '/images/content/air-max-pulse-mens-shoes-ShS3tL.png',
    price: 15000,
    stock: 3,
  },
  quantity: 2,
}

const lineWithOldPrice: CartLineView = {
  ...line,
  product: { ...line.product, oldPrice: 19900 },
}

export const Default: Story = {
  args: {
    line,
  },
}

export const WithOldPrice: Story = {
  args: {
    line: lineWithOldPrice,
  },
}

export const WithActions: Story = {
  args: {
    line,
    actions: (
      <IconButton variant="ghost">
        <Icon type="like" />
      </IconButton>
    ),
  },
}

export const MaxQuantityReached: Story = {
  args: {
    line: { ...line, quantity: 3 },
  },
}
