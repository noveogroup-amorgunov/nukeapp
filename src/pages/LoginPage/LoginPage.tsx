import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/features/authentication/Login/ui/LoginForm/LoginForm'
import { config } from '@/shared/lib/config'

export function LoginPage() {
  const navigate = useNavigate()
  const onComplete = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <>
      <h1>Login page</h1>
      <p>
        Use {config.API_USER_EMAIL} / {config.API_USER_PASSWORD} as test user
        credentials
      </p>
      <LoginForm onComplete={onComplete} />
    </>
  )
}
