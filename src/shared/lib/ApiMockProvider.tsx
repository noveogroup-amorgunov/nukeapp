import { type Store } from '@reduxjs/toolkit'
import { type ReactNode } from 'react'
import { Provider } from 'react-redux'
// TODO: FSD
import { apiMockWorker } from '@/app/apiMockWorker'

type Props = {
  store: Store
  children: ReactNode
}

apiMockWorker.start({
  onUnhandledRequest(req, print) {
    if (/\.(png|jpg|svg|tsx?|css|jsx?)$/.test(req.url.pathname)) {
      return
    }

    print.warning()
  },
})

export function ApiMockProvider({ store, children }: Props) {
  return <Provider store={store}>{children}</Provider>
}
