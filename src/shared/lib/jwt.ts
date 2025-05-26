import * as jose from 'jose'
import type { DefaultBodyType, StrictRequest } from 'msw'
import { env } from './env'

export async function signAccessToken(payload: Record<string, unknown>) {
  const secret = new TextEncoder().encode(env.VITE_JWT_SECRET)

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)
}

export async function verifyAccessToken(jwt: string) {
  const secret = new TextEncoder().encode(env.VITE_JWT_SECRET)
  const { payload } = await jose.jwtVerify(jwt, secret)

  return payload as { email: Email, userId: Id }
}

export function parseTokenFromRequest(req: StrictRequest<DefaultBodyType>) {
  const tokenHeader = req.headers.get('Authorization') ?? ''
  const [, token] = tokenHeader.split(' ')

  return token
}
