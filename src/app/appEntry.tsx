import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { appRouter } from './appRouter'
import { persistedStore, appStore } from './appStore'
import '@/shared/base.css'
import { ApiMockProvider } from '@/shared/lib/ApiMockProvider'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ApiMockProvider store={appStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </ApiMockProvider>
  </React.StrictMode>
)
