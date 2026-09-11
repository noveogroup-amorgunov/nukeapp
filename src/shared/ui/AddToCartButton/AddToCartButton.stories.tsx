import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AddToCartButton } from './AddToCartButton'

const meta: Meta<typeof AddToCartButton> = {
  title: 'shared/ui/AddToCartButton',
  component: AddToCartButton,
}

export default meta

type Story = StoryObj<typeof AddToCartButton>

const STOCK = 3

function Playground(props: {
  size?: 'm' | 'l'
  initialQuantity?: number
  maxQuantityIsReached?: boolean
  disabled?: boolean
  oldPrice?: boolean
}) {
  const [quantity, setQuantity] = useState(props.initialQuantity ?? 0)

  return (
    <AddToCartButton
      quantity={quantity}
      maxQuantityIsReached={
        props.maxQuantityIsReached || quantity >= STOCK
      }
      price={15000}
      oldPrice={props.oldPrice ? 19900 : undefined}
      size={props.size}
      disabled={props.disabled}
      onIncrease={() => setQuantity(q => Math.min(q + 1, STOCK))}
      onDecrease={() => setQuantity(q => Math.max(q - 1, 0))}
    />
  )
}

export const Empty: Story = {
  render: () => <Playground initialQuantity={0} />,
}

export const EmptyWithOldPrice: Story = {
  render: () => <Playground initialQuantity={0} oldPrice />,
}

export const InCart: Story = {
  render: () => <Playground initialQuantity={1} />,
}

export const MaxAdded: Story = {
  render: () => <Playground initialQuantity={STOCK} />,
}

export const Disabled: Story = {
  render: () => <Playground initialQuantity={0} disabled />,
}

export const SizeL: Story = {
  render: () => <Playground size="l" initialQuantity={0} oldPrice />,
}

export const SizeLInCart: Story = {
  render: () => <Playground size="l" initialQuantity={1} />,
}
