import type { Meta, StoryObj } from '@storybook/react-vite'
import { Price } from './Price'

const meta: Meta<typeof Price> = {
  title: 'shared/ui/Price',
  component: Price,
}

export default meta

type Story = StoryObj<typeof Price>

const sizes = ['m', 'l'] as const
const variants = ['primary', 'secondary'] as const

export const Common: Story = {
  args: {
    price: 15000,
  },
}

export const WithOldPrice: Story = {
  args: {
    price: 15000,
    oldPrice: 19900,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sizes.map(size => (
        <div key={size} style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {variants.map(variant => (
            <Price key={variant} price={15000} oldPrice={19900} size={size} variant={variant} />
          ))}
        </div>
      ))}
    </div>
  ),
}
