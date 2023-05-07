import { setupWorker } from 'msw'
import { categoriesHandlers } from '@/entities/category/api/__mocks__/categoryHandlers'
import { productsHandlers } from '@/entities/product/api/__mocks__/productHandlers'
import { sessionHandlers } from '@/entities/session/api/__mocks__/sessionHandlers'
import { wishlistHandlers } from '@/entities/wishlist/api/__mocks/wishlistHandlers'

const apiMockWorker = setupWorker(
  ...categoriesHandlers,
  ...wishlistHandlers,
  ...productsHandlers,
  ...sessionHandlers
)

export const startApiMockWorker = () => {
  apiMockWorker.start({
    onUnhandledRequest(req, print) {
      if (/\.(png|jpg|svg|tsx?|css|jsx?|woff2)$/.test(req.url.pathname)) {
        return
      }

      print.warning()
    },
  })
}
