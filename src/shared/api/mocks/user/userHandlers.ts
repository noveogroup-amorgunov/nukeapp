import { delay, http, HttpResponse } from 'msw'
import { env, parseTokenFromRequest, verifyAccessToken } from '@/shared/lib'

export const userHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/me`, async ({ request }) => {
    try {
      const payload = await verifyAccessToken(parseTokenFromRequest(request))

      await delay(env.VITE_API_DELAY)
      return HttpResponse.json(
        {
          id: payload.userId,
          email: payload.email,
        },
        { status: 200 },
      )
    }
    catch {
      await delay(env.VITE_API_DELAY)
      return HttpResponse.json('Token is expired or not valid', { status: 401 },
      )
    }
  }),
]
