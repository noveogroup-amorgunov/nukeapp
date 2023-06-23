import { type ReactNode } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { featureToggleLoader } from '@/entities/featureToggle'
import { selectIsAuthorized } from '@/entities/session'
import { CartPage } from '@/pages/cart'
import { CategoryPage } from '@/pages/category'
import { LoginPage } from '@/pages/login'
import { MainPage } from '@/pages/main'
import { ProductPage } from '@/pages/product'
import { WishlistPage } from '@/pages/wishlist'
import { useAppSelector } from '@/shared/model'
import { appStore } from './appStore'
import { baseLayout } from './layouts/baseLayout'
import { layoutWithSidebar } from './layouts/layoutWithSidebar'

type GuestGuardProps = {
  children: ReactNode
}

function GuestGuard({ children }: GuestGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (!isAuthorized) return <Navigate to="/login" />

  return children
}

type AuthGuardProps = {
  children: ReactNode
}

function AuthGuard({ children }: AuthGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (isAuthorized) return <Navigate to="/" />

  return children
}

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
          element: (
            <AuthGuard>
              <LoginPage />
            </AuthGuard>
          ),
        },
        {
          path: '/user/wishlist',
          element: (
            <GuestGuard>
              <WishlistPage />
            </GuestGuard>
          ),
        },
        {
          path: '/user/cart',
          element: (
            <GuestGuard>
              <CartPage />
            </GuestGuard>
          ),
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
