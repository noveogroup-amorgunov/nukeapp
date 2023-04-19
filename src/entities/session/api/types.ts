export type SessionDto = {
  accessToken: string
  user: {
    email: string
    id: number
  }
}

export type RequestLoginBody = {
  email: string
  password: string
}

export type UserDto = {
  id: number
  email: Email
}
