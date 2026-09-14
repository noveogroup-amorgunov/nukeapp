import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropdownMenu, Icon, IconButton, Layout, LayoutTitleSection, ProductGrid } from '@/shared/ui'

const meta: Meta<typeof Layout> = {
  title: 'shared/ui/Layout',
  component: Layout,
}

export default meta

type Story = StoryObj<typeof Layout>

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

const sortItems = [
  { value: 'Featured', label: 'Featured' },
  { value: 'Newest', label: 'Newest' },
  { value: 'Price: High-Low', label: 'Price: High-Low' },
  { value: 'Price: Low-High', label: 'Price: Low-High' },
]

const headerRightSlot = (
  <>
    <IconButton>
      <Icon type="bag" />
    </IconButton>
    <IconButton>
      <Icon type="like" />
    </IconButton>
    <IconButton>
      <Icon type="user" />
    </IconButton>
    <IconButton>
      <Icon type="moon" />
    </IconButton>
  </>
)

const titleRightSlot = (
  <DropdownMenu
    items={sortItems}
    selected="Featured"
    trigger={(
      <div className="text_sm">
        Sort By:
        {' '}
        <span style={{ opacity: 0.7 }}>Featured</span>
        <Icon size={16} type="chevronDown" />
      </div>
    )}
  />
)

const slotStyle: CSSProperties = {
  border: '2px dashed #e05252',
  borderRadius: '8px',
  padding: '8px',
}

export const Common: Story = {
  args: {
    headerRightSlot,
    sidebarSlot: (
      <div style={slotStyle}>
        Sidebar
      </div>
    ),
    children: (
      <div style={slotStyle}>
        Content
      </div>
    ),
  },
}

export const WithoutSidebar: Story = {
  args: {
    headerRightSlot,
  },
}

export const CategoryPage: Story = {
  args: {
    headerRightSlot,
    children: (
      <>
        <LayoutTitleSection
          rightSlot={titleRightSlot}
          title="Pegasus 39"
        />
        <ProductGrid
          columns="auto"
          products={products}
          quantityByProductId={{ 1: 2, 4: 5 }}
        />
      </>
    ),
  },
}
