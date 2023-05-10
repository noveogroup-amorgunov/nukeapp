import { createBrowserRouter } from 'react-router-dom'
import { CategoryPage } from '@/pages/category'
import { LoginPage } from '@/pages/login'
import { MainPage } from '@/pages/main'
import { ProductPage } from '@/pages/product'
import { WishlistPage } from '@/pages/wishlist'
import { baseLayout } from './layouts/baseLayout'
import { layoutWithSidebar } from './layouts/layoutWithSidebar'

export const appRouter = createBrowserRouter([
  {
    element: baseLayout,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/user/wishlist',
        element: <WishlistPage />,
      },
      {
        path: '/category/:categoryId',
        element: <CategoryPage />,
      },
      {
        path: '/product/:productId',
        element: <ProductPage />,
      },
    ],
  },
  {
    element: layoutWithSidebar,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
])
