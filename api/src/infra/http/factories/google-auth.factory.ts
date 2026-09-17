import { UsersRepository } from '@database/repositories/user.repository.ts'
import { env } from '@shared/env.ts'
import { AuthGoogleUseCase } from '@use-cases/auth-google.usecase.ts'
import { GoogleAuthGateway } from '../gateways/google-auth.gateway.ts'

export function makeGoogleAuth() {
  const googleAuthGateway = new GoogleAuthGateway(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_CLIENT_URL,
  )

  const usersRepository = new UsersRepository()

  return new AuthGoogleUseCase(googleAuthGateway, usersRepository)
}
