import { HttpResponse, delay, http } from 'msw'
import {
  env,
  parseTokenFromRequest,
  signAccessToken,
  verifyAccessToken,
} from '@/shared/lib'
import { __serverDatabase } from '@/shared/lib/server'

export const sessionHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/me`, async ({ request }) => {
    try {
      const payload = await verifyAccessToken(parseTokenFromRequest(request))

      await delay(env.VITE_API_DELAY)
      return HttpResponse.json({
        id: payload.userId,
        email: payload.email,
      }, { status: 200 })
    }
    catch {
      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Token is expired or not valid', { status: 401 })
    }
  }),

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
