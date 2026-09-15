import type { IGoogleAuthGateway } from '@gateways/google-auth.gateway.ts'

interface IInput {
  code: string
}

export class AuthGoogleUseCase {
  constructor(private readonly googleAuthGateway: IGoogleAuthGateway) {}

  async execute({ code }: IInput) {
    const accessToken = await this.googleAuthGateway.getAccessToken(code)

    console.log({ accessToken })
  }
}
