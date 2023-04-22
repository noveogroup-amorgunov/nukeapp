import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import '@/shared/base.css'
import { startApiMockWorker } from '@/app/apiMockWorker'
import { appRouter } from './appRouter'
import { persistedStore, appStore } from './appStore'

const root = document.getElementById('root') as HTMLElement

startApiMockWorker()

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ReduxProvider store={appStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
)
