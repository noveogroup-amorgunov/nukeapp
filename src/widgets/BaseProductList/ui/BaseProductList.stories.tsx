import type { Meta, StoryObj } from '@storybook/react'
import { mapProduct } from '@/entities/product'
import { mockProductDtoByIds } from '@/entities/product/api/__mocks__/mockProductDtoByIds'
import { BaseProductList } from './BaseProductList'

const meta: Meta<typeof BaseProductList> = {
  title: 'widgets/BaseProductList',
  component: BaseProductList,
}

export default meta

type Story = StoryObj<typeof BaseProductList>

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
