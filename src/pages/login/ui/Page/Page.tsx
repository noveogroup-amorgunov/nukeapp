import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import { LoginForm } from '@/features/authentication/login'
import { env } from '@/shared/lib'
=======
import { LoginForm } from '@/features/session/login'
import { config } from '@/shared/lib'
>>>>>>> 30f5a92 (Rename authentication/* feature group to session/*)

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const onComplete = useCallback(() => {
    navigate(location.state?.returnUrl ?? '/')
  }, [navigate])

  return (
    <div>
      <h1>Login page</h1>
      <p>
        Use {env.VITE_API_USER_EMAIL} / {env.VITE_API_USER_PASSWORD} as test
        user credentials
      </p>
      <LoginForm onComplete={onComplete} />
    </div>
  )
}
