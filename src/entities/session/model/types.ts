export type SessionUserId = Brand<Id, 'SessionUserId'>

export type Session = {
  accessToken: string
  userId: SessionUserId
}

// TODO: Move user to entities/user/model/types.ts
export type User = {
  id: Id
  email: Email
}
