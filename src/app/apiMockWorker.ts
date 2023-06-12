import { setupWorker } from 'msw'
import { cartHandlers } from '@/entities/cart/api/__mocks__/cartHandlers'
import { categoriesHandlers } from '@/entities/category/api/__mocks__/categoryHandlers'
import { featureToggleHandlers } from '@/entities/featureToggle/api/__mocks__/featureToggleHandlers'
import { productsHandlers } from '@/entities/product/api/__mocks__/productHandlers'
import { sessionHandlers } from '@/entities/session/api/__mocks__/sessionHandlers'
import { wishlistHandlers } from '@/entities/wishlist/api/__mocks__/wishlistHandlers'
// eslint-disable-next-line no-restricted-imports
import { __serverStartDatabaseMigration } from '@/shared/lib/server'

const apiMockWorker = setupWorker(
  ...categoriesHandlers,
  ...wishlistHandlers,
  ...productsHandlers,
  ...sessionHandlers,
  ...featureToggleHandlers,
  ...cartHandlers
)

__serverStartDatabaseMigration()

export const startApiMockWorker = async () => {
  await apiMockWorker.start({
    onUnhandledRequest(req, print) {
      if (/\.(png|jpg|svg|tsx?|css|jsx?|woff2)$/.test(req.url.pathname)) {
        return
      }

      print.warning()
    },
  })
}
