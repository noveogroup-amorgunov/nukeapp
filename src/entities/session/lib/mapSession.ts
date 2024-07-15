import type { SessionDto } from '../api/types'
import type { Session, SessionUserId } from '../model/types'

export function mapSession(dto: SessionDto): Session {
  return {
    accessToken: dto.accessToken,
    userId: dto.user.id as SessionUserId,
  }
}
