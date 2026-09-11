import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, IconButton } from '@/shared/ui'
import type { CartLineView } from './CartProductCardV2'
import { CartProductListV2 } from './CartProductListV2'

const meta: Meta<typeof CartProductListV2> = {
  title: 'shared/ui/CartProductListV2',
  component: CartProductListV2,
}

export default meta

type Story = StoryObj<typeof CartProductListV2>

function makeLine(index: number, overrides: Partial<CartLineView> = {}): CartLineView {
  return {
    product: {
      id: String(index),
      name: `Product ${index}`,
      specification: 'Men\'s Shoes',
      imageUrl: '/images/content/air-max-pulse-mens-shoes-ShS3tL.png',
      price: 15000,
      oldPrice: index % 3 === 0 ? 19900 : undefined,
      stock: 3,
    },
    quantity: index % 3,
    ...overrides,
  }
}

const lines: CartLineView[] = Array.from({ length: 20 }, (_, index) => makeLine(index + 1))

export const Default: Story = {
  args: {
    lines,
  },
}

export const WithActions: Story = {
  args: {
    lines,
    actions: () => (
      <IconButton variant="ghost">
        <Icon type="like" />
      </IconButton>
    ),
  },
}
