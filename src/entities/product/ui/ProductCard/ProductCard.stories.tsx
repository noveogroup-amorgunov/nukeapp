import type { Meta, StoryObj } from '@storybook/react'
import { mapProduct } from '@/shared/api'
import { Icon } from '@/shared/ui'
import { mockProductDto } from '../../api/__mocks__/mockProductDto'
import { ProductCard } from './ProductCard'

const meta: Meta<typeof ProductCard> = {
  title: 'entities/product/ProductCard',
  component: ProductCard,
}

export default meta

type Story = StoryObj<typeof ProductCard>

export const Common: Story = {
  args: {
    size: 'm',
    product: mapProduct(mockProductDto()),
  },
}

export const SizeS: Story = {
  args: {
    size: 's',
    product: mapProduct(mockProductDto()),
  },
}

export const WithAction: Story = {
  args: {
    actionSlot: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Icon type="bag" />
        <Icon type="like" />
      </div>
    ),
    size: 'm',
    product: mapProduct(mockProductDto()),
  },
}
