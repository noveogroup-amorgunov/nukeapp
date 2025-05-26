import { RouterProvider as ReactRouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'

export function RouterProvider() {
  return <ReactRouterProvider router={appRouter()} />
}
