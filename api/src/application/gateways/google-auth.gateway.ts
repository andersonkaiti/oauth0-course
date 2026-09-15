export interface IGoogleUser {
  id: string
  name: string
  given_name: string
  family_name: string
  email: string
  picture: string
  verified_email: boolean
}

export interface IGoogleAuthGateway {
  getAccessToken(code: string): Promise<string>
  getUserInfo(accessToken: string): Promise<IGoogleUser>
  revokeAccessToken(accessToken: string): Promise<void>
}
