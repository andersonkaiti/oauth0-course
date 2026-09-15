import type { IGoogleAuthGateway } from '@gateways/google-auth.gateway.ts'
import axios from 'axios'
import qs from 'qs'

export interface IToken {
  access_token: string
  expires_in: string
  scope: string
  token_type: string
  id_token: string
}

export class GoogleAuthGateway implements IGoogleAuthGateway {
  constructor(
    private readonly googleClientId: string,
    private readonly googleClientSecret: string,
    private readonly googleClientURL: string,
  ) {}

  async getAccessToken(code: string): Promise<string> {
    const options = qs.stringify({
      client_id: this.googleClientId,
      client_secret: this.googleClientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.googleClientURL,
    })

    const {
      data: { access_token: accessToken },
    } = await axios.post<IToken>(
      'https://oauth2.googleapis.com/token',
      options,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    return accessToken
  }
}
