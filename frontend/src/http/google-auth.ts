import { toast } from '@components/ui/toast'
import { httpClient } from './http-client'

interface IGoogleAuthResponse {
  accessToken: string
}

export async function googleAuth(
  code: string,
): Promise<IGoogleAuthResponse | null> {
  try {
    const { data } = await httpClient.post('/auth/google', {
      code,
    })

    return data
  } catch {
    toast.add({
      title: 'Credenciais inválidas!',
      type: 'error',
    })

    return null
  }
}
