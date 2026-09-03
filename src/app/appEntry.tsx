import React from 'react'
import { Provider as ModalProvider } from '@ebay/nice-modal-react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { selectAccessToken } from '@/entities/session'
import { ThemeProvider } from '@/entities/theme'
import { setApiAccessToken } from '@/shared/api'
import '@/shared/base.css'
import { appStore } from '@/shared/redux'
import { DebugModeProvider } from '@/widgets/Layout'
import { RouterProvider } from './with-providers/router/RouterProvider'

const root = document.getElementById('root') as HTMLElement

declare module 'react' {
  type FeatureSliceLayers = 'feature' | 'entity' | 'shared' | 'widget' | 'page'

  // eslint-disable-next-line ts/consistent-type-definitions
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-fsd'?: `${FeatureSliceLayers}/${string}`
  }
}

async function initApp() {
  // Move @mswjs worker to lazy import
  const module = await import('@/app/apiMockWorker')
  await module.startApiMockWorker()
}

/**
 * ✅ FSD Best practice
 *
 * Attach api access token to `@/shared/api/baseQuery.ts`
 * without direct using session redux-slice in shared layer
 * see previous version for details:
 * @see https://github.com/noveogroup-amorgunov/nukeapp/blob/v0.0.1/src/shared/api/baseQuery.ts#L19
 *
 * ⚠️ `redux-remember` rehydration dispatch bypasses redux middleware chain,
 * so `@/entities/session` `accessTokenSyncMiddleware` can't catch it.
 * Sync token via store subscription instead,
 * it fires synchronously on rehydration, before the first api request.
 * @see https://github.com/zewish/redux-remember/blob/v6.0.2/src/rehydrate.ts#L44
 */
function syncApiAccessToken() {
  setApiAccessToken(selectAccessToken(appStore.getState()) ?? null)
}

syncApiAccessToken()
appStore.subscribe(syncApiAccessToken)

initApp().then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ModalProvider>
        <ReduxProvider store={appStore}>
          <ThemeProvider>
            <DebugModeProvider>
              <RouterProvider />
            </DebugModeProvider>
          </ThemeProvider>
        </ReduxProvider>
      </ModalProvider>
    </React.StrictMode>,
  )
})
