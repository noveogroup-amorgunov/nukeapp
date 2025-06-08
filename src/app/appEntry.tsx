import { Provider as ModalProvider } from '@ebay/nice-modal-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { selectAccessToken } from '@/entities/session'
import { ThemeProvider } from '@/entities/theme'
import { attachApiAccessToken } from '@/shared/api'
import { appStore, persistedStore } from '@/shared/redux'
import { DebugModeProvider } from '@/widgets/Layout'
import { RouterProvider } from './providers/router/RouterProvider'
import '@/shared/base.css'

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
 */
attachApiAccessToken(() => selectAccessToken(appStore.getState()) ?? null)

initApp().then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ModalProvider>
        <ReduxProvider store={appStore}>
          <PersistGate loading={null} persistor={persistedStore}>
            <ThemeProvider>
              <DebugModeProvider>
                <RouterProvider />
              </DebugModeProvider>
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </ModalProvider>
    </React.StrictMode>,
  )
})
