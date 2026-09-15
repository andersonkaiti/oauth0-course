import { Unauthorized } from '@errors/unauthorized.ts'
import type { IGoogleAuthGateway } from '@gateways/google-auth.gateway.ts'

interface IInput {
  code: string
}

export class AuthGoogleUseCase {
  constructor(private readonly googleAuthGateway: IGoogleAuthGateway) {}

  async execute({ code }: IInput) {
    const accessToken = await this.googleAuthGateway.getAccessToken(code)

    const { verified_email: verifiedEmail } =
      await this.googleAuthGateway.getUserInfo(accessToken)

    if (!verifiedEmail) {
      throw new Unauthorized('Google account is not verified.')
    }
  }
}
