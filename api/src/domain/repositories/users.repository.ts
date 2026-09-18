import type { IUser } from '../entities/users.entity.ts'

export interface IUsersRepository {
  upsert(data: Omit<IUser, 'id'>): Promise<IUser>
  getUserById(id: IUser['id']): Promise<IUser>
}
