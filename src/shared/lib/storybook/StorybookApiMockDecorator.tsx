import { type StoryFn } from '@storybook/react'
// TODO: FSD: (import shared -> app)
// eslint-disable-next-line boundaries/element-types
import { startApiMockWorker } from '@/app/apiMockWorker'

startApiMockWorker()

export function StorybookApiMockDecorator(Story: StoryFn) {
  return <Story />
}
