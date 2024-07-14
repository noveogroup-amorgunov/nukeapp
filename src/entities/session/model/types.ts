export type SessionUserId = Brand<Id, 'SessionUserId'>

export type Session = {
  accessToken: string
  userId: SessionUserId
}
