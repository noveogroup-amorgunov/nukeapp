import { setupWorker } from 'msw/browser'
import { apiMockHandlers } from '@/shared/api/mocks'
// eslint-disable-next-line no-restricted-imports
import { __serverStartDatabaseMigration } from '@/shared/lib/server'

const apiMockWorker = setupWorker(
  ...apiMockHandlers,
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
