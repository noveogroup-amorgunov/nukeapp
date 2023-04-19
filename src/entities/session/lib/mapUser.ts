import { type UserDto } from '../api/types'
import { type User } from '../model/types'

export function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
  }
}
