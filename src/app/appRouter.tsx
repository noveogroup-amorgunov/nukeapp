import { createBrowserRouter } from 'react-router-dom'
import { CategoryPage } from '@/pages/CategoryPage'
import { LoginPage } from '@/pages/LoginPage'
import { MainPage } from '@/pages/MainPage'
import { appLayout } from './appLayout'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: appLayout,
    errorElement: <div>error</div>,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/category/:categoryId',
        element: <CategoryPage />,
      },
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
])
