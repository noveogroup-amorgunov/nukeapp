import { delay, http, HttpResponse } from 'msw'
import { env, signAccessToken } from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const sessionHandlers = [
  http.post<object, { email: string, password: string }>(`${env.VITE_API_ENDPOINT}/login`, async ({ request }) => {
    const body = await request.json()
    const { email, password } = body

    const maybeUser = __serverDatabase.user.findFirst({
      where: {
        email: { equals: email },
        password: { equals: password },
      },
    })

    if (!maybeUser) {
      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Wrong email or password', { status: 400 })
    }

    const accessToken = await signAccessToken({
      userId: maybeUser.id,
      email,
    })

    const responseData = {
      accessToken,
      user: {
        email,
        id: maybeUser.id,
      },
    }

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(responseData, { status: 200 })
  }),
]
