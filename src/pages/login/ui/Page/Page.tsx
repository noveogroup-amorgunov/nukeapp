import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { env } from '@/shared/lib'
import { LoginForm } from '../LoginForm/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const onComplete = useCallback(() => {
    navigate(location.state?.returnUrl ?? '/')
  }, [navigate])

  return (
    <div data-fsd="page/login/Page">
      <h1>Login page</h1>
      <p>
        Use
        {' '}
        {env.VITE_API_USER_EMAIL}
        {' '}
        /
        {' '}
        {env.VITE_API_USER_PASSWORD}
        {' '}
        as test
        user credentials
      </p>
      <LoginForm onComplete={onComplete} />
    </div>
  )
}
