import { httpClient } from './http-client'

interface IMeResponse {
  id: string
  first_name: string
  last_name: string | null
  avatar: string | null
  email: string
}

export async function me(): Promise<IMeResponse> {
  const { data } = await httpClient.get('/me')
  return data
}
