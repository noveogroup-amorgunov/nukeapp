import { useEffect } from 'react'
import { useFeatureFlag } from '@/shared/services/featureFlags'

type Props = {
  children: React.ReactNode
}

export function DebugModeProvider({ children }: Props) {
  const isDebugModeEnabled = useFeatureFlag('debugMode')

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
