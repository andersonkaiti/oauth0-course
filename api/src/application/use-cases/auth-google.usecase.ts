import type { IUser } from '@domain/entities/users.entity.ts'
import type { IUsersRepository } from '@domain/repositories/users.repository.ts'
import { Unauthorized } from '@errors/unauthorized.ts'
import type { IGoogleAuthGateway } from '@gateways/google-auth.gateway.ts'

interface IInput {
  code: string
}

export class AuthGoogleUseCase {
  constructor(
    private readonly googleAuthGateway: IGoogleAuthGateway,
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ code }: IInput): Promise<IUser> {
    const accessToken = await this.googleAuthGateway.getAccessToken(code)

    const {
      verified_email: verifiedEmail,
      given_name,
      family_name,
      picture,
      email,
      id,
    } = await this.googleAuthGateway.getUserInfo(accessToken)

    if (!verifiedEmail) {
      throw new Unauthorized('Google account is not verified.')
    }

    const user = await this.usersRepository.upsert({
      first_name: given_name,
      last_name: family_name,
      avatar: picture,
      email,
      google_id: id,
    })

    return user
  }
}
