import { toast } from '@components/ui/toast'
import { env } from '@config/env'
import { httpClient } from '@http/http-client'
import { isAxiosError } from 'axios'
import {
  createContext,
  type PropsWithChildren,
  useLayoutEffect,
  useState,
} from 'react'

interface IAuthContext {
  signedIn: boolean
  signInWithGoogle: () => void
  signOut: () => void
  signIn: (accessToken: string) => void
  isLoading: boolean
}

export const AuthContext = createContext({} as IAuthContext)

const ACCESS_TOKEN_KEY = '@oauth2-access-token'

export function AuthProvider({ children }: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState(
    () => !!localStorage.getItem(ACCESS_TOKEN_KEY),
  )
  const [isLoading, setIsLoading] = useState(false)

  function signInWithGoogle() {
    setIsLoading(true)

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

  function signIn(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

    setSignedIn(true)

    toast.add({
      title: 'Autenticação bem-sucedida!',
      type: 'success',
    })
  }

  function signOut() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)

    setSignedIn(false)

    toast.add({
      title: 'Deslogado(a) com sucesso!',
      type: 'success',
    })
  }

  useLayoutEffect(() => {
    const interceptorRequestId = httpClient.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

        config.headers.set('Authorization', `Bearer ${accessToken}`)

        return config
      },
    )

    const interceptorResponseId = httpClient.interceptors.response.use(
      (value) => value,
      (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem(ACCESS_TOKEN_KEY)
        }

        throw error
      },
    )

    return () => {
      httpClient.interceptors.request.eject(interceptorRequestId)
      httpClient.interceptors.request.eject(interceptorResponseId)
    }
  }, [])

  return (
    <AuthContext
      value={{
        signedIn,
        signInWithGoogle,
        signOut,
        signIn,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  )
}
