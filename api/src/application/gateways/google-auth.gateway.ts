export interface IGoogleAuthGateway {
  getAccessToken(code: string): Promise<string>
}
