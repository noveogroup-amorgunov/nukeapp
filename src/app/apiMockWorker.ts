import { setupWorker } from 'msw/browser'
import { adBlockHandlers } from '@/shared/api/mocks/ad/adBlockHandlers'
import { cartHandlers } from '@/shared/api/mocks/cart/cartHandlers'
import { categoriesHandlers } from '@/shared/api/mocks/categories/categoryHandlers'
import { featureToggleHandlers } from '@/shared/api/mocks/featureToggle/featureToggleHandlers'
import { productDetailsHandlers } from '@/shared/api/mocks/products/productDetailsHandlers'
import { productsHandlers } from '@/shared/api/mocks/products/productHandlers'
import { productPopularListHandlers } from '@/shared/api/mocks/products/productPopularListHandlers'
import { sessionHandlers } from '@/shared/api/mocks/session/sessionHandlers'
import { userHandlers } from '@/shared/api/mocks/user/userHandlers'
import { wishlistHandlers } from '@/shared/api/mocks/wishlist/wishlistHandlers'
// eslint-disable-next-line no-restricted-imports
import { __serverStartDatabaseMigration } from '@/shared/lib/server'

const apiMockWorker = setupWorker(
  ...adBlockHandlers,
  ...cartHandlers,
  ...categoriesHandlers,
  ...featureToggleHandlers,
  ...productDetailsHandlers,
  ...productPopularListHandlers,
  ...productsHandlers,
  ...sessionHandlers,
  ...userHandlers,
  ...wishlistHandlers,
)

export async function startApiMockWorker() {
  const shouldReset = Object.fromEntries(new URLSearchParams(document.location.search)).reset === '1'

  await __serverStartDatabaseMigration(shouldReset)

  await apiMockWorker.start({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url)

      if (/\.png|jpg|svg|tsx?|css|jsx?|woff2$/.test(url.pathname)) {
        return
      }

      print.warning()
    },
  })
}
