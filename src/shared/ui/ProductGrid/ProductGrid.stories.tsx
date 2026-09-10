import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductGrid } from '@/shared/ui'

const meta: Meta<typeof ProductGrid> = {
  title: 'shared/ui/ProductGrid',
  component: ProductGrid,
}

export default meta

type Story = StoryObj<typeof ProductGrid>

function makeProduct(id: string, index: number) {
  return {
    id,
    name: `Nike Air Max Pulse (${id})`,
    specification: 'Men’s Shoes',
    imageUrl: '/images/content/air-max-pulse-mens-shoes-ShS3tL.png',
    price: (index + 1) * 5000,
    stock: 10,
  }
}

const products = Array.from({ length: 8 }, (_, i) => makeProduct(`${i}`, i))

export const Columns2: Story = {
  args: {
    products,
    columns: 2,
    quantityByProductId: {
      0: 2,
      1: 5,
      2: 3,
    },
  },
}

export const Columns3: Story = {
  args: {
    products,
    columns: 3,
    quantityByProductId: {
      1: 1,
      4: 4,
    },
  },
}

export const Columns4: Story = {
  args: {
    products,
    columns: 4,
    quantityByProductId: {
      2: 2,
      7: 6,
    },
  },
}

export const LongList: Story = {
  args: {
    columns: 3,
    products: Array.from({ length: 250 }, (_, i) => makeProduct(`long-${i}`, i)),
  },
}

export const AutoColumns: Story = {
  args: {
    columns: 'auto',
    products,
    quantityByProductId: {
      0: 2,
      3: 1,
    },
  },
}
