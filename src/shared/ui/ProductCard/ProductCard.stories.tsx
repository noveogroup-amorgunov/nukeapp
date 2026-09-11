import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, IconButton, ProductCard } from '@/shared/ui'

const meta: Meta<typeof ProductCard> = {
  title: 'shared/ui/ProductCard',
  component: ProductCard,
}

export default meta

type Story = StoryObj<typeof ProductCard>

const product = {
  id: '1',
  name: 'Nike Air Max Pulse',
  specification: 'Men’s Shoes',
  imageUrl: '/images/content/air-max-pulse-mens-shoes-ShS3tL.png',
  price: 15000,
  stock: 10,
}

export const Available: Story = {
  args: {
    product,
  },
}

export const LowStock: Story = {
  args: {
    product: { ...product, stock: 1 },
  },
}

export const AddedToCart: Story = {
  args: {
    product,
    quantity: 3,
  },
}

export const OutOfStock: Story = {
  args: {
    product: { ...product, stock: 0 },
  },
}

export const WithOldPrice: Story = {
  args: {
    product: { ...product, oldPrice: 19900 },
  },
}

export const WithActionSlot: Story = {
  args: {
    product,
    actionSlot: (
      <IconButton>
        <Icon size={24} type="like" />
      </IconButton>
    ),
  },
}
