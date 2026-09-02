import { useEffect } from 'react'
import { debugModeSlice } from '../../model/debugModeSlice'
import { useAppSelector } from '@/shared/redux'

type Props = {
  children: React.ReactNode
}

export function DebugModeProvider({ children }: Props) {
  const isDebugModeEnabled = useAppSelector(debugModeSlice.selectors.isEnabled)

  useEffect(() => {
    if (isDebugModeEnabled) {
      document.body.classList.add('fsd-debug-mode')
    }
    else {
      document.body.classList.remove('fsd-debug-mode')
    }
  }, [isDebugModeEnabled])

  return children
}
