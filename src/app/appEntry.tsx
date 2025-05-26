import { Provider as ModalProvider } from '@ebay/nice-modal-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@/entities/theme'
import { appStore, persistedStore } from '@/shared/redux'
import { DebugModeProvider } from '@/widgets/DebugModeToggler'
import { appRouter } from './appRouter'
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

initApp().then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ModalProvider>
        <ReduxProvider store={appStore}>
          <PersistGate loading={null} persistor={persistedStore}>
            <ThemeProvider>
              <DebugModeProvider>
                <RouterProvider router={appRouter()} />
              </DebugModeProvider>
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </ModalProvider>
    </React.StrictMode>,
  )
})
