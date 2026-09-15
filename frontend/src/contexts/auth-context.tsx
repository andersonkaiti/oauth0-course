import { toast } from '@components/ui/toast'
import { env } from '@config/env'
import { createContext, type PropsWithChildren, useState } from 'react'

interface IAuthContext {
  signedIn: boolean
  signInWithGoogle: () => void
  signOut: () => void
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState(false)

  function signInWithGoogle() {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')

    // Identifica nossa aplicação ao Google:
    url.searchParams.set('client_id', env.VITE_GOOGLE_CLIENT_ID)
    // Para onde o Google redireciona após o login:
    url.searchParams.set('redirect_uri', env.VITE_GOOGLE_CALLBACK_URL)
    // Fluxo que recebe um code para trocar por tokens no backend:
    url.searchParams.set('response_type', 'code')
    // Dados do usuário que estamos solicitando:
    url.searchParams.set('scope', 'email profile')

    window.location.href = url.toString()
  }

  function signOut() {
    setSignedIn(false)

    toast.add({
      title: 'Deslogado(a) com sucesso!',
      type: 'success',
    })
  }

  return (
    <AuthContext
      value={{
        signedIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext>
  )
}
