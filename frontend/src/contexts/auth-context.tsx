import { toast } from '@components/ui/toast'
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
    setSignedIn(true)

    toast.add({
      title: 'Autenticação bem-sucedida!',
      type: 'success',
    })
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
