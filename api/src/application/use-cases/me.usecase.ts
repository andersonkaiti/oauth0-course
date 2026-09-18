import type { IUser } from '@domain/entities/users.entity.ts'
import type { IUsersRepository } from '@domain/repositories/users.repository.ts'

export class MeUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(id: IUser['id']): Promise<IUser> {
    return await this.usersRepository.getUserById(id)
  }
}
