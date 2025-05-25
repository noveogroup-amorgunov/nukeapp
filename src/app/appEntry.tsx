import { Provider as ModalProvider } from '@ebay/nice-modal-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@/entities/theme'
import { appStore, persistedStore } from '@/shared/redux'
import { appRouter } from './appRouter'
import '@/shared/base.css'

const root = document.getElementById('root') as HTMLElement

async function initApp() {
  // Move @mswjs worker to lazy import
  const module = await import('@/app/apiMockWorker')
  await module.startApiMockWorker()
}

initApp().then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ModalProvider>
        {/* TODO: move to shared/redux provider */}
        <ReduxProvider store={appStore}>
          <PersistGate loading={null} persistor={persistedStore}>
            <ThemeProvider>
              <RouterProvider router={appRouter()} />
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </ModalProvider>
    </React.StrictMode>,
  )
})
