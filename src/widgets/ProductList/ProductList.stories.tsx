import type { Meta, StoryObj } from '@storybook/react'
import { mapProduct } from '@/entities/product'
import { mockProductDtoByIds } from '@/entities/product/api/__mocks__/mockProductDtoByIds'
import {
  StorybookApiMockDecorator,
  StorybookStoreDecorator,
} from '@/shared/lib/storybook'
import { ProductList } from './ProductList'

const meta: Meta<typeof ProductList> = {
  title: 'widgets/ProductList',
  component: ProductList,
  decorators: [StorybookApiMockDecorator, StorybookStoreDecorator],
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
