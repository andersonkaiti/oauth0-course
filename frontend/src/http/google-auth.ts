import { toast } from '@components/ui/toast'
import { httpClient } from './http-client'

export async function googleAuth(code: string) {
  try {
    const { data } = await httpClient.post('/auth/google', {
      code,
    })

    console.log(data)
  } catch {
    toast.add({
      title: 'Credenciais inválidas!',
      type: 'error',
    })
  }
}
