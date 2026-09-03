// Internal api access token storage
// Updated via middleware in `@/entities/session`
let __internalAccessToken: string | null = null

export function setApiAccessToken(accessToken: string | null) {
  __internalAccessToken = accessToken
}

export function getApiAccessToken() {
  return __internalAccessToken
}
