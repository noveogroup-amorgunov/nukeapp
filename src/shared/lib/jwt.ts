import * as jose from 'jose'
import { type RestRequest } from 'msw'
import { config } from '@/shared/lib'

export async function signAccessToken(payload: Record<string, unknown>) {
  const secret = new TextEncoder().encode(config.JWT_SECRET)

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)
}

export async function verifyAccessToken(jwt: string) {
  const secret = new TextEncoder().encode(config.JWT_SECRET)
  const { payload } = await jose.jwtVerify(jwt, secret)

  return payload
}

export function parseTokenFromRequest(req: RestRequest) {
  const tokenHeader = req.headers.get('Authorization') ?? ''
  const [, token] = tokenHeader.split(' ')

  return token
}
