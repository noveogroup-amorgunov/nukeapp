import { type Decorator } from '@storybook/react'
import { startApiMockWorker } from '@/app/apiMockWorker'

startApiMockWorker()

export const withApiMock: Decorator = (StoryFn) => {
  return <StoryFn />
}
