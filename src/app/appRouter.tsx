import { createBrowserRouter } from 'react-router-dom'
import { featureToggleLoader } from '@/entities/featureToggle'
import { CartPage } from '@/pages/cart'
import { CategoryPage } from '@/pages/category'
import { LoginPage } from '@/pages/login'
import { MainPage } from '@/pages/main'
import { ProductPage } from '@/pages/product'
import { WishlistPage } from '@/pages/wishlist'
import { appStore } from './appStore'
import { baseLayout } from './layouts/baseLayout'
import { layoutWithSidebar } from './layouts/layoutWithSidebar'

export const appRouter = () =>
  createBrowserRouter([
    {
      element: baseLayout,
      errorElement: <div>error</div>,
      loader: async () => {
        return await featureToggleLoader(appStore.dispatch)
      },
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
          path: '/user/cart',
          element: <CartPage />,
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
      errorElement: <div>error</div>,
      loader: async () => {
        return await featureToggleLoader(appStore.dispatch)
      },
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
      ],
    },
  ])
