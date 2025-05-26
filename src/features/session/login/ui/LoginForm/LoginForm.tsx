import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/shared/redux'
import { Button } from '@/shared/ui'
import { loginThunk } from '../../model/login'
import {

  loginFormSchema,
} from '../../model/loginFormSchema'
import type { LoginFormSchema } from '../../model/loginFormSchema'
import css from './LoginForm.module.css'

type Props = {
  onComplete?: () => void
}

export function LoginForm(props: Props) {
  const dispatch = useAppDispatch()

  const {
    setError,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmitHandler = useCallback(
    ({ email, password }: LoginFormSchema) => {
      dispatch(loginThunk({ email, password }))
        .unwrap()
        .then(() => props.onComplete?.())
        .catch((error) => {
          setError('email', { type: 'server', message: error.message })
        })
    },
    [],
  )

  return (
    <div data-fsd="feature/session/LoginForm">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <div>
            <label>Email</label>
          </div>
          <input type="email" {...register('email')} />
          <div>{errors.email?.message}</div>
        </div>
        <div>
          <div>
            <label>Password</label>
          </div>
          <input type="password" {...register('password')} />
          {errors.password && (
            <p className="text-xs">{errors.password?.message}</p>
          )}
        </div>
        <div className={css.actions}>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  )
}
