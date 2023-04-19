import type { Meta, StoryObj } from '@storybook/react'
import { ProductList } from './ProductList'
import { mockProductDtoByIds } from '@/entities/product/api/__mocks__/mockProductDtoByIds'
import { mapProduct } from '@/entities/product/lib/mapProduct'
import { StorybookApiMockDecorator } from '@/shared/lib/storybook/StorybookApiMockDecorator'

const meta: Meta<typeof ProductList> = {
  title: 'widgets/ProductList',
  component: ProductList,
  decorators: [StorybookApiMockDecorator],
}

export default meta

type Story = StoryObj<typeof ProductList>

export const Common: Story = {
  args: {
    size: 'm',
    isFetching: false,
    products: mockProductDtoByIds([1, 2, 3, 4, 5, 6, 7]).map(mapProduct),
  },
}

export const SizeS: Story = {
  args: {
    size: 's',
    isFetching: false,
    products: mockProductDtoByIds([1, 2, 3, 4, 5, 6, 7]).map(mapProduct),
  },
}

export const IsFetchingAndEmpty: Story = {
  args: {
    size: 'm',
    isFetching: true,
    products: [],
  },
}
