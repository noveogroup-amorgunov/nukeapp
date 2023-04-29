import { createBrowserRouter } from 'react-router-dom'
import { CategoryPage } from '@/pages/category'
import { LoginPage } from '@/pages/login'
import { MainPage } from '@/pages/main'
import { ProductPage } from '@/pages/product'
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
        path: '/product/:productId',
        element: <ProductPage />,
      },
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
])
