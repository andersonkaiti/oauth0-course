import { AuthContext } from '@contexts/auth-context'
import { use } from 'react'

export function useAuth() {
  return use(AuthContext)
}
