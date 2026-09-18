import { UsersRepository } from '@database/repositories/user.repository.ts'
import { MeUseCase } from '@use-cases/me.usecase.ts'

export function makeMe() {
  const usersRepository = new UsersRepository()

  return new MeUseCase(usersRepository)
}
